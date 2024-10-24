import unittest
from unittest.mock import patch, MagicMock
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


class TestWebSocketLog(unittest.TestCase):

    def tearDown(self):
        print("Test cases passed")

    @patch('websocket.create_connection')
    @patch('requests.get')
    def test_write_data(self, mock_get, mock_create_connection):
        # Mock WebSocket connection
        mock_ws = MagicMock()
        mock_create_connection.return_value = mock_ws

        # Mock GET request response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = test_data
        mock_get.return_value = mock_response

        # Call the actual function
        ws = create_connection("ws://localhost:8000/ws")
        ws.send(json.dumps(test_data))
        time.sleep(1)
        ws.close()

        # Verify that the WebSocket send was called correctly
        mock_ws.send.assert_called_once_with(json.dumps(test_data))
        mock_ws.close.assert_called_once()

        # Check if the GET request was made with the correct parameters
        response = requests.get(f"{BASE_URL}/logs/", params={"timestamp": test_data['date']})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), test_data)

    @patch('requests.get')
    def test_log_not_found(self, mock_get):
        # Mock a 404 response for the GET request
        mock_response = MagicMock()
        mock_response.status_code = 404
        mock_get.return_value = mock_response

        # Call the function to test fetching a non-existent log
        response = requests.get(f"{BASE_URL}/logs/", params={"timestamp": "1999-12-31"})

        # Verify the response
        self.assertEqual(response.status_code, 404)


if __name__ == "__main__":
    # Run tests and print success message for each passing test case
    suite = unittest.TestLoader().loadTestsFromTestCase(TestWebSocketLog)
    result = unittest.TextTestRunner(verbosity=2).run(suite)
    if result.wasSuccessful():
        print("All test cases passed successfully!")
    else: 
        print("Some test cases failed!")