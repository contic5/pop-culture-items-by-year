import {useState,useEffect } from 'react'

function GameYearElement(props)
{
    const year=props.year;
    const games=props.games;
    const distance=props.distance;

    const max_games=10;
    
    const [game_trs,setGameTrs]=useState([]);
    //const important_columns=["title","console","genre","critic_score","total_sales","release_date"]

    //const important_columns=["name","Console","Publisher","Critic Score","Overall_Sales","Year"]
    const important_columns=["name","rating","ratings_count","metacritic"]
    const game_ths=important_columns.map(important_column=><th>{important_column}</th>);

    function setup()
    {
        let game_trs_temp=[];
        for(let i=0;i<Math.min(max_games,games.length);i++)
        {
            let important_values=[];
            let game=games[i];
            for(let important_column of important_columns)
            {
                important_values.push(game[important_column]);
            }
            let game_tds=important_values.map((important_value,index)=><td key={distance+" "+i+" "+important_columns[index]}>{important_value}</td>)
            let game_tr=<tr key={distance+" "+i}>{game_tds}</tr>
            game_trs_temp.push(game_tr);
        }
        setGameTrs(game_trs_temp);
    }

    useEffect(()=>{
        setup();
    },[year]);

    return(
        <>
        <h2>Games from {year}</h2>
        <h3>{distance} Years Ago</h3>
        <table>
        <thead>
        <tr>
        {game_ths}
        </tr>
        </thead>
        <tbody>
        {game_trs}
        </tbody>
        </table>
        </>
    )
}

export default GameYearElement
