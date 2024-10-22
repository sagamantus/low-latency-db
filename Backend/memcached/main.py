import time
from fastapi import FastAPI, HTTPException, WebSocket, Request
from contextlib import asynccontextmanager
import memcache
import websockets
import asyncio
import json
import pickle
from sqlalchemy import create_engine, MetaData, Table, Column, Float, Integer, String
from databases import Database

DATASTRUCTURE_TIMEOUT = 10 # seconds
MEMCACHE_TIMEOUT = 30 # seconds

datastructure = dict()

memcached_client = memcache.Client([('127.0.0.1', 11211)])

DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/mydatabase"
database = Database(DATABASE_URL)
metadata = MetaData()
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
engine = create_engine(DATABASE_URL)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect()
    async with database.transaction():
        await database.execute("DROP TABLE IF EXISTS financial_data;")
    metadata.create_all(engine)

    yield

    await database.disconnect()
    
app = FastAPI(lifespan=lifespan)

@app.middleware("http")
async def log_processing_time(request: Request, call_next):
    # Start timing the request
    start_time = time.time()

    # Process the request
    response = await call_next(request)

    # End timing
    end_time = time.time()
    process_time = end_time - start_time

    # Log the processing time
    print(f"Processing time for {request.url}: {process_time} seconds")

    return response


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
    date = data.get("date")
    open_price = data.get("open")
    high = data.get("high")
    low = data.get("low")
    close = data.get("close")
    volume = data.get("volume")

    query = logs_table.insert().values(
        date=date,
        open=open_price,
        high=high,
        low=low,
        close=close,
        volume=volume,
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
async def get_user(timestamp: str):
    data = await read(timestamp)
    if data == None:
        raise HTTPException(status_code=404, detail="Log not found")
    else:
        return data