"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  type Driver,
  type DriverAccountStatus,
  type DriverStatus,
  initialDrivers,
  readDrivers,
  saveDrivers,
} from "../admin-data";

type AccountFilter = "All" | DriverAccountStatus;

const accountFilters: AccountFilter[] = ["All", "Active", "Suspended"];

const styles = {
  page: "min-h-screen bg-[#101114] text-slate-100",
  topBar:
    "flex h-16 items-center justify-between border-b border-white/10 bg-[#171a20] px-4 md:px-6",
  sideBar:
    "border-b border-white/10 bg-[#1b2027] p-4 md:min-h-[calc(100vh-4rem)] md:border-b-0 md:border-r",
  content: "p-5 md:p-6",
  card:
    "overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] shadow-xl shadow-black/20",
  cardTitle:
    "border-b border-white/10 bg-white/[0.04] px-5 py-3 font-bold text-white",
  input:
    "rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-orange-400",
  orangeButton:
    "rounded-md bg-orange-500 px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-slate-950 shadow-lg shadow-orange-500/20 transition hover:bg-orange-400",
  darkButton:
    "rounded-md border border-white/10 px-3 py-2 text-sm font-bold text-slate-200 transition hover:border-orange-400/50 hover:text-orange-200",
};

const accountColors = {
  Active: "bg-teal-400/10 text-teal-200",
  Suspended: "bg-red-400/10 text-red-200",
};

const driverStatusColors = {
  Available: "bg-teal-400/10 text-teal-200",
  "On order": "bg-orange-400/10 text-orange-200",
  Offline: "bg-slate-400/10 text-slate-300",
};

function useStoredDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);

  useEffect(() => {
    const loadSavedDrivers = window.setTimeout(() => {
      setDrivers(readDrivers());
    }, 0);

    return () => window.clearTimeout(loadSavedDrivers);
  }, []);

  return [drivers, setDrivers] as const;
}

export default function AdminDashboardPage() {
  const [drivers, setDrivers] = useStoredDrivers();
  const [search, setSearch] = useState("");
  const [accountFilter, setAccountFilter] = useState<AccountFilter>("All");
  const [message, setMessage] = useState("Driver account management");

  const visibleDrivers = useMemo(() => {
    const searchText = search.toLowerCase();

    return drivers.filter((driver) => {
      const matchesAccount =
        accountFilter === "All" || driver.accountStatus === accountFilter;
      const matchesSearch = [
        driver.name,
        driver.email,
        driver.phone,
        driver.zone,
        driver.vehicle,
        driver.plate,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchText);

      return matchesAccount && matchesSearch;
    });
  }, [accountFilter, drivers, search]);

  const stats = [
    {
      color: "bg-orange-500",
      label: "Total Drivers",
      value: drivers.length,
      filter: "All" as AccountFilter,
    },
    {
      color: "bg-teal-600",
      label: "Active Accounts",
      value: countDrivers("Active"),
      filter: "Active" as AccountFilter,
    },
    {
      color: "bg-red-600",
      label: "Suspended",
      value: countDrivers("Suspended"),
      filter: "Suspended" as AccountFilter,
    },
  ];

  function countDrivers(accountStatus: DriverAccountStatus) {
    return drivers.filter((driver) => driver.accountStatus === accountStatus).length;
  }

  function showDrivers(filter: AccountFilter) {
    setAccountFilter(filter);
    setMessage(filter === "All" ? "Showing all drivers" : `Showing ${filter} drivers`);
  }

  function updateDriverAccount(driverId: string, accountStatus: DriverAccountStatus) {
    const nextDrivers = drivers.map((driver) =>
      driver.id === driverId ? { ...driver, accountStatus } : driver,
    );

    setDrivers(nextDrivers);
    saveDrivers(nextDrivers);
    setMessage(`Driver account changed to ${accountStatus}`);
  }

  function resetDemoData() {
    setDrivers(initialDrivers);
    saveDrivers(initialDrivers);
    setSearch("");
    setAccountFilter("All");
    setMessage("Demo driver data has been reset");
  }

  return (
    <main className={styles.page}>
      <TopBar search={search} setSearch={setSearch} />

      <div className="md:grid md:grid-cols-[15rem_1fr]">
        <Sidebar resetDemoData={resetDemoData} showDrivers={showDrivers} />

        <section className={styles.content}>
          <PageTitle message={message} />

          <section className="mb-6 grid gap-5 md:grid-cols-3">
            {stats.map((stat) => (
              <button
                className={`overflow-hidden rounded-lg text-left text-white shadow-xl ${stat.color}`}
                key={stat.label}
                onClick={() => showDrivers(stat.filter)}
                type="button"
              >
                <div className="p-5">
                  <p className="text-lg font-black">{stat.label}</p>
                  <p className="mt-2 text-3xl font-black text-white/95">
                    {stat.value}
                  </p>
                </div>
                <p className="bg-black/12 px-5 py-3 text-sm font-bold">
                  Filter drivers &gt;
                </p>
              </button>
            ))}
          </section>

          <DriverAccounts
            accountFilter={accountFilter}
            drivers={visibleDrivers}
            search={search}
            setAccountFilter={setAccountFilter}
            setSearch={setSearch}
            updateDriverAccount={updateDriverAccount}
          />

          <DriverTable drivers={visibleDrivers} />
        </section>
      </div>
    </main>
  );
}

