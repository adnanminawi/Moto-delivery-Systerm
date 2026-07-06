"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

const Map = dynamic(() => import("@/components/CustomerMap"), { ssr: false });

export default function Page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);
  console.log("pickup:", pickup, "destination:", destination);

 

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
        const res = await axios.post("/api/ride", data)
        
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
    </div>
 <div className={styles.map}>
        <Map setPickup={setPickup} setDestination={setDestination} pickup={pickup} destination={destination} />
      </div>    
      </div>    
    </>
  );
}