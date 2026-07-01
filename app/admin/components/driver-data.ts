const DRIVER_STORAGE_KEY = "moto-admin-drivers";

export type DriverStatus = "Available" | "On order" | "Offline";

export type Driver = {
  id: string;
  name: string;
  email: string;
  phone: string;
  zone: string;
  vehicle: string;
  plate: string;
  status: DriverStatus;
  deliveries: number;
};

const initialDrivers: Driver[] = [
  {
    id: "driver-ali",
    name: "Ali Mansour",
    email: "ali@motodelivery.com",
    phone: "+961 70 112 441",
    zone: "Beirut",
    vehicle: "Honda Wave",
    plate: "M 124530",
    status: "Available",
    deliveries: 16,
  },
  {
    id: "driver-sara",
    name: "Sara Haddad",
    email: "sara@motodelivery.com",
    phone: "+961 71 882 019",
    zone: "Jounieh",
    vehicle: "Yamaha NMAX",
    plate: "M 778201",
    status: "On order",
    deliveries: 12,
  },
  {
    id: "driver-karim",
    name: "Karim Nasser",
    email: "karim@motodelivery.com",
    phone: "+961 76 220 331",
    zone: "Hamra",
    vehicle: "Suzuki Address",
    plate: "M 334810",
    status: "Offline",
    deliveries: 7,
  },
  {
    id: "driver-mira",
    name: "Mira Saleh",
    email: "mira@motodelivery.com",
    phone: "+961 81 540 222",
    zone: "Achrafieh",
    vehicle: "Honda PCX",
    plate: "M 908114",
    status: "Available",
    deliveries: 14,
  },
];

const readDrivers = (): Driver[] => {
  if (typeof window === "undefined") {
    return initialDrivers;
  }

  const savedDrivers = localStorage.getItem(DRIVER_STORAGE_KEY);

  if (!savedDrivers) {
    return initialDrivers;
  }

  try {
    const drivers = JSON.parse(savedDrivers);

    if (Array.isArray(drivers)) {
      return drivers as Driver[];
    }
  } catch {
    return initialDrivers;
  }

  return initialDrivers;
};

const saveDrivers = (drivers: Driver[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(DRIVER_STORAGE_KEY, JSON.stringify(drivers));
  }
};

export const driverData = {
  initialDrivers,
  readDrivers,
  saveDrivers,
};
