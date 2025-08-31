import {useState,useEffect } from 'react'

function ItemYearElement(props)
{
    const year=props.year;
    const items=props.items;
    const distance=props.distance;

    const max_items=10;
    
    const [item_trs,setItemTrs]=useState([]);
    //const important_columns=["title","console","genre","critic_score","total_sales","release_date"]

    //const important_columns=["name","rating","ratings_count","metacritic"]
    const important_columns=props.important_columns;
    const item_ths=important_columns.map(important_column=><th>{important_column}</th>);

    function setup()
    {
        let item_trs_temp=[];
        for(let i=0;i<Math.min(max_items,items.length);i++)
        {
            let important_values=[];
            let item=items[i];
            for(let important_column of important_columns)
            {
                important_values.push(item[important_column]);
            }
            let item_tds=important_values.map((important_value,index)=><td key={distance+" "+i+" "+important_columns[index]}>{important_value}</td>)
            let item_tr=<tr key={distance+" "+i}>{item_tds}</tr>
            item_trs_temp.push(item_tr);
        }
        setItemTrs(item_trs_temp);
    }

    useEffect(()=>{
        setup();
    },[year]);

    return(
        <>
        <table className="table">
        <thead>
        <tr>
        {item_ths}
        </tr>
        </thead>
        <tbody>
        {item_trs}
        </tbody>
        </table>
        </>
    )
}

export default ItemYearElement
