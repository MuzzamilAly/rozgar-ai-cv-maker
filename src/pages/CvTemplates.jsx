import React from 'react';
import { Link } from 'react-router-dom';

const templates = [
  { id: 1, name: 'Academic Pro', category: 'Academic', color: '#1e3a8a', badge: 'For Scholars' },
  { id: 2, name: 'Executive Classic', category: 'Executive', color: '#1e293b', badge: 'Leadership' },
  { id: 3, name: 'Modern Scholar', category: 'Modern', color: '#7C3AED', badge: 'Trending' },
  { id: 4, name: 'Simple Clean', category: 'Simple', color: '#0d9488', badge: 'ATS-Friendly' },
  { id: 5, name: 'Creative Pro', category: 'Creative', color: '#DC2626', badge: 'Bold' },
  { id: 6, name: 'Professional Navy', category: 'Executive', color: '#2563EB', badge: 'Popular' },
  { id: 7, name: 'Minimal Elegant', category: 'Simple', color: '#059669', badge: 'Clean' },
  { id: 8, name: 'Graduate Edition', category: 'Academic', color: '#92400e', badge: 'Entry Level' },
];

export default function CvTemplates() {
  return (
    <div className="bg-light min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-600 to-purple-800 py-20 px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Professional CV Templates</h1>
        <p className="text-purple-100 text-lg max-w-2xl mx-auto">
          Comprehensive curriculum vitae templates for academic, executive and professional careers.
        </p>
        <Link to="/editor" className="mt-8 inline-block bg-white text-violet-700 font-bold px-8 py-3 rounded-xl hover:bg-purple-50 transition-all shadow-lg">
          Start Building Free →
        </Link>
      </section>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['All', 'Academic', 'Executive', 'Modern', 'Simple', 'Creative'].map(f => (
            <button key={f} className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
              f === 'All' ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-slate-600 border-slate-200 hover:border-violet-500 hover:text-violet-600'
            }`}>{f}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {templates.map(tpl => (
            <div key={tpl.id} className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="p-6" style={{ background: `linear-gradient(135deg, ${tpl.color}15, ${tpl.color}25)` }}>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
                  <div className="p-4" style={{ backgroundColor: tpl.color }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-white font-bold">A</div>
                      <div>
                        <div className="h-2 bg-white/80 rounded w-20 mb-1.5"></div>
                        <div className="h-1.5 bg-white/50 rounded w-14"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="text-xs font-bold mb-1.5" style={{ color: tpl.color }}>PUBLICATIONS</div>
                      <div className="h-1.5 bg-slate-100 rounded w-full mb-1"></div>
                      <div className="h-1.5 bg-slate-100 rounded w-4/5"></div>
                    </div>
                    <div>
                      <div className="text-xs font-bold mb-1.5" style={{ color: tpl.color }}>RESEARCH</div>
                      <div className="h-1.5 bg-slate-100 rounded w-full mb-1"></div>
                      <div className="h-1.5 bg-slate-100 rounded w-2/3"></div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {['PhD', 'Research', 'Teaching'].map(s => (
                        <span key={s} className="text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: tpl.color, fontSize: 10 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-dark">{tpl.name}</h3>
                    <p className="text-xs text-muted">{tpl.category}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: tpl.color }}>{tpl.badge}</span>
                </div>
                <Link to="/editor" className="block text-center text-sm font-bold py-2.5 rounded-lg text-white hover:opacity-90 transition-all" style={{ backgroundColor: tpl.color }}>
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
