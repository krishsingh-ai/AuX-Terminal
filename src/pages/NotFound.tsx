import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';
import Button from '../components/ui/Button';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { pageMotionVariants, pageMotionTransition } from '../utils/motion';

export const NotFound: React.FC = () => {
  useDocumentTitle('404 Not Found | AuX Terminal');

  return (
    <motion.div
      variants={pageMotionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageMotionTransition}
      className="min-h-[calc(100vh-220px)] flex items-center justify-center py-12 px-4"
    >
      <AnimateIn className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 md:p-12 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#EAB308] dark:text-[#FBBF24] block select-none">
              404
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Route not found on the AuX Terminal.
            </h1>
          </div>

          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            The requested page does not exist. Return to the terminal to continue your analysis.
          </p>

          <div className="pt-2">
            <Link to="/">
              <Button variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </AnimateIn>
    </motion.div>
  );
};

export default NotFound;
