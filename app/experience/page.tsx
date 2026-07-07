'use client';

import React from 'react';
import LayoutShell from '@/components/LayoutShell';
import { experiences } from '@/lib/data';
import { Briefcase, CheckCircle2, Cpu, MapPin, Calendar, Clock } from 'lucide-react';

export default function ExperiencePage() {
  return (
    <LayoutShell>
      <div className="space-y-12">
        
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 space-y-2">
          <h1 className="text-4xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">
            Professional Experience
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
            A comprehensive, interactive timeline tracking my software engineering career, major projects delivered, and organizational outcomes.
          </p>
        </div>

        {/* Interactive Experience Timeline */}
        <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-4 pl-6 sm:pl-8 space-y-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              
              {/* Timeline Indicator Badge */}
              <div className="absolute -left-[45px] sm:-left-[49px] top-1.5 w-10 h-10 rounded-full bg-white dark:bg-gray-950 border-2 border-blue-500 shadow-lg flex items-center justify-center text-lg">
                {exp.logo}
              </div>

              <div className="bg-white dark:bg-gray-900/40 rounded-2xl border border-gray-100 dark:border-gray-800/80 p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-md transition-all">
                
                {/* Meta details */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800/80 pb-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {exp.role}
                    </h2>
                    <p className="text-base font-semibold text-blue-600 dark:text-blue-400">
                      {exp.company}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-500">
                    <span className="flex items-center space-x-1 px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{exp.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1 px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </span>
                    <span className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 font-bold uppercase tracking-wider">
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Responsibilities list */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Key Responsibilities</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-blue-500 font-semibold shrink-0 mt-0.5">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements List */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider text-green-500">Key Outcomes &amp; Achievements</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Projects Delivered */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Major Project Modules Delivered:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.projectsDelivered.map((proj) => (
                      <span key={proj} className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 text-xs font-semibold">
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technologies used */}
                <div className="space-y-2 border-t border-gray-100 dark:border-gray-800/80 pt-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Technologies Leveraged:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-semibold font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </LayoutShell>
  );
}
