from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.server.classes import ServerReport, TestResult, URLRequest
from src.utils.module_loader import load_plugins
from src.modules.calc_risk.classes import PhishingReport

plugins = load_plugins(Path(__file__).parent / "modules")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["chrome-extension://gbnhijcnjnieefekpfdepnajhjfolfad"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# TODO: Вынести в отдельный модуль роутов
@app.get("/")
async def ping():
    return TestResult(message="Сервер жив")


@app.post("/analyze")
async def analyze(req: URLRequest):
    report = PhishingReport()

    for name, plugin in plugins.items():
        try:
            report = plugin.analyze(req.url, report)
        except Exception as e:
            print(f"[!] Ошибка в плагине {name}: {e}")

    return ServerReport(report=report)
