"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "./page.module.css";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit() {
    console.log(name, phone);
  }

  return (
    <>
    <div className={styles.container}>
      <h1 className={styles.title}>Book a Ride</h1>

      <div className={styles.form}>
        <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input className={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
      </div>

      <button className={styles.button} onClick={handleSubmit}>Request Ride</button>
    </div>
 <div className={styles.mapWrapper}>
        <Map />
      </div>    
    </>
  );
}