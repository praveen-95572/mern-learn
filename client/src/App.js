import React, { createContext , useReducer } from 'react'
import 'bootstrap/dist/css/bootstrap.css';  //bootstrap through npm
import "bootstrap/dist/js/bootstrap.bundle";
import "./assets/css/App.css";
import "./assets/css/Logo.css"

import Navbar from './components/Navbar';
import Home from './components/Home';
import {Route , Switch} from "react-router-dom";
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/Signup';
import Login from './components/Login';
import Footer from './components/Footer';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';
import DeleayComponent from './components/DeleayComponent';

import { initialState , reducer} from './reducer/UseReducer';
// context API
export const UserContext = createContext();

const Routing = () =>{
  return(
    <Switch>
    <Route exact path="/">
      <Home/>
    </Route>

    <Route exact path="/contact">
      <Contact/>
    </Route>

    <Route exact path="/about">
      <About/>
    </Route>

    <Route exact path="/login">
      <Login/>
    </Route>

    <Route exact path="/signup">
      <Signup/>
    </Route>

    <Route exact path="/logout">
      <Logout/>
    </Route>

    <Route>
      <Errorpage />
    </Route>
  </Switch>
  );
}

const App = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      {/*<DeleayComponent/> */}
      <UserContext.Provider value={{state , dispatch}}>
      <Navbar/>
      <Routing/>
      <Footer/>

      </UserContext.Provider>
    </>
  )
}

export default App
