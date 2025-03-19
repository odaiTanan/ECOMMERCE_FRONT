import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import ProductsSection from "../../components/ProductsSection";
import { searchContext } from "../../context/SearchContext";

const Search = () => {
  const SearchContext = useContext(searchContext);

  return (
    <ProductsSection
      key={SearchContext.clicked}
      api={`product-search?title=${SearchContext.search} `}
    />
  );
};

export default Search;
