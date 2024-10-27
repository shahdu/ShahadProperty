import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}

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
        </div>

        <button>Sign In</button>
      </form>
    </div>
  );
};
