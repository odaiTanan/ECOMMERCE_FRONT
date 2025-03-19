import React from "react";
import { LATEST } from "../../api/api";
import ProductsSection from "../../components/ProductsSection";

const Latest_products = () => {
  return <ProductsSection api={LATEST} />;
};

export default Latest_products;
