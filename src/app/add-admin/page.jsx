"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTimes, FaEdit, FaTrash, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaUserPlus } from 'react-icons/fa';
import Sidebar from '@/Components/Sidebar/Sidebar';
import Navbar from '@/Components/Navbar/Navbar';

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    address: '',
    phone: '',
    email: '',
    password: ''
  });

  // Static Admins Data for the table
  const [admins, setAdmins] = useState([
    { username: 'john_doe', fullName: 'John Doe', password: '1234', phone: '9876543210', email: 'john.doe@example.com' },
    { username: 'jane_smith', fullName: 'Jane Smith', password: 'abcd', phone: '9876543211', email: 'jane.smith@example.com' },
    { username: 'alex_lee', fullName: 'Alex Lee', password: '5678', phone: '9876543212', email: 'alex.lee@example.com' },
    { username: 'mary_jones', fullName: 'Mary Jones', password: 'xyz123', phone: '9876543213', email: 'mary.jones@example.com' },
    { username: 'mark_will', fullName: 'Mark Will', password: 'qwerty', phone: '9876543214', email: 'mark.will@example.com' },
  ]);

  // Open Modal
  const openModal = () => setIsModalOpen(true);

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      fullName: '',
      username: '',
      address: '',
      phone: '',
      email: '',
      password: ''
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setAdmins([...admins, formData]);
    setFormData({
      fullName: '',
      username: '',
      address: '',
      phone: '',
      email: '',
      password: ''
    });
    closeModal();
  };

  // Delete admin
  const deleteAdmin = (index) => {
    setAdmins(admins.filter((_, i) => i !== index));
  };

  return (
    <div className='flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
      <div className='bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
        <Sidebar />
      </div>
      <div className='flex-1 flex flex-col'>
        <Navbar />
        <div className="flex-1 p-8 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
          {/* Header Section */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div>
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 mb-2">
                  Admin Management
                </h1>
                <p className="text-slate-600 text-lg">Manage your admin users with ease</p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={openModal}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <FaUserPlus className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                <span>Add New Admin</span>
              </motion.button>
            </motion.div>
          </div>

          

          {/* Table Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">Admin List</h2>
              <p className="text-slate-300 mt-1">Manage all administrator accounts</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-8 py-4 text-left text-slate-600 font-semibold">Sr No.</th>
                    <th className="px-8 py-4 text-left text-slate-600 font-semibold">Username</th>
                    <th className="px-8 py-4 text-left text-slate-600 font-semibold">Full Name</th>
                    <th className="px-8 py-4 text-left text-slate-600 font-semibold">Phone</th>
                    <th className="px-8 py-4 text-left text-slate-600 font-semibold">Email</th>
                    <th className="px-8 py-4 text-left text-slate-600 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-bold">
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-500 rounded-full flex items-center justify-center">
                            <FaUser className="text-white text-sm" />
                          </div>
                          <span className="font-medium text-slate-700">{admin.username}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-slate-700 font-medium">{admin.fullName}</td>
                      <td className="px-8 py-6 text-slate-600">{admin.phone}</td>
                      <td className="px-8 py-6 text-slate-600">{admin.email}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-xl transition-colors duration-200"
                          >
                            <FaEdit className="text-sm" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteAdmin(index)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-colors duration-200"
                          >
                            <FaTrash className="text-sm" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Modal for Adding Admin */}
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                >
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Add New Admin</h2>
                        <p className="text-slate-300">Create a new administrator account</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={closeModal}
                        className="p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors duration-200"
                      >
                        <FaTimes className="text-lg" />
                      </motion.button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="flex items-center gap-2 text-white mb-3 font-medium">
                            <FaUser className="text-purple-400" />
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                            placeholder="Enter full name"
                            required
                          />
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-white mb-3 font-medium">
                            <FaUser className="text-purple-400" />
                            Username
                          </label>
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                            placeholder="Enter username"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-white mb-3 font-medium">
                          <FaMapMarkerAlt className="text-purple-400" />
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                          placeholder="Enter address"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="flex items-center gap-2 text-white mb-3 font-medium">
                            <FaPhone className="text-purple-400" />
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                            placeholder="Enter phone number"
                            required
                          />
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-white mb-3 font-medium">
                            <FaEnvelope className="text-purple-400" />
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                            placeholder="Enter email address"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-white mb-3 font-medium">
                          <FaLock className="text-purple-400" />
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                          placeholder="Enter password"
                          required
                        />
                      </div>

                      <div className="flex justify-end gap-4 pt-6">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={closeModal}
                          className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-2xl transition-colors duration-300"
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg"
                        >
                          Create Admin
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default page;