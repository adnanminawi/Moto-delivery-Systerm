"use client";

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const styles = {
  page:
    "grid min-h-screen place-items-center bg-[#101114] px-5 py-8 text-slate-100",
  container: "w-full max-w-md",
  logo:
    "grid h-12 w-12 place-items-center rounded-md bg-orange-500 font-black text-slate-950 shadow-lg shadow-orange-500/25",
  card:
    "rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/35 backdrop-blur sm:p-8",
  badge:
    "mb-3 inline-flex rounded-md border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-orange-200",
  label: "block text-sm font-semibold text-slate-200",
  input:
    "h-12 w-full rounded-md border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/15",
  showPasswordButton:
    "rounded-md px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-orange-300 transition hover:bg-orange-400/10",
  checkbox:
    "h-4 w-4 rounded border-white/20 bg-slate-950 text-orange-500 focus:ring-orange-500",
  submitButton:
    "h-12 w-full rounded-md bg-orange-500 px-5 text-sm font-black uppercase tracking-[0.14em] text-slate-950 shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-500/30",
};

function BrandHeader() {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className={styles.logo}>MD</div>

      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
          Moto Delivery System
        </p>
        <p className="text-sm text-slate-400">Admin access</p>
      </div>
    </div>
  );
}

function LoginIntro() {
  return (
    <div className="mb-7">
      <p className={styles.badge}>Admin only</p>
      <h1 className="text-3xl font-black tracking-tight text-white">Login</h1>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Access the admin panel to manage driver accounts.
      </p>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("Opening admin dashboard...");
    router.push("/admin/dashboard");
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <BrandHeader />

        <div className={styles.card}>
          <LoginIntro />

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className={`${styles.label} mb-2`} htmlFor="admin-email">
                Admin email
              </label>
              <input
                className={styles.input}
                id="admin-email"
                name="email"
                placeholder="admin@motodelivery.com"
                required
                type="email"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className={styles.label} htmlFor="admin-password">
                  Password
                </label>
                <button
                  className={styles.showPasswordButton}
                  onClick={togglePasswordVisibility}
                  type="button"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <input
                className={styles.input}
                id="admin-password"
                name="password"
                placeholder="Enter admin password"
                required
                type={showPassword ? "text" : "password"}
              />
            </div>

            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input className={styles.checkbox} type="checkbox" />
              Remember this admin device
            </label>

            <button className={styles.submitButton} type="submit">
              Sign in
            </button>

            <p
              aria-live="polite"
              className="min-h-6 text-sm font-medium text-teal-200"
            >
              {message}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
