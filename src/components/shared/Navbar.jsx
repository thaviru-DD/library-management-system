'use client'

import React from 'react'
import Link from 'next/link'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import { usePathname } from 'next/navigation'
import { useState } from 'react'


import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import CategoryIcon from '@mui/icons-material/Category';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MessageIcon from '@mui/icons-material/Message';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { div } from 'framer-motion/client'


// Navigation items for the navbar
const navItems = [
  { label: 'Home', link: '/', icon: <HomeIcon /> },
  { label: 'Books', link: '/books', icon: <BookIcon /> },
  { label: 'Categories', link: '/categories', icon: <CategoryIcon /> },
  { label: 'Favourite', link: '/favouritePage', icon: <FavoriteIcon /> },
  { label: 'Cart', link: '/cart', icon: <ShoppingCartIcon /> },
]

const categoriesLinks = [
  { label: 'Fiction', link: '/categories/fiction' },
  { label: 'Music', link: '/categories/music' },
  { label: 'History', link: '/categories/history' },
  { label: 'Science', link: '/categories/life' },
]

function Navbar(props) {
  const pathname = usePathname()

  // const handleHover = () => {
  //   alert('You have new notifications!')
  // }

  const [isHovered, setIsHovered] = React.useState(false);

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
            item.label !== 'Categories' ? (
            <div>
              <Link key={item.link} href={item.link}className={`font-bold flex gap-2 items-center ${props.style} ${isActive ? 'underline' : ''}`}>
              {item.icon}{item.label}
              </Link>
            </div>
          ) : (
            // Catergorise dropdown
            <div className='relative flex gap-1 items-center group' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <Link key={item.link} href={item.link} className={`font-bold flex gap-2 items-center ${props.style} ${isActive ? 'underline' : ''}`}>
                {item.icon}{item.label}
                {isHovered ? (<KeyboardArrowDownIcon className={`${props.style}`} />) : (<KeyboardArrowRightIcon className={`${props.style}`} />)}
              </Link>
              <div className='bg-white absolute top-full w-45 h-50 left-2 invisible transition-opacity duration-200 group-hover:opacity-100 group-hover:visible group-hover:delay-300'>
                <div className='flex flex-col gap-2 p-2'>
                  {categoriesLinks.map((category) => (
                    <div className='h-8 text-[#1F150C] hover:bg-amber-700 cursor-pointer hover:text-white hover:font-bold'>
                      <Link key={category.link} href={category.link} >{category.label}</Link>
                      <hr className='mt-2'/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
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

        <div className="relative group">
          <NotificationsActiveOutlinedIcon className={`cursor-pointer ${props.IconStyle}`} />
            <div className="absolute right-0 top-10 w-72 rounded-2xl bg-[#E1DCC9]/40 backdrop-blur-xl backdrop-saturate-150 border border-white/40 shadow-[0_8px_32px_rgba(31,21,12,0.25),inset_0_1px_0_rgba(255,255,255,0.5)] origin-top-right opacity-0 scale-95 -translate-y-1 invisible transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:visible">
            <div className="flex items-center gap-2 px-4 pt-4 pb-2 border-b border-white/30">
              <MessageIcon className="text-[#1F150C]" fontSize="small" />
              <h2 className="font-bold text-lg text-[#1F150C]">Messages</h2>
            </div>

            <div className="flex flex-col gap-2 p-3">
              <button className="flex items-center gap-2 rounded-xl bg-white/20 hover:bg-white/40 border border-white/30 px-4 py-2.5 text-left transition-colors backdrop-blur-sm">
                <FavoriteIcon sx={{ color: "#B3261E" }} fontSize="small" />
                <span className="font-medium text-sm text-[#1F150C]">Add favourite...</span>
              </button>

              <button className="flex items-center gap-2 rounded-xl bg-white/20 hover:bg-white/40 border border-white/30 px-4 py-2.5 text-left transition-colors backdrop-blur-sm">
                <ShoppingCartIcon sx={{ color: "#2E7D32" }} fontSize="small" />
                <span className="font-medium text-sm text-[#1F150C]">Create cart item...</span>
              </button>
            </div>
  </div>
</div>

      </div>

    </div>
  )
}

export default Navbar