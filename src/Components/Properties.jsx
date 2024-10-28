import React, { useContext } from "react";
import { Property } from "./property";
import { PropertyContext } from "./PropertyContext";


export const Properties = () => {

  const {properties} = useContext(PropertyContext);

  return (
    <div className="row">
    {properties.map((property) => (
      <div className="col-md-4 col-sm-6 mb-4" key={property.id}>
        <Property
          property={property}
        />
      </div>
    ))}
  </div>
  
  );
};
