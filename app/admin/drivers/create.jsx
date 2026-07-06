"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
export default function DriversCreatePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const[langitude, setLangitude] = useState("");
  const[latitude, setLatitude] = useState("");
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Driver</h1>
        <form className="bg-white shadow rounded p-4 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError(null);
            try {
              const res = await fetch("/api/drivers", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, phone, langitude, latitude }),
              });
              const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Failed to create driver");
                }
              alert("Driver created successfully!");
              setName("");
              setPhone("");
              setLangitude("");
              setLatitude("");
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
            }}
        >
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={name}
                onChange={(e) => setName(e.target.value)}
                className="border px-3 py-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border px-3 py-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Longitude</label>
            <input
              type="text"
              value={langitude}
              onChange={(e) => setLangitude(e.target.value)}
              className="border px-3 py-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Latitude</label>
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="border px-3 py-1 rounded w-full"
            />
          </div>
          {error && (
            <div className="text-red-500">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Creating..." : "Create Driver"}
          </button>
        </form>
      </div>
  );}
