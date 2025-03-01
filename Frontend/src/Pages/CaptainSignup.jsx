import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../Assets/OIP.png'

import axios from "axios";
import { useNavigate } from "react-router-dom";
function CaptainSignup() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

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
        vehicle: {
          color: vehicleColor,
          model: vehicleModel,
          capacity: vehicleCapacity,
          vehicleType: vehicleType,
        },
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/captain/register`,
        formData
      );
      const data = response.data;
      localStorage.setItem("captainToken", data.token);
      localStorage.setItem("captainprofile", JSON.stringify(data));

      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setVehicleColor("");
      setVehicleModel("");
      setVehicleCapacity("");
      setVehicleType("");
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
          src={logo}
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
          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Model"
              value={vehicleModel}
              onChange={(e) => {
                setVehicleModel(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
            />
            <select
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold  mb-7  rounded  px-4 py-2 w-full text-lg placeholder:text-base">
            Signup
          </button>
          <p className="text-center text-sm">
            Already have a account?{" "}
            <Link to="/captain-login" className="text-blue-600">
              Login Here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px] mt-6 leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
}

export default CaptainSignup;
