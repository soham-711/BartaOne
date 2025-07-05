import React, { useEffect, useState } from 'react'
import logo from "../../assets/logo.png";
import { Menu } from 'lucide-react';

export default function News() {
      const [isScrolled, setIsScrolled] = useState(false);
      const [isMenuOpen, setIsMenuOpen] = useState(false);
    

     useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
  return (
    <div >
       <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className=" bg-gradient-to-r rounded-full flex items-center justify-center">
              <img src={logo} className="w-20 h-20" />
            </div>
          </div>

          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            <a
              href="#"
              className="hover:text-orange-400 transition-colors duration-200 flex items-center space-x-1"
            >
              <span>Home</span>
            </a>
            <a
              href="/news"
              className="hover:text-orange-400 transition-colors duration-200 flex items-center space-x-1"
            >
              <span>News</span>
            </a>
            <a
              href="#"
              className="hover:text-orange-400 transition-colors duration-200 flex items-center space-x-1"
            >
              <span>Live</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </a>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full hover:shadow-lg transition-all duration-200">
              Sign In
            </button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50">
            <div className="px-6 py-4 space-y-4">
              <a
                href="#"
                className="block hover:text-orange-400 transition-colors"
              >
                Home
              </a>
              <Link
               to="/news"
                className="block hover:text-orange-400 transition-colors"
              >
                News
              </Link>
              <a
                href="#"
                className="block hover:text-orange-400 transition-colors"
              >
                Live
              </a>
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full">
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
