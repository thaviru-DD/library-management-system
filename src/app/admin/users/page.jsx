'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Components
import Sidebar from '@/components/shared/Sidebar';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import NoAccountsOutlinedIcon from '@mui/icons-material/NoAccountsOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Button from '@/components/shared/Button';
import CheckBox from '@/components/shared/CheckBox';

// Mock Data
const initialUsers = [
  { id: 'u1', name: 'Eleanor Pena', email: 'eleanor.pena@example.com', role: 'User', status: 'Active', joined: 'Oct 24, 2023' },
  { id: 'u2', name: 'Wade Warren', email: 'wade.warren@example.com', role: 'Librarian', status: 'Active', joined: 'Sep 12, 2023' },
  { id: 'u3', name: 'Jacob Jones', email: 'jacob.jones@example.com', role: 'User', status: 'Deactivated', joined: 'Jan 05, 2024' },
  { id: 'u4', name: 'Dianne Russell', email: 'dianne.russell@example.com', role: 'Admin', status: 'Active', joined: 'Mar 18, 2022' },
  { id: 'u5', name: 'Cody Fisher', email: 'cody.fisher@example.com', role: 'User', status: 'Blacklisted', joined: 'Nov 30, 2023' },
];

export default function UsersManagementPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Handle individual row selection
  const toggleSelection = (id) => {
    setSelectedUsers(prev => 
      prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
    );
  };

  // Handle "Select All" checkbox
  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
    }
  };

  // Administrative Action: Change User Status
  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  // Bulk Action: Change Status for all selected users
  const handleBulkStatusChange = (newStatus) => {
    setUsers(users.map(user => 
      selectedUsers.includes(user.id) ? { ...user, status: newStatus } : user
    ));
    setSelectedUsers([]); // Clear selection after action
  };

  // Helpers for styling
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200';
      case 'Deactivated': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Blacklisted': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRoleStyle = (role) => {
    switch(role) {
      case 'Admin': return 'bg-[#41431B] text-[#F8F3E1]';
      case 'Librarian': return 'bg-[#AEB784] text-[#41431B]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Helper to get initials for the avatar
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-800 font-sans flex">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-10 flex flex-col gap-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-[#41431B] tracking-tight">User Management</h1>
            <p className="text-sm text-gray-500 mt-1">View registered members, manage roles, and enforce account restrictions.</p>
          </div>
          {/* <button className="flex items-center gap-2 bg-[#41431B] text-[#F8F3E1] px-5 py-2.5 rounded-xl font-semibold shadow-md hover:bg-[#2b2d12] transition-colors">
            <PersonAddOutlinedIcon fontSize="small" /> Register User
          </button> */}
          <Button style='flex items-center gap-2 bg-[#41431B] text-[#F8F3E1] px-5 py-2.5 rounded-xl font-semibold shadow-md hover:bg-[#2b2d12] transition-colors' name='Register User' icon={<PersonAddOutlinedIcon fontSize="small" />}/>
        </div>

        {/* FILTERS & SEARCH */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[250px]">
            <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" fontSize="small" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#41431B] focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <FilterListIcon className="text-gray-400" />
            <select className="h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#41431B] cursor-pointer">
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="librarian">Librarians</option>
              <option value="admin">Admins</option>
            </select>

            <select className="h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#41431B] cursor-pointer">
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="deactivated">Deactivated</option>
              <option value="blacklisted">Blacklisted</option>
            </select>
          </div>
        </div>

        {/* DATA TABLE AREA */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 flex flex-col">
          
          {/* Buttons for the Active */}
          <div className="flex items-center gap-3 mb-6">
            <Button style='px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg text-sm font-medium text-orange-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-100 transition-colors' name='Deactivate Selected' onClick={() => handleBulkStatusChange('Deactivated')} disabled={selectedUsers.length === 0}/>
            <Button style='px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-sm font-medium text-red-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-100 transition-colors' name='Blacklist Selected' onClick={() => handleBulkStatusChange('Blacklisted')} disabled={selectedUsers.length === 0}/>
            <Button style='px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-sm font-medium text-green-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-100 transition-colors' name='Activate Selected' onClick={() => handleBulkStatusChange('Active')} disabled={selectedUsers.length === 0}/>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Table Header */}
              <div className="flex items-center bg-[#F8F3E1]/60 px-4 py-3 rounded-xl mb-2">
                <div className="w-12 flex justify-center">
                  <input 
                    type="checkbox" 
                    checked={selectedUsers.length === users.length && users.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 accent-[#41431B] cursor-pointer"
                  />
                </div>
                <h3 className="flex-1 text-left pl-4 font-bold text-xs uppercase tracking-wider text-gray-500">Member Details</h3>
                <h3 className="w-32 text-left font-bold text-xs uppercase tracking-wider text-gray-500">Role</h3>
                <h3 className="w-32 text-center font-bold text-xs uppercase tracking-wider text-gray-500">Status</h3>
                <h3 className="w-32 text-center font-bold text-xs uppercase tracking-wider text-gray-500">Join Date</h3>
                <h3 className="w-40 text-center font-bold text-xs uppercase tracking-wider text-gray-500">Admin Actions</h3>
              </div>

              {/* Table Body */}
              <div className="flex flex-col">
                {users.map((user) => (
                  <motion.div 
                    key={user.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors rounded-xl group ${selectedUsers.includes(user.id) ? 'bg-[#AEB784]/10' : ''}`}
                  >
                    {/* Checkbox */}
                    <div className="w-12 flex justify-center">
                      <CheckBox checked={selectedUsers.includes(user.id)} onChange={() => toggleSelection(user.id)} style="w-4 h-4 accent-[#41431B] cursor-pointer" />
                    </div>
                    
                    {/* Member Details (Avatar + Name + Email) */}
                    <div className="flex-1 pl-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm border border-gray-300 shadow-sm">
                        {getInitials(user.name)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800">{user.name}</span>
                        <span className="text-xs text-gray-500">{user.email}</span>
                      </div>
                    </div>
                    
                    {/* Role */}
                    <div className="w-32 text-left text-sm font-medium">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${getRoleStyle(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                    
                    {/* Status */}
                    <div className="w-32 flex justify-center">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusStyle(user.status)}`}>
                        {user.status}
                      </span>
                    </div>
                    
                    {/* Join Date */}
                    <div className="w-32 text-center text-sm text-gray-500">
                      {user.joined}
                    </div>
                    
                    {/* Actions */}
                    <div className="w-40 flex justify-center gap-2">
                      {user.status !== 'Active' && (
                        <button 
                          onClick={() => handleStatusChange(user.id, 'Active')}
                          className="p-1.5 hover:bg-green-100 rounded-full transition-colors text-gray-400 hover:text-green-600" 
                          title="Activate Account"
                        >
                          <CheckCircleOutlineOutlinedIcon fontSize="small" />
                        </button>
                      )}
                      
                      {user.status !== 'Deactivated' && (
                        <button 
                          onClick={() => handleStatusChange(user.id, 'Deactivated')}
                          className="p-1.5 hover:bg-orange-100 rounded-full transition-colors text-gray-400 hover:text-orange-600" 
                          title="Deactivate Account"
                        >
                          <NoAccountsOutlinedIcon fontSize="small" />
                        </button>
                      )}

                      {user.status !== 'Blacklisted' && (
                        <button 
                          onClick={() => handleStatusChange(user.id, 'Blacklisted')}
                          className="p-1.5 hover:bg-red-100 rounded-full transition-colors text-gray-400 hover:text-red-600" 
                          title="Blacklist User"
                        >
                          <BlockOutlinedIcon fontSize="small" />
                        </button>
                      )}

                      {/* Generic options menu for future expansion (edit, view profile, etc) */}
                      <div className="w-px h-6 bg-gray-200 mx-1 self-center"></div>
                      <button className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-[#41431B]" title="More Options">
                        <MoreVertIcon fontSize="small" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}