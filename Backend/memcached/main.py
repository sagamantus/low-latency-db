import os
import time
from fastapi import FastAPI, HTTPException, WebSocket, Request, Depends
from contextlib import asynccontextmanager
import memcache
import asyncio
import json
from sqlalchemy import create_engine, MetaData, Table, Column, Float, Integer, String
from databases import Database
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from email.message import EmailMessage
import ssl
import smtplib
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

# Configurations
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
DATASTRUCTURE_TIMEOUT = 10  # seconds
MEMCACHE_TIMEOUT = 30  # seconds

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Datastructure and caching
datastructure = dict()
memcached_client = memcache.Client([('127.0.0.1', 11211)])

# Database connection and table definitions
DATABASE_URL = "postgresql://postgres:postgres@db:5432/mydatabasei"
database = Database(DATABASE_URL)
metadata = MetaData()

# Financial logs table
logs_table = Table(
    "financial_data",
    metadata,
    Column("date", String, primary_key=True),
    Column("open", Float),
    Column("high", Float),
    Column("low", Float),
    Column("close", Float),
    Column("volume", Integer),
)

# User table for authentication
users_table = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("email", String, unique=True, index=True),
    Column("hashed_password", String),
    Column("is_active", Integer),  # 0 = Not confirmed, 1 = Confirmed
)

engine = create_engine(DATABASE_URL)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect()
    async with database.transaction():
        await database.execute("DROP TABLE IF EXISTS financial_data;")
        # await database.execute("DROP TABLE IF EXISTS users;")
    metadata.create_all(engine)
    yield
    await database.disconnect()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware to log processing time
@app.middleware("http")
async def log_processing_time(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    end_time = time.time()
    process_time = end_time - start_time
    print(f"Processing time for {request.url}: {process_time} seconds")
    return response

# Utility functions for password and token management
def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Send confirmation email
def send_confirmation_email(email: str, token: str):
    sender_email = os.environ["SENDER_EMAIL"]
    receiver_email = email
    password = os.environ["PASSWORD"]

    subject = "Confirm your Email"
    body = f"Click the link to confirm your email: http://localhost:8000/confirm-email?token={token}"

    message = f"Subject: {subject}\n\n{body}"

    em = EmailMessage()
    em["From"] = sender_email
    em["To"] = receiver_email
    em["Subject"] = subject
    em.set_content(body)
    
    context = ssl.create_default_context()
    
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as smtp:
        smtp.login(sender_email, password)
        smtp.sendmail(sender_email, receiver_email, em.as_string())

# Auth-related endpoints
@app.post("/signup/")
async def signup(email: str, password: str):
    hashed_password = hash_password(password)
    query = users_table.select().where(users_table.c.email == email)
    user = await database.fetch_one(query)
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")

    query = users_table.insert().values(email=email, hashed_password=hashed_password, is_active=0)
    await database.execute(query)
    token_data = {"email": email}
    token = create_access_token(token_data, timedelta(minutes=30))
    send_confirmation_email(email, token)
    return {"message": "User created successfully. Please confirm your email."}

@app.get("/confirm-email/")
async def confirm_email(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("email")
        if email is None:
            raise HTTPException(status_code=400, detail="Invalid token")
        query = users_table.update().where(users_table.c.email == email).values(is_active=1)
        await database.execute(query)
        return {"message": "Email confirmed successfully!"}
    except JWTError:
        raise HTTPException(status_code=400, detail="Invalid token")

@app.post("/login/")
async def login(email: str, password: str):
    query = users_table.select().where(users_table.c.email == email)
    user = await database.fetch_one(query)
    if not user or not verify_password(password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if user["is_active"] == 0:
        raise HTTPException(status_code=400, detail="Please confirm your email first")
    access_token = create_access_token(data={"sub": email})
    return {"access_token": access_token, "token_type": "bearer"}

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Could not validate credentials")
        return email
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

@app.get("/protected-route/")
async def protected_route(current_user: str = Depends(get_current_user)):
    return {"message": f"Welcome, {current_user}"}

# Functions to manage data, memcached, and database
async def remove_from_datastructure(key):
    await asyncio.sleep(DATASTRUCTURE_TIMEOUT)
    del datastructure[key]

async def get_from_memcached(key: str):
    key = "".join(key.split(" "))
    data = memcached_client.get(key, None)
    return data if data != None else data

async def write_to_memcached(data: dict):
    memcached_client.set("".join(data["date"].split(" ")), data, time=MEMCACHE_TIMEOUT)

async def write_to_db(data: dict):
    query = logs_table.insert().values(
        date=data.get("date"),
        open=data.get("open"),
        high=data.get("high"),
        low=data.get("low"),
        close=data.get("close"),
        volume=data.get("volume"),
    )
    await database.execute(query)

async def get_from_db(key):
    query = logs_table.select().where(logs_table.c.date == key)
    result = await database.fetch_one(query)
    if result is None:
        return None
    return dict(result)

async def write(data):
    datastructure[data["date"]] = data
    await write_to_memcached(data)
    await write_to_db(data)

async def read(key):
    data = datastructure.get(key, None)
    if data != None:
        print("Reading from datastructure")
        return data
    data = await get_from_memcached(key)
    if data != None:
        print("Reading from memcached")
        return data
    print("Reading from db")
    return await get_from_db(key)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            data = await websocket.receive_text()
            data = json.loads(data)
            await write(data)
            asyncio.create_task(remove_from_datastructure(data["date"]))
        except Exception as e:
            print(f"Connection closed with error: {e}")
            break

@app.get("/logs/")
async def get_logs(timestamp: str):
    data = await read(timestamp)
    if data == None:
        raise HTTPException(status_code=404, detail="Log not found")
    else:
        return data

@app.post("/create-table/")
async def create_user_table(user_id: str):
    user_table = Table(
        f"{user_id}_financial_data",
        metadata,
        Column("date", String, primary_key=True),
        Column("open", Float),
        Column("high", Float),
        Column("low", Float),
        Column("close", Float),
        Column("volume", Integer),
    )
    metadata.create_all(engine)
    return {"message": f"Table '{user_id}_financial_data' created successfully!"}
