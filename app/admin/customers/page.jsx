"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
  try {
    const res = await fetch("/api/customer");
    const data = await res.json();

    console.log(data);

    if (!res.ok) {
      throw new Error(data.error || "Failed");
    }

    setCustomers(data.customers);  
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

    fetchCustomers();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Customers
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white shadow rounded p-4">

          <table className="w-full">

            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Phone</th>
               
              </tr>
            </thead>

            <tbody>

              {customers.map((c) => (
                <tr key={c.id} className="border-b">

                  <td className="p-2">{c.name}</td>
                  <td className="p-2">{c.phone}</td>

                

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}