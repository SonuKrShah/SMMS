import React from 'react'
import { useState } from 'react';

export default function ContactUs() {

    const [message, setMessage] = useState(false);

    const sendMessage = (e) => {
        e.preventdefault();
        setMessage(true);
    }
    return (
        <section id="Contact" className="contact">
            <div className="container">
                <div className="section-title" data-aos="zoom-out">
                    <span className="display-2">Contact Us</span>
                </div>
                <div className="row mt-5">
                    <div className="col-lg-4" data-aos="fade-right">
                        <div className="info">
                            <div className="address">

                                <h4><i className="fas fa-map-marker-alt"></i>  Location:</h4>
                                <p>A108 Adam Street, New York, NY 535022</p>
                            </div>
                            <div className="email">
                                <h4><i className="fas fa-envelope"></i>  Email:</h4>
                                <p>info@example.com</p>
                            </div>
                            <div className="phone">
                                <h4><i className="fas fa-phone"></i>  Call:</h4>
                                <p>+91 8691847345</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 mt-5 mt-lg-0" data-aos="fade-left">
                        <form>
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                                </div>
                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                            </div>
                            <div className="form-group mt-3">
                                <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                            </div>

                            {message && <div className="text-center">Your message has been sent. Thank you!</div>}
                            <div className="text-center"><button className='btn btn-primary btn-md my-4' onSubmit={sendMessage}>Send Message</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
