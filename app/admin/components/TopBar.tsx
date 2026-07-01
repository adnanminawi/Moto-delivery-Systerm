import { adminStyles } from "./admin-styles";

export default function TopBar() {
  return (
    <header className={adminStyles.topBar}>
      <p className="text-lg font-black text-white">Moto Admin</p>
      <p className="text-sm font-semibold text-slate-400">Admin</p>
    </header>
  );
}
