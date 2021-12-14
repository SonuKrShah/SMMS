import '../Style/LoginStyle.css';
import { useState, useEffect } from 'react';
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';


import React from 'react'

function UpdateMall({ setRole, setP_id }) {

    const [MallName, setMallName] = useState("");
    const [Mallemail, setMallEmail] = useState("");
    const [Mallphone, setMallPhone] = useState("");
    const [MallAddress, setMallAddress] = useState();
    const [Description, setDescription] = useState();
    const history = useHistory();

    const resetForm = async () => {
        setMallName("");
        setMallEmail("");
        setMallPhone("");
        setMallAddress("");
        setDescription("");
    }
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const Id = searchParams.get('Id');
    const GetDetails = () => {
        console.log("Entered Details");
        Axios.get(`http://localhost:3010/specificmall?Id=${Id}`).then((result) => {
            console.log(result.data);
            setMallName(result.data[0].Name);
            setMallPhone(result.data[0].C_no);
            setMallAddress(result.data[0].Address);
            setDescription(result.data[0].Description);
        });
    }
    useEffect(() => {
        GetDetails();
    }, []);
    const UpdateDetails = () => {
        console.log("Entered Update Details")
        Axios.post(`http://localhost:3010/UpdateMall`, {
            Mall_id: Id,
            Name: MallName,
            C_no: Mallphone,
            Address: MallAddress,
            Desc: Description
        }).then((result) => {
        });
    }

    const handleSubmit = (e) => {
        console.log("Entered Update Mall");
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
            <h1 className="text-center my-3">Update Mall Details</h1>
            <div className="container container1 my-2">
                <form onSubmit={handleSubmit}>
                    <h1>Mall Details : </h1>
                    <div className="wrapper">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter mall name" onChange={(event) => {
                            setMallName(event.target.value);
                        }} value={MallName} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="Email">Email Id</label>
                        <input type="email" name="email" id="email" placeholder="Enter mall email number" onChange={(event) => {
                            setMallEmail(event.target.value);
                        }} value={Mallemail} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="phone">Contact No.</label>
                        <input type="phone" name="phone" id="phone" placeholder="Enter mall contact number" onChange={(event) => {
                            setMallPhone(event.target.value);
                        }} value={Mallphone} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="address">Address</label>
                        <textarea type="text" name="address" id="address" placeholder="Enter mall address" onChange={(event) => {
                            setMallAddress(event.target.value);
                        }} value={MallAddress} required></textarea>
                    </div>
                    <div className="wrapper">
                        <label htmlFor="address">Address</label>
                        <textarea type="text" name="address" id="address" placeholder="Enter mall description" onChange={(event) => {
                            setDescription(event.target.value);
                        }} value={Description} required></textarea>
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