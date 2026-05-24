import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const templates = [
  { id: 1, name: 'Executive Blue', category: 'Professional', color: '#2563EB', badge: 'Most Popular' },
  { id: 2, name: 'Creative Violet', category: 'Creative', color: '#7C3AED', badge: 'Trending' },
  { id: 3, name: 'Modern Teal', category: 'Modern', color: '#0d9488', badge: 'ATS-Friendly' },
  { id: 4, name: 'Bold Red', category: 'Creative', color: '#DC2626', badge: 'New' },
  { id: 5, name: 'Emerald Pro', category: 'Professional', color: '#059669', badge: 'ATS-Friendly' },
  { id: 6, name: 'Slate Dark', category: 'Simple', color: '#1e293b', badge: 'Classic' },
  { id: 7, name: 'Orange Bright', category: 'Creative', color: '#ea580c', badge: 'Bold' },
  { id: 8, name: 'Rose Elegant', category: 'Modern', color: '#be185d', badge: 'Elegant' },
  { id: 9, name: 'Navy Executive', category: 'Professional', color: '#1e3a8a', badge: 'Executive' },
  { id: 10, name: 'Forest Green', category: 'Simple', color: '#166534', badge: 'Clean' },
  { id: 11, name: 'Indigo Modern', category: 'Modern', color: '#4338ca', badge: 'Modern' },
  { id: 12, name: 'Amber Classic', category: 'Simple', color: '#92400e', badge: 'Classic' },
  { id: 13, name: 'Cyan Tech', category: 'Modern', color: '#0891b2', badge: 'Tech' },
  { id: 14, name: 'Lime Fresh', category: 'Creative', color: '#4d7c0f', badge: 'Fresh' },
  { id: 15, name: 'Deep Purple', category: 'Professional', color: '#5b21b6', badge: 'Premium' },
];

const filters = ['All', 'Professional', 'Modern', 'Creative', 'Simple', 'ATS-Friendly'];

export default function ResumeTemplates() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? templates : templates.filter(t => t.category === active || t.badge === active);

  return (
    <div className="bg-light min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20 px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Professional Resume Templates</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">Choose from {templates.length}+ expert-designed, ATS-optimized resume templates. Stand out from the crowd!</p>
        <Link to="/editor" className="mt-8 inline-block bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg">
          Start Building Free →
        </Link>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                active === f ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'
              }`}>{f}</button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map(tpl => (
            <div key={tpl.id} className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              
              {/* Colorful Preview */}
              <div className="p-6 relative" style={{ background: `linear-gradient(135deg, ${tpl.color}15 0%, ${tpl.color}30 100%)` }}>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
                  {/* Header */}
                  <div className="p-4" style={{ backgroundColor: tpl.color }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-white font-bold">A</div>
                      <div>
                        <div className="h-2 bg-white/80 rounded w-20 mb-1.5"></div>
                        <div className="h-1.5 bg-white/50 rounded w-14"></div>
                      </div>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="text-xs font-bold mb-1.5" style={{ color: tpl.color }}>EXPERIENCE</div>
                      <div className="h-1.5 bg-slate-100 rounded w-full mb-1"></div>
                      <div className="h-1.5 bg-slate-100 rounded w-4/5 mb-1"></div>
                      <div className="h-1.5 bg-slate-100 rounded w-3/5"></div>
                    </div>
                    <div>
                      <div className="text-xs font-bold mb-1.5" style={{ color: tpl.color }}>SKILLS</div>
                      <div className="flex flex-wrap gap-1">
                        {['React', 'Design', 'Python'].map(s => (
                          <span key={s} className="text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: tpl.color, fontSize: 10 }}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold mb-1.5" style={{ color: tpl.color }}>EDUCATION</div>
                      <div className="h-1.5 bg-slate-100 rounded w-full mb-1"></div>
                      <div className="h-1.5 bg-slate-100 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
                {/* Badge */}
                <div className="absolute top-3 right-3 text-xs font-bold text-white px-2 py-1 rounded-full" style={{ backgroundColor: tpl.color }}>
                  {tpl.badge}
                </div>
              </div>

              {/* Card footer */}
              <div className="p-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-dark">{tpl.name}</h3>
                    <p className="text-xs text-muted">{tpl.category}</p>
                  </div>
                </div>
                <Link to="/editor" className="block text-center text-sm font-bold py-2.5 rounded-lg text-white transition-all hover:opacity-90 hover:shadow-md" style={{ backgroundColor: tpl.color }}>
                  Use this Template →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
