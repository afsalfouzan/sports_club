import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CustomRoutes from "./custom route/route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
    <CustomRoutes />
    <ToastContainer closeOnClick={false} closeButton={true} />
  </Provider>
);
