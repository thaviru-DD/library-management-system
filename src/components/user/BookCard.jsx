'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/shared/Button";
import CloseIcon from "@mui/icons-material/Close";

export default function BookCard({ book }) {

    const [showDetails, setShowDetails] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Close modal on Escape key
    useEffect(() => {
        if (!showDetails) return;
        const handleKey = (e) => {
            if (e.key === "Escape") setShowDetails(false);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [showDetails]);

    return (
        <div className="group flex flex-col bg-white rounded-2xl border border-[#3D2B1F]/5 shadow-sm hover:shadow-md transition-shadow p-4">

            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-[#FBF6EC]">
                <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <h2 className="text-center font-serif font-semibold text-[#3D2B1F] mt-3 truncate">
                {book.title}
            </h2>
            <p className="text-center text-sm text-[#8C7B6B] truncate">{book.author}</p>

            <button
                onClick={() => setShowDetails(true)}
                className="bg-[#41431B] text-[#F8F3E1] px-5 py-2 rounded-xl mt-3 text-sm font-semibold cursor-pointer hover:bg-[#2b2d12] transition-colors"
            >
                View Details
            </button>

            {/* Modal */}
            {showDetails && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowDetails(false)}
                >
                    <div
                        className="relative bg-white rounded-2xl p-6 sm:p-8 w-full max-w-[700px] max-h-[90vh] overflow-y-auto shadow-xl flex flex-col sm:flex-row gap-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Icon */}
                        <button
                            onClick={() => setShowDetails(false)}
                            aria-label="Close"
                            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-[#8C7B6B] hover:bg-[#FBF6EC] hover:text-[#3D2B1F] transition-colors"
                        >
                            <CloseIcon fontSize="small" />
                        </button>

                        {/* Book Image */}
                        <div className="sm:w-1/2 flex items-center justify-center">
                            <div className="relative w-full max-w-[250px] aspect-[3/4] rounded-lg overflow-hidden shadow-sm">
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Book Details */}
                        <div className="sm:w-1/2 flex flex-col">

                            <span className="text-xs font-semibold tracking-[0.2em] text-[#8C7B6B] uppercase">
                                {book.status || "Available"}
                            </span>

                            <h2 className="text-3xl font-serif font-semibold text-[#3D2B1F] mt-2">
                                {book.title}
                            </h2>

                            <p className="mt-2 font-semibold text-[#3D2B1F]">
                                {book.author}
                            </p>

                            <p className="mt-3 text-[#8C7B6B] text-sm leading-relaxed">
                                {book.description}
                            </p>

                            {/* Quantity Selector */}
                            <div className="mt-5 flex items-center gap-3">
                                <label htmlFor="quantity" className="font-semibold text-sm text-[#3D2B1F]">
                                    Quantity
                                </label>

                                <select
                                    id="quantity"
                                    className="border border-[#3D2B1F]/15 rounded-lg px-3 py-1.5 text-sm text-[#3D2B1F] focus:outline-none focus:border-[#41431B] cursor-pointer"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                >
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Dynamic Price */}
                            <h3 className="text-xl font-serif font-semibold mt-5 text-[#3D2B1F]">
                                Rs. {(book.price * quantity).toLocaleString()}
                            </h3>

                            {/* Buy Button */}
                            <Button
                                name="Buy Now"
                                style="bg-[#41431B] text-[#F8F3E1] px-6 py-2.5 rounded-xl mt-5 font-semibold text-sm hover:bg-[#2b2d12] transition-colors w-max"
                                onClick={() => console.log("Buying book")}
                            />
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}