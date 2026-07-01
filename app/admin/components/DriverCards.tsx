import type { Driver } from "./driver-data";
import DriverStatusBadge from "./DriverStatusBadge";
import Panel from "./Panel";

type DriverCardsProps = {
  drivers: Driver[];
};

export default function DriverCards({ drivers }: DriverCardsProps) {
  return (
    <Panel title="Driver Accounts">
      <div className="grid gap-3 lg:grid-cols-2">
        {drivers.map((driver) => (
          <article className="rounded-md bg-slate-950/50 p-4" key={driver.id}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-black text-white">{driver.name}</p>
                <p className="text-sm text-slate-400">{driver.email}</p>
                <p className="text-sm text-slate-400">{driver.phone}</p>
              </div>

              <DriverStatusBadge status={driver.status} />
            </div>

            <p className="mt-3 text-sm text-slate-400">
              {driver.zone} / {driver.vehicle} / {driver.plate}
            </p>
          </article>
        ))}
      </div>
    </Panel>
  );
}
