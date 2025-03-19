import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "../../api/Axios";
const useDeleteMutation = ({ pageTitle, deleted }) => {
  const queryClient = useQueryClient();
  //remove data from table
  async function remove(id) {
    try {
      const res = await Axios.delete(deleted + id);
    } catch (err) {
      console.log(err);
    }
  }
  const mutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [`${pageTitle}`] });
    },
  });
  return {
    mutation,
    isPending: mutation.isPending,
  };
};

export default useDeleteMutation;
