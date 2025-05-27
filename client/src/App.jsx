import { useState } from 'react'
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Jobs from './pages/Jobs';
import Profile from './pages/Profile';
import Browse from './pages/Browse';
import JobDetails from './pages/JobDetails';
import MyJobs from './pages/MyJobs';
import PostJob from './pages/PostJob';
import Applicants from './pages/Applicants';
import Company from './pages/Company';
import React from 'react'

import './App.css'

function App() {
  
  return (
    <>
      
      <BrowserRouter>
      
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />       
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/jobs' element={<Jobs/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/browse' element={<Browse/>}/>
          <Route path='/jobdetails/:id' element={<JobDetails/>}/>
          <Route path='/my-jobs' element={<MyJobs/>}/>
          <Route path='/post-job' element={<PostJob/>}/>
          <Route path='/applicants/:id' element={<Applicants/>}/>
          <Route path='/registerCompany' element={<Company/>}/>
        </Routes> 
      </BrowserRouter>
    </>
  )
}

export default App
