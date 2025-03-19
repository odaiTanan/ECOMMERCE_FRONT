import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Axios } from "../../api/Axios";
import { searchContext } from "../../context/SearchContext";
const useProductsQuery = ({ isCategory, api, category }) => {
  //get any products by category, search....
  const SearchContext = useContext(searchContext);
  const search = SearchContext.search;
  function handleProducts() {
    return isCategory
      ? Axios.post(`searchByCategory?category=${category}`).then((res) => {
          return res.data;
        })
      : Axios.get(api).then((res) => {
          return res.data;
        });
  }
  return useQuery({
    queryKey: ["products", `${api}`, `${category}`, `${search}`],
    queryFn: handleProducts,
  });
};

export default useProductsQuery;
