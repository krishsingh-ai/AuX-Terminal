import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

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

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
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
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  instagram: string;
  fallbackAvatar?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Ananya Tiwari',
    role: 'Lead Quant Strategist',
    image: '/ananya.jpg',
    linkedin: 'https://www.linkedin.com/in/ananya-tiwari-670672366/',
    instagram: 'https://www.instagram.com/anovaire/',
    fallbackAvatar:
      'https://ui-avatars.com/api/?name=Ananya+Tiwari&background=EAB308&color=000&size=256',
  },
  {
    name: 'Krish Raj',
    role: 'Lead Architect',
    image: '/krish.jpg',
    linkedin: 'https://www.linkedin.com/in/krish-raj-951903380/',
    instagram: 'https://www.instagram.com/krisshsingh_/',
    fallbackAvatar:
      'https://ui-avatars.com/api/?name=Krish+Raj&background=EAB308&color=000&size=256',
  },
  {
    name: 'Kajal Kumari',
    role: 'Data & Systems Engineer',
    image: '/kajal.jpg',
    linkedin: 'https://www.linkedin.com/in/kajal-kumari-12205a38a/',
    instagram: 'https://www.instagram.com/kajalpandit132/',
    fallbackAvatar:
      'https://ui-avatars.com/api/?name=Kajal+Kumari&background=EAB308&color=000&size=256',
  },
];

