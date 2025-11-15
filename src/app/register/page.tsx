"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [focusedField, setFocusedField] = useState<keyof typeof formData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call your registration API here
       const payload = {
      username: formData.name,
      email: formData.email,
      password: formData.password,
    };
      const response = await axios.post("/api/auth/register", payload);
      if (response.status === 201 || response.status === 200) {
        toast.success(response.data.message || "Signup successful!");
        router.push("/login");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-200 overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-4xl h-[85vh]">
        {/* Left Image Panel */}
        <div className="hidden md:flex flex-1 bg-emerald-200 relative items-center justify-center">
          <img
            src="/images/logo.jpeg"
            alt="Arogya Connect Logo"
            className="w-3/4 h-3/4 object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute bottom-8 left-8 text-white text-3xl font-bold drop-shadow-lg">
            Join Our Community!
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex-1 flex flex-col justify-center items-center p-10 md:p-12 bg-white">
          <h1 className="text-3xl font-bold text-emerald-700 mb-4">Create Account</h1>
          <p className="text-gray-700 mb-8 text-center">Sign up to access personalized health insights</p>

          <form className="w-full max-w-sm space-y-5" onSubmit={onRegister}>
            {/* Name */}
            <div className="relative">
              <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${focusedField==="name"?"text-emerald-500":""}`} />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 ${focusedField==="name"?"border-emerald-500":"border-gray-300"} focus:border-emerald-500 outline-none text-gray-800 placeholder-gray-400`}
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${focusedField==="email"?"text-emerald-500":""}`} />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 ${focusedField==="email"?"border-emerald-500":"border-gray-300"} focus:border-emerald-500 outline-none text-gray-800 placeholder-gray-400`}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${focusedField==="password"?"text-emerald-500":""}`} />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 ${focusedField==="password"?"border-emerald-500":"border-gray-300"} focus:border-emerald-500 outline-none text-gray-800 placeholder-gray-400`}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold transition">
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          {/* Google Sign-Up */}
          <button
            onClick={() => signIn("google")}
            className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition"
          >
            Continue with Google
          </button>

          {/* Login Link */}
          <p className="text-gray-700 mt-6 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-600 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
