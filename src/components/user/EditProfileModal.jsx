'use client';

import { useState, useEffect, useRef } from 'react';
import Modal from '@/components/shared/Modal';
import Button from '@/components/shared/Button';

export default function EditProfileModal({ open, onClose, user, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState(''); // base64 data URL or existing path
  const fileInputRef = useRef(null);

  // Reset the form to the current user's data every time the modal opens
  useEffect(() => {
    if (open) {
      setName(user?.name || '');
      setDescription(user?.description || '');
      setAvatar(user?.avatar || '');
    }
  }, [open, user]);

  function handleImageSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result); // base64 string, safe for localStorage
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ ...user, name, description, avatar });
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6">
        <h2 className="text-2xl font-bold text-[#41431B] mb-5">Edit Profile</h2>

        {/* Avatar picker */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-[#F8F3E1] flex items-center justify-center shrink-0">
            {avatar ? (
              // Using plain img here since this can be a base64 string,
              // which next/image doesn't optimize anyway
              <img src={avatar} alt="Profile preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-[#41431B]">
                {name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            )}
          </div>

          <Button
            name="Change Photo"
            style="bg-white border border-gray-300 text-[#41431B] px-4 py-1.5 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-sm"
            onClick={() => fileInputRef.current?.click()}
          />
          {/* Hidden native file input, opened programmatically via the Button's onClick above */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>

        {/* Name */}
        <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 outline-none focus:border-[#41431B] transition-colors"
          required
        />

        {/* Description / bio */}
        <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Tell us a little about yourself..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 outline-none focus:border-[#41431B] transition-colors resize-none"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <Button
            name="Save Changes"
            style="bg-orange-500 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-orange-600 transition-colors"
          />
        </div>
      </form>
    </Modal>
  );
}