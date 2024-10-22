import React, { useState } from "react";

import { properties as initialProperties } from "./Data.js";
import { Properties } from "./Components/Properties.jsx";
import { AddProperty } from "./Components/AddProperty.jsx";
import { UpdateProperty } from "./Components/UpdateProperty.jsx";

export const App = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [updateData, setUpdateData] = useState(null);

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

  const handleUpdateSubmit = (updatedProperty) => {
    //It replaces the property if the ID match; otherwise, it keeps the original.
    const updatedProperties = properties.map((property) =>
      property.id === updatedProperty.id ? updatedProperty : property
    );
    setProperties(updatedProperties);
    setUpdateData(null);
  };

  return (
    <div>
      {<AddProperty onHandleAddProprty={handleAddProprty} />}
      {updateData && (
        <UpdateProperty
          updateData={updateData}
          onUpdateSubmit={handleUpdateSubmit}
        />
      )}
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

