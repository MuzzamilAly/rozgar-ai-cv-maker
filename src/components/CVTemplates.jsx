import React from 'react';

// ─────────────────────────────────────────
// TEMPLATE 1: Classic Sidebar (White/Gray)
// ─────────────────────────────────────────
export function Template1({ data, color = '#2563EB' }) {
  const { personal = {}, profile = '', experiences = [], education = {}, skills = '', languages = [], hobbies = '', courses = '' } = data;
  const enabledEdu = ['phd','master','bachelor','inter','matric'].filter(k => education[k]?.enabled);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', width: '100%', minHeight: '297mm', display: 'flex', fontSize: 11 }}>
      {/* Left Sidebar */}
      <div style={{ width: '35%', backgroundColor: '#f5f5f5', padding: '28px 20px', borderRight: '1px solid #e0e0e0', flexShrink: 0 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: '#fff', fontSize: 28, fontWeight: 900, overflow: 'hidden' }}>
            {personal.photo ? <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (personal.firstName?.[0]?.toUpperCase() || '?')}
          </div>
        </div>
        <Section title="PERSONAL DETAILS" color={color}>
          {personal.email && <SideItem label="Email" value={personal.email} />}
          {personal.phone && <SideItem label="Phone" value={personal.phone} />}
          {personal.city && <SideItem label="Location" value={personal.city} />}
          {personal.linkedin && <SideItem label="LinkedIn" value={personal.linkedin} />}
        </Section>
        {skills && (
          <Section title="SKILLS" color={color}>
            {skills.split(',').filter(s=>s.trim()).map((s,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:5 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', backgroundColor:color, flexShrink:0 }}></div>
                <span style={{ color:'#444', fontSize:10 }}>{s.trim()}</span>
              </div>
            ))}
          </Section>
        )}
        {hobbies && (
          <Section title="INTERESTS" color={color}>
            <p style={{ color:'#555', lineHeight:1.6, fontSize:10 }}>{hobbies}</p>
          </Section>
        )}
        {languages.filter(l=>l.lang).length > 0 && (
          <Section title="LANGUAGES" color={color}>
            {languages.filter(l=>l.lang).map((l,i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                <span style={{ fontWeight:600, color:'#444', fontSize:10 }}>{l.lang}</span>
                <span style={{ color:'#888', fontSize:10 }}>{l.level}</span>
              </div>
            ))}
          </Section>
        )}
      </div>
      {/* Right Main */}
      <div style={{ flex:1, padding:'28px 24px' }}>
        <div style={{ borderBottom:`3px solid ${color}`, paddingBottom:14, marginBottom:20 }}>
          <h1 style={{ margin:0, fontSize:24, fontWeight:900, color:'#1a1a1a', letterSpacing:1 }}>
            {personal.firstName || 'FIRST'} {personal.lastName || 'LAST NAME'}
          </h1>
          <p style={{ margin:'4px 0 0', color:color, fontWeight:600, fontSize:13 }}>{personal.jobTitle || 'Job Title'}</p>
        </div>
        {profile && (
          <MainSection title="PROFILE" color={color}>
            <p style={{ color:'#555', lineHeight:1.7, fontSize:10 }}>{profile}</p>
          </MainSection>
        )}
        {experiences.filter(e=>e.position||e.company).length > 0 && (
          <MainSection title="WORK EXPERIENCE" color={color}>
            {experiences.filter(e=>e.position||e.company).map((exp,i) => (
              <ExpBlock key={i} exp={exp} color={color} />
            ))}
          </MainSection>
        )}
        {enabledEdu.length > 0 && (
          <MainSection title="EDUCATION AND QUALIFICATIONS" color={color}>
            {enabledEdu.map(k => <EduBlock key={k} level={k} edu={education[k]} color={color} />)}
          </MainSection>
        )}
        {courses && (
          <MainSection title="COURSES" color={color}>
            <p style={{ color:'#555', lineHeight:1.7, fontSize:10, whiteSpace:'pre-line' }}>{courses}</p>
          </MainSection>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// TEMPLATE 2: Modern Photo Left + Table
// ─────────────────────────────────────────
export function Template2({ data, color = '#7C3AED' }) {
  const { personal = {}, profile = '', experiences = [], education = {}, skills = '', languages = [], courses = '' } = data;
  const enabledEdu = ['phd','master','bachelor','inter','matric'].filter(k => education[k]?.enabled);

  return (
    <div style={{ fontFamily: 'Georgia, serif', width: '100%', minHeight: '297mm', padding: '32px 36px', backgroundColor: '#fff', fontSize: 11 }}>
      {/* Header */}
      <div style={{ display:'flex', gap:24, alignItems:'center', marginBottom:24, paddingBottom:20, borderBottom:`2px solid ${color}` }}>
        <div style={{ width:90, height:90, borderRadius:'50%', backgroundColor: color, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:36, fontWeight:900, flexShrink:0, overflow: 'hidden' }}>
          {personal.photo ? <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (personal.firstName?.[0]?.toUpperCase() || '?')}
        </div>
        <div>
          <h1 style={{ margin:0, fontSize:26, fontWeight:900, color:'#1a1a1a' }}>{personal.firstName || 'First'} {personal.lastName || 'Last Name'}</h1>
          <p style={{ margin:'4px 0 0', color:color, fontWeight:700, fontSize:14 }}>{personal.jobTitle || 'Job Title'}</p>
        </div>
      </div>
      {profile && <p style={{ color:'#555', lineHeight:1.8, marginBottom:20, fontSize:10.5, fontStyle:'italic' }}>{profile}</p>}
      
      {/* Contact Table */}
      <div style={{ backgroundColor:'#f9f9f9', border:`1px solid #eee`, borderRadius:6, padding:'12px 16px', marginBottom:22 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px 24px' }}>
          {personal.email && <TableRow label="Email" value={personal.email} />}
          {personal.phone && <TableRow label="Phone" value={personal.phone} />}
          {personal.city && <TableRow label="Location" value={personal.city} />}
          {personal.linkedin && <TableRow label="LinkedIn" value={personal.linkedin} />}
        </div>
      </div>

      <MainSection title="PERSONAL DETAILS" color={color} serif>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px 24px' }}>
          {personal.email && <TableRow label="Email address" value={personal.email} />}
          {personal.phone && <TableRow label="Mobile number" value={personal.phone} />}
          {personal.city && <TableRow label="Address" value={personal.city} />}
        </div>
      </MainSection>

      {experiences.filter(e=>e.position||e.company).length > 0 && (
        <MainSection title="WORK EXPERIENCE" color={color} serif>
          {experiences.filter(e=>e.position||e.company).map((exp,i) => <ExpBlock key={i} exp={exp} color={color} />)}
        </MainSection>
      )}
      {enabledEdu.length > 0 && (
        <MainSection title="EDUCATION AND QUALIFICATIONS" color={color} serif>
          {enabledEdu.map(k => <EduBlock key={k} level={k} edu={education[k]} color={color} />)}
        </MainSection>
      )}
      {skills && (
        <MainSection title="SKILLS" color={color} serif>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {skills.split(',').filter(s=>s.trim()).map((s,i) => (
              <span key={i} style={{ backgroundColor:color+'18', color:color, padding:'3px 10px', borderRadius:12, fontSize:10, fontWeight:600 }}>{s.trim()}</span>
            ))}
          </div>
        </MainSection>
      )}
      {courses && (
        <MainSection title="CERTIFICATIONS" color={color} serif>
          <p style={{ color:'#555', lineHeight:1.7, fontSize:10, whiteSpace:'pre-line' }}>{courses}</p>
        </MainSection>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// TEMPLATE 3: Dark Navy Header + Two Column
// ─────────────────────────────────────────
export function Template3({ data, color = '#1e3a8a' }) {
  const { personal = {}, profile = '', experiences = [], education = {}, skills = '', languages = [], courses = '', hobbies = '' } = data;
  const enabledEdu = ['phd','master','bachelor','inter','matric'].filter(k => education[k]?.enabled);

  return (
    <div style={{ fontFamily: 'Calibri, Arial, sans-serif', width: '100%', minHeight: '297mm', fontSize: 11 }}>
      {/* Dark Header */}
      <div style={{ backgroundColor: color, padding: '28px 32px', color: '#fff' }}>
        <h1 style={{ margin:0, fontSize:28, fontWeight:900, letterSpacing:2, textTransform:'uppercase' }}>
          {personal.firstName || 'FIRST'} {personal.lastName || 'LAST NAME'}
        </h1>
        <p style={{ margin:'6px 0 0', color:'rgba(255,255,255,0.7)', fontWeight:600, fontSize:13, textTransform:'uppercase', letterSpacing:1 }}>
          {personal.jobTitle || 'Job Title'}
        </p>
        <div style={{ display:'flex', gap:20, marginTop:10, flexWrap:'wrap' }}>
          {personal.email && <span style={{ color:'rgba(255,255,255,0.7)', fontSize:10 }}>✉ {personal.email}</span>}
          {personal.phone && <span style={{ color:'rgba(255,255,255,0.7)', fontSize:10 }}>📞 {personal.phone}</span>}
          {personal.city && <span style={{ color:'rgba(255,255,255,0.7)', fontSize:10 }}>📍 {personal.city}</span>}
          {personal.linkedin && <span style={{ color:'rgba(255,255,255,0.7)', fontSize:10 }}>🔗 {personal.linkedin}</span>}
        </div>
      </div>

      <div style={{ display:'flex' }}>
        {/* Left */}
        <div style={{ width:'38%', borderRight:`3px solid ${color}`, padding:'22px 18px', backgroundColor:'#fafafa', flexShrink:0 }}>
          <Section title="PERSONAL DETAILS" color={color} compact>
            {personal.email && <SideItem label="Email" value={personal.email} />}
            {personal.phone && <SideItem label="Phone" value={personal.phone} />}
            {personal.city && <SideItem label="Location" value={personal.city} />}
          </Section>
          {languages.filter(l=>l.lang).length > 0 && (
            <Section title="LANGUAGES" color={color} compact>
              {languages.filter(l=>l.lang).map((l,i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', marginBottom:6, alignItems:'center' }}>
                  <span style={{ fontWeight:600, fontSize:10, color:'#333' }}>{l.lang}</span>
                  <div style={{ display:'flex', gap:2 }}>
                    {['Native','Fluent','Advanced','Intermediate','Basic'].slice(0, 5-['Native','Fluent','Advanced','Intermediate','Basic'].indexOf(l.level)).map((_,di) => (
                      <div key={di} style={{ width:8, height:8, borderRadius:2, backgroundColor:color }}></div>
                    ))}
                    {[...Array(Math.max(0, ['Native','Fluent','Advanced','Intermediate','Basic'].indexOf(l.level)))].map((_,di) => (
                      <div key={'e'+di} style={{ width:8, height:8, borderRadius:2, backgroundColor:'#e0e0e0' }}></div>
                    ))}
                  </div>
                </div>
              ))}
            </Section>
          )}
          {hobbies && <Section title="INTERESTS" color={color} compact><p style={{ fontSize:10, color:'#555', lineHeight:1.6 }}>{hobbies}</p></Section>}
          {enabledEdu.length > 0 && (
            <Section title="EDUCATION" color={color} compact>
              {enabledEdu.map(k => <EduBlockCompact key={k} level={k} edu={education[k]} color={color} />)}
            </Section>
          )}
          {skills && (
            <Section title="SKILLS" color={color} compact>
              {skills.split(',').filter(s=>s.trim()).map((s,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:5 }}>
                  <div style={{ width:5, height:5, borderRadius:'50%', backgroundColor:color }}></div>
                  <span style={{ fontSize:10, color:'#444' }}>{s.trim()}</span>
                </div>
              ))}
            </Section>
          )}
        </div>
        {/* Right */}
        <div style={{ flex:1, padding:'22px 22px' }}>
          {profile && <MainSection title="PROFILE" color={color}><p style={{ color:'#555', lineHeight:1.8, fontSize:10 }}>{profile}</p></MainSection>}
          {experiences.filter(e=>e.position||e.company).length > 0 && (
            <MainSection title="WORK EXPERIENCE" color={color}>
              {experiences.filter(e=>e.position||e.company).map((exp,i) => <ExpBlock key={i} exp={exp} color={color} />)}
            </MainSection>
          )}
          {courses && <MainSection title="CERTIFICATIONS" color={color}><p style={{ color:'#555', fontSize:10, lineHeight:1.7, whiteSpace:'pre-line' }}>{courses}</p></MainSection>}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// TEMPLATE 4: Clean Minimal One-Column
// ─────────────────────────────────────────
export function Template4({ data, color = '#059669' }) {
  const { personal = {}, profile = '', experiences = [], education = {}, skills = '', languages = [], courses = '', hobbies = '' } = data;
  const enabledEdu = ['phd','master','bachelor','inter','matric'].filter(k => education[k]?.enabled);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', width: '100%', minHeight: '297mm', padding: '36px 40px', fontSize: 11 }}>
      {/* Header */}
      <div style={{ textAlign:'center', borderBottom:`2px solid ${color}`, paddingBottom:16, marginBottom:20 }}>
        <h1 style={{ margin:0, fontSize:26, fontWeight:900, color:'#1a1a1a', letterSpacing:3, textTransform:'uppercase' }}>
          {personal.firstName || 'JOHN'} {personal.lastName || 'WILLIAMS'}
        </h1>
        <p style={{ margin:'6px 0 0', color:color, fontSize:12, fontWeight:600 }}>{personal.jobTitle || 'Job Title'}</p>
        <div style={{ display:'flex', justifyContent:'center', gap:16, marginTop:8, flexWrap:'wrap' }}>
          {personal.phone && <span style={{ color:'#666', fontSize:10 }}>📞 {personal.phone}</span>}
          {personal.email && <span style={{ color:'#666', fontSize:10 }}>✉ {personal.email}</span>}
          {personal.city && <span style={{ color:'#666', fontSize:10 }}>📍 {personal.city}</span>}
          {personal.linkedin && <span style={{ color:'#666', fontSize:10 }}>🔗 {personal.linkedin}</span>}
        </div>
      </div>
      {profile && <MainSection title="PROFILE" color={color}><p style={{ color:'#555', lineHeight:1.8, fontSize:10.5 }}>{profile}</p></MainSection>}
      {experiences.filter(e=>e.position||e.company).length > 0 && (
        <MainSection title="WORK EXPERIENCE" color={color}>
          {experiences.filter(e=>e.position||e.company).map((exp,i) => <ExpBlock key={i} exp={exp} color={color} />)}
        </MainSection>
      )}
      {enabledEdu.length > 0 && (
        <MainSection title="EDUCATION" color={color}>
          {enabledEdu.map(k => <EduBlock key={k} level={k} edu={education[k]} color={color} />)}
        </MainSection>
      )}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        {skills && (
          <div>
            <h3 style={{ textTransform:'uppercase', fontSize:10, fontWeight:900, color:color, letterSpacing:2, borderBottom:`1px solid ${color}`, paddingBottom:4, marginBottom:10 }}>Skills</h3>
            {skills.split(',').filter(s=>s.trim()).map((s,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:5 }}>
                <div style={{ width:5, height:5, borderRadius:'50%', backgroundColor:color }}></div>
                <span style={{ fontSize:10, color:'#444' }}>{s.trim()}</span>
              </div>
            ))}
          </div>
        )}
        {languages.filter(l=>l.lang).length > 0 && (
          <div>
            <h3 style={{ textTransform:'uppercase', fontSize:10, fontWeight:900, color:color, letterSpacing:2, borderBottom:`1px solid ${color}`, paddingBottom:4, marginBottom:10 }}>Languages</h3>
            {languages.filter(l=>l.lang).map((l,i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                <span style={{ fontSize:10, fontWeight:600, color:'#444' }}>{l.lang}</span>
                <span style={{ fontSize:10, color:'#888' }}>{l.level}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {hobbies && <MainSection title="HOBBIES" color={color}><p style={{ fontSize:10, color:'#555' }}>{hobbies}</p></MainSection>}
    </div>
  );
}

// ─────────────────────────────────────────
// TEMPLATE 5: Warm Beige with Round Photo
// ─────────────────────────────────────────
export function Template5({ data, color = '#DC2626' }) {
  const { personal = {}, profile = '', experiences = [], education = {}, skills = '', languages = [], courses = '' } = data;
  const enabledEdu = ['phd','master','bachelor','inter','matric'].filter(k => education[k]?.enabled);

  return (
    <div style={{ fontFamily: 'Georgia, serif', width: '100%', minHeight: '297mm', fontSize: 11 }}>
      {/* Warm header */}
      <div style={{ backgroundColor: '#fdf6ec', borderBottom:`3px solid ${color}`, padding:'24px 32px', display:'flex', gap:24, alignItems:'flex-start' }}>
        <div style={{ width:90, height:90, borderRadius:'50%', backgroundColor:color, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:34, fontWeight:900, border:`4px solid #fff`, boxShadow:'0 2px 12px rgba(0,0,0,0.15)', flexShrink:0, overflow: 'hidden' }}>
          {personal.photo ? <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (personal.firstName?.[0]?.toUpperCase() || '?')}
        </div>
        <div style={{ flex:1 }}>
          <h1 style={{ margin:0, fontSize:24, fontWeight:900, color:'#1a1a1a' }}>{personal.firstName || 'Amelia'} {personal.lastName || 'Davis'}</h1>
          <p style={{ margin:'4px 0 10px', color:color, fontWeight:700, fontSize:13 }}>{personal.jobTitle || 'Job Title'}</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3px 20px' }}>
            {personal.email && <TableRow label="Email" value={personal.email} small />}
            {personal.phone && <TableRow label="Phone" value={personal.phone} small />}
            {personal.city && <TableRow label="Location" value={personal.city} small />}
            {personal.linkedin && <TableRow label="LinkedIn" value={personal.linkedin} small />}
          </div>
        </div>
      </div>
      {/* Body */}
      <div style={{ padding:'24px 32px' }}>
        {profile && <MainSection title="PERSONAL DETAILS" color={color}><p style={{ color:'#555', lineHeight:1.8, fontSize:10.5, fontStyle:'italic' }}>{profile}</p></MainSection>}
        {experiences.filter(e=>e.position||e.company).length > 0 && (
          <MainSection title="WORK EXPERIENCE" color={color}>
            {experiences.filter(e=>e.position||e.company).map((exp,i) => <ExpBlock key={i} exp={exp} color={color} />)}
          </MainSection>
        )}
        {enabledEdu.length > 0 && (
          <MainSection title="EDUCATION AND QUALIFICATIONS" color={color}>
            {enabledEdu.map(k => <EduBlock key={k} level={k} edu={education[k]} color={color} />)}
          </MainSection>
        )}
        {skills && (
          <MainSection title="SKILLS" color={color}>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {skills.split(',').filter(s=>s.trim()).map((s,i) => (
                <span key={i} style={{ backgroundColor:color, color:'#fff', padding:'4px 12px', borderRadius:20, fontSize:10, fontWeight:600 }}>{s.trim()}</span>
              ))}
            </div>
          </MainSection>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// TEMPLATE 6: Curriculum Vitae Header Dark
// ─────────────────────────────────────────
export function Template6({ data, color = '#0d9488' }) {
  const { personal = {}, profile = '', experiences = [], education = {}, skills = '', languages = [], courses = '', hobbies = '' } = data;
  const enabledEdu = ['phd','master','bachelor','inter','matric'].filter(k => education[k]?.enabled);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', width: '100%', minHeight: '297mm', fontSize: 11 }}>
      {/* Header */}
      <div style={{ backgroundColor:'#1a1a2e', padding:'22px 32px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <h1 style={{ margin:0, fontSize:22, fontWeight:900, color:'#fff', textTransform:'uppercase', letterSpacing:2 }}>
            {personal.firstName || 'JOHN'} {personal.lastName || 'WILLIAMS'}
          </h1>
          <p style={{ margin:'5px 0 0', color:color, fontWeight:600, fontSize:12 }}>{personal.jobTitle || 'Job Title'}</p>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:18, fontWeight:900, color:'#fff', letterSpacing:3, opacity:0.5 }}>CV</div>
          <div style={{ borderTop:`2px solid ${color}`, paddingTop:4, marginTop:4 }}>
            {personal.email && <div style={{ color:'rgba(255,255,255,0.7)', fontSize:9 }}>{personal.email}</div>}
            {personal.phone && <div style={{ color:'rgba(255,255,255,0.7)', fontSize:9 }}>{personal.phone}</div>}
            {personal.city && <div style={{ color:'rgba(255,255,255,0.7)', fontSize:9 }}>{personal.city}</div>}
          </div>
        </div>
      </div>

      <div style={{ display:'flex' }}>
        {/* Left Sidebar */}
        <div style={{ width:'35%', backgroundColor:'#f0f0f0', padding:'20px 16px', borderRight:`3px solid ${color}`, flexShrink:0 }}>
          <Section title="PERSONAL DETAILS" color={color} compact>
            {personal.email && <SideItem label="Email" value={personal.email} />}
            {personal.phone && <SideItem label="Phone" value={personal.phone} />}
            {personal.city && <SideItem label="Location" value={personal.city} />}
            {personal.linkedin && <SideItem label="LinkedIn" value={personal.linkedin} />}
          </Section>
          {enabledEdu.length > 0 && (
            <Section title="EDUCATION" color={color} compact>
              {enabledEdu.map(k => <EduBlockCompact key={k} level={k} edu={education[k]} color={color} />)}
            </Section>
          )}
          {languages.filter(l=>l.lang).length > 0 && (
            <Section title="LANGUAGES" color={color} compact>
              {languages.filter(l=>l.lang).map((l,i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                  <span style={{ fontSize:10, fontWeight:600, color:'#333' }}>{l.lang}</span>
                  <span style={{ fontSize:10, color:'#888' }}>{l.level}</span>
                </div>
              ))}
            </Section>
          )}
          {hobbies && <Section title="INTERESTS" color={color} compact><p style={{ fontSize:10, color:'#555', lineHeight:1.6 }}>{hobbies}</p></Section>}
          {courses && <Section title="COURSES" color={color} compact><p style={{ fontSize:10, color:'#555', lineHeight:1.7, whiteSpace:'pre-line' }}>{courses}</p></Section>}
          {skills && (
            <Section title="SKILLS" color={color} compact>
              {skills.split(',').filter(s=>s.trim()).map((s,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:5 }}>
                  <div style={{ width:5, height:5, borderRadius:'50%', backgroundColor:color }}></div>
                  <span style={{ fontSize:10, color:'#444' }}>{s.trim()}</span>
                </div>
              ))}
            </Section>
          )}
        </div>
        {/* Right Main */}
        <div style={{ flex:1, padding:'20px 22px' }}>
          {profile && <MainSection title="PROFILE" color={color}><p style={{ color:'#555', lineHeight:1.8, fontSize:10 }}>{profile}</p></MainSection>}
          {experiences.filter(e=>e.position||e.company).length > 0 && (
            <MainSection title="WORK EXPERIENCE" color={color}>
              {experiences.filter(e=>e.position||e.company).map((exp,i) => <ExpBlock key={i} exp={exp} color={color} />)}
            </MainSection>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════
// SHARED SUB-COMPONENTS
// ═══════════════════════════════════
function Section({ title, color, children, compact }) {
  return (
    <div style={{ marginBottom: compact ? 16 : 20 }}>
      <h3 style={{ fontSize: compact ? 9 : 10, fontWeight:900, textTransform:'uppercase', letterSpacing:2, color, borderBottom:`1.5px solid ${color}`, paddingBottom:4, marginBottom:8, margin:'0 0 8px' }}>{title}</h3>
      {children}
    </div>
  );
}
function MainSection({ title, color, children, serif }) {
  return (
    <div style={{ marginBottom:18 }}>
      <h3 style={{ fontSize:11, fontWeight:900, textTransform:'uppercase', letterSpacing:1.5, color, borderBottom:`2px solid ${color}`, paddingBottom:4, marginBottom:10, fontFamily: serif ? 'Georgia,serif' : 'inherit' }}>{title}</h3>
      {children}
    </div>
  );
}
function SideItem({ label, value }) {
  return (
    <div style={{ marginBottom:6 }}>
      <div style={{ fontSize:9, fontWeight:700, color:'#888', textTransform:'uppercase', letterSpacing:0.5 }}>{label}</div>
      <div style={{ fontSize:10, color:'#333', wordBreak:'break-word' }}>{value}</div>
    </div>
  );
}
function TableRow({ label, value, small }) {
  return (
    <div style={{ display:'flex', gap:8 }}>
      <span style={{ fontSize: small ? 9 : 10, color:'#888', fontWeight:600, minWidth:60, flexShrink:0 }}>{label}:</span>
      <span style={{ fontSize: small ? 9 : 10, color:'#333' }}>{value}</span>
    </div>
  );
}
function ExpBlock({ exp, color }) {
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div style={{ fontWeight:700, color:'#1a1a1a', fontSize:11 }}>{exp.position || '—'}</div>
        <div style={{ fontSize:9, color:'#888', flexShrink:0, marginLeft:8 }}>{exp.dates}</div>
      </div>
      <div style={{ color, fontWeight:600, fontSize:10, marginBottom:4 }}>{exp.company}</div>
      {exp.desc && <p style={{ color:'#555', lineHeight:1.7, fontSize:10, margin:0, whiteSpace:'pre-line' }}>{exp.desc}</p>}
    </div>
  );
}

const eduLabels = { matric:'Matric (SSC)', inter:'Intermediate (HSSC)', bachelor:"Bachelor's Degree", master:"Master's Degree", phd:'PhD / Doctorate' };

function EduBlock({ level, edu, color }) {
  const degreeTitle = edu.degree || eduLabels[level];
  return (
    <div style={{ marginBottom:12 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <div style={{ fontWeight:700, fontSize:11, color:'#1a1a1a' }}>{degreeTitle}{edu.subjects ? ` — ${edu.subjects}` : ''}</div>
          {edu.thesis && <div style={{ fontSize:9.5, color:'#666', fontStyle:'italic' }}>Thesis: {edu.thesis}</div>}
          <div style={{ color, fontWeight:600, fontSize:10 }}>{edu.school}</div>
          {(edu.grade || edu.gpa) && <div style={{ color:'#888', fontSize:9.5 }}>Grade/GPA: {edu.grade || edu.gpa}</div>}
        </div>
        <div style={{ fontSize:9, color:'#888', flexShrink:0, marginLeft:8 }}>{edu.year}</div>
      </div>
    </div>
  );
}
function EduBlockCompact({ level, edu, color }) {
  return (
    <div style={{ marginBottom:10 }}>
      <div style={{ fontWeight:700, fontSize:10, color:'#1a1a1a' }}>{edu.degree || eduLabels[level]}</div>
      <div style={{ fontSize:9.5, color, marginBottom:1 }}>{edu.school}</div>
      <div style={{ fontSize:9, color:'#888' }}>{edu.year}{(edu.grade||edu.gpa) ? ` · ${edu.grade||edu.gpa}` : ''}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// TEMPLATE 7: ATS-FRIENDLY — Pure single column, no graphics
// Designed to pass ALL Applicant Tracking Systems (ATS)
// ─────────────────────────────────────────────────────────
export function Template7({ data, color = '#1a1a1a' }) {
  const { personal = {}, profile = '', experiences = [], education = {}, skills = '', languages = [], courses = '', hobbies = '' } = data;
  const enabledEdu = ['phd','master','bachelor','inter','matric'].filter(k => education[k]?.enabled);
  const atsColor = '#000000'; // ATS uses pure black for max compatibility

  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', width: '100%', minHeight: '297mm', padding: '32px 40px', backgroundColor: '#ffffff', fontSize: 11, color: '#1a1a1a', lineHeight: 1.5 }}>

      {/* ── NAME & CONTACT ── */}
      <div style={{ textAlign: 'center', marginBottom: 18, borderBottom: '2px solid #000', paddingBottom: 14 }}>
        <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: '#000', textTransform: 'uppercase', letterSpacing: 2 }}>
          {personal.firstName || 'YOUR'} {personal.lastName || 'NAME'}
        </h1>
        {personal.jobTitle && (
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: '#333', textTransform: 'uppercase', letterSpacing: 1 }}>
            {personal.jobTitle}
          </p>
        )}
        {/* Contact on one line - ATS friendly */}
        <div style={{ fontSize: 10, color: '#333', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0 16px' }}>
          {personal.phone && <span>{personal.phone}</span>}
          {personal.phone && personal.email && <span>|</span>}
          {personal.email && <span>{personal.email}</span>}
          {personal.email && personal.city && <span>|</span>}
          {personal.city && <span>{personal.city}</span>}
          {personal.city && personal.linkedin && <span>|</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </div>

      {/* ── PROFESSIONAL SUMMARY ── */}
      {profile && (
        <ATSSection title="PROFESSIONAL SUMMARY">
          <p style={{ margin: 0, color: '#333', lineHeight: 1.7, fontSize: 10.5 }}>{profile}</p>
        </ATSSection>
      )}

      {/* ── WORK EXPERIENCE ── */}
      {experiences.filter(e => e.position || e.company).length > 0 && (
        <ATSSection title="WORK EXPERIENCE">
          {experiences.filter(e => e.position || e.company).map((exp, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                <div>
                  <span style={{ fontWeight: 900, fontSize: 11, color: '#000' }}>{exp.position || '—'}</span>
                  {exp.company && <span style={{ fontWeight: 700, fontSize: 11, color: '#333' }}> | {exp.company}</span>}
                </div>
                {exp.dates && <span style={{ fontSize: 10, color: '#555', flexShrink: 0, marginLeft: 8, fontWeight: 600 }}>{exp.dates}</span>}
              </div>
              {exp.desc && (
                <div style={{ paddingLeft: 0 }}>
                  {exp.desc.split('\n').filter(l => l.trim()).map((line, li) => (
                    <div key={li} style={{ display: 'flex', gap: 8, marginBottom: 3 }}>
                      <span style={{ flexShrink: 0, color: '#000', fontWeight: 700 }}>•</span>
                      <span style={{ fontSize: 10.5, color: '#333', lineHeight: 1.6 }}>{line.replace(/^[•\-]\s*/, '')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </ATSSection>
      )}

      {/* ── EDUCATION ── */}
      {enabledEdu.length > 0 && (
        <ATSSection title="EDUCATION">
          {enabledEdu.map(k => {
            const edu = education[k];
            const labels = { matric:'Matric (SSC)', inter:'Intermediate (HSSC)', bachelor:"Bachelor's Degree", master:"Master's Degree", phd:'PhD / Doctorate' };
            const title = edu.degree || labels[k];
            return (
              <div key={k} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 11, color: '#000' }}>{title}{edu.subjects ? ` — ${edu.subjects}` : ''}</div>
                    {edu.school && <div style={{ fontSize: 10.5, color: '#333', fontWeight: 600 }}>{edu.school}</div>}
                    {edu.thesis && <div style={{ fontSize: 10, color: '#555', fontStyle: 'italic' }}>Thesis: {edu.thesis}</div>}
                    {(edu.grade || edu.gpa) && <div style={{ fontSize: 10, color: '#555' }}>Grade / GPA: {edu.grade || edu.gpa}</div>}
                  </div>
                  {edu.year && <span style={{ fontSize: 10, color: '#555', flexShrink: 0, marginLeft: 8, fontWeight: 600 }}>{edu.year}</span>}
                </div>
              </div>
            );
          })}
        </ATSSection>
      )}

      {/* ── SKILLS ── */}
      {skills && (
        <ATSSection title="SKILLS">
          <p style={{ margin: 0, fontSize: 10.5, color: '#333', lineHeight: 1.7 }}>
            {skills.split(',').filter(s => s.trim()).join(' • ')}
          </p>
        </ATSSection>
      )}

      {/* ── LANGUAGES ── */}
      {languages.filter(l => l.lang).length > 0 && (
        <ATSSection title="LANGUAGES">
          <p style={{ margin: 0, fontSize: 10.5, color: '#333' }}>
            {languages.filter(l => l.lang).map(l => `${l.lang} (${l.level})`).join(' | ')}
          </p>
        </ATSSection>
      )}

      {/* ── CERTIFICATIONS ── */}
      {courses && (
        <ATSSection title="CERTIFICATIONS & COURSES">
          <div style={{ whiteSpace: 'pre-line', fontSize: 10.5, color: '#333', lineHeight: 1.7 }}>{courses}</div>
        </ATSSection>
      )}

      {/* ── HOBBIES ── */}
      {hobbies && (
        <ATSSection title="INTERESTS & HOBBIES">
          <p style={{ margin: 0, fontSize: 10.5, color: '#333' }}>{hobbies}</p>
        </ATSSection>
      )}

    </div>
  );
}

function ATSSection({ title, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 900, color: '#000', textTransform: 'uppercase', letterSpacing: 1.5, borderBottom: '1.5px solid #000', paddingBottom: 4 }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

// All templates exported as array
export const ALL_TEMPLATES = [
  { id: 1, name: 'Classic Sidebar', category: 'Professional', defaultColor: '#2563EB', component: Template1 },
  { id: 2, name: 'Modern Photo', category: 'Modern', defaultColor: '#7C3AED', component: Template2 },
  { id: 3, name: 'Navy Executive', category: 'Executive', defaultColor: '#1e3a8a', component: Template3 },
  { id: 4, name: 'Clean Minimal', category: 'Simple', defaultColor: '#059669', component: Template4 },
  { id: 5, name: 'Warm Beige', category: 'Creative', defaultColor: '#DC2626', component: Template5 },
  { id: 6, name: 'Curriculum Vitae', category: 'Professional', defaultColor: '#0d9488', component: Template6 },
  { id: 7, name: '✅ ATS-Friendly', category: 'ATS-Optimized', defaultColor: '#1a1a1a', component: Template7, atsNote: 'Passes all ATS scanners' },
];
