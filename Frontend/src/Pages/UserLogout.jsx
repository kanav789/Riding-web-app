import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const UserLogout = () => {
  const token = localStorage.getItem("userprofile");
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("userprofile");
    localStorage.removeItem('token')
    navigate("/user-login");
  });
};

export default UserLogout;
