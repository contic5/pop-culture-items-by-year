import pandas as pd

file_locations=["raw_data/anime/anime_top_10_by_year.xlsx",
                "raw_data/games/rawg_games_by_year_stable.xlsx",
                "raw_data/movies_v2/TMDB_all_movies_top_10_by_year.xlsx",
                "raw_data/tv/imdb_top_5000_tv_shows.xlsx"]

original_columns_arr=[
    ["name","score","scored_by","release_year"],
    ["name","rating","ratings_count","release_year"],
    ["title","vote_average","vote_count","release_year"],
    ["primaryTitle","averageRating","numVotes","startYear"]
]
standardized_columns=["name","average_rating","rating_count","release_year"]
items_per_year=10

def main():
    for original_columns,file_location in zip(original_columns_arr,file_locations):
        file_name=file_location.split("/")[-1]

        df=pd.read_excel(file_location)
        df=df[original_columns]
        df.columns = standardized_columns
        df=df[df["rating_count"]>=10]
        df = df.drop_duplicates(subset=['name'])
        df=df.sort_values(by="rating_count",ascending=False)
        df=df.groupby('release_year').head(items_per_year).reset_index(drop=True)

        print(df.head())
        df.to_excel(f"public/prepared_data/{file_name}",sheet_name="Data")
        

if __name__=="__main__":
    main()