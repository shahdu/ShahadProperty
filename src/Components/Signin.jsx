import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const Signin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (
      loginInfo !== null &&
      loginInfo.email === user.email &&
      loginInfo.password === user.password
    ) {
      const updatedLoginInfo = { ...loginInfo, isSignIn: true };
      localStorage.setItem("userInfo", JSON.stringify(updatedLoginInfo));
      navigate("/dashboard/user/profile", { state: updatedLoginInfo });
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        {error && <p className="text-danger">{error}</p>}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            required
            className="form-control"
          />
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
        </div>

        <button type="submit" className="btn btn-primary w-100">Sign In</button>
      </form>
    </div>
  );
};
