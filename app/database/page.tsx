"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DatabasePage() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   router.replace("/login");
    //   return;
    // }

    (async () => {
      try {
        const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
        const res = await fetch(`${API}/api/database`, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        if (!res.ok) {
          // token invalid or expired
          // localStorage.removeItem("token");
          router.replace("/login");
          return;
        }
        const data = await res.json();
        setMessage(data?.message || "No message");
      } catch (err) {
        console.error(err);
        router.replace("/login");
      }
    })();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Database (Protected)</h1>
        <p className="text-gray-700">{message ?? "Loading..."}</p>
      </div>
    </div>
  );
}
