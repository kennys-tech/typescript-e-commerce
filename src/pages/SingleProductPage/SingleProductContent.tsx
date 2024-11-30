import React from "react";
import { useProductsContext } from "../../context/products_context";
import { formatPrice } from "../../utils/helpers";
import { AddToCart } from "../../components";

export const SingleProductContent = () => {
  const { singleProduct } = useProductsContext();

  const {
    name,
    price,
    itemDescription,
    brand,
    stock,
    ageDescription,
    heightDescription,
  } = {
    ...singleProduct,
  };
  console.log("test", { ...singleProduct });
  return (
    <section className="content">
      <h2>{name}</h2>
      <h5 className="price">{price && formatPrice(price)}</h5>
      <p className="desc">{itemDescription}</p>
      <p className="info">
        <span>Availability : </span>
        {stock ? "In stock" : "Out of stock"}
      </p>

      {brand ? (
        <p className="info">
          <span>Brand : </span>
          {brand}
        </p>
      ) : undefined}

      {ageDescription ? (
        <p className="info">
          <span>Suitable for age : </span>
          {ageDescription}
        </p>
      ) : undefined}

      {heightDescription ? (
        <p className="info">
          <span>Suitable for height : </span>
          {heightDescription}
        </p>
      ) : undefined}

      {stock ? (
        <>
          <hr />
          <AddToCart singleProduct={singleProduct} />
        </>
      ) : undefined}
    </section>
  );
};
