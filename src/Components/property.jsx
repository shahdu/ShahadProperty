import React from "react";

import { PropertyImage } from "./PropertyImage";
import { PropertyTitle } from "./PropertyTitle";
import { PropertyPrice } from "./PropertyPrice";
import { PropertyLocation } from "./PropertyLocation";

import style from "./property.module.css"

export const Property = (props) => {
  const { image, title, price, location } = props.property;

  return (
    <div className={style.property}>
      <PropertyImage image={image} />
      <PropertyTitle title={title} />
      <PropertyPrice price={price} />
      <PropertyLocation location={location} />
    </div>
  );
};
