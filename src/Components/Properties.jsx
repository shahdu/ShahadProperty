import React from "react";
import { Property } from "./property";

import style from "./properties.module.css";

export const Properties = (props) => {
  const { onHandleDeleteProprty } = props;

  const { properties } = props;
  return (
    <div className={style.properties}>
      {properties.map((property) => {
        const { onHandleDeleteProprty } = props;
        return (
          <Property
            property={property}
            key={property.id}
            onHandleDeleteProprty={onHandleDeleteProprty}
          />
        );
      })}
    </div>
  );
};
