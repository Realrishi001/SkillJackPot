"use client";

import React, { useState } from 'react';
import Navbar from '@/Components/Navbar/Navbar';
import Sidebar from '@/Components/Sidebar/Sidebar';
import { FaRegCheckCircle, FaRegTimesCircle, FaPlus, FaEye, FaList, FaPercentage, FaCog, FaEdit, FaRandom, FaSave } from 'react-icons/fa';
import AddWinningDraw from '@/Components/AddWinningDraw/AddWinningDraw';
import ViewWinningTicketsModal from '@/Components/ViewWinningTicketsModal/ViewWinningTicketsModal';
import ViewAllTicket from '@/Components/ViewAllTicket/ViewAllTicket';
import UpdateWinningPercentageModal from '@/Components/SetWinningPercentage/SetWinningPercentage';

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);
  const [isManual, setIsManual] = useState(true);
  const [isWinningPercentageModalOpen, setIsWinningPercentageModalOpen] = useState(false);
  const [winningPercentage, setWinningPercentage] = useState(50); // Example initial value, or fetch from API


  // Separate state for each column - only last 2 digits
  const [column1Numbers, setColumn1Numbers] = useState(Array(10).fill(''));
  const [column2Numbers, setColumn2Numbers] = useState(Array(10).fill(''));
  const [column3Numbers, setColumn3Numbers] = useState(Array(10).fill(''));

  // Per-row outputs for each column
  const [column1RowOutputs, setColumn1RowOutputs] = useState(Array(10).fill(['--', '--']));
  const [column2RowOutputs, setColumn2RowOutputs] = useState(Array(10).fill(['--', '--']));
  const [column3RowOutputs, setColumn3RowOutputs] = useState(Array(10).fill(['--', '--']));

  // Static base numbers for each column
  const column1Base = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const column2Base = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
  const column3Base = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59];

  const toggleMode = () => {
    setIsManual(!isManual);
  };

  // Input change handlers
  const handleColumn1Change = (index, value) => {
    const newNumbers = [...column1Numbers];
    newNumbers[index] = value;
    setColumn1Numbers(newNumbers);
  };
  const handleColumn2Change = (index, value) => {
    const newNumbers = [...column2Numbers];
    newNumbers[index] = value;
    setColumn2Numbers(newNumbers);
  };
  const handleColumn3Change = (index, value) => {
    const newNumbers = [...column3Numbers];
    newNumbers[index] = value;
    setColumn3Numbers(newNumbers);
  };

  // Generate random outputs for each static number (row)
  const generateRandomOutputs = () => {
    // Column 1
    setColumn1RowOutputs(
      column1Base.map((base, i) => {
        // Use existing user-entered value if available, otherwise random
        const rand1 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        const rand2 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        return [`${base}${rand1}`, `${base}${rand2}`];
      })
    );
    // Column 2
    setColumn2RowOutputs(
      column2Base.map((base, i) => {
        const rand1 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        const rand2 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        return [`${base}${rand1}`, `${base}${rand2}`];
      })
    );
    // Column 3
    setColumn3RowOutputs(
      column3Base.map((base, i) => {
        const rand1 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        const rand2 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        return [`${base}${rand1}`, `${base}${rand2}`];
      })
    );
  };

  // Shuffle functions for each column (kept same as before)
  const shuffleColumn1 = () => {
    const shuffled = [...column1Numbers].sort(() => Math.random() - 0.5);
    setColumn1Numbers(shuffled);
  };
  const shuffleColumn2 = () => {
    const shuffled = [...column2Numbers].sort(() => Math.random() - 0.5);
    setColumn2Numbers(shuffled);
  };
  const shuffleColumn3 = () => {
    const shuffled = [...column3Numbers].sort(() => Math.random() - 0.5);
    setColumn3Numbers(shuffled);
  };

  // Modal open and close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openViewModal = () => setIsViewModalOpen(true);
  const closeViewModal = () => setIsViewModalOpen(false);
  const openViewAllModal = () => setIsViewAllModalOpen(true);
  const closeViewAllModal = () => setIsViewAllModalOpen(false);
  const openWinningPercentageModal = () => setIsWinningPercentageModalOpen(true);
  const closeWinningPercentageModal = () => setIsWinningPercentageModalOpen(false);


  return (
    <div className="flex min-h-screen">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Sidebar />
      </div>
      <div className="flex-1 bg-gray-200">
        <Navbar />

        {/* Main Content */}
        <div className="p-8">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-2xl shadow-xl mb-8 border border-slate-600/30">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  Winner Master
                </h1>
                <p className="text-slate-400 text-lg">Manage lottery draws and winning tickets</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">Mode:</span>
                <button
                  onClick={toggleMode}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isManual 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg' 
                      : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 shadow-lg'
                  }`}
                >
                  {isManual ? (
                    <>
                      <FaRegCheckCircle />
                      Manual
                    </>
                  ) : (
                    <>
                      <FaRegTimesCircle />
                      Auto
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-2xl shadow-xl mb-8 border border-slate-600/30">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <button
                className={`flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isManual 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg' 
                    : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                }`}
                disabled={!isManual}
                onClick={openModal}
              >
                <FaPlus />
                Add Winning Draw
              </button>
              <button className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={openViewModal}
              >
                <FaEye />
                View Winning Tickets
              </button>
              <button className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={openViewAllModal}
              >
                <FaList />
                View All Tickets
              </button>
             <button
  className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
  onClick={openWinningPercentageModal}
>
  <FaPercentage />
  Set Winning Percentage
</button>

              <button className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <FaCog />
                Set Mode
              </button>
            </div>
          </div>

          {/* Three Columns Section */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  {/* Column 1: 10-19 */}
  <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-600/30">
    <div className="flex justify-between items-center mb-3">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-1 flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
          Range 10-19
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">Static range tickets</p>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-2 mb-4">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="flex items-center gap-2">
          {/* Static Number Display */}
          <div className="w-16 sm:w-20 h-12 sm:h-14 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 rounded-lg flex items-center justify-center">
            <span className="text-purple-300 font-bold text-lg sm:text-xl">{column1Base[index]}</span>
          </div>
          {/* Input for last 2 digits */}
          <div className="flex-1">
            <input
              type="number"
              value={column1Numbers[index]}
              onChange={(e) => handleColumn1Change(index, e.target.value)}
              className="w-full h-12 sm:h-14 text-lg sm:text-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 px-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/15 text-center font-mono"
              placeholder="00"
              min="0"
              max="99"
              maxLength="2"
            />
          </div>
          {/* Complete Number Display */}
          <div className="w-20 h-12 sm:w-24 sm:h-14 bg-slate-700/50 border border-slate-600 rounded-lg flex items-center justify-center">
            <span className="text-slate-300 font-mono text-base sm:text-lg">
              {column1Numbers[index] ? `${column1Base[index]}${column1Numbers[index].padStart(2, '0')}` : '----'}
            </span>
          </div>
          {/* Output box */}
          <div className="w-20 h-12 sm:w-20 sm:h-14 bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-lg flex items-center justify-center text-green-400 font-mono font-bold text-base sm:text-lg">
            {column1RowOutputs[index][0]}
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Column 2: 30-39 */}
  <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-600/30">
    <div className="flex justify-between items-center mb-3">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-1 flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
          Range 30-39
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">Static range tickets</p>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-2 mb-4">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="w-16 sm:w-20 h-12 sm:h-14 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 rounded-lg flex items-center justify-center">
            <span className="text-purple-300 font-bold text-lg sm:text-xl">{column2Base[index]}</span>
          </div>
          <div className="flex-1">
            <input
              type="number"
              value={column2Numbers[index]}
              onChange={(e) => handleColumn2Change(index, e.target.value)}
              className="w-full h-12 sm:h-14 text-lg sm:text-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 px-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/15 text-center font-mono"
              placeholder="00"
              min="0"
              max="99"
              maxLength="2"
            />
          </div>
          <div className="w-20 h-12 sm:w-24 sm:h-14 bg-slate-700/50 border border-slate-600 rounded-lg flex items-center justify-center">
            <span className="text-slate-300 font-mono text-base sm:text-lg">
              {column2Numbers[index] ? `${column2Base[index]}${column2Numbers[index].padStart(2, '0')}` : '----'}
            </span>
          </div>
          <div className="w-20 h-12 sm:w-20 sm:h-14 bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-lg flex items-center justify-center text-green-400 font-mono font-bold text-base sm:text-lg">
            {column2RowOutputs[index][0]}
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Column 3: 50-59 */}
  <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-600/30">
    <div className="flex justify-between items-center mb-3">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-1 flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
          Range 50-59
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">Static range tickets</p>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-2 mb-4">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="w-16 sm:w-20 h-12 sm:h-14 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 rounded-lg flex items-center justify-center">
            <span className="text-purple-300 font-bold text-lg sm:text-xl">{column3Base[index]}</span>
          </div>
          <div className="flex-1">
            <input
              type="number"
              value={column3Numbers[index]}
              onChange={(e) => handleColumn3Change(index, e.target.value)}
              className="w-full h-12 sm:h-14 text-lg sm:text-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 px-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/15 text-center font-mono"
              placeholder="00"
              min="0"
              max="99"
              maxLength="2"
            />
          </div>
          <div className="w-20 h-12 sm:w-24 sm:h-14 bg-slate-700/50 border border-slate-600 rounded-lg flex items-center justify-center">
            <span className="text-slate-300 font-mono text-base sm:text-lg">
              {column3Numbers[index] ? `${column3Base[index]}${column3Numbers[index].padStart(2, '0')}` : '----'}
            </span>
          </div>
          <div className="w-20 h-12 sm:w-20 sm:h-14 bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-lg flex items-center justify-center text-green-400 font-mono font-bold text-base sm:text-lg">
            {column3RowOutputs[index][0]}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>



          {/* Global Action Buttons */}
          <div className="mt-8 bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-2xl shadow-xl border border-slate-600/30">
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={generateRandomOutputs}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <FaRandom />
                Generate Random Outputs
              </button>
              <button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <FaSave />
                Save All Data
              </button>
            </div>
          </div>
        </div>

        {/* Add Winning Draw Modal */}
        <AddWinningDraw isOpen={isModalOpen} onClose={closeModal} />
        <ViewWinningTicketsModal isOpen={isViewModalOpen} onClose={closeViewModal} />
        <ViewAllTicket isOpen={isViewAllModalOpen} onClose={closeViewAllModal}/>
        <UpdateWinningPercentageModal
            isOpen={isWinningPercentageModalOpen}
            onClose={closeWinningPercentageModal}
            onUpdate={val => setWinningPercentage(val)} // Add API call here if needed
            currentPercentage={winningPercentage}
          />

      </div>
    </div>
  );
};

export default page;
