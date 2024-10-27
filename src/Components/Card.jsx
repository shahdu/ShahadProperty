import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const Card = ({ children }) => {
  return <div className="card mb-4 shadow-sm">{children}</div>;
};
