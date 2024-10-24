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

def test_write_data():
    ws = create_connection("ws://localhost:8000/ws")
    ws.send(json.dumps(test_data))
    time.sleep(1)
    ws.close()

    # Verify the data by making a GET request
    response = requests.get(f"{BASE_URL}/logs/", params={"timestamp": test_data['date']})
    assert response.status_code == 200
    assert response.json() == test_data


def test_log_not_found():
    # Try fetching a non-existent log
    response = requests.get(f"{BASE_URL}/logs/", params={"timestamp": "1999-12-31"})
    assert response.status_code == 404
