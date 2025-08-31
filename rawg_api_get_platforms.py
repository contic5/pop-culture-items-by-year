import requests
import time
import pandas as pd

import os
from dotenv import load_dotenv

load_dotenv()
rawg_api_key=os.getenv("rawg_api_key")

def save_data(platform_arr):
    platform_df=pd.DataFrame.from_dict(platform_arr)
    print(platform_df.tail())
    platform_df.to_excel("raw_data/rawg_game_platforms.xlsx")

def main():
    platform_arr=[]
    for page in range(1,2):
        params={"key":rawg_api_key,page:page}
        response=requests.get("https://api.rawg.io/api/platforms",params=params)
        print(response.status_code)

        content=response.json()

        for item in content["results"]:
            print(item)
            platform_arr.append(item)
        save_data(platform_arr)
        time.sleep(1)
    save_data(platform_arr)

if __name__=="__main__":
    main()