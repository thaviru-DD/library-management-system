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
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';


const books = [
  { title: 'Sapiens', author: 'Yuval Noah Harari', image: '/bookCovers/book1.jpg', price: '2500', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { title: 'Atomic Habits', author: 'George Orwell', image: '/bookCovers/book10.jpg', price: '3500', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { title: 'Dune', author: 'Frank Herbert', image: '/bookCovers/book3.jpg', price: '4800', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { title: 'Sapiens', author: 'Amélie Laurent', image: '/bookCovers/book4.jpeg', price: '4500', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', image: '/bookCovers/book5.jpg', price: '3000', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { title: '1984', author: 'George Orwell', image: '/bookCovers/book6.jpg', price: '2800', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', image: '/bookCovers/book7.jpg', price: '3200', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { title: 'Pride and Prejudice', author: 'Jane Austen', image: '/bookCovers/book9.jpg', price: '2700', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger', image: '/bookCovers/book11.jpg', price: '2900', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
]

function Page() {

  const [searchQuery, setSearchQuery] = useState('');


  const filteredBooks = books.filter( c=>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

  return (
    <div className='bg-[#FFF8F0]'>
      {/* <Sidebar/> */}
      {/* pl-10 
      ml-64 */}
      <Navbar style='text-[#4B2E2B]' titleStyle='text-[#4B2E2B]'/>

      <main className="flex-1 overflow-x-hidden px-20 ">

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center mt-5">
            <div className="relative flex-1 min-w-[250px]">
              <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" fontSize="small" />
              <input type="text" placeholder="Search books, authors" onChange={(e) => setSearchQuery(e.target.value)}  className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#41431B] focus:bg-white transition-colors"/>
            </div>

            <div className="flex items-center gap-3">
              <FilterListIcon className="text-gray-400" />
              <select className="h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#41431B] cursor-pointer">
                <option value="all">All Categories</option>
                <option value="fiction">Fiction</option>
                <option value="science">Science</option>
                <option value="history">History</option>
              </select>

              <select className="h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#41431B] cursor-pointer">
                <option value="all">All Statuses</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="borrowed">Borrowed</option>
              </select>
            </div>
        </div>

        {/* Hero — parchment box, sized to its OWN content only */}
        {/* <div className='bg-parchment p-5'>

          <div className="items-center">
            <h1 className="font-bold text-4xl">Discover</h1>
          </div> */}

          {/* <SearchBar/> */}

          {/* <div className='mt-20 flex justify-between items-center'>
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

        </div> */}
        {/* ^ parchment box closes HERE now — right after the recommendation row */}

        {/* Popular Books — its own section, plain white background, OUTSIDE the parchment box */}
        <div className='mt-10 px-3'>
          <h1 className='text-gray-700 text-2xl mb-5'>Popular books</h1>
          {/* <div className='flex justify-between items-center flex-wrap gap-2'>
            <BookCard book={{ title: 'Sapiens', author: 'Yuval Noah Harari', image: '/bookCovers/book1.jpg', price: '2500', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." }} />
            <BookCard book={{ title: 'Atomic Habits', author: 'George Orwell', image: '/bookCovers/book10.jpg', price: '3500', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." }} />
            <BookCard book={{ title: 'Dune', author: 'Frank Herbert', image: '/bookCovers/book3.jpg', price: '4800', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." }} />
            <BookCard book={{ title: 'Sapiens', author: 'Amélie Laurent', image: '/bookCovers/book4.jpeg', price: '4500', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." }} />
          </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> 
            {filteredBooks.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center">No books found.</p>
            ) : (
            filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))
            ) }     
          </div>


        </div>

      </main>
    </div>
  )
}

export default Page