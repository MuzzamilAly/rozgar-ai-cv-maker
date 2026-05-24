import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1 */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Service</h3>
            <ul className="space-y-3">
              <li><Link to="/create" className="text-slate-600 hover:text-primary transition-colors">Create Resume</Link></li>
              <li><Link to="/services" className="text-slate-600 hover:text-primary transition-colors">Resume Writing Service</Link></li>
              <li><Link to="/services" className="text-slate-600 hover:text-primary transition-colors">Resume Optimisation Service</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-600 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-600 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-slate-600 hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">CVMaker</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-slate-600 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-600 hover:text-primary transition-colors">Terms and Conditions</Link></li>
              <li><Link to="/pricing" className="text-slate-600 hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Blog</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-slate-600 hover:text-primary transition-colors">Resume Examples</Link></li>
              <li><Link to="/blog" className="text-slate-600 hover:text-primary transition-colors">CV vs Resume</Link></li>
              <li><Link to="/blog" className="text-slate-600 hover:text-primary transition-colors">Personal Information in Resume</Link></li>
              <li><Link to="/blog" className="text-slate-600 hover:text-primary transition-colors">Job Application Tips</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500">
            2026 &copy; CV Maker
          </div>
          <div className="flex space-x-6 text-sm text-slate-500">
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/cookie" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
