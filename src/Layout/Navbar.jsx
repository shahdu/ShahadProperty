import React from "react";
import { Link, Outlet  } from "react-router-dom";

export const Navbar = () => {
  const handelSignOut =()=>{
    localStorage.setItem('signIn', JSON.stringify({isSignIn: false}))
  }
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
            <Link to="/signout" onClick={handelSignOut}> Sign Out</Link>
          </li>
     
        </ul>
      </nav>
      <Outlet/>
</>
  );
};
