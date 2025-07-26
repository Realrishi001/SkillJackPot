"use client"

import Navbar from '@/Components/Navbar/Navbar'
import Sidebar from '@/Components/Sidebar/Sidebar'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Page = () => {
  const router = useRouter();

  // State for dashboard stats
  const [stats, setStats] = useState({
    totalAdmins: 0,
    ticketsToday: 0,
    totalPoints: 0,    // totalPointsToday
    netPoints: 0,      // netAmount
    winningPoints: 0,  // winningAmount
    shopPoints: 0      // commissionAmount
  });

  useEffect(() => {
    // Auth check
    if (!localStorage.getItem("auth_token")) {
      router.push("/");
    }

    const fetchStats = async () => {
      try {
        // Fetch dashboard basic stats
        const resDashboard = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard-details`
        );
        console.log("Dashboard Data:", resDashboard.data);


        // Fetch today's points data
        const resPoints = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/get-points`
        );

        setStats({
          totalAdmins: resDashboard.data.totalAdmins || 0,
          ticketsToday: resDashboard.data.totalTickets || 0,  // FIXED
          totalPoints: resPoints.data.totalPointsToday || 0,
          netPoints: resPoints.data.netAmount || 0,
          winningPoints: resPoints.data.winningAmount || 0,
          shopPoints: resPoints.data.commissionAmount || 0
        });

        console.log(resDashboard.data);
        console.log(resPoints.data);


      } catch (err) {
        setStats({
          totalAdmins: 0,
          ticketsToday: 0,
          totalPoints: 0,
          netPoints: 0,
          winningPoints: 0,
          shopPoints: 0
        });
      }
    };

    console.log(stats);

    fetchStats();
  }, []);

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div>
        <Sidebar />
      </div>
      <div className='w-full'>
        <Navbar />

        <div className='w-full h-fit p-6'>
          {/* Main Stats Section */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6'>
              Dashboard Overview
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              
              {/* Total Shop */}
              <div className='group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-50'></div>
                <div className='relative z-10 flex items-center justify-between'>
                  <div className='text-white'>
                    <h2 className='text-sm font-bold opacity-90 mb-1'>Total Shop</h2>
                    <h1 className='text-3xl font-bold'>{stats.totalAdmins}</h1>
                  </div>
                  <div className='bg-white/20 p-3 rounded-xl backdrop-blur-sm'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6l-3-4H6zM3 6h18M8 6v12M16 6v12"/>
                    </svg>
                  </div>
                </div>
                <div className='absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-full'></div>
              </div>

              {/* Total Game Tickets */}
              <div className='group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-50'></div>
                <div className='relative z-10 flex items-center justify-between'>
                  <div className='text-white'>
                    <h2 className='text-sm font-bold opacity-90 mb-1'>Total Game Tickets</h2>
                    <h1 className='text-3xl font-bold'>{stats.ticketsToday}</h1>
                  </div>
                  <div className='bg-white/20 p-3 rounded-xl backdrop-blur-sm'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                    </svg>
                  </div>
                </div>
                <div className='absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-full'></div>
              </div>

              {/* Cancel Tickets (reset to 0) */}
              <div className='group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-50'></div>
                <div className='relative z-10 flex items-center justify-between'>
                  <div className='text-white'>
                    <h2 className='text-sm font-bold opacity-90 mb-1'>Cancel Tickets</h2>
                    <h1 className='text-3xl font-bold'>0</h1>
                  </div>
                  <div className='bg-white/20 p-3 rounded-xl backdrop-blur-sm'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M4.93 4.93l14.14 14.14"/>
                    </svg>
                  </div>
                </div>
                <div className='absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-full'></div>
              </div>

              {/* Support Enquiry (reset to 0) */}
              <div className='group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-50'></div>
                <div className='relative z-10 flex items-center justify-between'>
                  <div className='text-white'>
                    <h2 className='text-sm font-bold opacity-90 mb-1'>Support Enquiry</h2>
                    <h1 className='text-3xl font-bold'>0</h1>
                  </div>
                  <div className='bg-white/20 p-3 rounded-xl backdrop-blur-sm'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      <path d="M8 12h.01M12 12h.01M16 12h.01"/>
                    </svg>
                  </div>
                </div>
                <div className='absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-full'></div>
              </div>
            </div>
          </div>

          {/* Today's Data Section */}
          <div className='bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20'>
            <div className='flex items-center mb-6'>
              <div className='w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-4'></div>
              <h1 className='text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
                Today's Data
              </h1>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              
              {/* Total Points */}
              <div className='group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105'>
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-50'></div>
                <div className='flex items-center justify-between text-white'>
                  <div>
                    <h2 className='text-lg font-bold opacity-90 mb-1'>Total Points</h2>
                    <h1 className='text-2xl font-bold'>{stats.totalPoints}</h1>
                  </div>
                  <div className='bg-white/20 p-2 rounded-lg'>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Net Points */}
              <div className='group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105'>
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-50'></div>
                <div className='flex items-center justify-between text-white'>
                  <div>
                    <h2 className='text-lg font-bold opacity-90 mb-1'>Net Points</h2>
                    <h1 className='text-2xl font-bold'>{stats.netPoints}</h1>
                  </div>
                  <div className='bg-white/20 p-2 rounded-lg'>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Winning Points */}
              <div className='group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105'>
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-50'></div>
                <div className='flex items-center justify-between text-white'>
                  <div>
                    <h2 className='text-lg font-bold opacity-90 mb-1'>Winning Points</h2>
                    <h1 className='text-2xl font-bold'>{stats.winningPoints}</h1>
                  </div>
                  <div className='bg-white/20 p-2 rounded-lg'>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                      <path d="M4 22h16"/>
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Shop Points (Commission Amount) */}
              <div className='group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105'>
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-50'></div>
                <div className='flex items-center justify-between text-white'>
                  <div>
                    <h2 className='text-lg font-bold opacity-90 mb-1'>Shop Points</h2>
                    <h1 className='text-2xl font-bold'>{stats.shopPoints}</h1>
                  </div>
                  <div className='bg-white/20 p-2 rounded-lg'>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6l-3-4H6z"/>
                      <path d="M3 6h18"/>
                      <path d="M8 6v12"/>
                      <path d="M16 6v12"/>
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
