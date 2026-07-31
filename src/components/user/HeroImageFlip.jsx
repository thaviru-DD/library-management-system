"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function HeroImageFlip() {
  // This wrapper is TALLER than the viewport — that extra height
  // is what gives the sticky image "room" to sit pinned while you scroll
  const wrapperRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 0.5], [90, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div ref={wrapperRef} className="relative h-[200vh]">
      {/* Sticky layer: pins to top of viewport while wrapper scrolls past */}
      <div
        style={{ perspective: "1200px" }}
        className="sticky top-0 h-screen w-full flex justify-center items-center"
      >
        <motion.div
          style={{ rotateY, opacity, transformOrigin: "left center" }}
          className="relative w-[400px] h-[500px] rounded-lg shadow-2xl overflow-hidden"
        >
          <Image
            src="/your-image.jpg"
            alt="Hero"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}