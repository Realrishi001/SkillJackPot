"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full h-16 px-6 bg-gradient-to-r from-white via-gray-50 to-white border-b border-gray-200 shadow-lg flex items-center justify-between relative backdrop-blur-sm z-50">
      {/* Left side - Welcome text */}
      <div className="flex items-center space-x-4">
        <div className="h-8 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
        </div>
      </div>

      {/* Right side - Profile */}
      <div className="relative" ref={dropdownRef}>
        {/* Profile Icon */}
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="relative group bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {/* SVG Profile Icon */}
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
          </svg>

          {/* Online indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-2xl py-3 z-50 transform transition-all duration-300 origin-top-right">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-800">Admin Panel</p>
              <p className="text-xs text-gray-500">Manage your account</p>
            </div>

            <div className="py-2">
              <button className="w-full cursor-pointer text-left px-4 py-3 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-50 text-gray-700 hover:text-purple-700 font-medium transition-all duration-200 flex items-center space-x-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span onClick={()=> router.push("/forgot-password")}>Change Password</span>
              </button>

              <button className="w-full text-left px-4 cursor-pointer py-3 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-50 text-gray-700 hover:text-red-600 font-medium transition-all duration-200 flex items-center space-x-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16,17 21,12 16,7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span onClick={()=> router.push('/')}>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
