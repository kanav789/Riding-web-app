import React from "react";
import { Link ,useLocation} from "react-router-dom";
const LiveRiding = () => {
  const location= useLocation()
  const ride =location.state|| {}
  console.log(ride,"ride")
  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-4 top-2 bg-white flex items-center justify-center rounded-full h-7 w-7  cursor-pointer"
      >
        <i className="ri-home-4-line"></i>
      </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://imgs.search.brave.com/IOOeReERpqAuDpo60Xu2r1XkDZ2m1Q6_1QIGLxJ4ctI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmlt/Z3VyLmNvbS9xaUVz/bE4wLmdpZg.gif"
          alt=""
        />
      </div>

      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between p-3">
          <img
            className="h-20"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">{ride?.data.captain.fullname.firstname}</h2>
            <h4 className="text-xl font-semibold -mt-2 -mb-1">{ride?.data.pickup}</h4>
            <p className="text-sm text-gray-600">Maruti Swift</p>
          </div>
        </div>
        <div className="flex justify-between flex-col items-center gap-2">
          <div className="w-full ">
            <div className="flex items-center gap-5 p-3 border-b-2 ">
              <i className="text-lg ri-map-pin-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-[14px] text-gray-600 mt-[-2px]">
                  {ride?.data.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3  ">
              <i className="ri-currency-fill"></i>
              <div>
                <h3 className="text-lg font-medium">₹{ride?.data.fare}.00</h3>
                <p className="text-[14px] text-gray-600 mt-[-2px]">Cash </p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg">
          Make A Payment
        </button>
      </div>
    </div>
  );
};

export default LiveRiding;
