import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "../../api/Axios";
const useTableSearchMutation = ({ setFound, setFilteredData, search }) => {
  const queryClient = useQueryClient();
  async function handleSearch(searchPage) {
    try {
      const res = await Axios.post(`${searchPage}/search?title=${search}`);
      setFilteredData(res.data);
      setFound(res.data.length > 0);
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  const mutation = useMutation({
    mutationFn: handleSearch,
  });
  return {
    searchMutation: mutation,
    isSearching: mutation.isPending,
  };
};

export default useTableSearchMutation;
