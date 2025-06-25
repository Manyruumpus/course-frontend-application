// src/components/AboutSection.jsx
import React from 'react';
import { FaUsers, FaBook, FaChalkboardTeacher } from 'react-icons/fa';

const About = () => (
  <section
    id="about"
    className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50"
  >
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h2 className="text-4xl font-extrabold text-indigo-800 mb-4">
        About IITK STUDY BUDDY
      </h2>
      <p className="text-lg text-indigo-600 mb-8">
        Built by an IIT Kanpur CSE student, Campus Duo is designed to replace
        impersonal virtual match-ups with genuine, on-campus study partnerships.
        No more swipes or superficial chats—just real students, real schedules,
        and real collaboration.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <FaUsers className="text-indigo-500 mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-semibold text-indigo-800 mb-2">
            Genuine Connections
          </h3>
          <p className="text-indigo-600">
            Find classmates who share your courses and can meet in person for
            focused study sessions.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <FaBook className="text-indigo-500 mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-semibold text-indigo-800 mb-2">
            Study Partner Matching
          </h3>
          <p className="text-indigo-600">
            Match on subjects, schedules, and study habits to build
            high-impact peer groups.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <FaChalkboardTeacher
            className="text-indigo-500 mx-auto mb-4"
            size={48}
          />
          <h3 className="text-2xl font-semibold text-indigo-800 mb-2">
            Campus-First Design
          </h3>
          <p className="text-indigo-600">
            Exclusively for IITK students—no distractions, no outside
            networks—just your campus community.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
