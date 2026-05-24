import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileText, PlusCircle, CreditCard, Settings, LogOut, MoreVertical } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-slate-50">
      
      {/* Sidebar Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
            CV Maker
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-2">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-primary rounded-xl font-medium">
              <LayoutDashboard size={20} /> My Dashboard
            </Link>
            <Link to="/editor" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
              <PlusCircle size={20} /> Create New
            </Link>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
              <FileText size={20} /> Cover Letters
            </a>
            <Link to="/pricing" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
              <CreditCard size={20} /> Billing
            </Link>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
              <Settings size={20} /> Settings
            </a>
          </nav>
        </div>
        <div className="p-4 border-t border-slate-200">
          <button className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition-colors w-full">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center px-4 justify-between">
          <span className="font-bold text-primary">CV Maker</span>
          <button className="p-2 bg-slate-100 rounded-lg"><LayoutDashboard size={20}/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-dark">Welcome back, Ali! 👋</h1>
              <p className="text-muted mt-1">Here is an overview of your recent resumes and activity.</p>
            </div>
            <Link to="/editor" className="hidden sm:flex bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors items-center gap-2 shadow-sm">
              <PlusCircle size={20}/> Create Resume
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Create New Card */}
            <Link to="/editor" className="bg-white border-2 border-dashed border-slate-300 hover:border-primary hover:bg-blue-50 transition-colors rounded-2xl p-6 flex flex-col items-center justify-center min-h-[250px] group cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PlusCircle size={32} />
              </div>
              <h3 className="font-bold text-dark text-lg">Create New Resume</h3>
              <p className="text-sm text-muted">Start from scratch</p>
            </Link>

            {/* Existing Resume Card */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-slate-100 flex items-center justify-center border-b border-slate-100 relative">
                <div className="w-24 h-32 bg-white shadow-sm rounded-sm p-2 flex flex-col gap-1">
                  <div className="h-2 w-1/2 bg-slate-200"></div>
                  <div className="h-1 w-full bg-slate-100 mt-2"></div>
                  <div className="h-1 w-full bg-slate-100"></div>
                </div>
                <div className="absolute top-3 right-3 bg-white p-1.5 rounded-md shadow-sm cursor-pointer hover:bg-slate-50 text-slate-500">
                  <MoreVertical size={16}/>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-dark mb-1">Software Engineer CV</h3>
                <p className="text-sm text-muted">Updated 2 days ago</p>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium transition-colors">Edit</button>
                  <button className="flex-1 bg-primary hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">Download</button>
                </div>
              </div>
            </div>
            
            {/* Account Status Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Free Plan</h3>
                <p className="text-slate-400 text-sm">Upgrade to unlock unlimited resumes and premium ATS-friendly templates.</p>
              </div>
              <Link to="/pricing" className="mt-6 bg-white text-slate-900 w-full text-center py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors">
                Upgrade to Pro
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <h2 className="text-xl font-bold text-dark mb-6">Recent Activity</h2>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="divide-y divide-slate-100">
              {[
                { action: "Downloaded Software Engineer CV as PDF", date: "Today at 10:45 AM" },
                { action: "Created new Resume: Software Engineer CV", date: "Yesterday" },
                { action: "Signed up for CV Maker", date: "Oct 12, 2026" },
              ].map((item, i) => (
                <div key={i} className="p-4 px-6 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center">
                      <FileText size={18}/>
                    </div>
                    <span className="font-medium text-slate-700">{item.action}</span>
                  </div>
                  <span className="text-sm text-muted">{item.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
