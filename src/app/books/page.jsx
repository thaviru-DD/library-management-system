'use client'
import Sidebar from '@/components/shared/Sidebar'
import Button from '@/components/shared/Button'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React from 'react'
import SearchBar from '@/components/shared/SearchBar';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import {motion} from 'framer-motion'
import { Book } from '@mui/icons-material';
import BookCard from '@/components/user/BookCard';



function page() {
  return (
    <div className='flex'>
      <Sidebar/>
      
      <main className="flex-1 pl-10 overflow-x-hidden">

        <div className='bg-parchment h-120 p-10 '>

          <div className="flex justify-between items-center">
            <h1 className="font-bold text-4xl">Discover</h1>
              <div className='flex gap-6 items-center'>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <NotificationsActiveOutlinedIcon/>
              </div>
            </div>

          <SearchBar/>

          <div className='mt-20 flex justify-between items-center'>
              <h3 className='text-gray-700 text-xl'>Book Recemendation</h3>
              <Button name="View all" style="bg-white text-black px-5 py-1 rounded-lg"/>
          </div>


          <div className='mt-10 flex justify-between px-3'>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{duration: 3, repeat: Infinity, ease: "easeInOut",}}>
              <Image src="/bookCovers/book4.jpeg" alt="Book Cover" width={200} height={300} className="shadow-lg rounded-lg"/>
            </motion.div>

            <motion.div animate={{ y: [0, -10, 0] }} transition={{duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3}}>
              <Image src="/bookCovers/book5.jpg" alt="Book Cover" width={200} height={300} className='shadow-lg rounded-lg'/>
            </motion.div>

            <motion.div animate={{ y: [0, -10, 0] }} transition={{duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6}}>
              <Image src="/bookCovers/book6.jpg" alt="Book Cover" width={200} height={300} className='shadow-lg rounded-lg'/>
            </motion.div>
            
            <motion.div animate={{ y: [0, -10, 0] }} transition={{duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.9}}>
              <Image src="/bookCovers/book7.jpg" alt="Book Cover" width={200} height={300} className='shadow-lg rounded-lg'/>
            </motion.div>
          </div>

          

          <h1 className='text-gray-700 text-2xl mt-5'>Popuar books</h1>
          <div className='flex justify-between items-center mt-5'>
            
            <BookCard book={{ title: 'Sapiens', author: 'Yuval Noah Harari', image: '/bookCovers/book1.jpg', price: '2500', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat temporibus culpa, unde id vel quis, a tempora atque quia incidunt et eveniet hic suscipit voluptatem reprehenderit voluptatibus. Nihil, earum a." }} />
            <BookCard book={{ title: '1984', author: 'George Orwell', image: '/bookCovers/book10.jpg', price: '3500', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat temporibus culpa, unde id vel quis, a tempora atque quia incidunt et eveniet hic suscipit voluptatem reprehenderit voluptatibus. Nihil, earum a."  }} />
            <BookCard book={{ title: 'Dune', author: 'Frank Herbert', image: '/bookCovers/book3.jpg', price: '4800', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat temporibus culpa, unde id vel quis, a tempora atque quia incidunt et eveniet hic suscipit voluptatem reprehenderit voluptatibus. Nihil, earum a."  }} />
            <BookCard book={{ title: 'Sapiens', author: 'Amélie Laurent', image: '/bookCovers/book4.jpeg', price: '4500', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat temporibus culpa, unde id vel quis, a tempora atque quia incidunt et eveniet hic suscipit voluptatem reprehenderit voluptatibus. Nihil, earum a."  }} />
          </div>

          




          

          

          


        </div>

        

        


      </main>
    </div>
  )
}

export default page
