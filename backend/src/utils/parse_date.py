import re
from datetime import datetime
from typing import Optional


def parse_dirty_date(date: str) -> Optional[datetime]:
    cleaned_data = re.sub(r"(\d+)(st|nd|rd|th)", r"\1", date.lower())
    cleaned_data = cleaned_data.replace(" at ", " ")

    try:
        return datetime.strptime(cleaned_data, "%d %B %Y %H:%M:%S.%f")
    except ValueError:
        return None
