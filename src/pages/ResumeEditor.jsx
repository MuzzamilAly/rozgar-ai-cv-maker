import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { ChevronRight, ChevronLeft, User, Briefcase, GraduationCap, Star, Globe, BookOpen, Heart, FileText, Download, Eye, Palette, Plus, Trash2, LayoutTemplate, X, Sparkles, Loader2 } from 'lucide-react';
import { ALL_TEMPLATES } from '../components/CVTemplates';

const sections = [
  { id: 'personal', label: 'Personal Details', icon: User },
  { id: 'profile', label: 'Profile / Summary', icon: FileText },
  { id: 'experience', label: 'Work Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Star },
  { id: 'languages', label: 'Languages', icon: Globe },
  { id: 'courses', label: 'Courses & Certs', icon: BookOpen },
  { id: 'hobbies', label: 'Hobbies', icon: Heart },
];

const templateColors = [
  { name: 'Blue', color: '#2563EB', light: '#EFF6FF' },
  { name: 'Violet', color: '#7C3AED', light: '#F5F3FF' },
  { name: 'Emerald', color: '#059669', light: '#ECFDF5' },
  { name: 'Red', color: '#DC2626', light: '#FEF2F2' },
  { name: 'Teal', color: '#0d9488', light: '#F0FDFA' },
  { name: 'Navy', color: '#1e3a8a', light: '#EFF6FF' },
  { name: 'Rose', color: '#be185d', light: '#FDF2F8' },
  { name: 'Orange', color: '#ea580c', light: '#FFF7ED' },
];

const eduLevels = [
  { key: 'matric', label: 'Matric (9th-10th)', grade: 'SSC', placeholder: 'Board of Secondary Education' },
  { key: 'inter', label: 'Intermediate (11th-12th)', grade: 'HSSC / FSc / FA / ICS', placeholder: 'Board of Intermediate Education' },
  { key: 'bachelor', label: "Bachelor's Degree", grade: 'BS / BCS / BBA / B.Com', placeholder: 'e.g. University of Lahore' },
  { key: 'master', label: "Master's Degree", grade: 'MS / MBA / M.Phil', placeholder: 'e.g. LUMS, FAST, NUST' },
  { key: 'phd', label: 'PhD / Doctorate', grade: 'PhD / D.Phil', placeholder: 'e.g. Punjab University' },
];

const labelStyle = "block text-sm font-semibold text-slate-600 mb-1.5";
const inputStyle = "w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-slate-800 font-medium text-sm";

function InputField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className={labelStyle}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} className={inputStyle} placeholder={placeholder} />
    </div>
  );
}

