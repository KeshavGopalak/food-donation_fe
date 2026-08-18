"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LoginPayload, LoginResponse } from "@/types/authTypes";
import { authService } from "@/services/authServices";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  // Strongly-typed mutation hook
  const loginMutation = useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: authService.login,
    onSuccess: (data) => {
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      const params = new URLSearchParams(window.location.search);
      const callbackUrl = params.get("callbackUrl") || "/userdashboard/dashboard";
      router.push(callbackUrl);
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="w-full max-w-md px-6 py-10 mx-auto sm:px-8 sm:py-12">
      <div className="mb-8 text-center lg:text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-600 text-sm mx-auto max-w-xs lg:max-w-none">
          Please enter your details to access your dashboard.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
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
          <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-textgreen focus:border-transparent text-sm"
            required
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 border border-gray-300 rounded cursor-pointer accent-textgreen"
            />
            <span className="text-sm text-gray-700">Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-sm text-textgreen hover:text-green-600 font-medium">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-textwhite hover:bg-darkgreen hover:text-textwhite text-darkgreen font-semibold py-3 rounded-lg transition-colors mt-6 disabled:opacity-50"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      {loginMutation.isError && (
        <p className="text-red-600 mt-4 text-sm">{loginMutation.error.message}</p>
      )}

      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="text-gray-600 text-xs">Or continue with</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <button
        type="button"
        className="w-full border border-gray-300 hover:bg-gray-50 text-gray-900 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <image href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctext x='0' y='20' fontSize='14' fill='%23000'%3EG%3C/text%3E%3C/svg%3E" />
        </svg>
        <span>Sign in with Google</span>
      </button>

      <p className="text-center text-sm text-gray-600 mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-textgreen hover:text-green-600 font-semibold">
          Sign up
        </Link>
      </p>
    </div>
  );
}