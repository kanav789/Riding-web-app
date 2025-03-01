import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LoactionSearchPanel from "../Components/LoactionSearchPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ConfirmedVehicle from "../Components/ConfirmedVehicle";
import LookingForDriver from "../Components/LookingForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";

import WaitingForDriver from "../Components/WaitingForDriver";
import {useNavigate} from "react-router-dom"

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelopen, setPanelopen] = useState(false);
  const panelref = useRef(null);
  const panelCloseref = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRiderRef = useRef(null);
  const [activeField, setActiveField] = useState(null);

  const [vehiclepanel, setVehiclepanel] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const LookingForDriverRef = useRef(null);
  const [isLookingForDriver, setIsLookingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null)
  const [ waitingForDriver, setWaitingForDriver ] = useState(false)

  const [fare, setFare] = useState({});

  const [vehicleType, setVehicleType] = useState("");

  const { socket } = useContext(SocketContext);
 const [ride,setride]=useState(null)

  const userStr = localStorage.getItem("userprofile");
  const user = userStr ? JSON.parse(userStr): "user nahi hai bahi";

  const navigate =useNavigate()
 
   
console.log(user)
  useEffect(() => {
   
      socket.emit("join", { userType: "user", userId: user.user._id });
    
  }, [user]);

 
  socket.on("ride-confirmed",(data)=>{
 
  setride(data)
  console.log(data,"daaata")
  setIsLookingForDriver(false)
  setWaitingForDriver(true)
  })


  socket.on("ride-started",(data)=>{
    setWaitingForDriver(false)
    navigate('/riding',{state:{data}})
    
  })
 


   

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  // Location Panel
  useGSAP(
    function () {
      if (panelopen) {
        gsap.to(panelref.current, {
          height: "70%",
        });
        gsap.to(panelCloseref.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelref.current, {
          height: "0%",
        });
        gsap.to(panelCloseref.current, {
          opacity: 0,
        });
      }
    },
    [panelopen]
  );

  // Vehicle panel
  useGSAP(
    function () {
      if (vehiclepanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclepanel]
  );

  // Confirm Ride PAge
  useGSAP(
    function () {
      if (confirmRide) {
        gsap.to(confirmRiderRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(confirmRiderRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRide]
  );

  // Looking For Driver
  useGSAP(
    function () {
      if (isLookingForDriver) {
        gsap.to(LookingForDriverRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(LookingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [isLookingForDriver]
  );

  // waiting for driver
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  ); useGSAP(
    function () { 
      if (waitingForDriver) { 
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      } 
    },
    [waitingForDriver]
  );

  async function findTrip() {
    setVehiclepanel(true);
    setPanelopen(false);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/ride/fares`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setFare(response.data);

      console.log(fare, "fare");
    } catch (error) {
      console.log(error);
    }
  }

  // create ride
  async function createRide() {
    await axios
      .post(
        `${import.meta.env.VITE_BASEURL}/api/ride/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setIsLookingForDriver(true);
        setVehiclepanel(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative ">
      <img
        className="w-16 absolute top-5 left-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://imgs.search.brave.com/jK1glZ46aRnMBCp3Bqv7YWCuqyKXawBDiB0s1mPwES0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zaW1v/bnBhbi5jb20vd3At/Y29udGVudC90aGVt/ZXMvc3BfcG9ydGZv/bGlvL2Fzc2V0cy91/YmVyLW5vdC1waWNr/dXAuanBn"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full  ">
        <div className="h-[30%]  bg-white relative p-5">
          <h5
            ref={panelCloseref}
            className=" absolute right-5 text-lg font-semibold rounded-lg cursor-pointer opacity-0"
            onClick={() => setPanelopen(false)}
          >
            <i className="ri-arrow-down-wide-line"></i>{" "}
          </h5>
          <h4 className="text-xl mb-3 font-semibold">Find a Trip</h4>
          <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
            <div className="line absolute  h-16  w-1  top-[37%] left-10 bg-gray-700 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => {
                setPanelopen(true);
                setActiveField("pickup");
              }}
              type="text"
              placeholder=" Add a Pickup location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => {
                setPanelopen(true);
                setActiveField("destination");
              }}
              type="text"
              placeholder="Enter Your Destination"
            />
          </form>
          <button
            onClick={() => findTrip()}
            className="bg-black w-full flex justify-center rounded-lg text-white py-2 mt-1 mb-10"
          >
            Find Trip
          </button>
        </div>

        {/* location panel */}
        <div className="h-0 bg-white " ref={panelref}>
          <LoactionSearchPanel
            pickup={pickup}
            setPickup={setPickup}
            destination={destination}
            setDestination={setDestination}
            activeField={activeField}
            setPanelopen={setPanelopen}
            setVehiclepanel={setVehiclepanel}
          />
        </div>
      </div>

      {/* vehicle panel  */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-6"
      >
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRide={setConfirmRide}
          setVehiclepanel={setVehiclepanel}
        />
      </div>

      {/* confirm Ride */}

      <div
        ref={confirmRiderRef}
        className="fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-6 pt-12"
      >
        <ConfirmedVehicle
          pickup={pickup}
          destination={destination}
          fare={fare}
          createRide={createRide}
          vehicleType={vehicleType}
          setIsLookingForDriver={setIsLookingForDriver}
          setConfirmRide={setConfirmRide}
        />
      </div>
      {/* Waiting for Driver to confirm the ride */}
      <div
        ref={LookingForDriverRef}
        className="fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-6 pt-12"
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          createRide={createRide}
          vehicleType={vehicleType}
          setIsLookingForDriver={setIsLookingForDriver}
        
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-6 pt-12"
      >
        <WaitingForDriver
        ride={ride}
        setWaitingForDriver={setWaitingForDriver}
       
        
        />
      </div>
    </div>
  );
}

export default Home;
