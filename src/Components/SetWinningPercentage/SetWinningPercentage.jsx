"use client";

import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateWinningPercentageModal = ({ isOpen, onClose, onUpdate }) => {
  const [percentage, setPercentage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch current winning percentage when modal opens
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-winning-percentage`)
        .then(res => {
          setPercentage(res.data.percentage ?? '');
        })
        .catch(() => {
          setPercentage('');
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const num = Number(percentage);
    if (!percentage || isNaN(num) || num < 0 || num > 100) {
      toast.error("Enter a valid percentage (0-100)");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/winning-percentage`, { percentage: num });
      if (onUpdate) onUpdate(num);
      toast.success('Winning percentage updated!');
      onClose();
    } catch (err) {
      toast.error('Failed to update. Please try again.');
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/50">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Update Winning Percentage</h2>
          <button onClick={onClose} className="text-white text-2xl">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm text-white mb-2">Winning Percentage (%)</label>
            <input
              type="number"
              value={percentage}
              onChange={e => setPercentage(e.target.value)}
              min={0}
              max={100}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
              placeholder={loading ? "Loading..." : "Enter percentage"}
              required
              disabled={loading}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateWinningPercentageModal;
