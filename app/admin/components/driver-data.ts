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

type SavedDriver = Partial<Driver>;

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

const readDrivers = () => {
  return readStorage<SavedDriver[]>(DRIVER_STORAGE_KEY, initialDrivers).map(
    (driver, index) => {
      const demoDriver = initialDrivers.find((item) => item.id === driver.id);

      return {
        id: driver.id ?? demoDriver?.id ?? `driver-${index}`,
        name: driver.name ?? demoDriver?.name ?? "New Driver",
        email: driver.email ?? demoDriver?.email ?? "driver@motodelivery.com",
        phone: driver.phone ?? demoDriver?.phone ?? "+961 70 000 000",
        zone: driver.zone ?? demoDriver?.zone ?? "Beirut",
        vehicle: driver.vehicle ?? demoDriver?.vehicle ?? "Motorcycle",
        plate: driver.plate ?? demoDriver?.plate ?? "M 000000",
        status: driver.status ?? demoDriver?.status ?? "Offline",
        deliveries: driver.deliveries ?? demoDriver?.deliveries ?? 0,
      };
    },
  );
};

const saveDrivers = (drivers: Driver[]) => {
  saveStorage(DRIVER_STORAGE_KEY, drivers);
};

export const driverData = {
  initialDrivers,
  readDrivers,
  saveDrivers,
};

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
