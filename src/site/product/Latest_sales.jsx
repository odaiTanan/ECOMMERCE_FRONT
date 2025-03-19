import React from "react";
import { LATEST_SALE } from "../../api/api";
import ProductsSection from "../../components/ProductsSection";

const Latest_sales = () => {
  return <ProductsSection api={LATEST_SALE} />;
};

export default Latest_sales;
