import React from "react";
import { Link, Outlet  } from "react-router-dom";

export const Navbar = () => {
  
  const handelSignOut = () => {
    const loginInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    const updatedLoginInfo = { ...loginInfo, isSignIn: false };
    localStorage.setItem("userInfo", JSON.stringify(updatedLoginInfo));
  };
  return (

<>
      <nav>
        <ul>
        <li>
            <Link to= "/">  List </Link>
          </li>
          <li>
            <Link to="/dashboard/admin/addproperty">Add Property</Link>

          </li>
          <li>
            <Link to="/signin"> Sign In</Link>
          </li>
          <li>
            <Link to="/signup"> Sign up</Link>
          </li>
          <li>
            <Link to="/signout" onClick={handelSignOut}> Sign Out</Link>
          </li>
     
        </ul>
      </nav>
      <Outlet/>
</>
  );
};
