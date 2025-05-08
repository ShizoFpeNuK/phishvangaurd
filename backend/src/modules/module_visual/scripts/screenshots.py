import os
import time
from urllib.parse import urlparse
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


def make_screenshot(url: str, output_path: str):
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--window-size=1280,800")
    options.add_argument("--disable-gpu")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    try:
        driver.get(url)
        time.sleep(2)
        driver.save_screenshot(output_path)
        print(f"[+] Сохранено: {output_path}")
    except Exception as e:
        print(f"[!] Ошибка: {url} — {e}")
    finally:
        driver.quit()


def get_legit_screenshots():
    base_dir = os.path.dirname(__file__)
    input_path = os.path.join(base_dir, "../datasets/legitimate.csv")
    output_path = os.path.join(base_dir, "../screenshots/legitimate")

    df = pd.read_csv(input_path, header=None)

    for url in df[0]:
        domain = urlparse(url).netloc
        filename = os.path.join(output_path, f"{domain}.png")
        make_screenshot(url, filename)
