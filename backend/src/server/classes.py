from typing import Any
from pydantic import BaseModel

from src.modules.calc_risk.classes import PhishingReport


class URLRequest(BaseModel):
    url: str


# TODO: Скорректировать
class ServerReport(BaseModel):
    url: str
    risk_score: float
    checked_at: int
    report: PhishingReport


class TestResult(BaseModel):
    message: Any
