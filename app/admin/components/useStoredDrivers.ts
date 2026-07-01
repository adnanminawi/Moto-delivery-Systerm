"use client";

import { useEffect, useState } from "react";
import { type Driver, driverData } from "./driver-data";

export default function useStoredDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>(driverData.initialDrivers);

  useEffect(() => {
    const loadSavedDrivers = window.setTimeout(() => {
      setDrivers(driverData.readDrivers());
    }, 0);

    return () => window.clearTimeout(loadSavedDrivers);
  }, []);

  return drivers;
}