export default function ResumeEditor() {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedColor, setSelectedColor] = useState(templateColors[0]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(ALL_TEMPLATES[0]);
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);

  const [personal, setPersonal] = useState({ jobTitle: '', firstName: '', lastName: '', email: '', phone: '', city: '', linkedin: '' });
  const [profile, setProfile] = useState('');
  const [experiences, setExperiences] = useState([{ company: '', position: '', dates: '', desc: '' }]);
  const [education, setEducation] = useState({
    matric:  { enabled: false, school: '', grade: '', year: '', subjects: '' },
    inter:   { enabled: false, school: '', grade: '', year: '', subjects: '' },
    bachelor:{ enabled: false, school: '', degree: '', year: '', gpa: '' },
    master:  { enabled: false, school: '', degree: '', year: '', gpa: '' },
    phd:     { enabled: false, school: '', degree: '', year: '', thesis: '' },
  });
  const [skills, setSkills] = useState('');
  const [languages, setLanguages] = useState([{ lang: '', level: 'Fluent' }]);
  const [courses, setCourses] = useState('');
  const [hobbies, setHobbies] = useState('');

  // AI Generation States
  const [isGeneratingProfile, setIsGeneratingProfile] = useState(false);
  const [generatingExpId, setGeneratingExpId] = useState(null);
  const [isGeneratingFull, setIsGeneratingFull] = useState(false);
  const [aiOutput, setAiOutput] = useState(null);

  const callN8nWebhook = async (payload) => {
    // The user's exact Webhook path from n8n
    const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook-test/rozgar-cv-maker';
    
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error("Webhook failed");
      const data = await response.json();
      
      // Auto-detect response text format from n8n
      const resultText = data.output || data.text || data.result || data.response || (data[0] && data[0].output) || JSON.stringify(data);
      return resultText;
    } catch (err) {
      console.error(err);
      alert("⚠️ Error connecting to n8n Webhook!\n\n1. Make sure n8n is running.\n2. In n8n, set Webhook path to: 'generate-cv'\n3. Click 'Listen for Test Event' in n8n.\n4. Ensure CORS is enabled in the Webhook node options.");
      throw err;
    }
  };

  const generateProfileWithAI = async () => {
    if (!personal.jobTitle) {
      alert("Please enter a 'Wanted Job Title' in the Personal Details section first.");
      return;
    }
    setIsGeneratingProfile(true);
    try {
      const result = await callN8nWebhook({ 
        action: 'generate_profile', 
        jobTitle: personal.jobTitle 
      });
      setProfile(result);
    } catch (e) {} finally {
      setIsGeneratingProfile(false);
    }
  };

  const generateExpWithAI = async (index, exp) => {
    if (!exp.position) {
      alert("Please enter a 'Job Title / Position' to generate description.");
      return;
    }
    setGeneratingExpId(index);
    try {
      const result = await callN8nWebhook({ 
        action: 'generate_experience', 
        position: exp.position, 
        company: exp.company 
      });
      updateExp(index, 'desc', result);
    } catch (e) {} finally {
      setGeneratingExpId(null);
    }
  };

  const generateFullN8n = async () => {
    setIsGeneratingFull(true);
    setAiOutput(null);
    const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/rozgar-cv-maker';
    try {
      // Create payload matching n8n workflow expectations
      const payload = {
        full_name: `${personal.firstName} ${personal.lastName}`.trim() || 'John Doe',
        phone: personal.phone || 'N/A',
        city: personal.city || 'N/A',
        job_type: personal.jobTitle || 'Professional',
        template_id: selectedTemplate.id,
        action: 'generate_full_cv'
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error("Webhook failed");
      const data = await response.json();
      
      // 🧠 SMART PARSING: Handle n8n array wrapping, raw output, or custom wrappers
      let extractedData = data;
      if (Array.isArray(data) && data.length > 0) {
        extractedData = data[0].output || data[0];
      } else if (data.output) {
        extractedData = data.output;
      } else if (data.ai_data) {
        extractedData = data.ai_data;
      }

      setAiOutput(extractedData);

      // ✨ MAGIC: Auto-fill the React CV using N8n's AI output!
      if (extractedData) {
        // Handle new cv_data schema (nested)
        if (extractedData.cv_data) {
          if (extractedData.cv_data.profile_summary) setProfile(extractedData.cv_data.profile_summary);
          
          if (extractedData.cv_data.skills) {
            const skillsText = Array.isArray(extractedData.cv_data.skills) 
              ? extractedData.cv_data.skills.join(', ') 
              : extractedData.cv_data.skills;
            setSkills(skillsText);
          }

          if (extractedData.cv_data.experience_bullets && Array.isArray(extractedData.cv_data.experience_bullets)) {
            const newExps = extractedData.cv_data.experience_bullets.map(exp => ({
              company: '',
              position: exp.company_or_role || 'Experience',
              dates: '',
              desc: Array.isArray(exp.details) ? exp.details.join('\n') : exp.details
            }));
            setExperiences(newExps);
          }

          if (extractedData.cv_data.education_details) {
            const eduText = Array.isArray(extractedData.cv_data.education_details) 
              ? extractedData.cv_data.education_details.join('\n') 
              : extractedData.cv_data.education_details;
            setEducation(e => ({ 
              ...e, 
              degree: { ...e.degree, enabled: true, desc: eduText } 
            }));
          }
        } 
        // Fallback for old schema
        else {
          if (extractedData.profile_summary) setProfile(extractedData.profile_summary);
          if (extractedData.skills_list) setSkills(Array.isArray(extractedData.skills_list) ? extractedData.skills_list.join(', ') : extractedData.skills_list);
          if (extractedData.experience_text) setExperiences([{ company: '', position: 'Experience', dates: '', desc: extractedData.experience_text }]);
          if (extractedData.education_text) setEducation(e => ({ ...e, degree: { ...e.degree, enabled: true, desc: extractedData.education_text } }));
        }
      }

    } catch (err) {
      console.error(err);
      alert(`⚠️ Could not connect to n8n!\n\nTrying to connect to:\n${N8N_WEBHOOK_URL}\n\nMake sure your n8n workflow is 'Listening for test events', and CORS is enabled in the webhook node.`);
    } finally {
      setIsGeneratingFull(false);
    }
  };

  const activeColor = selectedColor.color;
  const activeLight = selectedColor.light;

  const updatePersonal = (k, v) => setPersonal(p => ({ ...p, [k]: v }));
  const updateExp = (i, k, v) => setExperiences(ex => ex.map((e, idx) => idx === i ? { ...e, [k]: v } : e));
  const addExp = () => setExperiences(ex => [...ex, { company: '', position: '', dates: '', desc: '' }]);
  const removeExp = (i) => setExperiences(ex => ex.filter((_, idx) => idx !== i));
  const updateEdu = (level, k, v) => setEducation(e => ({ ...e, [level]: { ...e[level], [k]: v } }));
  const toggleEdu = (level) => setEducation(e => ({ ...e, [level]: { ...e[level], enabled: !e[level].enabled } }));
  const updateLang = (i, k, v) => setLanguages(ls => ls.map((l, idx) => idx === i ? { ...l, [k]: v } : l));
  const addLang = () => setLanguages(ls => [...ls, { lang: '', level: 'Fluent' }]);
  const removeLang = (i) => setLanguages(ls => ls.filter((_, idx) => idx !== i));
  const goNext = () => setActiveSection(i => Math.min(i + 1, sections.length - 1));
  const goPrev = () => setActiveSection(i => Math.max(i - 1, 0));

  // Build data object for template rendering
  const cvData = { personal, profile, experiences, education, skills, languages, hobbies, courses };
  const ActiveCVTemplate = selectedTemplate.component;

  const componentRef = useRef(null);

  const handleDownload = useReactToPrint({
    contentRef: componentRef,
    documentTitle: personal.fullName ? `${personal.fullName}_CV` : 'My_CV',
    pageStyle: `
      @page { size: A4 portrait; margin: 0; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `
  });

  const openN8nHtmlCv = () => {
    if (aiOutput && aiOutput.cv_html) {
      const blob = new Blob([aiOutput.cv_html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <style>{`
        @media print {
          html, body { height: auto !important; overflow: visible !important; background: white !important; }
          .no-print { display: none !important; }
          #cv-print-area { position: absolute !important; left: 0 !important; top: 0 !important; transform: scale(1) !important; width: 210mm !important; margin: 0 !important; padding: 0 !important; box-shadow: none !important; background-color: white !important; }
          @page { size: A4 portrait; margin: 0; }
        }
      `}</style>

      {/* ── TEMPLATE PICKER MODAL ── */}
      {showTemplatePicker && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 backdrop-blur-sm no-print">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Choose a Template</h2>
                <p className="text-slate-500 text-sm mt-1">Select a professional design for your CV</p>
              </div>
              <button onClick={() => setShowTemplatePicker(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><X size={22} /></button>
            </div>
            <div className="overflow-y-auto p-6 grid grid-cols-3 gap-6">
              {ALL_TEMPLATES.map((tpl) => {
                const isSelected = selectedTemplate.id === tpl.id;
                return (
                  <div key={tpl.id}
                    onClick={() => { setSelectedTemplate(tpl); setSelectedColor(templateColors.find(c=>c.color===tpl.defaultColor)||templateColors[0]); setShowTemplatePicker(false); }}
                    className={`cursor-pointer rounded-2xl overflow-hidden border-3 transition-all hover:shadow-xl hover:-translate-y-1 ${isSelected ? 'border-primary ring-4 ring-primary/20 shadow-lg' : 'border-transparent'}`}
                    style={{ border: isSelected ? `3px solid ${tpl.defaultColor}` : '3px solid transparent' }}>
                    {/* Mini preview */}
                    <div className="h-52 overflow-hidden bg-slate-50 relative">
                      <div style={{ transform: 'scale(0.35)', transformOrigin: 'top left', width: '285%', pointerEvents: 'none' }}>
                        <tpl.component data={cvData} color={tpl.defaultColor} />
                      </div>
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <span className="bg-white text-slate-800 font-bold px-4 py-2 rounded-full text-sm shadow-md">✓ Selected</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-white border-t border-slate-100">
                      <div className="font-bold text-slate-800 text-sm">{tpl.name}</div>
                      <div className="text-xs text-slate-400">{tpl.category}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── LEFT SIDEBAR ── */}
      <div className="hidden md:flex flex-col w-60 bg-white border-r border-slate-200 shadow-sm z-20 no-print">
        <div className="h-16 flex items-center px-5 border-b border-slate-100" style={{ backgroundColor: activeColor }}>
          <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
            CV Maker
          </Link>
        </div>
        <div className="px-4 py-4 border-b border-slate-100">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Progress</span>
            <span className="font-bold" style={{ color: activeColor }}>{Math.round(((activeSection + 1) / sections.length) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((activeSection + 1) / sections.length) * 100}%`, backgroundColor: activeColor }}></div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {sections.map((sec, i) => {
            const Icon = sec.icon;
            const isActive = i === activeSection;
            const isDone = i < activeSection;
            return (
              <button key={sec.id} onClick={() => setActiveSection(i)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-sm font-medium transition-all text-left ${isActive ? 'text-white shadow-md' : isDone ? 'text-slate-600 bg-slate-50' : 'text-slate-400 hover:bg-slate-50'}`}
                style={isActive ? { backgroundColor: activeColor } : {}}>
                <Icon size={17} />
                <span>{sec.label}</span>
                {isDone && <span className="ml-auto text-emerald-500 text-xs font-bold">✓</span>}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-slate-100 space-y-2">
          {/* Template selector */}
          <button onClick={() => setShowTemplatePicker(true)}
            className="w-full flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-800 py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200">
            <LayoutTemplate size={16} style={{ color: activeColor }} />
            <span className="flex-1 text-left truncate">{selectedTemplate.name}</span>
          </button>
          {/* Color picker */}
          <button onClick={() => setShowColorPicker(v => !v)}
            className="w-full flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-800 py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors">
            <Palette size={16} style={{ color: activeColor }} /> Color Theme
          </button>
          {showColorPicker && (
            <div className="flex flex-wrap gap-2 px-2 py-1">
              {templateColors.map(c => (
                <button key={c.name} onClick={() => { setSelectedColor(c); setShowColorPicker(false); }}
                  className={`w-7 h-7 rounded-full border-4 transition-transform hover:scale-110 ${selectedColor.name === c.name ? 'border-slate-400 scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c.color }} title={c.name} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── CENTER FORM ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-white border-r border-slate-200 no-print">
        <div className="h-16 border-b border-slate-100 flex items-center px-8 shrink-0" style={{ background: `linear-gradient(135deg, ${activeLight}, white)` }}>
          <div className="flex items-center gap-3">
            {(() => { const Icon = sections[activeSection].icon; return <Icon size={22} style={{ color: activeColor }} />; })()}
            <h2 className="text-xl font-bold text-slate-800">{sections[activeSection].label}</h2>
          </div>
          <span className="ml-auto text-sm text-slate-400 font-medium">{activeSection + 1} / {sections.length}</span>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="max-w-xl mx-auto space-y-5">

            {/* PERSONAL */}
            {activeSection === 0 && (<>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="First Name *" value={personal.firstName} onChange={v => updatePersonal('firstName', v)} placeholder="Ali" />
                <InputField label="Last Name *" value={personal.lastName} onChange={v => updatePersonal('lastName', v)} placeholder="Khan" />
              </div>
              <InputField label="Wanted Job Title" value={personal.jobTitle} onChange={v => updatePersonal('jobTitle', v)} placeholder="e.g. Software Engineer" />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Email" value={personal.email} onChange={v => updatePersonal('email', v)} placeholder="ali@email.com" type="email" />
                <InputField label="Phone" value={personal.phone} onChange={v => updatePersonal('phone', v)} placeholder="0300 1234567" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="City / Location" value={personal.city} onChange={v => updatePersonal('city', v)} placeholder="Lahore, Pakistan" />
                <InputField label="LinkedIn" value={personal.linkedin} onChange={v => updatePersonal('linkedin', v)} placeholder="linkedin.com/in/ali" />
              </div>
            </>)}

            {/* PROFILE */}
            {activeSection === 1 && (<>
              <div className="p-4 rounded-xl border text-sm font-medium" style={{ backgroundColor: activeLight, color: activeColor, borderColor: activeColor + '40' }}>
                💡 Write 2-4 sentences about your professional background, key skills, and what you bring to the table.
              </div>
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <label className="text-sm font-semibold text-slate-600">Professional Summary</label>
                  <button onClick={generateProfileWithAI} disabled={isGeneratingProfile}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors border border-blue-200">
                    {isGeneratingProfile ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    {isGeneratingProfile ? 'Generating...' : 'AI Generate'}
                  </button>
                </div>
                <textarea value={profile} onChange={e => setProfile(e.target.value)} rows={7}
                  className={inputStyle + ' resize-none'}
                  placeholder="e.g. Motivated software engineer with 3+ years of experience building scalable web applications. Passionate about clean code and delivering impactful user experiences." />
                <div className="text-xs text-slate-400 mt-1 text-right">{profile.length} characters</div>
              </div>
            </>)}

            {/* EXPERIENCE */}
            {activeSection === 2 && (<>
              {experiences.map((exp, i) => (
                <div key={i} className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-700 text-sm">Position {i + 1}</h3>
                    {experiences.length > 1 && (
                      <button onClick={() => removeExp(i)} className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors"><Trash2 size={16}/></button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Job Title / Position" value={exp.position} onChange={v => updateExp(i, 'position', v)} placeholder="Software Engineer" />
                    <InputField label="Company Name" value={exp.company} onChange={v => updateExp(i, 'company', v)} placeholder="Tech Corp" />
                  </div>
                  <InputField label="Duration" value={exp.dates} onChange={v => updateExp(i, 'dates', v)} placeholder="Jan 2022 – Present" />
                  <div>
                    <div className="flex justify-between items-end mb-1.5">
                      <label className="text-sm font-semibold text-slate-600">Responsibilities & Achievements</label>
                      <button onClick={() => generateExpWithAI(i, exp)} disabled={generatingExpId === i}
                        className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors border border-blue-200">
                        {generatingExpId === i ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                        {generatingExpId === i ? 'Writing...' : 'AI Enhance'}
                      </button>
                    </div>
                    <textarea value={exp.desc} onChange={e => updateExp(i, 'desc', e.target.value)} rows={4}
                      className={inputStyle + ' resize-none'}
                      placeholder={`• Led a team of 5 developers\n• Increased system performance by 40%\n• Integrated payment gateway`} />
                  </div>
                </div>
              ))}
              <button onClick={addExp} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-400 text-slate-500 hover:text-blue-600 font-semibold transition-all text-sm">
                <Plus size={18} /> Add Another Position
              </button>
            </>)}

            {/* EDUCATION */}
            {activeSection === 3 && (<>
              <div className="p-4 rounded-xl border text-sm font-medium" style={{ backgroundColor: activeLight, color: activeColor, borderColor: activeColor + '40' }}>
                ✅ Toggle the education levels you have completed.
              </div>
              {eduLevels.map((lvl) => {
                const edu = education[lvl.key];
                return (
                  <div key={lvl.key} className={`border-2 rounded-2xl overflow-hidden transition-all ${edu.enabled ? 'border-slate-200 shadow-sm' : 'border-dashed border-slate-200'}`}>
                    <button onClick={() => toggleEdu(lvl.key)} className={`w-full flex items-center justify-between px-5 py-4 text-left ${edu.enabled ? 'bg-white' : 'bg-slate-50 hover:bg-slate-100'}`}>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">{lvl.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{lvl.grade}</div>
                      </div>
                      <div className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${edu.enabled ? 'justify-end' : 'justify-start bg-slate-200'}`}
                        style={edu.enabled ? { backgroundColor: activeColor } : {}}>
                        <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                      </div>
                    </button>
                    {edu.enabled && (
                      <div className="px-5 pb-5 pt-2 space-y-4 bg-white border-t border-slate-100">
                        <InputField label="School / Institute / University" value={edu.school} onChange={v => updateEdu(lvl.key, 'school', v)} placeholder={lvl.placeholder} />
                        {(lvl.key === 'matric' || lvl.key === 'inter') && (<>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className={labelStyle}>Grade / Marks / GPA</label>
                              <input value={edu.grade} onChange={e => updateEdu(lvl.key, 'grade', e.target.value)} className={inputStyle} placeholder="e.g. A+ / 85% / 9.2 GPA" />
                            </div>
                            <div>
                              <label className={labelStyle}>Year of Passing</label>
                              <input value={edu.year} onChange={e => updateEdu(lvl.key, 'year', e.target.value)} className={inputStyle} placeholder="e.g. 2019" />
                            </div>
                          </div>
                          <div>
                            <label className={labelStyle}>Subjects / Group (Optional)</label>
                            <input value={edu.subjects} onChange={e => updateEdu(lvl.key, 'subjects', e.target.value)} className={inputStyle} placeholder="e.g. Science Group / Pre-Medical" />
                          </div>
                        </>)}
                        {(lvl.key === 'bachelor' || lvl.key === 'master') && (<>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className={labelStyle}>Degree Title</label>
                              <input value={edu.degree} onChange={e => updateEdu(lvl.key, 'degree', e.target.value)} className={inputStyle} placeholder={lvl.key === 'bachelor' ? 'BS Computer Science' : 'MS Data Science'} />
                            </div>
                            <div>
                              <label className={labelStyle}>Years</label>
                              <input value={edu.year} onChange={e => updateEdu(lvl.key, 'year', e.target.value)} className={inputStyle} placeholder="2020 – 2024" />
                            </div>
                          </div>
                          <div>
                            <label className={labelStyle}>GPA / Grade (Optional)</label>
                            <input value={edu.gpa} onChange={e => updateEdu(lvl.key, 'gpa', e.target.value)} className={inputStyle} placeholder="e.g. 3.8 / 4.0" />
                          </div>
                        </>)}
                        {lvl.key === 'phd' && (<>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className={labelStyle}>Field of Study</label>
                              <input value={edu.degree} onChange={e => updateEdu(lvl.key, 'degree', e.target.value)} className={inputStyle} placeholder="e.g. PhD Computer Science" />
                            </div>
                            <div>
                              <label className={labelStyle}>Years</label>
                              <input value={edu.year} onChange={e => updateEdu(lvl.key, 'year', e.target.value)} className={inputStyle} placeholder="2020 – 2024" />
                            </div>
                          </div>
                          <div>
                            <label className={labelStyle}>Thesis Title (Optional)</label>
                            <input value={edu.thesis} onChange={e => updateEdu(lvl.key, 'thesis', e.target.value)} className={inputStyle} placeholder="e.g. Deep Learning for Medical Imaging" />
                          </div>
                        </>)}
                      </div>
                    )}
                  </div>
                );
              })}
            </>)}

            {/* SKILLS */}
            {activeSection === 4 && (<>
              <div className="p-4 rounded-xl border text-sm font-medium" style={{ backgroundColor: activeLight, color: activeColor, borderColor: activeColor + '40' }}>
                💡 Separate skills with commas. Add 5-10 relevant skills.
              </div>
              <div>
                <label className={labelStyle}>Technical & Professional Skills</label>
                <textarea value={skills} onChange={e => setSkills(e.target.value)} rows={4} className={inputStyle + ' resize-none'}
                  placeholder="e.g. JavaScript, React, Node.js, Python, SQL, Photoshop, Teamwork, Leadership" />
              </div>
              {skills && (
                <div>
                  <div className="text-xs font-semibold text-slate-500 mb-2 mt-1">Preview:</div>
                  <div className="flex flex-wrap gap-2">
                    {skills.split(',').map((s,i) => s.trim() && (
                      <span key={i} className="px-3 py-1.5 rounded-full text-white text-sm font-medium" style={{ backgroundColor: activeColor }}>{s.trim()}</span>
                    ))}
                  </div>
                </div>
              )}
            </>)}

            {/* LANGUAGES */}
            {activeSection === 5 && (<>
              {languages.map((l, i) => (
                <div key={i} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className={labelStyle}>Language</label>
                    <input value={l.lang} onChange={e => updateLang(i, 'lang', e.target.value)} className={inputStyle} placeholder="e.g. English, Urdu, Arabic" />
                  </div>
                  <div className="w-36">
                    <label className={labelStyle}>Level</label>
                    <select value={l.level} onChange={e => updateLang(i, 'level', e.target.value)} className={inputStyle + ' cursor-pointer'}>
                      {['Native','Fluent','Advanced','Intermediate','Basic'].map(lv => <option key={lv}>{lv}</option>)}
                    </select>
                  </div>
                  {languages.length > 1 && <button onClick={() => removeLang(i)} className="text-red-400 hover:text-red-600 mb-1 p-2"><Trash2 size={16}/></button>}
                </div>
              ))}
              <button onClick={addLang} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-400 text-slate-500 hover:text-blue-600 font-semibold transition-all text-sm">
                <Plus size={18} /> Add Language
              </button>
            </>)}

            {/* COURSES */}
            {activeSection === 6 && (
              <div>
                <label className={labelStyle}>Courses & Certifications</label>
                <textarea value={courses} onChange={e => setCourses(e.target.value)} rows={5} className={inputStyle + ' resize-none'}
                  placeholder={`e.g. AWS Certified Solutions Architect – Amazon (2023)\nGoogle Data Analytics Certificate – Coursera (2023)\nReact Developer Certification – Udemy (2022)`} />
              </div>
            )}

            {/* HOBBIES & FINAL STEP */}
            {activeSection === 7 && (<>
              <div>
                <label className={labelStyle}>Hobbies & Interests</label>
                <textarea value={hobbies} onChange={e => setHobbies(e.target.value)} rows={3} className={inputStyle + ' resize-none'}
                  placeholder="e.g. Photography, Hiking, Open Source, Reading Tech Blogs" />
              </div>
              <div className="mt-4 p-6 rounded-2xl text-center border-2 border-dashed" style={{ borderColor: activeColor + '50', backgroundColor: activeLight }}>
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Your CV is almost ready!</h3>
                <p className="text-sm text-slate-500 mb-5">Download the PDF, or generate AI extras (Job Request, Interview Intro) via your n8n workflow.</p>
                
                <div className="flex flex-col gap-3 max-w-sm mx-auto">
                  <button onClick={handleDownload} className="w-full py-3 rounded-xl text-white font-bold shadow-md hover:opacity-90 transition-opacity flex justify-center items-center gap-2" style={{ backgroundColor: activeColor }}>
                    <Download size={16} /> Download PDF
                  </button>
                  
                  <button onClick={generateFullN8n} disabled={isGeneratingFull} className="w-full py-3 rounded-xl font-bold border-2 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed" style={{ borderColor: activeColor, color: activeColor, backgroundColor: 'white' }}>
                    {isGeneratingFull ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} 
                    {isGeneratingFull ? 'Generating via n8n...' : 'Generate AI Extras with n8n'}
                  </button>
                </div>
              </div>

              {aiOutput && (
                <div className="mt-6 p-5 rounded-xl bg-slate-800 text-white shadow-lg border-l-4 border-emerald-500 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
                  <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2"><Sparkles size={18}/> N8n Workflow Generated</h3>
                  
                  <details className="mb-4">
                    <summary className="text-xs text-slate-400 cursor-pointer">Debug: View Raw N8n Output</summary>
                    <pre className="text-[10px] bg-black text-emerald-400 p-2 mt-2 overflow-auto max-h-40 rounded">
                      {JSON.stringify(aiOutput, null, 2)}
                    </pre>
                  </details>

                  {(aiOutput.messages?.job_request || aiOutput.job_request_message) && (
                    <div className="mb-4">
                      <div className="text-xs text-slate-400 font-bold uppercase mb-1">Job Request Message</div>
                      <p className="text-sm text-slate-200 leading-relaxed bg-slate-900 p-3 rounded-lg">{aiOutput.messages?.job_request || aiOutput.job_request_message}</p>
                    </div>
                  )}
                  {(aiOutput.messages?.interview_intro || aiOutput.interview_intro) && (
                    <div className="mb-4">
                      <div className="text-xs text-slate-400 font-bold uppercase mb-1">Interview Intro</div>
                      <p className="text-sm text-slate-200 leading-relaxed bg-slate-900 p-3 rounded-lg">{aiOutput.messages?.interview_intro || aiOutput.interview_intro}</p>
                    </div>
                  )}
                  {(aiOutput.messages?.salary_negotiation || aiOutput.salary_negotiation_message) && (
                    <div className="mb-2">
                      <div className="text-xs text-slate-400 font-bold uppercase mb-1">Salary Negotiation</div>
                      <p className="text-sm text-slate-200 leading-relaxed bg-slate-900 p-3 rounded-lg">{aiOutput.messages?.salary_negotiation || aiOutput.salary_negotiation_message}</p>
                    </div>
                  )}
                  {aiOutput.cv_html && (
                    <button onClick={openN8nHtmlCv} className="mt-2 w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2">
                      <LayoutTemplate size={16} /> Open N8n Generated HTML CV
                    </button>
                  )}
                </div>
              )}
            </>)}
          </div>
        </div>

        {/* NAV FOOTER */}
        <div className="h-20 border-t border-slate-100 flex items-center justify-between px-8 bg-white shrink-0 no-print">
          <button onClick={goPrev} disabled={activeSection === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeSection === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
            <ChevronLeft size={18} /> Previous
          </button>
          <div className="flex items-center gap-1.5">
            {sections.map((_, i) => (
              <button key={i} onClick={() => setActiveSection(i)} className="rounded-full transition-all"
                style={i === activeSection ? { width:24, height:10, backgroundColor:activeColor } : { width:10, height:10, backgroundColor: i < activeSection ? activeColor+'60' : '#e2e8f0' }} />
            ))}
          </div>
          {activeSection < sections.length - 1 ? (
            <button onClick={goNext} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ backgroundColor: activeColor }}>
              Next <ChevronRight size={18} />
            </button>
          ) : (
            <button onClick={handleDownload} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:opacity-90 transition-all" style={{ backgroundColor: '#059669' }}>
              <Download size={16} /> Download PDF
            </button>
          )}
        </div>
      </div>

      {/* ── RIGHT LIVE PREVIEW ── */}
      <div className="hidden lg:flex flex-col w-[44%] bg-slate-300 print:w-full print:bg-white">
        <div className="h-16 flex items-center justify-between px-5 shrink-0 bg-slate-200 border-b border-slate-300 no-print">
          <button onClick={() => setShowTemplatePicker(true)}
            className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-primary transition-colors bg-white border border-slate-200 px-4 py-2 rounded-lg hover:border-blue-400 shadow-sm">
            <LayoutTemplate size={16} style={{ color: activeColor }} /> {selectedTemplate.name}
          </button>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm">Save</button>
            <button onClick={handleDownload} className="px-4 py-2 text-sm font-bold text-white rounded-lg shadow-md hover:opacity-90 flex items-center gap-1.5 transition-all" style={{ backgroundColor: activeColor }}>
              <Download size={14} /> PDF
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center items-start print:p-0 print:overflow-visible">
          <div ref={componentRef} id="cv-print-area" className="bg-white shadow-2xl origin-top print:!transform-none print:!m-0 print:!shadow-none"
            style={{ width: '210mm', minHeight: '297mm', transform: 'scale(0.60)', transformOrigin: 'top center', marginBottom: '-42%' }}>
            <ActiveCVTemplate data={cvData} color={activeColor} />
          </div>
        </div>
      </div>
    </div>
  );
}
