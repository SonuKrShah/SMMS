import '../Style/LoginStyle.css';
import { useState } from 'react';
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import React from 'react'

function AddShop() {
    const [ShopName, setShopName] = useState("");
    const [ShopEmail, setShopEmail] = useState("");
    const [ShopPhone, setShopPhone] = useState("");
    const [ShopAddress, setShopAddress] = useState("");
    const history = useHistory();

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const Mall_id = searchParams.get('Mall_id');

    // const [students, setStudents] = useState([]);

    const resetForm = async () => {
        setShopName("");
        setShopEmail("");
        setShopPhone("");
        setShopAddress("");
    }

    const addShop = async () => {
        Axios.post("http://localhost:3010/addShop", {
            Name: ShopName,
            C_No: ShopPhone,
            Address: ShopAddress,
            Email: ShopEmail,
            Mall_id: Mall_id
        }).then((result) => {
            console.log('Success');
        });
    }

    const handleSubmit = async (e) => {
        addShop();
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
            <h1 className="text-center my-3">Add New Shop</h1>
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
                        <button className="btn" style={btnStyle} type="submit">Add Shop</button>
                        <button className="btn" style={btnStyle} onClick={resetForm}>Reset Form</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default AddShop;