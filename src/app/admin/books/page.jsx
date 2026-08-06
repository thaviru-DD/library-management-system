'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Sidebar from '@/components/shared/Sidebar';
import Button from '@/components/shared/Button';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Modal from '@/components/shared/Modal';

// Mock Data
const initialBooks = [
  { id: '1', cover: '/bookCovers/book1.jpg', title: 'The Great Gatsby', author: 'Amélie Laurent', category: 'Fiction', status: 'Available', isbn: '978-4-16', isActive: true },
  { id: '2', cover: '/bookCovers/book2.jpg', title: '1984', author: 'George Orwell', category: 'Fiction', status: 'Reserved', isbn: '462-3-12', isActive: true },
  { id: '3', cover: '/bookCovers/book3.jpg', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', status: 'Borrowed', isbn: '654-7-10', isActive: true },
  { id: '4', cover: '/bookCovers/book1.jpg', title: 'Atomic Habits', author: 'James Clear', category: 'Self-Help', status: 'Available', isbn: '112-9-88', isActive: true }
];

export default function BooksManagementPage() {
  const [books, setBooks] = useState(initialBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState([]);

  const categories = [...new Set(books.map((book) => book.category))];

  const filteredBooks = books.filter((book) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.isbn.toLowerCase().includes(query);

    const matchesCategory =
      categoryFilter === 'all' || book.category.toLowerCase() === categoryFilter.toLowerCase();

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'deactivated' ? !book.isActive : book.status.toLowerCase() === statusFilter.toLowerCase());

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const toggleSelection = (id) => {
    setSelectedBooks((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const visibleIds = filteredBooks.map((book) => book.id);
    const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedBooks.includes(id));

    if (allVisibleSelected) {
      setSelectedBooks((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedBooks((prev) => [...new Set([...prev, ...visibleIds])]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newBook = {
      id: Date.now().toString(),
      title: formData.get('title') || 'Untitled',
      author: formData.get('author') || 'Unknown',
      description: formData.get('description') || '',
      cover: previewImage || '/bookCovers/book1.jpg',
      category: formData.get('category') || 'Uncategorized',
      status: 'Available',
      isbn: formData.get('isbn') || `100-${Math.floor(Math.random() * 9)}-${Math.floor(Math.random() * 99)}`,
      isActive: true
    };

    setBooks((prev) => [newBook, ...prev]);
    e.target.reset();
    setPreviewImage(null);
    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = () => {
    const booksToEdit = books.filter((book) => selectedBooks.includes(book.id));
    setEditFormData(JSON.parse(JSON.stringify(booksToEdit)));
    setIsEditModalOpen(true);
  };

  const handleEditChange = (id, field, value) => {
    setEditFormData((prev) =>
      prev.map((book) => (book.id === id ? { ...book, [field]: value } : book))
    );
  };

  const handleEditImageChange = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleEditChange(id, 'cover', url);
    }
  };

  const handleSaveEdits = (e) => {
    e.preventDefault();
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        const editedBook = editFormData.find((b) => b.id === book.id);
        return editedBook ? { ...book, ...editedBook } : book;
      })
    );
    setIsEditModalOpen(false);
    setSelectedBooks([]);
  };

  const handleDeactivateBook = (id) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, isActive: !book.isActive } : book))
    );
  };

  const handleDeactivateSelected = () => {
    setBooks((prev) =>
      prev.map((book) =>
        selectedBooks.includes(book.id) ? { ...book, isActive: false } : book
      )
    );
    setSelectedBooks([]);
  };

  const handleAssignCategory = (category) => {
    if (!category) return;
    setBooks((prev) =>
      prev.map((book) => (selectedBooks.includes(book.id) ? { ...book, category } : book))
    );
    setSelectedBooks([]);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-700';
      case 'Reserved':
        return 'bg-orange-100 text-orange-700';
      case 'Borrowed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#faf9f6] text-gray-800 font-sans">
      <Sidebar />

      <main className="md:ml-64 min-w-0 pt-20 md:pt-10 p-4 sm:p-6 md:p-10 flex flex-col gap-6 md:gap-8 relative">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#41431B] tracking-tight">Books Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your library inventory, track statuses, and add new books.</p>
          </div>

          <Button name='Add New Book' style='w-full sm:w-auto flex items-center justify-center gap-2 bg-[#41431B] text-[#F8F3E1] px-5 py-2.5 rounded-xl font-semibold shadow-md hover:bg-[#2b2d12] transition-colors cursor-pointer' icon={<AddIcon fontSize="small" />} onClick={() => setIsAddModalOpen(true)}/>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row flex-wrap gap-4 md:items-center">
          <div className="relative flex-1 min-w-0 md:min-w-[250px]">
            <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" fontSize="small" />
            <input
              type="text"
              placeholder="Search books, authors, ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#41431B] focus:bg-white transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <FilterListIcon className="text-gray-400 hidden sm:block" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="flex-1 sm:flex-none h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#41431B] cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 sm:flex-none h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#41431B] cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="borrowed">Borrowed</option>
              <option value="deactivated">Deactivated</option>
            </select>
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-100 rounded-3xl p-4 sm:p-6 flex flex-col min-w-0">

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Button name={`Edit Selected (${selectedBooks.length})`} disabled={selectedBooks.length === 0} onClick={handleOpenEditModal} style='px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors'/>
            <Button name='Deactivate Selected' disabled={selectedBooks.length === 0} onClick={handleDeactivateSelected} style='px-4 py-2 bg-red-50 border border-red-100 rounded-lg text-sm font-medium text-red-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-100 transition-colors'/>

            <select
              disabled={selectedBooks.length === 0}
              value=""
              onChange={(e) => handleAssignCategory(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-[#41431B]"
            >
              <option value="">Assign to Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="min-w-[900px]">
              <div className="flex items-center bg-[#F8F3E1]/60 px-4 py-3 rounded-xl mb-2">
                <div className="w-12 flex justify-center">
                  <input
                    type="checkbox"
                    checked={filteredBooks.length > 0 && filteredBooks.every((book) => selectedBooks.includes(book.id))}
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

              <div className="flex flex-col">
                {filteredBooks.length === 0 && (
                  <p className="text-center text-sm text-gray-400 py-10">No books match your search or filters.</p>
                )}

                {filteredBooks.map((book) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors rounded-xl group ${selectedBooks.includes(book.id) ? 'bg-[#AEB784]/10' : ''} ${!book.isActive ? 'opacity-50' : ''}`}
                  >
                    <div className="w-12 flex justify-center">
                      <input
                        type="checkbox"
                        checked={selectedBooks.includes(book.id)}
                        onChange={() => toggleSelection(book.id)}
                        className="w-4 h-4 accent-[#41431B] cursor-pointer"
                      />
                    </div>

                    <div className="w-16 flex justify-center">
                      <div className="relative w-10 h-14 shadow-sm rounded-md overflow-hidden bg-gray-200 border border-gray-100">
                        <Image src={book.cover} alt={book.title} fill className="object-cover" />
                      </div>
                    </div>

                    <div className="flex-1 pl-4 flex flex-col">
                      <span className="text-sm font-bold text-gray-800">{book.title}</span>
                      <span className="text-xs text-gray-500 mt-0.5">{book.author}</span>
                    </div>

                    <div className="w-32 text-left text-sm font-medium text-gray-600">
                      {book.category}
                    </div>

                    <div className="w-28 flex justify-center">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${!book.isActive ? 'bg-gray-200 text-gray-500' : getStatusStyle(book.status)}`}>
                        {!book.isActive ? 'Deactivated' : book.status}
                      </span>
                    </div>

                    <div className="w-32 text-center text-sm text-gray-500 font-mono">
                      {book.isbn}
                    </div>

                    <div className="w-28 flex justify-center gap-1 ">
                      <button className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-[#41431B]" title="View Details">
                        <RemoveRedEyeOutlinedIcon fontSize="small" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBooks([book.id]);
                          setEditFormData([JSON.parse(JSON.stringify(book))]);
                          setIsEditModalOpen(true);
                        }}
                        className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-blue-600"
                        title="Edit"
                      >
                        <ModeEditOutlineOutlinedIcon fontSize="small" />
                      </button>
                      <button
                        onClick={() => handleDeactivateBook(book.id)}
                        className="p-1.5 hover:bg-red-100 rounded-full transition-colors text-gray-500 hover:text-red-600"
                        title={book.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {book.isActive ? <BlockIcon fontSize="small" /> : <CheckCircleOutlineOutlinedIcon fontSize="small" />}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 z-10 max-h-[90vh] flex flex-col"
            >
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#41431B]">Edit Books</h2>
                  <p className="text-sm text-gray-500 mt-1">Editing {editFormData.length} selected book(s)</p>
                </div>
                <button onClick={() => setIsEditModalOpen(false)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0">
                  <CloseIcon fontSize="small" className="text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleSaveEdits} className="flex-1 overflow-y-auto pr-1 sm:pr-2">
                {editFormData.map((book, index) => (
                  <div key={book.id} className={`flex flex-col gap-4 pb-6 mb-6 ${index !== editFormData.length - 1 ? 'border-b border-gray-100' : ''}`}>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-300">
                      <div className="relative w-16 h-24 bg-gray-200 rounded-lg overflow-hidden shadow-sm border border-gray-100 flex-shrink-0">
                        <Image src={book.cover} alt="Cover Preview" fill className="object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-bold text-gray-700 mb-1">Update Cover Image</label>
                        <p className="text-xs text-gray-500 mb-2">Leave blank to keep existing cover.</p>
                        <label className="cursor-pointer bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-4 py-2 rounded-lg hover:border-[#41431B] transition-colors inline-flex items-center gap-2 w-max">
                          <CloudUploadOutlinedIcon fontSize="small" /> Choose File
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleEditImageChange(book.id, e)} />
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-gray-700">Book Title</label>
                        <input
                          type="text"
                          required
                          value={book.title}
                          onChange={(e) => handleEditChange(book.id, 'title', e.target.value)}
                          className="h-11 px-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#41431B] bg-gray-50 focus:bg-white text-sm"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-gray-700">Author (Read Only)</label>
                        <input
                          type="text"
                          value={book.author}
                          disabled
                          className="h-11 px-4 border border-gray-200 rounded-xl bg-gray-100 text-gray-500 text-sm cursor-not-allowed"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-gray-700">Category</label>
                        <input
                          type="text"
                          required
                          value={book.category}
                          onChange={(e) => handleEditChange(book.id, 'category', e.target.value)}
                          className="h-11 px-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#41431B] bg-gray-50 focus:bg-white text-sm"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-gray-700">ISBN</label>
                        <input
                          type="text"
                          required
                          value={book.isbn}
                          onChange={(e) => handleEditChange(book.id, 'isbn', e.target.value)}
                          className="h-11 px-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#41431B] bg-gray-50 focus:bg-white text-sm font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#41431B] text-[#F8F3E1] font-semibold text-sm shadow-md hover:bg-[#2b2d12]">
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <div className='w-[85vw] sm:w-full max-w-lg max-h-[85vh] overflow-y-auto pr-1'>
          <h2 className='text-2xl sm:text-3xl font-bold text-[#41431B]'>Add new book</h2>
          <p>Add new book to library system</p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-300 mt-4">
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

          <form onSubmit={handleAddBook} className='mt-6 flex flex-col gap-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
              <div>
                <label htmlFor="title">Book name</label>
                <input type="text" id="title" name="title" required className='w-full mt-2 p-2 border rounded-lg border-gray-200' placeholder='Enter book name'/>
              </div>
              <div>
                <label htmlFor="author">Author</label>
                <input type="text" id="author" name="author" required className='w-full mt-2 p-2 border rounded-lg border-gray-200' placeholder='Enter book author'/>
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
              <div>
                <label htmlFor="category">Category</label>
                <input type="text" id="category" name="category" className='w-full mt-2 p-2 border rounded-lg border-gray-200' placeholder='History'/>
              </div>
              <div>
                <label htmlFor="isbn">ISBN</label>
                <input type="text" id="isbn" name="isbn" className='w-full mt-2 p-2 border rounded-lg border-gray-200' placeholder='236-751'/>
              </div>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" rows={3} className='w-full mt-2 p-2 border rounded-lg border-gray-200' placeholder='Short description (optional)'/>
            </div>
            <div className='flex flex-col-reverse sm:flex-row justify-between items-center gap-3 mt-4'>
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#41431B] text-[#F8F3E1] font-semibold text-sm shadow-md hover:bg-[#2b2d12]">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}