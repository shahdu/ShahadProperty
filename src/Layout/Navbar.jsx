import React from "react";
import { Link, Outlet  } from "react-router-dom";

export const Navbar = () => {
  return (

<>
      <nav>
        <ul>
        <li>
            <Link to= "/">  List </Link>
          </li>
          <li>
            <Link to="/addProperty"> Add  Property</Link>
          </li>
          {/* <li>
            <Link to="/updateProperty">Update Property</Link>
          </li> */}
          {/* <li>
            <Link to="/signin">Sign In</Link>
          </li> */}
        </ul>
      </nav>
      <Outlet/>
</>
  );
};
