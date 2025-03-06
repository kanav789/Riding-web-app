import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CaptainLogout = () => {
  const token = localStorage.getItem("captainprofile");
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("captainprofile");
    localStorage.removeItem("captainToken");
    navigate("/captain-login");
  }, []);
};

export default CaptainLogout;
