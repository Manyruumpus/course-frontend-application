import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaBookOpen,
  FaUserFriends,
  FaClock,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const StudyBuddyLanding = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 px-6 py-10">
    {/* HERO */}
    <header className="mx-auto flex max-w-4xl flex-col items-center text-center">
      <h1 className="mb-4 inline-flex items-center text-5xl font-extrabold tracking-tight text-indigo-200">
        IITK Study&nbsp;Buddy
        <FaBookOpen className="ml-3 animate-pulse text-indigo-400" />
      </h1>

      <p className="mb-4 text-xl text-slate-300">
        Study smarter, not harder—pair up with classmates who share your courses
        and your caffeine schedule ☕
      </p>

      <p className="mb-8 max-w-2xl text-slate-400">
        Created by IIT Kanpur CSE students, Study&nbsp;Buddy matches you on
        subjects, free slots and preferred study spots so you can ace problem
        sets together instead of scrolling endless chat groups.
      </p>

      <NavLink
        to="/"
        className="rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 px-10 py-3 font-semibold text-white shadow-md
                   transition hover:from-indigo-400 hover:to-indigo-500"
      >
        Find a Study&nbsp;Partner
      </NavLink>
    </header>

    {/* FEATURES */}
    <section className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <Feature
        icon={<FaUserFriends size={40} />}
        title="Peer-Matched"
        text="Algorithmically pairs you with students taking the same course run."
      />

      <Feature
        icon={<FaClock size={40} />}
        title="Schedule Sync"
        text="Suggests meeting times that fit both timetables—no back-and-forth."
      />

      <Feature
        icon={<FaMapMarkerAlt size={40} />}
        title="Campus Spots"
        text="Pick favourite study nooks: Library, OAT steps or Hall lounges."
      />

      <Feature
        icon={<FaBookOpen size={40} />}
        title="Focused Sessions"
        text="Share notes, track Pomodoro blocks and keep each other accountable."
      />
    </section>
  </div>
);

/* ---------- small sub-component ---------- */
const Feature = ({ icon, title, text }) => (
  <div className="flex flex-col items-center rounded-xl bg-slate-800/60 p-6 text-center shadow-lg backdrop-blur-md">
    <div className="mb-4 text-indigo-400">{icon}</div>
    <h3 className="mb-2 text-2xl font-semibold text-indigo-100">{title}</h3>
    <p className="text-slate-300">{text}</p>
  </div>
);
export default StudyBuddyLanding;