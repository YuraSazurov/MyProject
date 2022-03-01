import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./dist/css/main.min.css"
import {createStore} from "redux"
import {store} from "./store/store";
import App from "./App";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(store)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
