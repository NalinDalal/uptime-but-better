"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <main className="flex overflow-hidden relative justify-center items-center px-6 min-h-screen text-white bg-[#ff6347] scroll-smooth">
        <img
          src="/tomato.jpg"
          alt="Floating Tomato"
          className="absolute -bottom-20 -left-20 opacity-10 pointer-events-none w-[300px] rotate-[15deg]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.05),_transparent_60%)]" />
        <div className="flex relative z-10 flex-col items-center p-6 w-full max-w-6xl rounded-2xl border shadow-xl md:flex-row md:p-10 bg-white/10 backdrop-blur-lg border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 space-y-6"
          >
            <div className="inline-block py-1 px-3 text-sm font-semibold tracking-wide rounded-full bg-white/20 backdrop-blur">
              🍅 TomatoTrack
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight md:text-5xl">
              Track & Visualize <br />
              User Activity in Real-Time
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-white/90">
              Get instant insights on how visitors use your site. From time
              spent to click paths — TomatoTrack gives you fast, privacy-first
              analytics with transparent social proof.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/signin">
                <button className="py-3 px-6 font-semibold bg-white rounded-lg shadow-md transition hover:shadow-lg hover:scale-105 text-[#ff6347]">
                  🎉 Start Tracking Now
                </button>
              </Link>
              <div className="flex gap-2 items-center py-2 px-4 text-sm font-medium bg-white rounded-md shadow-sm text-[#ff6347]">
                ✅ <span>57 websites tracked today</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="overflow-hidden relative flex-1 mt-10 rounded-xl shadow-2xl md:mt-0"
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-l to-transparent from-[#ff6347]/30" />
            <img
              src="/girl-laptop.webp"
              alt="Analytics Dashboard"
              className="object-cover relative z-0 w-full h-full"
            />
          </motion.div>
        </div>
        <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
          <div className="flex flex-col items-center animate-bounce cursor-pointer group">
            <div className="mb-1 w-3 h-3 bg-white rounded-full transition group-hover:opacity-80" />
            <div className="h-6 transition group-hover:bg-white w-[2px] bg-white/60" />
            <span className="mt-2 text-sm group-hover:text-white text-white/70">
              Scroll Down
            </span>
          </div>
        </div>
      </main>

      {/* TESTIMONIALS SECTION */}
      <Testimonials />
    </>
  );
}

function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="flex justify-center items-center py-20 px-6 min-h-screen bg-[#ff6347]/10"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="space-y-12 w-full max-w-4xl text-center"
      >
        <h2 className="text-4xl font-bold text-white">
          What People Are Saying
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {[
            {
              text: "“TomatoTrack gave us real-time clarity on user behavior. We made better UX decisions within days.”",
              author: "— Aditi M., UX Lead",
            },
            {
              text: "“Insanely useful! Especially love the privacy-first tracking and how lightweight it is.”",
              author: "— Rakesh P., Indie Hacker",
            },
            {
              text: "“We integrated TomatoTrack in under 5 minutes — it’s that simple and powerful.”",
              author: "— Farhan S., Developer",
            },
            {
              text: "“The live dashboard is addictive. Watching users in real-time is like watching your product breathe.”",
              author: "— Neha K., SaaS Founder",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="p-6 text-white rounded-xl border shadow-lg transition-all duration-300 cursor-default hover:shadow-2xl bg-white/10 backdrop-blur-sm border-white/10 hover:border-white/30 hover:shadow-white/20"
            >
              <p>{t.text}</p>
              <p className="mt-4 font-semibold">{t.author}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
