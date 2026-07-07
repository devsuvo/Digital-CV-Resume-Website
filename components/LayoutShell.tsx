'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { personalInfo, skills, projects } from '@/lib/data';
import {
  Menu, X, Sun, Moon, Globe, Search, MessageSquare, Terminal,
  ArrowUp, Check, Copy, Sparkles, Download, Briefcase, GraduationCap,
  Award, FileText, Layers, MapPin, Mail, Github, Linkedin, ExternalLink,
  BookOpen, Heart, Send, CheckCircle2, ShieldAlert
} from 'lucide-react';

interface LayoutShellProps {
  children: React.ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    language, setLanguage,
    isDarkMode, toggleDarkMode,
    isCommandPaletteOpen, setCommandPaletteOpen,
    isChatOpen, setChatOpen
  } = useApp();

  const t = translations[language];

  // UI state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cookieConsent, setCookieConsent] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  // Command Palette states
  const [commandSearch, setCommandSearch] = useState('');
  const commandInputRef = useRef<HTMLInputElement>(null);

  // AI Chat states
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'model'; content: string }>>([
    { role: 'model', content: "Hello! I am Suvo Dev's AI Career Assistant. Feel free to ask me anything about his professional experience, coding skills, projects, or availability!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Tracking scroll for Sticky Nav and Back-To-Top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsBackToTopVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    // Initial checks
    const consent = localStorage.getItem('cookie_consent_suvodev');
    if (!consent) {
      // Trigger consent delay
      const timer = setTimeout(() => setCookieConsent(true), 2000);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to chat bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen]);

  // Command Palette Input Autofocus
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => commandInputRef.current?.focus(), 100);
    }
  }, [isCommandPaletteOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    showToast(`${t.common.copied} (${personalInfo.email})`);
  };

  const handleCookieAccept = () => {
    localStorage.setItem('cookie_consent_suvodev', 'true');
    setCookieConsent(false);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsChatLoading(true);
      setTimeout(() => {
        setIsChatLoading(false);
        setNewsletterSubscribed(true);
        showToast("Subscribed successfully!");
        setTimeout(() => {
          setIsNewsletterOpen(false);
          setNewsletterSubscribed(false);
          setNewsletterEmail('');
        }, 2000);
      }, 1000);
    }
  };

  // AI Chat submission
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, { role: 'user', content: userMsg }]
        }),
      });

      const data = await response.json();
      if (data.text) {
        setChatMessages((prev) => [...prev, { role: 'model', content: data.text }]);
      } else {
        setChatMessages((prev) => [...prev, { role: 'model', content: "I'm having trouble retrieving that information right now. Please try again!" }]);
      }
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [...prev, { role: 'model', content: "An error occurred. Please check your network connection." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const navigationItems = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.experience, href: '/experience' },
    { name: t.nav.skills, href: '/skills' },
    { name: t.nav.projects, href: '/projects' },
    { name: t.nav.certifications, href: '/certifications' },
    { name: t.nav.achievements, href: '/achievements' },
    { name: t.nav.blog, href: '/blog' },
    { name: t.nav.contact, href: '/contact' },
    { name: t.nav.resume, href: '/resume' },
  ];

  // Filters for Command Palette search
  const filteredCommands = [
    ...navigationItems.map(item => ({ type: 'Page', name: item.name, action: () => router.push(item.href) })),
    { type: 'Action', name: 'Toggle Theme (Light/Dark)', action: () => toggleDarkMode() },
    { type: 'Action', name: 'Switch to Bengali (বাংলা)', action: () => setLanguage('bn') },
    { type: 'Action', name: 'Switch to English', action: () => setLanguage('en') },
    { type: 'Action', name: 'Download PDF Resume', action: () => router.push('/resume') },
    { type: 'Action', name: 'Open AI Assistant', action: () => setChatOpen(true) },
    ...skills.map(s => ({ type: 'Skill', name: s.name, action: () => router.push('/skills') })),
    ...projects.map(p => ({ type: 'Project', name: p.title, action: () => router.push(`/projects/${p.id}`) }))
  ].filter(cmd => cmd.name.toLowerCase().includes(commandSearch.toLowerCase()));

  return (
    <div className="relative flex flex-col min-h-screen">
      
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass py-3 shadow-md border-b border-white/10'
            : 'bg-transparent py-5'
        } no-print`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold font-display text-lg tracking-wider shadow-md group-hover:scale-105 transition-transform duration-200">
              S
            </span>
            <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              Suvo<span className="text-blue-500">.Dev</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.slice(0, 5).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Mega Menu Toggle */}
            <div className="relative">
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-1"
              >
                <span>More</span>
                <span className="text-xs">▼</span>
              </button>

              {megaMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMegaMenuOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 z-20 overflow-hidden">
                    <div className="py-1">
                      {navigationItems.slice(5).map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMegaMenuOpen(false)}
                          className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                            pathname === item.href ? 'text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10' : ''
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Desktop Right Settings Menu */}
          <div className="hidden lg:flex items-center space-x-3">
            
            {/* Search Palette Button */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
              title="Search and Commands (Ctrl+K)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Multi-language selector */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'BN' : 'EN'}</span>
            </button>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Download CV CTA */}
            <Link
              href="/resume"
              className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{t.common.downloadCV}</span>
            </Link>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Search */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Navigation overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 pt-20 pb-5 px-4 bg-white dark:bg-gray-950 overflow-y-auto lg:hidden"
          >
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-semibold ${
                    pathname === item.href
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="h-px bg-gray-200 dark:bg-gray-800 my-4" />

              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm font-medium text-gray-500">Language</span>
                <button
                  onClick={() => {
                    setLanguage(language === 'en' ? 'bn' : 'en');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === 'en' ? 'বাংলা (BN)' : 'English (EN)'}</span>
                </button>
              </div>

              <div className="pt-4 px-4">
                <Link
                  href="/resume"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md"
                >
                  <Download className="w-5 h-5" />
                  <span>{t.common.downloadCV}</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800 mt-auto no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Summary */}
          <div className="space-y-4">
            <span className="text-white font-display font-bold text-xl tracking-tight flex items-center space-x-1">
              <span>Suvo</span><span className="text-blue-500">.Dev</span>
            </span>
            <p className="text-sm leading-relaxed text-gray-400">
              Senior Full Stack Software Engineer. Crafting modular, high-performance web products and modern UI layouts.
            </p>
            <div className="flex space-x-3 text-white">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <button onClick={copyEmail} className="hover:text-blue-400 transition-colors" title="Copy Email">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-display font-semibold mb-4 text-sm uppercase tracking-wider">Quick Exploration</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/projects" className="hover:text-white transition-colors">{t.nav.projects}</Link></li>
              <li><Link href="/experience" className="hover:text-white transition-colors">{t.nav.experience}</Link></li>
              <li><Link href="/resume" className="hover:text-white transition-colors">{t.nav.resume}</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">{t.nav.blog}</Link></li>
              <li><button onClick={() => setIsNewsletterOpen(true)} className="hover:text-white transition-colors text-left">Newsletter Signup</button></li>
            </ul>
          </div>

          {/* Essential Core */}
          <div>
            <h4 className="text-white font-display font-semibold mb-4 text-sm uppercase tracking-wider">Credentials</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">Career Story</Link></li>
              <li><Link href="/skills" className="hover:text-white transition-colors">{t.nav.skills}</Link></li>
              <li><Link href="/certifications" className="hover:text-white transition-colors">{t.nav.certifications}</Link></li>
              <li><Link href="/achievements" className="hover:text-white transition-colors">{t.nav.achievements}</Link></li>
            </ul>
          </div>

          {/* Contact details */}
          <div className="space-y-3 text-sm">
            <h4 className="text-white font-display font-semibold mb-4 text-sm uppercase tracking-wider">Contact Info</h4>
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-start space-x-2">
              <Mail className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <button onClick={copyEmail} className="hover:text-white text-left font-mono">{personalInfo.email}</button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs text-green-400 font-semibold">{t.common.openOpportunities}</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs">
          <span>&copy; {new Date().getFullYear()} Suvo Dev. {t.common.allRightsReserved}.</span>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/" className="hover:text-white">Privacy Policy</Link>
            <Link href="/" className="hover:text-white">Terms of Use</Link>
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>&amp; React 19</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Buttons & Widgets */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40 no-print">
        
        {/* Scroll Back to Top */}
        <AnimatePresence>
          {isBackToTopVisible && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg focus:outline-none transition-all duration-200"
              title="Scroll back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* AI Assistant Toggle Button */}
        <button
          onClick={() => setChatOpen(!isChatOpen)}
          className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl flex items-center justify-center focus:outline-none relative transition-transform duration-200 hover:scale-105"
          title="Open AI Resume Assistant"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-900 animate-pulse-subtle"></span>
        </button>
      </div>

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {cookieConsent && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-6 max-w-sm p-4 rounded-xl glass shadow-2xl z-50 border border-white/20 no-print"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Cookie Consent</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  This website utilizes analytical tracking utilities to record recruiter engagement metrics and optimize CV delivery.
                </p>
                <div className="pt-2 flex items-center space-x-2">
                  <button
                    onClick={handleCookieAccept}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold"
                  >
                    Accept Cookies
                  </button>
                  <button
                    onClick={() => setCookieConsent(false)}
                    className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-semibold"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Newsletter Popup Modal */}
      <AnimatePresence>
        {isNewsletterOpen && (
          <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-50 no-print" onClick={() => setIsNewsletterOpen(false)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-200 dark:border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setIsNewsletterOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mx-auto">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">Subscribe to Tech Insights</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get monthly curated reports about Next.js optimizations, Full Stack workflows, and modern visual UI design blueprints.
                  </p>
                </div>

                {newsletterSubscribed ? (
                  <div className="p-4 bg-green-500/10 text-green-500 rounded-xl text-center font-semibold text-sm flex items-center justify-center space-x-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Successfully Subscribed!</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <input
                      type="email"
                      required
                      placeholder="name@organization.com"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                    <button
                      type="submit"
                      disabled={isChatLoading}
                      className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isChatLoading ? "Subscribing..." : "Subscribe Now"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 pt-20 z-50 no-print" onClick={() => setCommandPaletteOpen(false)}>
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-2 px-4 py-3.5 border-b border-gray-200 dark:border-gray-800">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <input
                  ref={commandInputRef}
                  type="text"
                  placeholder={t.common.searchPlaceholder}
                  value={commandSearch}
                  onChange={(e) => setCommandSearch(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white"
                />
                <button
                  onClick={() => setCommandPaletteOpen(false)}
                  className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 font-mono"
                >
                  ESC
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {filteredCommands.length === 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500">{t.common.noResults}</div>
                ) : (
                  <div className="space-y-1">
                    {filteredCommands.map((cmd, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          cmd.action();
                          setCommandPaletteOpen(false);
                          setCommandSearch('');
                        }}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left text-sm transition-colors text-gray-800 dark:text-gray-200"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-semibold font-mono">
                            {cmd.type}
                          </span>
                          <span>{cmd.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">⏎ Go</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AI Resume Chat Side-Drawer */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <div className="fixed inset-0 bg-black/45 z-45 no-print" onClick={() => setChatOpen(false)}></div>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-gray-950 shadow-2xl z-50 flex flex-col border-l border-gray-200 dark:border-gray-800 no-print"
            >
              
              {/* Chat Header */}
              <div className="p-4 bg-blue-600 text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm tracking-wide">Suvo&apos;s AI Assistant</h3>
                    <div className="flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                      <span className="text-[10px] text-blue-200 font-semibold">Gemini 3.5 Active</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-sm ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-800'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-3.5 rounded-tl-none border border-gray-200 dark:border-gray-800 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleChatSubmit} className="p-3 border-t border-gray-200 dark:border-gray-800 flex items-center space-x-2">
                <input
                  type="text"
                  required
                  placeholder="Ask me: What certifications does Suvo have?"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global simple Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-gray-900 text-white rounded-full text-xs font-bold shadow-2xl z-50 flex items-center space-x-2 no-print"
          >
            <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
