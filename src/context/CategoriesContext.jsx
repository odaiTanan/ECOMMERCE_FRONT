import React from "react";
import { useState } from "react";
import { createContext } from "react";
export const categoriesContext = createContext();
const CategoriesContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  return (
    <categoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </categoriesContext.Provider>
  );
};

export default CategoriesContextProvider;
