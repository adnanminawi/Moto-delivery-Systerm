"use client";

import {
    Bell,
    Search,
    Settings,
} from "lucide-react";

export default function Navbar() {

    return (

        <header className="backdrop-blur-xl bg-white/70 border-b border-gray-200 sticky top-0 z-50">

            <div className="flex justify-between items-center px-8 py-5">

                <div>

                    <h2 className="text-3xl font-bold">
                        Dashboard
                    </h2>

                    <p className="text-gray-500">
                        Welcome back Admin 👋
                    </p>

                </div>

                <div className="flex items-center gap-5">

                    <div className="relative">


                    </div>

                    <button className="relative p-3 rounded-full hover:bg-gray-100 transition">

                        <Bell />

                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>

                    </button>

                    <button className="p-3 rounded-full hover:bg-gray-100">

                        <Settings />

                    </button>

                    <div className="flex items-center gap-3">

                        <img
                            src="https://i.pravatar.cc/150?img=15"
                            className="h-11 w-11 rounded-full border-2 border-blue-500"
                        />

                        <div>

                            <h3 className="font-semibold">
                                Admin
                            </h3>
                        </div>

                    </div>

                </div>

            </div>

        </header>

    );
}