"use client";

import DriverCards from "./DriverCards";
import DriverTable from "./DriverTable";
import PageTitle from "./PageTitle";
import Sidebar from "./Sidebar";
import StatCard from "./StatCard";
import TopBar from "./TopBar";
import { adminStyles } from "./admin-styles";
import useStoredDrivers from "./useStoredDrivers";

export default function AdminDashboard() {
  const drivers = useStoredDrivers();
  const availableDrivers = drivers.filter(
    (driver) => driver.status === "Available",
  ).length;
  const busyDrivers = drivers.filter((driver) => driver.status === "On order").length;

  return (
    <main className={adminStyles.page}>
      <TopBar />

      <div className="md:grid md:grid-cols-[15rem_1fr]">
        <Sidebar />

        <section className={adminStyles.content}>
          <PageTitle />

          <section className="mb-6 grid gap-5 md:grid-cols-3">
            <StatCard
              color="bg-orange-500"
              label="Total Drivers"
              value={drivers.length}
            />
            <StatCard
              color="bg-teal-600"
              label="Available Drivers"
              value={availableDrivers}
            />
            <StatCard
              color="bg-sky-700"
              label="On Order"
              value={busyDrivers}
            />
          </section>

          <DriverCards drivers={drivers} />
          <DriverTable drivers={drivers} />
        </section>
      </div>
    </main>
  );
}
