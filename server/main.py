from typing import Union
import binascii
from fastapi import FastAPI, Path
from pydantic import BaseModel
from PIL import Image
from pprint import pprint
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import asyncio
import aiohttp

app = FastAPI()

app.mount("/client", StaticFiles(directory="client"), name="client")

origins = [
    "http://localhost:8001",
    "http://rpi1.kouba.xyz:8001",
    "http://rpi9.kouba.xyz:8001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pixel(BaseModel):
    r: int
    g: int
    b: int


NO_NEOPIXELS = 83

neopixels_data = dict(zip(range(NO_NEOPIXELS), (0,) * NO_NEOPIXELS))

loco_data = {
    2: {"start": 14, "end": 22},
    3: {"start": 8, "end": 15},
    4: {"start": 1, "end": 8},
    5: {"start": 31, "end": 38},
    6: {"start": 23, "end": 31},
    12: {"start": 58, "end": 60},
    13: {"start": 68, "end": 79},
    14: {"start": 52, "end": 57},
    15: {"start": 28, "end": 32},
    16: {"start": 61, "end": 68},
    17: {"start": 39, "end": 44},
    18: {"start": 45, "end": 52},
}


async def update_neopixels():
    """Synchronize internal state of neopixels with
    the server running on my rpi pico w
    """
    server_ip = "172.17.0.32"
    server_port = 80
    idx = 0
    value = neopixels_data[0]
    url = f"http://{server_ip}:{server_port}/{value}/{value}/{value}/{idx}"
    async with aiohttp.ClientSession() as session:
        while True:
            idx += 1
            if idx < NO_NEOPIXELS and neopixels_data[idx] == value:
                url += f"/{idx}"
            else:
                print(url)
                async with session.get(url) as response:
                    print(response)
                if idx < NO_NEOPIXELS:
                    value = neopixels_data[idx]
                    url = f"http://{server_ip}:{server_port}/{value}/{value}/{value}/{idx}"
                else:
                    break


@app.get("/trains/light/{loco_id}/{lightness}")
async def loco_get(loco_id: int, lightness: int):
    value = lightness % 256
    if loco_id in loco_data:
        for i in range(loco_data[loco_id]["start"], loco_data[loco_id]["end"] + 1):
            neopixels_data[i] = value
    await update_neopixels()
    return None


#######################
# DCC helpers and API #
#######################


class EchoClientProtocol(asyncio.Protocol):
    def __init__(self, message, on_con_lost):
        self.message = message
        self.on_con_lost = on_con_lost

    def connection_made(self, transport):
        transport.write(self.message.encode())
        print("Data sent: {!r}".format(self.message))

    def data_received(self, data):
        print("Data received: {!r}".format(data.decode()))

    def connection_lost(self, exc):
        print("The server closed the connection")
        self.on_con_lost.set_result(True)


async def send_dcc_cmd_close(cmd):
    loop = asyncio.get_running_loop()
    on_con_lost = loop.create_future()
    transport, protocol = await loop.create_connection(
        lambda: EchoClientProtocol(f"{cmd}\n", on_con_lost),
        "172.17.0.31",
        2560,
    )
    transport.close()
    try:
        await on_con_lost
    finally:
        transport.close()
    return None


@app.get("/trains/dcc/{loco_id}/{function}/{value}")
async def loco_get(loco_id: int, function: int, value: int):
    cmd = f"<F {loco_id} {function} {value}>"
    await send_dcc_cmd_close(cmd)
    return None


@app.get("/trains/dcc/power/{value}")
async def loco_get(value: int):
    value = 1 if value > 0 else 0
    cmd = f"<{value} MAIN>"
    await send_dcc_cmd_close(cmd)
    return None


@app.get("/neopixel")
async def root():
    return neopixels_data


@app.put("/neopixel/all/{v}")
async def neopixel_put(v: int):
    v = v % 256
    for i in range(len(neopixels_data)):
        neopixels_data[i] = v
    await update_neopixels()
    return None
