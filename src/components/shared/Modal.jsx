'use client';

import { div } from "framer-motion/client";
import CloseIcon from '@mui/icons-material/Close';

export default function Modal({ open, onClose, children }) {

  return (

    // backdrop
    <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? 'bg-black/50' : "invisible"}`}>
      
      <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-lg shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 cursor-pointer" >
          <CloseIcon />
        </button>
      {children}
      </div>
    </div>
    
  );
}