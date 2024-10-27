import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./Card";

export const Property = (props) => {
  const { onHandleDeleteProprty, onHandleUpdateProprty } = props;
  const { id, image, title, price, location } = props.property;
  const navigate = useNavigate();

  const handleDelete = () => {
    onHandleDeleteProprty(id);
  };

  const handleUpdate = () => {
    onHandleUpdateProprty(props.property);
    navigate("dashboard/admin/updateProperty");
  };

  return (
    <Card>
      <div className="card-header bg-primary text-white text-center">
        Featured Property
      </div>
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Price: {price}</p>
        <p className="card-text">Location: {location}</p>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Property
        </button>
        <button className="btn btn-secondary" onClick={handleUpdate}>
          Edit Property
        </button>
      </div>
    </Card>
  );
};
