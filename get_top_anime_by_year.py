import pandas as pd

#https://www.kaggle.com/datasets/tanishksharma9905/top-popular-anime

anime_per_year=10
min_year=2000
max_year=2025

def main():
    anime_df=pd.read_csv("raw_data/anime/popular_anime.csv")
    
    anime_df=anime_df[~anime_df["aired_from"].isna()]
    anime_df["release_year"]=anime_df["aired_from"].str[:4].astype(int)
    anime_df=anime_df[anime_df["release_year"]>=min_year]
    anime_df=anime_df[anime_df["release_year"]<=max_year]
    print(anime_df.columns)

    anime_df=anime_df.sort_values(by="scored_by",ascending=False)
    '''
    anime_df['rank'] = anime_df.groupby('release_year')['vote_average'].rank(method='max', ascending=False)
    anime_df=anime_df[anime_df["rank"]<=anime_per_year]
    anime_df.drop(columns="rank")
    '''

    anime_df=anime_df.groupby('release_year').head(anime_per_year).reset_index(drop=True)
    print(len(anime_df))
    print(anime_df["release_year"].describe())

    print(anime_df.head())
    #anime_df.to_excel(f"raw_data/anime/anime_top_{anime_per_year}_by_year.xlsx",sheet_name="Data")

if __name__=="__main__":
    main()