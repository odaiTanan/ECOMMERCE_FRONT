import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LOGOUT } from "../../api/api";
import { Axios } from "../../api/Axios";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  async function handle() {
    try {
      const res = await Axios.get(LOGOUT);
      const cookie = Cookie();
      cookie.remove("token");
      nav("/login", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }
  const mutation = useMutation({
    mutationFn: handle,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["usernow"] });
    },
  });
  return {
    mutation,
    isPending: mutation.isPending,
  };
};

export default useLogoutMutation;
