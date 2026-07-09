"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await fetch("/api/drivers");
        const data = await res.json();

        console.log("API DATA:", data);

        setDrivers(Array.isArray(data?.drivers) ? data.drivers : []);

      } catch (err) {
        console.log("Error fetching drivers:", err);
        setDrivers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "text-green-600";
      case "busy":
        return "text-yellow-500";
      case "offline":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Drivers Management</h1>

        <Link
          href="/admin/drivers/create"
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          + Add Driver
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <p>Loading drivers...</p>
      ) : (
        <div className="bg-white shadow rounded overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
        
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {(drivers || []).map((driver) => (
                <tr key={driver.id} className="border-t">

                  <td className="p-3">{driver.name}</td>
                  <td className="p-3">{driver.phone}</td>
                 

                  <td className={`p-3 font-semibold ${getStatusColor(driver.status)}`}>
                    {driver.status}
                  </td>

                  <td className="p-3 flex gap-2">

                  <Link
  href={`/admin/dashboard/drivers/${driver.id}`}
  className="px-3 py-1 bg-green-500 text-white rounded"
>
  View
</Link>

                   

                    <button className="px-3 py-1 bg-red-500 text-white rounded">
                      Delete
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}