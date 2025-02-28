import React from "react";

function WaitingForDriver(props) {
  return (
    <div>
      <div
        className="absolute top-1 left-[50%] cursor-pointer"
        onClick={() => {
          props.setWaitingForDriver(false)
        }}
      >
        {" "}
        <i className="text-5xl font-light text-gray-400 ri-arrow-down-wide-fill"></i>
      </div>

      <div className="flex items-center justify-between p-3">
        <img
          className="h-20"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium uppercase">{props.ride?.captain.fullname.firstname}</h2>
          <h4 className="text-xl font-semibold -mt-2 -mb-1">Mp04 AB 1234</h4>
   <p>{props.ride?.otp}</p>
        </div>
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
      </div>
    </div>
  );
}

export default WaitingForDriver;
