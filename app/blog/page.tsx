'use client';

import React, { useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import { blogsList, Blog } from '@/lib/data';
import { Search, Calendar, Clock, BookOpen, ChevronRight, X, ArrowLeft, Tag } from 'lucide-react';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<Blog | null>(null);

  const categories = ['All', 'Next.js', 'CSS', 'Career'];

  const filteredPosts = blogsList.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Render list of posts
  if (!selectedPost) {
    return (
      <LayoutShell>
        <div className="space-y-12">
          
          {/* Header */}
          <div className="border-b border-gray-200 dark:border-gray-800 pb-8 space-y-2">
            <h1 className="text-4xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <span>Technical Publications</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
              Thought leadership logs, tutorials, and guidelines on Next.js compiles, PostCSS v4 configurations, and building ATS-friendly applications.
            </p>
          </div>

          {/* Filtering Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles by title, summary, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-colors ${
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

          {/* Blog posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No articles matched your filtering queries. Try searching other keywords.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-white dark:bg-gray-900/60 rounded-3xl border border-gray-100 dark:border-gray-800/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:scale-[1.01] cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden bg-gray-50 dark:bg-gray-950">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-[10px] font-bold uppercase tracking-wide">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-500 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[9px] font-semibold text-gray-500 dark:text-gray-400">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800/85 pt-3 text-[11px] text-gray-400 font-mono">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{post.publishedDate}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readTime}</span>
                        </span>
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

  // Expanded Post Reader view
  return (
    <LayoutShell>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Button */}
        <button
          onClick={() => setSelectedPost(null)}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </button>

        {/* Hero */}
        <div className="space-y-4">
          <span className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-wider font-mono">
            {selectedPost.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-gray-900 dark:text-white leading-tight">
            {selectedPost.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-500 border-b border-gray-200 dark:border-gray-800 pb-4">
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Published: {selectedPost.publishedDate}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Reading Time: {selectedPost.readTime}</span>
            </span>
          </div>
        </div>

        {/* Main Cover Cover */}
        <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 bg-gray-50">
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Body formatted with tailwind typography */}
        <article className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
          {selectedPost.content.split('\n\n').map((para, idx) => {
            if (para.startsWith('###')) {
              return (
                <h3 key={idx} className="text-xl font-bold text-gray-900 dark:text-white font-display pt-4">
                  {para.replace('###', '').trim()}
                </h3>
              );
            }
            if (para.startsWith('-')) {
              return (
                <ul key={idx} className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
                  {para.split('\n').map((li, lidx) => (
                    <li key={lidx}>{li.replace('-', '').trim()}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="text-sm sm:text-base">
                {para.trim()}
              </p>
            );
          })}
        </article>

        {/* Tags footer */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-wrap gap-2">
          <Tag className="w-4 h-4 text-gray-400 self-center shrink-0" />
          {selectedPost.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 font-semibold font-mono">
              #{tag}
            </span>
          ))}
        </div>

      </div>
    </LayoutShell>
  );
}
