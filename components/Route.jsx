"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

export default function RouteToPickup({pickup,driverLocation }) {
  const map = useMap();

  useEffect(() => {
    if ( 
      !driverLocation ||
      !driverLocation.lat ||
      !driverLocation.lng ||
      !pickup
      ) 
    {
      return;
    }

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(pickup.lat, pickup.lng),
        L.latLng(driverLocation.lat, driverLocation.lng),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      createMarker: () => null,
    }).addTo(map);

  return () => {
      if (map && routingControl) {
        try {
          map.removeControl(routingControl);
        } catch (e) {
          // ignore async cleanup race
        }
      }
    };
  }, [map, driverLocation, pickup]);
return null;}