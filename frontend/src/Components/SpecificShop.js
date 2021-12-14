import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';

export default function SpecificShop() {
    const [Shop, setShop] = useState("");
    const [Render, setRender] = useState(false);
    const { search } = useLocation();

    const ImgStyle = {
        width: "100%",
        borderRadius: "1rem"
    }

    const GetDetails = () => {
        console.log("Entered Details");
        const searchParams = new URLSearchParams(search);
        const Id = searchParams.get('Id');
        Axios.get(`http://localhost:3010/specificshop?Id=${Id}`).then((result) => {
            setShop(result.data[0]);
            setRender(true);
        });
    }

    useEffect(() => {
        GetDetails();
    }, [])
    if (Render) {
        return (
            <div className="container">
                <h1 className="display-2">
                    {Shop.Name}
                </h1>
                <div className="row">
                    <div className="col my-5">
                        {/* This contains the details */}
                        <span className='h3'><span className='fs-4 fw-normal'>{Shop.Description}</span>
                            <br />
                            <p className='fs-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo impedit eligendi optio. Consequatur perspiciatis corporis ab facere, optio eius obcaecati nulla dolorum vero dolor eveniet, eum explicabo saepe. Inventore voluptate aperiam pariatur. Voluptas consequatur ducimus debitis minima mollitia ut nobis, quia dignissimos ex odit amet facere beatae similique quibusdam autem.</p>
                        </span>
                        <br />
                        <span className='h3'>Address : <span className='fs-4 fw-normal'>{Shop.Address}</span> </span>
                        <br />
                        <span className='h3'>Email Id : <span className='fs-4 fw-normal'>{Shop.Email}</span> </span>
                        <br />
                        <span className='h3'>Contact No : <span className='fs-4 fw-normal'>{Shop.C_no}</span> </span>
                        <br />
                    </div>
                    <div className="col">
                        {/* This contains the  image */}
                        <img src={require(`../Assets/Shop${Shop.Shop_id % 10 + 1}.jpg`).default} alt="Error" style={ImgStyle} />
                    </div>

                </div>
            </div>
        )
    }
    return (
        <h1>Loading...</h1>
    )
}
