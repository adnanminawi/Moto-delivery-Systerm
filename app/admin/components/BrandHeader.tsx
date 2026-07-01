export default function BrandHeader() {
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
