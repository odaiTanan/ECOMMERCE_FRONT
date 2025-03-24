import { useQuery } from "@tanstack/react-query";
import { CATEGORIES } from "../../api/api";
import { Axios } from "../../api/Axios";
const useCategoriesQuery = () => {
  async function handleTable() {
    const res = await Axios.get(CATEGORIES);
    return res.data;
  }
  return useQuery({
    queryKey: ["category"],
    queryFn: handleTable,
  });
};

export default useCategoriesQuery;
