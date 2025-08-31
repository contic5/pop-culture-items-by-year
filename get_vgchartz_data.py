import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

items_per_query=100
pages=2
consoles=["GC","DS","3DS","PS3","PS4","PS5","Wii","WiiU","XOne","PC","NS"]
get_sort_column="CriticScore"
end_sort_column="Sales_Total"

'''
Order should be CriticScore or TotalShipped
Get the top 500 by CriticScore
Then sort by Total Sales
'''

def save_data(game_arr):
    game_df=pd.DataFrame.from_dict(game_arr)
    print(game_df.tail())
    game_df.sort_values(by="Overall_Sales",ascending=False)
    game_df.to_excel("vgchartz-data-my-version.xlsx")

def main():
    game_arr=[]

    for console in consoles:
        for page in range(1,pages+1):
            params={"page":page,"results":items_per_query,"console":console,"order":get_sort_column,
                    "ownership":"Both","showtotalsales":1,"showpublisher":1,"showreleasedate":1,
                    "showvgchartzscore":1,"showcriticscore":1,"showuserscore":1,"showshipped":1,"showgenre":1,
            }
            response=requests.get("https://www.vgchartz.com/games/games.php",params=params)

            soup=BeautifulSoup(response.content)

            general_div=soup.find("div",id="generalBody")
            table=general_div.find("table")

            columns=[]
            tr=table.find_all("tr")[2]
            ths=tr.find_all("th")
            for th in ths:
                text=th.text
                text=text.replace("\n","")
                text=text.strip()
                columns.append(text)
            columns[1]="img"
            columns.insert(2,"name")
            print(columns)

            trs=table.find_all("tr")[3:3+items_per_query]
            for tr in trs:
                game_dict={}
                tds=tr.find_all("td")
                for i in range(len(tds)):
                    text=tds[i].text
                    text=text.strip()
                    print(f"{columns[i]} {text}")
                    game_dict[columns[i]]=text
                

                game_dict["Console"]=console
                game_dict["Overall_Sales"]=0
                for sales_column in ["Total Shipped","Total Sales"]:
                    try:
                        game_dict[sales_column]=game_dict[sales_column].replace("m","")
                        game_dict["Overall_Sales"]+=float(game_dict[sales_column])
                    except ValueError:
                        pass

                for key in game_dict:
                    try:
                        if not isinstance(game_dict[key],int):
                            game_dict[key]=float(game_dict[key])
                    except ValueError:
                        pass
                game_arr.append(game_dict)
            
            save_data(game_arr)
            time.sleep(1)


    save_data(game_arr)

if __name__=="__main__":
    main()