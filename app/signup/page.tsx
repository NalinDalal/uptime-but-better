"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SignUp() {
  return (
    <main className="flex justify-center items-center px-6 min-h-screen text-white bg-[#ff6347]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.05),_transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-8 space-y-6 w-full max-w-md rounded-2xl border shadow-2xl bg-white/10 border-white/10 backdrop-blur-md"
      >
        <h1 className="text-3xl font-bold text-center">
          Create your TomatoTrack account 🍅
        </h1>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-white/80"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="py-2 px-4 w-full bg-white rounded-lg shadow focus:outline-none text-[#ff6347]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-white/80"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="py-2 px-4 w-full bg-white rounded-lg shadow focus:outline-none text-[#ff6347]"
              placeholder="Choose a secure password"
            />
          </div>

          <button
            type="submit"
            className="py-3 w-full font-semibold bg-white rounded-lg shadow-md transition hover:shadow-lg hover:scale-105 text-[#ff6347]"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-white/80">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-white underline hover:text-white/90"
          >
            Sign in here
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
