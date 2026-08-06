'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Icons
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import HomeIcon from '@mui/icons-material/Home'
import BookIcon from '@mui/icons-material/Book'
import CategoryIcon from '@mui/icons-material/Category'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MessageIcon from '@mui/icons-material/Message'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

// Navigation items for the navbar
const navItems = [
  { label: 'Home', link: '/', icon: <HomeIcon /> },
  { label: 'Books', link: '/books', icon: <BookIcon /> },
  { label: 'Categories', link: '/categories/fiction', icon: <CategoryIcon /> },
  { label: 'Favourite', link: '/favouritePage', icon: <FavoriteIcon /> },
  { label: 'Reservations', link: '/resavations', icon: <ShoppingCartIcon /> }, // Fixed typo
]

const categoriesLinks = [
  { label: 'Fiction', link: '/categories/fiction' },
  { label: 'Music', link: '/categories/music' },
  { label: 'History', link: '/categories/history' },
  { label: 'Science', link: '/categories/life' },
]

function Navbar(props) {
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileCategoriesOpen(false)
  }

  return (
    <div className={`fixed top-0 left-0 w-full z-50 ${props.navbarStyle}`}>
      <div className="flex justify-between items-center px-6 md:px-20 py-4 md:py-5">

        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-4">
          <MenuBookIcon className={props.titleStyle} fontSize="large" />
          <h1 className={`font-bold text-xl md:text-2xl ${props.titleStyle}`}>THE BOOK</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10">
          {navItems.map((item) => {
            const isActive = pathname === item.link

            return item.label !== 'Categories' ? (
              <div key={item.link}>
                <Link
                  href={item.link}
                  className={`font-bold flex gap-2 items-center ${props.style} ${isActive ? 'underline' : ''}`}
                >
                  {item.icon}{item.label}
                </Link>
              </div>
            ) : (
              <div
                key={item.link}
                className="relative flex gap-1 items-center group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Link
                  href={item.link}
                  className={`font-bold flex gap-2 items-center ${props.style} ${isActive ? 'underline' : ''}`}
                >
                  {item.icon}{item.label}
                  {isHovered ? (
                    <KeyboardArrowDownIcon className={`${props.style}`} />
                  ) : (
                    <KeyboardArrowRightIcon className={`${props.style}`} />
                  )}
                </Link>

                <div className="bg-white absolute top-full w-45 h-50 left-2 invisible transition-opacity duration-200 group-hover:opacity-100 group-hover:visible group-hover:delay-300">
                  <div className="flex flex-col gap-2 p-2">
                    {categoriesLinks.map((category) => (
                      <div
                        key={category.link}
                        className="h-8 text-[#1F150C] hover:bg-amber-700 cursor-pointer hover:text-white hover:font-bold"
                      >
                        <Link href={category.link}>{category.label}</Link>
                        <hr className="mt-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Profile + Notification + Mobile Menu Button */}
        <div className="flex gap-4 md:gap-6 items-center">
          <Link href="/profile">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-[#41431B] to-[#AEB784] text-white flex items-center justify-center font-bold shadow-md">
              T
            </div>
          </Link>

          {/* Notification bell - single instance, works on all breakpoints via click */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen((prev) => !prev)}
              aria-label="Notifications"
            >
              <NotificationsActiveOutlinedIcon className={`cursor-pointer ${props.IconStyle}`} />
            </button>

            <div
              className={`absolute right-0 top-full pt-2 w-72 max-w-[85vw] origin-top-right transition-all duration-200 ease-out ${
                notificationsOpen
                  ? 'opacity-100 scale-100 translate-y-0 visible'
                  : 'opacity-0 scale-95 -translate-y-1 invisible'
              }`}
            >
              <div className="rounded-2xl bg-[#E1DCC9]/40 backdrop-blur-xl backdrop-saturate-150 border border-white/40 shadow-[0_8px_32px_rgba(31,21,12,0.25),inset_0_1px_0_rgba(255,255,255,0.5)]">
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

          {/* Hamburger toggle - mobile only */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <CloseIcon className={props.IconStyle} fontSize="medium" />
            ) : (
              <MenuIcon className={props.IconStyle} fontSize="medium" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out bg-[#1F150C]/95 backdrop-blur-xl ${
          mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.link

            return item.label !== 'Categories' ? (
              <Link
                key={item.link}
                href={item.link}
                onClick={closeMobileMenu}
                className={`font-bold flex gap-3 items-center text-white py-3 border-b border-white/10 ${isActive ? 'underline' : ''}`}
              >
                {item.icon}{item.label}
              </Link>
            ) : (
              <div key={item.link} className="border-b border-white/10">
                <button
                  onClick={() => setMobileCategoriesOpen((prev) => !prev)}
                  className={`w-full font-bold flex justify-between gap-3 items-center text-white py-3 ${isActive ? 'underline' : ''}`}
                >
                  <span className="flex gap-3 items-center">{item.icon}{item.label}</span>
                  {mobileCategoriesOpen ? (
                    <KeyboardArrowDownIcon className="text-white" />
                  ) : (
                    <KeyboardArrowRightIcon className="text-white" />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-200 ease-out ${
                    mobileCategoriesOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="flex flex-col gap-1 pb-3 pl-8">
                    {categoriesLinks.map((category) => (
                      <Link
                        key={category.link}
                        href={category.link}
                        onClick={closeMobileMenu}
                        className="text-white/80 py-2 hover:text-white"
                      >
                        {category.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Navbar