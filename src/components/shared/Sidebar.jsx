import React from 'react'

// Side bar navigation icons
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';


// Sidebar navigation items
const navItems = [
  { icon: <HomeFilledIcon/>, label: 'Discover', link: '/' },
  { icon: <DragIndicatorIcon/>, label: 'Category', link: '/' },
  { icon: <BookmarkIcon/>, label: 'My Library', link: '/' },
  { icon: <SimCardDownloadIcon/>, label: 'Download', link: '/' },
  { icon: <FavoriteIcon/>, label: 'Favourite', link: '/' },
]

const bottomNavItems = [
  { icon: <SettingsApplicationsIcon />, label: 'Setting', link: '/' },
  { icon: <HelpIcon />, label: 'Help', link: '/' },
  { icon: <LogoutIcon />, label: 'Log out', link: '/' },
];


function Sidebar() {
  return (
    <div className='top-0 left-0 w-64 h-screen bg-white p-5 z-20 '>

      <h1 className='font-bold text-2xl'>THE BOOK</h1>
      <h3 className='text-gray-400 mt-5'>MENU</h3>

      <div className='mt-8 flex flex-col gap-10'>

        {navItems.map((item) => (
          <div key={item.label} className='group cursor-pointer'>

            <div className='inline bg-gray-200 text-gray-500 px-3 pt-2 pb-3 rounded-lg transition-all duration-300 group-hover:shadow-xl group-hover:bg-orange-500 group-hover:text-white'>
              {item.icon}
            </div>

            <span className='ml-2 text-gray-600 transition-all duration-300 group-hover:text-black'>{item.label}</span>
          </div>
        ))}

        <div className="h-px w-45 bg-gray-300 my-5"></div>

        {bottomNavItems.map((item) => (
          <div key={item.label} className='group cursor-pointer'>

            <div className='inline bg-gray-200 text-gray-500 px-3 pt-2 pb-3 rounded-lg transition-all duration-300 group-hover:shadow-xl group-hover:bg-orange-500 group-hover:text-white'>
              {item.icon}
            </div>

            <span className='ml-2 text-gray-600 transition-all duration-300 group-hover:text-black'>{item.label}</span>
          </div>
        ))}

        

      </div>

      {/* <div className='w-40'>
        <div className='w-40 h-40 bg-purple-400 rounded-2xl'></div>
        <h3 className='text-center mt-2 text-gray-600'>BOOK LIBRARY</h3>
      </div> */}

    </div>
  )
}

export default Sidebar