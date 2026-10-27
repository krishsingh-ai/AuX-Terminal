import React from 'react';
import { motion } from 'framer-motion';
import { snappyEase } from '../../utils/motion';

export interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const AnimateIn: React.FC<AnimateInProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, ease: snappyEase, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateIn;
