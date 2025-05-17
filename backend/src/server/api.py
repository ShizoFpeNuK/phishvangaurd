from datetime import datetime, timezone
from fastapi import APIRouter

from src.server.classes import ServerReport, TestResult, URLRequest
from src.utils.module_loader import load_plugins
from src.modules.calc_risk import PhishingReport, get_risk

plugins = load_plugins("src/modules")
router = APIRouter()


@router.get("/")
async def ping():
    return TestResult(message="Сервер жив")


@router.post("/analyze")
async def analyze(req: URLRequest):
    report = PhishingReport()
    risk_score = 0

    print(f"[INFO] Start URL analysis: {req.url}...")

    for name, plugin in plugins.items():
        report = plugin.analyze(req.url, report)
        risk_score = get_risk(report)

        if risk_score > 0.8:
            return ServerReport(
                url=req.url,
                risk_score=risk_score,
                report=report,
                checked_at=int(datetime.now().timestamp() * 1000),
            )

    return ServerReport(
        url=req.url,
        risk_score=risk_score,
        report=report,
        checked_at=int(datetime.now(timezone.utc).timestamp() * 1000),
    )
