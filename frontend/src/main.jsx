import React from "react";
import ReactDOM from "react-dom/client";
import {ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import App from "./App";
import "./index.css";

const clerkPubKey = 
import.meta.env.VITE_PUBLIC_CLERK_PUBLISHABLE_KEY;  

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <BrowserRouter>
      <App />
      <Toaster
      position="top-center"
      richColors
      duration={1500} // 1.5 second
     />
    </BrowserRouter>
  </ClerkProvider>
);


  