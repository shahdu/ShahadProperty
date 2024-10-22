import React, { useState } from "react";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadImageToCloudinary } from '../Utility/UploadImage'; // adjust the path


export const AddProperty = (props) => {
  const [property, setProperty] = useState({
    title: "",
    image: "",
    location: "",
    price: 0,
  });

  const [errors, setErrors] = useState({});

  const notify = () => toast.success("Successfuly Added");

  const handleChange = (event) => {
    setProperty((prevState) => ({
      ...prevState,

      [event.target.name]: event.target.value,
    }));
  };
  const validDataInput = () => {
    const newError = {};

    if (!property.title.trim() || property.title.length < 3) {
      newError.title = "Title must be at least 3 char";
    }
    if (!/^[a-zA-Z\s]+$/.test(property.title)) {
      newError.title = "only char";
    }

    if (!property.location.trim() || property.location.length < 5) {
      newError.location = "location must be at least 5 char";
    }

    if (!property.price.trim()) {
      newError.location = "price is required";
    }
    if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(property.price)) {
      newError.price = "price must be number";
    }
    if (property.price < 0) {
      newError.price = "price must be postive";
    }

    setErrors(newError);

    return Object.keys(newError).length === 0; // return true if no error
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageUrl =await uploadImageToCloudinary(property.image)

    if (validDataInput()) {
      const newProperty = {
        id: nanoid(),
        title: property.title,
        image: imageUrl,
        price: property.price,
        location: property.location,
      };

      props.onHandleAddProprty(newProperty);
      setProperty({
        title: "",
        image: "",
        location: "",
        price: 0,
      });
    } else {
    }
  };
  const handImageChange = (event) => {
    console.log(event.target.files[0]);
    setProperty((prevState) => ({
      ...prevState,

      [event.target.name]: event.target.files[0],
    }));
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
          <div className="error">
            {" "}
            {errors.title && <span>{errors.title}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="image"> Image:</label>
          <input
            name="image"
            type="file"
            id="image"
            onChange={handImageChange}
            required
          />
          {property.image && (
            <div>
              <img
                className="user-img"
                src={URL.createObjectURL(property.image)}
                alt=" selected preview"
                style={{ maxWidth: "30px ", height: "auto", marginTop: "10px" }}
              />
            </div>
          )}
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
          <div className="error">
            {" "}
            {errors.price && <span>{errors.price}</span>}
          </div>
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
          <div className="error">
            {" "}
            {errors.location && <span>{errors.location}</span>}
          </div>
        </div>
        <button type="submit" onClick={notify}>
          Add Property
        </button>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition:Bounce
        />
      </form>
    </div>
  );
};
