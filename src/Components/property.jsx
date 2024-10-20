import React from "react";

import { PropertyImage } from "./PropertyImage";
import { PropertyTitle } from "./PropertyTitle";
import { PropertyPrice } from "./PropertyPrice";
import { PropertyLocation } from "./PropertyLocation";

import style from "./property.module.css"
import { Card } from "./Card";

export const Property = (props) => {
  const{onHandleDeleteProprty} =props;
  const { id,image, title, price, location } = props.property;

  return (
    <Card>

    <div className={style.property}>
      <PropertyImage image={image} />
      <PropertyTitle title={title} />
      <PropertyPrice price={price} />
      <PropertyLocation location={location} />
    </div>
    <button   onClick={()=>onHandleDeleteProprty(id)}>Delete Property </button>
    </Card>

  );
};
