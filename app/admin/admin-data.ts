export const DRIVER_STORAGE_KEY = "moto-admin-drivers";

export type DriverAccountStatus = "Active" | "Suspended";
export type DriverStatus = "Available" | "On order" | "Offline";

export type Driver = {
  id: string;
  name: string;
  email: string;
  accountStatus: DriverAccountStatus;
  phone: string;
  zone: string;
  vehicle: string;
  plate: string;
  status: DriverStatus;
  deliveries: number;
  rating: string;
};

export const initialDrivers: Driver[] = [
  {
    id: "driver-ali",
    name: "Ali Mansour",
    email: "ali@motodelivery.com",
    accountStatus: "Active",
    phone: "+961 70 112 441",
    zone: "Beirut",
    vehicle: "Honda Wave",
    plate: "M 124530",
    status: "Available",
    deliveries: 16,
    rating: "4.9",
  },
  {
    id: "driver-sara",
    name: "Sara Haddad",
    email: "sara@motodelivery.com",
    accountStatus: "Active",
    phone: "+961 71 882 019",
    zone: "Jounieh",
    vehicle: "Yamaha NMAX",
    plate: "M 778201",
    status: "On order",
    deliveries: 12,
    rating: "4.8",
  },
  {
    id: "driver-karim",
    name: "Karim Nasser",
    email: "karim@motodelivery.com",
    accountStatus: "Suspended",
    phone: "+961 76 220 331",
    zone: "Hamra",
    vehicle: "Suzuki Address",
    plate: "M 334810",
    status: "Offline",
    deliveries: 7,
    rating: "4.6",
  },
  {
    id: "driver-mira",
    name: "Mira Saleh",
    email: "mira@motodelivery.com",
    accountStatus: "Active",
    phone: "+961 81 540 222",
    zone: "Achrafieh",
    vehicle: "Honda PCX",
    plate: "M 908114",
    status: "Available",
    deliveries: 14,
    rating: "4.9",
  },
];

export function readDrivers() {
  return readStorage(DRIVER_STORAGE_KEY, initialDrivers).map((driver) => {
    const demoDriver = initialDrivers.find((item) => item.id === driver.id);

    return {
      ...driver,
      email: driver.email ?? demoDriver?.email ?? "driver@motodelivery.com",
      accountStatus: driver.accountStatus ?? demoDriver?.accountStatus ?? "Active",
    };
  });
}

export function saveDrivers(drivers: Driver[]) {
  saveStorage(DRIVER_STORAGE_KEY, drivers);
}

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? (JSON.parse(savedValue) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage<T>(key: string, value: T) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
