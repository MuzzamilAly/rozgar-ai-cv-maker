import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function CreateResume() {
  return (
    <div className="bg-light min-h-screen">
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-24 px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold mb-5 leading-tight">
          Build your resume in minutes
        </h1>
        <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
          Our AI-powered builder guides you step-by-step. No writing experience needed.
        </p>
        <Link to="/editor" className="inline-flex items-center gap-2 bg-white text-primary font-extrabold px-10 py-4 rounded-xl hover:bg-blue-50 transition-all shadow-xl text-lg hover:-translate-y-0.5">
          Start Building Now <ArrowRight size={20} />
        </Link>
        <div className="flex flex-wrap justify-center gap-6 mt-10 text-blue-100 text-sm">
          <span className="flex items-center gap-1"><CheckCircle2 size={16} /> Free to use</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={16} /> No sign-up required</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={16} /> Download instantly</span>
        </div>
      </section>

      {/* 3-step process */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-dark text-center mb-14">3 Simple Steps to Your Perfect Resume</h2>
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-slate-200 z-0"></div>
          {[
            { step: '01', title: 'Enter your details', desc: 'Fill in your experience, education, skills and contact info in our guided form.', color: '#2563EB' },
            { step: '02', title: 'Choose a template', desc: 'Pick from 30+ premium, ATS-friendly templates designed by HR professionals.', color: '#7C3AED' },
            { step: '03', title: 'Download your resume', desc: 'Preview your polished resume in real-time and download as a PDF instantly.', color: '#059669' },
          ].map(s => (
            <div key={s.step} className="relative z-10 text-center bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl mx-auto mb-5 shadow-md" style={{ backgroundColor: s.color }}>{s.step}</div>
              <h3 className="text-xl font-bold text-dark mb-3">{s.title}</h3>
              <p className="text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/editor" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-10 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-md text-lg">
            Start Building Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Template Preview Strip */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">Choose from 30+ Premium Templates</h2>
          <div className="flex gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin' }}>
            {[
              { color: '#2563EB', name: 'Executive Blue' },
              { color: '#7C3AED', name: 'Creative Violet' },
              { color: '#059669', name: 'Emerald Pro' },
              { color: '#DC2626', name: 'Bold Red' },
              { color: '#0d9488', name: 'Modern Teal' },
              { color: '#1e3a8a', name: 'Navy Executive' },
            ].map((tpl, i) => (
              <div key={i} className="shrink-0 w-44 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer" onClick={() => window.location.href='/editor'}>
                <div className="p-3" style={{ backgroundColor: tpl.color }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/30"></div>
                    <div>
                      <div className="h-1.5 bg-white/70 rounded w-14 mb-1"></div>
                      <div className="h-1 bg-white/40 rounded w-10"></div>
                    </div>
                  </div>
                </div>
                <div className="p-3 space-y-1.5">
                  <div className="h-1.5 bg-slate-100 rounded w-full"></div>
                  <div className="h-1.5 bg-slate-100 rounded w-4/5"></div>
                  <div className="h-1.5 bg-slate-100 rounded w-3/5"></div>
                  <div className="text-xs font-semibold text-center mt-2 py-1 rounded text-white" style={{ backgroundColor: tpl.color }}>{tpl.name}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/templates" className="text-primary font-bold hover:underline">View all 30+ templates →</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
