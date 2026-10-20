"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE: Illustration & Text */}
          <div className="hidden lg:flex flex-col justify-center items-center space-y-8">
            {/* Placeholder for the 3D Illustration */}
            <div className="relative w-full max-w-lg">
              {/* Note: Replace this img src with your actual 3D illustration asset */}
              <img 
                src="/images/reg-banner.png" 
                alt="Inventory Management Illustration" 
                className="w-1200px h-1200px drop-shadow-2xl"
              />
            </div>
            
            <div className="text-center lg:text-left space-y-2 max-w-md">
              <h3 className="text-2xl font-bold text-gray-800">
                Manage your Inventory the easiest way
              </h3>
              <p className="text-gray-500 text-sm font-bold leading-relaxed">
                Enjoy an easy to use inventory system for the management of your business products.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: Register Form */}
          <div className="flex flex-col justify-center max-w-full w-full mx-auto lg:mx-0">
            <div className="mb-8">
              <h1 className="text-7xl font-bold text-[#5b21b6] mb-2">
                Hello,
              </h1>
              <h2 className="text-7xl font-bold text-[#5b21b6]">
                Create Account!
              </h2>
            </div>

            <form className="space-y-5">
              {/* Full Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 bg-[#f8f9fc] border-none rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#5b21b6] focus:outline-none transition-all"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-3 bg-[#f8f9fc] border-none rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#5b21b6] focus:outline-none transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-3 bg-[#f8f9fc] border-none rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#5b21b6] focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="flex items-center pt-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-[#5b21b6] focus:ring-[#5b21b6] border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-500 cursor-pointer">
                  I agree to the <span className="text-[#5b21b6] hover:underline">Terms & Conditions</span>
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-[#5b21b6] hover:bg-[#4c1d95] text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-lg shadow-purple-200 mt-2"
              >
                Register
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center sm:text-left">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-[#5b21b6] font-semibold hover:underline">
                  Login here
                </Link>
              </p>
            </div>

            {/* App Store Buttons (Same as image footer) */}
            <div className="mt-12 flex items-center justify-center sm:justify-start gap-4 opacity-90 hover:opacity-100 transition-opacity">
                {/* Google Play Badge Placeholder */}
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-10 cursor-pointer"
                />
                {/* App Store Badge Placeholder */}
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                    alt="Download on the App Store" 
                    className="h-10 cursor-pointer"
                />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}