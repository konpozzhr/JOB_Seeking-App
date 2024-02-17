import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, Link } from "react-router-dom";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineMail} from 'react-icons/md';
import { RiLock2Fill } from "react-icons/ri";


const Login = () =>{

    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const { isAuthorized, setIsAuthorized } = useContext(Context);

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const { data } = await axios.post(
                "http://localhost:3004/api/v1/user/login",
                {email, password, role},
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
            <Navigate to={"/"} />   
        </>
        );
    };


    return (
        <>

            <section className="authPage">
                <div className="container">
                    <div className="header">
                        <img  src="/JobZeelogo.png" alt="logo"/>
                        <h3>Login to the System</h3>
                    </div>

                    <form>
                        <div className="inputTag">
                            <label>Login As</label>
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
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sathya@gmail.com" />
                                <MdOutlineMail />
                            </div>
                        </div>

                        <div className="inputTag">
                            <label>Password</label>
                            <div>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <RiLock2Fill />
                            </div>
                        </div>
                        <button onClick={handleLogin}  type="submit">Login</button>
                        <Link to={'/register'}>Register</Link>
                        
                    </form>
                    <br></br><p><Link to={'/resetpassword'}>Reset Password</Link>    </p>
                </div>

                <div className="banner">
                    <img src="/login.png" alt="login" />  
                </div>
            </section>
            
        
        </>
    );
}



export default Login;




