import React, { useState } from "react";

import { properties as initialProperties } from "./Data.js";
import { Properties } from "./Components/Properties.jsx";
import { AddProperty } from "./Components/AddProperty.jsx";
import { UpdateProperty } from "./Components/UpdateProperty.jsx";
//useEffect for db ex :in page number
export const App = () => {

  const [properties, setProperties] = useState(initialProperties);
  const [updateData,setUpdateData] = useState(null);

  const handleAddProprty = (newProperty) => {
    console.log(newProperty);
    setProperties([...properties, newProperty]);
  };

  const handleDeleteProprty = (id) => {
    const updatedProperties = properties.filter(
      (property) => property.id !== id
    );

    setProperties(updatedProperties);
  };

  const handleUpdateProprty = (updatedProperty) => {
    setUpdateData(updatedProperty);

  };
  return (
    <div>
      
      {<AddProperty onHandleAddProprty={handleAddProprty} />}
      {/* {<UpdateProperty  updateData ={updateData}/>} */}
      {properties.length > 0 ? (
        <Properties
          properties={properties}
          onHandleDeleteProprty={handleDeleteProprty}
          onHandleUpdateProprty={handleUpdateProprty}
        />
      ) : (
        "no items are available"
      )}
    </div>
  );
};

// name of props cany be any thing but in Properties compont we call it props.properties that why  in  Properties compont :const { properties } = props;
