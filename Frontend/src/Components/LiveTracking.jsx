import React, { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

function LiveTracking() {
  const [currentPosition, setCurrentPosition] = useState({ lat: 37.7749, lng: -122.4194 });

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error obtaining location", error);
          },
          { enableHighAccuracy: true }
        );
      }
    };

    updateLocation(); // Initial update
    const intervalId = setInterval(updateLocation, 10000); // update every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Debug current position
  useEffect(() => {
    console.log("Current position:", currentPosition);
  }, [currentPosition]);

  const mapContainerStyle = { width: "100%", height: "100vh" };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={currentPosition} zoom={15}>
        <Marker position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  );
}

export default LiveTracking;