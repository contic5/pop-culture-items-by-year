import pandas as pd

#https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies

movies_per_year=10
min_year=2000
max_year=2025

def main():
    tmdb_df=pd.read_csv("public/movies/TMDB_movie_dataset_v11 2.csv")

    tmdb_df=tmdb_df[~tmdb_df["release_date"].isna()]
    tmdb_df["release_year"]=tmdb_df["release_date"].str[:4].astype(int)
    tmdb_df=tmdb_df[tmdb_df["release_year"]>=min_year]
    tmdb_df=tmdb_df[tmdb_df["release_year"]<=max_year]
    print(tmdb_df.columns)

    '''
    tmdb_df['rank'] = tmdb_df.groupby('release_year')['vote_average'].rank(method='max', ascending=False)
    tmdb_df=tmdb_df[tmdb_df["rank"]<=movies_per_year]
    tmdb_df.drop(columns="rank")
    '''

    tmdb_df=tmdb_df.groupby('release_year').head(movies_per_year).reset_index(drop=True)
    print(len(tmdb_df))
    print(tmdb_df["release_year"].describe())

    print(tmdb_df.head())
    tmdb_df.to_excel(f"public/movies/TMDB_movie_top_{movies_per_year}_by_year.xlsx",sheet_name="Data")

if __name__=="__main__":
    main()