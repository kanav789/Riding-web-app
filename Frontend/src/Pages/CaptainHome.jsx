import React from "react";
import { Link } from "react-router-dom";
function CaptainHome() {
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
          className="fixed right-4 top-2 bg-white flex items-center justify-center rounded-full h-7 w-7  cursor-pointer"
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
    </div>
  );
}

export default CaptainHome;
