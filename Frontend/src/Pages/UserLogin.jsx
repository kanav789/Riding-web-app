import { React, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../Assets/OIP.png'
// import { UserDataContext } from "../context/UserContext";
import axios from "axios";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const SubmitHAndler = async (e) => {
    e.preventDefault();

    try {
      const formdata = {
        email,
        password,
      };
      console.log(formdata);

      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/login`,
        formdata
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);

        localStorage.setItem("userprofile", JSON.stringify(data));
       
        console.log("user login successfully");
        navigate("/home");
      } else {
        console.log(response, "error");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src={logo}
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
            <Link to="/user-signup" className="text-blue-600">
              Create An New Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold  mb-7  rounded  px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;
