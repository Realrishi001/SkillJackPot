"use client"

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // For Close Icon

const ViewAllTicket = ({ isOpen, onClose }) => {
  const [shop, setShop] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here to filter based on the selected date range and shop
    console.log('Shop:', shop, 'From Date:', fromDate, 'To Date:', toDate);
    onClose(); // Close modal after submission
  };

  // Static data for the table
  const ticketsData = [
    { srNo: 1, ticketNo: '1001', totalPoints: 100, winningPoints: 50, winningTickets: 'Yes' },
    { srNo: 2, ticketNo: '1002', totalPoints: 150, winningPoints: 75, winningTickets: 'Yes' },
    { srNo: 3, ticketNo: '1003', totalPoints: 200, winningPoints: 100, winningTickets: 'Yes' },
    { srNo: 4, ticketNo: '1004', totalPoints: 250, winningPoints: 125, winningTickets: 'Yes' },
    { srNo: 5, ticketNo: '1005', totalPoints: 300, winningPoints: 150, winningTickets: 'Yes' }
  ];

  if (!isOpen) return null; // Modal doesn't render if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/50">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">View All Winning Tickets</h2>
          <button onClick={onClose} className="text-white text-2xl">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Shop Select Field */}
          <div className="mb-6">
            <label className="block text-sm text-white mb-2">Shop</label>
            <select
              value={shop}
              onChange={(e) => setShop(e.target.value)}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
              required
            >
              <option value="">Select Shop</option>
              <option value="Shop 1">Shop 1</option>
              <option value="Shop 2">Shop 2</option>
              <option value="Shop 3">Shop 3</option>
              <option value="Shop 4">Shop 4</option>
            </select>
          </div>

          {/* From Date Field */}
          <div className="mb-6">
            <label className="block text-sm text-white mb-2">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          {/* To Date Field */}
          <div className="mb-6">
            <label className="block text-sm text-white mb-2">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          {/* View Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              View
            </button>
          </div>
        </form>

        {/* Table */}
        <div className="mt-6">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-xs uppercase bg-gradient-to-r from-slate-800 to-slate-700">
              <tr>
                <th className="px-6 py-4">Sr No</th>
                <th className="px-6 py-4">Ticket No</th>
                <th className="px-6 py-4">Total Points</th>
                <th className="px-6 py-4">Winning Points</th>
                <th className="px-6 py-4">Winning Tickets</th>
              </tr>
            </thead>
            <tbody>
              {ticketsData.map((ticket) => (
                <tr key={ticket.srNo} className="border-b border-slate-600">
                  <td className="px-6 py-4">{ticket.srNo}</td>
                  <td className="px-6 py-4">{ticket.ticketNo}</td>
                  <td className="px-6 py-4">{ticket.totalPoints}</td>
                  <td className="px-6 py-4">{ticket.winningPoints}</td>
                  <td className="px-6 py-4">{ticket.winningTickets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAllTicket;
