// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full bg-slate-400 shadow z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="text-xl font-semibold">IITK Study Buddy</div>
        <div className="flex space-x-4">
          <NavLink
            to="/study_buddy/profile"
            className={({ isActive }) =>
              isActive
                ? 'text-white px-3 py-2 rounded-md'
                : 'text-gray-800 hover:text-white px-3 py-2'
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive
                ? 'text-white px-3 py-2 rounded-md'
                : 'text-gray-800 hover:text-slate-300 px-3 py-2'
            }
          >
            Chat
          </NavLink>
          <NavLink
            to="/study_buddy/matches"
            className={({ isActive }) =>
              isActive
                ? 'text-white px-3 py-2 rounded-md'
                : 'text-gray-800 hover:text-slate-300 px-3 py-2'
            }
          >
            Match
          </NavLink>
          <NavLink
            to="/study_buddy/solo-session"
            className={({ isActive }) =>
              isActive
                ? 'text-white px-3 py-2 rounded-md'
                : 'text-gray-800 hover:text-slate-300 px-3 py-2'
            }
          >
            Solo Session
          </NavLink>

          <NavLink
            to="/study_buddy/about"
            className={({ isActive }) =>
              isActive
                ? 'text-white px-3 py-2 rounded-md'
                : 'text-gray-800 hover:text-slate-300 px-3 py-2'
            }
          >
            About
          </NavLink>
          <NavLink
          // i have to make the page opf this to make the it visble 
            to="/study_buddy/campus-duo"   
            className={({ isActive }) =>
              isActive
                ? 'text-white px-3 py-2 rounded-md'
                : 'text-gray-800 hover:text-slate-300 px-3 py-2'
            }
          >
            Campus Duo
          </NavLink>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
