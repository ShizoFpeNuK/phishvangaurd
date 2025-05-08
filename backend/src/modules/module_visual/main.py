import os
import time
from urllib.parse import urlparse
import cv2
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from skimage.metrics import structural_similarity as ssim

from src.modules.calc_risk import NUM_IS_PHISHING, PhishingReport
from src.modules.module_visual.classes import FeatureVisualMarkDict


def make_screenshot(url: str) -> FeatureVisualMarkDict:
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--window-size=1280,800")
    options.add_argument("--disable-gpu")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    domain = urlparse(url).netloc
    base_dir = os.path.dirname(__file__)
    output_path = os.path.join(base_dir, f"./screenshots/phishing/{domain}.png")

    try:
        driver.get(url)
        time.sleep(2)
        driver.save_screenshot(output_path)
        print(f"[+] Сохранено: {output_path}")
    except Exception as e:
        print(f"[!] Ошибка: {url} — {e}")
    finally:
        driver.quit()


def compare_screenshots(url: str):
    domain = urlparse(url).netloc
    base_dir = os.path.dirname(__file__)
    suspect_path = os.path.join(base_dir, f"./screenshots/phishing/{domain}.png")
    reference_dir = os.path.join(base_dir, "./screenshots/legitimate")

    if os.path.exists(os.path.join(base_dir, f"./screenshots/legitimate/{domain}.png")):
        return False

    sus = cv2.imread(suspect_path, cv2.IMREAD_GRAYSCALE)
    results = []

    for file in os.listdir(reference_dir):
        path = os.path.join(reference_dir, file)
        ref = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
        if ref is None:
            continue
        ref = cv2.resize(ref, (sus.shape[1], sus.shape[0]))
        score, _ = ssim(sus, ref, full=True)
        results.append((file, score))

    results.sort(key=lambda x: x[1], reverse=True)

    return any(score[1] >= 0.9 for score in results)


def extract_features(url: str):
    features: FeatureVisualMarkDict = {"is_copy": compare_screenshots(url)}
    return features


def risk_calculation(features: FeatureVisualMarkDict) -> int | float:
    score = 0.0

    if features["is_copy"]:
        print("Признак: Копия легитимного сайта.")
        return NUM_IS_PHISHING

    return score


def module_visual_mark(url: str, report: PhishingReport | None = None) -> PhishingReport:
    make_screenshot(url)

    features = extract_features(url)
    score = risk_calculation(features)

    if report is None:
        return PhishingReport(score)
    else:
        report.visual_risk = score
        return report
