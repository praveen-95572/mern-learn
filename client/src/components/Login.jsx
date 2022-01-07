import React ,{useState , useContext} from 'react'
//import loginpic from "../assets/images/login.svg";
import { NavLink , useHistory } from 'react-router-dom';

import { UserContext } from '../App';
const Login = () => {
    const {state , dispatch} = useContext(UserContext);
    const history = useHistory();

    const [email,setEmail] = useState('');
    const [password,setPasssword] = useState('');

    const loginUser = async (e) =>{
        e.preventDefault();
        const res = await fetch('/signin',{
            method:"POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email , password
            })
        })

        const data =await res.json();
        if(res.status === 400 || !data){
            window.alert("Invalid Credentials");
        }
        else{
            dispatch({type:"USER" , payload:true});
            window.alert("Login Successful");
            history.push("/");
        }
    }

    return (
        <>
            <section className="signin full-page">
                <div className="container mt-5 center">
                    <div className="signin-content">

                        <div className="signin-image">
                            <figure>
                                <img src="" alt="Resgister pic" />
                            </figure>
                            <NavLink to='/signup' className="signin-image-link">Create an account</NavLink>
                        </div>

                        <div className="signin-form">
                            <h1 className="form-title">Sign In</h1>
                            <form method="POST" className="register-form" id="register-form">
                                
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" className="form-control input" name="email" id="email"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your Email" autoComplete="off"/>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" className="form-control input" name="password" id="password"
                                        value={password} onChange={(e) => setPasssword(e.target.value)}
                                        placeholder="Your Password" autoComplete="off"/>
                                </div>
                               
                                <div className="form-group">
                                    <input type="submit" name="signin" id="signin" className="form-submit" 
                                        onClick={loginUser}
                                        value="Log In" />
                                </div>
                            </form>
                        </div>
                            
                        
                        
                    </div>
                </div>

            </section>
        </>
    )
}

export default Login
