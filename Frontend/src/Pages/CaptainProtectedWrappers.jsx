import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CaptainProtectedWrapper({ children }) {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.log(token);
      navigate("/captain-login");
    }
  }, [token]);

  axios
    .get(`${import.meta.env.VITE_BASEURL}/api/captain/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setLoading(false);
      }
    })
    .catch((error) => {
      console.log(error);
      localStorage.removeItem("token");
      setLoading(false);
      navigate("/captain-login");
    });

  if (Loading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
}

export default CaptainProtectedWrapper;
