import requests
import pandas as pd
import time

import os
from dotenv import load_dotenv

load_dotenv()
rawg_api_key=os.getenv("rawg_api_key")

def save_data(game_arr):
    game_df=pd.DataFrame.from_dict(game_arr)
    print(game_df.iloc[len(game_df)-20:len(game_df)-15])
    game_df.to_excel("raw_data/games/rawg_games_by_year.xlsx",sheet_name="Data")

target_platforms=[4,187,1,18,186,7,14,16,15,8,9,10,11,105]
target_platform_names=[]

def get_target_platform_names():
    target_platform_names=[]
    rawg_game_platforms=pd.read_excel("raw_data/platforms/rawg_game_platforms.xlsx")
    for target_platform in target_platforms:
        platforms=rawg_game_platforms[rawg_game_platforms["id"]==target_platform]
        print(platforms)
        platform_name=platforms.iloc[0]["name"]
        target_platform_names.append(platform_name)
    return target_platform_names

def main():
    target_platform_names=get_target_platform_names()
    print(target_platform_names)
    game_arr=[]

    for target_platform,target_platform_name in zip(target_platforms,target_platform_names):
        added_from_console=False
        for year in range(2000,2026):
            year_written=f"{year}-01-01,{year}-12-31"
            for page in range(1,2):
                params={"key":rawg_api_key,"page":page,"platforms":target_platform,"dates":year_written,"ordering":"-metacritic"}
                response=requests.get("https://api.rawg.io/api/games",params=params)
                print(f"{target_platform_name} {year} {page}")
                print(response.status_code)

                content=response.json()
                #print(content)

                if len(content["results"])==0 and not added_from_console:
                    continue
                elif len(content["results"])==0 and added_from_console:
                    break

                if len(content["results"])>0 and added_from_console:
                    added_from_console=True

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