import React from 'react'
import Axios from "axios";
import { useState, useEffect } from 'react';
import Mall from './Mall';

export default function AllMalls({ Role }) {
    const [Malls, setMalls] = useState([]);
    const GetMalls = () => {
        Axios.get("http://localhost:3010/malls").then(async (result) => {
            setMalls(result.data);
            console.log(Malls);
        });
    }
    // This function will called only once
    useEffect(() => {
        GetMalls();
    }, [])

    const ImageStyle = {
        width: '80%',
        height: '400px',
        border: "1px solid grey",
        borderRadius: "1rem",
        boxShadow: "0 0 5px grey"
    };

    return (
        <div className='container'>
            <span className='display-2 text-center my-5'>ALL MALLS</span>

            {Malls.map((item) => {
                return <div className="row my-2 d-flex align-items-center">
                    <div className="col"><img src={require(`../Assets/Mall${item.Mall_id % 5 + 1}.jpg`).default} style={ImageStyle} alt="Error" /></div>
                    <Mall item={item} Role={Role} setMalls={setMalls} />
                    <hr className='container my-3' />
                </div>
            })}
        </div>
    )
}

// ${item.Mall_id % 10}
