import React , {useEffect , useState} from 'react'

const Contact = () => {
    const [userData , setUserData] = useState({name:"", email:"" , phone:"",message:""});
    const userContact = async () =>{
        try{
            const res = await fetch('/getdata' , {
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                },
                credentials:"include"
            });

            const data= await res.json();
            console.log(data);
            setUserData({ ...userData , name:data.name , email:data.email , phone:data.phone});

            if(!res.status==200){
                const error = new Error(res.error);
                throw error;
            }

        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        userContact();
    }, []);

    //we are storing data in states
    
    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData , [name]:value});
    }

    //send data to backened
    const contactForm = async (e) =>{
        e.preventDefault();

        const { name,email,phone,message} = userData;

        const res = await fetch('/contact',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name,email,phone,message
            })
        });

        const data = await res.json();

        if(!data)
            window.alert("Message not Sent");
        else    
            {
                alert("Message sent");
                setUserData({...userData , message:""});
            }
    }

    return (
        <>
            <div className="contact_info full-page">    
                <div className="container-fluid center">

                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
                            <div className="contact_info_item d-dlex justify-content-start align-items-center">
                                <img src="" alt="phone" />
                                <div className="contact_info_content"> 
                                    <div className="contact_info_title">
                                        Phone
                                    </div>
                                    <div className="contact_info_text">
                                        +91 * 7895354266
                                    </div>
                                </div>
                            </div>
                            <div className="contact_info_item d-dlex justify-content-start align-items-center">
                                <img src="" alt="email" />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Email
                                    </div>
                                    <div className="contact_info_text">
                                        +91 * 7895354266
                                    </div>
                                </div>
                            </div>
                            <div className="contact_info_item d-dlex justify-content-start align-items-center">
                                <img src="" alt="address" />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Address
                                    </div>
                                    <div className="contact_info_text">
                                        +91 * 7895354266
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="contact_form">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 offset-lg-1">
                                    <div className="contact_form_container py-5">
                                        <div className="contact_form_title">
                                            Get In Touch
                                        </div>
                                        <form id="contact_form" method="POST">
                                            <div className="contact_form_name d-flex justify-content-between align-items-center">
                                                <input type="text" id="contact_form_name"
                                                    className="contact_form_name input_field"
                                                    name="name"
                                                    autoComplete="off"
                                                    value={userData.name}
                                                    onChange={handleInputs}
                                                    placeholder="Your Name" required="true" /> 

                                                <input type="email" id="contact_form_email"
                                                    className="contact_form_email input_field"
                                                    name="email"
                                                    autoComplete="off"
                                                    value={userData.email}
                                                    onChange={handleInputs}
                                                    placeholder="Your Email" required="true" /> 

                                                <input type="number" id="contact_form_phone"
                                                    className="contact_form_phone input_field"
                                                    name="phone"
                                                    autoComplete="off"
                                                    value={userData.phone}
                                                    onChange={handleInputs}
                                                    placeholder="Your Phone Number" required="true" /> 
                                            </div>

                                            <div className="contact_form_text mt-4">
                                                <textarea className="text_field contact_form_message" 
                                                    name="message"
                                                    value={userData.message}
                                                    onChange={handleInputs}
                                                    placeholder="Enter Your Message" cols="40" rows="5"></textarea>
                                            </div>

                                            <div className="contact_form_button">
                                                <button type="submit" className="button contact_submit_button form-submit"
                                                    onClick={contactForm}>Send Message</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
