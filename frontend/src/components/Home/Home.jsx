import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";


import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";


const Home = () =>{

    const { isAuthorized } = useContext(Context);
    console.log("is authorized in home = " , isAuthorized);
    if (!isAuthorized) {
        return console.log("login failed");

    }

    return (
        <>
            <h1>Home Page</h1>

        </>

    );
};

export default Home;















