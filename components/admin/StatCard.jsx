"use client";

import CountUp from "react-countup";

export default function StatCard({
    title,
    value,
    icon,
    color,
}) {
    return (

        <div
            className={`group relative overflow-hidden rounded-3xl p-7 ${color} text-white shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl`}
        >

            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10"></div>

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-white/70 text-lg">

                        {title}

                    </p>

                    <h2 className="text-5xl font-black mt-3">

                        <CountUp
                            end={Number(value)}
                            duration={2}
                        />

                    </h2>

                </div>

                <div className="text-6xl opacity-70 group-hover:scale-125 transition">

                    {icon}

                </div>

            </div>

        </div>

    );
}