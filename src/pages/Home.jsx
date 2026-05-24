import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Zap, Shield, Star } from 'lucide-react';

// Colorful CV Mockup Component
function CVMockup({ color, accent, name, title }) {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden" style={{ width: 220, minHeight: 300 }}>
      {/* Header Bar */}
      <div style={{ backgroundColor: color }} className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{name[0]}</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm">{name}</div>
            <div className="text-white/70 text-xs">{title}</div>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="p-4 space-y-3">
        <div>
          <div className="text-xs font-bold mb-1" style={{ color }}>EXPERIENCE</div>
          <div className="h-2 bg-slate-100 rounded mb-1 w-full"></div>
          <div className="h-2 bg-slate-100 rounded mb-1 w-4/5"></div>
          <div className="h-2 bg-slate-100 rounded w-3/5"></div>
        </div>
        <div>
          <div className="text-xs font-bold mb-1" style={{ color }}>EDUCATION</div>
          <div className="h-2 bg-slate-100 rounded mb-1 w-full"></div>
          <div className="h-2 bg-slate-100 rounded w-2/3"></div>
        </div>
        <div className="flex gap-1 flex-wrap mt-2">
          {['React', 'Node.js', 'Python'].map(s => (
            <span key={s} className="px-2 py-0.5 rounded-full text-white text-xs" style={{ backgroundColor: accent }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const templateData = [
  { id: 1, name: 'Executive Blue', category: 'Professional', color: '#2563EB', accent: '#1d4ed8', bgFrom: 'from-blue-50', bgTo: 'to-blue-100', badge: 'Most Popular' },
  { id: 2, name: 'Creative Violet', category: 'Creative', color: '#7C3AED', accent: '#6d28d9', bgFrom: 'from-violet-50', bgTo: 'to-violet-100', badge: 'Trending' },
  { id: 3, name: 'Modern Teal', category: 'Modern', color: '#0d9488', accent: '#0f766e', bgFrom: 'from-teal-50', bgTo: 'to-teal-100', badge: 'ATS-Friendly' },
  { id: 4, name: 'Bold Red', category: 'Creative', color: '#DC2626', accent: '#b91c1c', bgFrom: 'from-red-50', bgTo: 'to-red-100', badge: 'New' },
  { id: 5, name: 'Emerald Pro', category: 'Professional', color: '#059669', accent: '#047857', bgFrom: 'from-emerald-50', bgTo: 'to-emerald-100', badge: 'ATS-Friendly' },
  { id: 6, name: 'Slate Dark', category: 'Simple', color: '#1e293b', accent: '#334155', bgFrom: 'from-slate-50', bgTo: 'to-slate-200', badge: 'Classic' },
  { id: 7, name: 'Orange Bright', category: 'Creative', color: '#ea580c', accent: '#c2410c', bgFrom: 'from-orange-50', bgTo: 'to-orange-100', badge: 'Bold' },
  { id: 8, name: 'Rose Elegant', category: 'Modern', color: '#be185d', accent: '#9d174d', bgFrom: 'from-pink-50', bgTo: 'to-pink-100', badge: 'Elegant' },
  { id: 9, name: 'Navy Executive', category: 'Professional', color: '#1e3a8a', accent: '#1e40af', bgFrom: 'from-blue-50', bgTo: 'to-indigo-100', badge: 'Executive' },
  { id: 10, name: 'Forest Green', category: 'Simple', color: '#166534', accent: '#15803d', bgFrom: 'from-green-50', bgTo: 'to-green-100', badge: 'Clean' },
  { id: 11, name: 'Indigo Modern', category: 'Modern', color: '#4338ca', accent: '#3730a3', bgFrom: 'from-indigo-50', bgTo: 'to-indigo-100', badge: 'Modern' },
  { id: 12, name: 'Amber Classic', category: 'Simple', color: '#92400e', accent: '#78350f', bgFrom: 'from-amber-50', bgTo: 'to-amber-100', badge: 'Classic' },
];

export default function Home() {
  return (
    <div className="bg-light">
      
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-blue-200">
              <Zap size={16} /> 100,000+ Resumes Created
            </div>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-dark leading-tight tracking-tight">
              Create your<br />
              <span className="text-primary">Professional Resume</span><br />
              with CV Maker
            </h1>
            <p className="text-lg text-muted max-w-xl mx-auto lg:mx-0">
              Build a stunning, ATS-friendly resume in minutes. Choose from 30+ premium templates designed by HR experts.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/editor" className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 text-lg">
                Create your Resume →
              </Link>
              <Link to="/templates" className="bg-white border-2 border-slate-200 hover:border-primary text-slate-700 hover:text-primary px-8 py-4 rounded-xl font-bold transition-all text-lg">
                View Templates
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted pt-2">
              <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-emerald-500" /> Free to start</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-emerald-500" /> ATS-Optimized</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-emerald-500" /> Download PDF instantly</span>
            </div>
          </div>

          {/* Right - Floating Colorful CV Mockups */}
          <div className="lg:w-1/2 relative flex justify-center items-center h-[380px] w-full">
            {/* Back card - violet */}
            <div className="absolute top-4 left-8 transform -rotate-6 z-10 scale-90">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden w-52">
                <div className="bg-gradient-to-r from-violet-600 to-purple-500 p-4">
                  <div className="w-10 h-10 rounded-full bg-white/30 mb-2"></div>
                  <div className="h-2 bg-white/70 rounded w-3/4 mb-1"></div>
                  <div className="h-2 bg-white/40 rounded w-1/2"></div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="h-2 bg-slate-100 rounded w-full"></div>
                  <div className="h-2 bg-slate-100 rounded w-4/5"></div>
                  <div className="h-2 bg-slate-100 rounded w-3/5"></div>
                  <div className="flex gap-1 mt-3">
                    <span className="bg-violet-100 text-violet-700 text-xs px-2 py-0.5 rounded-full">Design</span>
                    <span className="bg-violet-100 text-violet-700 text-xs px-2 py-0.5 rounded-full">UI/UX</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center main card - blue */}
            <div className="relative z-30 transform scale-110 shadow-2xl">
              <div className="bg-white rounded-xl overflow-hidden w-56">
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center text-white font-bold text-xl">A</div>
                    <div>
                      <div className="h-2.5 bg-white rounded w-24 mb-1"></div>
                      <div className="h-2 bg-white/60 rounded w-16"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <div className="text-xs font-bold text-blue-600 mb-1">EXPERIENCE</div>
                    <div className="h-2 bg-slate-100 rounded w-full mb-1"></div>
                    <div className="h-2 bg-slate-100 rounded w-4/5 mb-1"></div>
                    <div className="h-2 bg-slate-100 rounded w-3/5"></div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-600 mb-1">SKILLS</div>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full border border-blue-200">React</span>
                      <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full border border-blue-200">Node.js</span>
                      <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full border border-blue-200">Python</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-600 mb-1">EDUCATION</div>
                    <div className="h-2 bg-slate-100 rounded w-full mb-1"></div>
                    <div className="h-2 bg-slate-100 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right card - emerald */}
            <div className="absolute top-4 right-8 transform rotate-6 z-10 scale-90">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden w-52">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 p-4">
                  <div className="w-10 h-10 rounded-full bg-white/30 mb-2"></div>
                  <div className="h-2 bg-white/70 rounded w-3/4 mb-1"></div>
                  <div className="h-2 bg-white/40 rounded w-1/2"></div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="h-2 bg-slate-100 rounded w-full"></div>
                  <div className="h-2 bg-slate-100 rounded w-4/5"></div>
                  <div className="h-2 bg-slate-100 rounded w-3/5"></div>
                  <div className="flex gap-1 mt-3">
                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">Finance</span>
                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">Excel</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating rating badge */}
            <div className="absolute bottom-2 left-4 z-40 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor"/>)}
              </div>
              <span className="text-sm font-semibold text-dark">4.9/5</span>
              <span className="text-xs text-muted">from 10k+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Everything you need to get hired</h2>
            <p className="text-muted text-lg">Professional tools to help you stand out from the crowd.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Quick & Easy Builder', desc: 'Create a professional resume in under 15 minutes with our guided step-by-step builder.', color: 'bg-blue-50 text-blue-600' },
              { icon: '🎯', title: 'ATS-Optimized Templates', desc: 'All templates are tested to pass Applicant Tracking Systems used by top companies.', color: 'bg-violet-50 text-violet-600' },
              { icon: '📥', title: 'Instant PDF Download', desc: 'Download your resume instantly as a pixel-perfect PDF, ready to send to employers.', color: 'bg-emerald-50 text-emerald-600' },
            ].map((f, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:shadow-md transition-shadow text-center">
                <div className={`w-16 h-16 ${f.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5`}>{f.icon}</div>
                <h3 className="text-xl font-bold text-dark mb-3">{f.title}</h3>
                <p className="text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">30+ Premium Resume Templates</h2>
            <p className="text-muted text-lg">Choose the perfect design for your career. All templates are ATS-friendly.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {templateData.map((tpl) => (
              <div key={tpl.id} className={`group bg-gradient-to-br ${tpl.bgFrom} ${tpl.bgTo} border border-white rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer`}>
                {/* Mini CV Preview */}
                <div className="p-4">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="p-3" style={{ backgroundColor: tpl.color }}>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-white/40 flex items-center justify-center text-white text-xs font-bold">A</div>
                        <div>
                          <div className="h-1.5 bg-white/80 rounded w-16 mb-1"></div>
                          <div className="h-1 bg-white/50 rounded w-12"></div>
                        </div>
                      </div>
                    </div>
                    {/* Body */}
                    <div className="p-3 space-y-2">
                      <div className="h-1 bg-slate-100 rounded w-full"></div>
                      <div className="h-1 bg-slate-100 rounded w-4/5"></div>
                      <div className="h-1 bg-slate-100 rounded w-3/5"></div>
                      <div className="flex gap-1 mt-2">
                        <span className="px-1.5 py-0.5 rounded text-white text-xs" style={{ backgroundColor: tpl.color, fontSize: '9px' }}>Skill</span>
                        <span className="px-1.5 py-0.5 rounded text-white text-xs" style={{ backgroundColor: tpl.color, fontSize: '9px' }}>Skill</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card Footer */}
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-dark">{tpl.name}</div>
                      <div className="text-xs text-muted">{tpl.category}</div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full text-white font-medium" style={{ backgroundColor: tpl.color }}>{tpl.badge}</span>
                  </div>
                  <Link to="/editor" className="mt-3 block text-center text-sm font-semibold py-2 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: tpl.color }}>
                    Use Template →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/templates" className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-xl font-bold transition-all">
              View All 30+ Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">What our users say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Ahmed', role: 'Marketing Manager', quote: 'I created my resume in 10 minutes and got 5 interview calls in a week. Amazing tool!', rating: 5, initial: 'S', color: '#2563EB' },
              { name: 'Ali Hassan', role: 'Software Engineer', quote: 'The ATS-friendly templates helped me get past the filtering system. Got my dream job!', rating: 5, initial: 'A', color: '#7C3AED' },
              { name: 'Fatima Khan', role: 'HR Professional', quote: 'Clean, professional designs. I recommend CV Maker to all my clients looking for jobs.', rating: 5, initial: 'F', color: '#059669' },
            ].map((t, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-8">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={18} fill="currentColor"/>)}
                </div>
                <p className="text-slate-700 mb-6 text-base leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: t.color }}>{t.initial}</div>
                  <div>
                    <div className="font-bold text-dark">{t.name}</div>
                    <div className="text-sm text-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-primary to-blue-700 text-white text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">More than 100,000 users have already made their resume</h2>
        <p className="text-blue-100 mb-8 text-lg">Join them and create your professional resume today. It's free to start!</p>
        <Link to="/editor" className="inline-block bg-white text-primary px-10 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg text-lg hover:-translate-y-0.5">
          Create your Resume →
        </Link>
      </section>
    </div>
  );
}
