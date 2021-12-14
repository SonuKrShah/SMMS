import '../Style/LoginStyle.css';
import { useState, useEffect } from 'react';
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';


import React from 'react'

function UpdateMall({ setRole, setP_id }) {

    const [ShopName, setShopName] = useState("");
    const [ShopEmail, setShopEmail] = useState("");
    const [ShopPhone, setShopPhone] = useState("");
    const [ShopAddress, setShopAddress] = useState("");
    const history = useHistory();

    const resetForm = async () => {
        setShopName("");
        setShopEmail("");
        setShopPhone("");
        setShopAddress("");
    }
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const Id = searchParams.get('Id');
    const GetDetails = () => {
        console.log("Entered Details");
        Axios.get(`http://localhost:3010/specificshop?Id=${Id}`).then((result) => {
            console.log(result.data);
            setShopName(result.data[0].Name);
            setShopPhone(result.data[0].C_no);
            setShopAddress(result.data[0].Address);
            setShopEmail(result.data[0].Email);
        });
    }
    useEffect(() => {
        GetDetails();
    }, []);

    const UpdateDetails = () => {
        console.log("Entered Update Details")
        Axios.post(`http://localhost:3010/UpdateShop`, {
            Shop_id: Id,
            Name: ShopName,
            C_no: ShopPhone,
            Email: ShopEmail,
            Address: ShopAddress,
        }).then((result) => {
        });
    }

    const handleSubmit = (e) => {
        console.log("Entered Update ON Database");
        UpdateDetails();
        e.preventDefault();
        history.push("/");
    }

    const btnStyle = {
        width: "30vw",
        padding: "1rem",
        border: "none",
        fontSize: "1.4rem"
    }

    return (
        <div className="LoginForm body my-2 mb-5">
            <h1 className="text-center my-3">Update Shop Details</h1>
            <div className="container container1 my-2">
                <form onSubmit={handleSubmit}>
                    <h1>Shop Details : </h1>
                    <div className="wrapper">
                        <label htmlFor="name">Shop Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter mall name" onChange={(event) => {
                            setShopName(event.target.value);
                        }} value={ShopName} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="Email">Email Id</label>
                        <input type="email" name="email" id="email" placeholder="Enter mall email number" onChange={(event) => {
                            setShopEmail(event.target.value);
                        }} value={ShopEmail} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="phone">Contact No.</label>
                        <input type="phone" name="phone" id="phone" placeholder="Enter mall contact number" onChange={(event) => {
                            setShopPhone(event.target.value);
                        }} value={ShopPhone} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="address">Address</label>
                        <textarea type="text" name="address" id="address" placeholder="Enter mall address" onChange={(event) => {
                            setShopAddress(event.target.value);
                        }} value={ShopAddress} required></textarea>
                    </div>
                    <br />
                    <div className="button_container">
                        <button className="btn" style={btnStyle} type="submit">Update</button>
                        <button className="btn" style={btnStyle} onClick={resetForm}>Reset Form</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default UpdateMall;