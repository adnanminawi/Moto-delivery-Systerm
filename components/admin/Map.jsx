"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";


// Fix Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});



// Move map to show all drivers
function FitDrivers({ drivers }) {

  const map = useMap();


  useEffect(() => {

    if (drivers.length > 0) {

      const bounds = drivers.map((driver) => [

        Number(driver.current_lat),
        Number(driver.current_lng)

      ]);


      map.fitBounds(bounds, {
        padding: [40, 40],
      });

    }

  }, [drivers, map]);


  return null;
}



export default function Map() {


  const [drivers, setDrivers] = useState([]);



  async function fetchDrivers() {

    try {

      const res = await fetch(
        "/api/admin/online-drivers"
      );


      const data = await res.json();


      console.log(
        "Online Drivers:",
        data.drivers
      );


      setDrivers(data.drivers || []);


    } catch(error) {

      console.error(
        "Failed loading drivers:",
        error
      );

    }

  }



  useEffect(() => {


    fetchDrivers();


    const timer = setInterval(() => {

      fetchDrivers();

    },3000);



    return () => clearInterval(timer);


  },[]);




  return (

    <MapContainer

      center={[
        33.8938,
        35.5018
      ]}

      zoom={10}

      style={{
        height:"100%",
        width:"100%"
      }}

    >


      <FitDrivers drivers={drivers}/>



      <TileLayer

        attribution="&copy; OpenStreetMap contributors"

        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

      />



      {
        drivers.map((driver)=>(


          <Marker

            key={driver.id}

            position={[
              Number(driver.current_lat),
              Number(driver.current_lng)
            ]}

          >


            <Popup>


              <div className="text-center">


                <h3 className="font-bold text-lg">
                  {driver.name}
                </h3>



                <p>
                  Status:
                  <span className="text-green-600 ml-1 font-semibold">
                    {driver.status}
                  </span>
                </p>



                <p className="text-xs text-gray-500">
                  Latitude: {driver.current_lat}
                </p>



                <p className="text-xs text-gray-500">
                  Longitude: {driver.current_lng}
                </p>


              </div>


            </Popup>


          </Marker>


        ))
      }



    </MapContainer>

  );
}