import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

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
      newError.name = "Name must be at least 2 char";
    }
    if (!/^[a-zA-Z\s]+$/.test(user.name)) {
      newError.name = "only char";
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
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <br />

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        </div>

        <br />
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
            required
          />
             {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <button>Sign Up</button>
      </form>
    </div>
  );
};
