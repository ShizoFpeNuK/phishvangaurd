import ssl
import pytz
import socket
from datetime import datetime
from cryptography import x509
from urllib.parse import urlparse
from cryptography.hazmat.backends import default_backend

from src.modules.calc_risk import NUM_IS_PHISHING, PhishingReport
from src.modules.module_ssl.classes import (
    CertificateDict,
    FeatureSslDict,
    SslRisk,
)


def get_certificate(domain: str) -> CertificateDict | None:
    try:
        context = ssl.create_default_context()
        with socket.create_connection((domain, 443), timeout=5) as sock:
            with context.wrap_socket(sock, server_hostname=domain) as ssock:
                der_cert = ssock.getpeercert(binary_form=True)
                cert = x509.load_der_x509_certificate(der_cert, default_backend())
    except Exception as e:
        print(f"[!] Error verifying SSL certificate!")
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


def extract_features(url: str) -> FeatureSslDict:
    domain = urlparse(url).netloc
    cert = get_certificate(domain)

    features: FeatureSslDict = {
        "self_signed": cert["issuer"] == cert["subject"],
        "domain_mismatch": not (
            domain.lower() in cert["domain_cert"].lower() or (cert["domain_cert"].lower() in domain.lower())
        ),
        "expired": datetime.now(pytz.utc) > cert["not_after"],
        "short_dated": (cert["not_after"] - cert["not_before"]).days < 30,
        "dv_type": len(cert["extensions"]) == 0,
    }

    return features


def risk_calculation(features: FeatureSslDict) -> SslRisk:
    result = SslRisk()

    if features["self_signed"]:
        result.ssl_risk = NUM_IS_PHISHING
        result.features.is_self_signed = True

        return result

    if features["domain_mismatch"]:
        result.ssl_risk += 0.4
        result.features.is_domain_mismatch = True
    if features["expired"]:
        result.ssl_risk += 0.3
        result.features.is_expired = True
    elif features["short_dated"]:
        result.ssl_risk += 0.4
        result.features.is_short_dated = True
    if features["dv_type"]:
        result.ssl_risk += 0.3
        result.features.is_dv_type = True

    return result


def analyze(url: str, report: PhishingReport) -> PhishingReport:
    features = extract_features(url)
    result = risk_calculation(features)

    report.ssl = result
    return report
