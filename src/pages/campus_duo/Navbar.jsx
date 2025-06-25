// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full bg-red-400 shadow z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="text-xl font-semibold">IITK Campus Duo</div>
        <div className="flex space-x-4">
          <NavLink
            to="/campus_duo/profile"
            className={({ isActive }) =>
              isActive
                ? 'text-white px-3 py-2 rounded-md'
                : 'text-gray-800 hover:text-red-300 px-3 py-2'
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/campus_duo/chat"
            className={({ isActive }) =>
              isActive
                ? 'text-white px-3 py-2 rounded-md'
                : 'text-gray-800 hover:text-red-300 px-3 py-2'
            }
          >
            Chat
          </NavLink>
          <NavLink
            to="/campus_duo/matches"
            className={({ isActive }) =>
              isActive
                ? 'text-white px-3 py-2 rounded-md'
                : 'text-gray-800 hover:text-red-300 px-3 py-2'
            }
          >
            Match
          </NavLink>

          <NavLink
            to="/campus_duo/about"
            className={({ isActive }) =>
              isActive
                ? 'text-white px-3 py-2 rounded-md'
                : 'text-gray-800 hover:text-red-300 px-3 py-2'
            }
          >
            About
          </NavLink>
          <NavLink
            to="/campus_duo/studyBuddy"
            className={({ isActive }) =>
              isActive
                ? 'text-white px-3 py-2 rounded-md'
                : 'text-gray-800 hover:text-red-300 px-3 py-2'
            }
          >
            Study Buddy
          </NavLink>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
