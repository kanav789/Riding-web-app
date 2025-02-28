import React, { useContext,useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../Components/CaptainDetails";
import RidePopup from "../Components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../Components/ConfirmRidePopUp";
import axios from "axios";
import {SocketContext} from "../context/SocketContext"
function CaptainHome() {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const ridePopUpPanelRef = useRef(null);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const confirmridePopUpPanelRef = useRef(null);
  const [captainProfile, setCaptainProfile] = useState(null);

  const {socket } =useContext(SocketContext);
  const captainprofile = JSON.parse(localStorage.getItem("captainprofile"));
  const [ride,setRide] = useState(null);
 useEffect(() => {    
  socket.emit("join", {userId:captainprofile.captain._id,userType:"captain"});
  const updateLocation = () => {
    if (navigator.geolocation) {
      
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position);
          console.log({
            userId: captainprofile.captain._id,
            location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude
            }
          });
          socket.emit('update-location-captain', {
            userId: captainprofile.captain._id,
            location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude
            }
          });
        });
    } else {
      console.log("Location not available");
    }
  };

  const locationInterval = setInterval(updateLocation, 10000);
  updateLocation();

  // return () => clearInterval(locationInterval);
 }, []);
 

 socket.on("new-ride", (data) => {
  console.log(data)
  setRide(data);
 setRidePopUpPanel(true);
 })




  useGSAP(
    function () {
      if (ridePopUpPanel) {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopUpPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopUpPanel) {
        gsap.to(confirmridePopUpPanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(confirmridePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopUpPanel]
  );

// connfirm ride
const confirmRide =async () => {
const response =await axios.post(`${import.meta.env.VITE_BASEURL}/api/ride/confirm`,{
  rideId:ride._id,
  captainId:localStorage.getItem("captainProfile.captain._id"),},{

  headers:{
    Authorization:`Bearer ${localStorage.getItem("captainToken")}`
  }
})
console.log("hi")
console.log(response.data)

}


  return (
    <div className="h-screen">
      <div className="fixed  p-6 top-0  flex  items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/home"
          className=" bg-white flex items-center justify-center rounded-full h-7 w-7  cursor-pointer"
        >
          <i className="text-gray-400 rounded-lg ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://imgs.search.brave.com/IOOeReERpqAuDpo60Xu2r1XkDZ2m1Q6_1QIGLxJ4ctI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmlt/Z3VyLmNvbS9xaUVz/bE4wLmdpZg.gif"
          alt=""
        />
      </div>

      <div className="h-2/5 p-6">
        {captainProfile ? (
          <CaptainDetails profile={captainProfile} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {/* ridePopup */}
      <div
        ref={ridePopUpPanelRef}
        className="fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-6 pt-12"
      >
        <RidePopup
        ride={ride}
        confirmRide={confirmRide}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
      {/* Confirm Ride Pop Up */}

      <div
        ref={confirmridePopUpPanelRef}
        className="fixed w-full h-screen z-10 translate-y-full bg-white bottom-0 px-3 py-6 pt-12"
      >
        <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>
    </div>
  );
}

export default CaptainHome;