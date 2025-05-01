from datetime import datetime
from typing import Any, TypedDict


# Что с байтами делать?
class CertificateDict(TypedDict):
    issuer: Any
    subject: Any
    not_before: datetime
    not_after: datetime
    domain_cert: str | bytes
    extensions: Any


class FeatureSslDict(TypedDict):
    self_signed: bool
    short_dated: bool
    domain_mismatch: bool
    expired: bool
    dv_type: bool
