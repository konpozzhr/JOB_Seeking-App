import React, { useContext, useEffect, useState } from "react";
import { Context } from '../../main';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const Jobs = () =>{

    const [jobs, setJobs] = useState([]);
    const { isAuthorized } = useContext(Context);
    const nvaigateTo = useNavigate();
    
    useEffect(() =>{
        try{
            axios.get(
                "http://localhost:3004/api/v1/job/getAll",
                {withCredentials: true},
            )
            .then((res) =>{
                setJobs(res.data)
            })

        }catch(err){
            console.log(err);
        }
    }, []);

    if(!isAuthorized){
        nvaigateTo('/login');
    }

    return (
        <>
            {/* <h1>Job Page</h1> */}
            <section className="jobs page">
                <div className="container">
                    <h1>ALL AVAILABLE JOBS</h1>
                    <div className="banner">
                        { jobs.jobs && jobs.jobs.map((element) =>{
                            return (
                                <div className="card" key={element._id}>
                                    <p>{element.title}</p>
                                    <p>{element.category}</p>
                                    <p>{element.country}</p>
                                    <Link to={`/job/${element._id}`}>Job Details</Link>
                                </div>
                            );
                        })
                        }
                    </div>
                </div>
            </section>
        </>
    );
}


export default Jobs;