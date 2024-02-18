import React, { useContext, useState } from 'react'
import { Context } from "../../main";
import { useNavigate, useParams } from 'react-router-dom';

function Application() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // File input change 
  const handleFileChange = (e) =>{
    const resume = e.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();

  const handleApplication = async (e) =>{
    e.preventDefault();
    const formData = new FormData();

    
  }





  return (
    <>
        <h1>Application page </h1>
    </>
  )
}

export default Application
