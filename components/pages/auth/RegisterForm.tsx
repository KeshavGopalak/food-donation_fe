"use client";

import { useState } from "react";
import Link from "next/link";
import { useRegister } from "@/hooks/auth/useRegister";
export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "volunteer">("user");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("");
  const [skills, setSkills] = useState("");
  const [transportation, setTransportation] = useState("");
  const { mutate: register, isPending, error } = useRegister();

  return (
    <div className="w-full max-w-md px-6 py-10 mx-auto sm:px-8 sm:py-12">
      <div className="mb-8 text-center lg:text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create an account
        </h1>
        <p className="text-gray-600 text-sm mx-auto max-w-xs lg:max-w-none">
          Sign up to get started with your food donation dashboard.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          register({
            name,
            email,
            password,
            role,
            ...(role === "volunteer" ? {
              volunteerDetails: { experience, availability, skills, transportation },
            } : {}),
          });
        }}
        className="space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Account type</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "user" | "volunteer")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-textgreen focus:border-transparent text-sm"
          >
            <option value="user">Donor / User</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        {role === "volunteer" && (
          <div className="space-y-4 rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
            <p className="text-sm font-medium text-emerald-900">Volunteer details</p>
            <input value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Relevant experience" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" required />
            <input value={availability} onChange={(e) => setAvailability(e.target.value)} placeholder="Availability (for example, weekends)" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" required />
            <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills or certifications" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" required />
            <input value={transportation} onChange={(e) => setTransportation(e.target.value)} placeholder="Transportation details" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" required />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Full name
          </label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-textgreen focus:border-transparent text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-textgreen focus:border-transparent text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-textgreen focus:border-transparent text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-textwhite hover:bg-darkgreen hover:text-textwhite text-darkgreen font-semibold py-3 rounded-lg transition-colors mt-6"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create account"}
        </button>
        
      </form>

      {error && <p className="text-red-600 mt-4 text-sm">{error.message}</p>}

      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="text-gray-600 text-xs">Or continue with</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-textgreen hover:text-green-600 font-semibold"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
