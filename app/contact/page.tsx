'use client';

import React, { useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import { useApp } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { personalInfo } from '@/lib/data';
import { Mail, Phone, MapPin, Copy, Check, MessageSquare, Briefcase, Zap } from 'lucide-react';

export default function Contact() {
  const { language } = useApp();
  const t = translations[language];

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    isJobOpp: 'No',
    projectType: 'Web Applications',
    budget: '$5k - $10k',
    message: '',
    requestResume: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset
      setFormData({
        name: '',
        email: '',
        company: '',
        isJobOpp: 'No',
        projectType: 'Web Applications',
        budget: '$5k - $10k',
        message: '',
        requestResume: false
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  // Quick message template draft helper for Recruiters
  const applyRecruiterTemplate = () => {
    setFormData({
      name: 'Hiring Manager',
      email: 'recruiting@enterprise.com',
      company: 'TechCorp International',
      isJobOpp: 'Yes',
      projectType: 'Full-time Hire',
      budget: 'Annual Salary Package',
      message: 'Hi Suvo,\n\nWe came across your modern digital CV and were highly impressed by your Next.js and Cloud capabilities. We have an open Senior Full Stack Engineer role and would love to schedule a quick 15-minute introductory call with you this week!',
      requestResume: true
    });
  };

  return (
    <LayoutShell>
      <div className="space-y-12">
        
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 space-y-2">
          <h1 className="text-4xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">
            {t.contact.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Form column */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-900/40 rounded-2xl border border-gray-100 dark:border-gray-800/80 p-6 sm:p-8 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <span>{t.contact.formTitle}</span>
              </h2>
              
              {/* Recruiter quick fill button */}
              <button
                type="button"
                onClick={applyRecruiterTemplate}
                className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-500/15 transition-colors flex items-center space-x-1 border border-blue-500/20"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Apply Recruiter Template</span>
              </button>
            </div>

            {submitSuccess ? (
              <div className="p-6 bg-green-500/5 border border-green-500/10 rounded-2xl text-center space-y-2">
                <h3 className="font-bold text-green-600 dark:text-green-400 text-base">Inquiry Dispatched Successfully</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Thank you for reaching out. Your detailed contact form has been queued and Suvo will respond via email within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">{t.contact.fields.name}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">{t.contact.fields.email}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@organization.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">{t.contact.fields.company}</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="TechCorp Solutions"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">{t.contact.fields.jobOpp}</label>
                    <select
                      value={formData.isJobOpp}
                      onChange={(e) => setFormData({ ...formData, isJobOpp: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Yes">Yes, this is a hire opportunity</option>
                      <option value="No">No, this is a contract / client project inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">{t.contact.fields.projectType}</label>
                    <input
                      type="text"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      placeholder="e.g. Next.js SaaS, Custom Liquid Theme"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">{t.contact.fields.budget}</label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="e.g. $5k - $10k or annual range"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">{t.contact.fields.message}</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your project scope, timeline, or organizational role needs..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="requestResume"
                    checked={formData.requestResume}
                    onChange={(e) => setFormData({ ...formData, requestResume: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="requestResume" className="text-xs text-gray-600 dark:text-gray-300 font-semibold cursor-pointer select-none">
                    {t.contact.fields.requestResume}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold tracking-wide text-sm shadow-md transition-colors"
                >
                  {isSubmitting ? "Dispatching Message..." : t.contact.fields.submit}
                </button>

              </form>
            )}

          </div>

          {/* Right details column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-400 uppercase tracking-wider text-xs">Availability Status</h3>
              <div className="flex items-center space-x-3">
                <span className="w-3.5 h-3.5 bg-green-500 rounded-full animate-pulse shrink-0"></span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white leading-none">Active Recruitment</p>
                  <p className="text-xs text-gray-500 mt-1">Open for remote full-time positions &amp; contracts worldwide.</p>
                </div>
              </div>
            </div>

            {/* Direct details card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-400 uppercase tracking-wider text-xs">Direct Office Lines</h3>
              
              <div className="space-y-4 text-sm">
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Location base</p>
                    <p className="text-xs text-gray-500 mt-0.5">{personalInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Email Address</p>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className="text-xs text-gray-500 font-mono">{personalInfo.email}</span>
                      <button
                        onClick={copyEmail}
                        className="p-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-blue-500 transition-colors"
                        title="Copy Email"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </LayoutShell>
  );
}
