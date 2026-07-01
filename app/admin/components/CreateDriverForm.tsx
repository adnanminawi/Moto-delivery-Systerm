"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useState } from "react";
import CreateDriverHeader from "./CreateDriverHeader";
import FormField from "./FormField";
import { type Driver, driverData } from "./driver-data";

export default function CreateDriverForm() {
  const [message, setMessage] = useState("");

  function handleCreateDriver(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const savedDrivers = driverData.readDrivers();

    const newDriver: Driver = {
      id: `driver-${Date.now()}`,
      name: String(formData.get("driver-name")),
      email: String(formData.get("driver-email")),
      phone: String(formData.get("driver-phone")),
      zone: String(formData.get("driver-zone")),
      vehicle: String(formData.get("driver-vehicle")),
      plate: String(formData.get("driver-plate")),
      status: "Offline",
      deliveries: 0,
    };

    driverData.saveDrivers([...savedDrivers, newDriver]);

    form.reset();
    setMessage("Driver account created in frontend storage.");
  }

  return (
    <main className="min-h-screen bg-[#101114] px-5 py-6 text-slate-100 sm:px-8">
      <section className="mx-auto max-w-3xl">
        <CreateDriverHeader />

        <form
          className="space-y-5 rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/35 backdrop-blur sm:p-8"
          onSubmit={handleCreateDriver}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              id="driver-name"
              label="Full name"
              placeholder="Driver full name"
              type="text"
            />
            <FormField
              id="driver-phone"
              label="Phone number"
              placeholder="+961 70 000 000"
              type="tel"
            />
            <FormField
              id="driver-email"
              label="Email"
              placeholder="driver@motodelivery.com"
              type="email"
            />
            <FormField
              id="driver-zone"
              label="Work zone"
              placeholder="Beirut"
              type="text"
            />
            <FormField
              id="driver-vehicle"
              label="Motorcycle model"
              placeholder="Honda Wave"
              type="text"
            />
            <FormField
              id="driver-plate"
              label="Plate number"
              placeholder="M 123456"
              type="text"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <button
              className="h-12 rounded-md bg-orange-500 px-5 text-sm font-black uppercase tracking-[0.14em] text-slate-950 shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-500/30"
              type="submit"
            >
              Create account
            </button>
            <Link
              className="grid h-12 place-items-center rounded-md border border-white/10 px-5 text-sm font-bold text-slate-200 transition hover:border-orange-400/50 hover:text-orange-200"
              href="/admin/dashboard"
            >
              Cancel
            </Link>
          </div>

          <p
            aria-live="polite"
            className="min-h-6 text-sm font-medium text-teal-200"
          >
            {message}
          </p>
        </form>
      </section>
    </main>
  );
}
