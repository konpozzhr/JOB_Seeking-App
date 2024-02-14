import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, Link } from "react-router-dom";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineMail} from 'react-icons/md';
import { FaPhoneFlip } from 'react-icons/fa6'
import { RiLock2Fill } from "react-icons/ri";


const Register = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const {isAuthorized, setIsAuthorized, user, setUser} = useContext(Context);

    const handleRegister = async (e) =>{
        e.preventDefault();
        try{
            const { data } = await axios.post(
                "http://localhost:3004/api/v1/user/register", 
                {name, email, password, phone, role},
                {
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    withCredentials: true,
                }
            );
            toast.success(data.message);
            setName("");
            setEmail("");
            setPassword("");
            setPhone("");
            setRole("");
            setIsAuthorized(true);
            console.log('User register success\n', data);
        }catch(err){
            toast.error(err.response.data.message);
            console.error(err);
        }
    };

    if(isAuthorized){
        return <Navigate to={"/"} />;
    }

// return <h1>Register Page</h1>

    return (
        <>
            <section className="authPage">
                <div className="container">
                    <div className="header">
                        <img  src="/JobZeelogo.png" alt="logo"/>
                        <h3>Create a new account</h3>
                    </div>

                    <form>
                        <div className="inputTag">
                            <label>Register As</label>
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
                            <label>Name</label>
                            <div>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Sathya" />
                                <FaPencilAlt />
                            </div>
                        </div>

                        <div className="inputTag">
                            <label>Email Address</label>
                            <div>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sathya@gmail.com" />
                                <MdOutlineMail />
                            </div>
                        </div>

                        <div className="inputTag">
                            <label>Phone</label>
                            <div>
                                <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="012345"/>
                                <FaPhoneFlip />
                            </div>
                        </div>

                        <div className="inputTag">
                            <label>Password</label>
                            <div>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <RiLock2Fill />
                            </div>
                        </div>

                        <button onClick={handleRegister} type="submit">Register</button>
                        <Link to={'/login'}>Login Now</Link>
                    </form>
                </div>

                <div className="banner">
                    <img src="/register.png" alt="register" />  
                </div>
            </section>
        
        </>

        
    );
};


export default Register;


