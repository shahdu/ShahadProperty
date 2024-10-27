import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImageToCloudinary } from "../Utility/UploadImage";

export const UpdateProperty = (props) => {
  const navigate = useNavigate();

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
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setProperty((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProperty((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let imageUrl = property.image;

    // If there's a new file, upload it to Cloudinary
    if (property.image && typeof property.image === "object") {
      try {
        imageUrl = await uploadImageToCloudinary(property.image);
      } catch (error) {
        console.error("Image upload failed:", error);
        return;
      }
    }

    const updatedProperty = {
      ...property,
      image: imageUrl,
    };

    props.onUpdateSubmit(updatedProperty);
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
            type="file"
            id="image"
            onChange={handleImageChange}
          />
          {property.image && typeof property.image === "object" ? (
            <img
              src={URL.createObjectURL(property.image)}
              alt="Preview"
              style={{ maxWidth: "100px", height: "auto", marginTop: "10px" }}
            />
          ) : (
            property.image && (
              <img
                src={property.image}
                alt="Current Property"
                style={{ maxWidth: "100px", height: "auto", marginTop: "10px" }}
              />
            )
          )}
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
