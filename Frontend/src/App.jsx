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
import CaptainLogout from "./Pages/CaptainLogout";
import CaptainHome from "./Pages/CaptainHome";
import CaptainProtectedWrapper from "./Pages/CaptainProtectedWrappers";
import LiveRiding from "./Pages/LiveRiding";
import CaptainRiding from "./Pages/CaptainRiding";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/userlogout" element={<UserLogout />} />

        <Route
          path="/Home"
          element={
            <UserProtectedRouters>
              <Home />
            </UserProtectedRouters>
          }
        />

        <Route path="/captainlgogout" element={<CaptainLogout />} />
        <Route
          path="/captainhome"
          element={
            <CaptainProtectedWrapper>
              <CaptainHome />
            </CaptainProtectedWrapper>
          }
        />
        <Route
          path="/Riding"
          element={
            // <CaptainProtectedWrapper>
            <LiveRiding />
            // </CaptainProtectedWrapper>
          }
        />

        <Route path="/captain/riding" element={<CaptainRiding />} />
      </Routes>
    </>
  );
}

export default App;
