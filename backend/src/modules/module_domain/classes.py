from typing import TypedDict

# Может разделять скрытую информацию?
# Если используются странные поставщики - то риск выше
# Если информация скрыта, то не так плохо


class FeatureDomainDict(TypedDict):
    age: int | float
    hidden_whois_info: bool
    reputation: bool
