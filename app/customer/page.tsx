"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

const Map = dynamic(() => import("@/components/CustomerMap"), { ssr: false });

export default function Page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);
  const [rideId, setRideId] = useState();
  const [driverLocation, setDriverLocation] = useState<{ current_lat: number; current_lng: number } | null>(null);
  const [noDriver, setNoDriver] = useState(false);
 console.log("pickup:", pickup, "destination:", destination);


 
 useEffect(()=>{
  if (!rideId) return;
  const fetchLocation= async()=>{
    const res = await fetch(`/api/ride/${rideId}/location`);
    const data = await res.json();
    console.log("driver location:", data.location); 
    setDriverLocation(data.location);
  };
  fetchLocation();                       
  const interval = setInterval(fetchLocation, 10000);
  return () => clearInterval(interval);  
}, [rideId]);


  function handleSubmit() {
    if (!pickup || !destination) return;
    
    
    const data={
    name : name,
    phone : phone,
    pickup_lat : pickup.lat,
    pickup_lng :pickup.lng,
    destination_lat: destination.lat,
    destination_lng :destination.lng,
  }
    const fetchInfo = async ()=>{
      try{
        const res = await fetch("/api/ride", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),});

      const result = await res.json();
      setRideId(result.rideId);
      if (result.assignedDriver === null) {
      setNoDriver(true);      
      } else {
      setNoDriver(false);
}
      }catch(error){
        console.log(error);
      }
  };
  fetchInfo();
    console.log(name, phone);
  }
  function reset(){
    setPickup(null);
    setDestination(null);
    setDriverLocation(null);
    setNoDriver(false);
  }
  

  return (
    <>
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.card}>
       <h3>Book a Ride</h3>

      <div className={styles.form}>
        <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input className={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
      </div>
 </div>
  <div className={styles.card}>
 <h3>Trip</h3>
          <p>Pickup: {pickup ? "Selected" : "Click on map"}</p>
          <p>Destination: {destination ? "Selected" : "Click on map"}</p>
          
        </div>

      <button className={styles.button} onClick={handleSubmit}>Request Ride</button>
      <button className={styles.resetButton} onClick={reset}>reset</button>
      {noDriver && <p style={{ color: "red" }}>No driver available, please try again.</p>}
    </div>
 <div className={styles.map}>
        <Map setPickup={setPickup} setDestination={setDestination} pickup={pickup} destination={destination}  driverLocation={
    driverLocation
      ? { lat: Number(driverLocation.current_lat), lng: Number(driverLocation.current_lng) }
      : null
  } />
      </div>    
      </div>    
    </>
  );
}