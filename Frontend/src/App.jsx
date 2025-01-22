import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./Pages/UserLogin";
import UserSignup from "./Pages/UserSignup";
import CaptainLogin from "./Pages/CaptainLogin";
import CaptainSignup from "./Pages/CaptainSignup";

import Start from "./Pages/Start";
import Home from "./Pages/Home";
import UserProtectedRouters from "./Pages/UserProtectedRouters";
import UserLogout from "./Pages/UserLogout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/logout" element={<UserLogout />} />

        <Route
          path="/Home"
          element={
            <UserProtectedRouters>
              <Home />
            </UserProtectedRouters>
          }
        />
      </Routes>
    </>
  );
}

export default App;
