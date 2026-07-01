export default function LoginIntro() {
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
