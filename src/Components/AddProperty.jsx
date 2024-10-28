import React, { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { uploadImageToCloudinary } from "../Utility/UploadImage";
import { useNavigate } from "react-router-dom";
import { PropertyContext } from "./PropertyContext";

export const AddProperty = () => {
  const navigate = useNavigate();
  const {properties,setProperties,handleAddProperty} = useContext(PropertyContext);
  const initialValue = {
    title: "",
    image: "",
    location: "",
    price: 0,
  };
  const [property, setProperty] = useState(initialValue);
  const [errors, setErrors] = useState({});

  const notify = (isValid) => {
    if (isValid) {
      toast.success("Successfully Added");
    } else {
      toast.error("Please fix the errors before submitting.");
    }
  };

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
      newError.title = "Only characters allowed";
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageUrl = await uploadImageToCloudinary(property.image);

    const isValid = validDataInput(); 

    notify(isValid);

    if (isValid) {
      const newProperty = {
        id: nanoid(),
        title: property.title,
        image: imageUrl,
        price: property.price,
        location: property.location,
      };
      handleAddProperty(newProperty);

      setProperty(initialValue);
      navigate("/");
    }
  };

  const handleImageChange = (event) => {
    setProperty((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.files[0],
    }));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add Property</h1>
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
            required
          />
          {property.image && (
            <div className="mt-2">
              <img
                className="img-thumbnail"
                src={URL.createObjectURL(property.image)}
                alt="Selected preview"
                style={{ maxWidth: "100px", height: "auto" }}
              />
            </div>
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
          Add Property
        </button>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </form>
    </div>
  );
};
