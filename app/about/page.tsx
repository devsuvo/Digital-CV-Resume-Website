'use client';

import React from 'react';
import LayoutShell from '@/components/LayoutShell';
import { useApp } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { personalInfo } from '@/lib/data';
import { Shield, Target, Lightbulb, Compass, Award, Trophy, Languages } from 'lucide-react';

export default function About() {
  const { language } = useApp();
  const t = translations[language];

  // Core values icons mapping
  const valueIcons = [<Lightbulb key="light" className="w-6 h-6" />, <Shield key="shield" className="w-6 h-6" />, <Target key="target" className="w-6 h-6" />];

  // Technical story paragraphs
  const paragraphs = [
    "Suvo Dev's journey in computer systems started in 2017 when he matriculated into his Computer Science program. Fascinated by compiler design and front-end render models, he early on aligned his interest with full-stack Javascript architectures, creating custom scripts and web crawlers.",
    "By 2020, he was engineering bespoke e-commerce and blog setups for several merchant businesses globally. His ability to deliver fast loading experiences quickly gained traction, transitioning into full-time corporate engineering roles where he could spearhead product delivery.",
    "Today, Suvo acts as a Senior Engineer with deep familiarity in Next.js core caching, database index optimizations, serverless container scale-out, and beautiful aesthetic design paradigms. He maintains a deep commitment to high-fidelity user experiences and clean code guidelines."
  ];

  return (
    <LayoutShell>
      <div className="space-y-16">
        
        {/* About Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 space-y-2">
          <h1 className="text-4xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">
            {t.about.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
            {t.about.subtitle}
          </p>
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Biography Text column */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-blue-500 pl-4">
              {t.about.bioTitle}
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Core Values Section */}
            <div className="pt-6 space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.about.valuesTitle}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {t.about.values.map((val, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900/60 shadow-sm space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      {valueIcons[idx] || <Compass className="w-6 h-6" />}
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{val.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Highlights column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Mission Panel */}
            <div className="p-6 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl space-y-3">
              <Compass className="w-8 h-8 text-blue-100" />
              <h3 className="text-lg font-bold font-display">{t.about.missionTitle}</h3>
              <p className="text-xs leading-relaxed text-blue-100">
                {t.about.missionText}
              </p>
            </div>

            {/* Quick Goals card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/40 space-y-4 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-blue-500" />
                <span>{t.about.goalsTitle}</span>
              </h3>
              <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                {t.about.goals.map((g, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-blue-500 font-bold select-none shrink-0">•</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages & Hobbies */}
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/40 space-y-4 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center space-x-2">
                <Languages className="w-5 h-5 text-blue-500" />
                <span>{t.about.languages}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  English (Fluent)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Bengali (Native)
                </span>
              </div>

              <div className="h-px bg-gray-100 dark:bg-gray-800/80 my-2" />

              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.about.interests}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Open Source Contributions, UI/UX Explorations on Figma, Photography, Tactical Chess, Traveling.
              </p>
            </div>

          </div>

        </div>

      </div>
    </LayoutShell>
  );
}
