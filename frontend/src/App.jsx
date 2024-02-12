import React, { useContext, useEffect } from 'react'
import './App.css';
import { Context } from './main';
import {BrowserRouter, Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import Jobs from './components/Job/Jobs';
import JobDetails from './components/Job/JobDetails';
import MyJobs from './components/Job/MyJobs';
import PostJob from './components/Job/PostJob';
import Application from './components/Application/Application';
import MyApplication from './components/Application/MyApplications';
import NotFound from './components/NotFound/NotFound';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';



const App = () =>{

  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() =>{
    const fetchUser = async () =>{  
      try{
        const response = await axios.get("http://localhost:3004/api/v1/user/getuser", {withCredentials: true});
        setUser(response.data.user);
        setIsAuthorized(true);
        
      }catch(err){
        setIsAuthorized(false);
      }
    }
    fetchUser();
  }, [isAuthorized]);



  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/' element={<Home />}/>          
          <Route path='/job/getAll' element={<Jobs />}/>
          <Route path='/job/:id' element={<JobDetails />}/>
          <Route path='/job/me' element={<MyJobs />}/>
          <Route path='/job/post' element={<PostJob />}/>
          <Route path='/application/:id' element={<Application />}/>
          <Route path='/application/me' element={<MyApplication />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>

    </>
  );
}

export default App
