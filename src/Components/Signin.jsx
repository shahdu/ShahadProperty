import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid"; 


export const Signin = () => {
  const navigate = useNavigate();
const [user ,setUser] =useState({
    name :'',
    email: '',
    password : ''
});
const handleChange = (event) => {
    setUser((prevState) => ({
      ...prevState,[event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

      const newUser = {
        id: nanoid(),
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: true
      };
      localStorage.setItem("signIn", JSON.stringify({ ...newUser, isSignIn: true }));
      navigate("/dashboard/user/profile", {state:newUser });
  };
  return (
    <div>
      <h1>Sign in </h1>
      <form onSubmit={handleSubmit}>
        <div>
<label htmlFor="name">Name:</label>
<input type="text" name="name" id="name" value={user.name} onChange={handleChange} />
</div>

<br />

<div>
<label htmlFor="email">email:</label>
<input type="text" name="email" id="email" value={user.email} onChange={handleChange} />
</div>

<br />

<div>
<label htmlFor="password">password:</label>
<input type="text" name="password" id="password" value={user.password} onChange={handleChange} />
</div>

<button> Sign In </button>

      </form>

    </div>
  );
};
