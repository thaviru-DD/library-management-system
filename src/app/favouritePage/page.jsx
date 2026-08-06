'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import BookCard from '@/components/user/BookCard';
import MenuBookIcon from '@mui/icons-material/MenuBook';

// Small spine-stripe motif (reused from your other pages for consistency)
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

export default function FavouritePage() {
  const [favorites, setFavorites] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Retrieve the favorited books from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
    setFavorites(storedFavorites);

    // Optional: Listen for storage changes if they happen in other tabs
    const handleStorageChange = () => {
      const updatedFavorites = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
      setFavorites(updatedFavorites);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Prevent rendering the list until the client has mounted to avoid hydration mismatch
  if (!mounted) return <div className="bg-[#FBF6EC] min-h-screen"></div>;

  return (
    <div className='bg-[#FBF6EC] min-h-screen flex flex-col'>
      <Navbar style='text-[#3D2B1F]' titleStyle='text-[#3D2B1F]'/>

      <main className="flex-1 px-6 sm:px-12 lg:px-20 pt-32 pb-24">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <SpineMark />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#8C7B6B] uppercase">
              Personal Collection
            </span>
          </div>
          <div className="flex justify-between items-end">
            <h1 className="font-serif text-4xl sm:text-5xl text-[#3D2B1F] font-semibold">
              Your Favourites
            </h1>
            <span className="text-sm text-[#8C7B6B] hidden sm:block font-medium">
              {favorites.length} {favorites.length === 1 ? 'book' : 'books'} saved
            </span>
          </div>
        </motion.div>

        {/* Favorites Grid or Empty State */}
        {favorites.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-[#3D2B1F]/15 rounded-3xl bg-white/30"
          >
            <div className="w-16 h-16 bg-[#FBF6EC] rounded-full flex items-center justify-center mb-4 shadow-sm text-[#8C7B6B]">
               <MenuBookIcon />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-[#3D2B1F] mb-2">
              Your shelf is empty
            </h3>
            <p className="text-[#8C7B6B] mb-6 text-center max-w-sm">
              You haven't added any books to your favourites yet. Explore our categories to find your next great read.
            </p>
            <Link 
              href="/categories" 
              className="bg-[#41431B] text-[#F8F3E1] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#2b2d12] transition-colors shadow-md"
            >
              Browse Categories
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((book, index) => (
              <motion.div
                key={book.title + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </div>
        )}
        
      </main>

      <Footer/>
    </div>
  )
}