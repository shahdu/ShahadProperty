import React, { useState } from "react";

export const UpdateProperty = (props) => {
  const {
    id: updateId,
    title: updateTitle,
    image: updateImage,
    location: updateLocation,
    price: updatePrice,
  } = props.updateData || {};

  const [property, setProperty] = useState({
    title: updateTitle,
    image: updateImage || "",
    location: updateLocation || "",
    price: updatePrice || 0,
  });

  const handleChange = (event) => {
    setProperty((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateProperty = {
      title: property.title,
      image: property.image,
      price: property.price,
      location: property.location,
    };
    setProperty({
      id: updateId,
      title: "",
      image: "",
      location: "",
      price: 0,
    });
  };
  return (
    <div id="update-property">
      <h1>update property</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title"> Title:</label>
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
          <label htmlFor="image"> Image:</label>
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
          <label htmlFor="price"> Price:</label>
          <input
            name="price"
            type="Number"
            id="price"
            value={property.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location"> Location:</label>
          <input
            name="location"
            type="text"
            id="location"
            value={property.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">update Property</button>
      </form>
    </div>
  );
};
