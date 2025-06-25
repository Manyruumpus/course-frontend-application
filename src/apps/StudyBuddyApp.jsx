// src/apps/StudyBuddyApp.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from '../pages/study_buddy/signup.jsx';
import CompleteProfileForm from '../pages/study_buddy/completeProfile.jsx';
import PreferenceSelect from '../pages/study_buddy/preference.jsx';
import Profile from '../pages/study_buddy/profile.jsx';
import Chat from '../pages/study_buddy/chat.jsx';
import NavbarLayout from '../components/NavbarLayout';
import Matches from '../pages/study_buddy/matches.jsx';
import About from '../pages/study_buddy/About.jsx';
import Campus_Duo from '../pages/study_buddy/Campus_Duo.jsx';
import Solo_Session from '../pages/study_buddy/Solo_Session.jsx';
import Setpass from '../pages/study_buddy/setpass.jsx';

const StudyBuddyApp = () => (
  <Routes>
    {/* Public routes without navbar */}
    <Route path="/login" element={<Signup />} />
    <Route path="/setpassword" element={<Setpass />} />
    <Route path="/completeProfile" element={<CompleteProfileForm />} />
    <Route path="/preference" element={<PreferenceSelect />} />

    {/* Routes wrapped with NavbarLayout */}
    <Route element={<NavbarLayout />}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/about" element={<About />} />
      <Route path="/solo-session" element={<Solo_Session />} />
      <Route path="/campus-duo" element={<Campus_Duo />} />
    </Route>
  </Routes>
);

export default StudyBuddyApp;
