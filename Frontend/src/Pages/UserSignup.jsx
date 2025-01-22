import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USerDataContext } from "../context/UserContext";
import axios from "axios";

function UserSignup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { user, setUser } = useContext(USerDataContext);
  const SubmitHAndler = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        fullname: {
          firstname,
          lastname,
        },

        email,
        password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/register`,
        formData
      );
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        console.log("user login successfully");
        navigate("/home");
      } else {
        console.log(response.data.msg, "error");
      }

      setFirstname("");
      setLastname("");
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
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={SubmitHAndler}>
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4">
            <input
              required
              type="text"
              placeholder="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="bg-[#eeeeee] mb-7  rounded border px-4 py-2 w-1/2 text-lg placeholder:text-base"
            />
            <input
              required
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="lastname"
              className="bg-[#eeeeee] mb-7  rounded border px-4 py-2 w-1/2 text-lg placeholder:text-base"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Signup
          </button>
          <p className="text-center text-sm">
            Already have a account?{" "}
            <Link to="/user-Login" className="text-blue-600">
              Login Here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/captain-signup"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold  mb-7  rounded  px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign up as a Captain
        </Link>
      </div>
    </div>
  );
}

export default UserSignup;
