import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';
import { snappyEase } from '../../utils/motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 dark:from-amber-500 dark:to-[#EAB308] dark:hover:from-amber-400 dark:hover:to-amber-500 text-slate-900 font-semibold shadow-sm border border-amber-400/40 dark:border-amber-300/30 [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.35),0_1px_3px_rgba(0,0,0,0.15)]',
    secondary:
      'bg-white dark:bg-[#18181B] text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-zinc-800/80 hover:bg-slate-50 dark:hover:bg-zinc-800/80 [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.05)] dark:[box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.4)]',
    outline:
      'bg-transparent text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-zinc-800/80 hover:bg-slate-50 dark:hover:bg-zinc-900',
    ghost:
      'bg-transparent text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-zinc-800/60',
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: snappyEase }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;
