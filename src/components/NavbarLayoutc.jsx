// src/components/NavbarLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/campus_duo/Navbar.jsx';
import React from 'react';

const NAVBAR_HEIGHT = '4rem'; // matches your .h-16 (64px)

const NavbarLayout = () => (
  <>
    <Navbar />
    <main
      className="max-w-7xl mx-auto relative"
      style={{ paddingTop: NAVBAR_HEIGHT }}
    >
      <Outlet />
    </main>
  </>
);

export default NavbarLayout;
