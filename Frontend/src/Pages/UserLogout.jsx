import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserLogout = () => {
  const token = localStorage.getItem("userprofile");
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("userprofile");
    navigate("/user-login");
  });
};

export default UserLogout;
