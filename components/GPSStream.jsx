"use client";

import { useEffect } from "react";

export default function GPSStream({ driverId, isActive }) {
  useEffect(() => {
    if (!isActive || !driverId) return;

    console.log("GPS streaming started");

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        console.log("GPS tick:", latitude, longitude);

        await fetch("/api/drivers/location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            driverId,
            lat: latitude,
            lng: longitude,
          }),
        });
      });
    }, 5000);

    return () => {
      console.log("GPS streaming stopped");
      clearInterval(interval);
    };
  }, [isActive, driverId]);

  return null;
}