from typing import TypedDict
from pydantic import BaseModel


class RiskModulesDict(TypedDict):
    url_risk: int | float
    domain_risk: int | float
    ssl_risk: int | float


class PhishingReport(BaseModel):
    url_risk: float = 0
    domain_risk: float = 0
    ssl_risk: float = 0
    visual_risk: float = 0

    def get_risk_scores(self):
        return (self.url_risk, self.domain_risk, self.ssl_risk, self.visual_risk)
