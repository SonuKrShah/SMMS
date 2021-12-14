import React from 'react'
import '../Style/Footer.css'
import { Link } from 'react-router-dom';

export default function Footer() {

    const FooterStyle = {
        backgroundColor: '#333',
        padding: "10px",
        color: 'white'
    };
    return (
        <footer id="footer" style={FooterStyle}>
            <div className="container-fluid">
                <h3>Shopping Mall Management System</h3>
                <p className='text-center'>Et aut eum quis fuga eos sunt ipsa nihil. Labore corporis magni eligendi fuga maxime saepe commodi placeat.</p>
                <div className="social-links">
                    <Link to="#" className="twitter"><i className="fab fa-twitter"></i></Link>
                    <Link to="#" className="facebook"><i className="fab fa-facebook"></i></Link>
                    <Link to="#" className="instagram"><i className="fab fa-instagram"></i></Link>
                    <Link to="#" className="google-plus"><i className="fab fa-skype"></i></Link>
                    <Link to="#" className="linkedin"><i className="fab fa-linkedin"></i></Link>
                </div>
                <div className="copyright text-center">
                    &copy; Copyright <strong><span>SMMS</span></strong>. All Rights Reserved
                </div>
            </div>
        </footer>
    )
}
