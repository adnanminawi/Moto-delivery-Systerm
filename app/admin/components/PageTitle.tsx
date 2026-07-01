import Link from "next/link";
import { adminStyles } from "./admin-styles";

export default function PageTitle() {
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
