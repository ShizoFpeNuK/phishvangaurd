import numpy as np

from src.modules.calc_risk.classes import PhishingReport


def get_risk(risks: PhishingReport) -> bool:
    scores = risks.get_risk_scores()
    total_risk = 1 - np.prod([1 - r for r in scores])

    return total_risk
