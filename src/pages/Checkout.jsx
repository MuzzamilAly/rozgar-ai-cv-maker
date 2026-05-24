import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  return (
    <div className="min-h-screen bg-light py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 text-center">
          <Link to="/" className="inline-flex items-center text-2xl font-bold text-primary mb-6">
            <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
            CV Maker
          </Link>
          <h1 className="text-3xl font-bold text-dark">Secure Checkout</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Order Summary Left */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-dark mb-6">Order Summary</h2>
              
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-800">Monthly Access</h3>
                  <p className="text-sm text-slate-500">Unlimited resumes and templates</p>
                </div>
                <div className="text-xl font-bold text-dark">$24.95</div>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-600 font-medium">Total due today</span>
                <span className="text-2xl font-bold text-primary">$24.95</span>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 flex gap-3 text-sm text-slate-700">
                <ShieldCheck className="text-primary shrink-0" size={20} />
                <p>You have 14 days to request a refund if you are not 100% satisfied with our service.</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-6 grayscale opacity-60">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png" className="h-6" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" className="h-8" alt="Mastercard" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" className="h-6" alt="PayPal" />
            </div>
          </div>

          {/* Payment Form Right */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-dark mb-6">Payment Details</h2>
            
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input type="email" required className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="you@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name on Card</label>
                <input type="text" required className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="Ali Khan" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Card Information</label>
                <div className="relative">
                  <input type="text" required className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="0000 0000 0000 0000" />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <CreditCardIcon className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Expiry (MM/YY)</label>
                  <input type="text" required className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="12/26" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                  <input type="text" required className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="123" />
                </div>
              </div>

              <button type="button" className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-primary hover:bg-blue-700 focus:outline-none mt-6 transition-colors">
                <Lock size={18} /> Start Subscription
              </button>
              
              <p className="text-xs text-center text-slate-500 mt-4">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

function CreditCardIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  )
}
