import React , {useState} from 'react'
import { NavLink , useHistory } from 'react-router-dom';
const Signup = () => {
    const history = useHistory();
    const [user , setUser] = useState({
        name:"" , email:"" , phone:"" , work:"", password:"" , cpassword:""
    });
    let name,value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user , [name] : value});
    }

    const PostData = async (e) => {
        e.preventDefault();

        const  { name , email , phone , work , password , cpassword } = user;

        const res = await fetch("/register" , {
            method:"POST" ,
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name , email , phone , work , password , cpassword
            })
        });
        const data = await res.json();

        if(res.status === 422 || !data){
            window.alert("Invalid registration");
            console.log("invalid");
        }
        else{
            window.alert("Successful Registration");
            console.log("Success");
            history.push("/login");
        }
    }

    return (
        <>
            <section className="signup full-page">
                <div className="container mt-5 center"> 
                    <div className="signup-content">
                        <div className="signup-form">
                            <h1 className="form-title">Sign up</h1>
                            <form className="register-form" id="register-form" method="POST">
                                <div class="form-group">
                                    <label htmlFor="name">
                                        <i class="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type="text" class="form-control input" name="name" id="name" placeholder="Your Name" value={user.name} 
                                    autoComplete="off" onChange={handleInputs} />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="email">
                                        <i class="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" class="form-control input" name="email" id="email" placeholder="Your Email" value={user.email} 
                                    autoComplete="off" onChange={handleInputs} />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="phone">
                                        <i class="zmdi zmdi-phone-in-talk material-icons-name"></i>
                                    </label>
                                    <input type="number" class="form-control input" name="phone" id="phone" placeholder="Your Phone" value={user.phone} 
                                    autoComplete="off" onChange={handleInputs}  />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="work">
                                        <i class="zmdi zmdi-slideshow material-icons-name"></i>
                                    </label>
                                    <input type="text" class="form-control input" name="work" id="work" placeholder="Your Profession" value={user.work} 
                                    autoComplete="off" onChange={handleInputs} />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="password">
                                        <i class="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" class="form-control input" name="password" id="password" placeholder="Your Password" value={user.password} 
                                    autoComplete="off" onChange={handleInputs} />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="cpassword">
                                        <i class="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" class="form-control input" name="cpassword" id="cpassword" placeholder="Confirm Your Password" value={user.cpassword}
                                    autoComplete="off" onChange={handleInputs} />
                                </div>
                                <div className="form-group">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register" 
                                    onClick={PostData}/>
                                </div>
                            </form>
                        </div>
                            
                        <div className="signup-image">
                            <figure>
                                <img src="" alt="Resgister pic" />
                            </figure>
                            <NavLink to='/login' className="signup-image-link">I am already Register</NavLink>
                        </div>
                        
                    </div>
                </div>

            </section>
        </>
    )
}

export default Signup
