import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./config/i18n.ts";

import { Provider } from "react-redux";
import appStore from "./redux/store.ts";
import { Toaster } from "sonner";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={appStore}>
    <StrictMode>
      <Toaster position="bottom-right" richColors/>
      <App />
    </StrictMode>
  </Provider>,
);
