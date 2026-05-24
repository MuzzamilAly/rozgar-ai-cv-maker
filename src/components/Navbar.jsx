import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Resume Templates', path: '/templates' },
    { name: 'CV Templates', path: '/cv-templates' },
    { name: 'Resume Writing', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
              CV Maker
            </Link>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary">Log In</Link>
            <Link to="/editor" className="bg-primary hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
              Create Resume
            </Link>
          </div>
          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-500 hover:text-slate-700 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-primary hover:bg-slate-50">
                {link.name}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3 px-3">
              <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50">Log In</Link>
              <Link to="/editor" onClick={() => setIsOpen(false)} className="w-full text-center bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 shadow-sm">Create Resume</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
