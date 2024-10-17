import React, { useState } from "react";
import { nanoid } from "nanoid";

export const AddProperty = (props) => {
  
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleImageChange = (event) => {
    setImage(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProperty = {
      id: nanoid(),
      title: title,
      image: image,
      price: price,
      location: location,
    };
    // console.log(newProperty);
    // alert(JSON.stringify(newProperty, null, 2));
    props.onHandleAddProprty(newProperty);
    setTitle("");
    setImage("");
    setPrice(0);
    setLocation("");
  };
  return (
    <div id="add-property">
      <h1>Add property</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title"> Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image"> Image:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={handleImageChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price"> Price:</label>
          <input
            type="Number"
            id="price"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location"> Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleLocationChange}
            required
          />
        </div>
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};
