import React, { useState } from "react";
import { nanoid } from "nanoid";

export const AddProperty = (props) => {
 
  const [property, setProperty] = useState({
    title: "",
    image: "",
    location: "",
    price: 0,
  });

  const handleChange = (event) => {
    setProperty((prevState) => ({
      ...prevState,

      [event.target.name]: event.target.value,
    }));
  }

    const handleSubmit = (event) => {
      event.preventDefault();
      const newProperty = {
        id: nanoid(),
        title: property.title,
        image: property.image,
        price: property.price,
        location: property.location,
      };
      // console.log(newProperty);
      // alert(JSON.stringify(newProperty, null, 2));
      props.onHandleAddProprty(newProperty);
      setProperty({
        title: "",
        image: "",
        location: "",
        price: 0,
      });
    };
    return (
      <div id="add-property">
        <h1>Add property</h1>
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
          <button type="submit">Add Property</button>
        </form>
      </div>
    );
  };

