import React from "react";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWork = () =>{
    return (
        <>
            <div className="howitworks">
                <div className="container">
                    <h3>How It work</h3>
                    <div className="banner">
                        <div className="card">
                            <FaUserPlus />
                            <p>Create Account</p>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Consequuntur, culpa.
                            </p>
                        </div>
                        <div className="card">
                            <MdFindInPage />
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Consequuntur, culpa.    
                            </p>    
                        </div>
                        <div className="card">
                            <IoMdSend />
                            <p>Apply For Job/Recruit Suitable Candidates</p>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Consequuntur, culpa.
                            </p>
                        </div>

                    </div>
                </div>

            </div>

        </>
    );
}


export default HowItWork;