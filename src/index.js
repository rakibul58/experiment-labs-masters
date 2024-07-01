import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AuthProvider from "./contexts/AuthProvider";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { NotificationProvider } from "./contexts/NotificationContext";
// import ReactPixel from "react-facebook-pixel";

const supabase = createClient(
  "https://qzgeifdgviycxooauyum.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6Z2VpZmRndml5Y3hvb2F1eXVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUzMzMyMTcsImV4cCI6MjAyMDkwOTIxN30.VVKlBGw8xmbW5C2UQ-QCCl8fk0qFRf3jrQfknsqtRxc"
);

// const options = {
//   autoConfig: true,
//   debug: false,
// };

// ReactPixel.init("754035322177278", options);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SessionContextProvider supabaseClient={supabase}>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </SessionContextProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
