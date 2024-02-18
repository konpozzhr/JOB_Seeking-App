import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
    const navigateTo = useNavigate();

    const clearInput = ()=>{
        setTitle("");
        setDescription("");
        setCategory("");
        setCountry("");
        setCity("");
        setLocation("");
        setSalaryType("");
    }
    
    const handleJobPost = async (e) =>{
        e.preventDefault();
        if(salaryType === "Fixed Salary"){
            setFixSalary("");
        }   
        else if(salaryType === "Ranged Salary"){
            setSalaryFrom("");
            setSalaryTo("");
        }
        else {
            setSalaryFrom("");
            setSalaryTo("");
            setFixSalary("");
        }

        console.log("Data being sent to the backend:", 
        fixSalary.length >= 2
            ? { title, category, country, city, location, fixSalary, description }
            : { title, category, country, city, location, salaryFrom, salaryTo, description }
        );

        await axios.post(
            "http://localhost:3004/api/v1/job/post",
            fixSalary.length >= 2
            ?   { title, category, country, city, location, fixSalary, description }
            :   { title, category, country, city, location, salaryFrom, salaryTo, description },
            {
                withCredentials: true, 
                headers: {
                    "Content-Type" : "application/json",
                },
            }
        )
        .then((res) =>{
            toast.success(res.data.message);
            console.log(`POST Job Successfully\n`);
            clearInput();
            
        })
        .catch((err) =>{
            toast.error(err.response.data.message);
            console.log(err);
        });
    }

    


    useEffect(() =>{
        if(!isAuthorized || (user && user.role !== "Employer")){
            navigateTo('/login');
        }
    }, [isAuthorized, user, navigateTo]);



    return (
        <>
            {/* <h1>Post Job Page</h1> */}

            <div className="job_post page">
                <div className="container">
                    <h3>POST NEW JOB</h3>
                    <form onSubmit={handleJobPost}>
                        <div className="wrapper">
                            <input type="text" value={title} onChange={(e) =>setTitle(e.target.value)} placeholder="Job title"/>

                            <select value={category} onChange={(e) =>{setCategory(e.target.value); console.log("Selected category:", e.target.value);}}>
                                <option value="">Job Category</option>
                                <option value="Web Application Dev">Web Application Dev</option>
                                <option value="Desktop Application Dev">Desktop Application Dev</option>
                                <option value="Front-End Development">Front-End Development</option>
                                <option value="Back-End Development">Back-End Development</option>
                                <option value="Full-Stack Development">Full-Stack Development</option>
                                <option value="Mobile Development">Mobile Development</option>
                                <option value="Web Security">Web Security</option>
                                <option value="E-commerce Development">E-commerce Development</option>
                                <option value="Web Analytics">Web Analytics</option>
                                <option value="Serverless Development">Serverless Development</option>
                                <option value="Cloud Computing">Cloud Computing</option>
                            </select>
                        </div>
                        <div className="wrapper">
                            {/* <input type="text" value={country} onChange={(e) =>setCountry(e.target.value)} placeholder="country" /> */}
                            <select value={country} onChange={(e) =>{setCountry(e.target.value); console.log("Selected Country:", e.target.value);}}>
                                <option value="">Country</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Brunei">Brunei</option>
                                <option value="China">China</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="India">India</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Singapore">Singapore</option>
                                <option value="South Korea">South Korea</option>
                                <option value="Taiwan">Taiwan</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="United State">United State</option>
                                <option value="Russia">Russia</option>
                            </select>
                            <input type="text" value={city} onChange={(e) =>setCity(e.target.value)} placeholder="city" />
                        </div>
                        <input type="text" value={location} onChange={(e) =>setLocation(e.target.value)} placeholder="location" />
                        <div className="salary_wrapper">
                            <select value={salaryType} onChange={(e) =>setSalaryType(e.target.value)}>
                                <option value="default">Select Salary Type</option>
                                <option value="Fixed Salary">Fixed Salary</option>
                                <option value="Ranged Salary">Ranged Salary</option>
                            </select>
                            <div>
                                {
                                    salaryType === "default" ? 
                                        (<p>Please provide salary type</p>) 
                                        :
                                        (
                                            salaryType === "Fixed Salary" ? (
                                                <input type="number" placeholder="Enter Fixed Salary" value={fixSalary} onChange={(e) =>setFixSalary(e.target.value)}/>
                                            ):(
                                                <div className="ranged_salary">
                                                    <input type="number" placeholder="Salary From" value={salaryFrom} onChange={(e) =>setSalaryFrom(e.target.value)}/>
                                                    <input type="number" placeholder="Salary To" value={salaryTo} onChange={(e) =>setSalaryTo(e.target.value)} />
                                                </div>
                                            )   
                                        )
                                }
                            </div>
                        </div>
                        <textarea rows="5" value={description} onChange={(e) =>setDescription(e.target.value)} placeholder="Please Provide Job Description" />
                            
                        <div>
                            <button type="submit">Post Job</button>
                            <button type="reset" className="clear" onClick={clearInput}>clear</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </>  
    );
}


export default PostJob;