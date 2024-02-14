import React, { useContext } from "react";
import { Context } from '../../main';



const Jobs = () =>{

    const { isAuthorized, setIsAuthorized } = useContext(Context);

    return (
        <>
            <h1>Job Page</h1>
        </>
    );
}


export default Jobs;