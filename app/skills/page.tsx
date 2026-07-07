'use client';

import React, { useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import { skills } from '@/lib/data';
import { Cpu, Server, Database, Cloud, Layers, Palette, Terminal, Target, Heart } from 'lucide-react';

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'CMS', 'Design', 'Soft Skills'];

  // Map icons for display
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Frontend': return <Cpu className="w-5 h-5" />;
      case 'Backend': return <Server className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Cloud':
      case 'DevOps': return <Cloud className="w-5 h-5" />;
      case 'CMS': return <Layers className="w-5 h-5" />;
      case 'Design': return <Palette className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  // SVG Radar Chart Coordinates Calculator
  // Radar categories: Frontend (98%), Backend (92%), Database (88%), Cloud/DevOps (81%), CMS (91%), UI/UX Design (88%)
  const radarCategories = [
    { name: 'Frontend', level: 98, angle: 0 },
    { name: 'Backend', level: 92, angle: 60 },
    { name: 'Database', level: 88, angle: 120 },
    { name: 'Cloud/DevOps', level: 81, angle: 180 },
    { name: 'CMS', level: 91, angle: 240 },
    { name: 'UI/UX Design', level: 88, angle: 300 }
  ];

  const getCoordinates = (angle: number, value: number) => {
    const radian = (angle * Math.PI) / 180;
    const r = (value / 100) * 110; // Max radius 110px
    const x = 150 + r * Math.sin(radian);
    const y = 150 - r * Math.cos(radian);
    return { x, y };
  };

  // Generate web concentric rings coordinates
  const webRings = [25, 50, 75, 100];
  const webPoints = webRings.map(ringLevel => {
    return radarCategories.map(cat => {
      const radian = (cat.angle * Math.PI) / 180;
      const r = (ringLevel / 100) * 110;
      const x = 150 + r * Math.sin(radian);
      const y = 150 - r * Math.cos(radian);
      return `${x},${y}`;
    }).join(' ');
  });

  // Level coordinates for active stats polygon
  const activePolygonPoints = radarCategories.map(cat => {
    const { x, y } = getCoordinates(cat.angle, cat.level);
    return `${x},${y}`;
  }).join(' ');

  return (
    <LayoutShell>
      <div className="space-y-12">
        
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 space-y-2">
          <h1 className="text-4xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">
            Professional Skill Matrix
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
            A comprehensive overview of my tech stack, frameworks, platforms, and personal core soft competencies.
          </p>
        </div>

        {/* Dynamic Skill visualization area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Custom SVG Radar Chart */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4 bg-white dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white text-base font-display">Competency Radar Diagram</h3>
            
            <div className="relative w-[300px] h-[300px]">
              <svg viewBox="0 0 300 300" className="w-full h-full">
                
                {/* Concentric grid rings */}
                {webPoints.map((points, idx) => (
                  <polygon
                    key={idx}
                    points={points}
                    className="fill-none stroke-gray-200 dark:stroke-gray-800 stroke-[1.5]"
                  />
                ))}

                {/* Radar axes spokes */}
                {radarCategories.map((cat, idx) => {
                  const outer = getCoordinates(cat.angle, 100);
                  return (
                    <line
                      key={idx}
                      x1="150"
                      y1="150"
                      x2={outer.x}
                      y2={outer.y}
                      className="stroke-gray-200 dark:stroke-gray-800 stroke-[1.5]"
                    />
                  );
                })}

                {/* Active skill polygon */}
                <polygon
                  points={activePolygonPoints}
                  className="fill-blue-500/15 stroke-blue-500 stroke-[2] active-poly drop-shadow-lg"
                />

                {/* Outer category labels */}
                {radarCategories.map((cat, idx) => {
                  const pos = getCoordinates(cat.angle, 115);
                  let anchor: "middle" | "start" | "end" = "middle";
                  if (cat.angle === 0 || cat.angle === 180) anchor = "middle";
                  else if (cat.angle > 0 && cat.angle < 180) anchor = "start";
                  else anchor = "end";

                  return (
                    <text
                      key={idx}
                      x={pos.x}
                      y={pos.y + 4}
                      textAnchor={anchor}
                      className="fill-gray-500 dark:fill-gray-400 font-mono text-[9px] font-bold uppercase tracking-wide"
                    >
                      {cat.name} ({cat.level}%)
                    </text>
                  );
                })}

                {/* Central point indicator */}
                <circle cx="150" cy="150" r="3" className="fill-blue-500" />
              </svg>
            </div>
            <p className="text-[10px] text-gray-400 font-mono text-center leading-relaxed">
              *Polygon boundary represents proven expertise level based on corporate delivery and peer review feedback.
            </p>
          </div>

          {/* Right: Category filters & progressive progress sliders */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Category selection scroll bar */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mx-2 px-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-colors shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List of Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-xl shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg">
                        {getCategoryIcon(skill.category)}
                      </div>
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{skill.name}</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400">{skill.level}%</span>
                  </div>

                  {/* Progressive Bar */}
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </LayoutShell>
  );
}
