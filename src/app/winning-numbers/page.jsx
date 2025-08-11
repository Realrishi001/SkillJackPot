"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";

const SERIES = ["10-19", "30-39", "50-59"];

const page = () => {
  // ---- State ----
  const [drawDate, setDrawDate] = useState(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`; // YYYY-MM-DD
  });
  const [series, setSeries] = useState(SERIES[0]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---- Helpers ----
  function getLoginIdFromToken() {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("userToken");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch {
      return null;
    }
  }

  // Some rows may store DrawTime as "\"5:00 PM\"" (stringified again)
  function sanitizeTime(val) {
    if (val == null) return "";
    try {
      if (typeof val === "string" && /^".*"$/.test(val.trim())) {
        return JSON.parse(val);
      }
      return String(val);
    } catch {
      return String(val);
    }
  }

  // Convert time string to 24-hour format for sorting
  function timeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const time = timeStr.toLowerCase().trim();
    const [hourMin, period] = time.split(/\s*(am|pm)\s*/i);
    if (!hourMin) return 0;
    
    const [hour, minute = 0] = hourMin.split(':').map(Number);
    let hour24 = hour;
    
    if (period && period.toLowerCase() === 'pm' && hour !== 12) {
      hour24 += 12;
    } else if (period && period.toLowerCase() === 'am' && hour === 12) {
      hour24 = 0;
    }
    
    return hour24 * 60 + minute;
  }

  // Sort rows by draw time
  function sortRowsByTime(rows) {
    return [...rows].sort((a, b) => {
      const timeA = timeToMinutes(sanitizeTime(a.DrawTime));
      const timeB = timeToMinutes(sanitizeTime(b.DrawTime));
      return timeA - timeB;
    });
  }

  // If the API already returns groupedWinningNumbers, use it.
  // Otherwise, group here from winningNumbers JSON.
  function ensureGrouped(row) {
    if (row?.groupedWinningNumbers) return row;

    // Try to parse the JSON string from row.winningNumbers
    let arr = [];
    try {
      // DB may store as JSON string of array objects: [{number:"1065", value:0}, ...]
      const parsed = typeof row.winningNumbers === "string"
        ? JSON.parse(row.winningNumbers)
        : row.winningNumbers;
      if (Array.isArray(parsed)) arr = parsed;
    } catch {
      arr = [];
    }

    const groups = { "10-19": [], "30-39": [], "50-59": [] };
    arr.forEach((it) => {
      const numStr = (it?.number ?? "").toString();
      const prefix = parseInt(numStr.substring(0, 2), 10);
      if (prefix >= 10 && prefix <= 19) groups["10-19"].push(numStr);
      else if (prefix >= 30 && prefix <= 39) groups["30-39"].push(numStr);
      else if (prefix >= 50 && prefix <= 59) groups["50-59"].push(numStr);
    });

    return {
      ...row,
      groupedWinningNumbers: groups,
    };
  }

  // ---- Fetch ----
  async function handleSearch() {
    const loginId = getLoginIdFromToken();
    if (!loginId) {
      alert("Please log in again.");
      return;
    }

    setLoading(true);
    try {
      // Adjust path to match your route/controller
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/show-winning-numbers`, {
        loginId,
        drawDate, // server may filter on this; OK if ignored
      });

      const list = Array.isArray(data?.data) ? data.data : [];
      // Normalize to always have groupedWinningNumbers
      const normalized = list.map((r) => ensureGrouped(r));
      // Sort by draw time
      const sorted = sortRowsByTime(normalized);
      setRows(sorted);
    } catch (e) {
      console.error(e);
      alert("Failed to fetch winning numbers.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- UI ----
  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <Sidebar />
      </div>

      <div className="flex-1 min-w-0">
        <Navbar />

        {/* === Skill Jackpot Results === */}
        <section className="p-4 md:p-8 space-y-8">
          {/* Enhanced Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-800 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                Skill Jackpot
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 font-medium">
              Game Results & Winning Numbers
            </p>
          </div>

          {/* Enhanced Controls */}
          <div className="mx-auto max-w-4xl">
            <div className=" bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl border border-slate-700/50 shadow-2xl p-6 md:p-8">
              
              {/* Date Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  Select Draw Date
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative flex-1 max-w-xs">
                    <input
                      type="date"
                      className="w-full h-12 rounded-2xl bg-slate-800/70 text-slate-100 border-2 border-slate-700/50 px-4 py-3 text-center font-medium focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all"
                      value={drawDate}
                      onChange={(e) => setDrawDate(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="inline-flex items-center justify-center h-12 px-8 rounded-2xl font-bold bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-cyan-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 transition-all duration-200 group"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Search Results
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Enhanced Series Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-300">
                  Select Number Series
                </label>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {SERIES.map((label) => (
                    <button
                      key={label}
                      onClick={() => setSeries(label)}
                      className={[
                        "relative px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-300 min-w-[100px] group",
                        series === label
                          ? "text-white bg-gradient-to-r from-fuchsia-600 to-indigo-600 shadow-xl scale-105 border-2 border-white/20"
                          : "text-slate-200 bg-slate-800/60 border-2 border-slate-600/50 hover:bg-slate-700/70 hover:border-slate-500/70 hover:scale-105 hover:shadow-l",
                      ].join(" ")}
                    >
                      <div className="relative z-10">{label}</div>
                      {series === label && (
                        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 to-indigo-600/20 rounded-2xl blur-xl"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Results Table */}
          <div className="mx-auto max-w-7xl">
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
              
              {/* Table Header */}
              <div className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 px-6 py-4 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-200">
                    Results for Series: <span className="text-fuchsia-400">{series}</span>
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Sorted by time</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-800/60 to-slate-700/60">
                      <th className="sticky left-0 bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur px-6 py-4 text-left">
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-slate-200 font-bold text-lg">Draw Time</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                          </svg>
                          <span className="text-slate-200 font-bold text-lg">Winning Numbers</span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-700/30">
                    {rows.length === 0 && !loading && (
                      <tr>
                        <td colSpan={2} className="px-6 py-16 text-center">
                          <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-slate-800/60 flex items-center justify-center">
                              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0118 12M6 12a7.962 7.962 0 016-5.291m0 10.582A7.962 7.962 0 016 12m6 5.291A7.962 7.962 0 0118 12M6 12a7.962 7.962 0 016 5.291" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-slate-400 text-lg font-medium">No results found</p>
                              <p className="text-slate-500 text-sm mt-1">Try selecting a different date and search again</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}

                    {rows.map((row, index) => {
                      const time = sanitizeTime(row.DrawTime);
                      const grouped = row.groupedWinningNumbers || {};
                      const list = (grouped[series] || []).map(String);

                      return (
                        <tr 
                          key={row.id} 
                          className={`hover:bg-slate-800/40 transition-colors group ${
                            index % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-800/20'
                          }`}
                        >
                          <td className="sticky left-0 bg-inherit backdrop-blur px-6 py-4 border-r border-slate-700/30">
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 group-hover:scale-125 transition-transform"></div>
                              <span className="text-slate-100 font-bold text-lg">{time || "—"}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-3">
                              {list.length === 0 ? (
                                <div className="flex items-center space-x-2 text-slate-500">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                  <span className="font-medium">No numbers</span>
                                </div>
                              ) : (
                                list.map((n, i) => (
                                  <div
                                    key={`${row.id}-${i}`}
                                    className="relative group/number"
                                  >
                                    <div className="absolute inset-0 bg-gradient-to-r  rounded-xl blur-sm opacity-75 group-hover/number:opacity-100 transition-opacity"></div>
                                    <span className="relative px-4 py-2 rounded-xl text-slate-900 font-bold text-lg bg-gradient-to-r from-cyan-300 via-emerald-300 to-lime-300 shadow-lg group-hover/number:scale-110 group-hover/number:shadow-xl transition-all duration-200 block min-w-[60px] text-center">
                                      {n}
                                    </span> 
                                  </div>
                                ))
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Enhanced Footer */}
              {rows.length > 0 && (
                <div className="bg-gradient-to-r from-slate-900/60 to-slate-800/60 px-6 py-4 border-t border-slate-700/50">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span>Total Results: <strong className="text-slate-200">{rows.length}</strong></span>
                    </div>
                    <div className="text-slate-500">
                      Last updated: {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;