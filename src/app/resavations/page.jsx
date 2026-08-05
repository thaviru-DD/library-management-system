'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedReservations = JSON.parse(localStorage.getItem('reservedBooks')) || [];
    setReservations(storedReservations);
  }, []);

  // Helper function to format ISO dates to readable strings
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Helper function to calculate remaining days/hours
  const calculateTimeRemaining = (endDateString) => {
    const now = new Date();
    const end = new Date(endDateString);
    const diffTime = end - now;

    if (diffTime <= 0) return "Expired";

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);

    if (diffDays > 0) {
      return `${diffDays} days, ${diffHours} hrs left`;
    }
    return `${diffHours} hours left`;
  };

  // Function to handle returning a book early
  const handleReturn = (bookTitle) => {
    const updatedReservations = reservations.filter(r => r.title !== bookTitle);
    localStorage.setItem('reservedBooks', JSON.stringify(updatedReservations));
    setReservations(updatedReservations);
  };

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
              Your Account
            </span>
          </div>
          <div className="flex justify-between items-end">
            <h1 className="font-serif text-4xl sm:text-5xl text-[#3D2B1F] font-semibold">
              Active Reservations
            </h1>
            <span className="text-sm text-[#8C7B6B] hidden sm:block font-medium">
              {reservations.length} {reservations.length === 1 ? 'book' : 'books'} reserved
            </span>
          </div>
        </motion.div>

        {/* Reservations List */}
        {reservations.length === 0 ? (
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
              No active reservations
            </h3>
            <p className="text-[#8C7B6B] mb-6 text-center max-w-sm">
              You haven't reserved any books yet. Head over to our collection to borrow your next read.
            </p>
            <Link 
              href="/categories" 
              className="bg-[#41431B] text-[#F8F3E1] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#2b2d12] transition-colors shadow-md"
            >
              Browse Books
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {reservations.map((reservation, index) => (
              <motion.div
                key={reservation.title + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-[#3D2B1F]/5 shadow-sm p-5 flex gap-5"
              >
                {/* Book Image */}
                <div className="relative w-24 h-36 shrink-0 rounded-md overflow-hidden bg-[#FBF6EC]">
                    <Image
                        src={reservation.image}
                        alt={reservation.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Reservation Details */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="font-serif font-semibold text-lg text-[#3D2B1F] line-clamp-1">
                        {reservation.title}
                    </h2>
                    <p className="text-sm text-[#8C7B6B]">{reservation.author}</p>
                  </div>

                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-[#3D2B1F]">
                      <span className="font-semibold">Started:</span> {formatDate(reservation.startDate)}
                    </p>
                    <p className="text-xs text-[#3D2B1F]">
                      <span className="font-semibold">Ends:</span> {formatDate(reservation.endDate)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-[#B3261E]">
                      <AccessTimeIcon fontSize="small" />
                      <span>{calculateTimeRemaining(reservation.endDate)}</span>
                    </div>
                    
                    <button 
                      onClick={() => handleReturn(reservation.title)}
                      className="text-xs font-semibold text-[#8C7B6B] hover:text-[#3D2B1F] underline underline-offset-2 transition-colors"
                    >
                      Return Early
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
      </main>

      <Footer/>
    </div>
  )
}