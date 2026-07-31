'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Components
import Sidebar from '@/components/shared/Sidebar';
import RecentUserActivity from '@/components/admin/RecentActivity';
import SystemStatus from '@/components/admin/SystemStatus';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';


const stats = [
  { icon: <LibraryBooksOutlinedIcon />, label: 'Total Books', value: '14,350', trend: '+12%', unit: 'this month', accent: 'bg-[#41431B]' },
  { icon: <GroupAddOutlinedIcon />, label: 'Total Users', value: '2,891', trend: '+5%', unit: 'this month', accent: 'bg-[#AEB784]' },
  { icon: <EventNoteOutlinedIcon />, label: 'Active Reservations', value: '412', trend: '-2%', unit: 'this week', accent: 'bg-orange-500' },
  { icon: <BookmarksOutlinedIcon />, label: 'Total Categories', value: '28', trend: '+1', unit: 'this year', accent: 'bg-[#41431B]' },
];

const reservations = [
  { id: '01', cover: '/bookCovers/book1.jpg', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', status: 'Reserved' },
  { id: '02', cover: '/bookCovers/book2.jpg', title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', status: 'Active' },
  { id: '03', cover: '/bookCovers/book3.jpg', title: 'Atomic Habits', author: 'James Clear', category: 'Self-Help', status: 'Overdue' },
  { id: '04', cover: '/bookCovers/book4.jpg', title: '1984', author: 'George Orwell', category: 'Fiction', status: 'Reserved' },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // MODAL STATES
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Reserved': return 'bg-[#AEB784]/20 text-[#41431B]';
      case 'Active': return 'bg-blue-100 text-blue-700';
      case 'Overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-800 font-sans">
      <Sidebar />

      <main className="ml-64 flex flex-col gap-8 p-10">

        {/* TOP BAR */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="pl-2">
            <h1 className="text-2xl font-extrabold text-[#41431B] tracking-tight">Dashboard Overview</h1>
            <p className="text-sm text-gray-500 mt-1">Welcome back, Admin. Here is what's happening today.</p>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative group">
              <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 group-focus-within:text-[#41431B] transition-colors" fontSize="small" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books, users..."
                className="bg-gray-50 w-72 h-10 pl-10 pr-4 border border-transparent rounded-full shadow-inner text-sm outline-none focus:border-[#41431B] focus:bg-white transition-all duration-300"
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 border border-gray-100 hover:bg-[#F8F3E1] transition-colors"
            >
              <NotificationsOutlinedIcon fontSize="small" className="text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border border-white" />
            </motion.button>

            <div className="h-10 w-px bg-gray-200"></div>

            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#41431B] to-[#AEB784] text-white flex items-center justify-center font-bold shadow-md">
                A
              </div>
            </div>
          </div>
        </motion.header>

        {/* QUICK ACTIONS */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="flex gap-4"
        >
          {/* UPDATED BUTTON: Opens the Add Book Modal onClick */}
          <button 
            onClick={() => setIsAddBookModalOpen(true)}
            className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl border border-gray-200 shadow-sm hover:border-[#AEB784] hover:shadow-md transition-all text-sm font-semibold text-gray-700"
          >
            <AddCircleOutlineOutlinedIcon fontSize="small" className="text-[#AEB784]" /> Add New Book
          </button>
          
          <button 
            onClick={() => setIsRegisterModalOpen(true)}
            className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl border border-gray-200 shadow-sm hover:border-[#AEB784] hover:shadow-md transition-all text-sm font-semibold text-gray-700"
          >
            <PersonAddOutlinedIcon fontSize="small" className="text-[#AEB784]" /> Register User
          </button>
          
          <button className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl border border-gray-200 shadow-sm hover:border-[#AEB784] hover:shadow-md transition-all text-sm font-semibold text-gray-700">
            <FileDownloadOutlinedIcon fontSize="small" className="text-[#AEB784]" /> Export Reports
          </button>
        </motion.div>

        {/* STAT CARDS */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-4 gap-6">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants} whileHover={{ y: -5 }} className="bg-white shadow-sm hover:shadow-md border border-gray-100 rounded-2xl p-6 flex flex-col justify-between transition-shadow relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-inner ${stat.accent}`}>{stat.icon}</div>
                <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full"><TrendingUpIcon fontSize="inherit" />{stat.trend}</div>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-[#41431B]">{stat.value}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  {stat.unit && <p className="text-gray-400 text-xs">({stat.unit})</p>}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-transparent to-gray-50 rounded-full opacity-50 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-3 gap-8 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="col-span-2 bg-white shadow-sm border border-gray-100 rounded-3xl p-7">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#41431B]">Recent Reservations</h2>
              <button className="text-sm font-semibold text-[#AEB784] hover:text-[#41431B] transition-colors">View All</button>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center bg-[#F8F3E1]/60 px-4 py-3 rounded-xl mb-2">
                <h3 className="w-12 text-center font-bold text-xs uppercase tracking-wider text-gray-500">ID</h3>
                <h3 className="w-16 text-center font-bold text-xs uppercase tracking-wider text-gray-500">Cover</h3>
                <h3 className="flex-1 text-left pl-4 font-bold text-xs uppercase tracking-wider text-gray-500">Book Details</h3>
                <h3 className="w-28 text-center font-bold text-xs uppercase tracking-wider text-gray-500">Category</h3>
                <h3 className="w-24 text-center font-bold text-xs uppercase tracking-wider text-gray-500">Status</h3>
                <h3 className="w-10 text-center"></h3>
              </div>
              <motion.div variants={containerVariants} initial="hidden" animate="show">
                {reservations.map((book) => (
                  <motion.div key={book.id} variants={itemVariants} className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors rounded-xl group border-b border-gray-50 last:border-0">
                    <h3 className="w-12 text-center text-sm font-medium text-gray-400">#{book.id}</h3>
                    <div className="w-16 flex justify-center">
                      <div className="relative w-10 h-14 shadow-sm rounded-md overflow-hidden bg-gray-200">
                        <Image src={book.cover} alt={book.title} fill className="object-cover" />
                      </div>
                    </div>
                    <div className="flex-1 pl-4">
                      <h3 className="text-sm font-bold text-gray-800">{book.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{book.author}</p>
                    </div>
                    <h3 className="w-28 text-center text-sm font-medium text-gray-600">{book.category}</h3>
                    <div className="w-24 flex justify-center">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(book.status)}`}>{book.status}</span>
                    </div>
                    <div className="w-10 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                        <MoreVertIcon fontSize="small" className="text-gray-500" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="col-span-1 flex flex-col gap-6">
            <div className="bg-white shadow-sm border border-gray-100 rounded-3xl p-6">
              <RecentUserActivity />
            </div>
            <div className="bg-[#41431B] shadow-lg rounded-3xl p-6 text-white">
              <SystemStatus />
            </div>
          </motion.div>
        </div>

      </main>

      {/* MODAL COMPONENTS */}
      <RegisterUserModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
      />

      <AddBookModal 
        isOpen={isAddBookModalOpen} 
        onClose={() => setIsAddBookModalOpen(false)} 
      />
    </div>
  );
}


// ---------------------------------------------------------
// ADD BOOK MODAL COMPONENT
// ---------------------------------------------------------
function AddBookModal({ isOpen, onClose }) {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save book here
    setPreviewImage(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 z-10"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#41431B]">Add New Book</h2>
                <p className="text-sm text-gray-500 mt-1">Add a new book to the library inventory.</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                <CloseIcon fontSize="small" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Cover Image Upload */}
              <div className="flex gap-6 items-center bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-300">
                <div className="relative w-16 h-24 bg-gray-200 rounded-lg overflow-hidden shadow-sm border border-gray-100 flex-shrink-0">
                  {previewImage ? (
                    <Image src={previewImage} alt="Preview" fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400">
                      <LibraryBooksOutlinedIcon />
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1">Cover Image</label>
                  <p className="text-xs text-gray-500 mb-3">Upload a high-quality JPG or PNG.</p>
                  <label className="cursor-pointer bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-4 py-2 rounded-lg hover:border-[#41431B] transition-colors inline-flex items-center gap-2 w-max">
                    <CloudUploadOutlinedIcon fontSize="small" /> Choose File
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-sm font-semibold text-gray-700">Book Title *</label>
                  <input type="text" required placeholder="e.g. The Great Gatsby" className="w-full h-11 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#41431B] focus:ring-1 focus:ring-[#41431B] transition-all bg-gray-50 focus:bg-white text-sm" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-sm font-semibold text-gray-700">Author *</label>
                  <input type="text" required placeholder="e.g. F. Scott Fitzgerald" className="w-full h-11 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#41431B] focus:ring-1 focus:ring-[#41431B] transition-all bg-gray-50 focus:bg-white text-sm" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-sm font-semibold text-gray-700">Category *</label>
                  <select required className="w-full h-11 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#41431B] focus:ring-1 focus:ring-[#41431B] transition-all bg-gray-50 focus:bg-white text-sm text-gray-700">
                    <option value="">Select Category</option>
                    <option value="fiction">Fiction</option>
                    <option value="science">Science</option>
                    <option value="history">History</option>
                    <option value="self-help">Self-Help</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-sm font-semibold text-gray-700">ISBN</label>
                  <input type="text" placeholder="e.g. 978-3-16-148410-0" className="w-full h-11 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#41431B] focus:ring-1 focus:ring-[#41431B] transition-all bg-gray-50 focus:bg-white text-sm" />
                </div>
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-[#41431B] text-[#F8F3E1] font-semibold text-sm hover:bg-[#2b2d12] transition-colors shadow-md">
                  Save Book
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------
// REGISTER USER MODAL COMPONENT (Unchanged)
// ---------------------------------------------------------
function RegisterUserModal({ isOpen, onClose }) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 z-10"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#41431B]">Register New User</h2>
                <p className="text-sm text-gray-500 mt-1">Add a new member to the library system.</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                <CloseIcon fontSize="small" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <input type="text" required placeholder="John Doe" className="w-full h-11 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#41431B] focus:ring-1 focus:ring-[#41431B] transition-all bg-gray-50 focus:bg-white text-sm" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <input type="email" required placeholder="john@example.com" className="w-full h-11 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#41431B] focus:ring-1 focus:ring-[#41431B] transition-all bg-gray-50 focus:bg-white text-sm" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Role</label>
                <select className="w-full h-11 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#41431B] focus:ring-1 focus:ring-[#41431B] transition-all bg-gray-50 focus:bg-white text-sm text-gray-700">
                  <option value="user">Standard User</option>
                  <option value="admin">Administrator</option>
                  <option value="librarian">Librarian</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Temporary Password</label>
                <input type="password" required placeholder="••••••••" className="w-full h-11 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#41431B] focus:ring-1 focus:ring-[#41431B] transition-all bg-gray-50 focus:bg-white text-sm" />
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-[#41431B] text-[#F8F3E1] font-semibold text-sm hover:bg-[#2b2d12] transition-colors shadow-md">
                  Create User
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}