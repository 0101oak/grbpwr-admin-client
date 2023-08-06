import React from 'react';
import { Link } from "react-router-dom";
import './navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='links'>
        <Link to="/product"> product </Link>
        <Link to="/"> add </Link>
      </div>
    </div>
  )
}

export default Navbar;