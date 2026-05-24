import React from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <div className="bg-light min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">Simple pricing for professional resumes</h1>
          <p className="text-lg text-muted">Choose the plan that best fits your career goals.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Plan 1 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col hover:border-primary transition-colors">
            <h3 className="text-xl font-bold text-dark mb-2">7-Day Access</h3>
            <div className="text-4xl font-bold text-dark mb-6">$1.95</div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center text-slate-600"><span className="text-primary mr-2">✓</span> Create resume</li>
              <li className="flex items-center text-slate-600"><span className="text-primary mr-2">✓</span> Download PDF</li>
              <li className="flex items-center text-slate-600"><span className="text-primary mr-2">✓</span> Access templates</li>
              <li className="flex items-center text-slate-600"><span className="text-primary mr-2">✓</span> Edit anytime</li>
            </ul>
            <Link to="/checkout" className="w-full block text-center bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-bold transition-colors">
              Choose Plan
            </Link>
          </div>

          {/* Plan 2 */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-primary p-8 flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">Most Popular</div>
            <h3 className="text-xl font-bold text-dark mb-2">Monthly Access</h3>
            <div className="text-4xl font-bold text-dark mb-1"><span className="text-2xl text-muted">$</span>24.95<span className="text-lg text-muted">/mo</span></div>
            <p className="text-sm text-muted mb-6">Billed automatically</p>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center text-slate-600"><span className="text-primary mr-2">✓</span> Unlimited resumes</li>
              <li className="flex items-center text-slate-600"><span className="text-primary mr-2">✓</span> Cover letters</li>
              <li className="flex items-center text-slate-600"><span className="text-primary mr-2">✓</span> Multiple templates</li>
              <li className="flex items-center text-slate-600"><span className="text-primary mr-2">✓</span> Account dashboard</li>
              <li className="flex items-center text-slate-600"><span className="text-primary mr-2">✓</span> Application management</li>
            </ul>
            <Link to="/checkout" className="w-full block text-center bg-primary text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-bold transition-colors shadow-sm">
              Choose Plan
            </Link>
          </div>

          {/* Plan 3 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col hover:border-primary transition-colors">
            <h3 className="text-xl font-bold text-dark mb-2">Professional Service</h3>
            <div className="text-3xl font-bold text-dark mb-6">Custom Price</div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center text-slate-600"><span className="text-primary mr-2">✓</span> Expert writing</li>
              <li className="flex items-center text-slate-600"><span className="text-primary mr-2">✓</span> Resume optimization</li>
              <li className="flex items-center text-slate-600"><span className="text-primary mr-2">✓</span> 24-48 hour delivery</li>
              <li className="flex items-center text-slate-600"><span className="text-primary mr-2">✓</span> Professional templates</li>
            </ul>
            <Link to="/services" className="w-full block text-center bg-white border-2 border-slate-200 text-slate-700 hover:border-primary hover:text-primary px-6 py-3 rounded-lg font-bold transition-colors">
              Get Quote
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
