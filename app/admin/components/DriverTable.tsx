import type { Driver } from "./driver-data";
import DriverStatusBadge from "./DriverStatusBadge";
import Panel from "./Panel";

type DriverTableProps = {
  drivers: Driver[];
};

export default function DriverTable({ drivers }: DriverTableProps) {
  return (
    <Panel title="Driver Details">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead className="bg-slate-950/70 text-xs uppercase tracking-[0.14em] text-slate-400">
            <tr>
              <th className="px-4 py-3">Driver</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Zone</th>
              <th className="px-4 py-3">Motorcycle</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Deliveries</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr className="border-t border-white/10" key={driver.id}>
                <td className="px-4 py-4 font-bold text-white">
                  {driver.name}
                  <span className="block text-xs font-normal text-slate-500">
                    {driver.email}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-300">{driver.phone}</td>
                <td className="px-4 py-4 text-slate-300">{driver.zone}</td>
                <td className="px-4 py-4 text-slate-300">
                  {driver.vehicle}
                  <span className="block text-xs text-slate-500">{driver.plate}</span>
                </td>
                <td className="px-4 py-4">
                  <DriverStatusBadge status={driver.status} />
                </td>
                <td className="px-4 py-4 text-slate-300">{driver.deliveries}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
