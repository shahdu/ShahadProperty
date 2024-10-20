import React, { useState } from "react";
import { properties  as initialProperties} from "./Data.js";
import { Properties } from "./Components/Properties.jsx";
import { AddProperty } from "./Components/AddProperty.jsx";

export const App = () => {
  // in super :
  //1-create fun
  //2-pass fun as propse

  const [properties, setProperties] = useState(initialProperties);

  const handleAddProprty = (newProperty) => {
    console.log(newProperty);
    setProperties([...properties, newProperty]);
  };


  const handleDeleteProprty = (id) => {
    const updatedProperties = properties.filter(property => property.id !== id);

    setProperties(updatedProperties);
  };
  return (
    <div>
      {<AddProperty onHandleAddProprty={handleAddProprty} />}
      {properties.length > 0 ? (
        <Properties properties={properties} onHandleDeleteProprty={handleDeleteProprty} />
      ) : (
        "no items are available"
      )}
    </div>
  );
};

// name of props cany be any thing but in Properties compont we call it props.properties that why  in  Properties compont :const { properties } = props;
