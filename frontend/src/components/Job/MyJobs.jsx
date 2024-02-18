import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import {RxCross2 } from "react-icons/rx";

const MyJobs = () =>{


    const [myJobs, setMyJobs] = useState("");
    const [editingMode, setEditingMode] = useState(null)
    const { isAuthorized, user} = useContext(Context);
    const navigateTo = useNavigate();

    useEffect(() =>{
        const fetchJobs = async () =>{
            try {
                const { data } = await axios.get(
                    "http://localhost:3004/api/v1/job/myjob",
                    {
                        withCredentials: true, 
                    }
                );
                setMyJobs(data.myjobs);
            }catch(err){
                toast.error(err.response.data.message);
                console.log(err);
                setMyJobs([]);
            }
        }
        fetchJobs();
    }, []);
    

    useEffect(() =>{
        if(!isAuthorized || user && user.role !== "Employer"){
            navigateTo('/login')
        }
    }, [isAuthorized, user, navigateTo])

    // if(!isAuthorized || user && user.role !== "Employer"){
    //     navigateTo('/login')
    // }


    const handleEnableEdit = (jobId)=>{
        setEditingMode(jobId);
    }

    const handleDisableEdit = () =>{
        setEditingMode(null);
    }

    // Update JOB
    const handleUpdateJob = async(jobId) =>{
        const updatedJob = myJobs.find(job => job._id === jobId);
        await axios.put(
            `http://localhost:3004/api/v1/job/updateJob/${jobId}`,
            updatedJob,
            {
                withCredentials: true,
            },
        )
        .then((res) => {
            toast.success(res.data.message);
            setEditingMode(null);
            console.log("Job Updated successfully");
        })
        .catch((err) =>{
            toast.error(err.response.data.message);
            console.log(err);
        })
    }

    // Delete JOB 
    const handleDeleteJob = async(jobId) =>{
        await axios.delete(
            `http://localhost:3004/api/v1/job/deleteJob/${jobId}`,
            {
                withCredentials: true,
            },
        )
        .then((res) =>{
            toast.success(res.data.message);
            setMyJobs(preJobs => preJobs.filter(job => job._id !== jobId));
            console.log("Job Deleted ");
        })
        .catch((err) =>{
            toast.error(err.response.data.message);
            console.log(err);
        })
        
    }


    // Input change 
    const handleInuptChange = (jobId, field, value) =>{
        setMyJobs((prevJobs) =>
            prevJobs.map((job) =>
                job._id === jobId ? { ...job, [field]: value} : job
            )
        )
        console.log("Job info changed ");
    };
    

    return (
        <>
            {/* <h1>My Job pages</h1> */}
            <div className="myJobs page">
                <div className="container">
                    <h3>Your Posted JOBs</h3>
                    {
                        myJobs && myJobs.length > 0 ? (
                            <>
                                <div className="banner">
                                    {
                                        myJobs.map(element =>{
                                            return (
                                                <div className="card" key={element._id}>
                                                    <div className="content">
                                                        <div className="short_fields">
                                                            <div>
                                                                <span>Title: </span>
                                                                <input type="text" 
                                                                        disabled={editingMode !== element._id ? true : false}
                                                                        value={element.title}
                                                                        onChange={(e) =>handleInuptChange(element._id, "title", e.target.value)}
                                                                />
                                                            </div>

                                                            <div>
                                                                {" "}
                                                                <span>Country: </span>
                                                                <select value={element.country}
                                                                        onChange={(e) =>handleInuptChange(element._id, "country", e.target.value)}
                                                                        disabled={editingMode !== element._id ? true : false}
                                                                >
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
                                                            </div>

                                                            <div>
                                                                <span>City: </span>
                                                                <input type="text" 
                                                                        disabled={editingMode !== element._id ? true : false}
                                                                        value={element.city}
                                                                        onChange={(e) =>handleInuptChange(element._id, "city", e.target.value)}
                                                                />
                                                            </div>

                                                            <div>
                                                                <span>Category: </span>
                                                                <select value={element.category} 
                                                                        onChange={(e) =>handleInuptChange(element._id, "category", e.target.value)}
                                                                        disabled={editingMode !== element._id ? true : false}
                                                                >
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

                                                            <div>
                                                                <span>Salary: {
                                                                        element.fixSalary ? (
                                                                        <input type="number" 
                                                                                value={element.fixSalary}
                                                                                onChange={(e) =>handleInuptChange(element._id, "fixSalary", e.target.value)}
                                                                                disabled={editingMode !== element._id ? true : false}
                                                                        />
                                                                        ) : (
                                                                            <div>
                                                                                <input type="number" 
                                                                                        value={element.salaryFrom}
                                                                                        onChange={(e)=>handleInuptChange(element._id, "salaryFrom", e.target.value)}
                                                                                        disabled={editingMode !== element._id ? true : false}
                                                                                />

                                                                                <input type="number" 
                                                                                        value={element.salaryTo}
                                                                                        onChange={(e) =>handleInuptChange(element._id, "salaryTo", e.target.value)}
                                                                                        disabled={editingMode !== element._id ? true : false}
                                                                                />
                                                                                
                                                                            </div>
                                                                        )
                                                                        

                                                                    }
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span>Expire: </span>
                                                                <select value={element.expired}
                                                                        onChange={(e) =>handleInuptChange(element._id, "expired", e.target.value)}
                                                                        disabled={editingMode !== element._id ? true : false}
                                                                    
                                                                >
                                                                    <option value={true}>TRUE</option>
                                                                    <option value={false}>FALSE</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="long_field">
                                                            <div>
                                                                <span>Description: </span>
                                                                <textarea rows="5"
                                                                        value={element.description}
                                                                        onChange={(e) =>handleInuptChange(element._id, "description", e.target.value)}
                                                                        disabled={editingMode !== element._id ? true : false}
                                                                />
                                                                            
                                                            </div>
                                                            <div>
                                                                <span>Location: </span>
                                                                <textarea rows="5"
                                                                        value={element.location}
                                                                        onChange={(e) =>handleInuptChange(element._id, "location", e.target.value)}
                                                                        disabled={editingMode !== element._id ? true : false}
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="button_wrapper">
                                                        <div className="edit_btn_wrapper">
                                                            {
                                                                editingMode === element._id ? (
                                                                    <>
                                                                        <button onClick={() =>handleUpdateJob(element._id)} className="check_btn" >
                                                                            <FaCheck />
                                                                        </button>
                                                                        <button onClick={() =>handleDisableEdit()} className="cross_btn">
                                                                            <RxCross2 />
                                                                        </button>
                                                                    </>
                                                                ):(
                                                                    <button onClick={() =>handleEnableEdit(element._id)} className="edit_btn">
                                                                        Edit
                                                                    </button>
                                                                )
                                                            } 
                                                        </div>
                                                        <button onClick={() =>handleDeleteJob(element._id)} className="delete_btn"> 
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </>
                        ): (
                            <p>You're not post any job or your jobs might be deleted</p>                            
                        )
                    
                    }
                </div>
            </div>
        </>
    );
}


export default MyJobs;