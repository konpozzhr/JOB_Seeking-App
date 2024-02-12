import React, { useContext } from "react";
import { Context } from '../../main';



const Jobs = () =>{

    const { isAuthorized, setIsAuthorized } = useContext(Context);
    console.log("is authorized in job page = " , isAuthorized);

    return (
        <>
             <p>isAuthorized: {isAuthorized.toString()}</p>
            <h1>Job Page</h1>
        </>
    );
}


export default Jobs;