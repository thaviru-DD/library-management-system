'use client';
import Navbar from "@/components/shared/Navbar";
import HeroImageFlip from "@/components/user/HeroImageFlip";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";

const recommendedBooks = [
  { id: 1, title: "The Silent Forest", author: "Aria Cole", cover: "/bookCovers/book1.jpg" },
  { id: 2, title: "Beyond the Horizon", author: "Marcus Reed", cover: "/bookCovers/book2.jpg" },
  { id: 3, title: "Echoes of Time", author: "Lena Frost", cover: "/bookCovers/book3.jpg" },
  { id: 4, title: "The Last Cipher", author: "Noah Blake", cover: "/bookCovers/book6.jpg" },
];

const popularBooks = [
  { id: 5, title: "Whispers in the Dark", author: "Ivy Sinclair", cover: "/bookCovers/book9.jpg" },
  { id: 6, title: "The Glass Kingdom", author: "Owen Hale", cover: "/bookCovers/book10.jpg" },
  { id: 7, title: "Wildfire Dreams", author: "Sage Monroe", cover: "/bookCovers/book11.jpg" },
  { id: 8, title: "The Forgotten Path", author: "Elias Grant", cover: "/bookCovers/book7.jpg" },
];

export default function Home() {
  return (
    <div>
      <div className="relative h-[120vh]">
         <Image src="/bookCovers/backgroundImg.avif" alt="" fill priority className="object-cover -z-10"/>

        <div className="absolute inset-0 bg-black/60 -z-10" />

          <Navbar style='text-white' titleStyle='text-white'/>

          <div className="px-20">
            <motion.h4 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="mt-20 font-bold text-white">
              Welcome to,
            </motion.h4>

            <div className="flex justify-between mt-2">
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} className="text-7xl font-bold text-white">
                Creative <br /> Words
              </motion.h1>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }} className="w-100">
                <h2 className="text-3xl font-bold text-end text-white">Explore unforgettable characters</h2>
                <p className="text-end mt-4 text-white">Every book opens a new world waiting for you to explore today :)</p>
              </motion.div>
            </div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }} className="text-white/80 max-w-xl mt-8 text-lg">
              Discover thousands of titles across every genre, reserve them in seconds, and pick them up at your local library.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }} className="flex gap-4 mt-8">
              <Link href="/books" className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors duration-300">
                Browse Books
              </Link>
              <Link href="/signup" className="px-8 py-3 rounded-full border border-white text-white font-semibold hover:bg-white/10 transition-colors duration-300">
                Get Started
              </Link>
            </motion.div>
         </div>
      </div>

      <section className="px-20 pb-16 bg-white pt-24">
        <h2 className="text-3xl font-bold mb-8">Recommended Books</h2>
        <div className="grid grid-cols-4 gap-6">
          {recommendedBooks.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`} className="group">
              <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-md">
                <Image src={book.cover}  alt={book.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300"/>
              </div>
              <h3 className="mt-3 font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-500">{book.author}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-20 pb-24 bg-white">
        <h2 className="text-3xl font-bold mb-8 pt-16">Popular Books</h2>
        <div className="grid grid-cols-4 gap-6">
          {popularBooks.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`} className="group">
              <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-md">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="mt-3 font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-500">{book.author}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />

    </div>
  );
}