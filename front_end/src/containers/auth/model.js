import * as service from "./services";
import { toast } from "react-toastify";

export default {
  state: {
    user: [],
  },
  reducers: {
    setUserDetails: (state, data) => {
      return {
        ...state,
        user: data,
      };
    },
  },
  effects: {
    async login(payload) {
      try {
        let res = await service.login(payload);
        this.setUserDetails(res);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return res;
      } catch (e) {
        return e;
      }
    },
    async signup(payload) {
      try {
        let res = await service.signup(payload);
        this.setUserDetails(res);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return res;
      } catch (e) {
        return e;
      }
    },
    async forgotpassword(payload) {
      try {
        let res = await service.forgotpassword(payload);
        this.setUserDetails(res);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return res;
      } catch (e) {
        return e;
      }
    },
    async resetpassword(payload) {
      try {
        let res = await service.resetpassword(payload);
        this.setUserDetails(res);
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return res;
      } catch (e) {
        return e;
      }
    },
  },
};