function TopBar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <header className={styles.topBar}>
      <p className="text-lg font-black text-white">Moto Admin</p>

      <div className="hidden items-center gap-3 sm:flex">
        <input
          className={`${styles.input} h-10 w-64`}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search drivers..."
          type="search"
          value={search}
        />
        <p className="text-sm font-semibold text-slate-400">Admin</p>
      </div>
    </header>
  );
}

function Sidebar({
  resetDemoData,
  showDrivers,
}: {
  resetDemoData: () => void;
  showDrivers: (filter: AccountFilter) => void;
}) {
  return (
    <aside className={styles.sideBar}>
      <MenuGroup title="Core">
        <button className={styles.darkButton} onClick={() => showDrivers("All")} type="button">
          Dashboard
        </button>
      </MenuGroup>

      <MenuGroup title="Drivers">
        <Link className={styles.darkButton} href="/admin/drivers/new">
          Create driver account
        </Link>
        <button
          className={styles.darkButton}
          onClick={() => showDrivers("Active")}
          type="button"
        >
          Active accounts
        </button>
        <button
          className={styles.darkButton}
          onClick={() => showDrivers("Suspended")}
          type="button"
        >
          Suspended accounts
        </button>
      </MenuGroup>

      <MenuGroup title="Demo">
        <button className={styles.darkButton} onClick={resetDemoData} type="button">
          Reset demo data
        </button>
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

function PageTitle({ message }: { message: string }) {
  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-black tracking-tight text-white">
          Admin Dashboard
        </h1>
        <Link className={styles.orangeButton} href="/admin/drivers/new">
          Create driver account
        </Link>
      </div>

      <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-400">
        {message}
      </div>
    </div>
  );
}

function Panel({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className={`${styles.card} mb-6`}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <div className="p-5">{children}</div>
    </section>
  );
}

function DriverAccounts({
  accountFilter,
  drivers,
  search,
  setAccountFilter,
  setSearch,
  updateDriverAccount,
}: {
  accountFilter: AccountFilter;
  drivers: Driver[];
  search: string;
  setAccountFilter: (value: AccountFilter) => void;
  setSearch: (value: string) => void;
  updateDriverAccount: (
    driverId: string,
    accountStatus: DriverAccountStatus,
  ) => void;
}) {
  return (
    <Panel title="Driver Accounts">
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <input
          className={styles.input}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search name, email, phone..."
          value={search}
        />

        <select
          className={styles.input}
          onChange={(event) => setAccountFilter(event.target.value as AccountFilter)}
          value={accountFilter}
        >
          {accountFilters.map((filter) => (
            <option key={filter}>{filter}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {drivers.length === 0 ? (
          <p className="text-sm text-slate-400">No drivers match your filters.</p>
        ) : (
          drivers.map((driver) => (
            <article className="rounded-md bg-slate-950/50 p-4" key={driver.id}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-black text-white">{driver.name}</p>
                  <p className="text-sm text-slate-400">{driver.email}</p>
                  <p className="text-sm text-slate-400">{driver.phone}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <AccountBadge status={driver.accountStatus} />
                  <DriverStatusBadge status={driver.status} />
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-400">
                {driver.zone} / {driver.vehicle} / {driver.plate}
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <button
                  className={styles.darkButton}
                  onClick={() => updateDriverAccount(driver.id, "Active")}
                  type="button"
                >
                  Activate account
                </button>
                <button
                  className={styles.darkButton}
                  onClick={() => updateDriverAccount(driver.id, "Suspended")}
                  type="button"
                >
                  Suspend account
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </Panel>
  );
}

function DriverTable({ drivers }: { drivers: Driver[] }) {
  return (
    <Panel title="Driver Details">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-slate-950/70 text-xs uppercase tracking-[0.14em] text-slate-400">
            <tr>
              <th className="px-4 py-3">Driver</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Zone</th>
              <th className="px-4 py-3">Motorcycle</th>
              <th className="px-4 py-3">Account</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Deliveries</th>
              <th className="px-4 py-3">Rating</th>
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
                  <AccountBadge status={driver.accountStatus} />
                </td>
                <td className="px-4 py-4">
                  <DriverStatusBadge status={driver.status} />
                </td>
                <td className="px-4 py-4 text-slate-300">{driver.deliveries}</td>
                <td className="px-4 py-4 text-slate-300">{driver.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {drivers.length === 0 && (
          <p className="border-t border-white/10 px-4 py-5 text-sm text-slate-400">
            No drivers to show.
          </p>
        )}
      </div>
    </Panel>
  );
}

function AccountBadge({ status }: { status: DriverAccountStatus }) {
  return (
    <span className={`rounded-md px-2 py-1 text-xs font-bold ${accountColors[status]}`}>
      {status}
    </span>
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
