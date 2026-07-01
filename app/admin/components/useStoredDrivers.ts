"use client";

import { useEffect, useState } from "react";
import { type Driver, driverData } from "./driver-data";

export default function useStoredDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>(driverData.initialDrivers);

  useEffect(() => {
    // Load browser storage after the first render to avoid a Next.js hydration warning.
    const loadSavedDrivers = window.setTimeout(() => {
      setDrivers(driverData.readDrivers());
    }, 0);

    return () => window.clearTimeout(loadSavedDrivers);
  }, []);

  return drivers;
}
