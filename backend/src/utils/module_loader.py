import importlib.util
from pathlib import Path
from typing import Callable, Dict


def load_plugins(modules_path: str) -> Dict[str, Callable]:
    plugins = {}
    base_path = Path(modules_path)

    for module_dir in base_path.iterdir():
        if module_dir.is_dir():
            main_file = module_dir / "main.py"
            if main_file.exists():
                module_name = f"{module_dir.name}_main"
                spec = importlib.util.spec_from_file_location(module_name, str(main_file))
                if spec and spec.loader:
                    module = importlib.util.module_from_spec(spec)
                    spec.loader.exec_module(module)
                    if hasattr(module, "analyze"):
                        plugins[module_dir.name] = module
    return plugins
