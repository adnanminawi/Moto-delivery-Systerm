"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Send,
  CheckCircle,
  ChevronDown,
  Loader2,
} from "lucide-react";

export default function ContactPage() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ State (Tracks which question is expanded)
  const [openFaq, setOpenFaq] = useState(null);

  // Form Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });

    // Auto-hide success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const faqs = [
    {
      q: "How fast can I book a ride?",
      a: "Instant bookings usually take less than 2 minutes. Our riders will match with you immediately depending on your current location.",
    },
    {
      q: "What are your payment methods?",
      a: "We currently accept cash on delivery, local card payments, and online wallet transfers.",
    },
    {
      q: "Can I cancel my booking?",
      a: "Yes, cancellations are free up to 10 minutes before the scheduled pickup time.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0f1a] text-white selection:bg-orange-500 selection:text-white">
      
      {/* NAV */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b0f1a]/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-3xl font-black tracking-tight">
            <span className="text-orange-500">Moto</span>Booking
          </div>

          <div className="hidden md:flex gap-10 font-semibold">
            <a href="/" className="hover:text-orange-400 transition-colors">Home</a>
            <a href="/about" className="hover:text-orange-400 transition-colors">About</a>
            <a href="/contact" className="text-orange-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Background Orbs */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-orange-500/20 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-blue-500/15 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-20">
        
        {/* HERO */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            Get in <span className="text-orange-400 bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
            Have questions? We are here 24/7 to help you keep your rides running smoothly.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          
          {/* LEFT INFO CARD */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-8">
            <div>
              <h2 className="text-3xl font-black text-orange-400">Contact Information</h2>
              <p className="text-white/50 text-sm mt-1">Reach out directly through any of these channels.</p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-5 items-center p-3 rounded-2xl hover:bg-white/5 transition-colors group">
                <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-base">Address</h3>
                  <p className="text-white/70 text-sm">Beirut, Lebanon</p>
                </div>
              </div>

              <div className="flex gap-5 items-center p-3 rounded-2xl hover:bg-white/5 transition-colors group">
                <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-base">WhatsApp Support</h3>
                  <a
                    href="https://wa.me/96181219253"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-orange-400 transition-colors text-sm font-medium block"
                  >
                    +961 81 219 253
                  </a>
                </div>
              </div>

              <div className="flex gap-5 items-center p-3 rounded-2xl hover:bg-white/5 transition-colors group">
                <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-base">Email</h3>
                  <a
                    href="mailto:support@motobooking.com"
                    className="text-white/70 hover:text-orange-400 transition-colors text-sm font-medium block"
                  >
                    support@motobooking.com
                  </a>
                </div>
              </div>

              <div className="flex gap-5 items-center p-3 rounded-2xl hover:bg-white/5 transition-colors group">
                <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-base">Website</h3>
                  <p className="text-white/70 text-sm">www.motobooking.com</p>
                </div>
              </div>

              <div className="flex gap-5 items-center p-3 rounded-2xl hover:bg-white/5 transition-colors group">
                <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-base">Working Hours</h3>
                  <p className="text-white/70 text-sm">Mon - Sun | 8:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative">
            
            {/* Success State Overlay */}
            {isSubmitted && (
              <div className="absolute inset-0 bg-[#0b0f1a]/95 rounded-3xl flex flex-col items-center justify-center text-center p-6 z-20">
                <CheckCircle className="text-green-400 mb-4" size={56} />
                <h3 className="text-2xl font-black text-white">Message Sent!</h3>
                <p className="text-white/70 text-sm mt-2 max-w-xs">
                  Thank you for reaching out. Our support squad will review your ticket and respond shortly.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-sm text-orange-400 underline hover:text-orange-300"
                >
                  Send another message
                </button>
              </div>
            )}

            <h2 className="text-3xl font-black mb-2 text-orange-400">Send Message</h2>
            <p className="text-white/50 text-sm mb-6">Drop us a line and we'll get back to you within hours.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full Name *"
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email Address *"
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>

              <div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Phone Number (Optional)"
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>

              <div>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your Message *"
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 font-black text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* INTERACTIVE FAQ SECTION */}
        <div className="mt-28 max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-8">
            Frequently Asked <span className="text-orange-400">Questions</span>
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-bold text-base md:text-lg">{faq.q}</span>
                    <ChevronDown 
                      size={20} 
                      className={`text-orange-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
                    />
                  </button>
                  <div 
                    className={`px-6 transition-all duration-300 ease-in-out border-orange-500/30 ${
                      isOpen ? "max-h-40 pb-5 pt-1 border-t opacity-100" : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
                    }`}
                  >
                    <p className="text-white/70 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-white/10 rounded-3xl p-10 backdrop-blur-sm max-w-4xl mx-auto">
          <h2 className="text-3xl font-black">Need instant assistance?</h2>
          <p className="text-white/60 mt-2 text-sm md:text-base">
            Skip the queue. Jump directly into a live chat session with our dispatch support squad.
          </p>
          <button 
            onClick={() => window.open('https://wa.me/96181219253', '_blank')}
            className="mt-6 px-10 py-4 bg-orange-500 hover:bg-orange-600 rounded-full font-black text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-xl shadow-orange-500/20"
          >
            Start Live Chat
          </button>
        </div>

      </div>
    </div>
  );
}