import React from "react";
import { TOP_RATED } from "../../api/api";
import ProductsSection from "../../components/ProductsSection";

const Top_rated = () => {
  return <ProductsSection api={TOP_RATED} />;
};

export default Top_rated;
