import pandas as pd
from pathlib import Path


def prepare_dataset():
    input_path = Path("datasets/dirty/dataset_phishing.csv")
    output_path = Path("datasets/clean/phishing_url.csv")

    df = pd.read_csv(input_path)
    columns_to_keep = ["url", "status"]

    columns_to_drop = [col for col in df.columns if col not in columns_to_keep]
    df = df.drop(columns=columns_to_drop)

    df.to_csv(output_path, index=False)


prepare_dataset()
