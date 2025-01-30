import React from "react";

function LoactionSearchPanel(props) {
  console.log(props);

  const Location = [
    "Ward No.1 , Shiv Calony near Kali Ki Dukaan Allah, Jammu.",
    "Ward No.2 , Vishnu Calony near Kali Ki Dukaan Allah, Jammu.",
    "Ward No.3 , Brahma Calony near Kali Ki Dukaan Allah, Jammu.",
    "Ward No.4 , Brahma Calony near Kali Ki Dukaan Allah, Jammu.",
    "Ward No.5 , Ravidass Calony near Kali Ki Dukaan Allah, Jammu.",
  ];

  return (
    <div>
      {Location.map((location, idx) => {
        return (
          <div
            key={idx}
            onClick={() => {
              props.setVehiclepanel(true);
              props.setPanelopen(false);
            }}
            className="flex items-center justify-start gap-4 p-5 m-4 border-2 border-gray-100 active:border-black rounded-lg cursor-pointer"
          >
            <h2 className="bg-[#eee] h-8 w-12 rounded-full flex justify-center items-center">
              <i className="ri-map-pin-line"></i>
            </h2>
            <h4 className="flex flex-wrap text-base font-medium font-sans">
              {location}
            </h4>
          </div>
        );
      })}
    </div>
  );
}

export default LoactionSearchPanel;
