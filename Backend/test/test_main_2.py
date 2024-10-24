import pytest
import requests
import json
import time
from websocket import create_connection

BASE_URL = "http://127.0.0.1:8000"

test_data = {
    "date": "2023-10-23",
    "open": 100.5,
    "high": 105.0,
    "low": 98.3,
    "close": 102.7,
    "volume": 1500
}

@pytest.fixture
def websocket_connection():
    ws = create_connection("ws://localhost:8000/ws")
    yield ws
    ws.close()


def test_write_data(websocket_connection):
    # Send data via WebSocket
    websocket_connection.send(json.dumps(test_data))
    time.sleep(1)  # Wait for the server to process the data
    
    # Verify the data by making a GET request
    response = requests.get(f"{BASE_URL}/logs/", params={"timestamp": test_data['date']})
    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
    assert response.json() == test_data, f"Expected response data to be {test_data}, but got {response.json()}"


def test_log_not_found():
    # Try fetching a non-existent log
    response = requests.get(f"{BASE_URL}/logs/", params={"timestamp": "1999-12-31"})
    assert response.status_code == 404, f"Expected status code 404, got {response.status_code}"