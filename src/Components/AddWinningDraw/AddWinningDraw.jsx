// AddWinnerModal.jsx

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // For Close Icon

const AddWinningDraw = ({ isOpen, onClose }) => {
  const [drawTime, setDrawTime] = useState('');
  const [series, setSeries] = useState('0');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
    console.log('Draw Time:', drawTime, 'Series:', series);
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null; // Modal doesn't render if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/50">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">
            Add Winner - Date & Draw Wise
          </h2>
          <button onClick={onClose} className="text-white text-2xl">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Draw Time Field */}
          <div className="mb-6">
            <label className="block text-sm text-white mb-2">Draw Time</label>
            <input
              type="time"
              value={drawTime}
              onChange={(e) => setDrawTime(e.target.value)}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          {/* Series Select Field */}
          <div className="mb-6">
            <label className="block text-sm text-white mb-2">Series</label>
            <select
              value={series}
              onChange={(e) => setSeries(e.target.value)}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white outline-none rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num} value={num} className='bg-gray-100 text-gray-700'>
                  Series {num}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWinningDraw;
