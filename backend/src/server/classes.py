from typing import Any
from pydantic import BaseModel

from src.modules.calc_risk.classes import PhishingReport


class URLRequest(BaseModel):
    url: str


class ServerReport(BaseModel):
    report: PhishingReport


class TestResult(BaseModel):
    message: Any
