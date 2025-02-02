import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../Components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
function CaptainRiding(props) {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );
  return (
    <div className="h-screen">
      <div className="fixed  p-6 top-0  flex  items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png
"
          alt=""
        />
        <Link
          to="/home"
          className=" bg-white flex items-center justify-center rounded-full h-7 w-7  cursor-pointer"
        >
          <i className="text-gray-400 rounded-lg ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://imgs.search.brave.com/IOOeReERpqAuDpo60Xu2r1XkDZ2m1Q6_1QIGLxJ4ctI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmlt/Z3VyLmNvbS9xaUVz/bE4wLmdpZg.gif"
          alt=""
        />
      </div>

      <div
        className="h-1/5 p-6 flex items-center justify-center gap-9  bg-yellow-400 relative "
        onClick={() => {
          setFinishRidePanel(true);
        }}
      >
        <h5
          className="text-gray-500 absolute top-0 text-4xl font-medium"
          onClick={() => {}}
        >
          <i className="ri-arrow-down-wide-line"></i>
        </h5>
        <h4 className="text-lg font-semibold">4 Km away</h4>
        <button className="   bg-green-600 text-white font-semibold p-2 rounded-lg ">
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed w-full h-screen z-10 translate-y-full bg-white bottom-0 px-3 py-6 pt-12"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
}

export default CaptainRiding;
