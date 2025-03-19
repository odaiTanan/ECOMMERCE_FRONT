import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductsSection from "../../components/ProductsSection";

const ProductsByCategory = () => {
  const category = useParams().cat;

  return <ProductsSection category={category} isCategory={true} api={""} />;
};

export default ProductsByCategory;
