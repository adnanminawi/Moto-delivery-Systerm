"use client";

import { useState } from "react";

export default function CreateDriver() {
  const [driver, setDriver] = useState({
    name: "",
    phone: "",
    password: "",
    status: "available",
  });

  const handleChange = (e) => {
    setDriver({
      ...driver,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/drivers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driver),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);

      setDriver({
        name: "",
        phone: "",
        password: "",
        status: "available",
      });

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">

      <div className="
        bg-white
        border
        border-yellow-300
        shadow-lg
        rounded-xl
        p-6
        w-full
        max-w-sm
      ">

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Add Driver
        </h1>

        <p className="text-center text-gray-500 text-sm mb-5">
          Create new driver account
        </p>


        <form onSubmit={handleSubmit} className="space-y-3">


          <input
            type="text"
            name="name"
            placeholder="Driver Name"
            value={driver.name}
            onChange={handleChange}
            className="
              w-full
              border
              border-gray-300
              rounded-lg
              p-2.5
              text-sm
              outline-none
              focus:border-yellow-400
            "
          />


          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={driver.phone}
            onChange={handleChange}
            className="
              w-full
              border
              border-gray-300
              rounded-lg
              p-2.5
              text-sm
              outline-none
              focus:border-yellow-400
            "
          />


          <input
            type="password"
            name="password"
            placeholder="Password"
            value={driver.password}
            onChange={handleChange}
            className="
              w-full
              border
              border-gray-300
              rounded-lg
              p-2.5
              text-sm
              outline-none
              focus:border-yellow-400
            "
          />


          <select
            name="status"
            value={driver.status}
            onChange={handleChange}
            className="
              w-full
              border
              border-gray-300
              rounded-lg
              p-2.5
              text-sm
              outline-none
              focus:border-yellow-400
            "
          >
            <option value="available">
              Available
            </option>

            <option value="busy">
              Busy
            </option>

            <option value="offline">
              Offline
            </option>

          </select>


          <button
            type="submit"
            className="
              w-full
              bg-yellow-400
              hover:bg-yellow-500
              text-black
              font-semibold
              py-2.5
              rounded-lg
              text-sm
              transition
            "
          >
            Add Driver
          </button>


        </form>

      </div>

    </div>
  );
}