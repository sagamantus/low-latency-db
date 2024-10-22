from fastapi import FastAPI, WebSocket
import asyncio
import pandas as pd

app = FastAPI()

import asyncio
import websockets

async def send_message():
    uri = "ws://localhost:8000/ws"  # Replace with your WebSocket server URI
    
    df: pd.DataFrame = pd.read_csv("generator/data/BANKNIFTY24OCTFUT.csv", index_col=False)
    data: pd.Series

    async with websockets.connect(uri) as websocket:
        for _, data in df.iterrows():
            await websocket.send(data.to_json())
            await asyncio.sleep(1)    
        
        await websocket.close

asyncio.run(send_message())
