import React from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";
import '../Style/ButtonStyle.css';

export default function Mall({ item, Role, setMalls }) {
    const ContentStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-evenly'
    }
    function DeleteMall(id) {
        console.log("Entered Deleting Mall");
        Axios.delete("http://localhost:3010/deleteMall", {
            params: {
                Mall_id: id,
                user: Role
            }
        }).then((result) => {
            Axios.get("http://localhost:3010/malls").then(async (result) => {
                setMalls(result.data);
            });
        });
    }
    return (
        <div className='col' style={ContentStyle} >
            <div className="content" >
                <span className='h3'>Name : <span className='fs-4 fw-normal'>{item.Name}</span></span>
                <br />
                <span className='h3'>Contact No : <span className='fs-4 fw-normal'>{item.C_no}</span></span>
                <br />
                <span className='h3'>Address : <span className='fs-4 fw-normal'>{item.Address}</span> </span>
                <br />
                <span className='h3'>Description - <span className='fs-4 fw-normal'>{item.Description}</span> </span>
                <br />
            </div>
            <div>
                <Link className="btn btn-primary btn-sm my-1" to={`/SpecificMall?Id=${item.Mall_id}`}>View More</Link>
                {Role === "admin" && <Link className="btn btn-sm" onClick={() => DeleteMall(item.Mall_id)}>Delete Mall</Link>}
                {Role === "admin" && <Link className="btn btn-sm" to={`/updateMall?Id=${item.Mall_id}`}>Update Details</Link>}
            </div>
        </div>
    )
}
