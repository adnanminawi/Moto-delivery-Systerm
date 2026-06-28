"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { adminStyles } from "./admin-styles";
import { type Driver, type DriverStatus, driverData } from "./driver-data";

const driverStatusColors = {
  Available: "bg-teal-400/10 text-teal-200",
  "On order": "bg-orange-400/10 text-orange-200",
  Offline: "bg-slate-400/10 text-slate-300",
};

function useStoredDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>(driverData.initialDrivers);

  useEffect(() => {
    const loadSavedDrivers = window.setTimeout(() => {
      setDrivers(driverData.readDrivers());
    }, 0);

    return () => window.clearTimeout(loadSavedDrivers);
  }, []);

  return drivers;
}

function TopBar() {
  return (
    <header className={adminStyles.topBar}>
      <p className="text-lg font-black text-white">Moto Admin</p>
      <p className="text-sm font-semibold text-slate-400">Admin</p>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className={adminStyles.sideBar}>
      <MenuGroup title="Core">
        <Link className={adminStyles.darkButton} href="/admin/dashboard">
          Dashboard
        </Link>
      </MenuGroup>

      <MenuGroup title="Drivers">
        <Link className={adminStyles.darkButton} href="/admin/drivers/new">
          Create driver account
        </Link>
      </MenuGroup>

      <div className="mt-8 rounded-md border border-white/10 bg-slate-950/50 p-3 text-sm text-slate-400">
        <p>Logged in as:</p>
        <p className="mt-1 font-bold text-orange-200">Moto Admin</p>
      </div>
    </aside>
  );
}

function MenuGroup({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="mb-6">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        {title}
      </p>
      <div className="grid gap-2">{children}</div>
    </div>
  );
}

function PageTitle() {
  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-black tracking-tight text-white">
          Admin Dashboard
        </h1>
        <Link className={adminStyles.orangeButton} href="/admin/drivers/new">
          Create driver account
        </Link>
      </div>

      <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-400">
        Driver account management
      </div>
    </div>
  );
}

function StatCard({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: number;
}) {
  return (
    <div className={`overflow-hidden rounded-lg text-white shadow-xl ${color}`}>
      <div className="p-5">
        <p className="text-lg font-black">{label}</p>
        <p className="mt-2 text-3xl font-black text-white/95">{value}</p>
      </div>
    </div>
  );
}

function Panel({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className={`${adminStyles.card} mb-6`}>
      <h2 className={adminStyles.cardTitle}>{title}</h2>
      <div className="p-5">{children}</div>
    </section>
  );
}

function DriverCards({ drivers }: { drivers: Driver[] }) {
  return (
    <Panel title="Driver Accounts">
      <div className="grid gap-3 lg:grid-cols-2">
        {drivers.map((driver) => (
          <article className="rounded-md bg-slate-950/50 p-4" key={driver.id}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-black text-white">{driver.name}</p>
                <p className="text-sm text-slate-400">{driver.email}</p>
                <p className="text-sm text-slate-400">{driver.phone}</p>
              </div>

              <DriverStatusBadge status={driver.status} />
            </div>

            <p className="mt-3 text-sm text-slate-400">
              {driver.zone} / {driver.vehicle} / {driver.plate}
            </p>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function DriverTable({ drivers }: { drivers: Driver[] }) {
  return (
    <Panel title="Driver Details">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead className="bg-slate-950/70 text-xs uppercase tracking-[0.14em] text-slate-400">
            <tr>
              <th className="px-4 py-3">Driver</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Zone</th>
              <th className="px-4 py-3">Motorcycle</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Deliveries</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr className="border-t border-white/10" key={driver.id}>
                <td className="px-4 py-4 font-bold text-white">
                  {driver.name}
                  <span className="block text-xs font-normal text-slate-500">
                    {driver.email}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-300">{driver.phone}</td>
                <td className="px-4 py-4 text-slate-300">{driver.zone}</td>
                <td className="px-4 py-4 text-slate-300">
                  {driver.vehicle}
                  <span className="block text-xs text-slate-500">{driver.plate}</span>
                </td>
                <td className="px-4 py-4">
                  <DriverStatusBadge status={driver.status} />
                </td>
                <td className="px-4 py-4 text-slate-300">{driver.deliveries}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function DriverStatusBadge({ status }: { status: DriverStatus }) {
  return (
    <span
      className={`rounded-md px-2 py-1 text-xs font-bold ${driverStatusColors[status]}`}
    >
      {status}
    </span>
  );
}

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
