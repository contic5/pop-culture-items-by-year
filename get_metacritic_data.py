import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

def save_data(game_arr):
    game_df=pd.DataFrame.from_dict(game_arr)
    print(game_df.tail())
    game_df.sort_values(by="Overall_Sales",ascending=False)
    game_df.to_excel("vgchartz-data-my-version.xlsx")

def main():
    params={"releaseYearMin":1958,"releaseYearMax":2025,"platform":"ps5","page":1}
    response=requests.get("https://www.metacritic.com/browse/game/ps5/all/all-time/metascore/",params=params)
    print(response.status_code)
    
    soup=BeautifulSoup(response.content)
    print(soup.prettify())

if __name__=="__main__":
    main()