'use client';

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    // Backdrop — clicking it closes the modal
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      {/* The box itself — stop click events from bubbling up to the backdrop,
          otherwise clicking anywhere inside the modal would also close it */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl leading-none transition-colors"
          aria-label="Close"
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
}