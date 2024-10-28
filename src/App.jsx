import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import ErrorPage from "./Utility/ErrorPage.jsx";
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
import { PropertyProvider } from "./Components/PropertyContext.jsx";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Properties />,
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
          element: <Properties />,
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
              element: <AddProperty />,
            },
            {
              path: "updateProperty",
              element: <UpdateProperty />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <PropertyProvider>
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
    </PropertyProvider>
  );
};
