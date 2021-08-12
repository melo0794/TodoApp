import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
// import DarkSwitch from "./components/DarkSwitch"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <DarkSwitch/> */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
