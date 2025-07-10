"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '@/Components/Sidebar/Sidebar';
import Navbar from '@/Components/Navbar/Navbar';

const ShopMaster = () => {
  // Static data for the table
  const [shopData, setShopData] = useState([
    {
      id: 'SJ37955',
      name: 'RAFI',
      address: 'TEST ID',
      phone: '1234567890',
      username: 'rafi5258',
      password: '708519',
      commissionPackage: 'Commission 8%',
      balanceLimit: '6000',
    },
    {
      id: 'SJ16208',
      name: 'Pappu2',
      address: 'Cineraj cinema',
      phone: '9876543210',
      username: 'pappu22691',
      password: '741831',
      commissionPackage: 'Commission 7%',
      balanceLimit: '31.4',
    },
    {
      id: 'SJI9538',
      name: 'Pappu1',
      address: 'Cineraj cinema',
      phone: '9632587410',
      username: 'pappu2894',
      password: '479745',
      commissionPackage: 'Commission 7%',
      balanceLimit: '31347.1',
    },
    {
      id: 'SJ728',
      name: 'Shabri',
      address: 'Shabri hotel',
      phone: '8529637410',
      username: 'shabri4335',
      password: '893474',
      commissionPackage: 'Commission 7%',
      balanceLimit: '23501.2',
    },
    {
      id: 'SJ29301',
      name: 'Shankar',
      address: 'Bikaner',
      phone: '7412589630',
      username: 'shankar1819',
      password: '865063',
      commissionPackage: 'Commission 7%',
      balanceLimit: '10846.3',
    },
    {
      id: 'SJ45970',
      name: 'Mama New panvel',
      address: 'Shiva complex',
      phone: '7894561230',
      username: 'mama7529',
      password: '816490',
      commissionPackage: 'Commission 7%',
      balanceLimit: '34432',
    },
    {
      id: 'SJ25044',
      name: 'Ramin',
      address: 'Wargad',
      phone: '7412589630',
      username: 'sunil3240',
      password: '565563',
      commissionPackage: 'Commission 8%',
      balanceLimit: '6058.82',
    },
  ]);

  // For adding a new shop
  const [isAddShopVisible, setIsAddShopVisible] = useState(false);
  const [newShop, setNewShop] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    username: '',
    password: '',
    commissionPackage: '',
    balanceLimit: '',
    email: '',
    gstNo: '',
    panNo: '',
    contactPersonName: '',
    contactPersonPhone: '',
    contactPersonEmail: '',
    openTime: '',
    closeTime: '',
  });

  const handleAddShopClick = () => {
    setIsAddShopVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShop({ ...newShop, [name]: value });
  };

  const handleAddShopSubmit = () => {
    if (newShop.name && newShop.address && newShop.phone) {
      const newId = `SJ${Math.floor(Math.random() * 100000)}`;
      setShopData([...shopData, { ...newShop, id: newId }]);
      setIsAddShopVisible(false);
      setNewShop({
        id: '',
        name: '',
        address: '',
        phone: '',
        username: '',
        password: '',
        commissionPackage: '',
        balanceLimit: '',
        email: '',
        gstNo: '',
        panNo: '',
        contactPersonName: '',
        contactPersonPhone: '',
        contactPersonEmail: '',
        openTime: '',
        closeTime: '',
      });
    }
  };

  const handleDelete = (id) => {
    setShopData(shopData.filter(shop => shop.id !== id));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateX: 15,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <div className='flex bg-gray-200'>
        <div className='bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 '>
            <Sidebar/>
        </div>
        <div className='w-full '>
            <Navbar/>
            <div className="min-h-screen p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-50"></div>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900  bg-clip-text text-transparent mb-2">
                Shop Master
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
            
            {/* Add Shop Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddShopClick}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold"
            >
              <div className="flex items-center space-x-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <span>Add Shop</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Shops', value: shopData.length, icon: '🏪', color: 'from-blue-500 to-cyan-500' },
            { title: 'Active Shops', value: shopData.length, icon: '✅', color: 'from-green-500 to-emerald-500' },
            { title: 'Commission 7%', value: shopData.filter(s => s.commissionPackage === 'Commission 7%').length, icon: '💰', color: 'from-yellow-500 to-orange-500' },
            { title: 'Commission 8%', value: shopData.filter(s => s.commissionPackage === 'Commission 8%').length, icon: '💎', color: 'from-purple-500 to-pink-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-r ${stat.color} rounded-bl-xl opacity-20`}></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className="text-2xl">{stat.icon}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Table */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-slate-700">
                  {['Sr. No.', 'ID', 'Name', 'Address', 'Phone', 'Username', 'Password', 'Commission', 'Balance Limit', 'Actions'].map((header, index) => (
                    <th key={index} className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {shopData.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ backgroundColor: 'rgba(147, 51, 234, 0.1)' }}
                    className="hover:bg-purple-500/10 transition-all duration-300"
                  >
                    <td className="px-6 py-4 text-sm text-gray-300">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-purple-400">{item.id}</td>
                    <td className="px-6 py-4 text-sm text-white font-medium">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{item.address}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{item.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{item.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{'•'.repeat(6)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        item.commissionPackage === 'Commission 8%' 
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {item.commissionPackage}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-green-400 font-medium">₹{item.balanceLimit}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3,6 5,6 21,6"/>
                            <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
                          </svg>
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pagination */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mt-8">
          <div className="text-sm text-gray-400">
            Showing <span className="text-gray-500 font-medium">1</span> to <span className="text-gray-500 font-medium">7</span> of <span className="text-gray-500 font-medium">7</span> entries
          </div>
          <div className="flex space-x-2">
            {['Previous', '1', 'Next'].map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium"
              >
                {item}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Add Shop Modal */}
      <AnimatePresence>
        {isAddShopVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              variants={modalVariants}
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transparent-scrollbar border border-slate-700"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Add New Shop
                  </h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsAddShopVisible(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'name', placeholder: 'Shop Name', type: 'text', required: true },
                  { name: 'address', placeholder: 'Shop Address', type: 'text', required: true },
                  { name: 'phone', placeholder: 'Phone Number', type: 'tel', required: true },
                  { name: 'email', placeholder: 'Email Address', type: 'email' },
                  { name: 'gstNo', placeholder: 'GST Number (Optional)', type: 'text' },
                  { name: 'panNo', placeholder: 'PAN Number (Optional)', type: 'text' },
                  { name: 'contactPersonName', placeholder: 'Contact Person Name', type: 'text' },
                  { name: 'contactPersonPhone', placeholder: 'Contact Person Phone', type: 'tel' },
                  { name: 'contactPersonEmail', placeholder: 'Contact Person Email', type: 'email' },
                  { name: 'username', placeholder: 'Username', type: 'text' },
                  { name: 'password', placeholder: 'Password', type: 'password' },
                  { name: 'balanceLimit', placeholder: 'Balance Limit', type: 'number' },
                  { name: 'openTime', placeholder: 'Open Time', type: 'time' },
                  { name: 'closeTime', placeholder: 'Close Time', type: 'time' },
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-300">
                      {field.placeholder}
                      {field.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={newShop[field.name]}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                      placeholder={field.placeholder}
                    />
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-300">
                    Commission Package
                  </label>
                  <select
                    name="commissionPackage"
                    value={newShop.commissionPackage}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                  >
                    <option value="">Select Package</option>
                    <option value="Commission 7%">Commission 7%</option>
                    <option value="Commission 8%">Commission 8%</option>
                  </select>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-end space-x-4 mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAddShopVisible(false)}
                  className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200 font-medium"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddShopSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg"
                >
                  Add Shop
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
        </div>
    </div>
  );
};

export default ShopMaster;