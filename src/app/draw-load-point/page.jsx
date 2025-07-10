"use client"

import Navbar from '@/Components/Navbar/Navbar';
import Sidebar from '@/Components/Sidebar/Sidebar';
import React, { useState } from 'react';
import { FaSearch, FaFilter, FaDownload, FaCalendarAlt, FaClock } from 'react-icons/fa';

const page = () => {
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Sidebar />
      </div>

      <div className='w-full'>
         <Navbar />
        <div className="flex-1 p-8 overflow-x-hidden">
       

        {/* Enhanced Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-5xl w-full text-center font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Printed Tickets
            </h1>
           
          </div>
          <p className="text-slate-600 text-lg w-full text-center">Manage and track your printed lottery tickets</p>
        </div>

        {/* Enhanced Search Filters Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-8 rounded-3xl shadow-2xl mb-8 border border-slate-600/30">
          <div className="flex items-center gap-3 mb-6">
            <FaFilter className="text-purple-400 text-xl" />
            <h2 className="text-xl font-semibold text-white">Filter Options</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Enhanced Date Picker */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <FaCalendarAlt className="text-purple-400" />
                Select Date
              </label>
              <input
                type="date"
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
              />
            </div>

            {/* Enhanced Time Picker */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <FaClock className="text-purple-400" />
                Select Time
              </label>
              <select
  className="w-full px-6 py-4 bg-black/10 backdrop-blur-sm border border-white/20 text-white outline-none rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/15 focus:text-black"
>
  <option className="text-gray-400" value="">Select Time</option>
  {[...Array(48).keys()].map(i => {
    const hours = Math.floor(i / 2);
    const minutes = (i % 2) === 0 ? '00' : '30';
    const time = `${hours === 0 ? '12' : hours % 12}:${minutes} ${hours < 12 ? 'AM' : 'PM'}`;
    return <option key={i} value={time} className="text-gray-400">{time}</option>;
  })}
</select>

            </div>

            {/* Enhanced Search Button */}
            <div className="flex items-end">
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <FaSearch className="text-lg" />
                <span className="font-semibold">Search Tickets</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Ticket Quantities Card */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-2xl shadow-xl border border-slate-600/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              Ticket Quantities
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Qty of 10', value: '43' },
                { label: 'Qty of 15', value: '43' },
                { label: 'Qty of 50', value: '43' },
                { label: 'Total Qty', value: '129' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300 font-medium">{item.label}:</span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Points & Commission Card */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-2xl shadow-xl border border-slate-600/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              Points & Commission
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Points of 10', value: '43' },
                { label: 'Points of 15', value: '43' },
                { label: 'Points of 50', value: '43' },
                { label: 'Total Points', value: '129' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300 font-medium">{item.label}:</span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Totals Card */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-2xl shadow-xl border border-slate-600/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              Summary Totals
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Total Load', value: '₹43,000' },
                { label: 'Total Commission', value: '₹4,300' },
                { label: 'Net Amount', value: '₹38,700' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300 font-medium">{item.label}:</span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Table Controls */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-2xl shadow-xl mb-6 border border-slate-600/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Show Entries */}
            <div className="flex items-center gap-3">
              <span className="text-white font-medium">Show</span>
              <select
                value={entries}
                onChange={(e) => setEntries(e.target.value)}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="text-white font-medium">entries</span>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-3">
              <span className="text-white font-medium">Search:</span>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by ticket number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 pl-10 pr-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 w-64"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Data Table */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-2xl shadow-xl border border-slate-600/30">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="px-6 py-4 text-left font-semibold text-purple-300 uppercase tracking-wider">
                    Sr. No.
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-purple-300 uppercase tracking-wider">
                    Ticket Number
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-purple-300 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-purple-300 uppercase tracking-wider">
                    Shop ID
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-purple-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600">
                {[
                  { ticketNumber: 1000, qty: 43, shopId: 'SJ45970', status: 'Active' },
                  { ticketNumber: 1001, qty: 25, shopId: 'SJ45971', status: 'Active' },
                  { ticketNumber: 1002, qty: 50, shopId: 'SJ45972', status: 'Sold' },
                  { ticketNumber: 1003, qty: 15, shopId: 'SJ45973', status: 'Active' },
                  { ticketNumber: 1004, qty: 30, shopId: 'SJ45974', status: 'Pending' }
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-slate-700/50 transition-colors duration-200">
                    <td className="px-6 py-4 text-white font-medium">{index + 1}</td>
                    <td className="px-6 py-4 text-slate-300 font-mono">{row.ticketNumber}</td>
                    <td className="px-6 py-4 text-slate-300 font-semibold">{row.qty}</td>
                    <td className="px-6 py-4 text-slate-300 font-mono">{row.shopId}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        row.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                        row.status === 'Sold' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer */}
          <div className="mt-6 flex justify-between items-center text-slate-400">
            <span>Showing 1 to 5 of 5 entries</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-slate-600 text-white rounded hover:bg-slate-500 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 bg-slate-600 text-white rounded hover:bg-slate-500 transition-colors">
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