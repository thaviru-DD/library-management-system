'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Sidebar from '@/components/shared/Sidebar';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Button from '@/components/shared/Button';

// Mock Data
const initialBooks = [
  { id: '1', cover: '/bookCovers/book1.jpg', title: 'The Great Gatsby', author: 'Amélie Laurent', category: 'Fiction', status: 'Available', isbn: '978-4-16' },
  { id: '2', cover: '/bookCovers/book2.jpg', title: '1984', author: 'George Orwell', category: 'Fiction', status: 'Reserved', isbn: '462-3-12' },
  { id: '3', cover: '/bookCovers/book3.jpg', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', status: 'Borrowed', isbn: '654-7-10' },
  { id: '4', cover: '/bookCovers/book1.jpg', title: 'Atomic Habits', author: 'James Clear', category: 'Self-Help', status: 'Available', isbn: '112-9-88' }
];

export default function BooksManagementPage() {
  // STATE
  const [books, setBooks] = useState(initialBooks); // Moved to state so it can update
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  // Handle individual row selection
  const toggleSelection = (id) => {
    setSelectedBooks(prev => 
      prev.includes(id) ? prev.filter(bookId => bookId !== id) : [...prev, id]
    );
  };

  // Handle "Select All" checkbox
  const toggleSelectAll = () => {
    if (selectedBooks.length === books.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(books.map(book => book.id));
    }
  };

  // Handle Image Upload Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle Form Submission
  const handleAddBook = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Create new book object from form data
    const newBook = {
      id: Date.now().toString(), // Generate a fake unique ID
      title: formData.get('title'),
      author: formData.get('author'),
      description: formData.get('description'),
      // Fallback to a default if no image is uploaded
      cover: previewImage || '/bookCovers/book1.jpg', 
      category: 'Uncategorized', // Defaulting for now
      status: 'Available',
      isbn: `100-${Math.floor(Math.random() * 9)}-${Math.floor(Math.random() * 99)}` // Fake ISBN
    };

    setBooks([newBook, ...books]); // Add new book to top of list
    setIsAddModalOpen(false); // Close modal
    setPreviewImage(null); // Reset preview
  };

  // Helper for dynamic status colors
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Available': return 'bg-green-100 text-green-700';
      case 'Reserved': return 'bg-orange-100 text-orange-700';
      case 'Borrowed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-800 font-sans flex overflow-hidden">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-10 flex flex-col gap-8 relative">
        
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-[#41431B] tracking-tight">Books Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your library inventory, track statuses, and add new books.</p>
          </div>
          
          <Button name='Add New Book' style='flex items-center gap-2 bg-[#41431B] text-[#F8F3E1] px-5 py-2.5 rounded-xl font-semibold shadow-md hover:bg-[#2b2d12] transition-colors cursor-pointer' icon={<AddIcon fontSize="small" />} onClick={() => setIsAddModalOpen(true)}/>
        </div>

        {/* FILTERS & SEARCH */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[250px]">
            <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" fontSize="small" />
            <input type="text" placeholder="Search books, authors, ISBN..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#41431B] focus:bg-white transition-colors"/>
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

        {/* DATA TABLE AREA */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 flex flex-col">
          
          {/* Bulk Actions */}
          <div className="flex items-center gap-3 mb-6">
            {/* <button disabled={selectedBooks.length === 0} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors">
              Edit Selected ({selectedBooks.length})
            </button>
            <button disabled={selectedBooks.length === 0} className="px-4 py-2 bg-red-50 border border-red-100 rounded-lg text-sm font-medium text-red-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-100 transition-colors">
              Delete Selected
            </button> */}
            <Button name={`Edit Selected (${selectedBooks.length})`} disabled={selectedBooks.length === 0} style='px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors'/>
            <Button name='Delete Selected' disabled={selectedBooks.length === 0} style='px-4 py-2 bg-red-50 border border-red-100 rounded-lg text-sm font-medium text-red-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-100 transition-colors'/>

            <select disabled={selectedBooks.length === 0} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-[#41431B]">
              <option value="">Assign to Category</option>
              <option value="fiction">Fiction</option>
              <option value="science">Science</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Table Header */}
              <div className="flex items-center bg-[#F8F3E1]/60 px-4 py-3 rounded-xl mb-2">
                <div className="w-12 flex justify-center">
                  <input 
                    type="checkbox" 
                    checked={selectedBooks.length === books.length && books.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 accent-[#41431B] cursor-pointer"
                  />
                </div>
                <h3 className="w-16 text-center font-bold text-xs uppercase tracking-wider text-gray-500">Cover</h3>
                <h3 className="flex-1 text-left pl-4 font-bold text-xs uppercase tracking-wider text-gray-500">Title & Author</h3>
                <h3 className="w-32 text-left font-bold text-xs uppercase tracking-wider text-gray-500">Category</h3>
                <h3 className="w-28 text-center font-bold text-xs uppercase tracking-wider text-gray-500">Status</h3>
                <h3 className="w-32 text-center font-bold text-xs uppercase tracking-wider text-gray-500">ISBN</h3>
                <h3 className="w-28 text-center font-bold text-xs uppercase tracking-wider text-gray-500">Actions</h3>
              </div>

              {/* Table Body */}
              <div className="flex flex-col">
                {books.map((book) => (
                  <motion.div 
                    key={book.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors rounded-xl group ${selectedBooks.includes(book.id) ? 'bg-[#AEB784]/10' : ''}`}
                  >
                    {/* Checkbox */}
                    <div className="w-12 flex justify-center">
                      <input 
                        type="checkbox" 
                        checked={selectedBooks.includes(book.id)}
                        onChange={() => toggleSelection(book.id)}
                        className="w-4 h-4 accent-[#41431B] cursor-pointer"
                      />
                    </div>
                    
                    {/* Cover */}
                    <div className="w-16 flex justify-center">
                      <div className="relative w-10 h-14 shadow-sm rounded-md overflow-hidden bg-gray-200 border border-gray-100">
                        <Image src={book.cover} alt={book.title} fill className="object-cover" />
                      </div>
                    </div>
                    
                    {/* Title & Author */}
                    <div className="flex-1 pl-4 flex flex-col">
                      <span className="text-sm font-bold text-gray-800">{book.title}</span>
                      <span className="text-xs text-gray-500 mt-0.5">{book.author}</span>
                    </div>
                    
                    {/* Category */}
                    <div className="w-32 text-left text-sm font-medium text-gray-600">
                      {book.category}
                    </div>
                    
                    {/* Status */}
                    <div className="w-28 flex justify-center">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusStyle(book.status)}`}>
                        {book.status}
                      </span>
                    </div>
                    
                    {/* ISBN */}
                    <div className="w-32 text-center text-sm text-gray-500 font-mono">
                      {book.isbn}
                    </div>
                    
                    {/* Actions */}
                    <div className="w-28 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-[#41431B]" title="View Details">
                        <RemoveRedEyeOutlinedIcon fontSize="small" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-blue-600" title="Edit">
                        <ModeEditOutlineOutlinedIcon fontSize="small" />
                      </button>
                      <button className="p-1.5 hover:bg-red-100 rounded-full transition-colors text-gray-500 hover:text-red-600" title="Delete">
                        <DeleteOutlinedIcon fontSize="small" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ADD BOOK MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 z-10"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#41431B]">Add New Book</h2>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <CloseIcon fontSize="small" className="text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleAddBook} className="flex flex-col gap-4">
                
                {/* Cover Image Upload */}
                <div className="flex gap-6 items-center bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-300">
                  <div className="relative w-20 h-28 bg-gray-200 rounded-lg overflow-hidden shadow-sm border border-gray-100 flex-shrink-0">
                    {previewImage ? (
                      <Image src={previewImage} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-400">
                        <AddIcon />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">Cover Image</label>
                    <p className="text-xs text-gray-500 mb-3">Upload a high-quality JPG or PNG.</p>
                    <label className="cursor-pointer bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-4 py-2 rounded-lg hover:border-[#41431B] transition-colors inline-flex items-center gap-2 w-max">
                      <CloudUploadOutlinedIcon fontSize="small" /> Choose File
                      <input type="file" name="cover" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-sm font-bold text-gray-700">Book Title *</label>
                    <input type="text" name="title" required placeholder="e.g. The Great Gatsby" className="h-11 px-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#41431B] bg-gray-50 focus:bg-white text-sm" />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-sm font-bold text-gray-700">Author *</label>
                    <input type="text" name="author" required placeholder="e.g. F. Scott Fitzgerald" className="h-11 px-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#41431B] bg-gray-50 focus:bg-white text-sm" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-gray-700">Description</label>
                  <textarea name="description" rows="3" placeholder="Brief summary of the book..." className="p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#41431B] bg-gray-50 focus:bg-white text-sm resize-none" />
                </div>

                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#41431B] text-[#F8F3E1] font-semibold text-sm shadow-md hover:bg-[#2b2d12]">
                    Save Book
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}