import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, Link } from "react-router-dom";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineMail} from 'react-icons/md';
import { FaPhoneFlip } from 'react-icons/fa6'
import { RiLock2Fill } from "react-icons/ri";


const Resetpassword = () =>{

    

    const [email, setEmail] = useState("");
    const [newPassword, setPassword] = useState("");
    const [role, setRole] = useState("");

    const { isAuthorized, setIsAuthorized } = useContext(Context);

    const handleResetPwd = async (e) =>{
        e.preventDefault();
        try{
            const { data } = await axios.post(
                "http://localhost:3004/api/v1/user/resetpassword",
                {email, newPassword, role},
                {
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    withCredentials: true,
                }
            );
            toast.success(data.message);
            
            setEmail("");
            setPassword("");
            setRole("");
            setIsAuthorized(true);
            console.log("Login successfully\n", data);
        
        }catch(err){
            toast.error(err.response.data.message);
            console.log(err);
        }

    }

    
    if(isAuthorized){
        
        return (
        <> 
            <Navigate to={"/login"} />   
        </>
        );
    };


    return (
        <>

            <section className="authPage">
                <div className="container">
                    <div className="header">
                        <img  src="/JobZeelogo.png" alt="logo"/>
                        <h3>Reset Your Password</h3>
                    </div>

                    <form>
                        <div className="inputTag">
                            <label>Please provide your Info</label>
                            <div>
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Select Role</option>
                                    <option value="Employer">Employer</option>
                                    <option value="Job Seeker">Job Seeker</option>
                                </select>
                                <FaRegUser />
                            </div>
                        </div>
                        
                        <div className="inputTag">
                            <label>Email Address</label>
                            <div>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
                                <MdOutlineMail />
                            </div>
                        </div>

                        <div className="inputTag">
                            <label> New Password</label>
                            <div>
                                <input type="password" value={newPassword} onChange={(e) => setPassword(e.target.value)} />
                                <RiLock2Fill />
                            </div>
                        </div>
                        <button onClick={handleResetPwd}  type="submit">Reset Password</button>
                        <Link to={'/login'}>Back to Login</Link>
                    </form>
                </div>

                <div className="banner">
                    <img src="/resetpass.png" alt="login" />  
                </div>
            </section>
            
        
        </>
    );
}



export default Resetpassword;




