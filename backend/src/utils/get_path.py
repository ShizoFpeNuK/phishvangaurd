from pathlib import Path
import sys


def get_absolute_path(relative_path: str) -> Path:
    if hasattr(sys, "_MEIPASS"):
        base_path = Path(sys._MEIPASS)
        return base_path / relative_path
    else:
        base_path = Path(relative_path)
        return base_path
