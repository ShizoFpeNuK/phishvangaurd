from typing import Any
from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from src.modules.module_domain.module_domain import module_domain

# TODO: Вынести в отдельный модуль настроек сервера
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["chrome-extension://gbnhijcnjnieefekpfdepnajhjfolfad"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# TODO: Вынести в отдельный модуль классов
class URLRequest(BaseModel):
    url: str


class PredictionResult(BaseModel):
    probability: float
    is_phishing: bool


class TestResult(BaseModel):
    message: Any


# TODO: Вынести в отдельный модуль роутов
@app.get("/")
async def ping():
    return TestResult(message="Сервер жив")


@app.post("/analyze")
async def analyze(req: URLRequest):
    result = module_domain(req.url)
    return TestResult(message=result.domain_risk)
