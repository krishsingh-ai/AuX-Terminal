import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code2, Users, Cpu, ShieldCheck } from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { pageMotionVariants, pageMotionTransition } from '../utils/motion';

const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const About: React.FC = () => {
  useDocumentTitle('About Us | AuX Terminal');
  const teamMembers = [
    {
      name: 'Ananya Tiwari',
      role: 'Lead Quant Strategist & Frontend Engineer',
      image: '/ananya.jpg',
      linkedin: 'https://www.linkedin.com/in/ananya-tiwari-670672366/',
      instagram: 'https://www.instagram.com/anovaire/',
      fallbackAvatar:
        'https://ui-avatars.com/api/?name=Ananya+Tiwari&background=EAB308&color=000&size=256',
      focus:
        'Volatility skew mapping, pairwise spread analytics, high-density visualization, and minimalist financial interface design.',
    },
    {
      name: 'Krish Raj',
      role: 'Lead Architect & Quant Engineer',
      image: '/krish.jpg',
      linkedin: 'https://www.linkedin.com/in/krish-raj-951903380/',
      instagram: 'https://www.instagram.com/krisshsingh_/',
      fallbackAvatar:
        'https://ui-avatars.com/api/?name=Krish+Raj&background=EAB308&color=000&size=256',
      focus:
        'System architecture, cointegration z-score modeling, walk-forward simulation engine, and session surveillance cryptography.',
    },
    {
      name: 'Kajal Kumari',
      role: 'Data & Systems Engineer',
      image: '/kajal.jpg',
      linkedin: 'https://www.linkedin.com/in/kajal-kumari-12205a38a/',
      instagram: 'https://www.instagram.com/kajalpandit132/',
      fallbackAvatar:
        'https://ui-avatars.com/api/?name=Kajal+Kumari&background=EAB308&color=000&size=256',
      focus:
        'MCX exchange telemetry normalization, contract lifecycle pipelines, and regulatory transaction friction models.',
    },
  ];

  return (
    <motion.div
      variants={pageMotionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageMotionTransition}
      className="max-w-5xl mx-auto space-y-16 py-8"
    >
      {/* Hero Section */}
      <AnimateIn>
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono border border-slate-200 dark:border-zinc-800/80 bg-white/90 dark:bg-[#121215]/90 text-slate-700 dark:text-zinc-300 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
            <Users className="w-3.5 h-3.5 text-[#EAB308] dark:text-[#FBBF24]" />
            Engineering Team &amp; Mission
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            About AuX
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
            AuX was built to resolve structural pricing inefficiencies across physical gold flows and multi-tenor financial futures. Engineered with institutional rigor, the terminal bridges mathematical purity normalization with deterministic execution algorithms.
          </p>
        </div>
      </AnimateIn>

      {/* Team Section (3-Column Grid) */}
      <AnimateIn delay={0.1}>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Core Development Team
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              Quantitative researchers and software engineers behind the AuX Terminal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-7 space-y-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#EAB308]/50 dark:hover:border-[#FBBF24]/50 dark:hover:shadow-[0_10px_25px_-3px_rgba(251,191,36,0.15)] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative group/avatar cursor-pointer"
                      aria-label={`${member.name}'s LinkedIn Profile`}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        width={80}
                        height={80}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            member.fallbackAvatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=EAB308&color=000&size=256`;
                        }}
                        className="w-20 h-20 rounded-full object-cover border-2 border-slate-200 dark:border-zinc-800 transition-all duration-300 group-hover/avatar:scale-105 group-hover/avatar:border-amber-400 group-hover/avatar:ring-2 group-hover/avatar:ring-amber-400/40"
                      />
                    </a>

                    <div className="flex items-center gap-2.5">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-zinc-400 hover:text-[#0A66C2] hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                        aria-label={`${member.name} on LinkedIn`}
                      >
                        <LinkedinIcon size={18} />
                      </a>
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-zinc-400 hover:text-[#E1306C] hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                        aria-label={`${member.name} on Instagram`}
                      >
                        <InstagramIcon size={18} />
                      </a>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                      {member.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#EAB308] dark:text-[#FBBF24] font-mono">
                      {member.role}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed pt-2 border-t border-slate-200 dark:border-zinc-800/80">
                    {member.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimateIn>

      {/* HACK IN HILLS '26 — PS 03 Section */}
      <AnimateIn delay={0.15}>
        <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-8 space-y-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:border-[#EAB308]/40 dark:hover:border-[#FBBF24]/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-zinc-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-xs">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  National Hackathon Submission
                </span>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  HACK IN HILLS &apos;26 — Problem Statement 03
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] text-slate-700 dark:text-zinc-300">
                Category: Quantitative FinTech &amp; Web3
              </span>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            <p>
              Under <strong>Problem Statement 03</strong>, the objective was to engineer an institutional-grade Commodity Derivatives Intelligence Terminal capable of processing domestic Indian commodity contracts (MCX) alongside international benchmarks (COMEX).
            </p>
            <p>
              AuX solves key structural hurdles in Indian commodity markets:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <li className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24] shrink-0" />
                <span>Deterministic Walk-Forward Simulation</span>
              </li>
              <li className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24] shrink-0" />
                <span>Exchange &amp; Statutory Friction Model (CTT/GST)</span>
              </li>
              <li className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24] shrink-0" />
                <span>Purity Normalization (995 vs 999 Fineness)</span>
              </li>
              <li className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24] shrink-0" />
                <span>Institutional Client-Side Audit Surveillance</span>
              </li>
            </ul>
          </div>
        </div>
      </AnimateIn>
    </motion.div>
  );
};

export default About;
