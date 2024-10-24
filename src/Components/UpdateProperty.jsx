import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UpdateProperty = (props) => {
  const navigate = useNavigate();

  //destructuring and renaming
  const {
    id: updateId,
    title: updateTitle, 
    image: updateImage,
    location: updateLocation,
    price: updatePrice,
  } = props.updateData || {};

  const [property, setProperty] = useState({
    id: updateId,
    title: updateTitle,
    image: updateImage,
    location: updateLocation,
    price: updatePrice,
  });

  const handleChange = (event) => {
    //Update state with user input value
    setProperty((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Pass the updated property back to the parent component
    props.onUpdateSubmit(property);
    navigate("/");

  };
  
  return (
    <div id="update-property">
      <h1>Update Property</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            name="title"
            type="text"
            id="title"
            value={property.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            name="image"
            type="text"
            id="image"
            value={property.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            name="price"
            type="number"
            id="price"
            value={property.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            name="location"
            type="text"
            id="location"
            value={property.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Property</button>
      </form>
    </div>
  );
};
