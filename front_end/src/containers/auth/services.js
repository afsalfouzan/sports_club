import { api } from "../../helpers/axios";
import { toast } from "react-toastify";

export function login(user) {
  return api()
    .post("/api/users/login", user)
    .then((res) => res)
    .catch((e) =>
      toast.error(e.response.data.error || e.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    );
}

export function signup(user) {
  return api()
    .post("/api/users/signup", user)
    .then((res) => res)
    .catch((e) =>
      toast.error(e.response.data.error || e.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    );
}

export function forgotpassword(email) {
  return api()
    .post("/api/users/forgotpassword", email)
    .then((res) => res)
    .catch((e) =>
      toast.error(e.response.data.error || e.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    );
}

export function resetpassword(params) {
  console.log(params, "feeeeeeeeeeeeeeeei");
  let password = {
    newpassword: params.newpassword,
    confirmpassword: params.confirmpassword,
  };
  return api()
    .put(
      `/api/users/resetpassword?token=${params.token}&email=${params.email}`,
      password
    )
    .then((res) => res.data)
    .catch((e) =>
    // console.log(e.response.data.error,"Error")
      toast.error(e.response.data.error || e.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    );
}
