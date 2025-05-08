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

    print(req.url)

    for name, plugin in plugins.items():
        try:
            report = plugin.analyze(req.url, report)
            risk_score = get_risk(report)

            # TODO: Переделать
            if risk_score > 0.8:
                return ServerReport(
                    url=req.url,
                    type="phishing",
                    source="server",
                    risk_score=risk_score,
                    checked_at=int(datetime.now(timezone.utc).timestamp()),
                )
        except Exception as e:
            print(f"[!] Ошибка в плагине {name}: {e}")

    # TODO: Переделать
    return ServerReport(
        url=req.url,
        type="phishing",
        source="server",
        risk_score=risk_score,
        checked_at=int(datetime.now(timezone.utc).timestamp()),
    )