export const Footer: React.FC = () => {
  const { setIsPrivacyModalOpen, openConsentBanner } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer className="mt-auto border-t border-slate-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-[#09090B]/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-20 sm:pb-16">
        {/* Core Development Team Section (only shown on Home page; About Us page already embeds the team in its main content) */}
        {isHome && (
          <>
            <section aria-labelledby="footer-team-heading" className="mb-14 sm:mb-16">
              <div className="space-y-2 mb-8 text-center sm:text-left">
                <h2
                  id="footer-team-heading"
                  className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                >
                  Core Development Team
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto sm:mx-0">
                  The quantitative researchers and engineers behind AuX.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                  <div
                    key={member.name}
                    className="group flex flex-col items-center sm:items-start text-center sm:text-left p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-[#121215]/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-[#EAB308]/50 dark:hover:border-amber-400/40 hover:shadow-lg dark:hover:shadow-[0_8px_25px_-4px_rgba(251,191,36,0.12)]"
                  >
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative group mb-4"
                      aria-label={`${member.name}'s LinkedIn Profile`}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        width={128}
                        height={128}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            member.fallbackAvatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=EAB308&color=000&size=256`;
                        }}
                        className="w-32 h-32 rounded-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:ring-2 group-hover:ring-amber-400"
                      />
                    </a>
                    <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
                      {member.name}
                    </h3>
                    <span className="text-xs font-mono text-amber-500 dark:text-[#FBBF24] mt-1">
                      {member.role}
                    </span>
                    <div className="flex items-center gap-3 mt-4">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-[#0A66C2] transition-colors"
                        aria-label={`${member.name} on LinkedIn`}
                      >
                        <LinkedinIcon size={18} />
                      </a>
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-[#E1306C] transition-colors"
                        aria-label={`${member.name} on Instagram`}
                      >
                        <InstagramIcon size={18} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Divider */}
            <hr className="border-t border-slate-200/80 dark:border-zinc-800/80 mb-12 sm:mb-14" />
          </>
        )}

        {/* TASK 2: Clean 4-Column Links Menu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-4 text-center sm:text-left">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 group select-none"
              aria-label="AuX Terminal Home"
            >
              <svg
                width="26"
                height="18"
                viewBox="0 0 26 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 transition-transform duration-150 group-hover:scale-105"
              >
                <polygon points="5,2 21,2 24,7 2,7" fill="#FBBF24" />
                <polygon points="2,7 24,7 21,16 5,16" fill="#D97706" />
                <polygon points="2,7 5,2 5,16" fill="#B45309" opacity="0.4" />
              </svg>
              <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white font-sans">
                AuX
              </span>
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto sm:mx-0">
              Next-generation institutional gold derivatives intelligence and deterministic spread execution.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-slate-200 dark:border-zinc-800/80 bg-white/90 dark:bg-[#121215]/90 text-zinc-700 dark:text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              MCX Production Telemetry
            </div>

            <div className="pt-1 flex justify-center sm:justify-start">
              <a
                href="https://github.com/krishsingh-ai/cdi-terminal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#121215] text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white hover:border-[#EAB308]/60 dark:hover:border-[#FBBF24]/60 hover:bg-white dark:hover:bg-zinc-800 transition-all shadow-xs group"
                aria-label="View CDI Terminal on GitHub"
              >
                <GithubIcon size={15} className="text-zinc-600 dark:text-zinc-400 group-hover:text-slate-950 dark:group-hover:text-[#FBBF24] transition-colors" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

          {/* Column 2: Project (Exactly 5 Links) */}
          <div className="space-y-3 text-center sm:text-left">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Project
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#EAB308] dark:hover:text-[#FBBF24] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/intelligence"
                  className="hover:text-[#EAB308] dark:hover:text-[#FBBF24] transition-colors"
                >
                  Intelligence
                </Link>
              </li>
              <li>
                <Link
                  to="/backtest"
                  className="hover:text-[#EAB308] dark:hover:text-[#FBBF24] transition-colors"
                >
                  Backtest
                </Link>
              </li>
              <li>
                <Link
                  to="/methodology"
                  className="hover:text-[#EAB308] dark:hover:text-[#FBBF24] transition-colors"
                >
                  Methodology
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#EAB308] dark:hover:text-[#FBBF24] transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-3 text-center sm:text-left">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <a
                  href="https://www.mcxindia.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#EAB308] dark:hover:text-[#FBBF24] transition-colors"
                >
                  MCX India
                </a>
              </li>
              <li>
                <a
                  href="https://www.sebi.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#EAB308] dark:hover:text-[#FBBF24] transition-colors"
                >
                  SEBI Guidelines
                </a>
              </li>
              <li>
                <Link
                  to="/methodology"
                  className="hover:text-[#EAB308] dark:hover:text-[#FBBF24] transition-colors"
                >
                  Mathematical Spec
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/krishsingh-ai/cdi-terminal"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#EAB308] dark:hover:text-[#FBBF24] transition-colors inline-flex items-center gap-1.5"
                >
                  <GithubIcon size={14} />
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Compliance */}
          <div className="space-y-3 text-center sm:text-left">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="hover:text-[#EAB308] dark:hover:text-[#FBBF24] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openConsentBanner}
                  className="hover:text-[#EAB308] dark:hover:text-[#FBBF24] transition-colors cursor-pointer"
                >
                  Cookie Preferences
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="hover:text-[#EAB308] dark:hover:text-[#FBBF24] transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* TASK 3: Bottom Bar with Institutional Spacing */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-500">
          <p className="text-center sm:text-left font-mono">
            © 2026 AuX Terminal. Quantitative Commodity Intelligence.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
            <a
              href="https://github.com/krishsingh-ai/cdi-terminal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#EAB308] dark:hover:text-[#FBBF24] transition-colors inline-flex items-center gap-1.5 font-mono cursor-pointer"
              aria-label="GitHub Repository"
            >
              <GithubIcon size={14} />
              <span>GitHub</span>
            </a>
            <button
              type="button"
              onClick={() => setIsPrivacyModalOpen(true)}
              className="hover:text-[#EAB308] dark:hover:text-[#FBBF24] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={openConsentBanner}
              className="hover:text-[#EAB308] dark:hover:text-[#FBBF24] transition-colors cursor-pointer"
            >
              Cookie Preferences
            </button>
            <button
              type="button"
              onClick={() => setIsPrivacyModalOpen(true)}
              className="hover:text-[#EAB308] dark:hover:text-[#FBBF24] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
