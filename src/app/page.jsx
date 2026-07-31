'use client';
import Navbar from "@/components/shared/Navbar";
import HeroImageFlip from "@/components/user/HeroImageFlip";
import { div } from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";


export default function Home() {
  return (
    <div>
      <Navbar/>

      
      
      <div className="px-20">
        <h4 className="mt-20 font-bold">Welcome to,</h4>
          <div className="flex justify-between mt-2">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-7xl font-bold">
              Creative <br /> Worlds
            </motion.h1>

            <div className="w-100">
              <h2 className="text-3xl font-bold text-end">Explore unforgettable characters</h2>
              <p className="text-end mt-4">Every book opens a new world waiting for you to explore today :)</p>
            </div>
          </div>
        
      </div>

    </div>
  );
}
