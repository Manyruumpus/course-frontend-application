// src/apps/CampusDuoApp.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Verify from '../pages/campus_duo/verify.jsx';
import Study_buddy from '../pages/campus_duo/study_buddy.jsx';
import Signup from '../pages/campus_duo/signup.jsx';
import CompleteProfile from '../pages/campus_duo/completeProfile.jsx';
import PreferenceSelect from '../pages/campus_duo/preference.jsx';
import Profile from '../pages/campus_duo/profile.jsx';
import Chat from '../pages/campus_duo/chat.jsx';
import NavbarLayout from '../components/NavbarLayoutc.jsx';
import Matches from '../pages/campus_duo/matches.jsx';
import About from '../pages/campus_duo/About.jsx';
import Ask from '../pages/campus_duo/ask.jsx';

const handleEdit = (field) => console.log('edit', field);
const CampusDuoApp = () => (
  <Routes>
    <Route path="/ask" element={<Ask />} />
    <Route path="/verify" element={<Verify />} />
    {/* <Route path="/see-data" element={<see_data />} /> */}
    <Route path="/login" element={<Signup />} />
    <Route path="/completeProfile" element={<CompleteProfile onEdit={handleEdit}/>} />
    <Route path="/preference" element={<PreferenceSelect />} />
    
    <Route element={<NavbarLayout />}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/about" element={<About />} />
      <Route path="/studyBuddy" element={<Study_buddy />} />
    </Route>
  </Routes>
);

export default CampusDuoApp;
