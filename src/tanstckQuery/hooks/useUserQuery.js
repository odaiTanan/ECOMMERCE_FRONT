import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../api/Axios";
import Cookie from "cookie-universal";
import { USER } from "../../api/api";
const useUserQuery = () => {
  async function handleTable() {
    const cookie = new Cookie();
    cookie.get("token");
    if (cookie.get("token")) {
      try {
        const res = await Axios.get(USER);
        return res.data;
      } catch (err) {
        err.status == 401 && cookie.remove("token");
      }
    }
  }
  return useQuery({
    queryKey: ["usernow"],
    queryFn: handleTable,
  });
};

export default useUserQuery;
