import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import WarningIcon from "./components/WarningIcon";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        {/* Win98-style pop-ups */}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#c0c0c0",
              color: "#000",
              borderRadius: 0,
              boxShadow:
                "inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #fff",
              font: '11px Tahoma, "MS Sans Serif", Geneva, sans-serif',
              padding: "8px 10px",
            },
            success: { icon: null },
            error: { icon: <WarningIcon size={16} /> },
          }}
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
