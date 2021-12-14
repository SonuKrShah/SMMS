// import { Header } from './Components/Header';

import Header from "./Components/Header";
import { useState } from 'react';
import Slider from './Components/Slider';

import AboutUs from "./Components/AboutUs";
import ContactUs from './Components/ContactUs';
import LoginPage from "./Components/LoginPage";
import Footer from "./Components/Footer";
import {
  Switch,
  Route,
} from 'react-router-dom';
import SignIn from "./Components/SignIn";
import AllMalls from "./Components/AllMalls";
import SpecificMall from "./Components/SpecificMall";
import SpecificShop from './Components/SpecificShop';
import AddMall from './Components/AddMall';
import UpdateMall from './Components/UpdateMall';
import AddShop from "./Components/AddShop";
import UpdateShop from './Components/UpdateShop';

function App() {
  const [Role, setRole] = useState("MM");
  return (
    <div className="App">
      <Switch>
        {/* Home Page */}
        <Route exact path='/'>
          <Header Role={Role} setRole={setRole} />
          <Slider />
          <AboutUs />
          {(Role !== "admin") && <hr className="container" />}
          {(Role !== "admin") && <ContactUs />}
          <Footer />
        </Route>
        <Route exact path='/login'>
          <Header Role={Role} setRole={setRole} />
          <LoginPage setRole={setRole} />
          <Footer />
        </Route>
        <Route exact path='/signin'>
          <Header Role={Role} setRole={setRole} />
          <SignIn setRole={setRole} />
          <Footer />
        </Route>
        <Route exact path="/allMalls">
          <Header Role={Role} setRole={setRole} />
          <AllMalls Role={Role} />
          <Footer />
        </Route>
        <Route path="/SpecificMall">
          <Header Role={Role} setRole={setRole} />
          <SpecificMall Role={Role} />
          <Footer />
        </Route>
        <Route path="/specificshop">
          <Header Role={Role} setRole={setRole} />
          <SpecificShop Role={Role} />
          <Footer />
        </Route>
        <Route path="/addmall">
          <Header Role={Role} setRole={setRole} />
          <AddMall />
          <Footer />
        </Route>
        <Route path="/addshop">
          <Header Role={Role} setRole={setRole} />
          <AddShop />
          <Footer />
        </Route>
        <Route path="/updatemall">
          <Header Role={Role} setRole={setRole} />
          <UpdateMall />
          <Footer />
        </Route>
        <Route path="/updateShop">
          <Header Role={Role} setRole={setRole} />
          <UpdateShop />
          <Footer />
        </Route>
        <Route>
          <h1>Page not found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
