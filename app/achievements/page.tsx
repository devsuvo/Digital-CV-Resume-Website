'use client';

import React from 'react';
import LayoutShell from '@/components/LayoutShell';
import { achievementsList } from '@/lib/data';
import { Award, Trophy, Users, Heart, MessageSquare, Terminal } from 'lucide-react';

export default function AchievementsPage() {
  
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Award': return <Trophy className="w-5 h-5" />;
      case 'Hackathon': return <Terminal className="w-5 h-5" />;
      case 'Contribution': return <Heart className="w-5 h-5" />;
      case 'Speaking': return <MessageSquare className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case 'Award': return 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/30';
      case 'Hackathon': return 'bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-900/30';
      case 'Contribution': return 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/30';
      case 'Speaking': return 'bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-300 border-cyan-200 dark:border-cyan-900/30';
      default: return 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-900/30';
    }
  };

  return (
    <LayoutShell>
      <div className="space-y-12">
        
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 space-y-2">
          <h1 className="text-4xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white flex items-center space-x-2">
            <Trophy className="w-8 h-8 text-blue-500" />
            <span>Honors &amp; Achievements</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
            Celebrating career milestones, hacking competition outcomes, global open-source code contributions, and public speaking meetups.
          </p>
        </div>

        {/* List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievementsList.map((ach) => (
            <div
              key={ach.id}
              className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl shadow-sm space-y-4 hover:shadow transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getCategoryBadgeClass(ach.category)} flex items-center space-x-1`}>
                  {getCategoryIcon(ach.category)}
                  <span>{ach.category}</span>
                </span>
                <span className="text-xs font-mono font-bold text-gray-400">{ach.date}</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{ach.org}</span>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display leading-tight">{ach.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{ach.description}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </LayoutShell>
  );
}
