'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import LayoutShell from '@/components/LayoutShell';
import { useApp } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { personalInfo, skills, projects, experiences, educationList, blogsList } from '@/lib/data';
import {
  Download, Briefcase, ChevronRight, Award, Trophy, Star, BookOpen,
  ArrowRight, ShieldCheck, Mail, Terminal, Zap, Code2, Users2, Library
} from 'lucide-react';

export default function Home() {
  const { language } = useApp();
  const t = translations[language];

  // Typing effect roles
  const roles = [
    "Software Engineer",
    "Full Stack Web Developer",
    "Next.js Specialist",
    "UI/UX Visual Architect"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = roles[roleIndex];
    
    const tick = () => {
      if (!isDeleting) {
        setTypedText(currentFullText.substring(0, typedText.length + 1));
        if (typedText === currentFullText) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        setTypedText(currentFullText.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }
      
      const speed = isDeleting ? 40 : 80;
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  // Testimonials list
  const testimonials = [
    {
      name: "Marcus Vining",
      role: "CTO at WebSprints",
      text: "Suvo Dev delivered our headless commerce site with unmatched efficiency. Our Largest Contentful Paint plummeted by 75% and conversion rates skyrocketed.",
      avatar: "https://picsum.photos/seed/marcus/100/100"
    },
    {
      name: "Alisha Rahman",
      role: "Founder of FitDaily",
      text: "Exceptional UI design sense paired with top-tier React engineering. Suvo doesn't just write clean code; he understands product psychology.",
      avatar: "https://picsum.photos/seed/alisha/100/100"
    }
  ];

  return (
    <LayoutShell>
      <div className="space-y-24">
        
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-6 md:py-20 overflow-hidden">
          
          {/* Animated decorative gradients */}
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '2s' }}></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side Intro */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-950/20">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {personalInfo.availability}
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white leading-none">
                  {t.home.introPrefix} <span className="text-blue-600 dark:text-blue-500">{personalInfo.name}</span>
                </h1>
                
                {/* Dynamic typing row */}
                <div className="h-10 sm:h-12 flex items-center">
                  <p className="text-xl sm:text-2xl font-mono font-semibold text-gray-700 dark:text-cyan-400">
                    &gt; {typedText}
                    <span className="inline-block w-2.5 h-6 bg-blue-600 dark:bg-cyan-400 ml-1.5 animate-pulse"></span>
                  </p>
                </div>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                {personalInfo.shortIntro}
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/contact"
                  className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-center flex items-center justify-center space-x-2"
                >
                  <Briefcase className="w-5 h-5" />
                  <span>{t.common.hireMe}</span>
                </Link>
                <Link
                  href="/projects"
                  className="px-8 py-3 rounded-xl border border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-900 hover:scale-[1.02] active:scale-[0.98] transition-all text-center flex items-center justify-center space-x-2"
                >
                  <span>{t.common.viewPortfolio}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right side Visual portrait placeholder */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-85 sm:h-85">
                
                {/* Visual geometric rings */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-3xl rotate-6 opacity-10 dark:opacity-20 animate-pulse-subtle"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500 to-purple-500 rounded-3xl -rotate-6 opacity-10 dark:opacity-15" style={{ animationDelay: '2.5s' }}></div>
                
                {/* Interactive premium profile border container */}
                <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-gray-400">{"// SYS_ACTIVE"}</span>
                    <Terminal className="w-5 h-5 text-blue-500" />
                  </div>
                  
                  {/* Portrait simulation: Abstract technical layout */}
                  <div className="space-y-4 my-auto py-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 mx-auto flex items-center justify-center text-white text-3xl font-extrabold font-display shadow-lg">
                      SD
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">{personalInfo.name}</h3>
                      <p className="text-xs text-gray-500 font-mono">Senior Engineer @ Dhaka</p>
                    </div>
                    <div className="inline-flex space-x-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[10px] text-blue-600 dark:text-blue-400 font-bold font-mono uppercase tracking-wider">
                      &lt; React 19 {"//"} Next 15 &gt;
                    </div>
                  </div>

                  <div className="flex justify-between items-end border-t border-gray-100 dark:border-gray-800/80 pt-3">
                    <span className="text-[10px] font-mono text-gray-400">LOC: Dhaka, BD</span>
                    <span className="text-[10px] font-mono text-green-500 font-bold">● REMOTE_OK</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* STATISTICS SECTION */}
        <section className="py-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800/40">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 p-6 sm:p-8 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-1 text-blue-600 dark:text-blue-500">
                <Zap className="w-5 h-5 shrink-0" />
                <span className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight">{personalInfo.yearsOfExp}+</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400">{t.home.stats.experience}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-1 text-blue-600 dark:text-blue-500">
                <Code2 className="w-5 h-5 shrink-0" />
                <span className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight">{personalInfo.projectsCompleted}+</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400">{t.home.stats.completed}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-1 text-blue-600 dark:text-blue-500">
                <Users2 className="w-5 h-5 shrink-0" />
                <span className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight">{personalInfo.happyClients}+</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400">{t.home.stats.clients}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-1 text-blue-600 dark:text-blue-500">
                <Award className="w-5 h-5 shrink-0" />
                <span className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight">{personalInfo.certificationsCount}+</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400">{t.home.stats.certifications}</p>
            </div>
            <div className="space-y-1 col-span-2 lg:col-span-1">
              <div className="flex items-center justify-center space-x-1 text-blue-600 dark:text-blue-500">
                <Library className="w-5 h-5 shrink-0" />
                <span className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight">25+</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400">{t.home.stats.technologies}</p>
            </div>
          </div>
        </section>

        {/* FEATURED WORK PREVIEW */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">
              {t.home.featuredProjects}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">{t.home.featuredProjectsSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.filter(p => p.featured).slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                className="bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-gray-800/80 overflow-hidden shadow hover:shadow-lg transition-all duration-300 flex flex-col group hover:scale-[1.01]"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-950">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-[10px] font-bold tracking-wide uppercase">
                    {proj.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{proj.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {proj.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/projects/${proj.id}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>{t.common.viewProject}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* FEATURED SKILLS PILLS */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">Technical Core</h2>
            <p className="text-gray-600 dark:text-gray-400">Core technologies used to architect production-ready digital architectures.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 10).map((skill) => (
              <div
                key={skill.name}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{skill.name}</span>
                <span className="text-[10px] text-gray-400 font-mono">({skill.level}%)</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/skills"
              className="inline-flex items-center space-x-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>View Full Skill Breakdown &amp; Radar UI</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* WORK EXPERIENCE TIMELINE PREVIEW */}
        <section className="space-y-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">
              {t.home.workPreview}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Current and historic professional roles in brief.</p>
          </div>

          <div className="relative border-l-2 border-gray-200 dark:border-gray-800 pl-6 ml-3 space-y-10">
            {experiences.slice(0, 2).map((exp) => (
              <div key={exp.id} className="relative group">
                
                {/* Timeline node icon */}
                <div className="absolute -left-[37px] top-1.5 w-6 h-6 rounded-full border-2 border-blue-500 bg-white dark:bg-gray-950 flex items-center justify-center text-xs shadow">
                  {exp.logo}
                </div>

                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {exp.role} <span className="text-blue-500">@ {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md self-start sm:self-auto">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium tracking-wide uppercase font-mono">
                    {exp.type} | {exp.location}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
                    {exp.responsibilities[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/experience"
              className="inline-flex items-center space-x-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>{t.home.moreAboutMe}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* TESTIMONIALS CAROUSEL */}
        <section className="space-y-8">
          <div className="space-y-1 text-center">
            <h2 className="text-3xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">Industry Commendations</h2>
            <p className="text-gray-600 dark:text-gray-400">Feedback from technology leaders and engineering directors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm relative flex flex-col justify-between space-y-6"
              >
                <div className="absolute top-6 right-6 text-blue-500/10 dark:text-blue-500/5 text-7xl font-serif select-none pointer-events-none">
                  “
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 italic text-sm leading-relaxed relative z-10">
                  &ldquo;{test.text}&rdquo;
                </p>

                <div className="flex items-center space-x-3 pt-2">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{test.name}</h4>
                    <p className="text-xs text-gray-400">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LATEST ARTICLES */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">Latest Technical Publications</h2>
              <p className="text-gray-600 dark:text-gray-400">Articles discussing Next.js compilers, accessibility guidelines, and performance metrics.</p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogsList.slice(0, 3).map((blog) => (
              <div
                key={blog.id}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800/80 overflow-hidden shadow-sm flex flex-col justify-between space-y-4 hover:shadow"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="object-cover w-full h-full"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 pt-1">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                      {blog.category}
                    </span>
                    <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug line-clamp-2 hover:text-blue-600 transition-colors">
                      <Link href={`/blog`}>{blog.title}</Link>
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {blog.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                    <span>{blog.publishedDate}</span>
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-900 via-[#0B0F19] to-indigo-950 text-white shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
          
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight">
              Ready to elevate your engineering delivery?
            </h2>
            <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
              Whether looking to onboard a full-time Senior Engineer, launch a specialized headless checkout solution, or consult on Next.js core optimizations, I am available to help.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-colors"
              >
                Inquire Now
              </Link>
              <Link
                href="/resume"
                className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
              >
                View Professional CV
              </Link>
            </div>
          </div>
        </section>

      </div>
    </LayoutShell>
  );
}
