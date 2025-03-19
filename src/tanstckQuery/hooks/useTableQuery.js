import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../api/Axios";
const useTableQuery = ({
  pageTitle,
  itemsPerPage,
  page,
  api,
  setDataLength,
}) => {
  async function handleTable() {
    const res = await Axios.get(`${api}?limit=${itemsPerPage}&page=${page}`);
    setDataLength(res.data.total);
    return res.data.data;
  }
  return useQuery({
    queryKey: [`${pageTitle}`, `${page}`],
    queryFn: handleTable,
  });
};

export default useTableQuery;
