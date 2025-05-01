import ssl
import pytz
from urllib.parse import urlparse
from datetime import datetime
from cryptography import x509
from cryptography.hazmat.backends import default_backend

from src.modules.calc_risk import NUM_IS_PHISHING, PhishingReport
from src.modules.module_ssl.classes import CertificateDict, FeatureSslDict


def get_certificate(domain: str) -> CertificateDict | None:
    try:
        cert = ssl.get_server_certificate((domain, 443))
        cert = x509.load_pem_x509_certificate(cert.encode(), default_backend())
    except Exception as e:
        print(f"Ошибка при проверке SSL сертификата: {e}")
        return None

    cert_info: CertificateDict = {
        "issuer": cert.issuer,
        "subject": cert.subject,
        "not_before": cert.not_valid_before_utc,
        "not_after": cert.not_valid_after_utc,
        "domain_cert": cert.subject.get_attributes_for_oid(x509.NameOID.COMMON_NAME)[0].value,
        "extensions": cert.extensions,
    }

    return cert_info


# Что делать, если нет сертификата?..
def extract_features(url: str) -> FeatureSslDict:
    domain = urlparse(url).netloc
    cert = get_certificate(domain)

    features: FeatureSslDict = {
        "self_signed": cert["issuer"] == cert["subject"],
        "domain_mismatch": not (
            domain.lower() in cert["domain_cert"].lower() or (cert["domain_cert"].lower() in domain.lower())
        ),
        "expired": datetime.now(pytz.utc) > cert["not_after"],
        "short_dated": (cert["not_after"] - cert["not_before"]).days,
        # Для простоты, считаем DV сертификат простым сертификатом с отсутствием расширений или SAN
        "dv_type": len(cert["extensions"]) == 0,
    }

    return features


def risk_calculation(features: FeatureSslDict) -> int | float:
    score = 0.0

    if features["self_signed"]:
        print("Признак: Самоподписанный сертификат.")
        return NUM_IS_PHISHING
    if features["domain_mismatch"]:
        print("Признак: Несовпадение домена и сертификата.")
        return NUM_IS_PHISHING

    if features["expired"]:
        score += 0.6
        print("Признак: Сертификат истёк.")
    elif features["short_dated"]:
        score += 0.4
        print("Признак: Краткосрочный сертификат.")
    # Для простоты, считаем DV сертификат простым сертификатом с отсутствием расширений или SAN
    if features["dv_type"]:
        print("Признак: DV (Domain Validation) сертификат.")

    return score


def analyze(url: str, report: PhishingReport | None = None) -> PhishingReport:
    features = extract_features(url)
    score = risk_calculation(features)

    if report is None:
        return PhishingReport(score)
    else:
        report.ssl_risk = score
        return report
