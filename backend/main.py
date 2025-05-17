import sys
import os


sys.path.insert(0, os.path.join(os.path.dirname(__file__), "src"))

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.server.api import router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["chrome-extension://gbnhijcnjnieefekpfdepnajhjfolfad"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

if __name__ == "__main__":
    print("[INFO] Starting Uvicorn...")
    uvicorn.run(app, host="127.0.0.1", port=8000)
