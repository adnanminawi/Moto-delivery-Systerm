"use client";

import { useEffect, useState } from "react";
import Map from "@/components/DriverMap";
import styles from "./page.module.css";
import GPSStream from "@/components/GPSStream";
import RidePopup from "@/components/RidePopup";

export default function DriverClient() {
  // ✅ FIX: start with null (important for real popup flow)
  const [rideRequest, setRideRequest] = useState(null);

  const [driver, setDriver] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  // ✅ Fetch driver with ID = 1
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

  function acceptRide() {
    console.log("Ride accepted");
    setRideRequest(null);
  }

  function rejectRide() {
    console.log("Ride rejected");
    setRideRequest(null);
  }

  // ✅ Auto reject ride after 30 sec
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

        {isOnline && (
  <RidePopup setRideRequest={setRideRequest} />
)}

        {/* DRIVER INFO */}
        <div className={styles.card}>
          <h3>Driver Info</h3>
          <p>Name: {driver?.name || "Loading..."}</p>
          <p>Phone: {driver?.phone || "Loading..."}</p>
        </div>

        {/* STATUS */}
        <div className={styles.card}>
          <h3>Status</h3>

          <button className={styles.button} onClick={toggleStatus}>
            {isOnline ? "Go Offline" : "Go Online"}
          </button>
        </div>

        {/* TOTAL RIDES */}
        <div className={styles.card}>
          <h3>Total Rides</h3>
          <h2>13</h2>
        </div>
      </div>

      {/* MAP SECTION */}
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
              <button className={styles.accept} onClick={acceptRide}>
                Accept
              </button>

              <button className={styles.reject} onClick={rejectRide}>
                Reject
              </button>
            </div>
          </div>
        )}

        <Map rideRequest={rideRequest} />
      </div>
    </div>
  );
}