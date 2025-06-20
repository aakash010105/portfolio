import React from 'react';
import { motion } from 'framer-motion';

const SelectableBox = ({ label, isSelected, onClick, animationDone }) => {
  const scale = animationDone && isSelected ? 1.3 : 1;
  const margin = isSelected ? 'mx-[20px]' : 'mx-[-7px]'; // wider margin for scaled-up box

  return (
    <motion.div
      onClick={onClick}
      animate={{ scale, y: 0, opacity: 1 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
      initial={false}
      className={`
        p-[1px]
        ${margin}
        transition-all
        ${animationDone && isSelected ? 'ring-1 ring-cyan-300 shadow-[0_0_15px_2px_rgba(0,191,255,0.9)]' : ''}
      `}
    >
      <div
        className={`
          w-40 h-40 flex items-center justify-center cursor-pointer text-black whitespace-nowrap transition-all
          ${animationDone && isSelected ? 'bg-white' : 'bg-gray-200 shadow-md'}
        `}
      >
        {label}
      </div>
    </motion.div>
  );
};

export default SelectableBox;
