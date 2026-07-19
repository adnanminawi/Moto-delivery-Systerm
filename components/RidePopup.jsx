"use client";

import { useEffect } from "react";

export default function RidePopup({ setRideRequest, driverId  }) {
  useEffect(() => {
    let lastRideId = null;
    let timeoutId = null;

    async function checkRide() {
      try {
        const res = await fetch("/api/drivers/ride");

        if (!res.ok) return;

        const data = await res.json();

        const ride = data.rides_info?.find(
          (r) => r.status === "searching" && r.driver_id == driverId
        );

        if (ride && ride.id !== lastRideId) {
          lastRideId = ride.id;

          setRideRequest({
  id: ride.id,

    customer: {
    name: ride.customer_name,
    phone: ride.customer_phone,
  },

  pickup: {
    lat: ride.pickup_lat,
    lng: ride.pickup_lng,
    address: ride.pickup_address,
  },

  destination: {
    lat: ride.destination_lat,
    lng: ride.destination_lng,
    address: ride.destination_address,
  },
});

          if (timeoutId) clearTimeout(timeoutId);

          timeoutId = setTimeout(() => {
            setRideRequest(null);
          }, 30000);
        }
      } catch (err) {
        console.error("RidePopup error:", err);
      }
    }

    // Check immediately when page loads
    checkRide();

    // Then check every 3 seconds
    const interval = setInterval(checkRide, 3000);

    return () => {
      clearInterval(interval);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [setRideRequest, driverId]);

  return null;
}