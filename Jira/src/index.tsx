// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import theme from "./flowbite-theme";

import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import SignInPage from "./pages/authentication/login";
//import DevsDashboard from "./pages/devs/devsDashboard";
import GiftDashboard from "./pages/dash/dashboard";
import Cards from "./pages/cards/cards"
import UserListPage from "./pages/users/Users"
import Vendors from "./pages/vendors/vendors"
import Request from "./pages/requisitions/request";
 
 
 
const container = document.getElementById("root");
 
if (!container) {
  throw new Error("React root element doesn't exist!");
}
 
const root = createRoot(container);
 
root.render(
  // <StrictMode>
    <Flowbite theme={{ theme }}>
      <BrowserRouter>
        <Routes>
        <Route path="/SignIn" element={<SignInPage />} index />
        <Route
          path="/"
          element={<SignInPage />}
        />
        <Route
          path="/Dashboard"
          element={<GiftDashboard />}
        />
        <Route path="/cards" element={<Cards />} index/>
        <Route path="/users" element={<UserListPage />} index/>
        <Route path="/vendors" element={<Vendors />} index/>
        <Route path="/Requisitions" element={<Request />} index/>
        </Routes>
      </BrowserRouter>
    </Flowbite>
  // </StrictMode>
);