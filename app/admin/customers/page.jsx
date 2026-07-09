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
    <div className="min-h-screen bg-white p-6">


      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-900">
          Customers
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Manage all registered customers
        </p>

      </div>



      {loading ? (

        <p className="text-gray-500">
          Loading...
        </p>

      ) : (


        <div className="
          bg-white
          border
          border-yellow-300
          shadow-md
          rounded-xl
          p-5
          overflow-x-auto
        ">


          <table className="w-full bg-white">


            <thead>

              <tr className="border-b">


                <th className="
                  p-3
                  text-left
                  text-gray-800
                  font-semibold
                ">
                  Name
                </th>


                <th className="
                  p-3
                  text-left
                  text-gray-800
                  font-semibold
                ">
                  Phone
                </th>


                <th className="
                  p-3
                  text-left
                  text-gray-800
                  font-semibold
                ">
                  Action
                </th>


              </tr>

            </thead>



            <tbody className="bg-white">


              {customers.map((c) => (

                <tr
                  key={c.id}
                  className="
                    border-b
                    bg-white
                    hover:bg-gray-50
                    transition
                  "
                >


                  <td className="p-3 text-gray-700">
                    {c.name}
                  </td>


                  <td className="p-3 text-gray-700">
                    {c.phone}
                  </td>


                  <td className="p-3">

                    <Link
                      href={`/admin/dashboard/customer/${c.id}`}
                      className="
                        bg-yellow-400
                        hover:bg-yellow-500
                        text-black
                        font-semibold
                        px-4
                        py-2
                        rounded-lg
                        text-sm
                        transition
                      "
                    >
                      View
                    </Link>

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