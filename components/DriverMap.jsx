"use client"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMapEvents, Marker    } from "react-leaflet";
import { useEffect, useState } from "react";
import RouteToPickup from "./RouteToPickup";

export default function DriverMap({driverLocation, pickup}) {
    
    return(

        <div>
            <MapContainer center={[33.8938, 35.5018]} zoom={10} style={{height : "500px"}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <RouteToPickup
            driverLocation={driverLocation}
            pickup={pickup}
            /> 
            </MapContainer>
        </div>
    )
}