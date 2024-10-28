import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import { uploadImageToCloudinary } from "../Utility/UploadImage";
import { PropertyContext } from "./PropertyContext"; 

export const UpdateProperty = () => {
  const { updateData, handleUpdateSubmit } = useContext(PropertyContext); 
  const navigate = useNavigate();
  
  const notify = (message, isSuccess) => {
    if (isSuccess) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const {
    id: updateId = '',
    title: updateTitle = '',
    image: updateImage = '',
    location: updateLocation = '',
    price: updatePrice = 0,
  } = updateData || {};

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

  const validDataInput = () => {
    const newError = {};
    if (!property.title.trim() || property.title.length < 3) {
      newError.title = "Title must be at least 3 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(property.title)) {
      newError.title = "Only characters are allowed";
    }
    if (!property.location.trim() || property.location.length < 5) {
      newError.location = "Location must be at least 5 characters";
    }
    if (!property.price) {
      newError.price = "Price is required";
    }
    if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(property.price)) {
      newError.price = "Price must be a number";
    }
    if (property.price < 0) {
      newError.price = "Price must be positive";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0;
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

    if (!validDataInput()) {
      notify("Please fix the errors before submitting.", false);
      return; 
    }

    let imageUrl = property.image;
    if (property.image && typeof property.image === "object") {
      try {
        imageUrl = await uploadImageToCloudinary(property.image);
      } catch (error) {
        console.error("Image upload failed:", error);
        notify("Image upload failed. Please try again.", false);
        return;
      }
    }

    const updatedProperty = {
      ...property,
      image: imageUrl,
    };

    handleUpdateSubmit(updatedProperty);
    navigate("/");
    notify("Successfully Updated", true); 

  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Update Property</h1>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            name="title"
            type="text"
            id="title"
            value={property.title}
            onChange={handleChange}
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            required
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image:</label>
          <input
            name="image"
            type="file"
            id="image"
            onChange={handleImageChange}
            className="form-control"
          />
          {property.image && typeof property.image === "object" ? (
            <img
              src={URL.createObjectURL(property.image)}
              alt="Preview"
              className="img-thumbnail mt-2"
              style={{ maxWidth: "100px", height: "auto" }}
            />
          ) : (
            property.image && (
              <img
                src={property.image}
                alt="Current Property"
                className="img-thumbnail mt-2"
                style={{ maxWidth: "100px", height: "auto" }}
              />
            )
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            name="price"
            type="number"
            id="price"
            value={property.price}
            onChange={handleChange}
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            required
          />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location:</label>
          <input
            name="location"
            type="text"
            id="location"
            value={property.location}
            onChange={handleChange}
            className={`form-control ${errors.location ? "is-invalid" : ""}`}
            required
          />
          {errors.location && <div className="invalid-feedback">{errors.location}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update Property
        </button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};
