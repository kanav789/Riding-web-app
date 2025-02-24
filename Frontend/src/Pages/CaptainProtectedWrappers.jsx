import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
function CaptainProtectedWrapper({ children }) {
  const navigate = useNavigate();

  const userprofile = localStorage.getItem("captainprofile");

  useEffect(() => {
    if (!userprofile) {
      navigate("/captain-login");
    }
  });

  return <>{children}</>;
}

export default CaptainProtectedWrapper;
