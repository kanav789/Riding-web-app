import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function FinishRide(props) {
const navigate=useNavigate()

  const endRide = async () => {

    const response =await axios.post(`${import.meta.env.VITE_BASEURL}/api/ride/endRide`,{
      rideId:props.ride._id
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('captainToken')}`
      }
    })

    if(response.status === 200){
      props.setFinishRidePanel(false) 
    
      navigate('/captainhome')
    }


  }
  return (
    <div>
      <div
        className="absolute right-3 cursor-pointer"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        {" "}
        <i className="text-xl font-extrabold ri-arrow-down-wide-fill"></i>
      </div>
      <h3 className="text-2xl font-semibold mb-5">Finish this ride</h3>
      <div className="flex items-center justify-between p-4 bg-yellow-400 rounded-lg mt-3">
        <div className="flex  items-center gap-3 ">
          <img
            className="h-10 rounded-full object-cover w-10"
            src="https://imgs.search.brave.com/zoqBg0aHx0F5FcJ3IWHTV-hbUpQeDoMFfcL-VTgeiBI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzgyL2Vh/LzQyLzgyZWE0MmEy/ZGZiMDdlODZjYjhj/NTkyYmViMjI4MTI1/LmpwZw"
            alt=""
          />
          <h2 className="text-lg font-medium ">{props.ride?.user.fullname.firstname}</h2>
        </div>
        <h5 className="font-lg font-medium ">2.2 KM</h5>
      </div>
      <div className="flex justify-between flex-col items-center gap-2">
        <div className="w-full ">
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium ">562/11-A</h3>
              <p className="text-[14px] text-gray-600 mt-[-2px]">
               {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-[14px] text-gray-600 mt-[-2px]">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3  ">
            <i className="ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}.00</h3>
              <p className="text-[14px] text-gray-600 mt-[-2px]">Cash </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 w-full">
          <button
            className="w-full mt-5 flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg "
            onClick={() => {
             endRide()
            }}
          >
            Finish Ride
          </button>
          <p className="text-gray-500 text-sm font-medium text-center">
            Click on finish ride button if you have completed the payment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FinishRide;
