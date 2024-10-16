import React from "react";
import { properties } from "./Data.js";
import { Properties } from "./Components/Properties.jsx";

export const App = () => {
  return <div>
{properties.length>0?
    <Properties properties = {properties} /> :"no items are available" }
    </div>;
};
