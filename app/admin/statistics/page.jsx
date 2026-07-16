"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/admin/StatCard";
import RideChart from "@/components/admin/RideChart";
import DriverChart from "@/components/admin/DriverChart";

export default function StatisticsPage() {
  const [stats, setStats] = useState({});
  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const res = await fetch("/api/admin");
      const data = await res.json();

      setStats({
        drivers: data.total_drivers || 0,
        customers: data.total_customers || 0,
        rides: data.total_rides || 0,

        // normalize old + new statuses
        completed: data.completed_rides || 0,
        pending: data.pending_rides || 0,
        cancelled: data.cancelled_rides || 0,

        online: data.online || 0,
        offline: data.offline||0,
        bust: data.busy||0,


      });
    } catch (err) {
      console.log("Error loading stats:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        📊 Statistics Dashboard
      </h1>

      {/* STATS CARDS */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

        <StatCard
          title="Customers"
          value={stats.customers}
          icon="👥"
          color="bg-blue-500"
        />

        <StatCard
          title="Drivers"
          value={stats.drivers}
          icon="🚗"
          color="bg-green-500"
        />

        <StatCard
          title="Total Rides"
          value={stats.rides}
          icon="🛵"
          color="bg-purple-500"
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          icon="✅"
          color="bg-emerald-500"
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          icon="🟡"
          color="bg-yellow-500"
        />

        <StatCard
          title="Cancelled"
          value={stats.cancelled}
          icon="❌"
          color="bg-red-500"
        />

      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-8 mt-12">

        <RideChart
          completed={stats.completed}
          searching={stats.pending}
          cancelled={stats.cancelled}
        />

        <DriverChart
          online={stats.online}
          busy={stats.busy}
          offline={stats.offline}
        />

      </div>

    </div>
  );
}