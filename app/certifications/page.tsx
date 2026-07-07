'use client';

import React from 'react';
import LayoutShell from '@/components/LayoutShell';
import { certificationsList } from '@/lib/data';
import { Award, ShieldCheck, ExternalLink, Calendar, Key } from 'lucide-react';

export default function CertificationsPage() {
  return (
    <LayoutShell>
      <div className="space-y-12">
        
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 space-y-2">
          <h1 className="text-4xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white flex items-center space-x-2">
            <Award className="w-8 h-8 text-blue-500" />
            <span>Professional Certifications</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
            My active cloud, DevOps, frontend development, and architectural credentials verified by Amazon Web Services, Google Cloud, Meta, and Vercel.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificationsList.map((cert) => (
            <div
              key={cert.id}
              className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl shadow-sm flex flex-col justify-between space-y-6 hover:shadow transition-shadow duration-300"
            >
              <div className="space-y-4">
                
                {/* Header branding */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold font-mono text-gray-400 uppercase tracking-wider">{cert.org}</span>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                      {cert.title}
                    </h2>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>

                {/* Dates and ID */}
                <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-500">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Issued: {cert.date}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Key className="w-4 h-4 text-gray-400" />
                    <span>ID: {cert.credentialId}</span>
                  </div>
                </div>

                <div className="h-px bg-gray-100 dark:bg-gray-800/80 my-2" />

                {/* Skills Earned */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Skills Validated &amp; Earned:</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsEarned.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 text-xs font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div className="pt-2">
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Verify Credential on Issuer Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </LayoutShell>
  );
}
