import React from "react";
import { Property } from "./property";


export const Properties = (props) => {
  const { onHandleDeleteProprty ,onHandleUpdateProprty   } = props;

  const { properties } = props;
  return (
    <div className="row">
    {properties.map((property) => (
      <div className="col-md-4 col-sm-6 mb-4" key={property.id}>
        <Property
          property={property}
          onHandleDeleteProprty={onHandleDeleteProprty}
          onHandleUpdateProprty={onHandleUpdateProprty}
        />
      </div>
    ))}
  </div>
  
  );
};
