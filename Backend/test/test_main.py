import pytest
import requests
import json
import time
import pandas as pd
from websocket import create_connection
from sqlalchemy import create_engine, text

BASE_URL = "http://127.0.0.1:8000"

test_data = {
    "date": "2023-10-23",
    "open": 100.5,
    "high": 105.0,
    "low": 98.3,
    "close": 102.7,
    "volume": 1500
}

signup_data = {
    "email": "testuser@example.com",
    "password": "TestPassword123"
}

@pytest.fixture(scope="module", autouse=True)
def setup_teardown():
    """Fixture to handle setup and teardown."""
    # Setup (could include database preparation or other setup tasks)
    print("\nSetting up before tests...")
    
    yield
    
    # Teardown (clean up after tests)
    print("\nTearing down after tests...")
    
def test_signup_and_email_confirmation():
    """Test user signup and email confirmation."""
    # Step 1: Signup request
    response = requests.post(f"{BASE_URL}/signup/?email={signup_data['email']}&password={signup_data['password']}")
    assert response.status_code == 200
    assert response.json()["message"] == "User created successfully. Please confirm your email."

    # Simulate email confirmation by fetching the token from the logs or modify this as needed
    token = "extracted_token_from_logs_or_mock"  # You should replace this with a real token extraction logic

    # Step 2: Confirm email
    response = requests.get(f"{BASE_URL}/confirm-email/", params={"token": token})
    assert response.status_code == 200
    assert response.json()["message"] == "Email confirmed successfully!"

def test_login_and_protected_route():
    """Test login and accessing a protected route."""
    login_data = {
        "email": signup_data["email"],
        "password": signup_data["password"]
    }

    # Step 1: Login request
    response = requests.post(f"{BASE_URL}/login/?email={login_data['email']}&password={login_data['password']}")
    assert response.status_code == 200
    token = response.json()["access_token"]

    # Step 2: Access protected route
    headers = {
        "Authorization": f"Bearer {token}"
    }
    response = requests.get(f"{BASE_URL}/protected-route/", headers=headers)
    assert response.status_code == 200
    assert response.json()["message"] == f"Welcome, {signup_data['email']}"

def test_create_user_table():
    """Test creating a user-specific table and ensure table is created correctly."""
    user_id = "sam12345"
    
    # Step 1: Setup database connection using SQLAlchemy (synchronous)
    DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/mydatabase"
    engine = create_engine(DATABASE_URL)

    # Step 2: Drop the table if it exists (using raw SQL)
    try:
        with engine.connect() as connection:
            connection.execute(text(f"DROP TABLE IF EXISTS {user_id}_financial_data;"))
    except Exception: pass

    # Step 3: Send request to create the user-specific table
    response = requests.post(f"{BASE_URL}/create-table/?user_id={user_id}")
    
    # Step 4: Verify the response
    assert response.status_code == 200
    assert response.json()["message"] == f"Table '{user_id}_financial_data' created successfully!"
    
    # Step 5: Optional: Verify the table creation (use raw SQL)
    with engine.connect() as connection:
        result = connection.execute(text(f"SELECT to_regclass('{user_id}_financial_data');"))
        table_exists = result.scalar()
    
    assert table_exists == f"{user_id}_financial_data", "Table creation verification failed."

def test_write_data():
    """Test WebSocket data write and ensure the data is stored correctly."""
    ws = create_connection("ws://localhost:8000/ws")
    ws.send(json.dumps(test_data))
    
    # Give some time for the server to process the WebSocket request
    time.sleep(1)
    ws.close()

    # Verify the data by making a GET request to the logs endpoint
    response = requests.get(f"{BASE_URL}/logs/", params={"timestamp": test_data['date']})
    
    assert response.status_code == 200
    assert response.json() == test_data, f"Expected {test_data}, but got {response.json()}"

def test_log_not_found():
    """Test for a non-existent log and ensure a 404 status is returned."""
    response = requests.get(f"{BASE_URL}/logs/", params={"timestamp": "1999-12-31"})
    assert response.status_code == 404
    assert response.json()["detail"] == "Log not found"

def test_write_invalid_data():
    """Test WebSocket with invalid data format and check the system response."""
    invalid_data = {
        "date": "2023-10-23",
        "open": "not a float",  # Invalid data
        "high": 105.0,
        "low": 98.3,
        "close": 102.7,
        "volume": 1500
    }

    ws = create_connection("ws://localhost:8000/ws")
    ws.send(json.dumps(invalid_data))
    
    # Give time for the server to process the invalid WebSocket request
    time.sleep(1)
    ws.close()

    # Expecting the system to handle invalid data, let's verify it didn't crash.
    # You can also check server logs or system health to verify handling.

def test_duplicate_entry():
    """Test for handling of duplicate entries."""
    # Send the same test data twice to check if duplicates are handled
    ws = create_connection("ws://localhost:8000/ws")
    ws.send(json.dumps(test_data))
    
    # Give some time for processing
    time.sleep(1)
    
    # Sending the same data again
    ws.send(json.dumps(test_data))
    time.sleep(1)
    ws.close()

    # Verify if the log was inserted only once (this depends on your app logic)
    response = requests.get(f"{BASE_URL}/logs/", params={"timestamp": test_data['date']})
    assert response.status_code == 200
    assert response.json() == test_data

# def test_generator():
#     """Test WebSocket data write and ensure the data is stored correctly."""
    
#     df: pd.DataFrame = pd.read_csv("generator/data/BANKNIFTY24OCTFUT.csv", index_col=False)
#     data: pd.Series

#     print()
#     for _, data in df.iterrows():
#         if _ > 500: break
#         ws = create_connection("ws://localhost:8000/ws")
#         ws.send(json.dumps(data.to_json())) 
        
#         response = requests.get(f"{BASE_URL}/logs/", params={"timestamp": test_data['date']})
    
#         assert response.status_code == 200
#         assert response.json() == test_data, f"Expected {test_data}, but got {response.json()}"
#         if response.json() == test_data:
#             print(f"Test case {_} PASSED: Verified data for {data['date']}")
#         ws.close()
