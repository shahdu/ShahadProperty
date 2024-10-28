import React, { createContext, useState } from "react";
import { properties as propertiesData } from "../Data";
export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState(propertiesData);
  const [updateData, setUpdateData] = useState(null);

  const handleAddProperty = (newProperty) => {
    setProperties((prevProperties) => [...prevProperties, newProperty]);
  };

  const handleDeleteProperty = (id) => {
    setProperties((prevProperties) =>
      prevProperties.filter((property) => property.id !== id)
    );
  };

  const handleUpdateProperty = (property) => {
    setUpdateData(property); 
  };
  
  const handleUpdateSubmit = (updatedProperty) => {
    setProperties((prevProperties) =>
        prevProperties.map((property) =>
            property.id === updatedProperty.id ? updatedProperty : property
        )
    );
    setUpdateData(null); 
};

  return (
    <PropertyContext.Provider
      value={{
        properties,
        updateData,
        handleAddProperty,
        handleDeleteProperty,
        handleUpdateProperty,
        handleUpdateSubmit,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
