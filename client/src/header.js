import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react'

function Header(props) {
    const handleSignInClick = () => {
        // Authenticate using via passport api in the backend
        // Open Twitter login page
        // Upon successful login, a cookie session will be stored in the client
        window.open("http://localhost:4000/auth/twitter", "_self");
    };

    const handleLogoutClick = () => {
        // Logout using Twitter passport api
        // Set authenticated state to false in the HomePage
        window.open("http://localhost:4000/auth/logout", "_self");
    };

    return (
      <ul className="menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        {props.authenticated ? (
          <li onClick={handleLogoutClick}>Logout</li>
        ) : (
          <li onClick={handleSignInClick}>Login</li>
        )}
      </ul>
    );
}
export default Header;