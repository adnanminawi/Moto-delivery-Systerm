"use client";

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SAVED_ADMIN_EMAIL_KEY = "moto-admin-email";

function BrandHeader() {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="grid h-12 w-12 place-items-center rounded-md bg-orange-500 font-black text-slate-950 shadow-lg shadow-orange-500/25">
        MD
      </div>

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
      <p className="mb-3 inline-flex rounded-md border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-orange-200">
        Admin only
      </p>
      <h1 className="text-3xl font-black tracking-tight text-white">Login</h1>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Access the admin panel to manage driver accounts.
      </p>
    </div>
  );
}

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadRememberedEmail = window.setTimeout(() => {
      const savedEmail = readRememberedEmail();

      if (savedEmail) {
        setEmail(savedEmail);
        setRememberDevice(true);
      }
    }, 0);

    return () => window.clearTimeout(loadRememberedEmail);
  }, []);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    saveRememberedEmail(email, rememberDevice);
    setMessage("Opening admin dashboard...");
    router.push("/admin/dashboard");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#101114] px-5 py-8 text-slate-100">
      <section className="w-full max-w-md">
        <BrandHeader />

        <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/35 backdrop-blur sm:p-8">
          <LoginIntro />

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-slate-200"
                htmlFor="admin-email"
              >
                Admin email
              </label>
              <input
                className="h-12 w-full rounded-md border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/15"
                id="admin-email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@motodelivery.com"
                required
                type="email"
                value={email}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  className="block text-sm font-semibold text-slate-200"
                  htmlFor="admin-password"
                >
                  Password
                </label>
                <button
                  className="rounded-md px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-orange-300 transition hover:bg-orange-400/10"
                  onClick={() => setShowPassword((currentValue) => !currentValue)}
                  type="button"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <input
                className="h-12 w-full rounded-md border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/15"
                id="admin-password"
                name="password"
                placeholder="Enter admin password"
                required
                type={showPassword ? "text" : "password"}
              />
            </div>

            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                className="h-4 w-4 rounded border-white/20 bg-slate-950 text-orange-500 focus:ring-orange-500"
                checked={rememberDevice}
                onChange={(event) => setRememberDevice(event.target.checked)}
                type="checkbox"
              />
              Remember this admin device
            </label>

            <button
              className="h-12 w-full rounded-md bg-orange-500 px-5 text-sm font-black uppercase tracking-[0.14em] text-slate-950 shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-500/30"
              type="submit"
            >
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

function readRememberedEmail() {
  try {
    return localStorage.getItem(SAVED_ADMIN_EMAIL_KEY) ?? "";
  } catch {
    return "";
  }
}

function saveRememberedEmail(email: string, rememberDevice: boolean) {
  try {
    if (rememberDevice) {
      localStorage.setItem(SAVED_ADMIN_EMAIL_KEY, email);
      return;
    }

    localStorage.removeItem(SAVED_ADMIN_EMAIL_KEY);
  } catch {
    // Local storage can be blocked by the browser. Login still works without it.
  }
}
