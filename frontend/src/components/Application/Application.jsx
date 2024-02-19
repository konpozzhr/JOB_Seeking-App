import React, { useContext, useState } from 'react'
import { Context } from "../../main";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

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


  const clearInput = () =>{
    setName("");
    setEmail("");
    setCoverLetter("");
    setPhone("");
    setAddress("");
    setResume("");
  }


  const { id } = useParams();

  const handleApplication = async (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter); 
    formData.append("resume", resume);
    formData.append("jobId", id);

    try{
      const { data } = await axios.post(
        "http://localhost:3004/api/v1/app/post/application",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      )

      clearInput();
      toast.success(data.message);
      console.log("Apply Job Success ", data.message);
      navigateTo('/job/getall');

    }catch(err){
      toast.error(err.response.data.message);
      console.log(err);
    }
  }

  if(!isAuthorized || user && user.role === "Employer"){
    navigateTo("");
  }



  return (
    <>
        {/* <h1>Application page </h1> */}

        <section className="application">
          <div className="container">
            <h3>Application Form</h3>
            <form onSubmit={handleApplication}>
              <input type="text" placeholder='Your name' value={name} onChange={(e) =>setName(e.target.value)} />
              <input type="text" placeholder='Your email' value={email} onChange={(e) =>setEmail(e.target.value)} />
              <input type="number" placeholder='Phone number' value={phone} onChange={(e) =>setPhone(e.target.value)} />
              <input type="text" placeholder='Address' value={address} onChange={(e) =>setAddress(e.target.value)} />
              <textarea value={coverLetter} onChange={(e) =>setCoverLetter(e.target.value)} placeholder='Cover Letter' />
              
              <div>
                <label 
                  style={{
                    textAlign: "start",
                    display: "block",
                    fontSize: "20px",
                  }}
                >
                  Select Resume
                </label>
                <input 
                    type="file" 
                    accept='.jpg, .png, .webp' 
                    onChange={handleFileChange} 
                    style={{
                      width: "100%"
                    }} 
                />
              </div>
              <button type='submit'>Send Application</button>
              
            </form>
          </div>
        </section>
    </>
  )
}

export default Application
