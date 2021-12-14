// import { Header } from './Components/Header';

import Header from "./Components/Header";
import { useState } from 'react';
import Slider from './Components/Slider';

import AboutUs from "./Components/AboutUs";
import ContactUs from './Components/ContactUs'
import Footer from "./Components/Footer";

function App() {
    const [Role, setRole] = useState("");
    return (
        <div className="App">
            <Header Role={Role} />
            <Slider />
            <AboutUs />

            {(Role !== "admin") && <hr className="container" />}
            {(Role !== "admin") && <ContactUs />}
            <Footer />
        </div>

    );
}

export default App;
