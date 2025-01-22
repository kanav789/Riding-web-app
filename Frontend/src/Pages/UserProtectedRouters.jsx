import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
function UserProtectedRouters({ children }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.log(token);
      navigate("/user-login");
    }
  });

  return <>{children}</>;
}

export default UserProtectedRouters;
