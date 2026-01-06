import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Map from '../components/Map';

delete leaflet.Icon.Default.prototype._getIconUrl;

leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


const App = () => {
  const socketRef = useRef(null);
  const [location, setlocation] = useState(null);


  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      console.log(`connected successfully`, socketRef.current.id);
    });

    socketRef.current.on("receive-location", (data) => {
      console.log("data received", data);
      setlocation([data.latitude, data.longitude])
    });

    return () => {
      socketRef.current.disconnect();
    }
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;

      setlocation([latitude, longitude]);

      if (socketRef.current?.connected) {
        socketRef.current.emit("send-location", { latitude, longitude });
      }
    },
      (error) => {
        console.error("Geolocation error", error);
      }, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000
    }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [])

  return (
    <div>
      <Map location={location} />
    </div>
  )
}

export default App
