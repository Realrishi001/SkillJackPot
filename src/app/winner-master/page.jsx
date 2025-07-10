"use client";

import React, { useState } from 'react';
import Navbar from '@/Components/Navbar/Navbar';
import Sidebar from '@/Components/Sidebar/Sidebar';
import { FaRegCheckCircle, FaRegTimesCircle, FaPlus, FaEye, FaList, FaPercentage, FaCog, FaEdit, FaRandom, FaSave } from 'react-icons/fa';
import AddWinningDraw from '@/Components/AddWinningDraw/AddWinningDraw'; // Import AddWinningDraw Modal
import ViewWinningTicketsModal from '@/Components/ViewWinningTicketsModal/ViewWinningTicketsModal';
import ViewAllTicket from '@/Components/ViewAllTicket/ViewAllTicket';

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);
  const [isManual, setIsManual] = useState(true); // Manual/Auto mode state
  const [ticketNumbers, setTicketNumbers] = useState(Array(30).fill('')); // Ticket numbers state

  // Toggle between Manual and Auto mode
  const toggleMode = () => {
    setIsManual(!isManual);
  };

  // Handle input change for ticket numbers
  const handleInputChange = (index, value) => {
    const newTicketNumbers = [...ticketNumbers];
    newTicketNumbers[index] = value;
    setTicketNumbers(newTicketNumbers);
  };

  // Shuffle function
  const shuffleNumbers = () => {
    const shuffled = [...ticketNumbers].sort(() => Math.random() - 0.5);
    setTicketNumbers(shuffled);
  };

  // Modal open and close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openViewModal = () => setIsViewModalOpen(true);
  const closeViewModal = () => setIsViewModalOpen(false);
  const openViewAllModal = () => setIsViewAllModalOpen(true);
  const closeViewAllModal = () => setIsViewAllModalOpen(false);

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

              <button className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <FaPercentage />
                Set Winning Percentage
              </button>

              <button className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <FaCog />
                Set Mode
              </button>
            </div>
          </div>

          {/* Ticket Numbers Section */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-2xl shadow-xl mb-8 border border-slate-600/30">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  Ticket Numbers
                </h2>
                <p className="text-slate-400">Enter up to 30 ticket numbers for the draw</p>
              </div>

              <div className="flex gap-3 mt-4 md:mt-0">
                <button 
                  onClick={shuffleNumbers}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FaRandom />
                  Shuffle
                </button>

                <button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <FaSave />
                  Save
                </button>
              </div>
            </div>

            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {[...Array(30)].map((_, index) => (
                <div key={index} className="relative">
                  <label className="block text-xs text-slate-400 mb-1 font-medium">
                    Ticket #{index + 1}
                  </label>
                  <input
                    type="number"
                    value={ticketNumbers[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/15 text-center font-mono"
                    placeholder="0000"
                    min="0"
                    max="9999"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Winning Draw Modal */}
        <AddWinningDraw isOpen={isModalOpen} onClose={closeModal} />
        <ViewWinningTicketsModal isOpen={isViewModalOpen} onClose={closeViewModal} />
        <ViewAllTicket isOpen={isViewAllModalOpen} onClose={closeViewAllModal}/>
      </div>
    </div>
  );
};

export default page;
