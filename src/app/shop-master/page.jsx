"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '@/Components/Sidebar/Sidebar';
import Navbar from '@/Components/Navbar/Navbar';
import axios from "axios";
import toast from "react-hot-toast";

const initialShop = {
  shopName: '',
  address: '',
  phoneNumber: '',
  userName: '',
  password: '',
  commission: '',
  balance: '',
  gstNumber: '',
  panNumber: '',
  contactPersonName: '',
  contactPersonPhone: '',
  contactPersonEmail: '',
  openTime: '',
  closeTime: '',
  emailAddress: ''
};

const ShopMaster = () => {
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newShop, setNewShop] = useState(initialShop);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch shops on mount
  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-admins`);
      setShopData(res.data.admins || []);
    } catch (error) {
      console.error("Failed to fetch shops:", error);
      setShopData([]);
      toast.error("Failed to fetch shops");
    }
    setLoading(false);
  };

  // OPEN MODAL for Add
  const handleAddShopClick = () => {
    setIsModalVisible(true);
    setNewShop(initialShop);
    setIsEditMode(false);
    setEditId(null);
  };

  const handleEdit = (shop) => {
    setIsModalVisible(true);
    setNewShop({ ...shop, password: '' }); // clear password for editing
    setIsEditMode(true);
    setEditId(shop.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Keep values as strings (even for number inputs) so empty is allowed; convert when sending.
    setNewShop(prev => ({ ...prev, [name]: value }));
  };

  // helper: build payload for create/update, converting commission/balance only if provided
  const buildPayload = (base) => {
    const payload = { ...base };

    if (payload.commission === '' || payload.commission === null || payload.commission === undefined) {
      delete payload.commission;
    } else {
      payload.commission = Number(payload.commission);
    }

    if (payload.balance === '' || payload.balance === null || payload.balance === undefined) {
      delete payload.balance;
    } else {
      payload.balance = Number(payload.balance);
    }

    // Trim simple strings (optional)
    ['shopName','address','phoneNumber','userName','password','gstNumber','panNumber','contactPersonName','contactPersonPhone','contactPersonEmail','openTime','closeTime','emailAddress']
      .forEach(k => {
        if (payload[k] !== undefined && typeof payload[k] === 'string') {
          payload[k] = payload[k].trim();
        }
      });

    return payload;
  };

  // ADD SHOP
  const handleAddShopSubmit = async () => {
    // Only these three are required on CREATE
    if (!newShop.shopName?.trim() || !newShop.userName?.trim() || !newShop.password?.trim()) {
      toast.error("Shop Name, Username and Password are required.");
      return;
    }

    try {
      const payload = buildPayload({ ...newShop });
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/create-admin`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 201) {
        toast.success("Shop/Admin added successfully!");
        fetchShops();
        setIsModalVisible(false);
        setNewShop(initialShop);
      } else {
        toast.error(res.data.message || "Failed to add shop");
      }
    } catch (error) {
      console.error("Error creating shop:", error);
      toast.error(error?.response?.data?.message || "Error creating shop");
    }
  };

  // UPDATE SHOP
  // For POST: /update-admin (your API)
  const handleUpdateShopSubmit = async () => {
    if (!editId) return; // safety

    // Only Shop Name and Username should be present ideally; Password is optional on EDIT
    if (!newShop.shopName?.trim() || !newShop.userName?.trim()) {
      toast.error("Shop Name and Username are required.");
      return;
    }

    try {
      const payload = buildPayload({ ...newShop, id: editId });

      // If password is empty in edit mode, do NOT send it (avoid overwriting with empty)
      if (!payload.password) {
        delete payload.password;
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/update-admin`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 200) {
        toast.success("Shop/Admin updated successfully!");
        fetchShops();
        setIsModalVisible(false);
        setNewShop(initialShop);
        setIsEditMode(false);
        setEditId(null);
      } else {
        toast.error(res.data.message || "Failed to update shop");
      }
    } catch (error) {
      console.error("Error updating shop:", error);
      toast.error(error?.response?.data?.message || "Error updating shop");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shop/admin?")) return;

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/delete-admin`,
        { id },  // send as body!
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 200) {
        toast.success("Shop/Admin deleted successfully!");
        fetchShops(); 
      } else {
        toast.error(res.data.message || "Failed to delete shop");
      }
    } catch (error) {
      console.error("Error deleting shop:", error);
      toast.error(error?.response?.data?.message || "Error deleting shop");
    }
  };

  // Animation variants...
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -15 },
    visible: {
      opacity: 1, scale: 1, rotateX: 0,
      transition: { type: "spring", damping: 25, stiffness: 500 }
    },
    exit: { opacity: 0, scale: 0.8, rotateX: 15, transition: { duration: 0.2 } }
  };
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <div className='flex bg-gray-200'>
      <div className='bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900'>
        <Sidebar />
      </div>
      <div className='w-full'>
        <Navbar />
        <div className="min-h-screen p-6">
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddShopClick}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold"
                >
                  <div className="flex items-center space-x-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
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
                { title: 'Commission 7%', value: shopData.filter(s => Number(s.commission) === 7).length, icon: '💰', color: 'from-yellow-500 to-orange-500' },
                { title: 'Commission 8%', value: shopData.filter(s => Number(s.commission) === 8).length, icon: '💎', color: 'from-purple-500 to-pink-500' }
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
              <div className="overflow-x-auto transparent-scrollbar">
                <table className="w-full min-w-[1100px]">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-slate-700">
                      {[
                        'Sr. No.', 'ID', 'Shop Name', 'Address', 'Phone', 'Username', 'Password',
                        'Commission (%)', 'Balance', 'Actions'
                      ].map((header, index) => (
                        <th key={index} className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {loading ? (
                      <tr>
                        <td colSpan={10} className="text-center py-10 text-slate-400">Loading...</td>
                      </tr>
                    ) : shopData.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="text-center py-10 text-slate-400">No shops found</td>
                      </tr>
                    ) : (
                      shopData.map((item, index) => (
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
                          <td className="px-6 py-4 text-sm text-white font-medium">{item.shopName}</td>
                          <td className="px-6 py-4 text-sm text-gray-300">{item.address}</td>
                          <td className="px-6 py-4 text-sm text-gray-300">{item.phoneNumber}</td>
                          <td className="px-6 py-4 text-sm text-gray-300">{item.userName}</td>
                          <td className="px-6 py-4 text-sm text-gray-300">{'•'.repeat(6)}</td>
                          <td className="px-6 py-4 text-sm text-blue-400">{item.commission}</td>
                          <td className="px-6 py-4 text-sm text-green-400 font-medium">₹{item.balance}</td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                onClick={() => handleEdit(item)}
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
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Pagination */}
            <motion.div variants={itemVariants} className="flex justify-between items-center mt-8">
              <div className="text-sm text-gray-400">
                Showing <span className="text-gray-500 font-medium">1</span> to <span className="text-gray-500 font-medium">{shopData.length}</span> of <span className="text-gray-500 font-medium">{shopData.length}</span> entries
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

          {/* Modal for Add/Edit */}
          <AnimatePresence>
            {isModalVisible && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={backdropVariants}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              >
                <motion.div
                  variants={modalVariants}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 transparent-scrollbar"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {isEditMode ? "Edit Shop" : "Add New Shop"}
                      </h2>
                      <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => { setIsModalVisible(false); setIsEditMode(false); setNewShop(initialShop); setEditId(null); }}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      // ONLY these are required (password not required in edit)
                      { name: 'shopName', placeholder: 'Shop Name', type: 'text', required: true },
                      { name: 'address', placeholder: 'Shop Address', type: 'text', required: false },
                      { name: 'phoneNumber', placeholder: 'Phone Number', type: 'tel', required: false },
                      { name: 'userName', placeholder: 'Username', type: 'text', required: true },
                      { name: 'password', placeholder: 'Password', type: 'password', required: !isEditMode },
                      { name: 'commission', placeholder: 'Commission (%)', type: 'number', required: false },
                      { name: 'balance', placeholder: 'Balance', type: 'number', required: false },
                      { name: 'gstNumber', placeholder: 'GST Number', type: 'text', required: false },
                      { name: 'panNumber', placeholder: 'PAN Number', type: 'text', required: false },
                      { name: 'contactPersonName', placeholder: 'Contact Person Name', type: 'text', required: false },
                      { name: 'contactPersonPhone', placeholder: 'Contact Person Phone', type: 'tel', required: false },
                      { name: 'contactPersonEmail', placeholder: 'Contact Person Email', type: 'email', required: false },
                      { name: 'openTime', placeholder: 'Open Time', type: 'time', required: false },
                      { name: 'closeTime', placeholder: 'Close Time', type: 'time', required: false },
                      { name: 'emailAddress', placeholder: 'Shop Email', type: 'email', required: false },
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
                          required={field.required}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex justify-end space-x-4 mt-8"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setIsModalVisible(false); setIsEditMode(false); setNewShop(initialShop); setEditId(null); }}
                      className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200 font-medium"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={isEditMode ? handleUpdateShopSubmit : handleAddShopSubmit}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg"
                    >
                      {isEditMode ? "Update Shop" : "Add Shop"}
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
