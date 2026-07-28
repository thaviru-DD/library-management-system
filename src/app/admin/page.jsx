import React from 'react'
import Sidebar from '@/components/shared/Sidebar'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import Image from 'next/image';

import RecentUserActivity from '@/components/admin/RecentActivity';
import SystemStatus from '@/components/admin/SystemStatus';

import Avatar from '@mui/material/Avatar';



const reservations = [
  { id: '01', cover: '/bookCovers/book1.jpg', title: 'The Great Gatsby', author: 'Amélie Laurent', category: 'Fiction', status: 'Reserved' },
  { id: '02', cover: '/bookCovers/book1.jpg', title: 'The Great Gatsby', author: 'Amélie Laurent', category: 'Fiction', status: 'Reserved' },
  { id: '03', cover: '/bookCovers/book1.jpg', title: 'The Great Gatsby', author: 'Amélie Laurent', category: 'Fiction', status: 'Reserved' },
];



function Page() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>

        <h1 className='text-4xl font-bold'>Admin Dashboard</h1>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className='relative'>
            <SearchIcon className='absolute top-2 left-3' />
            <input
              type="text"
              placeholder='Search books, users, categories'
              className='bg-white w-80 h-10 border-1 border-gray-200 rounded-2xl shadow-sm placeholder:px-12'
            />
          </div>
          <NotificationsOutlinedIcon sx={{ fontSize: '28px' }} />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>

          <div className='p-5 px-10 bg-white shadow-lg rounded-xl flex gap-4 items-center'>
            <div>
              <LibraryBooksOutlinedIcon sx={{backgroundColor: 'purple', color: 'white', fontSize: '50px'}}/>
            </div>
            <div>
              <h4>Total books</h4>
              <h1 className='text-2xl font-bold'>14,350</h1>
              <h4>Books</h4>
            </div>
          </div>

          <div className='p-5 px-10 bg-white shadow-lg rounded-xl flex gap-4 items-center'>
            <div>
              <GroupAddOutlinedIcon sx={{backgroundColor: 'green', color: 'white', fontSize: '50px'}}/>
            </div>
            <div>
              <h4>Total Users</h4>
              <h1 className='text-2xl font-bold'>2,891</h1>
              <h4>users</h4>
            </div>
          </div>

          <div className='p-5 px-10 bg-white shadow-lg rounded-xl flex gap-4 items-center'>
            <div>
              <EventNoteOutlinedIcon sx={{backgroundColor: 'red', color: 'white', fontSize: '50px'}}/>
            </div>
            <div>
              <h4>Active <br />Resavations</h4>
              <h1 className='text-2xl font-bold'>412</h1>
            </div>
          </div>

          <div className='p-5 px-10 bg-white shadow-lg rounded-xl flex gap-4 items-center'>
            <div>
              <BookmarksOutlinedIcon sx={{backgroundColor: 'orange', color: 'white', fontSize: '50px', }}/>
            </div>
            <div>
              <h4>Total <br />Categories</h4>
              <h1 className='text-2xl font-bold'>28</h1>
            </div>
          </div>
          
        </Box>

        {/* Recent Reservations */}
        <Box>
          <div className='bg-white shadow-lg rounded-xl p-5'>
            <h1 className='text-2xl font-bold mb-5'>Recent Reservations</h1>

            <div className='flex flex-col gap-3'>

              {/* Header row */}
              <div className='flex items-center bg-gray-100 p-3 rounded-lg'>
                <h3 className='w-12 text-center font-bold'>ID</h3>
                <h3 className='w-20 text-center font-bold'>Cover</h3>
                <h3 className='flex-1 text-center font-bold'>Title</h3>
                <h3 className='flex-1 text-center font-bold'>Author</h3>
                <h3 className='w-28 text-center font-bold'>Category</h3>
                <h3 className='w-28 text-center font-bold'>Status</h3>
              </div>

              {/* Data rows */}
              {reservations.map((book, index) => (
                <div key={book.id}>
                  <div className='flex items-center p-3'>
                    <h3 className='w-12 text-center'>{book.id}</h3>
                    <div className='w-20 flex justify-center'>
                      <Image src={book.cover} alt={`${book.title} cover`} width={30} height={30} />
                    </div>
                    <h3 className='flex-1 text-center'>{book.title}</h3>
                    <h3 className='flex-1 text-center'>{book.author}</h3>
                    <h3 className='w-28 text-center'>{book.category}</h3>
                    <div className='w-28 flex justify-center'>
                      <span className='bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-3xl'>
                        {book.status}
                      </span>
                    </div>
                  </div>
                  {index < reservations.length - 1 && <hr />}
                </div>
              ))}

          </div>
         </div>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'stretch' }}>
  <Box sx={{ flex: 2 }}>
    <RecentUserActivity />
  </Box>

  <Box sx={{ flex: 1 }}>
    <SystemStatus />
  </Box>
</Box>

        

    

        

      </Box>
    </Box>
  )
}

export default Page