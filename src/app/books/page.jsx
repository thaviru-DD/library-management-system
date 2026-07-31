'use client'
import Sidebar from '@/components/shared/Sidebar'
import Button from '@/components/shared/Button'
import SearchBar from '@/components/shared/SearchBar';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import { motion } from 'framer-motion'
import BookCard from '@/components/user/BookCard';
import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';

function Page() {
  return (
    <div>
      {/* <Sidebar/> */}
      {/* pl-10 
      ml-64 */}
      <Navbar/>

      <main className="flex-1 overflow-x-hidden">

        {/* Hero — parchment box, sized to its OWN content only */}
        <div className='bg-parchment p-5'>

          <div className="items-center">
            <h1 className="font-bold text-4xl">Discover</h1>
          </div>

          {/* <SearchBar/> */}

          <div className='mt-20 flex justify-between items-center'>
            <h3 className='text-gray-700 text-xl'>Book Recommendation</h3>
            <Button name="View all" style="bg-white text-black px-5 py-1 rounded-lg"/>
          </div>

          <div className='mt-10 flex justify-between px-3'>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              <Image src="/bookCovers/book4.jpeg" alt="Book Cover" width={200} height={300} className="shadow-lg rounded-lg"/>
            </motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
              <Image src="/bookCovers/book5.jpg" alt="Book Cover" width={200} height={300} className='shadow-lg rounded-lg'/>
            </motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
              <Image src="/bookCovers/book6.jpg" alt="Book Cover" width={200} height={300} className='shadow-lg rounded-lg'/>
            </motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}>
              <Image src="/bookCovers/book7.jpg" alt="Book Cover" width={200} height={300} className='shadow-lg rounded-lg'/>
            </motion.div>
          </div>

        </div>
        {/* ^ parchment box closes HERE now — right after the recommendation row */}

        {/* Popular Books — its own section, plain white background, OUTSIDE the parchment box */}
        <div className='mt-10 px-3'>
          <h1 className='text-gray-700 text-2xl mb-5'>Popular books</h1>
          <div className='flex justify-between items-center flex-wrap gap-2'>
            <BookCard book={{ title: 'Sapiens', author: 'Yuval Noah Harari', image: '/bookCovers/book1.jpg', price: '2500', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." }} />
            <BookCard book={{ title: 'Atomic Habits', author: 'George Orwell', image: '/bookCovers/book10.jpg', price: '3500', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." }} />
            <BookCard book={{ title: 'Dune', author: 'Frank Herbert', image: '/bookCovers/book3.jpg', price: '4800', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." }} />
            <BookCard book={{ title: 'Sapiens', author: 'Amélie Laurent', image: '/bookCovers/book4.jpeg', price: '4500', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." }} />
          </div>
        </div>

      </main>
    </div>
  )
}

export default Page