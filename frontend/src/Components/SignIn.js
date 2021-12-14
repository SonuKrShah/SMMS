import '../Style/LoginStyle.css';
import { useState } from 'react';
import Axios from "axios";
import { useHistory } from "react-router-dom";

import React from 'react'

function SignIn({ setRole, setP_id }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    // const [students, setStudents] = useState([]);

    const resetForm = async () => {
        setEmail("");
        setPassword("");
    }
    const btnStyle = {
        width: "30vw",
        padding: "1rem",
        border: "none",
        fontSize: "1.4rem"
    }

    const Signin = () => {
        // Email_ID, Password
        Axios.get("http://localhost:3010/signin", {
            params: {
                Email_ID: email,
                Password: password
            }
        }).then(async (result) => {

            setRole(result.data);
            console.log(result.data);
            resetForm();
            console.log("Obtained Result");
        });
    }
    const handleSubmit = (e) => {
        Signin();
        setRole('customer');
        e.preventDefault();
        history.push("/");
    }
    return (
        <div className="SignInForm body my-2">
            <h1 className="text-center">Shopping Mall Management System</h1>
            <div className="container container1 my-2">
                <h1 className="text-center">Sign In</h1>
                <form onSubmit={handleSubmit}>
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
                    <div className="button_container">
                        <button className="btn" style={btnStyle} type="submit">Login</button>
                        <button className="btn" style={btnStyle} onClick={resetForm}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default SignIn;
