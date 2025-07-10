import Navbar from '@/Components/Navbar/Navbar'
import Sidebar from '@/Components/Sidebar/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
      <div>
        <Sidebar/>
      </div>
      <div className='w-full'>
        <Navbar/>
      </div>
    </div>
  )
}

export default page;
