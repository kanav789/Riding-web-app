import React from "react";

function ConfirmedVehicle(props) {
  return (
    <div>
      <div
        className="  absolute right-3 cursor-pointer"
        onClick={() => {
          props.setConfirmRide(false);
        }}
      >
        {" "}
        <i className="text-xl font-extrabold ri-arrow-down-wide-fill"></i>
      </div>
      <h3 className="text-2xl font-semibold mb-5">Confirm Your Ride</h3>
      <div className="flex justify-between flex-col items-center gap-2">
        <img
          className="h-20"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="w-full ">
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium ">562/11-A</h3>
              <p className="text-[14px] text-gray-600 mt-[-2px]">
                {props.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-[14px] text-gray-600 mt-[-2px]">
              {props.destination}

              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3  ">
            <i className="ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
              <p className="text-[14px] text-gray-600 mt-[-2px]">Cash </p>
            </div>
          </div>
        </div>

        <button
          className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg"
          onClick={() => {
            props.setIsLookingForDriver(true);
            props.createRide();
          }}
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
}

export default ConfirmedVehicle;
