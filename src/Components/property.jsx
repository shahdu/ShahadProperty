import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PropertyImage } from "./PropertyImage";
import { PropertyTitle } from "./PropertyTitle";
import { PropertyPrice } from "./PropertyPrice";
import { PropertyLocation } from "./PropertyLocation";
import { Card } from "./Card";
import style from "./property.module.css";

export const Property = (props) => {
  const { onHandleDeleteProprty, onHandleUpdateProprty } = props;
  const { id, image, title, price, location } = props.property;

  const handelDelete = (id) => {
    onHandleDeleteProprty(id);
    toast.error("Successfuly Deleted ");
  };

  const handelUpdate = (property) => {
    onHandleUpdateProprty(property);
  };
  return (
    <Card>
      <div className={style.property}>
        <PropertyImage image={image} />
        <PropertyTitle title={title} />
        <PropertyPrice price={price} />
        <PropertyLocation location={location} />
      </div>
      <button onClick={() => handelDelete(id)}>Delete Property </button>
      <button onClick={() => handelUpdate(props.property)}>
        edit Property{" "}
      </button>
    </Card>
  );
};
