import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { read_excel_file } from './read_files.js'
import GameYearElement from './GameYearElement.jsx'

function App() {
  const [games, setGames] = useState([]);
  const [movies,setMovies]=useState([]);
  const [anime,setAnime]=useState([]);

  const [game_year_elements,setGameYearElements]=useState([]);
  const [movie_elements,setMovieElements]=useState([]);
  const [anime_elements,setAnimeElements]=useState([]);

  const [target_year,setTargetYear]=useState(2024);
  const distances=[0,3,5,7,10,15];

  useEffect(()=>{
      async function get_data()
      {
        //let games_temp=await read_excel_file("/vg-chartz/vgchartz-2024.xlsx");
        //let games_temp=await read_excel_file("vgchartz-data-my-version stable.xlsx");
        let games_temp=await read_excel_file("rawg_games_by_year_stable.xlsx");
        games_temp=games_temp.filter(game=>game["ratings_count"]>=10);

        games_temp = Array.from(new Set(games_temp.map(a => a.name)))
        .map(name => {
          return games_temp.find(a => a.name === name)
        })

        console.log(games_temp);
        setGames(games_temp);
      }
      get_data();
    },[]);

    useEffect(()=>
    {
      if(games&&games.length>0)
      {
        display_games(target_year)
      }
    },[games])

  function display_games(cur_target_year)
  {
    console.log(cur_target_year);
    const games_temp=[...games];
    let game_year_elements_temp=[];
    for(let i=0;i<distances.length;i++)
    {
      const distance=distances[i];

      let distance_year=cur_target_year-distance;
      const filtered_games=games_temp.filter(game=>game["Year"]==distance_year);
      //console.log(filtered_games[0]["title"]+" "+filtered_games[0]["Year"]);
      let game_year_element=<GameYearElement key={i} year={distance_year} distance={distance} games={filtered_games}></GameYearElement>
      game_year_elements_temp.push(game_year_element);
    }
    setGameYearElements(game_year_elements_temp);
  }

  function handleYear(e)
  {
    const temp_target_year=e.target.value;
    setTargetYear(temp_target_year);
    display_games(temp_target_year);
  }

  return (
    <>
      <h1>Games by Year</h1>
      <h2>{target_year}</h2>
      <p>Games with 10 or fewer ratings have been removed from the dataset.</p>
      <p>This website only shows the top 10 games each year by total number of ratings.</p>
      <label htmlFor="target_year">Target Year</label>
      <input onChange={handleYear} id="target_year" value={target_year} type="number"></input>
      {game_year_elements}
    </>
  )
}

export default App
