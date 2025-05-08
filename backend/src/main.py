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
