import shap
import joblib
import pandas as pd
from functools import lru_cache

from src.modules.module_url.classes import FeatureUrlDict, UrlRisk
from src.modules.module_url.constants import MODEL_PATH
from src.modules.calc_risk.classes import PhishingReport
from src.modules.module_url.utils import extract_features


@lru_cache(maxsize=1)
def get_model():
    return joblib.load(MODEL_PATH)


def risk_calculation(features: FeatureUrlDict) -> UrlRisk:
    MODEL_WEIGHT = 0.5

    clf = get_model()
    X = pd.DataFrame([features])

    explainer = shap.TreeExplainer(clf)
    shap_values = explainer.shap_values(X)
    result = UrlRisk(url_risk=clf.predict_proba(X)[0][1] * MODEL_WEIGHT)

    for name, value, shap_val in zip(X.columns, X.iloc[0], shap_values[0]):
        shap_single = shap_val[1] - shap_val[0]

        if name == "imitation_domain" and value:
            result.features.is_imitation = True
        elif name == "has_at_symbol" and value:
            result.features.has_at_symbol = True
        elif name == "url_length" and shap_single > 0:
            result.features.is_length = True
        elif name == "has_ip" and value:
            result.features.has_ip = True
        elif name == "num_subdomains" and shap_single > 0:
            result.features.has_subdomains = True
        elif name == "suspicious_words" and value:
            result.features.has_suspicious_words = True
        elif name == "has_dash" and value:
            result.features.has_dash = True
        elif name == "has_https" and not value:
            result.features.has_not_https = True
        elif name == "suspicious_tld" and value:
            result.features.has_suspicious_tld = True

    return result


def analyze(url: str, report: PhishingReport | None = None) -> PhishingReport:
    features = extract_features(url)
    score = risk_calculation(features)

    report.url = score
    return report
