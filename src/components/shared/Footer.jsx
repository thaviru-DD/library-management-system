import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1F150C] text-[#E1DCC9] px-20 py-16">
      <div className="grid grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl font-bold text-white">Creative Words</h3>
          <p className="mt-4 text-sm text-[#E1DCC9]/70 max-w-xs">
            Discover thousands of titles across every genre, reserve them in seconds, and pick them up at your local library.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-[#E1DCC9]/70">
            <li><Link href="/books" className="hover:text-white transition-colors">Browse Books</Link></li>
            <li><Link href="/profile" className="hover:text-white transition-colors">My Reservations</Link></li>
            <li><Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
            <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Library</h4>
          <ul className="space-y-2 text-sm text-[#E1DCC9]/70">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-[#E1DCC9]/70">
            <li>123 Library Lane, Colombo</li>
            <li>hello@creativewords.com</li>
            <li>+94 11 234 5678</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-[#412D15] flex justify-between items-center text-sm text-[#E1DCC9]/60">
        <p>© {new Date().getFullYear()} Creative Words. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}