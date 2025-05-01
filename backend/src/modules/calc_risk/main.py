import numpy as np

from src.modules.calc_risk.classes import PhishingReport


def system_risk_calc(risks: PhishingReport) -> bool:
    scores = risks.get_risk_scores()
    total_risk = 1 - np.prod([1 - r for r in scores])

    print(f"Общий риск: {total_risk}\n")

    return total_risk > 0.8
