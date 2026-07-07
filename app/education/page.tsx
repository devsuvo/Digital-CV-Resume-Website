'use client';

import React from 'react';
import LayoutShell from '@/components/LayoutShell';
import { educationList, certificationsList, achievementsList } from '@/lib/data';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle2, Trophy, ExternalLink } from 'lucide-react';

export default function EducationPage() {
  return (
    <LayoutShell>
      <div className="space-y-16">
        
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 space-y-2">
          <h1 className="text-4xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">
            Academic &amp; Professional Learning
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
            My structured academic background, thesis research, verified industry certifications, and continuing education.
          </p>
        </div>

        {/* Academic timeline */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <GraduationCap className="w-6 h-6 text-blue-500" />
            <span>Academic Background</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {educationList.map((edu) => (
              <div
                key={edu.id}
                className="p-6 sm:p-8 bg-white dark:bg-gray-900/40 rounded-2xl border border-gray-100 dark:border-gray-800/80 shadow-sm relative space-y-4"
              >
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    {edu.duration}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-gray-500 font-medium font-mono flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{edu.location}</span>
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Key Highlights</h4>
                  <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                    {edu.highlights.map((high, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{high}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {edu.awards && (
                  <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800/80">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider text-amber-500 flex items-center space-x-1">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Scholarships &amp; Awards</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.awards.map((aw) => (
                        <span key={aw} className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                          {aw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {edu.courses && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider text-blue-500">Selected Core Courses:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.courses.map((cr) => (
                        <span key={cr} className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] font-semibold">
                          {cr}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

        {/* Certifications Quick Grid */}
        <div className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <Award className="w-6 h-6 text-blue-500" />
              <span>Verified Industry Credentials</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {certificationsList.map((cert) => (
              <div
                key={cert.id}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">{cert.org}</span>
                      <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug">{cert.title}</h3>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {cert.date}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-gray-400">ID: {cert.credentialId}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {cert.skillsEarned.map(sk => (
                      <span key={sk} className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 text-[9px] font-bold">
                        {sk}
                      </span>
                    ))}
                  </div>

                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline pt-1"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </LayoutShell>
  );
}
