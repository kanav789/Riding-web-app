import { React, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CaptainLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Data, setData] = useState({});
  const [error, setError] = useState("");
  const SubmitHAndler = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        email,
        password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/captain/login`,
        formData
      );
      setEmail("");
      setPassword("");
      console.log(response.data);

      const data = response.data;

      localStorage.setItem("captainprofile", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={SubmitHAndler}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email@example.com"
            className="bg-[#eeeeee] mb-7  rounded border px-4 py-2 w-full text-lg placeholder:text-base"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#eeeeee] mb-7  rounded border px-4 py-2 w-full text-lg placeholder:text-base"
          />
          <button className="bg-[#111] text-white font-semibold  mb-7  rounded  px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
          <p className="text-center text-sm">
            New here?{" "}
            <Link to="/captain-signup" className="text-blue-600">
              Create An New Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/user-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold  mb-7  rounded  px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
}

export default CaptainLogin;
