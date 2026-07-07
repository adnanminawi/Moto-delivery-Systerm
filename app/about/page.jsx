"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function About() {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);

  const screens = [
    {
      title: "Choose your bike",
      desc: "Select the best ride for your journey instantly.",
      img: "/moto2.png",
    },
    {
      title: "Contact the nearest driver",
      desc: "Connect instantly and confirm your ride.",
      img: "/moto4.png",
    },
    {
      title: "Ride & enjoy",
      desc: "Sit back and enjoy your fast safe ride.",
      img: "/moto5.png",
    },
  ];

  const changeStep = (newStep) => {
    setAnimating(true);

    setTimeout(() => {
      setStep(newStep);
      setAnimating(false);
    }, 250);
  };

  return (
    
    <div className="relative min-h-screen overflow-hidden bg-[#0b0f1a] text-white">
<nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b0f1a]/70 border-b border-white/10">
  <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

    <div className="text-3xl font-black">
      <span className="text-orange-500">Moto</span>Delivery
    </div>

    <div className="hidden md:flex gap-10 font-semibold">
      <a href="/" className="hover:text-orange-400 transition">Home</a>
      <a href="/about" className="hover:text-orange-400 transition">About</a>
      <a href="/features" className="hover:text-orange-400 transition">Features</a>
      <a href="/contact" className="hover:text-orange-400 transition">Contact</a>
    </div>

   

  </div>
</nav>
      {/* Background glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-blue-500/30 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-orange-500/20 blur-[160px] rounded-full"></div>

<div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 pb-20">

        {/* HERO */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-black tracking-tight">
            Moto Delivery  <span className="text-orange-400">Experience</span>
          </h1>

          <p className="text-white text-xl md:text-2xl font-semibold mt-6 max-w-3xl mx-auto leading-relaxed">
            A modern ride booking experience inspired by the future of mobility.
            Our platform connects you with the nearest drivers, ensuring a fast, safe, and enjoyable journey every time.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-xl">

          {/* STEP */}
          <div className="mb-6 inline-block px-5 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
            <span className="text-orange-400 font-bold text-lg">
              Step {step + 1} / {screens.length}
            </span>
          </div>

          {/* TITLE + DESC (animated) */}
          <div
            className={`transition-all duration-300 ${
              animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              {screens[step].title}
            </h2>

            <p className="text-white text-xl font-semibold mb-8 leading-relaxed">
              {screens[step].desc}
            </p>
          </div>

        {/* IMAGE FIXED */}
<div className="flex justify-center mb-8">
  <div className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px]">

    {/* glow */}
    <div className="absolute inset-0 bg-orange-500/25 blur-[100px] rounded-full"></div>

    <Image
      src={screens[step].img}
      alt="moto"
      width={400}
      height={400}
      className="object-contain relative z-10 w-full h-full"
    />
  </div>
</div>

          {/* BUTTONS */}
          <div className="flex justify-between">
            <button
              onClick={() =>
                changeStep(step === 0 ? screens.length - 1 : step - 1)
              }
              className="px-7 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-lg transition"
            >
              Prev
            </button>

            <button
              onClick={() =>
                changeStep(step === screens.length - 1 ? 0 : step + 1)
              }
              className="px-9 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 font-black text-lg transition"
            >
              Next
            </button>
          </div>

          {/* DOTS */}
          <div className="flex justify-center gap-2 mt-6">
            {screens.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition ${
                  step === i ? "bg-orange-500 scale-150" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
<div className="grid md:grid-cols-4 gap-6 mt-20">

<div className="bg-white/5 rounded-2xl p-8 text-center">
<h1 className="text-5xl font-black text-orange-400">10K+</h1>
<p className="mt-3 text-gray-300">Happy Riders</p>
</div>

<div className="bg-white/5 rounded-2xl p-8 text-center">
<h1 className="text-5xl font-black text-orange-400">500+</h1>
<p className="mt-3 text-gray-300">Professional Drivers</p>
</div>

<div className="bg-white/5 rounded-2xl p-8 text-center">
<h1 className="text-5xl font-black text-orange-400">24/7</h1>
<p className="mt-3 text-gray-300">Support</p>
</div>

<div className="bg-white/5 rounded-2xl p-8 text-center">
<h1 className="text-5xl font-black text-orange-400">4.9★</h1>
<p className="mt-3 text-gray-300">Average Rating</p>
</div>

</div>
        {/* FEATURES */}
      <div id="features" className="mt-28 scroll-mt-40">

  <div className="text-center mb-14">
    <h2 className="text-5xl font-black">
      Why Choose
      <span className="text-orange-500"> MotoTaxi?</span>
    </h2>

    <p className="text-gray-400 mt-5 text-lg">
      Designed to make every ride faster, safer, and more comfortable.
    </p>
  </div>

  <div className="grid lg:grid-cols-3 gap-10">

    {[
      {
        icon: "🚀",
        title: "Fast Booking",
        desc: "Reserve your ride within seconds using our smart booking system.",
      },
      {
        icon: "📍",
        title: "Live Tracking",
        desc: "Track your driver's location in real time until arrival.",
      },
      {
        icon: "🛡️",
        title: "Safe Ride",
        desc: "Verified drivers with secure and reliable transportation.",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="group bg-gradient-to-br from-[#1b2236] to-[#111827]
        border border-white/10 rounded-3xl p-10
        hover:border-orange-500
        hover:-translate-y-3
        transition-all duration-500
        shadow-xl"
      >
        <div className="text-6xl mb-8 group-hover:scale-110 transition">
          {item.icon}
        </div>

        <h3 className="text-3xl font-bold mb-4 text-white">
          {item.title}
        </h3>

        <p className="text-gray-400 leading-8">
          {item.desc}
        </p>
      </div>
    ))}

  </div>

</div>
        {/* CTA */}
        <div className="mt-28 text-center">
          <h2 className="text-5xl font-black">Ready to ride?</h2>

          <p className="text-white text-xl font-semibold mt-4">
            Experience the future of moto taxi booking
          </p>

          <button className="mt-10 px-12 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-black text-xl transition">
            Book Now
          </button>
        </div>

      </div>
    </div>
  );
}