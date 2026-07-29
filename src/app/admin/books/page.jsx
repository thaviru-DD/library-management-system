'use cleint'

import Sidebar from '@/components/shared/Sidebar'
import Button from '@/components/shared/Button'
import { Box } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


function page() {

  const reservations = [
    {  cover: '/bookCovers/book1.jpg', title: 'The Great Gatsby', author: 'Amélie Laurent', category: 'Fiction', status: 'Reserved', isbn: '978-4-16' },
    {  cover: '/bookCovers/book2.jpg', title: '1984', author: 'George Orwell', category: 'Fiction', status: 'Reserved', isbn: '462-3-12' },
    {  cover: '/bookCovers/book3.jpg', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Fiction', status: 'Reserved', isbn: '654-7-10' },
    {  cover: '/bookCovers/book1.jpg', title: 'The Great Gatsby', author: 'Amélie Laurent', category: 'Fiction', status: 'Reserved', isbn: '654-7-10' }
  ];
  
  return (
    
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 4,  }}>

        <div className='flex justify-between items-center'>
          <h1 className='text-4xl font-bold'>Books Management</h1>
          <Button name='+ Add new Book' style="bg-yellow-400 px-4 py-2 rounded-[10px] cursor-pointer" />
        </div>

        <div className='flex justify-between items-center mt-10'>
          <div className='relative '>
            <SearchIcon className='absolute top-2 left-3' />
            <input
              type="text"
              placeholder='Search books, authors, ISBN'
              className='bg-white w-80 h-10 border-1 border-gray-200 rounded-[0.5rem] shadow-sm placeholder:px-12'
            />

            

          </div>

          <select name="" id="" className='bg-white w-40 h-10 border-1 border-gray-200 rounded-[0.5rem] shadow-sm placeholder:px-20 ml-4'>
              <option value="fiction">Fiction</option>
              <option value="science">Science</option>
              <option value="history">History</option>
            </select>

            <input type="text" placeholder='Author' className='bg-white w-60 h-10 border-1 border-gray-200 rounded-[0.5rem] shadow-sm placeholder:px-2'/>

            <select name="" id="" className='bg-white w-40 h-10 border-1 border-gray-200 rounded-[0.5rem] shadow-sm placeholder:px-20 ml-4'>
              <option value="fiction">All staus</option>
              <option value="science">Books</option>
              <option value="history">Authors</option>
            </select>
        </div>

                <Box className='mt-10'>
                  <div className='bg-white shadow-lg rounded-xl p-5'>
                    
                    <div className='flex gap-2'>
                      <button className='bg-gray-200 px-5 py-2 rounded-2xl border-gray-300 border-1 text-gray-500'>Edit Selected</button>
                      <button className='bg-gray-200 px-5 py-2 rounded-2xl border-gray-300 border-1 text-gray-500'>Delete Selected</button>
                      <select name="" id="" className='bg-white px-3 py-2 rounded-2xl border-gray-300 border-1 text-gray-700'>
                        <option value="" >Asign to Category</option>
                      </select>
                    </div>
        
                    <div className='flex flex-col gap-3 mt-5'>
        
                      {/* Header row */}
                      <div className='flex items-center bg-gray-100 p-3 rounded-lg'>
                        <h3 className='w-20 text-center font-bold'>Cover</h3>
                        <h3 className='flex-1 text-center font-bold'>Title</h3>
                        <h3 className='flex-1 text-center font-bold'>Author</h3>
                        <h3 className='w-28 text-center font-bold'>Category</h3>
                        <h3 className='w-28 text-center font-bold'>Status</h3>
                        <h3 className='w-28 text-center font-bold'>ISBN</h3>
                        <h3 className='w-28 text-center font-bold'>Action</h3>

                      </div>
        
                      {/* Data rows */}
                      {reservations.map((book, index) => (
                        <div key={book.id}>
                          <div className='flex items-center p-3'>
                          
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
                            <h3 className='w-28 text-center'>{book.isbn}</h3>
                            
                            <div className='w-28 flex justify-center gap-2'>
                              <button><RemoveRedEyeOutlinedIcon sx={{color: 'gray', cursor: 'pointer'}}/></button>
                              <button><ModeEditOutlineOutlinedIcon sx={{color: 'gray', cursor: 'pointer'}}/></button>
                              <button><DeleteOutlinedIcon sx={{color: 'red', cursor: 'pointer'}}/></button>
                            </div>
                            
                          </div>
                          {index < reservations.length - 1 && <hr />}
                        </div>
                      ))}
        
                  </div>
                 </div>
                </Box>
        

        

      </Box>
    </Box>
  )
}

export default page






