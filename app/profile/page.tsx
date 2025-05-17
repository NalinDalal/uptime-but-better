"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => (window.location.href = "/signin")); // redirect on error
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold">Welcome, {user.email}</h1>
      <p>User ID: {user.id}</p>
      {/* List user URLs here later */}
    </div>
  );
}
