
'use client'

import React from 'react'
import Link from 'next/link'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import { usePathname } from 'next/navigation'

import MenuBookIcon from '@mui/icons-material/MenuBook';


// Navigation items for the navbar
const navItems = [
  { label: 'Home', link: '/' },
  { label: 'Books', link: '/books' },
  { label: 'Categories', link: '/categories' },
  { label: 'Favourite', link: '/favourite' },
  { label: 'Cart', link: '/cart' },
]

function Navbar(props) {
  const pathname = usePathname()

  return (
    <div className="flex justify-between items-center px-20 py-5">

      {/* Logo */}
      <div className='flex items-center gap-4'>
        <MenuBookIcon className={props.titleStyle} fontSize='large'/>
        <h1 className={`font-bold text-2xl ${props.titleStyle}`}>THE BOOK</h1>
      </div>

      {/* Navigation */}
      <div className="flex gap-10">
        {navItems.map((item) => {
          const isActive = pathname === item.link

          return (
            <Link key={item.label} href={item.link} className={`font-bold ${props.style} ${isActive ? 'underline' : ''}`}>
              {item.label}
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

        <NotificationsActiveOutlinedIcon className="text-black" />

      </div>

    </div>
  )
}

export default Navbar

