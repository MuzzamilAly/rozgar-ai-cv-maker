import React from 'react';
import { Link } from 'react-router-dom';

const posts = [
  { id: 1, title: '10 Resume Tips That Will Get You Hired in 2026', category: 'Resume Tips', excerpt: 'Discover the proven resume writing strategies that top candidates use to land interviews at leading companies.', color: '#2563EB', date: 'May 20, 2026', readTime: '5 min read' },
  { id: 2, title: 'CV vs Resume: What Is the Difference?', category: 'CV Examples', excerpt: 'Many people confuse CVs and resumes. Learn the key differences and when to use each document for your job search.', color: '#7C3AED', date: 'May 18, 2026', readTime: '4 min read' },
  { id: 3, title: 'How to Write the Perfect Personal Statement', category: 'Resume Tips', excerpt: 'Your personal statement is the first thing recruiters read. Make it count with these expert-approved techniques.', color: '#059669', date: 'May 15, 2026', readTime: '6 min read' },
  { id: 4, title: 'Top 10 Interview Questions and Best Answers', category: 'Job Interviews', excerpt: 'Prepare for your upcoming job interview with our comprehensive guide to the most common interview questions.', color: '#DC2626', date: 'May 12, 2026', readTime: '8 min read' },
  { id: 5, title: 'How to Negotiate Your Salary Like a Pro', category: 'Career Advice', excerpt: 'Stop leaving money on the table. Learn the art of salary negotiation with proven scripts and strategies.', color: '#ea580c', date: 'May 10, 2026', readTime: '7 min read' },
  { id: 6, title: 'What Personal Information Should Go on a Resume?', category: 'Resume Tips', excerpt: 'Knowing what to include and what to leave out is crucial. Our guide covers everything about personal information on resumes.', color: '#0d9488', date: 'May 8, 2026', readTime: '5 min read' },
];

export default function Blog() {
  return (
    <div className="bg-light min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-20 px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Resume & Career Blog</h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">Expert advice on resume writing, job interviews, career growth, and landing your dream job.</p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main content */}
          <div className="lg:flex-1">
            {/* Featured article */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-10 hover:shadow-lg transition-shadow">
              <div className="p-6 md:p-10" style={{ background: `linear-gradient(135deg, ${posts[0].color}15, ${posts[0].color}30)` }}>
                <span className="text-xs font-bold px-3 py-1 rounded-full text-white mb-4 inline-block" style={{ backgroundColor: posts[0].color }}>{posts[0].category}</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-dark mb-3 mt-2">{posts[0].title}</h2>
                <p className="text-muted text-lg mb-5">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <span>{posts[0].date}</span>
                  <span>·</span>
                  <span>{posts[0].readTime}</span>
                </div>
                <a href="#" className="mt-5 inline-block font-bold text-white px-6 py-2.5 rounded-lg transition-all hover:opacity-90" style={{ backgroundColor: posts[0].color }}>
                  Read Article →
                </a>
              </div>
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {posts.slice(1).map(post => (
                <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="h-3" style={{ backgroundColor: post.color }}></div>
                  <div className="p-6">
                    <span className="text-xs font-bold px-2 py-1 rounded-full text-white mb-3 inline-block" style={{ backgroundColor: post.color }}>{post.category}</span>
                    <h3 className="text-lg font-bold text-dark mb-2 leading-snug">{post.title}</h3>
                    <p className="text-sm text-muted mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>{post.date} · {post.readTime}</span>
                      <a href="#" className="font-semibold hover:underline" style={{ color: post.color }}>Read →</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-72 space-y-6 shrink-0">
            {/* Search */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h3 className="font-bold text-dark mb-3">Search Articles</h3>
              <div className="flex gap-2">
                <input type="text" placeholder="Search..." className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Go</button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h3 className="font-bold text-dark mb-4">Categories</h3>
              <ul className="space-y-2">
                {['Resume Tips', 'Job Interviews', 'Career Advice', 'CV Examples', 'Salary Guides'].map(c => (
                  <li key={c}>
                    <a href="#" className="flex items-center justify-between text-sm text-slate-600 hover:text-primary transition-colors py-1">
                      <span>{c}</span>
                      <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-xs">12</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-xl mb-2">Create your resume today</h3>
              <p className="text-blue-100 text-sm mb-4">Join 100,000+ professionals who built their resume with us.</p>
              <Link to="/editor" className="block text-center bg-white text-primary font-bold py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
                Start Free →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
