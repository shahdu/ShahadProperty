import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import "bootstrap/dist/css/bootstrap.min.css"; 

export const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const validDataInput = () => {
    const newError = {};

    if (!user.name.trim() || user.name.length < 2) {
      newError.name = "Name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(user.name)) {
      newError.name = "Only characters are allowed";
    }

    if (!user.email.trim()) {
      newError.email = "Email is required";
    } else if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(user.email)
    ) {
      newError.email = "Enter a valid email address";
    }

    if (!user.password.trim()) {
      newError.password = "Password is required";
    } else if (user.password.length < 8) {
      newError.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(user.password)) {
      newError.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(user.password)) {
      newError.password = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(user.password)) {
      newError.password = "Password must contain at least one number";
    } else if (!/[!@#$%^&*]/.test(user.password)) {
      newError.password =
        "Password must contain at least one special character (e.g., !@#$%^&*)";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0; // return true if no error
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validDataInput()) {
      const newUser = {
        id: nanoid(),
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: true,
      };
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...newUser, isSignIn: true })
      );
      navigate("/dashboard/user/profile", { state: newUser });
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={handleChange}
            required
            className="form-control"
          />
          {errors.name && <p className="text-danger">{errors.name}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            required
            className="form-control"
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
            required
            className="form-control"
          />
          {errors.password && <p className="text-danger">{errors.password}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
};
