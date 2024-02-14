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
    
    if (!isAuthorized) {
        return <Navigate to={'/login'} />
    }

    return (
        <>
            {/* <h1>Home Page</h1> */}
            <section className="homePage page">
                <HeroSection />
                <HowItWork />
                <PopularCategories />
                <PopularCompanies />
            </section>

        </>

    );
};

export default Home;















