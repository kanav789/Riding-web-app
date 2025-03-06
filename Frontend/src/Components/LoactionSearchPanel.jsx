import React, { useState, useEffect } from "react";
import axios from "axios";

function LoactionSearchPanel({
  pickup,
  setPickup,
  destination,
  setDestination,
  activeField,
  setPanelopen,
  setVehiclepanel,
}) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    let query = "";
    if (activeField === "pickup" && pickup?.length >= 3) {
      query = pickup;
    } else if (activeField === "destination" && destination?.length >= 3) {
      query = destination;
    } else {
      setSuggestions([]);
      return;
    }
    axios
      .get(
        `${import.meta.env.VITE_BASEURL}/api/map/getSuggestions?input=${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        
        setSuggestions(res.data || []);
      })
      .catch((error) => {
        console.log(error);
        console.error("Error fetching suggestions:", error);
      });
  }, [pickup, destination, activeField]);

  const handleSuggestionClick = (description) => {
    if (activeField === "pickup") {
      setPickup(description);
    } else {
      setDestination(description);
    }
    // setPanelopen(false);
    // setVehiclepanel(true);
  };

  return (
    <div>
      {suggestions.map((item, idx) => (
        <div
          key={idx}
          onClick={() => handleSuggestionClick(item.description)}
          className="flex items-center justify-start gap-4 p-5 m-4 border-2 border-gray-100 active:border-black rounded-lg cursor-pointer"
        >
          <h2 className="bg-[#eee] h-8 w-12 rounded-full flex justify-center items-center">
            <i className="ri-map-pin-line"></i>
          </h2>
          <h4 className="flex flex-wrap text-base font-medium font-sans">
            {item.description}
          </h4>
        </div>
      ))}
    </div>
  );
}

export default LoactionSearchPanel;
