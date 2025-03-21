import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import logo from '../Assets/OIP.png'

function Start() {
  const navigate = useNavigate();

  const handlestart=()=>{
   const captaiProfile =localStorage.getItem('captainToken')
   const user =localStorage.getItem('token')
   if(captaiProfile){
     navigate('/captainhome')
  }
  else if(user){
    navigate('/home')
  }
  else{
    navigate('/user-login')
  }
  }
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]  h-screen  pt-8 flex justify-between flex-col  w-full ">
        <img
          className="w-10 ml-8 "
          src={logo}
          alt=""
        />
        <div className="bg-white py-4 px-4 pb-7">
          <h2 className="text-3xl font-bold">Get Started With Riding App</h2>
          <button
       
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
            onClick={()=>handlestart()}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Start;
