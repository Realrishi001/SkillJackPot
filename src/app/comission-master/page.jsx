"use client";

import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';

import Sidebar from '@/Components/Sidebar/Sidebar';
import Navbar from '@/Components/Navbar/Navbar';

const CommissionMaster = () => {
  // Modal visibility state
  const [commissionModalOpen, setCommissionModalOpen] = useState(false);
  const [setCommissionModalOpenState, setSetCommissionModalOpen] = useState(false);
  const [addBalanceModalOpenState, setAddBalanceModalOpen] = useState(false);

  // Static data for packages and balances
  const packageList = [
    { packageName: 'Commission 10%', commissionPercent: 10 },
    { packageName: 'Commission 9%', commissionPercent: 9 },
    { packageName: 'Commission 8%', commissionPercent: 8 },
    { packageName: 'Commission 7%', commissionPercent: 7 }
  ];

  const [commissionPackages, setCommissionPackages] = useState([
    { packageName: 'Commission 10%', commissionRupees: 0, commissionPercent: 10 },
    { packageName: 'Commission 9%', commissionRupees: 0, commissionPercent: 9 },
    { packageName: 'Commission 8%', commissionRupees: 0, commissionPercent: 8 },
    { packageName: 'Commission 7%', commissionRupees: 0, commissionPercent: 7 }
  ]);
  const [balances, setBalances] = useState([]);

  // State for form inputs
  const [newPackage, setNewPackage] = useState({ packageName: '', commissionPercent: '' });
  const [newSetCommission, setNewSetCommission] = useState({ shopName: '', commission: '', package: '' });
  const [newBalance, setNewBalance] = useState({ shopName: '', amount: '' });

  // --- DYNAMIC ADMIN USERNAMES AND COMMISSIONS ---
  const [adminUsernames, setAdminUsernames] = useState([]);
  const [adminCommissions, setAdminCommissions] = useState([]);

  // Fetch usernames & commissions from backend when Set Commission modal opens
  useEffect(() => {
    if (setCommissionModalOpenState) {
      fetchAdminData();
    }
    // eslint-disable-next-line
  }, [setCommissionModalOpenState]);

  const fetchAdminData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-commission-details`);
      setAdminUsernames(res.data.admins.map(a => a.userName));
      setAdminCommissions(res.data.admins); // [{ userName, commission }]
    } catch {
      setAdminUsernames([]);
      setAdminCommissions([]);
    }
  };

  const fetchBalances = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/get-balance`
    );
    setBalances(res.data.admins); // [{ userName, balance }]
  } catch (error) {
    console.error(error);
    setBalances([]);
  }
};


