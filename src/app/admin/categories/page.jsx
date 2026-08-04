'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Sidebar from '@/components/shared/Sidebar';
import Button from '@/components/shared/Button'; // Assuming you are using your custom Button

// Icons
import SearchIcon from '@mui/icons-material/Search';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@/components/shared/Modal';


const initialCategories = [
  { id: 'c1', name: 'Fiction', description: 'Narrative works crafted from imagination.', bookCount: 4, status: 'Active' },
  { id: 'c2', name: 'Science', description: 'Books on natural sciences, physics, and biology.', bookCount: 1, status: 'Active' },
  { id: 'c3', name: 'History', description: 'Historical events, biographies, and eras.', bookCount: 0, status: 'Active' },
  { id: 'c4', name: 'Money', description: 'Personal finance, economics, and investing.', bookCount: 0, status: 'Active' }
];

export default function CategoriesManagementPage() {

  const [categories, setCategories] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState('');
  
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // add or edit
  const [currentCategory, setCurrentCategory] = useState({ name: '', description: '' });

  
  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const openAddModal = () => {
    setModalMode('add');
    setCurrentCategory({ name: '', description: '' });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const openEditModal = (category) => {
    setModalMode('edit');
    setCurrentCategory(category);
    setIsModalOpen(true);
  };

  // Handle Form Submission (Add & Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalMode === 'add') {
      const newCategory = {
        ...currentCategory,
        id: `c${Date.now()}`,
        bookCount: 0,
        status: 'Active'
      };
      setCategories([newCategory, ...categories]);
    } else {
      setCategories(categories.map(cat => 
        cat.id === currentCategory.id ? currentCategory : cat
      ));
    }
    
    setIsModalOpen(false);
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-800 font-sans flex">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-10 flex flex-col gap-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-[#41431B] tracking-tight">Category Management</h1>
            <p className="text-sm text-gray-500 mt-1">Organize your catalog by adding, editing, or removing book categories.</p>
          </div>
          <Button name="Add Category" icon={<AddIcon fontSize="small" />} onClick={openAddModal} style="flex items-center gap-2 bg-[#41431B] text-[#F8F3E1] px-5 py-2.5 rounded-xl font-semibold shadow-md hover:bg-[#2b2d12] transition-colors cursor-pointer"/>
        </div>

        {/* SEARCH BAR */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="relative w-96">
            <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" fontSize="small" />
            <input type="text" placeholder="Search categories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#41431B] focus:bg-white transition-colors"/>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 flex flex-col">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              
              {/* Table Header */}
              <div className="flex items-center bg-[#F8F3E1]/60 px-4 py-3 rounded-xl mb-2">
                <div className="w-12 flex justify-center"><ClassOutlinedIcon fontSize="small" className="text-gray-400"/></div>
                <h3 className="w-48 text-left font-bold text-xs uppercase tracking-wider text-gray-500">Category Name</h3>
                <h3 className="flex-1 text-left font-bold text-xs uppercase tracking-wider text-gray-500">Description</h3>
                <h3 className="w-32 text-center font-bold text-xs uppercase tracking-wider text-gray-500">Total Books</h3>
                <h3 className="w-28 text-center font-bold text-xs uppercase tracking-wider text-gray-500">Actions</h3>
              </div>

              {/* Table Body */}
              <div className="flex flex-col"> {filteredCategories.length === 0 ? (
                  <div className="py-10 text-center text-gray-500 text-sm font-medium">No categories found.</div>
                ) : (
                  filteredCategories.map((category) => (
                    <motion.div key={category.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center px-4 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors rounded-xl group">
                      <div className="w-12 flex justify-center text-[#AEB784] font-bold">#</div>
                      
                      {/* Name */}
                      <div className="w-48 text-left text-sm font-bold text-gray-800">
                        {category.name}
                      </div>
                      
                      {/* Description */}
                      <div className="flex-1 text-left text-sm text-gray-500 pr-4 truncate">
                        {category.description || 'No description provided.'}
                      </div>
                      
                      {/* Book Count */}
                      <div className="w-32 flex justify-center">
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold border border-gray-200">
                          {category.bookCount} Books
                        </span>
                      </div>
                      
                      {/* Actions */}
                      <div className="w-28 flex justify-center gap-1">
                        <button onClick={() => openEditModal(category)} className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-blue-600" title="Edit">
                          <ModeEditOutlineOutlinedIcon fontSize="small" />
                        </button>
                        <button onClick={() => handleDelete(category.id)} className="p-1.5 hover:bg-red-100 rounded-full transition-colors text-gray-500 hover:text-red-600" title="Delete">
                          <DeleteOutlinedIcon fontSize="small" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>


      {/* MODAL FOR ADDING A NEW CATEGORY AND EDIT */}
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className='w-100 h-100'>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#41431B]">
                      {modalMode === 'add' ? 'Add Category' : 'Edit Category'}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {modalMode === 'add' ? 'Create a new section for your library.' : 'Update category details.'}
                    </p>
                  </div>
                </div>
            
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Category Name</label>
                  <input type="text" required value={currentCategory.name} onChange={(e) => setCurrentCategory({...currentCategory, name: e.target.value})} placeholder="e.g. Science Fiction" className="w-full h-11 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#41431B] focus:ring-1 focus:ring-[#41431B] transition-all bg-gray-50 focus:bg-white text-sm"/>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Description</label>
                  <textarea rows="3" value={currentCategory.description} onChange={(e) => setCurrentCategory({...currentCategory, description: e.target.value})} placeholder="Briefly describe the types of books in this category..." className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#41431B] focus:ring-1 focus:ring-[#41431B] transition-all bg-gray-50 focus:bg-white text-sm resize-none"/>
                </div> 

                {/* Action Buttons */}
                 <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 py-3 rounded-xl bg-[#41431B] text-[#F8F3E1] font-semibold text-sm hover:bg-[#2b2d12] transition-colors shadow-md">
                    {modalMode === 'add' ? 'Save Category' : 'Update Category'}
                  </button>
                </div>
              </form>
              </div>
            </Modal>


    </div>
  )
}