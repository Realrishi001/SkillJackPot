"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";

const ClaimedTicketsPage = () => {
  const [data, setData] = useState([]);
  const [shopNames, setShopNames] = useState([]);
  const [selectedShop, setSelectedShop] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  // ---- Fetch Claimed Ticket Data ----
  const fetchClaimedTickets = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3085/api/get-claimed-tickets", {
        fromDate,
        toDate,
      });

      const result = res.data?.data || [];
      setData(result);

      // Extract unique shop names
      const shops = new Set(result.map((item) => item.shopName));
      setShopNames([...shops]);
      setSelectedShop("");
      setTableData([]);
    } catch (err) {
      console.error("Error fetching claimed tickets:", err);
      alert("Failed to fetch claimed tickets data.");
    } finally {
      setLoading(false);
    }
  };

  // ---- Filter Table When Shop Changes ----
  useEffect(() => {
    if (!selectedShop) {
      setTableData([]);
      return;
    }
    const filtered = data.filter((d) => d.shopName === selectedShop);
    setTableData(filtered);
  }, [selectedShop, data]);

  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <Sidebar />
      </div>

      <div className="flex-1 min-w-0">
        <Navbar />
        <section className="p-6 md:p-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-slate-700">
              Claimed Tickets Dashboard
            </h1>
            
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-700 rounded-2xl shadow-xl p-6 space-y-6">
            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full bg-slate-800 text-slate-100 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-fuchsia-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full bg-slate-800 text-slate-100 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-fuchsia-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={fetchClaimedTickets}
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white font-bold hover:scale-105 transition-all duration-200 disabled:opacity-60"
                >
                  {loading ? "Loading..." : "Search"}
                </button>
              </div>
            </div>

            {/* Shop Dropdown */}
            <div>
              <label className="block text-slate-300 font-semibold mb-2">
                Select Shop Name
              </label>
              <select
                value={selectedShop}
                onChange={(e) => setSelectedShop(e.target.value)}
                className="w-full bg-slate-800 text-slate-100 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">-- Select Shop --</option>
                {shopNames.map((shop) => (
                  <option key={shop} value={shop}>
                    {shop}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="max-w-6xl mx-auto bg-slate-900/80 border border-slate-700 rounded-2xl shadow-2xl p-6">
            {loading ? (
              <div className="text-center text-slate-300 py-10">Loading data...</div>
            ) : tableData.length === 0 ? (
              <div className="text-center text-slate-400 py-10">
                No claimed ticket data found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-800 text-slate-200">
                      <th className="py-3 px-4 text-left">Draw Date</th>
                      <th className="py-3 px-4 text-left">Draw Time</th>
                      <th className="py-3 px-4 text-left">Total Quantity</th>
                      <th className="py-3 px-4 text-left">Ticket Numbers</th>
                      <th className="py-3 px-4 text-left">Claimed Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {tableData.map((item, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-slate-800/50 transition ${
                          index % 2 === 0 ? "bg-slate-900/30" : ""
                        }`}
                      >
                        <td className="py-3 px-4 text-slate-300">{item.drawDate}</td>
                        <td className="py-3 px-4 text-slate-300">{item.drawTime}</td>
                        <td className="py-3 px-4 text-cyan-400 font-semibold">
                          {item.totalQuantity}
                        </td>
                        <td className="py-3 px-4">
                          {Array.isArray(item.ticketNumbers) &&
                          item.ticketNumbers.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {item.ticketNumbers.map((num, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-fuchsia-600/20 border border-fuchsia-400/50 rounded-lg text-fuchsia-300 text-sm font-medium"
                                >
                                  {num ?? "—"}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-500">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-400">{item.claimedTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClaimedTicketsPage;
