import React from "react";

function VehiclePanel(props) {
  return (
    <div>
      {" "}
      <div
        className="  absolute right-3 cursor-pointer"
        onClick={() => {
          props.setVehiclepanel(false);
        }}
      >
        {" "}
        <i className="text-xl font-extrabold ri-arrow-down-wide-fill"></i>
      </div>
      {/* choose a vehicle */}
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      {/* car */}
      <div
        onClick={() => {
          props.setConfirmRide(true);
          props.selectVehicle("car");
        }}
        className="flex w-full p-3 mb-2 items-center justify-between border-2 active:border-black  rounded-lg cursor-pointer"
      >
        <img
          className="h-10 "
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill">4</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm"> 2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable , compact rides{" "}
          </p>
        </div>
        <h2 className="text-sm font-semibold">₹{props.fare.car}</h2>
      </div>
      {/* bike */}
      <div
        onClick={() => {
          props.setConfirmRide(true);
          props.selectVehicle("motorcycle");
        }}
        className="flex w-full p-3 mb-2 items-center justify-between border-2 active:border-black  rounded-lg cursor-pointer"
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill">1</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable , Motorcycle rides{" "}
          </p>
        </div>
        <h2 className="text-sm font-semibold">₹{props.fare.motorcycle}</h2>
      </div>
      {/* auto */}
      <div
        onClick={() => {
          props.setConfirmRide(true);
          props.selectVehicle("auto");
        }}
        className="flex w-full p-3 mb-2 items-center justify-between border-2 active:border-black  rounded-lg cursor-pointer"
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-base">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill">3</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable , Auto rides{" "}
          </p>
        </div>
        <h2 className="text-sm font-medium">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
}

export default VehiclePanel;
