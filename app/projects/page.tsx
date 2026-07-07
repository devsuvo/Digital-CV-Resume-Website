'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LayoutShell from '@/components/LayoutShell';
import { projects } from '@/lib/data';
import { Search, Filter, ExternalLink, Github, ArrowRight } from 'lucide-react';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Dashboard',
    'E-commerce',
    'Web Applications',
    'Open Source',
    'WordPress',
    'Landing Pages'
  ];

  const filteredProjects = projects.filter((proj) => {
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'All' || proj.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <LayoutShell>
      <div className="space-y-12">
        
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 space-y-2">
          <h1 className="text-4xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">
            Architectural Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
            A curated showcase of high-end web applications, custom merchant systems, and responsive layouts that solve modern business problems.
          </p>
        </div>

        {/* Dynamic Controls Grid: Search and Category Filtering */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Search Field */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by title or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Categories Pill list */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            No projects matched your filtering criteria. Try expanding your search queries.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white dark:bg-gray-900/60 rounded-3xl border border-gray-100 dark:border-gray-800/80 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:scale-[1.01]"
              >
                {/* Visual Cover */}
                <div className="relative aspect-video overflow-hidden bg-gray-50 dark:bg-gray-950">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-[10px] font-bold uppercase tracking-wide">
                    {proj.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                      {proj.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Nav Links */}
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800/85 pt-3">
                      <Link
                        href={`/projects/${proj.id}`}
                        className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>Case Study Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <div className="flex space-x-3 text-gray-400">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors" title="View Source">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors" title="Live Demo">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </LayoutShell>
  );
}
