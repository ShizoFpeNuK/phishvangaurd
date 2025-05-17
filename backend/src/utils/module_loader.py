import importlib.util
from typing import Callable, Dict

from src.utils.get_path import get_absolute_path

EXCLUDE_DIR = ["calc_risk"]


def load_plugins(modules_path: str) -> Dict[str, Callable]:
    plugins = {}
    base_path = get_absolute_path(modules_path)

    print("[INFO] Loading plugins...")

    if not base_path.exists():
        print(f"[!] Plugin directory does not exist: {base_path}!")
        return []

    for module_dir in base_path.iterdir():
        if module_dir.is_dir():
            if module_dir.name in EXCLUDE_DIR:
                continue

            main_file = module_dir / "main.py"
            if main_file.exists():
                module_name = f"{module_dir.name}_main"
                try:
                    spec = importlib.util.spec_from_file_location(module_name, str(main_file))
                    if spec and spec.loader:
                        module = importlib.util.module_from_spec(spec)
                        spec.loader.exec_module(module)
                        if hasattr(module, "analyze"):
                            plugins[module_dir.name] = module
                            print(f"[+] Plugin {module_dir.name} was loaded successfully!")
                        else:
                            print(f"[!] Plugin {module_dir.name} does not have 'analyze' function!")
                    else:
                        print(f"[!] Cannot load spec for '{module_name}'!")
                except Exception as e:
                    print(f"[!] Failed to load plugin '{module_dir.name}'!")

    return plugins
