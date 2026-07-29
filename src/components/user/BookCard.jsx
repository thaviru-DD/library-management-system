'use client'

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/shared/Button";

export default function BookCard({ book }) {

    const [showDetails, setShowDetails] = useState(false);
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="flex flex-col ">

            <Image src={book.image} alt={book.title} width={150} height={260} className="rounded-lg"/>
            <h2 className="text-center font-bold">{book.title}</h2>
            <p className="text-center">{book.author}</p>

            <button onClick={() => setShowDetails(true)} className="bg-orange-500 text-white px-5 py-1 rounded-lg mt-2">View</button>


            {/* Modal */}
{showDetails && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

        <div className="relative bg-white rounded-xl p-6 w-[700px] shadow-lg flex gap-8">

            {/* Close Icon */}
            <button
                onClick={() => setShowDetails(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl font-bold"
            >
                ✕
            </button>


            {/* Book Image */}
            <div className="w-1/2 flex items-center justify-center">
                <Image
                    src={book.image}
                    alt={book.title}
                    width={250}
                    height={350}
                    className="rounded-lg"
                />
            </div>


            {/* Book Details */}
            <div className="w-1/2">

                <h2 className="text-3xl font-bold mt-3">
                    {book.title}
                </h2>

                <p className="mt-2 font-bold">
                    Author: {book.author}
                </p>

                <p className="mt-3 text-gray-600">
                    {book.description}
                </p>


                {/* Quantity Selector */}
                <div className="mt-5">

                    <label className="font-bold">
                        Quantity:
                    </label>

                    <select
                        className="border rounded-lg ml-3 px-3 py-1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>

                </div>


                {/* Dynamic Price */}
                <h3 className="text-xl font-bold mt-5">
                    Price: Rs.{book.price * quantity}
                </h3>


                {/* Buy Button */}
                <Button
                    name="Buy Now"
                    style="bg-green-600 text-white px-6 py-2 rounded-lg mt-5 hover:bg-green-700"
                    onClick={() => console.log("Buying book")}
                />

            </div>

        </div>

    </div>
)}

        </div>
    );
}