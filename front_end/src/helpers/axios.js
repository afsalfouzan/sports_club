import axios from "axios";
import confiq from "../config";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

function CustomHeader() {
  let header = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (cookies.get("auth_cookie")) {
    let currentUser = cookies.get("auth_cookie");
    console.log(currentUser.users.tokenData, "heeeeeeeeeei");
    header["x-access-token"] = currentUser.users.tokenData;
  }
  return header;
}
export function api() {
  let opts = {
    baseURL: confiq.api.trim(),
    headers: CustomHeader(),
  };
  return axios.create(opts);
}
