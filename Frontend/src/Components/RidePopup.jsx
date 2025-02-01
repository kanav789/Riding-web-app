import React from "react";

function RidePopup(props) {
  return (
    <div>
      <div
        className="absolute right-3 cursor-pointer"
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
      >
        {" "}
        <i className="text-xl font-extrabold ri-arrow-down-wide-fill"></i>
      </div>
      <h3 className="text-2xl font-semibold mb-5">New Ride For You</h3>
      <div className="flex items-center justify-between p-4 bg-yellow-400 rounded-lg mt-3">
        <div className="flex  items-center gap-3 ">
          <img
            className="h-10 rounded-full object-cover w-10"
            src="https://imgs.search.brave.com/zoqBg0aHx0F5FcJ3IWHTV-hbUpQeDoMFfcL-VTgeiBI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzgyL2Vh/LzQyLzgyZWE0MmEy/ZGZiMDdlODZjYjhj/NTkyYmViMjI4MTI1/LmpwZw"
            alt=""
          />
          <h2 className="text-lg font-medium ">Harsh Patel</h2>
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
                Kankhirya Talab, Ahembdabad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-[14px] text-gray-600 mt-[-2px]">
                Kankhirya Talab, Ahembdabad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3  ">
            <i className="ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹183.00</h3>
              <p className="text-[14px] text-gray-600 mt-[-2px]">Cash </p>
            </div>
          </div>
        </div>

        <button
          className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg "
          onClick={() => {
            props.setRidePopUpPanel(false);
          }}
        >
          Confirm
        </button>
        <button
          className="w-full mt-1 bg-gray-400 text-white font-semibold p-2 rounded-lg "
          onClick={() => {
            props.setRidePopUpPanel(false);
          }}
        >
          Ignore
        </button>
      </div>
    </div>
  );
}

export default RidePopup;
