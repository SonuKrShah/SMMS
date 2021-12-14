import React from 'react'
import { Link } from 'react-router-dom';

export default function Slider() {

    const ImgHeight = {
        height: '90vh',
        width: "100%",
        backgroundSize: "cover",
        // opacity: 0.6
    };

    const cItem = {
        position: "relative"
    };
    const TextStyle = {
        position: "absolute",
        top: "25%",
        left: "25%",
        width: "50%",
        color: "white",
        backgroundColor: "rgba(59, 69, 83, 0.623)",
        borderRadius: "1rem",
        height: "38vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    };

    const btnStyle = {
        width: "30vw",
        padding: "1rem",
        border: "none",
        fontSize: "1.4rem"
    }

    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active" style={cItem} >
                    <img src={require("../Assets/Slider1.jpg").default} className="d-block w-100" style={ImgHeight} alt="..." />
                    <div className="container" style={TextStyle}>
                        <h1 className='display-4'>Welcome</h1>
                        <p className='h4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis molestias ducimus blanditiis molestiae doloribus, quia odit similique amet repellendus non.</p>
                        <Link to={`/allMalls`} className='btn btn-lg btn-primary' style={btnStyle}>View Malls...</Link>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={require("../Assets/Slider2.jpg").default} style={ImgHeight} className="d-block w-100" alt="..." />
                    <div className="container" style={TextStyle}>
                        <h1 className='display-4'>About Us</h1>
                        <p className='h4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis molestias ducimus blanditiis molestiae doloribus, quia odit similique amet repellendus non. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, recusandae.</p>
                        <button className='btn btn-lg btn-primary'>More..</button>
                    </div>

                </div>
                <div className="carousel-item">
                    <img src={require("../Assets/Slider3.jpg").default} style={ImgHeight} className="d-block w-100" alt="..." />
                    <div className="container" style={TextStyle}>
                        <h1 className='display-4'>Contact Us</h1>
                        <p className='h4'>
                            Email ID: this@this.com
                            <br />
                            Contact No: 1231231231
                        </p>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}
