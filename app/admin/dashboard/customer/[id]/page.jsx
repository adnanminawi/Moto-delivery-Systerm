"use client";

import { use, useEffect, useState } from "react";

export default function CustomerProfile({ params }) {
  const { id } = use(params);

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");

  useEffect(() => {
    async function getCustomer() {
      try {
        const res = await fetch(`/api/customer/${id}`);
        const data = await res.json();

        const profile = data.driver_Profile[0];

        setCustomer(profile);
        setEditedName(profile.name);
        setEditedPhone(profile.phone);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getCustomer();
  }, [id]);

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const res = await fetch(`/api/customer/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editedName,
          phone: editedPhone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update");
      }

      setCustomer({
        ...customer,
        name: editedName,
        phone: editedPhone,
      });

      setIsEditing(false);

      setPopupTitle("Success");
      setPopupMessage("Customer updated successfully!");
      setShowPopup(true);
    } catch (error) {
      console.log(error);

      setPopupTitle("Error");
      setPopupMessage("Failed to update customer.");
      setShowPopup(true);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm font-semibold tracking-widest uppercase">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="bg-white shadow-xl rounded-3xl p-10 text-center border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Customer Not Found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Popup */}
    {showPopup && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
    <div className="bg-white w-[450px] rounded-[35px] shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-10 text-center animate-[popup_.4s_ease]">

      {/* Icon */}
      <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 flex items-center justify-center shadow-lg animate-bounce">
        <span className="text-6xl text-black">✓</span>
      </div>

      {/* Title */}
      <h2 className="text-4xl font-extrabold text-gray-800 mt-6">
        {popupTitle}
      </h2>

      {/* Message */}
      <p className="text-xl text-gray-500 mt-4 leading-8">
        {popupMessage}
      </p>

      {/* Button */}
      <button
        onClick={() => setShowPopup(false)}
        className="
          mt-8
          px-12
          py-4
          rounded-2xl
          bg-gradient-to-r
          from-yellow-400
          to-amber-500
          text-black
          font-bold
          text-lg
          shadow-lg
          hover:scale-110
          hover:shadow-2xl
          active:scale-95
          transition-all
          duration-300
        "
      >
        Awesome 🎉
      </button>
    </div>
  </div>
)}

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center text-4xl font-bold text-black shadow-xl">
              {editedName?.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mt-5">
              {customer.name}
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Customer Profile
            </p>
          </div>

          {/* Information */}
          <div className="mt-10 space-y-5">
            {/* Name */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Full Name
              </label>

              {isEditing ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="mt-3 w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-yellow-400"
                />
              ) : (
                <p className="mt-3 text-lg font-semibold text-gray-800">
                  {customer.name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Phone Number
              </label>

              {isEditing ? (
                <input
                  type="text"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  className="mt-3 w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-yellow-400"
                />
              ) : (
                <p className="mt-3 text-lg font-semibold text-gray-800">
                  {customer.phone}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8">
            {isEditing ? (
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedName(customer.name);
                    setEditedPhone(customer.phone);
                  }}
                  className="w-1/2 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold hover:opacity-90 transition"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold hover:opacity-90 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}