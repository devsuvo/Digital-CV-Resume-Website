'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import LayoutShell from '@/components/LayoutShell';
import { projects } from '@/lib/data';
import { ArrowLeft, Github, ExternalLink, Cpu, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ProjectDetails() {
  const params = useParams();
  const router = useRouter();
  
  const id = params?.id as string;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <LayoutShell>
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-950/40 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Case Study Not Found</h2>
          <p className="text-gray-500 max-w-md mx-auto">The project case study you requested could not be retrieved. It may have been relocated or updated.</p>
          <Link
            href="/projects"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell>
      <div className="space-y-12">
        
        {/* Navigation Breadcrumb back */}
        <div className="flex items-center space-x-2 text-sm">
          <Link href="/projects" className="text-gray-500 hover:text-blue-500 hover:underline">
            Projects
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 dark:text-white font-bold truncate max-w-xs">{project.title}</span>
        </div>

        {/* Project Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-gray-200 dark:border-gray-800 pb-10">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold tracking-wide uppercase font-mono">
              {project.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-gray-900 dark:text-white leading-tight">
              {project.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-800 text-gray-800 dark:text-gray-200 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Website Demo</span>
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
            <img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-full"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>

        {/* Deep Case Study Body details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Case study texts */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <span>Executive Case Overview</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                {project.overview}
              </p>
            </div>

            {/* Problem Statement vs Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              
              <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-3">
                <h3 className="font-bold text-red-600 dark:text-red-400 text-sm uppercase tracking-wide">The Business Problem</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {project.problemStatement}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10 space-y-3">
                <h3 className="font-bold text-green-600 dark:text-green-400 text-sm uppercase tracking-wide">The Engineering Solution</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {project.solution}
                </p>
              </div>

            </div>

            {/* Features list */}
            <div className="space-y-4 pt-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Core Functional Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2 p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges & Results */}
            <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-gray-800/80">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Technical Challenges Overcome</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {project.challenges}
                </p>
              </div>

              <div className="space-y-2 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">Measurable Outcomes &amp; Results</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.results}
                </p>
              </div>
            </div>

          </div>

          {/* Sidebar Architecture & Tech */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center space-x-2 border-b border-gray-100 dark:border-gray-800 pb-3">
                <Cpu className="w-5 h-5 text-blue-500" />
                <span>Architecture</span>
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-mono">
                {project.architecture}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Technology Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-400 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Projects short recommendation list */}
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-base border-b border-gray-100 dark:border-gray-800 pb-3">Recommended Reading</h3>
              <ul className="space-y-3 text-xs">
                {projects.filter(p => p.id !== project.id).slice(0, 2).map((p) => (
                  <li key={p.id}>
                    <Link href={`/projects/${p.id}`} className="block hover:text-blue-500 transition-colors group">
                      <p className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-500">{p.title}</p>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">{p.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </LayoutShell>
  );
}
