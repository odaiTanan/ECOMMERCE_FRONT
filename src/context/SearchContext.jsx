import { useState } from "react";
import { createContext } from "react";
import React from "react";
export const searchContext = createContext();
const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(0);
  return (
    <searchContext.Provider value={{ search, setSearch, clicked, setClicked }}>
      {children}
    </searchContext.Provider>
  );
};

export default SearchContextProvider;
