import React, { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";


import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import HowItWork from "./HowItWork";


const Home = () =>{

    const { isAuthorized } = useContext(Context);
    
    console.log("is authorized in home = " , isAuthorized);
    if (!isAuthorized) {
        // return console.log("login failed");
        return <Navigate to={'/login'} />
        
    }

    return (
        <>
            {/* <h1>Home Page</h1> */}
            <section className="homePage page">
                <HeroSection />
                <HowItWork />
                <PopularCategories />
            </section>

        </>

    );
};

export default Home;















