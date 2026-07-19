"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const setAuthCookie = (token: string) => {
  document.cookie = `token=${token}; path=/; max-age=604800; samesite=lax`;
};

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      
      if (!res.ok) {
        setError(responseData.error || "Invalid credentials");
        return;
      }
      
      // Save token in cookie
      setAuthCookie(responseData.token);
      window.location.assign("/dashboard");
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "demo@tripcraft.ai", password: "password123" }),
      });

      const responseData = await res.json();
      
      if (!res.ok) {
        setError("Demo login failed. Please ensure the demo user is seeded.");
        return;
      }
      setAuthCookie(responseData.token);
      window.location.assign("/dashboard");
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    const clientId = "573237437483-bqm522qfcjg9jcd6rta8cg95bglv1v15.apps.googleusercontent.com";
    const redirectUri = "http://localhost:3000/api/auth/callback/google";
    const scope = encodeURIComponent("email profile");
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Image/Branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-ocean-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-900/40 to-transparent" />
        
        <div className="relative z-10 flex flex-col justify-end p-12 h-full text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Your journey begins here.</h2>
            <p className="text-ocean-100 text-lg max-w-md leading-relaxed mb-8">
              Log in to access your AI-powered itineraries, track budgets, and discover new destinations recommended just for you.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-ocean-900 bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium text-ocean-100">
                Join 10,000+ travelers
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-gray-500">Log in to continue planning your trip.</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100 font-medium">
              {error}
            </motion.div>
          )}

          <div className="bg-white rounded-3xl premium-shadow border border-gray-100 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-ocean-600 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 transition-all text-foreground font-medium placeholder:text-gray-400"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">Password</label>
                  <a href="#" className="text-xs font-semibold text-ocean-600 hover:text-ocean-700 transition-colors">Forgot password?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-ocean-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    {...register("password")}
                    type="password"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 transition-all text-foreground font-medium placeholder:text-gray-400"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="w-full bg-gradient-to-r from-ocean-600 to-ocean-800 text-white py-3.5 rounded-xl hover:shadow-lg transition-all flex justify-center items-center font-bold disabled:opacity-70 group mt-2"
              >
                {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                <span>Log In</span>
                {!isLoading && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-8 flex items-center justify-between">
              <span className="w-full border-b border-gray-200"></span>
              <span className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">or</span>
              <span className="w-full border-b border-gray-200"></span>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading || isGoogleLoading}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-gray-700 disabled:opacity-70"
              >
                {isGoogleLoading ? <Loader2 className="animate-spin" size={18} /> : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                )}
                Continue with Google
              </button>
              
              <button
                onClick={handleDemoLogin}
                disabled={isLoading || isGoogleLoading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors font-semibold text-gray-800 disabled:opacity-70"
              >
                Demo Login
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600 font-medium">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-ocean-600 hover:text-ocean-700 hover:underline font-bold transition-colors">
              Sign up
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
