"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Map = dynamic(() => import("@/components/DriverMap"), { ssr: false });
import styles from "./page.module.css";
import GPSStream from "@/components/GPSStream";
import RidePopup from "@/components/RidePopup";

export default function DriverClient() {
  
  const [rideRequest, setRideRequest] = useState(null);

  const [driver, setDriver] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [activeRide, setActiveRide] = useState(null);

  const [pickup, setPickup] = useState(null);
const [destination, setDestination] = useState(null);

  useEffect(() => {
    async function fetchDriver() {
      try {
        const res = await fetch("/api/drivers/1");

        if (!res.ok) return;

        const data = await res.json();
        const d = data.driver_Profile?.[0];

        setDriver(d);
        setIsOnline(d?.status === "online");
      } catch (err) {
        console.error("Failed to fetch driver:", err);
      }
    }

    fetchDriver();
  }, []);

  async function toggleStatus() {
    if (!driver) return;

    const newStatus = isOnline ? "offline" : "online";

    try {
      const res = await fetch("/api/drivers/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          driverId: driver.id,
          status: newStatus,
        }),
      });

      if (!res.ok) {
        console.error("Failed to update status in DB");
        return;
      }

      const data = await res.json();

      setIsOnline(newStatus === "online");

      setDriver((prev) => ({
        ...prev,
        status: newStatus,
      }));

      console.log("DB updated:", data.message);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  }

async function acceptRide() {
  console.log("Ride accepted");

  try {
    const res = await fetch("/api/drivers/ride", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "accept",
        rideId: rideRequest.id,
        driverId: driver.id,
      }),
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
  setActiveRide(rideRequest);

  setPickup({
    lat: rideRequest.pickup.lat,
    lng: rideRequest.pickup.lng,
  });

  setRideRequest(null);
}

  } catch (err) {
    console.error("Failed to accept ride:", err);
  }
}

  function rejectRide() {
    console.log("Ride rejected");
    setRideRequest(null);
  }


  useEffect(() => {
    if (!rideRequest) return;

    const timer = setTimeout(() => {
      console.log("Ride expired (auto reject)");
      setRideRequest(null);
    }, 30000);

    return () => clearTimeout(timer);
  }, [rideRequest]);

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <GPSStream driverId={driver?.id} isActive={isOnline} />

   {isOnline && !activeRide && (
  <RidePopup setRideRequest={setRideRequest} driverId={driver?.id} />
)}

        <div className={styles.card}>
          <h3>Driver Info</h3>
          <p>Name: {driver?.name || "Loading..."}</p>
          <p>Phone: {driver?.phone || "Loading..."}</p>
        </div>

   
        <div className={styles.card}>
          <h3>Status</h3>

          <button className={styles.button} onClick={toggleStatus}>
            {isOnline ? "Go Offline" : "Go Online"}
          </button>
        </div>

        <div className={styles.card}>
          <h3>Total Rides</h3>
          <h2>13</h2>
        </div>
      </div>


      <div className={styles.map}>

      {rideRequest && (
    <div className={styles.popup}>
      <h3>🚨 New Ride Request</h3>

      <p>
        Pickup: {rideRequest.pickup.address}
      </p>

      <p>
        Destination: {rideRequest.destination.address}
      </p>

      <div className={styles.popupButtons}>
        <button
          className={styles.accept}
          onClick={acceptRide}
        >
          Accept
        </button>

        <button
          className={styles.reject}
          onClick={rejectRide}
        >
          Reject
        </button>
      </div>
    </div>
  )}

     {activeRide && (
  <div className="fixed top-5 left-1/2 z-[9999] -translate-x-1/2 rounded-xl bg-white p-4 shadow-lg">
    <h3 className="font-bold">
      Current Ride
    </h3>

    <p>
      Pickup: {activeRide.pickup.address}
    </p>

    <p>
      Destination: {activeRide.destination.address}
    </p>

    <div className="mt-4 flex justify-center">
      <button
        className="rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black"
        onClick={async () => {
          const res = await fetch("/api/drivers/ride", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "complete",
              rideId: activeRide.id,
            }),
          });

          const data = await res.json();

          console.log(data);

          if (res.ok) {
            setActiveRide(null);
          }
        }}
      >
        Complete Ride
      </button>
    </div>
  </div>
)}

<Map
  rideRequest={activeRide || rideRequest}
  driverLocation={{
    lat: driver?.current_lat,
    lng: driver?.current_lng,
  }}
  pickup={pickup}
  setPickup={setPickup}
  destination={destination}
  setDestination={setDestination}
/>
      </div>
    </div>


  );
 
}