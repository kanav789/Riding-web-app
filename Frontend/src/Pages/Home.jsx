import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LoactionSearchPanel from "../Components/LoactionSearchPanel";
function Home() {
  const [pickup, setPickup] = useState();

  const [destination, setDestination] = useState();
  const [panelopen, setPanelopen] = useState(false);
  const panelref = useRef(null);
  const panelCloseref = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

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
              onClick={() => setPanelopen(true)}
              type="text"
              placeholder=" Add a Pickup location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setPanelopen(!panelopen)}
              type="text"
              placeholder="Enter Your Destination"
            />
          </form>
        </div>
        <div className="h-0 bg-white " ref={panelref}>
          <LoactionSearchPanel />
        </div>
      </div>
    </div>
  );
}

export default Home;
