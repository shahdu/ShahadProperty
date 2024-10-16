import React from "react";
import { Property } from "./property";

import style from "./properties.module.css"




export const Properties = (props) => {
  const { properties } = props;
  return (
<div className={style.properties}> 
      {properties.map((property) => {
        return <Property property={property} />;
      })}
    </div>
  );
};
