import Link from "next/link";
import { adminStyles } from "./admin-styles";
import MenuGroup from "./MenuGroup";

export default function Sidebar() {
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
