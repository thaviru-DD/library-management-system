'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/shared/Sidebar';
import Button from '@/components/shared/Button';
import { getBooks } from '@/lib/bookStorage';
import Image from 'next/image';
import EditProfileModal from '@/components/user/EditProfileModal';
import Navbar from '@/components/shared/Navbar';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [reservedBooks, setReservedBooks] = useState([]);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    // TODO: replace 'loggedInUser' with whatever key your login page
    // actually uses in localStorage.setItem(...) when a user signs in.
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }

    const books = getBooks();
    setReservedBooks(books.filter((b) => b.status === 'RESERVED'));
  }, []);

  function handleProfileSave(updatedUser) {
    setUser(updatedUser);
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
  }

  const initial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div>
      <Navbar/>

      <main className="mx-20 flex-1 overflow-x-hidden mt-10">

        

        <h1 className="font-bold text-4xl mb-8">Profile</h1>

        {/* Profile card */}
        <div className="bg-parchment rounded-2xl p-8 flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-[#41431B] text-[#F8F3E1] flex items-center justify-center text-3xl font-bold shrink-0 overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              initial
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#41431B]">
              {user?.name || 'Guest User'}
            </h2>
            <p className="text-[#41431B]/70">{user?.email || 'No email on file'}</p>
            {user?.description && (
              <p className="text-[#41431B]/80 text-sm mt-2 max-w-md">{user.description}</p>
            )}
            <span className="inline-block mt-2 text-xs font-medium uppercase tracking-wide bg-white/60 text-[#41431B] px-3 py-1 rounded-full">
              {user?.role === 'LIBRARIAN' ? 'Librarian' : 'Member'}
            </span>
          </div>

          <Button
            name="Edit Profile"
            style="bg-white text-[#41431B] px-5 py-2 rounded-lg cursor-pointer hover:bg-[#F8F3E1] transition-colors shrink-0"
            onClick={() => setEditOpen(true)}
          />
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100">
            <p className="text-gray-500 text-sm">Active Reservations</p>
            <p className="text-3xl font-bold text-[#41431B] mt-1">{reservedBooks.length}</p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100">
            <p className="text-gray-500 text-sm">Books Read</p>
            <p className="text-3xl font-bold text-[#41431B] mt-1">0</p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100">
            <p className="text-gray-500 text-sm">Favourites</p>
            <p className="text-3xl font-bold text-[#41431B] mt-1">0</p>
          </div>
        </div>

        {/* Reserved books */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-700 mb-4">My Reservations</h3>

          {reservedBooks.length === 0 ? (
            <p className="text-gray-500">You don't have any active reservations.</p>
          ) : (
            <div className="flex flex-wrap gap-6">
              {reservedBooks.map((book) => (
                <div key={book.id} className="w-[160px] bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="relative w-full aspect-[3/4] bg-gray-100">
                    {book.image ? (
                      <Image src={book.image} alt={book.title} fill style={{ objectFit: 'cover' }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No cover</div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-sm truncate">{book.title}</p>
                    <p className="text-gray-500 text-xs truncate">{book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        

      </main>

      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={user}
        onSave={handleProfileSave}
      />
    </div>
  );
}