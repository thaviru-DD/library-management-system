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
import Footer from '@/components/shared/Footer';


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

// Small spine-stripe motif — echoes a shelf of book spines, used as a
// structural marker instead of a generic icon or number badge.
function SpineMark({ className = '' }) {
  const stripes = ['#41431B', '#8A9A6E', '#C97B4A', '#3D2B1F'];
  return (
    <div className={`flex gap-[3px] h-5 ${className}`} aria-hidden="true">
      {stripes.map((c, i) => (
        <span key={i} className="w-[3px] rounded-full" style={{ backgroundColor: c }} />
      ))}
    </div>
  );
}

function Page() {

  const [searchQuery, setSearchQuery] = useState('');


  const filteredBooks = books.filter( c=>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <div className='bg-[#FBF6EC] min-h-screen'>

      <Navbar style='text-[#3D2B1F]' titleStyle='text-[#3D2B1F]'/>

      <main className="flex-1 overflow-x-hidden">

        {/* HERO */}
        <div className="relative px-6 sm:px-12 lg:px-20 pt-28">
          <div className="relative rounded-[2rem] overflow-hidden shadow-xl">
            <Image
              src="/background-images/stack-books-with-library-scene.jpg"
              alt="Stacks of books in a warmly lit library"
              width={1600}
              height={640}
              className="w-full h-[420px] object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#221708]/85 via-[#221708]/30 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
              <SpineMark className="mb-4" />
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#FBF6EC] max-w-xl leading-[1.05]"
              >
                Find your next chapter
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
                className="mt-4 text-[#FBF6EC]/80 max-w-md text-base sm:text-lg"
              >
                Thousands of titles, borrowed in seconds, waiting on the shelf for you.
              </motion.p>
            </div>
          </div>

          {/* Floating search / filter panel — bridges hero into content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
            className="relative sm:absolute sm:left-20 sm:right-20 sm:-bottom-8 mt-4 sm:mt-0 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-[#3D2B1F]/5 flex flex-wrap gap-3 items-center"
          >
            <div className="relative flex-1 min-w-[240px]">
              <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 text-[#8C7B6B]" fontSize="small" />
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-10 pr-4 bg-[#FBF6EC] border border-[#3D2B1F]/10 rounded-xl text-sm text-[#3D2B1F] placeholder:text-[#8C7B6B] focus:outline-none focus:border-[#41431B] focus:bg-white transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              <FilterListIcon className="text-[#8C7B6B] hidden sm:block" fontSize="small" />
              <select className="h-12 px-4 bg-[#FBF6EC] border border-[#3D2B1F]/10 rounded-xl text-sm text-[#3D2B1F] focus:outline-none focus:border-[#41431B] cursor-pointer">
                <option value="all">All categories</option>
                <option value="fiction">Fiction</option>
                <option value="science">Science</option>
                <option value="history">History</option>
              </select>

              <select className="h-12 px-4 bg-[#FBF6EC] border border-[#3D2B1F]/10 rounded-xl text-sm text-[#3D2B1F] focus:outline-none focus:border-[#41431B] cursor-pointer">
                <option value="all">All statuses</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="borrowed">Borrowed</option>
              </select>
            </div>
          </motion.div>
        </div>

        {/* POPULAR BOOKS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="px-6 sm:px-12 lg:px-20 mt-20 sm:mt-16 pb-24"
        >
          <div className="flex items-center gap-3 mb-1">
            <SpineMark />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#8C7B6B] uppercase">
              On the shelf
            </span>
          </div>
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3D2B1F] font-semibold">
              Popular books
            </h2>
            <span className="text-sm text-[#8C7B6B] hidden sm:block">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'title' : 'titles'}
            </span>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-[#3D2B1F]/15 rounded-2xl">
              <p className="text-[#8C7B6B]">No books match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <motion.div
                  key={book.title + book.image}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

      </main>
      <Footer/>
    </div>
  )
}

export default Page