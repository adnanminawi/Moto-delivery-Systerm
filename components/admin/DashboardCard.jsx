export default function DashboardCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded shadow">
      
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-2xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
}