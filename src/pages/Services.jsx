import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Star, Clock } from 'lucide-react';

export default function Services() {
  return (
    <div className="bg-light min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 py-24 px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Have your resume written by professionals</h1>
        <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
          Let our expert resume writers craft a compelling resume that gets you noticed. ATS-optimized and delivered within 24-48 hours.
        </p>
        <Link to="/checkout" className="mt-8 inline-block bg-white text-emerald-700 font-bold px-8 py-3 rounded-xl hover:bg-emerald-50 transition-all shadow-lg">
          Order Writing Service →
        </Link>
      </section>

      {/* How it works */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-dark text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '1', icon: <Upload size={28}/>, title: 'Upload your resume', desc: 'Share your current resume or fill in a quick questionnaire about your background.', color: '#059669' },
            { step: '2', icon: <Star size={28}/>, title: 'Expert rewrite', desc: 'A professional resume writer rewrites and optimizes your resume for ATS systems.', color: '#2563EB' },
            { step: '3', icon: <Clock size={28}/>, title: 'Delivered in 24-48h', desc: 'Receive your professionally written resume in 24-48 hours, ready to apply.', color: '#7C3AED' },
          ].map(s => (
            <div key={s.step} className="text-center bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-white" style={{ backgroundColor: s.color }}>{s.icon}</div>
              <div className="text-5xl font-black mb-3 opacity-10 leading-none">{s.step}</div>
              <h3 className="text-xl font-bold text-dark mb-3">{s.title}</h3>
              <p className="text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">Choose your package</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Resume Review', price: '$9.99', features: ['Detailed feedback', 'ATS score check', 'Improvement tips', '2-day delivery'] , color: '#059669' },
              { name: 'Resume Writing', price: '$49.99', features: ['Full rewrite', 'ATS optimized', 'Cover letter', '24-48h delivery', '2 revisions'], color: '#2563EB', popular: true },
              { name: 'Resume Optimization', price: '$24.99', features: ['ATS optimization', 'Keyword enhancement', 'Format polish', '48h delivery'], color: '#7C3AED' },
            ].map(p => (
              <div key={p.name} className={`rounded-2xl border-2 p-8 flex flex-col ${p.popular ? 'border-primary shadow-xl shadow-primary/10 relative' : 'border-slate-100 shadow-sm'}`}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>}
                <h3 className="text-xl font-bold text-dark mb-2">{p.name}</h3>
                <div className="text-4xl font-black mb-6" style={{ color: p.color }}>{p.price}</div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {p.features.map(f => <li key={f} className="flex items-center gap-2 text-slate-600"><span style={{ color: p.color }}>✓</span> {f}</li>)}
                </ul>
                <Link to="/checkout" className="block text-center py-3 rounded-xl font-bold text-white transition-all hover:opacity-90" style={{ backgroundColor: p.color }}>
                  Order Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-dark text-center mb-10">What clients say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: 'Usman Ali', review: 'Got 3 job offers after their professional resume writing service. Best investment I made!', rating: 5 },
            { name: 'Ayesha Malik', review: 'The writer understood exactly what I needed. My resume went from zero responses to multiple interviews!', rating: 5 },
          ].map((r, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex gap-1 text-yellow-400 mb-3">{[...Array(r.rating)].map((_,j) => <Star key={j} size={16} fill="currentColor"/>)}</div>
              <p className="text-slate-700 mb-4">"{r.review}"</p>
              <div className="font-bold text-dark">{r.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
