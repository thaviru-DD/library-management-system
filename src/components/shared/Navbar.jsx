import React from 'react'
import Link from 'next/link';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import Avatar from '@mui/material/Avatar';

function Navbar() {
  return (
    <div className='flex justify-between items-center px-20 py-5'>
      <div>
        <h1 className='font-bold text-2xl'>THE BOOK</h1>
      </div>
      <div className='flex gap-10'>
         <Link className='font-bold text-ink' href="/">Home</Link>
         <Link className='font-bold text-ink' href="/">Books</Link>
         <Link className='font-bold text-ink' href="/">Catogories</Link>
         <Link className='font-bold text-ink' href="/">Favourite</Link>
         <Link className='font-bold text-ink' href="/">Cart</Link>
      </div>

      <div className='flex gap-6 items-center'>
        <Link href="/profile">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#41431B] to-[#AEB784] text-white flex items-center justify-center font-bold shadow-md">T</div>
        </Link>
        <NotificationsActiveOutlinedIcon/>
      </div>
    </div>
  )
}

export default Navbar
