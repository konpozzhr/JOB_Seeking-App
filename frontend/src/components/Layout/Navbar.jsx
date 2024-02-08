import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () =>{

    const [show, setShow] = useState(false);
    const { isAuthorized, setIsAuthorized, user} = useContext(Context);
    const navigateTo = useNavigate();


    const handleLogout = async () =>{
        try{
            const response = await axios.get("http://localhost:3004/api/v1/user/logout", {withCredentials: true});
            toast.success(response.data.message);
            setIsAuthorized(false);
            navigateTo("/login");

        }catch(err){
            toast.error(err.response.message);
            setIsAuthorized(true);
        }
    }



    return (
        <>
        </>
    );
}



export default Navbar;
