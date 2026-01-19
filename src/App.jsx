import { useState,useEffect } from 'react'
import './App.scss'
import { read_excel_file } from './read_files.js'
import GameYearElement from './GameYearElement.jsx'
import ItemYearElement from './ItemYearElement.jsx'
import ItemTypeHolder from './ItemTypeHolder.jsx'

function App() {
  const [games, setGames] = useState([]);
  const [movies,setMovies]=useState([]);
  const [anime,setAnime]=useState([]);
  const [tv,setTV]=useState([]);

  const [game_year_elements,setGameYearElements]=useState([]);
  const [movie_elements,setMovieElements]=useState([]);
  const [anime_elements,setAnimeElements]=useState([]);

  const [item_type_holders,setItemTypeHolders]=useState([]);

  const [item_year_elements,setItemYearElements]=useState([]);

  const [target_year,setTargetYear]=useState(2024);
  let distances=[0,3,5,7,10,15];

  const item_type_names=["Games","Movies","Anime","TV"];
  /*
  const important_column_groups=[
    ["name","rating","ratings_count"],
    ["title","vote_average","vote_count"],
    ["name","score","scored_by"],
  ]
  */

  const important_column_groups=[
    ["name","average_rating","rating_count"],
    ["name","average_rating","rating_count"],
    ["name","average_rating","rating_count"],
    ["name","average_rating","rating_count"],
  ]



  useEffect(()=>{
      async function get_games()
      {
        //let games_temp=await read_excel_file("/vg-chartz/vgchartz-2024.xlsx");
        //let games_temp=await read_excel_file("vgchartz-data-my-version stable.xlsx");
        let games_temp=await read_excel_file("prepared_data/rawg_games_by_year_stable.xlsx");

        /*
        games_temp=games_temp.filter(game=>game["ratings_count"]>=10);

        games_temp = Array.from(new Set(games_temp.map(a => a.name)))
        .map(name => {
          return games_temp.find(a => a.name === name)
        })
        */

        console.log(games_temp);
        setGames(games_temp);
      }
      async function get_movies()
      {
        let movies_temp=await read_excel_file("prepared_data/TMDB_all_movies_top_10_by_year.xlsx");
        setMovies(movies_temp);
      }
      async function get_anime()
      {
        let anime_temp=await read_excel_file("prepared_data/anime_top_10_by_year.xlsx");
        setAnime(anime_temp);
      }
      async function get_tv()
      {
        let tv_temp=await read_excel_file("prepared_data/imdb_top_5000_tv_shows.xlsx");
        setTV(tv_temp);
      }
      async function get_items()
      {
        console.log("Get Games");
        await get_games();
        console.log("Get Movies");
        await get_movies();
        console.log("Get Anime");
        await get_anime();
        console.log("Get TV");
        await get_tv();
      }
      get_items();
    },[]);

    useEffect(()=>
    {
      if(tv&&tv.length>0)
      {
        display_items(target_year,[games,movies,anime,tv])
      }
    },[games,movies,anime,tv])

  function display_items(cur_target_year,item_types)
  {
    let item_type_holders_temp=[];
    for(let i=0;i<item_types.length;i++)
    {
      let item_type=item_types[i];
      let item_type_name=item_type_names[i];
      let important_columns=important_column_groups[i];

      const items_temp=[...item_type];
      let item_year_groups=[];
      for(let j=0;j<distances.length;j++)
      {
        const distance=distances[j];

        let distance_year=cur_target_year-distance;
        const filtered_items=items_temp.filter(item=>item["release_year"]==distance_year);

        //let item_year_element=<ItemYearElement key={i+" "+j} year={distance_year} distance={distance} items={filtered_items} important_columns={important_columns} item_name={item_name}></ItemYearElement>
        const item_year_group={"year":distance_year,"distance":distance,"items":filtered_items,"important_columns":important_columns,"item_type_name":item_type_name};
        item_year_groups.push(item_year_group);
      }
      item_type_holders_temp.push(<ItemTypeHolder key={i} item_type_name={item_type_name} item_year_groups={item_year_groups}></ItemTypeHolder>)
    }
    setItemTypeHolders(item_type_holders_temp);
  }

  function handleYear(e)
  {
    const temp_target_year=e.target.value;
    setTargetYear(temp_target_year);
    display_items(temp_target_year,[games,movies,anime])
  }

  return (
    <>
      <h1>Pop Culture by Year</h1>
      <p>View games, movies and anime that came out in specific years.</p>
      <h2>{target_year}</h2>
      <label htmlFor="target_year">Target Year</label>
      <input onChange={handleYear} id="target_year" value={target_year} type="number"></input>
      {item_type_holders}
      <h2>Notes</h2>
      <p>Items are sorted by the number of ratings</p>
      <p>Only the top 10 items of each year are shown</p>
      <h2>Works Cited</h2>
      <ul>
      <li><a href="https://www.kaggle.com/datasets/tanishksharma9905/top-popular-anime">
      https://www.kaggle.com/datasets/tanishksharma9905/top-popular-anime</a></li>
      <li><a href="https://www.kaggle.com/datasets/alanvourch/tmdb-movies-daily-updates">
      https://www.kaggle.com/datasets/alanvourch/tmdb-movies-daily-updates</a></li>
      <li><a href="https://rawg.io/">https://rawg.io/</a> (A Video Game Database)</li>
      <li><a href="https://www.kaggle.com/datasets/tiagoadrianunes/imdb-top-5000-tv-shows">
      https://www.kaggle.com/datasets/tiagoadrianunes/imdb-top-5000-tv-shows</a></li>
      </ul>
    </>
  )
}

export default App
