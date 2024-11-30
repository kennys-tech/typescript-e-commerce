import React from "react";
import { useFilterContext } from "../../context/filter_context";
import { getUniqueValues } from "../../utils/helpers";

export const ForWhomFilters = () => {
  const {
    updateFilters,
    allProducts,
    filters: { forWhom },
  } = useFilterContext();
  console.log("kkk", allProducts);
  const uniqueForWhoms = getUniqueValues(allProducts, "forWhom");

  uniqueForWhoms.sort();

  return (
    <div className="form-control">
      <h5>Product for who?</h5>
      <select
        name="forWhom"
        value={forWhom}
        onChange={updateFilters}
        className="company"
      >
        {uniqueForWhoms.map((uniqueForWhom, index) => {
          if (typeof uniqueForWhom === "string") {
            return (
              <option key={`${uniqueForWhom}`} value={uniqueForWhom}>
                {uniqueForWhom}
              </option>
            );
          }
          return null;
        })}
      </select>
    </div>
  );
};
