import React from 'react'
import '../Style/HeaderStyle.css';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


export default function Header({ Role, setRole }) {

    const history = useHistory();
    const Logout = () => {
        setRole("");
        history.push("/");
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand mr-5" to="/">SMMS</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item  mx-2">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link" to="allMalls">All Malls</Link>
                        </li>

                        {(Role === "" || Role === "customer" || Role === "MM" || Role === "SO") && <li className="nav-item mx-2">
                            <Link className="nav-link" to="/#Contact">Contact Us</Link>
                        </li>}

                        {(Role === "admin") && <li className="nav-item mx-2">
                            <Link className="nav-link" to="/addmall">Add Mall</Link>
                        </li>}

                        {Role === "" &&
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="login">Sign Up</Link>
                            </li>
                        }
                        {Role === "" &&
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/signin">Sign In</Link>
                            </li>
                        }
                        {Role !== "" &&
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="#" onClick={Logout}>Logout</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
