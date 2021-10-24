import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/style.scss";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <ToastContainer />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
