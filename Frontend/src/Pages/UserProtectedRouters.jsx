import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
function UserProtectedRouters({ children }) {
  const navigate = useNavigate();

  const userprofile = localStorage.getItem("userprofile");

  useEffect(() => {
    if (!userprofile) {
      navigate("/user-login");
    }
  },[]);

  return <>{children}</>;
}

export default UserProtectedRouters;
