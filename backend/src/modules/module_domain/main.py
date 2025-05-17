import whois
from typing import Any
from urllib.parse import urlparse
from datetime import datetime

from src.utils.parse_date import parse_dirty_date
from src.modules.calc_risk import PhishingReport
from src.modules.module_domain.classes import DomainRisk, FeatureDomainDict
from src.modules.module_domain.constants import HIDDEN_KEYWORDS


def get_age(domain_info: Any) -> datetime:
    if domain_info is None:
        return datetime.now().day

    creation_date = domain_info.creation_date

    if isinstance(creation_date, str):
        creation_date = parse_dirty_date(creation_date)

    if isinstance(creation_date, list):
        if isinstance(creation_date, str):
            creation_date = parse_dirty_date(creation_date)

        return (datetime.now() - creation_date[0]).days

    return (datetime.now() - creation_date).days


def is_info_hidden(field: str | list[str]):
    if field is None:
        return True

    if isinstance(field, list):
        field = " ".join(field).lower()
    else:
        field = str(field).lower()

    for keyword in HIDDEN_KEYWORDS:
        if keyword.lower() in field:
            return True

    return False


def check_hidden_whois_info(domain_info: Any) -> bool:
    if domain_info is None:
        return False

    if is_info_hidden(domain_info.get("name")):
        return True
    if is_info_hidden(domain_info.get("address")):
        return True
    if is_info_hidden(domain_info.get("emails")):
        return True
    if is_info_hidden(domain_info.get("registrar")):
        return True
    if is_info_hidden(domain_info.get("org")):
        return True
    if is_info_hidden(domain_info.get("address")):
        return True
    if is_info_hidden(domain_info.get("name_servers")):
        return True

    return False


def extract_features(url: str) -> FeatureDomainDict:
    domain = urlparse(url).netloc
    domain_info = None

    try:
        domain_info = whois.whois(domain)
    except Exception as e:
        print(f"[!] Error getting WHOIS data for domain {domain}!")

    features: FeatureDomainDict = {
        "age": get_age(domain_info),
        "hidden_whois_info": check_hidden_whois_info(domain_info),
    }

    return features


def risk_calculation(features: FeatureDomainDict) -> DomainRisk:
    ONE_MONTH = 30
    THREE_MONTH = 90

    result = DomainRisk()

    if features["age"] < ONE_MONTH:
        result.domain_risk += 0.4
        result.features.is_new = True
    elif features["age"] < THREE_MONTH:
        result.domain_risk += 0.3
        result.features.is_latest = True
    if features["hidden_whois_info"]:
        result.domain_risk += 0.3
        result.features.is_hidden_info = True

    return result


def analyze(url: str, report: PhishingReport) -> PhishingReport:
    features = extract_features(url)
    result = risk_calculation(features)

    report.domain = result
    return report
