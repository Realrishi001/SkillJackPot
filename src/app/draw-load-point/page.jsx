"use client";

import Navbar from '@/Components/Navbar/Navbar';
import Sidebar from '@/Components/Sidebar/Sidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaFilter, FaCalendarAlt, FaClock } from 'react-icons/fa';

const PAGE_LIMIT_OPTIONS = [10, 20, 50, 100];

function formatTicketNumber(num) {
  // Converts '10-12' to '1012'
  return num.replace("-", "");
}

// Merge rows for shop+ticketNumber+quantity, summing the quantity if needed
function mergeRows(data, seriesKey) {
  const merged = {};
  data.forEach(ticket => {
    const shop = ticket.shopId || ticket.loginId;
    if (!ticket[seriesKey]) return;
    ticket[seriesKey].forEach(entry => {
      const ticketNum = formatTicketNumber(entry.ticketNumber);
      const key = `${shop}_${ticketNum}`;
      if (!merged[key]) {
        merged[key] = {
          shop,
          ticketNumber: ticketNum,
          quantity: entry.quantity
        };
      } else {
        merged[key].quantity += entry.quantity;
      }
    });
  });
  // Return as array
  return Object.values(merged);
}

// Helper to generate page numbers with ellipsis
function getPagination(current, total) {
  let delta = 2;
  let range = [];
  let rangeWithDots = [];
  let l;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }
  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
}

