import DriverClient from "./DriverClient";

export default function DriverPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#222] flex flex-col font-sans">
      <header className="h-[60px] flex items-center px-5 font-semibold text-lg tracking-wide bg-white border-b-[3px] border-[#f4c542]">
        Moto Delivery System
      </header>

      <DriverClient />
    </div>
  );
}