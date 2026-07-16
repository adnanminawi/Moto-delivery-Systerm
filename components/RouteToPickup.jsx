"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

export default function RouteToPickup({ driverLocation, pickup }) {
  const map = useMap();

  useEffect(() => {
    if (
      !driverLocation ||
      !driverLocation.lat ||
      !driverLocation.lng ||
      !pickup
    ) {
      return;
    }

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(driverLocation.lat, driverLocation.lng),
        L.latLng(pickup.lat, pickup.lng),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, driverLocation, pickup]);

  return null;
}