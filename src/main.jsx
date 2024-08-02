import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./toolkit/index.js";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./toolkit/index.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <React.StrictMode>
          <Toaster />
          <App />
        </React.StrictMode>
      </Provider>
    </PersistGate>
  </BrowserRouter>
);
