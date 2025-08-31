import requests
import pandas as pd
import time

import os
from dotenv import load_dotenv

load_dotenv()
rawg_api_key=os.getenv("rawg_api_key")

def save_data(game_arr):
    game_df=pd.DataFrame.from_dict(game_arr)
    print(game_df.tail())
    game_df.to_excel("raw_data/games/rawg_games.xlsx",sheet_name="Data")

target_platforms=[4,187,1,18,186,7,14,16,9,10,11,105]
def main():
    game_arr=[]

    for target_platform in target_platforms:
        for page in range(1,11):
            params={"key":rawg_api_key,"page":page,"platforms":target_platform,"ordering":"-metacritic"}
            response=requests.get("https://api.rawg.io/api/games",params=params)
            print(response.status_code)

            content=response.json()
            #print(content)

            for item in content["results"]:
                try:
                    item["Year"]=item["released"].year
                except AttributeError:
                    item["Year"]=item["released"][0:4]
                #print(item)
                game_arr.append(item)
            save_data(game_arr)
            time.sleep(1)
    save_data(game_arr)

if __name__=="__main__":
    main()