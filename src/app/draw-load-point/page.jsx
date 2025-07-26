"use client";

import Navbar from '@/Components/Navbar/Navbar';
import Sidebar from '@/Components/Sidebar/Sidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaFilter, FaCalendarAlt, FaClock } from 'react-icons/fa';

const page = () => {
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // current date
  const [ticketData, setTicketData] = useState([]);
  const [summary, setSummary] = useState({
    qty10: 0,
    qty30: 0,
    qty50: 0,
    totalQty: 0,
    points10: 0,
    points30: 0,
    points50: 0,
    totalPoints: 0,
    totalCommission: 0,
    netAmount: 0
  });

  // Helper to format numbers
  const formatNumber = (num) => Number(num || 0).toFixed(2);

  // Fetch data on component mount
  useEffect(() => {
    fetchTicketSummary();
  }, []);

  const fetchTicketSummary = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/draw-details`);
      const tickets = res.data.tickets || [];

      // Filter for current date
      const todayTickets = tickets.filter(ticket =>
        new Date(ticket.createdAt).toISOString().split('T')[0] === date
      );

      // Calculate totals
      let qty10 = 0, qty30 = 0, qty50 = 0;
      let points10 = 0, points30 = 0, points50 = 0;
      let totalPoints = 0, totalCommission = 0, netAmount = 0;

      todayTickets.forEach(ticket => {
        qty10 += ticket.total10SeriesCount;
        qty30 += ticket.total30SeriesCount;
        qty50 += ticket.total50SeriesCount;

        points10 += ticket.total10SeriesPoints;
        points30 += ticket.total30SeriesPoints;
        points50 += ticket.total50SeriesPoints;

        totalPoints += ticket.totalPoints;
        totalCommission += ticket.shopAmount;
        netAmount += ticket.netAmount;
      });

      setTicketData(todayTickets);
      setSummary({
        qty10,
        qty30,
        qty50,
        totalQty: qty10 + qty30 + qty50,
        points10,
        points30,
        points50,
        totalPoints,
        totalCommission,
        netAmount
      });
    } catch (err) {
      console.error("Error fetching ticket summary:", err);
    }
  };

  // Pagination Logic
  const indexOfLast = currentPage * entries;
  const indexOfFirst = indexOfLast - entries;
  const currentTickets = ticketData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(ticketData.length / entries);

  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Sidebar />
      </div>

      <div className='w-full'>
        <Navbar />
        <div className="flex-1 p-8 overflow-x-hidden">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-5xl w-full text-center font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Printed Tickets
              </h1>
            </div>
            <p className="text-slate-600 text-lg w-full text-center">Manage and track your printed lottery tickets</p>
          </div>

          {/* Filter Section */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-8 rounded-3xl shadow-2xl mb-8 border border-slate-600/30">
            <div className="flex items-center gap-3 mb-6">
              <FaFilter className="text-purple-400 text-xl" />
              <h2 className="text-xl font-semibold text-white">Filter Options</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <FaCalendarAlt className="text-purple-400" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white outline-none rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <FaClock className="text-purple-400" />
                  Select Time
                </label>
                <select className="w-full px-6 py-4 bg-black/10 backdrop-blur-sm border border-white/20 text-white outline-none rounded-xl focus:ring-2 focus:ring-purple-400 hover:bg-white/15">
                  <option value="">Select Time</option>
                  {[...Array(48).keys()].map(i => {
                    const hours = Math.floor(i / 2);
                    const minutes = (i % 2) === 0 ? '00' : '30';
                    const time = `${hours === 0 ? '12' : hours % 12}:${minutes} ${hours < 12 ? 'AM' : 'PM'}`;
                    return <option key={i} value={time}>{time}</option>;
                  })}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={fetchTicketSummary}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <FaSearch className="text-lg" />
                  <span className="font-semibold">Search Tickets</span>
                </button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Ticket Quantities */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-2xl shadow-xl border border-slate-600/30">
              <h3 className="text-lg font-semibold text-white mb-4">Ticket Quantities</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300 font-medium">Qty of 10:</span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">{summary.qty10}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300 font-medium">Qty of 30:</span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">{summary.qty30}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300 font-medium">Qty of 50:</span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">{summary.qty50}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300 font-medium">Total Qty:</span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">{summary.totalQty}</span>
                </div>
              </div>
            </div>

            {/* Ticket Points */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-2xl shadow-xl border border-slate-600/30">
              <h3 className="text-lg font-semibold text-white mb-4">Ticket Points</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300 font-medium">Points of 10:</span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">{formatNumber(summary.points10)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300 font-medium">Points of 30:</span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">{formatNumber(summary.points30)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300 font-medium">Points of 50:</span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">{formatNumber(summary.points50)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300 font-medium">Total Points:</span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">{formatNumber(summary.totalPoints)}</span>
                </div>
              </div>
            </div>

            {/* Summary Totals */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-2xl shadow-xl border border-slate-600/30">
              <h3 className="text-lg font-semibold text-white mb-4">Summary Totals</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300 font-medium">Total Load:</span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">₹{formatNumber(summary.totalPoints)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300 font-medium">Total Commission:</span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">₹{formatNumber(summary.totalCommission)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300 font-medium">Net Amount:</span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">₹{formatNumber(summary.netAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-2xl shadow-xl border border-slate-600/30">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="px-6 py-4 text-left font-semibold text-purple-300 uppercase tracking-wider">Sr. No.</th>
                    <th className="px-6 py-4 text-left font-semibold text-purple-300 uppercase tracking-wider">Ticket Number</th>
                    <th className="px-6 py-4 text-left font-semibold text-purple-300 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-4 text-left font-semibold text-purple-300 uppercase tracking-wider">Shop Number</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-600">
                  {currentTickets.map((row, index) => (
                    <tr key={index} className="hover:bg-slate-700/50 transition-colors duration-200">
                      <td className="px-6 py-4 text-white font-medium">{indexOfFirst + index + 1}</td>
                      <td className="px-6 py-4 text-slate-300 font-mono">{row.id}</td>
                      <td className="px-6 py-4 text-slate-300 font-semibold">{row.totalQuantity}</td>
                      <td className="px-6 py-4 text-slate-300 font-mono">{row.loginId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex justify-between items-center text-slate-400">
              <span>Showing {indexOfFirst + 1} to {Math.min(indexOfLast, ticketData.length)} of {ticketData.length} entries</span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-slate-600 text-white rounded hover:bg-slate-500 transition-colors"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </button>
                {[...Array(totalPages).keys()].map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum + 1)}
                    className={`px-3 py-1 rounded ${currentPage === pageNum + 1
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-slate-600 text-white hover:bg-slate-500"
                      }`}
                  >
                    {pageNum + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 bg-slate-600 text-white rounded hover:bg-slate-500 transition-colors"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
