import { useQuery } from "@tanstack/react-query";
import { CATEGORIES } from "../../api/api";
import { Axios } from "../../api/Axios";
const useCategoriesQuery = ({ setRegionError }) => {
  async function handleTable() {
    try {
      const res = await Axios.get(CATEGORIES);
      return res.data;
    } catch (err) {
      !err.status == 401 && setRegionError(true);
    }
  }
  return useQuery({
    queryKey: ["category"],
    queryFn: handleTable,
    retry: 0,
  });
};

export default useCategoriesQuery;
