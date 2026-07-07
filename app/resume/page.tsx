'use client';

import React, { useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import { useApp, ResumeTheme } from '@/context/AppContext';
import { personalInfo, skills, experiences, educationList, projects, certificationsList, achievementsList } from '@/lib/data';
import { Download, Printer, Layout, Sparkles, Check, Copy, ExternalLink, Calendar, MapPin, Github, Linkedin } from 'lucide-react';

export default function ResumePage() {
  const { resumeTheme, setResumeTheme } = useApp();
  const [isCopied, setIsCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Group skills for traditional layout columns
  const coreFrontend = skills.filter(s => s.category === 'Frontend');
  const coreBackend = skills.filter(s => s.category === 'Backend' || s.category === 'Database');
  const otherSkills = skills.filter(s => s.category !== 'Frontend' && s.category !== 'Backend' && s.category !== 'Database');

  return (
    <LayoutShell>
      <div className="space-y-10 print-container">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm no-print">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Layout className="w-4 h-4 text-blue-500" />
              <span>Resume Layout Presentation</span>
            </h2>
            <p className="text-xs text-gray-500">Toggle designs to fit different agency review profiles.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(['traditional', 'modern', 'visual'] as ResumeTheme[]).map((t) => (
              <button
                key={t}
                onClick={() => setResumeTheme(t)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                  resumeTheme === t
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                {t}
              </button>
            ))}

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold flex items-center space-x-1.5 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* ===================================================================
            TRADITIONAL RESUME THEME (Highly Academic, Structured Black & White)
            =================================================================== */}
        {resumeTheme === 'traditional' && (
          <div className="p-8 sm:p-12 bg-white text-black border border-gray-200 shadow-2xl rounded-2xl font-serif space-y-8 print:border-none print:shadow-none print:rounded-none max-w-4xl mx-auto">
            
            {/* Header contact */}
            <div className="text-center space-y-2 border-b-2 border-black pb-4">
              <h1 className="text-3xl font-bold tracking-tight uppercase font-serif">{personalInfo.name}</h1>
              <p className="text-sm font-semibold italic">{personalInfo.title} | {personalInfo.role}</p>
              <div className="flex flex-wrap justify-center gap-4 text-xs font-mono">
                <span>{personalInfo.location}</span>
                <span>•</span>
                <span className="cursor-pointer" onClick={copyEmail}>{personalInfo.email}</span>
                <span>•</span>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a>
                <span>•</span>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="underline">GitHub</a>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <h2 className="text-base font-bold uppercase tracking-wider border-b border-black">Professional Summary</h2>
              <p className="text-sm leading-relaxed font-serif text-justify">
                {personalInfo.shortIntro}
              </p>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h2 className="text-base font-bold uppercase tracking-wider border-b border-black">Professional Experience</h2>
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between text-sm font-bold font-serif">
                    <span>{exp.role} — {exp.company}</span>
                    <span>{exp.duration}</span>
                  </div>
                  <p className="text-xs font-semibold italic text-gray-700">{exp.type} | {exp.location}</p>
                  <ul className="list-disc pl-5 text-xs space-y-1 leading-relaxed">
                    {exp.responsibilities.map((r, idx) => <li key={idx}>{r}</li>)}
                    {exp.achievements.map((a, idx) => <li key={idx} className="font-semibold">{a}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <h2 className="text-base font-bold uppercase tracking-wider border-b border-black">Technical Skills</h2>
              <div className="grid grid-cols-3 gap-4 text-xs leading-relaxed font-serif">
                <div>
                  <h4 className="font-bold underline">Frontend Matrix:</h4>
                  <p>{coreFrontend.map(s => s.name).join(', ')}</p>
                </div>
                <div>
                  <h4 className="font-bold underline">Backend &amp; Database:</h4>
                  <p>{coreBackend.map(s => s.name).join(', ')}</p>
                </div>
                <div>
                  <h4 className="font-bold underline">CMS, Design &amp; Others:</h4>
                  <p>{otherSkills.map(s => s.name).join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h2 className="text-base font-bold uppercase tracking-wider border-b border-black">Education Background</h2>
              {educationList.map((edu) => (
                <div key={edu.id} className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold">
                    <span>{edu.degree} — {edu.institution}</span>
                    <span>{edu.duration}</span>
                  </div>
                  <p className="italic text-gray-700">{edu.location}</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    {edu.highlights.map((h, idx) => <li key={idx}>{h}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            {/* Certifications & Achievements */}
            <div className="grid grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <h3 className="font-bold uppercase tracking-wider border-b border-black">Certifications</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {certificationsList.map(c => (
                    <li key={c.id}>
                      <span className="font-bold">{c.title}</span> — {c.org} ({c.date})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold uppercase tracking-wider border-b border-black">Achievements</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {achievementsList.map(a => (
                    <li key={a.id}>
                      <span className="font-bold">{a.title}</span> — {a.org}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reference info */}
            <div className="text-center pt-4 text-xs italic text-gray-500 border-t border-gray-200">
              *References available upon request. Verified online certificates and portfolio links accessible on https://suvodev.com.
            </div>

          </div>
        )}

        {/* ===================================================================
            MODERN RESUME THEME (Left sidebar rails, elegant modern clean typography)
            =================================================================== */}
        {resumeTheme === 'modern' && (
          <div className="p-8 sm:p-10 bg-white text-gray-800 border border-gray-100 shadow-2xl rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-8 max-w-4xl mx-auto dark:bg-gray-950 dark:border-gray-800/80 dark:text-gray-200">
            
            {/* Left sidebar col */}
            <div className="md:col-span-4 space-y-6">
              
              <div className="space-y-2 pb-4 border-b border-gray-200 dark:border-gray-800">
                <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white font-display uppercase">{personalInfo.name}</h1>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 font-mono leading-relaxed">{personalInfo.role}</p>
              </div>

              <div className="space-y-4 text-xs font-mono text-gray-600 dark:text-gray-400">
                <div className="space-y-1">
                  <h4 className="font-bold uppercase text-gray-400">Location</h4>
                  <p>{personalInfo.location}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold uppercase text-gray-400">Direct Line</h4>
                  <button onClick={copyEmail} className="hover:underline text-left select-all">{personalInfo.email}</button>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold uppercase text-gray-400">Code repositories</h4>
                  <p><a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-500">github.com/suvodev</a></p>
                  <p><a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-500">linkedin.com/in/suvodev</a></p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="font-bold text-sm uppercase tracking-wide text-gray-950 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Skills overview</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.slice(0, 12).map(s => (
                    <span key={s.name} className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-semibold font-mono text-gray-600 dark:text-gray-400">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold text-sm uppercase tracking-wide text-gray-950 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Verified credentials</h3>
                <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  {certificationsList.map(c => (
                    <li key={c.id}>
                      <span className="font-semibold text-gray-800 dark:text-gray-200 block">{c.title}</span>
                      <span className="text-[10px] text-gray-400">{c.org} • {c.date}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right main col */}
            <div className="md:col-span-8 space-y-8">
              
              <div className="space-y-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">Summary Statement</h2>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {personalInfo.shortIntro}
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">Work Experience</h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gray-100 dark:border-gray-850 pb-1.5">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base">
                          {exp.role} <span className="text-blue-500 font-normal">@ {exp.company}</span>
                        </h3>
                        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">{exp.duration}</span>
                      </div>
                      <p className="text-[10px] font-mono text-gray-500 uppercase leading-none">{exp.type} | {exp.location}</p>
                      <ul className="list-disc pl-4 text-xs text-gray-600 dark:text-gray-300 space-y-1 leading-relaxed">
                        {exp.responsibilities.map((r, idx) => <li key={idx}>{r}</li>)}
                        {exp.achievements.map((a, idx) => <li key={idx} className="font-semibold text-gray-800 dark:text-gray-100">{a}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">Education</h2>
                <div className="space-y-4">
                  {educationList.map((edu) => (
                    <div key={edu.id} className="text-xs space-y-1">
                      <div className="flex justify-between font-semibold text-gray-900 dark:text-white">
                        <span>{edu.degree}</span>
                        <span className="font-mono text-[10px] text-gray-400">{edu.duration}</span>
                      </div>
                      <p className="text-gray-500 font-medium">{edu.institution} | {edu.location}</p>
                      <p className="text-[10px] text-gray-400">{edu.highlights[0]}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ===================================================================
            VISUAL RESUME THEME (Vibrant layouts, cards, color timelines & tags)
            =================================================================== */}
        {resumeTheme === 'visual' && (
          <div className="space-y-8 max-w-4xl mx-auto font-sans text-gray-800 dark:text-gray-200">
            
            {/* Visual Header card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex space-x-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[10px] text-blue-600 dark:text-blue-400 font-bold font-mono uppercase tracking-wider">
                  {personalInfo.availability}
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-gray-900 dark:text-white leading-none">{personalInfo.name}</h1>
                <p className="text-sm font-semibold text-gray-500">{personalInfo.title} | {personalInfo.role}</p>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    <span>{personalInfo.location}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={copyEmail}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-bold font-mono transition-colors text-center"
                >
                  {isCopied ? "Email Copied!" : personalInfo.email}
                </button>
                <div className="flex justify-center md:justify-start gap-2">
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:text-blue-500 transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:text-blue-500 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Experience timeline visually stacked */}
            <div className="p-6 sm:p-8 bg-white dark:bg-gray-900/60 rounded-3xl border border-gray-100 dark:border-gray-800/80 shadow-md space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display border-b border-gray-100 dark:border-gray-800/80 pb-3">
                Work Experience Timeline
              </h2>
              <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-3 pl-6 space-y-8">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-gray-950 shadow-md animate-pulse"></div>
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h3 className="font-bold text-base text-gray-900 dark:text-white">{exp.role} <span className="text-blue-500">@ {exp.company}</span></h3>
                        <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{exp.duration}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-serif pt-1">
                        {exp.responsibilities.slice(0, 2).join(' ')}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.technologies.slice(0, 4).map(tech => (
                          <span key={tech} className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-850 text-[10px] font-semibold text-gray-500 font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic background & skills visually stacked */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="p-6 bg-white dark:bg-gray-900/60 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white font-display border-b border-gray-100 dark:border-gray-800 pb-2">Academic History</h3>
                <div className="space-y-4">
                  {educationList.map(edu => (
                    <div key={edu.id} className="text-xs space-y-1">
                      <p className="font-bold text-gray-900 dark:text-white">{edu.degree}</p>
                      <p className="text-gray-500">{edu.institution} | {edu.duration}</p>
                      <p className="text-[10px] text-gray-400">{edu.highlights[0]}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-gray-900/60 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white font-display border-b border-gray-100 dark:border-gray-800 pb-2">Verified Certifications</h3>
                <ul className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
                  {certificationsList.slice(0, 3).map(c => (
                    <li key={c.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-800 dark:text-gray-200">{c.title}</p>
                        <span className="text-[10px] text-gray-400">{c.org}</span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{c.date}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        )}

      </div>
    </LayoutShell>
  );
}
