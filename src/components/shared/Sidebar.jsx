'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 

// Side bar navigation icons
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// Sidebar navigation items
const navItems = [
  { icon: <HomeFilledIcon/>, label: 'Dashboard', link: '/admin' },
  { icon: <DragIndicatorIcon/>, label: 'Category', link: '/admin/categories' },
  { icon: <LibraryBooksIcon/>, label: 'Books', link: '/admin/books' },
  { icon: <GroupIcon/>, label: 'Users', link: '/admin/users' }, 
  { icon: <FavoriteIcon/>, label: 'Favourite', link: '/admin/favourite' }, 
]

const bottomNavItems = [
  { icon: <SettingsApplicationsIcon />, label: 'Setting', link: '/admin/settings' },
  { icon: <HelpIcon />, label: 'Help', link: '/admin/help' },
  { icon: <LogoutIcon />, label: 'Log out', link: '/logout' },
];

function Sidebar() {
  const pathname = usePathname(); 
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile top bar with hamburger toggle */}
      <div className='md:hidden fixed top-0 left-0 w-full h-16 bg-white z-20 flex items-center justify-between px-5 shadow-sm'>
        <div className='flex items-center gap-2'>
          <MenuBookIcon fontSize='medium'/>
          <h1 className='font-bold text-xl'>THE BOOK</h1>
        </div>
        <button onClick={() => setIsOpen(true)} aria-label="Open menu">
          <MenuIcon fontSize='medium'/>
        </button>
      </div>

      {/* Backdrop overlay - mobile only, shown when sidebar is open */}
      <div
        onClick={closeSidebar}
        className={`md:hidden fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-white p-5 z-40 overflow-y-auto
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <MenuBookIcon fontSize='large'/>
            <h1 className='font-bold text-2xl'>THE BOOK</h1>
          </div>

          {/* Close button - mobile only */}
          <button onClick={closeSidebar} className='md:hidden' aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>


        <h3 className='text-gray-400 mt-5'>MENU</h3>

        <div className='mt-8 flex flex-col gap-5'>

          {navItems.map((item) => {
            // 3. Check if the current route matches the item's link
            const isActive = pathname === item.link;
            return (
              <Link href={item.link} key={item.label} onClick={closeSidebar} className='group cursor-pointer flex items-center'>
                <div className={`inline px-3 pt-2 pb-3 rounded-lg transition-all duration-300 group-hover:shadow-xl group-hover:bg-orange-500 group-hover:text-white
                  ${isActive ? 'bg-orange-500 text-white shadow-xl' : 'bg-gray-200 text-gray-500'}`}>
                  {item.icon}
                </div>

                {/* Dynamic Text Styling */}
                <span className={`ml-2 transition-all duration-300 group-hover:text-black font-medium ${isActive ? 'text-black' : 'text-gray-600'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          <div className="h-px w-45 bg-gray-300 my-5"></div>

          {bottomNavItems.map((item) => {
            const isActive = pathname === item.link;

            return (
              <Link href={item.link} key={item.label} onClick={closeSidebar} className='group cursor-pointer flex items-center'>
                <div className={`inline px-3 pt-2 pb-3 rounded-lg transition-all duration-300 group-hover:shadow-xl group-hover:bg-orange-500 group-hover:text-white
                  ${isActive ? 'bg-orange-500 text-white shadow-xl' : 'bg-gray-200 text-gray-500'}
                `}>
                  {item.icon}
                </div>
                <span className={`ml-2 transition-all duration-300 group-hover:text-black font-medium
                  ${isActive ? 'text-black' : 'text-gray-600'}
                `}>
                  {item.label}
                </span>
              </Link>
            );
          })}

        </div>
      </div>
    </>
  )
}

export default Sidebar