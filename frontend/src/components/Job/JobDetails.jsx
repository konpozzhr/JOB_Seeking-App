import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";

const JobDetails = () =>{

    const { id } = useParams();
    const [ job, setJob] = useState({});
    const navigateTo = useNavigate();

    const { isAuthorized } = useContext(Context);

    useEffect(() =>{
        axios.get(
            `http://localhost:3004/api/v1/job/details/${id}`,
            { withCredentials: true },
        )
        .then((res) =>{
            setJob(res.data.job);
        })
        .catch((err) =>{
            console.log(err.response.data.json);
        })
    }, []);

    if(!isAuthorized){
        navigateTo('/login');
    }


    return (
        <>
            {/* <h1>Job Details</h1> */}
            <div className="jobDetail page">
                <div className="container">
                    <h3>Job Details</h3>
                    <div className="banner">
                        <p>Title: <span>{job.title}</span></p>
                        <p>Description: <span>{job.description}</span></p>
                        <p>Category: <span>{job.category}</span></p>
                        <p>Country: <span>{job.country}</span></p>
                        <p>City: <span>{job.city}</span></p>
                        <p>Location: <span>{job.location}</span></p>
                        {/* <p>Fix Salary: <span>{job.fixSalary} USD</span></p>
                        <p>Salary From: <span>{job.salaryFrom} USD</span></p>
                        <p>Salary To: <span>{job.salaryTo} USD</span></p> */}

                        <p>
                            Salary: {job.fixSalary ? (<span>{job.fixSalary}</span>):(<span>{job.salaryFrom} - {job.salaryTo}</span>)} $
                        </p>
                        <p>Expire: <span>{job.expired}</span></p>
                        <p>Posted: <span>{job.jobPostedOn}</span></p>
                        <p>Posted By: <span>{job.postedBy}</span></p>

                    </div>
                </div>
            </div>
            
        </>
    );
}


export default JobDetails;