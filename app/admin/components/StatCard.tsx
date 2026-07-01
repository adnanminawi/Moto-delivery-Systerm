type StatCardProps = {
  color: string;
  label: string;
  value: number;
};

export default function StatCard({ color, label, value }: StatCardProps) {
  return (
    <div className={`overflow-hidden rounded-lg text-white shadow-xl ${color}`}>
      <div className="p-5">
        <p className="text-lg font-black">{label}</p>
        <p className="mt-2 text-3xl font-black text-white/95">{value}</p>
      </div>
    </div>
  );
}