useEffect(() => {
  fetchBalances();
}, []);


  // Modal toggles
  const handleCommissionModalToggle = () => setCommissionModalOpen(!commissionModalOpen);
  const handleSetCommissionModalToggle = () => setSetCommissionModalOpen(!setCommissionModalOpenState);
  const handleAddBalanceModalToggle = () => setAddBalanceModalOpen(!addBalanceModalOpenState);

  // Handle input changes
  const handleInputChange = (e, stateSetter) => {
    const { name, value } = e.target;
    stateSetter((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submissions
  const handleAddPackage = () => {
    if (newPackage.packageName && newPackage.commissionPercent) {
      setCommissionPackages([
        ...commissionPackages,
        {
          packageName: newPackage.packageName,
          commissionRupees: 0,
          commissionPercent: parseInt(newPackage.commissionPercent)
        }
      ]);
      setNewPackage({ packageName: '', commissionPercent: '' });
      setCommissionModalOpen(false);
    }
  };

const handleAddSetCommission = async () => {
  if (newSetCommission.shopName && newSetCommission.commission !== "") {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/update-commission`, {
        userName: newSetCommission.shopName,
        commission: Number(newSetCommission.commission)
      });
      // Optionally, show a toast: toast.success(response.data.message)
      await fetchAdminData(); // Refresh the UI with updated commission table
      setNewSetCommission({ shopName: '', commission: '', package: '' });
      setSetCommissionModalOpen(false);
    } catch (err) {
      // Optionally, show a toast: toast.error(err.response?.data?.message || "Error updating commission")
      console.error(err);
    }
  }
};


const handleAddBalance = async () => {
  if (newBalance.shopName && newBalance.amount) {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/update-balance`,
        {
          userName: newBalance.shopName,
          amount: Number(newBalance.amount),
        }
      );

      // Refresh balances after successful addition
      await fetchBalances();

      // Reset form and close modal
      setNewBalance({ shopName: '', amount: '' });
      setAddBalanceModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  }
};


  const handleDeletePackage = (index) => {
    setCommissionPackages(commissionPackages.filter((_, i) => i !== index));
  };

  const handleDeleteSetCommission = async (index) => {
    const userName = adminCommissions[index].userName;
    await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/delete-admin`, { data: { userName } });
    await fetchAdminData();
  };

  const handleDeleteBalance = (index) => {
    setBalances(balances.filter((_, i) => i !== index));
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-transparent bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-[5px]">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-purple-500/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-2xl"
            >
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const InputField = ({ type = "text", name, value, onChange, placeholder, className = "" }) => (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`bg-slate-700 border border-slate-600 text-white placeholder-slate-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${className}`}
    />
  );

  const SelectField = ({ name, value, onChange, children, className = "" }) => (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`bg-slate-700 border border-slate-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${className}`}
    >
      {children}
    </select>
  );

  const Button = ({ onClick, variant = "primary", children, className = "" }) => {
    const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105";
    const variants = {
      primary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg",
      secondary: "bg-slate-600 hover:bg-slate-700 text-white",
      danger: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  const DataTable = ({ headers, data, onDelete }) => (
    <div className="overflow-x-auto shadow-2xl rounded-xl mt-6">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gradient-to-r from-slate-800 to-slate-700 text-purple-300">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-4 font-semibold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-slate-800">
          {data.map((row, index) => (
            <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
              <td className="px-6 py-4 text-white">{index + 1}</td>
              {Object.values(row).map((value, i) => (
                <td key={i} className="px-6 py-4 text-slate-300">{value}</td>
              ))}
              <td className="px-6 py-4">
                <Button
                  onClick={() => onDelete(index)}
                  variant="danger"
                  className="text-sm px-3 py-1"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='flex'>
      <div className='bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
        <Sidebar />
      </div>
      <div className='w-full'>
        <Navbar />
        <div className="min-h-screen bg-gray-200">
          <div className="p-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Commission Master
              </h1>
              <p className="text-slate-400 text-lg">Manage your commission packages, shop commissions, and balances</p>
            </div>

            {/* Modal for Commission Package */}
            <Modal
              isOpen={commissionModalOpen}
              onClose={handleCommissionModalToggle}
              title="Commission Packages"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <InputField
                  name="packageName"
                  value={newPackage.packageName}
                  onChange={(e) => handleInputChange(e, setNewPackage)}
                  placeholder="Enter Package Name"
                  className="w-full"
                />
                <InputField
                  type="number"
                  name="commissionPercent"
                  value={newPackage.commissionPercent}
                  onChange={(e) => handleInputChange(e, setNewPackage)}
                  placeholder="Enter Commission (%)"
                  className="w-full"
                />
              </div>
              <div className="flex justify-end mb-6">
                <Button onClick={handleAddPackage} className="mr-4">
                  Add Package
                </Button>
              </div>
              <DataTable
  headers={['Sr. No.', 'Shop Name', 'Balance (₹)', 'Action']}
  data={balances.map(b => ({
    shopName: b.userName,
    amount: b.balance
  }))}
  onDelete={handleDeleteBalance}
/>

            </Modal>

            {/* Modal for Set Commission */}
            <Modal
              isOpen={setCommissionModalOpenState}
              onClose={handleSetCommissionModalToggle}
              title="Set Commission for Shops"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <SelectField
                  name="shopName"
                  value={newSetCommission.shopName}
                  onChange={(e) => handleInputChange(e, setNewSetCommission)}
                  className="w-full"
                >
                  <option value="">Select Admin (Username)</option>
                  {adminUsernames.map((username, index) => (
                    <option key={index} value={username}>{username}</option>
                  ))}
                </SelectField>

                <InputField
                  type="number"
                  name="commission"
                  value={newSetCommission.commission}
                  onChange={(e) => handleInputChange(e, setNewSetCommission)}
                  placeholder="Enter Commission (%)"
                  className="w-full"
                />
              </div>
              <div className="flex justify-end mb-6">
                <Button onClick={handleAddSetCommission} className="mr-4">
                  Set Commission
                </Button>
              </div>
              <DataTable
                headers={['Sr. No.', 'Shop Name', 'Commission (%)', 'Action']}
                data={adminCommissions.map(a => ({
                  shopName: a.userName,
                  commission: a.commission
                }))}
                onDelete={handleDeleteSetCommission}
              />
            </Modal>

            {/* Modal for Add Balance */}
            <Modal
              isOpen={addBalanceModalOpenState}
              onClose={handleAddBalanceModalToggle}
              title="Add Balance"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <SelectField
                  name="shopName"
                  value={newBalance.shopName}
                  onChange={(e) => handleInputChange(e, setNewBalance)}
                  className="w-full"
                >
                  <option value="">Select Shop</option>
                  {adminUsernames.map((username, index) => (
                    <option key={index} value={username}>{username}</option>
                  ))}
                </SelectField>
                <InputField
                  type="number"
                  name="amount"
                  value={newBalance.amount}
                  onChange={(e) => handleInputChange(e, setNewBalance)}
                  placeholder="Enter Amount"
                  className="w-full"
                />
              </div>
              <div className="flex justify-end mb-6">
                <Button onClick={handleAddBalance} className="mr-4">
                  Add Balance
                </Button>
              </div>
              <DataTable
                headers={['Sr. No.', 'Shop Name', 'Amount', 'Action']}
                data={balances}
                onDelete={handleDeleteBalance}
              />
            </Modal>

            {/* Main Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer border border-purple-500/20"
                onClick={handleCommissionModalToggle}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-50"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="text-white">
                    <h2 className="text-sm font-bold opacity-90 mb-2 text-purple-300">Commission Package</h2>
                    <h1 className="text-4xl font-bold mb-2">{commissionPackages.length}</h1>
                    <p className="text-slate-400">packages</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-xl backdrop-blur-sm border border-purple-500/30">
                    <span className="text-4xl">📦</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>

              <div
                className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer border border-purple-500/20"
                onClick={handleSetCommissionModalToggle}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-50"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="text-white">
                    <h2 className="text-sm font-bold opacity-90 mb-2 text-purple-300">Set Commission</h2>
                    <h1 className="text-4xl font-bold mb-2">{adminCommissions.length}</h1>
                    <p className="text-slate-400">admins</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-xl backdrop-blur-sm border border-purple-500/30">
                    <span className="text-4xl">💵</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>

              <div
                className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer border border-purple-500/20"
                onClick={handleAddBalanceModalToggle}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-50"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="text-white">
                    <h2 className="text-sm font-bold opacity-90 mb-2 text-purple-300">Add Balance</h2>
                    <h1 className="text-4xl font-bold mb-2">{balances.length}</h1>
                    <p className="text-slate-400">balances</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-xl backdrop-blur-sm border border-purple-500/30">
                    <span className="text-4xl">💰</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionMaster;
