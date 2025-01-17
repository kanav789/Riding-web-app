import { React, useState } from "react";
import { Link } from "react-router-dom";
function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Data, setData] = useState({});
  const [error, setError] = useState("");
  const SubmitHAndler = (e) => {
    e.preventDefault();

    setData({
      email,
      password,
    });
    console.log(Data, "Data aa raha hai");
    setEmail("");
    setPassword("");
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
