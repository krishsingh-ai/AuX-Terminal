import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sun, Moon, Menu, Search } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';

export type NavTab = string;

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { setIsSideMenuOpen, setIsCommandOpen } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/', end: true },
    { name: 'Intelligence', path: '/intelligence' },
    { name: 'Backtest', path: '/backtest' },
    { name: 'Methodology', path: '/methodology' },
    { name: 'About Us', path: '/about' },
  ];

  const handleHamburgerClick = () => {
    setIsSideMenuOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-slate-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: AuX Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group select-none py-1"
          aria-label="AuX Terminal Home"
        >
          {/* Minimal Geometric Gold Bar SVG */}
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
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-slate-100 font-sans">
            AuX
          </span>
        </Link>

        {/* Center Navigation: 5 Tabs */}
        <nav className="hidden md:flex items-center space-x-8 h-full">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'relative h-full flex items-center text-sm font-medium transition-colors duration-150',
                  isActive
                    ? 'text-[#EAB308] dark:text-[#FBBF24] font-semibold'
                    : 'text-slate-500 hover:text-[#EAB308] dark:text-zinc-400 dark:hover:text-[#FBBF24]'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#EAB308] dark:bg-[#FBBF24] shadow-[0_0_8px_rgba(234,179,8,0.5)] dark:shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Controls: Theme Toggle, Search/Command, User, Hamburger */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg border border-slate-200 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/40 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Command Palette Trigger Badge */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 h-9 px-2.5 rounded-lg border border-slate-200 dark:border-zinc-800/80 bg-slate-50/80 dark:bg-[#18181B]/80 text-slate-600 dark:text-zinc-400 hover:text-[#EAB308] dark:hover:text-[#FBBF24] hover:border-[#EAB308]/50 dark:hover:border-[#FBBF24]/50 transition-colors cursor-pointer text-xs font-mono shrink-0 active:scale-95"
            title="Open Command Palette (Ctrl+K / ⌘K)"
            aria-label="Open command palette"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline font-semibold">
              {typeof navigator !== 'undefined' && /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent || navigator.platform)
                ? '⌘K'
                : 'Ctrl K'}
            </span>
          </button>

          {/* Hamburger Menu Button (Always visible on all breakpoints) */}
          <button
            onClick={handleHamburgerClick}
            className="w-9 h-9 rounded-lg border border-slate-200 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/40 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
            aria-label="Open menu"
            title="Menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