const page = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [summary, setSummary] = useState({
    qty10: 0, qty30: 0, qty50: 0, totalQty: 0,
    points10: 0, points30: 0, points50: 0,
    totalPoints: 0, totalCommission: 0, netAmount: 0
  });
  const [seriesTableData, setSeriesTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Per-table limit & paging
  const [tableStates, setTableStates] = useState({
    series10: { limit: 10, page: 1 },
    series30: { limit: 10, page: 1 },
    series50: { limit: 10, page: 1 },
  });

  // Fetch summary cards
  const fetchSummary = async (selectedDate) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/draw-details`);
      const tickets = res.data.tickets || [];
      const filtered = tickets.filter(ticket =>
        new Date(ticket.createdAt).toISOString().split('T')[0] === selectedDate
      );
      let qty10 = 0, qty30 = 0, qty50 = 0;
      let points10 = 0, points30 = 0, points50 = 0;
      let totalPoints = 0, totalCommission = 0, netAmount = 0;
      filtered.forEach(ticket => {
        qty10 += ticket.total10SeriesCount || 0;
        qty30 += ticket.total30SeriesCount || 0;
        qty50 += ticket.total50SeriesCount || 0;
        points10 += ticket.total10SeriesPoints || 0;
        points30 += ticket.total30SeriesPoints || 0;
        points50 += ticket.total50SeriesPoints || 0;
        totalPoints += ticket.totalPoints || 0;
        totalCommission += ticket.shopAmount || 0;
        netAmount += ticket.netAmount || 0;
      });
      setSummary({
        qty10, qty30, qty50,
        totalQty: qty10 + qty30 + qty50,
        points10, points30, points50,
        totalPoints, totalCommission, netAmount
      });
    } catch (err) { console.error("Error fetching summary:", err); }
  };

  // Fetch table-draw-details for bottom tables
  const fetchSeriesTables = async (selectedDate) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/table-draw-details`);
      const tickets = res.data.tickets || [];
      const filtered = tickets.filter(ticket =>
        new Date(ticket.createdAt).toISOString().split('T')[0] === selectedDate
      );
      setSeriesTableData(filtered);
    } catch (err) { console.error("Error fetching table series:", err); }
  };

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchSummary(date), fetchSeriesTables(date)]);
    setLoading(false);
    // Reset table page to 1 on search
    setTableStates(s => ({
      series10: { ...s.series10, page: 1 },
      series30: { ...s.series30, page: 1 },
      series50: { ...s.series50, page: 1 },
    }));
  };

  useEffect(() => { fetchAll(); /* eslint-disable-next-line */ }, []);

  const handleSearch = () => { fetchAll(); };

  // Per-table: limit select, page controls, data slice
  const handleLimitChange = (series, value) => {
    setTableStates(s => ({ ...s, [series]: { ...s[series], limit: value, page: 1 } }));
  };
  const handlePageChange = (series, page) => {
    setTableStates(s => ({ ...s, [series]: { ...s[series], page } }));
  };

  // Table renderer
  const renderSeriesTable = (seriesKey, color, title, headerColor) => {
    // Prepare merged and sliced data
    const merged = mergeRows(seriesTableData, seriesKey);
    const { limit, page } = tableStates[seriesKey];
    const totalRows = merged.length;
    const totalPages = Math.ceil(totalRows / limit) || 1;
    const startIdx = (page - 1) * limit;
    const pageRows = merged.slice(startIdx, startIdx + limit);

    return (
      <div className={`bg-gradient-to-b from-slate-800 to-slate-700 p-6 rounded-2xl shadow-xl border ${color}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-2xl font-bold text-center ${headerColor}`}>{title}</h2>
          {/* Limit dropdown */}
          <select
            value={limit}
            onChange={e => handleLimitChange(seriesKey, Number(e.target.value))}
            className="bg-slate-900 border border-slate-500 text-white rounded px-3 py-1 ml-3 text-sm"
          >
            {PAGE_LIMIT_OPTIONS.map(opt =>
              <option key={opt} value={opt}>{opt}</option>
            )}
          </select>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="px-3 py-2 text-left font-semibold text-white">Shop Number</th>
              <th className="px-3 py-2 text-left font-semibold text-white">Ticket Number</th>
              <th className="px-3 py-2 text-left font-semibold text-white">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-600">
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-slate-400 py-8">No data</td>
              </tr>
            ) : (
              pageRows.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-3 py-2 text-white">{row.shop}</td>
                  <td className="px-3 py-2 text-slate-300">{row.ticketNumber}</td>
                  <td className="px-3 py-2 text-slate-300">{row.quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* Pagination controls */}
        <div className="flex flex-col gap-5 justify-end items-center mt-4 text-slate-400 text-xs">
          
          <div className="flex gap-1 flex-wrap">
            <button
              className="px-2 py-1 rounded bg-slate-700 text-white hover:bg-slate-600"
              onClick={() => handlePageChange(seriesKey, Math.max(1, page - 1))}
              disabled={page === 1}
            >Previous</button>
            {getPagination(page, totalPages).map((num, i) =>
              num === '...' ? (
                <span key={`dots-${i}`} className="px-2 py-1 text-slate-500">...</span>
              ) : (
                <button
                  key={num}
                  onClick={() => handlePageChange(seriesKey, num)}
                  className={`px-2 py-1 rounded ${page === num
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-slate-700 text-white hover:bg-slate-600"}`}
                >{num}</button>
              )
            )}
            <button
              className="px-2 py-1 rounded bg-slate-700 text-white hover:bg-slate-600"
              onClick={() => handlePageChange(seriesKey, Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            >Next</button>
          </div>
        </div>
      </div>
    );
  };

  const formatNumber = (num) => Number(num || 0).toFixed(2);

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
                  onChange={e => setDate(e.target.value)}
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
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  disabled={loading}
                >
                  <FaSearch className="text-lg" />
                  <span className="font-semibold">{loading ? "Searching..." : "Search Tickets"}</span>
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

          {/* Three Series Tables Side by Side at the bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {renderSeriesTable('series10', 'border-purple-700/40', '10 Series', 'text-purple-400')}
            {renderSeriesTable('series30', 'border-pink-700/40', '30 Series', 'text-pink-400')}
            {renderSeriesTable('series50', 'border-blue-700/40', '50 Series', 'text-blue-400')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
