'use client';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { MenuIcon } from 'lucide-react';

const Navbar = () => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const [activeLink, setActiveLink] = useState('/');

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex items-center justify-between p-6 fixed top-0 left-0 w-full bg-transparent backdrop-blur-md z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            E-Cell
          </h1>
        </div>
        <ul className="flex gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`${
                  activeLink === link.href
                    ? 'text-yellow-400'
                    : 'text-gray-200 hover:text-yellow-300'
                } text-lg font-medium transition-colors duration-300`}
                onClick={() => setActiveLink(link.href)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center bg-transparent backdrop-blur-md px-2 fixed top-0 left-0 w-full z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            E-Cell
          </h1>
        </div>

        <div className="flex justify-end p-4">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-lg bg-neutral-300/50 backdrop-blur-md hover:bg-gray-700/50 transition-colors">
                <MenuIcon className="h-8 w-8 text-gray-200" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-neutral-900/50 backdrop-blur-md border-l border-neutral-800 w-[300px] sm:w-[350px]"
            >
              <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mt-4">
                E-Cell
              </SheetTitle>
              <nav className="flex flex-col gap-4 p-4 mt-6">
                <ul className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className={`${
                          activeLink === link.href
                            ? 'text-yellow-400'
                            : 'text-gray-200 hover:text-yellow-300'
                        } text-lg font-medium transition-colors duration-300`}
                        onClick={() => setActiveLink(link.href)}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default Navbar;
