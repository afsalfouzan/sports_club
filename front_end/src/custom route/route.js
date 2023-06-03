import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "../store";
import Login from "../containers/auth/login";
import Signup from "../containers/auth/signup";
import Forgotpassword from "../containers/auth/forgotpassword";
import Resetpassword from "../containers/auth/resetpassword";
import Superadmin from "../containers/superadmin"

function CustomRoutes() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            //auth
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
            <Route path="/forgotpassword" element={<Resetpassword />}></Route>
            <Route
              path="/email/resetpassword/:token/:email"
              element={<Resetpassword />}
            ></Route>

            //super admin
            <Route path="/superadmin" element={<Superadmin />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default CustomRoutes;
