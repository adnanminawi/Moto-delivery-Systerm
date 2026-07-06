"use client"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMapEvents, Marker    } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";


// there is error in the Marker its not showing the marker icon so this will fix it
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [20, 35],
  iconAnchor: [7, 25],
});

// check the lat and lng in the console tab
   function ClickHandler({ pickup,destination, setPickup, setDestination }){
        useMapEvents({
    click: (e) => {
        console.log("clicked:", e.latlng);
      if (!pickup) {
        setPickup(e.latlng);
      } else if (!destination) {
      setDestination(e.latlng);
      }
    },
  });
  return null;
}  

export default function CustomerMap({ pickup, destination, setPickup, setDestination }) {
    
    

 

  
    return(

        <div>
            <MapContainer center={[33.8938, 35.5018]} zoom={10} style={{height : "500px"}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ClickHandler pickup={pickup} destination={destination} setPickup={setPickup} setDestination={setDestination}/>
            {pickup && <Marker position={pickup} icon={icon} />}
            {destination && <Marker position={destination} icon={icon} />}
            </MapContainer>
        </div>
    )
}