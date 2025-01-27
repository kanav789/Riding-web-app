import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CaptainLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/captain-login");
  });
};

export default CaptainLogout;
