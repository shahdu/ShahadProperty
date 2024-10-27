import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import ErrorPage from "./Utility/ErrorPage.jsx";
import { properties as initialProperties } from "./Data.js";
import { Properties } from "./Components/Properties.jsx";
import { AddProperty } from "./Components/AddProperty.jsx";
import { UpdateProperty } from "./Components/UpdateProperty.jsx";
import { Navbar } from "./Layout/Navbar.jsx";
import { Signin } from "./Components/Signin.jsx";
import { Profile } from "./Components/Profile.jsx";
import { ProtectedRoute } from "./Routes/ProtectedRoute.jsx";
import { AdminRoute } from "./Routes/AdminRoute.jsx";
import { Signup } from "./Components/Signup.jsx";
import "./Components/BootstrapStyles";
export const App = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [updateData, setUpdateData] = useState(null);

  const handleAddProprty = (newProperty) => { 
    console.log(newProperty);
    setProperties([...properties, newProperty]);
  };

  const handleDeleteProprty = (id) => {
    const updatedProperties = properties.filter(
      (property) => property.id !== id
    );
    setProperties(updatedProperties);
    toast.success("Property successfully deleted!");
  };

  const handleUpdateProprty = (updatedProperty) => {
    setUpdateData(updatedProperty);
  };

  const handleUpdateSubmit = (updatedProperty) => {
    //It replaces the property if the ID match; otherwise, it keeps the original.
    const updatedProperties = properties.map((property) =>
      property.id === updatedProperty.id ? updatedProperty : property
    );
    setProperties(updatedProperties);
    setUpdateData(null);
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element:
            properties.length > 0 ? (
              <Properties
                properties={properties}
                onHandleDeleteProprty={handleDeleteProprty}
                onHandleUpdateProprty={handleUpdateProprty}
              />
            ) : (
              <h1>Sorry no items are available!</h1>
            ),
        },
        {
          path: "/signin",
          element: <Signin />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/signout",
          element:
            properties.length > 0 ? (
              <Properties
                properties={properties}
                onHandleDeleteProprty={handleDeleteProprty}
                onHandleUpdateProprty={handleUpdateProprty}
              />
            ) : (
              <h1>Sorry no items are available!</h1>
            ),
        },
        {
          path: "/dashboard/user",
          element: <ProtectedRoute />,
          children: [
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
        {
          path: "/dashboard/admin",
          element: <AdminRoute />,
          children: [
            {
              path: "addproperty",
              element: <AddProperty onHandleAddProprty={handleAddProprty} />,
            },
            {
              path: "updateProperty",
              element: updateData && (
                <UpdateProperty
                  updateData={updateData}
                  onUpdateSubmit={handleUpdateSubmit}
                />
              ),
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      
      <header className="bg-primary text-white p-3 text-center">
  <h1 className="display-4">Welcome To The Properties Website</h1>
</header>
<main className="container my-4">
  <RouterProvider router={router} />
  <ToastContainer position="top-center" autoClose={3000} />
</main>
<footer className="text-center bg-light py-3 mt-4">
  Developed by Shahad Alzoman
</footer>
    </>
  );
};
