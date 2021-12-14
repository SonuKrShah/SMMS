import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../Style/ButtonStyle.css';
export default function SpecificMall({ Role }) {

    const btnStyle = {
        width: "30vw",
        padding: "1rem",
        border: "none",
        fontSize: "1.4rem"
    }

    const ImgStyle = {
        width: "100%",
        borderRadius: "1rem"
    }

    const ShopImgStyle = {
        width: "33vw",
        borderRadius: "1rem"
    }

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const Id = searchParams.get('Id');

    // Call the database for the details
    const [MallD, setMallD] = useState([]);
    const [Shops, setShops] = useState([]);
    const [Render, setRender] = useState(false);
    // Get details of mall

    const GetDetails = () => {

        console.log("Entered Details");

        Axios.get(`http://localhost:3010/specificmall?Id=${Id}`).then((result) => {
            setMallD(result.data);
            setRender(true);
            console.log(MallD);
        });
        Axios.get(`http://localhost:3010/shopsmall?Id=${Id}`).then((result) => {
            setShops(result.data);
        });
    }

    useEffect(() => {
        GetDetails();
    }, []);
    const DeleteShop = (shopId) => {
        console.log("Entered Deleting Mall");
        Axios.delete("http://localhost:3010/deleteShop", {
            params: {
                Shop_id: shopId,
            }
        }).then((result) => {
            Axios.get(`http://localhost:3010/shopsmall?Id=${Id}`).then(async (result) => {
                setShops(result.data);
            });
        });
    }
    if (Render) {
        return (

            <div className="container my-5">
                <h1 className='display-4'>{MallD[0].Name}</h1>
                <div className="row">
                    <div className="col my-5">
                        {/* This contains the details */}
                        <span className='h3'><span className='fs-4 fw-normal'>{MallD[0].Description}</span>
                            <br />
                            <p className='fs-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo impedit eligendi optio. Consequatur perspiciatis corporis ab facere, optio eius obcaecati nulla dolorum vero dolor eveniet, eum explicabo saepe. Inventore voluptate aperiam pariatur. Voluptas consequatur ducimus debitis minima mollitia ut nobis, quia dignissimos ex odit amet facere beatae similique quibusdam autem.</p>
                        </span>
                        <br />
                        <span className='h3'>Address : <span className='fs-4 fw-normal'>{MallD[0].Address}</span> </span>
                        <br />
                        <span className='h3'>Email Id : <span className='fs-4 fw-normal'>{MallD[0].Address}</span> </span>
                        <br />
                        <span className='h3'>Contact No : <span className='fs-4 fw-normal'>{MallD[0].C_no}</span> </span>
                        <br />
                    </div>
                    <div className="col">
                        {/* This contains the  image */}
                        <img src={require('../Assets/g2.jpg').default} alt="Error" style={ImgStyle} />
                    </div>
                </div>

                <br />
                <hr />
                <br />
                <h1 className='display-3'>Shops</h1>
                <div className="container">
                    {Shops.map(item => {
                        return <div className="row my-3">
                            <div className="col">
                                {/* Image */}
                                <img src={require('../Assets/g2.jpg').default} alt="Error" style={ShopImgStyle} />
                            </div>
                            <div className="col">
                                {/* Details */}
                                <span className='h1'>{item.Name}</span>
                                <br />
                                <span className='h3'><span className='fs-4 fw-normal'>{item.Description}</span>
                                    <br />
                                    <p className='fs-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo impedit eligendi optio. Consequatur perspiciatis corporis ab facere, optio eius obcaecati nulla dolorum vero dolor eveniet, eum explicabo saepe. Inventore voluptate aperiam pariatur. Voluptas consequatur ducimus debitis minima mollitia ut nobis, quia dignissimos ex odit amet facere beatae similique quibusdam autem.</p>
                                </span>
                                <br />
                                <span className='h3'>Address : <span className='fs-4 fw-normal'>{item.Address}</span> </span>
                                <br />
                                <span className='h3'>Email Id : <span className='fs-4 fw-normal'>{item.Address}</span> </span>
                                <br />
                                <span className='h3'>Contact No : <span className='fs-4 fw-normal'>{item.C_no}</span> </span>
                                {/* Logic for View Details */}
                                <br />
                                <Link className="btn btn-primary btn-sm my-1" to={`/specificshop?Id=${item.Shop_id}`}>View More</Link>
                                {Role === "MM" && <Link className="btn btn-sm" onClick={() => DeleteShop(item.Shop_id)}>Delete Shop</Link>}
                                {Role === "MM" && <Link className="btn btn-sm" to={`/updateShop?Id=${item.Shop_id}`}>Updated Details</Link>}
                            </div>

                            <br />
                            <hr className='my-3' />
                            <br />
                        </div>
                    })}
                </div>

                {Role === "MM" && <Link className='btn btn-primary' style={btnStyle} to={`/addshop?Mall_id=${Id}`}> Add Shop </Link>}
            </div>
        )
    }
    return (
        <h1>Loading...</h1>
    )
}
