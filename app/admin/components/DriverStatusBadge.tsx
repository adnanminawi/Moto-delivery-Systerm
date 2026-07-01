import type { DriverStatus } from "./driver-data";

type DriverStatusBadgeProps = {
  status: DriverStatus;
};

export default function DriverStatusBadge({ status }: DriverStatusBadgeProps) {
  let statusColor = "bg-slate-400/10 text-slate-300";

  if (status === "Available") {
    statusColor = "bg-teal-400/10 text-teal-200";
  }

  if (status === "On order") {
    statusColor = "bg-orange-400/10 text-orange-200";
  }

  return (
    <span className={`rounded-md px-2 py-1 text-xs font-bold ${statusColor}`}>
      {status}
    </span>
  );
}
