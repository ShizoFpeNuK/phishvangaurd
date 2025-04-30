from typing import TypedDict


class RiskModulesDict(TypedDict):
    url_risk: int | float
    domain_risk: int | float
    ssl_risk: int | float


class PhishingReport:
    def __init__(
        self,
        url_risk: int | float = 0,
        domain_risk: int | float = 0,
        ssl_risk: int | float = 0,
        visual_risk: int | float = 0,
    ):
        self.url_risk = url_risk
        self.domain_risk = domain_risk
        self.ssl_risk = ssl_risk
        self.visual_risk = visual_risk

    def get_risk_scores(self):
        return (self.url_risk, self.domain_risk, self.ssl_risk, self.visual_risk)
