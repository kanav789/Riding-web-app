import React from "react";

function CaptainDetails() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://imgs.search.brave.com/zoqBg0aHx0F5FcJ3IWHTV-hbUpQeDoMFfcL-VTgeiBI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzgyL2Vh/LzQyLzgyZWE0MmEy/ZGZiMDdlODZjYjhj/NTkyYmViMjI4MTI1/LmpwZw"
            alt=""
          />
          <h4>Kanav Kumar</h4>
        </div>
        <div className="flex flex-col justify-center  items-start p-5">
          <h4 className="text-xl font-semibold">$295.2</h4>
          <p className="text-sm  font-medium text-gray-600">Earned</p>
        </div>
      </div>
      <div>
        <div className="flex justify-center p-3 bg-gray-100 rounded-xl  gap-5 items-center">
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-time-line"></i>
            <h5 className="text-lg font-medium ">10.5</h5>
            <p className="text-sm text-gray-600">Hour's Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
            <h5 className="text-lg font-medium ">10.5</h5>
            <p className="text-sm text-gray-600">Hour's Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className="text-lg font-medium ">10.5</h5>
            <p className="text-sm text-gray-600">Hour's Online</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaptainDetails;
