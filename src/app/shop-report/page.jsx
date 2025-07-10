"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaCalendarAlt, FaSearch, FaFilter, FaFileExcel, FaStore, FaTicketAlt, FaCoins, FaTrophy, FaBalanceScale } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import Navbar from '@/Components/Navbar/Navbar';
import Sidebar from '@/Components/Sidebar/Sidebar';

const page = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Static data for the shop report table
  const [shopReports, setShopReports] = useState([
    {
      shopId: 'SJ45970',
      shopName: 'Shop 1',
      totalTickets: 100,
      totalPoints: 500,
      netPoints: 450,
      winningTickets: 30,
      shopPoint: 200,
      dPoint: 100,
      sdPoint: 50,
      adminPoint: 100,
      balance: 5000
    },
    {
      shopId: 'SJ45971',
      shopName: 'Shop 2',
      totalTickets: 150,
      totalPoints: 600,
      netPoints: 550,
      winningTickets: 50,
      shopPoint: 250,
      dPoint: 120,
      sdPoint: 70,
      adminPoint: 150,
      balance: 6000
    },
    {
      shopId: 'SJ45972',
      shopName: 'Shop 3',
      totalTickets: 200,
      totalPoints: 700,
      netPoints: 650,
      winningTickets: 70,
      shopPoint: 300,
      dPoint: 140,
      sdPoint: 80,
      adminPoint: 180,
      balance: 7000
    },
    {
      shopId: 'SJ45973',
      shopName: 'Shop 4',
      totalTickets: 80,
      totalPoints: 400,
      netPoints: 350,
      winningTickets: 25,
      shopPoint: 180,
      dPoint: 90,
      sdPoint: 40,
      adminPoint: 90,
      balance: 4500
    },
    {
      shopId: 'SJ45974',
      shopName: 'Shop 5',
      totalTickets: 300,
      totalPoints: 900,
      netPoints: 850,
      winningTickets: 100,
      shopPoint: 400,
      dPoint: 200,
      sdPoint: 100,
      adminPoint: 250,
      balance: 8500
    }
  ]);

  // Filter shops based on search term
  const filteredShops = shopReports.filter(shop => 
    shop.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.shopId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate totals
  const totals = filteredShops.reduce((acc, shop) => ({
    totalTickets: acc.totalTickets + shop.totalTickets,
    totalPoints: acc.totalPoints + shop.totalPoints,
    netPoints: acc.netPoints + shop.netPoints,
    winningTickets: acc.winningTickets + shop.winningTickets,
    shopPoint: acc.shopPoint + shop.shopPoint,
    dPoint: acc.dPoint + shop.dPoint,
    sdPoint: acc.sdPoint + shop.sdPoint,
    adminPoint: acc.adminPoint + shop.adminPoint,
    balance: acc.balance + shop.balance
  }), {
    totalTickets: 0,
    totalPoints: 0,
    netPoints: 0,
    winningTickets: 0,
    shopPoint: 0,
    dPoint: 0,
    sdPoint: 0,
    adminPoint: 0,
    balance: 0
  });

  // Export to Excel function
  const handleExport = () => {
    try {
      // Prepare data for Excel
      const excelData = filteredShops.map(shop => ({
        'Shop ID': shop.shopId,
        'Shop Name': shop.shopName,
        'Total Tickets': shop.totalTickets,
        'Total Points': shop.totalPoints,
        'Net Points': shop.netPoints,
        'Winning Tickets': shop.winningTickets,
        'Shop Points': shop.shopPoint,
        'D Points': shop.dPoint,
        'SD Points': shop.sdPoint,
        'Admin Points': shop.adminPoint,
        'Balance': shop.balance
      }));

      // Add totals row
      excelData.push({
        'Shop ID': 'TOTAL',
        'Shop Name': '',
        'Total Tickets': totals.totalTickets,
        'Total Points': totals.totalPoints,
        'Net Points': totals.netPoints,
        'Winning Tickets': totals.winningTickets,
        'Shop Points': totals.shopPoint,
        'D Points': totals.dPoint,
        'SD Points': totals.sdPoint,
        'Admin Points': totals.adminPoint,
        'Balance': totals.balance
      });

      // Create workbook and worksheet
      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Shop Report');

      // Set column widths
      const colWidths = [
        { wch: 12 }, // Shop ID
        { wch: 15 }, // Shop Name
        { wch: 12 }, // Total Tickets
        { wch: 12 }, // Total Points
        { wch: 12 }, // Net Points
        { wch: 15 }, // Winning Tickets
        { wch: 12 }, // Shop Points
        { wch: 10 }, // D Points
        { wch: 10 }, // SD Points
        { wch: 12 }, // Admin Points
        { wch: 12 }  // Balance
      ];
      ws['!cols'] = colWidths;

      // Generate filename with current date
      const currentDate = new Date().toISOString().split('T')[0];
      const filename = `Shop_Report_${currentDate}.xlsx`;

      // Save file
      XLSX.writeFile(wb, filename);
      
      console.log("Shop Report exported successfully!");
    } catch (error) {
      console.error("Error exporting file:", error);
    }
  };

  const handleSubmit = () => {
    // Filter logic based on date range
    console.log("Filtering from:", dateFrom, "to:", dateTo);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className='bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
          {/* Header Section */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
            >
              <div>
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 mb-2">
                  Shop Reports
                </h1>
                <p className="text-slate-600 text-lg">Monitor and analyze shop performance</p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExport}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <FaFileExcel className="text-lg group-hover:bounce transition-transform duration-300" />
                <span>Export to Excel</span>
              </motion.button>
            </motion.div>
          </div>


          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaFilter className="text-slate-600" />
              <h2 className="text-xl font-bold text-slate-700">Filters & Search</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Search Shops</label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by shop name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">From Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">To Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 hover:from-purple-700 hover:to-pink-700 shadow-lg"
                >
                  Apply Filters
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Shop Report Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">Shop Performance Report</h2>
              <p className="text-slate-300 mt-1">Detailed analysis of shop metrics and performance</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-slate-600 font-semibold">Shop ID</th>
                    <th className="px-6 py-4 text-left text-slate-600 font-semibold">Shop Name</th>
                    <th className="px-6 py-4 text-left text-slate-600 font-semibold">Total Tickets</th>
                    <th className="px-6 py-4 text-left text-slate-600 font-semibold">Total Points</th>
                    <th className="px-6 py-4 text-left text-slate-600 font-semibold">Net Points</th>
                    <th className="px-6 py-4 text-left text-slate-600 font-semibold">Winning Tickets</th>
                    <th className="px-6 py-4 text-left text-slate-600 font-semibold">Shop Points</th>
                    <th className="px-6 py-4 text-left text-slate-600 font-semibold">D Points</th>
                    <th className="px-6 py-4 text-left text-slate-600 font-semibold">SD Points</th>
                    <th className="px-6 py-4 text-left text-slate-600 font-semibold">Admin Points</th>
                    <th className="px-6 py-4 text-left text-slate-600 font-semibold">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShops.map((report, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                            <FaStore className="text-white text-sm" />
                          </div>
                          <span className="font-semibold text-slate-700">{report.shopId}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-700 font-medium">{report.shopName}</td>
                      <td className="px-6 py-4 text-slate-600">{report.totalTickets.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-600">{report.totalPoints.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-600">{report.netPoints.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FaTrophy className="text-yellow-500" />
                          <span className="text-slate-600">{report.winningTickets}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{report.shopPoint.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-600">{report.dPoint.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-600">{report.sdPoint.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-600">{report.adminPoint.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          ₹{report.balance.toLocaleString()}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                  
                  {/* Totals Row */}
                  <tr className="bg-slate-800 text-white font-bold">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                          <FaCoins className="text-white text-sm" />
                        </div>
                        <span>TOTAL</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">-</td>
                    <td className="px-6 py-4">{totals.totalTickets.toLocaleString()}</td>
                    <td className="px-6 py-4">{totals.totalPoints.toLocaleString()}</td>
                    <td className="px-6 py-4">{totals.netPoints.toLocaleString()}</td>
                    <td className="px-6 py-4">{totals.winningTickets.toLocaleString()}</td>
                    <td className="px-6 py-4">{totals.shopPoint.toLocaleString()}</td>
                    <td className="px-6 py-4">{totals.dPoint.toLocaleString()}</td>
                    <td className="px-6 py-4">{totals.sdPoint.toLocaleString()}</td>
                    <td className="px-6 py-4">{totals.adminPoint.toLocaleString()}</td>
                    <td className="px-6 py-4">₹{totals.balance.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default page;