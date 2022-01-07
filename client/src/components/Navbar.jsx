import React , {useContext} from 'react'
import { UserContext } from '../App';

import { NavLink } from 'react-router-dom';
import logo from "../assets/images/logo2.png"

const Navbar = () => {
    const {state , dispatch} = useContext(UserContext);
    const RenderMenu = () => {
        if(state){
            return(
            <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/logout">Logout</NavLink>
                        </li>
            </>
            );
        }
        else{
            return(
                <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signup">Register</NavLink>
                        </li>
                </>
            );
        }
    }

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <img src={logo} alt="LOGO" width="70"/>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav borderXwidth">
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                        <RenderMenu/>
                    </ul>
                    
                    </div>
                </div>
                </nav>

                
        </div>
    )
}

export default Navbar
