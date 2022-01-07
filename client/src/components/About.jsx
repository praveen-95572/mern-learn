import React , {useEffect, useState} from 'react';
import { useHistory } from 'react-router';
//import aboutpic from ""
const About = () => {
    const history = useHistory();
    const [userData , setUserData] = useState({});
    const callAboutPage = async () =>{
        try{
            const res = await fetch('/about' , {
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                },
                credentials:"include"
            });

            const data= await res.json();
            //console.log(data);
            setUserData(data);

            if(!res.status==200){ 
                const error = new Error(res.error);
                throw error;
            }

        }
        catch(err){
            console.log(err);
            history.push("/login");
        }
    }

    useEffect(() => {
        callAboutPage();
    }, []);

    return (
        <>
            <div className="container emp-profile full-page">
                <form method="GET" className="center">
                    <div className="row">
                        <div className="col-md-4">
                            <img src="" alt="loading" />
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>{userData.name}</h5>
                                <h6>{userData.work}</h6>
                                <p className="profile-rating mt-3 mb-5">Ranking : <span>1/10</span> </p>

                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" value="Edit Profile"></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p>WORK LINK</p>
                                <a href=" " target="_blank">gjhjk</a><br/>
                                <a href=" " target="_blank">gjhjk</a><br/>
                                <a href=" " target="_blank">gjhjk</a><br/>
                                <a href=" " target="_blank">gjhjk</a><br/>
                            </div>
                        </div>

                        <div className="col-md-8 pl-5 about-info">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>User Id</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData._id}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Profession</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.work}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>User Id</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>hfgjk</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default About
