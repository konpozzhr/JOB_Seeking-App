import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";

const PostJob = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [salaryFrom, setSalaryFrom] = useState("");
    const [salaryTo, setSalaryTo] = useState("");
    const [fixSalary, setFixSalary] = useState("");
    
    const [salaryType, setSalaryType] = useState("default");

    const { isAuthorized, user } = useContext(Context);
    
    const handleJobPost = async (e) =>{
        e.preventDefault();
        if(salaryType === "Fixed Salary"){
            setSalaryFrom("");
            setSalaryTo("");
        }   
        else if(salaryType === "Ranged Salary"){
            setFixSalary("");
        }
        else {
            setSalaryFrom("");
            setSalaryTo("");
            setFixSalary("");
        }

        // await axios.post(
        //     "",
        //     fixSalary.length >= 4 
        //     ?   () 
        //     :   ()
        // );
    }



    return (
        <>
            <h1>Post Job Page</h1>
        </>  
    );
}


export default PostJob;