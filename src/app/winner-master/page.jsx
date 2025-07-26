"use client";

import React, { useState } from 'react';
import Navbar from '@/Components/Navbar/Navbar';
import Sidebar from '@/Components/Sidebar/Sidebar';
import { FaRegCheckCircle, FaRegTimesCircle, FaPlus, FaEye, FaList, FaPercentage, FaCog, FaRandom, FaSave } from 'react-icons/fa';
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
  const [winningPercentage, setWinningPercentage] = useState(50);

  // Static base numbers
  const column1Base = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const column2Base = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
  const column3Base = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59];

  // State for user inputs (only 2 digits allowed)
  const [column1Numbers, setColumn1Numbers] = useState(Array(10).fill(''));
  const [column2Numbers, setColumn2Numbers] = useState(Array(10).fill(''));
  const [column3Numbers, setColumn3Numbers] = useState(Array(10).fill(''));

  // Outputs (right side)
  const [column1RowOutputs, setColumn1RowOutputs] = useState(
    column1Base.map(base => [`${base}00`, '--'])
  );
  const [column2RowOutputs, setColumn2RowOutputs] = useState(
    column2Base.map(base => [`${base}00`, '--'])
  );
  const [column3RowOutputs, setColumn3RowOutputs] = useState(
    column3Base.map(base => [`${base}00`, '--'])
  );

  const toggleMode = () => {
    setIsManual(!isManual);
  };

  // Input change handlers with 2-digit limit
  const handleColumn1Change = (index, value) => {
    const sanitized = value.slice(0, 2); // Only 2 digits
    const newNumbers = [...column1Numbers];
    newNumbers[index] = sanitized;
    setColumn1Numbers(newNumbers);

    const newOutputs = [...column1RowOutputs];
    newOutputs[index] = [`${column1Base[index]}${sanitized || '00'}`, newOutputs[index][1]];
    setColumn1RowOutputs(newOutputs);
  };

  const handleColumn2Change = (index, value) => {
    const sanitized = value.slice(0, 2);
    const newNumbers = [...column2Numbers];
    newNumbers[index] = sanitized;
    setColumn2Numbers(newNumbers);

    const newOutputs = [...column2RowOutputs];
    newOutputs[index] = [`${column2Base[index]}${sanitized || '00'}`, newOutputs[index][1]];
    setColumn2RowOutputs(newOutputs);
  };

  const handleColumn3Change = (index, value) => {
    const sanitized = value.slice(0, 2);
    const newNumbers = [...column3Numbers];
    newNumbers[index] = sanitized;
    setColumn3Numbers(newNumbers);

    const newOutputs = [...column3RowOutputs];
    newOutputs[index] = [`${column3Base[index]}${sanitized || '00'}`, newOutputs[index][1]];
    setColumn3RowOutputs(newOutputs);
  };

  // Generate random outputs
  const generateRandomOutputs = () => {
    setColumn1RowOutputs(
      column1Base.map((base) => {
        const rand1 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        const rand2 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        return [`${base}${rand1}`, `${base}${rand2}`];
      })
    );
    setColumn2RowOutputs(
      column2Base.map((base) => {
        const rand1 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        const rand2 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        return [`${base}${rand1}`, `${base}${rand2}`];
      })
    );
    setColumn3RowOutputs(
      column3Base.map((base) => {
        const rand1 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        const rand2 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        return [`${base}${rand1}`, `${base}${rand2}`];
      })
    );
  };

  // Modal open/close
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

        <div className="p-8">
          {/* Header */}
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
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                  }`}
                >
                  {isManual ? <><FaRegCheckCircle /> Manual</> : <><FaRegTimesCircle /> Auto</>}
                </button>
              </div>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Column 1 */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-3 rounded-2xl shadow-xl border border-slate-600/30">
              <h2 className="text-lg font-semibold text-white mb-3">Range 10-19</h2>
              {[...Array(10)].map((_, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <div className="w-16 bg-purple-600/30 border border-purple-500/50 rounded-lg text-center py-3 text-white font-bold">
                    {column1Base[index]}
                  </div>
                  <input
                    type="number"
                    value={column1Numbers[index]}
                    onChange={(e) => handleColumn1Change(index, e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 text-white px-3 py-3 rounded-lg text-center"
                    placeholder="00"
                    max="99"
                  />
                  <div className="w-20 bg-green-600/20 border border-green-500/30 rounded-lg text-center py-3 text-green-400 font-bold">
                    {column1RowOutputs[index][0]}
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-3 rounded-2xl shadow-xl border border-slate-600/30">
              <h2 className="text-lg font-semibold text-white mb-3">Range 30-39</h2>
              {[...Array(10)].map((_, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <div className="w-16 bg-purple-600/30 border border-purple-500/50 rounded-lg text-center py-3 text-white font-bold">
                    {column2Base[index]}
                  </div>
                  <input
                    type="number"
                    value={column2Numbers[index]}
                    onChange={(e) => handleColumn2Change(index, e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 text-white px-3 py-3 rounded-lg text-center"
                    placeholder="00"
                    max="99"
                  />
                  <div className="w-20 bg-green-600/20 border border-green-500/30 rounded-lg text-center py-3 text-green-400 font-bold">
                    {column2RowOutputs[index][0]}
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3 */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-3 rounded-2xl shadow-xl border border-slate-600/30">
              <h2 className="text-lg font-semibold text-white mb-3">Range 50-59</h2>
              {[...Array(10)].map((_, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <div className="w-16 bg-purple-600/30 border border-purple-500/50 rounded-lg text-center py-3 text-white font-bold">
                    {column3Base[index]}
                  </div>
                  <input
                    type="number"
                    value={column3Numbers[index]}
                    onChange={(e) => handleColumn3Change(index, e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 text-white px-3 py-3 rounded-lg text-center"
                    placeholder="00"
                    max="99"
                  />
                  <div className="w-20 bg-green-600/20 border border-green-500/30 rounded-lg text-center py-3 text-green-400 font-bold">
                    {column3RowOutputs[index][0]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-2xl shadow-xl border border-slate-600/30 text-center">
            <button onClick={generateRandomOutputs} className="bg-orange-600 text-white px-6 py-3 rounded-lg mr-4">
              <FaRandom /> Generate Random Outputs
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg">
              <FaSave /> Save All Data
            </button>
          </div>
        </div>

        {/* Modals */}
        <AddWinningDraw isOpen={isModalOpen} onClose={closeModal} />
        <ViewWinningTicketsModal isOpen={isViewModalOpen} onClose={closeViewModal} />
        <ViewAllTicket isOpen={isViewAllModalOpen} onClose={closeViewAllModal} />
        <UpdateWinningPercentageModal
          isOpen={isWinningPercentageModalOpen}
          onClose={closeWinningPercentageModal}
          onUpdate={val => setWinningPercentage(val)}
          currentPercentage={winningPercentage}
        />
      </div>
    </div>
  );
};

export default page;
