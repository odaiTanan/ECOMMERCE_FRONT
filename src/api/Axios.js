import axios from "axios";
import { host } from "./api";
import Cookie from "cookie-universal";
const cookie = Cookie();
const token = cookie.get("token");
export const Axios = axios.create({
  baseURL: host,
  headers: { Authorization: "Bearer " + token },
});
