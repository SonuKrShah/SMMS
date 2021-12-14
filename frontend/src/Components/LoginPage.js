import '../Style/LoginStyle.css';
import { useState } from 'react';
import Axios from "axios";
import { useHistory } from "react-router-dom";

import React from 'react'

function LoginPage({ setRole, setP_id }) {
    const [name, setName] = useState("");
    const [age, setAge] = useState();
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [Address, setAddress] = useState();
    const history = useHistory();

    // const [students, setStudents] = useState([]);

    const resetForm = async () => {
        setName("");
        setAge("");
        setGender("");
        setEmail("");
        setPhone("");
        setPassword("");
        setAddress("");
    }

    const btnStyle = {
        width: "30vw",
        padding: "1rem",
        border: "none",
        fontSize: "1.4rem"
    }
    const addStudent = () => {
        Axios.post("http://localhost:3010/login", {
            Name: name,
            Age: age,
            Gender: gender,
            Email_ID: email,
            C_No: phone,
            Address: Address,
            Password: password,
            Role: 'customer'
        }).then(() => {
            console.log('Success');
            resetForm();
        });
    }
    const handleSubmit = (e) => {
        addStudent();
        setRole('customer');
        e.preventDefault();
        history.push("/");
    }
    return (
        <div className="LoginForm body my-2">
            <h1 className="text-center">Shopping Mall Management System</h1>
            <div className="container container1 my-2">
                <h1 className="text-center">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="wrapper">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter your name" onChange={(event) => {
                            setName(event.target.value);
                        }} value={name} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="age">Age</label>
                        <input type="number" name="age" id="age" placeholder="Enter your age" onChange={(event) => {
                            setAge(event.target.value);
                        }} value={age} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="gender">Gender</label>
                        <input type="text" name="gender" id="gender" placeholder="Enter your gender" onChange={(event) => {
                            setGender(event.target.value);
                        }} value={gender} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="phone">Phone No.</label>
                        <input type="phone" name="phone" id="phone" placeholder="Enter your phone number" onChange={(event) => {
                            setPhone(event.target.value);
                        }} value={phone} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="Email">Email Id</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email number" onChange={(event) => {
                            setEmail(event.target.value);
                        }} value={email} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter your password" onChange={(event) => {
                            setPassword(event.target.value);
                        }} value={password} required />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="address">Address</label>
                        <textarea type="text" name="address" id="address" placeholder="Enter your address" onChange={(event) => {
                            setAddress(event.target.value);
                        }} value={Address} required></textarea>
                    </div>
                    <div className="button_container">
                        <button className="btn" style={btnStyle} type="submit">Sign In</button>
                        <button className="btn" style={btnStyle} onClick={resetForm}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default LoginPage;