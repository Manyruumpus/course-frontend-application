// src/pages/Campus_Duo.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaHeart, FaUsers } from "react-icons/fa";

const Campus_Duo = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
    {/* Hero Section */}
    <div className="max-w-3xl text-center">
      <h1 className="text-5xl font-bold text-indigo-800 mb-4 inline-flex items-center">
        Campus Duo
        <FaHeart className="text-pink-500 ml-3 animate-pulse" />
      </h1>
      <p className="text-xl text-gray-700  mb-6">
        Because, love doesn’t come only on Valentine’s week 🐶❤️
      </p>
      <p className="text-gray-600 mb-8 leading-relaxed">
        Built by an IIT Kanpur CSE student, Campus Duo helps you find your
        on-campus crush and set up real, in-person meetups. Don’t wonder if
        they feel the same—take the leap today!
      </p>
      <NavLink

        className="bg-indigo-600 text-white px-8 py-3 rounded-full shadow hover:bg-indigo-700 transition"
        to = "/campus_duo/ask"
      >
          Find Your Match
      </NavLink>
    </div>

    {/* Features Grid */}
    <div className="grid gap-8 mt-12 w-full max-w-4xl sm:grid-cols-2">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
        <FaUsers className="text-indigo-600 text-4xl mb-4" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Real Campus Connections
        </h3>
        <p className="text-gray-600">
          Meet classmates for study sessions, coffee dates, and genuine fun.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
        <FaHeart className="text-pink-500 text-4xl mb-4" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Genuine Matches
        </h3>
        <p className="text-gray-600">
          Discover someone who shares your courses, hobbies, and that spark.
        </p>
      </div>
    </div>
  </div>
);

export default Campus_Duo;
