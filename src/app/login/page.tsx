"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [focusedField, setFocusedField] = useState<keyof typeof formData | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    if (result?.error) toast.error(result.error);
    else {
      toast.success("Login successful!");
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-200 overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Card */}
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-4xl h-[85vh]">
        
        {/* Left Image Panel */}
        <div className="hidden md:flex flex-1 bg-emerald-200 relative items-center justify-center">
          <img
            src="/images/logo.jpeg"
            alt="Arogya Connect Logo"
            className="w-3/4 h-3/4 object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute bottom-8 left-8 text-white text-3xl font-bold drop-shadow-lg">
            Welcome Back!
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex-1 flex flex-col justify-center items-center p-10 md:p-12 bg-white">
          <h1 className="text-3xl font-bold text-emerald-700 mb-4">Log In</h1>
          <p className="text-gray-700 mb-8 text-center">Access your account to continue your journey to better health</p>

          <form className="w-full max-w-sm space-y-5" onSubmit={onLogin}>
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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-10 pr-10 py-3 rounded-xl border-2 ${focusedField==="password"?"border-emerald-500":"border-gray-300"} focus:border-emerald-500 outline-none text-gray-800 placeholder-gray-400`}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
              </button>
            </div>

            {/* Remember Me */}
            <div className="flex justify-between items-center text-gray-600 text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                  className="w-4 h-4 text-emerald-500 rounded border-gray-300"
                />
                <span>Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-emerald-600 hover:underline">Forgot Password?</Link>
            </div>

            {/* Login Button */}
            <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold transition">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Google Sign-In */}
          <button
            onClick={() => signIn("google")}
            className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition"
          >
            Continue with Google
          </button>

          {/* Signup Link */}
          <p className="text-gray-700 mt-6 text-center">
            Don't have an account?{" "}
            <Link href="/register" className="text-emerald-600 hover:underline font-medium">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

