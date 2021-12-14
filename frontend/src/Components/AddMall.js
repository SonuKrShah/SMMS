import '../Style/LoginStyle.css';
import { useState } from 'react';
import Axios from "axios";
import { useHistory } from "react-router-dom";

import React from 'react'

function AddMall({ setRole, setP_id }) {
    const [name, setName] = useState("");
    const [MallName, setMallName] = useState("");
    const [age, setAge] = useState();
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [Mallemail, setMallEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [Mallphone, setMallPhone] = useState("");
    const [Address, setAddress] = useState();
    const [MallAddress, setMallAddress] = useState();
    const [Description, setDescription] = useState();
    const [MallId, setMallId] = useState();
    const history = useHistory();

    // const [students, setStudents] = useState([]);

    const resetForm = async () => {
        setMallName("");
        setName("");
        setAge("");
        setGender("");
        setEmail("");
        setMallEmail("");
        setPhone("");
        setMallPhone("");
        setPassword("");
        setAddress("");
        setMallAddress("");
        setDescription("");
    }

    const addManager = async () => {
        Axios.post("http://localhost:3010/addMallManager", {
            Name: name,
            Age: age,
            Gender: gender,
            Email_ID: email,
            C_No: phone,
            Address: Address,
            Password: password,
            Mall_id: MallId

        }).then(() => {
            console.log('Success');
            resetForm();
        });
    }
    const addMall = async () => {
        Axios.post("http://localhost:3010/addMall", {
            Name: MallName,
            C_No: Mallphone,
            Address: MallAddress,
            Email_ID: email,
            Desc: Description,
        }).then(() => {
            console.log('Success');
            Axios.get("http://localhost:3010/lastAdded", {
                Name: MallName
            }).then((err, result) => {
                setMallId(result[0].Mall_id);
            })
        });
    }
    const handleSubmit = async (e) => {
        await addMall();
        await addManager();
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
            <h1 className="text-center my-3">Add New Mall</h1>
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
                    <h1 className='text-left'>Manager Details :</h1>
                    <div className="wrapper">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter name" onChange={(event) => {
                            setName(event.target.value);
                        }} value={name} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="age">Age</label>
                        <input type="number" name="age" id="age" placeholder="Enter age" onChange={(event) => {
                            setAge(event.target.value);
                        }} value={age} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="gender">Gender</label>
                        <input type="text" name="gender" id="gender" placeholder="Enter gender" onChange={(event) => {
                            setGender(event.target.value);
                        }} value={gender} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="phone">Phone No.</label>
                        <input type="phone" name="phone" id="phone" placeholder="Enter phone number" onChange={(event) => {
                            setPhone(event.target.value);
                        }} value={phone} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="Email">Email Id</label>
                        <input type="email" name="email" id="email" placeholder="Enter email number" onChange={(event) => {
                            setEmail(event.target.value);
                        }} value={email} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter password" onChange={(event) => {
                            setPassword(event.target.value);
                        }} value={password} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="address">Address</label>
                        <textarea type="text" name="address" id="address" placeholder="Enter address" onChange={(event) => {
                            setAddress(event.target.value);
                        }} value={Address} required></textarea>
                    </div>
                    <div className="button_container">
                        <button className="btn" style={btnStyle} type="submit">Add Mall</button>
                        <button className="btn" style={btnStyle} onClick={resetForm}>Reset Form</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default AddMall;