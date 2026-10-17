import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1a1a2e",
              color: "#e5e7f0",
              border: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
