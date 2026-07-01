import type { DriverStatus } from "./driver-data";

const statusColors: Record<DriverStatus, string> = {
  Available: "bg-teal-400/10 text-teal-200",
  "On order": "bg-orange-400/10 text-orange-200",
  Offline: "bg-slate-400/10 text-slate-300",
};

type DriverStatusBadgeProps = {
  status: DriverStatus;
};

export default function DriverStatusBadge({ status }: DriverStatusBadgeProps) {
  return (
    <span className={`rounded-md px-2 py-1 text-xs font-bold ${statusColors[status]}`}>
      {status}
    </span>
  );
}
