'use client'

import React from 'react'
import Link from 'next/link'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import { usePathname } from 'next/navigation'


import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import CategoryIcon from '@mui/icons-material/Category';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MessageIcon from '@mui/icons-material/Message';


// Navigation items for the navbar
const navItems = [
  { label: 'Home', link: '/', icon: <HomeIcon /> },
  { label: 'Books', link: '/books', icon: <BookIcon /> },
  { label: 'Categories', link: '/categories', icon: <CategoryIcon /> },
  { label: 'Favourite', link: '/favourite', icon: <FavoriteIcon /> },
  { label: 'Cart', link: '/cart', icon: <ShoppingCartIcon /> },
]

function Navbar(props) {
  const pathname = usePathname()

  // const handleHover = () => {
  //   alert('You have new notifications!')
  // }

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-20 py-5">

      {/* Logo */}
      <div className='flex items-center gap-4'>
        <MenuBookIcon className={props.titleStyle} fontSize='large' />
        <h1 className={`font-bold text-2xl ${props.titleStyle}`}>THE BOOK</h1>
      </div>

      {/* Navigation */}
      <div className="flex gap-10">
        {navItems.map((item) => {
          const isActive = pathname === item.link

          return (
            <Link
              key={item.link}
              href={item.link}
              className={`font-bold flex gap-2 items-center ${props.style} ${isActive ? 'underline' : ''}`}
            >
              {item.icon}{item.label}
            </Link>
          )
        })}
      </div>

      {/* Profile + Notification */}
      <div className="flex gap-6 items-center">

        <Link href="/profile">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#41431B] to-[#AEB784] text-white flex items-center justify-center font-bold shadow-md">
            T
          </div>
        </Link>

        <div className='relative group'>
          <NotificationsActiveOutlinedIcon className={`cursor-pointer ${props.IconStyle}`} />
          <div className='bg-white absolute top-10 w-70 rounded-2xl h-50 right-2 invisible transition-opacity duration-200 group-hover:opacity-100 group-hover:visible group-hover:delay-300'>
            <div className='flex gap-2 items-center p-2'>
              <MessageIcon className=''/>
              <h2 className='font-bold text-2xl'>Messages</h2>
            </div>
            <div className='bg-gray-400/30 border-gray-800 shadow-lg px-4 py-3 w-64 h-12 rounded-full absolute top-15 right-3 opacity-0 invisible transition-opacity duration-200 group-hover:opacity-100 group-hover:visible group-hover:delay-400'>
              <h3 className='font-bold text-lg'><FavoriteIcon sx={{color:'red'}}/> Add favourite...</h3>
            </div>
            <div className='bg-gray-400/30 border-gray-800 shadow-lg px-4 py-3 w-64 h-12 rounded-full absolute top-30 right-3 opacity-0 invisible transition-opacity duration-200 group-hover:opacity-100 group-hover:visible group-hover:delay-600'>
              <h3 className='font-bold text-lg'><ShoppingCartIcon sx={{color:'green'}}/> Create cart item...</h3>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Navbar