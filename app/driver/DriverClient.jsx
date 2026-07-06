"use client";

import { useEffect, useState } from "react";
import Map from "@/components/DriverMap";
import styles from "./page.module.css";

export default function DriverClient() {
  const [rideRequest, setRideRequest] = useState({

    pickup: { lat: 33.8938, lng: 35.5018 },
    destination: { lat: 33.98, lng: 35.6178 },
  });

  function acceptRide() {
    console.log("Ride accepted");
    setRideRequest(null);
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
        <div className={styles.card}>
          <h3>Driver Info</h3>
          <p>Name: Omar</p>
          <p>Phone: +961 70 000 000</p>
        </div>

        <div className={styles.card}>
          <h3>Status</h3>
          <button className={styles.button}>Go Online</button>
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

            <p>Pickup: Beirut</p>
            <p>Destination: Jounieh</p>

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