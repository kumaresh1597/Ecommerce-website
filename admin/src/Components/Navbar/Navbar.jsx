import React from 'react';
import "./Navbar.css";
import logo from '../../assets/Admin Panel Assets/nav-logo.svg';
import profileIcon from '../../assets/Admin Panel Assets/nav-profile.svg';

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo} alt="" className="nav-logo" />
        <img src={profileIcon} alt="" className="nav-profile-icon" />
    </div>
  )
}

export default Navbar