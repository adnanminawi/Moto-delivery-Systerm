import Link from "next/link";

export default function CreateDriverHeader() {
  return (
    <header className="mb-8">
      <Link className="text-sm font-bold text-orange-300" href="/admin/dashboard">
        Back to dashboard
      </Link>
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
        Admin only
      </p>
      <h1 className="mt-2 text-3xl font-black text-white">
        Create driver account
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Add the driver information the admin needs before the driver starts work.
      </p>
    </header>
  );
}
