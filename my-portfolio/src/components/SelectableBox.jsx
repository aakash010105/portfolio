import React from 'react';
import { motion } from 'framer-motion';

const SelectableBox = ({ title, image, isSelected, onClick, animationDone }) => {
  const scale = animationDone && isSelected ? 1.3 : 1;
  const margin = isSelected ? 'mx-[20px]' : 'mx-[-7px]';

  return (
    <motion.div
      onClick={onClick}
      animate={{ scale, opacity: 1 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      initial={false}
      className={`
        p-[1px]
        ${margin}
        cursor-pointer
        ${animationDone && isSelected ? 'ring-1 ring-cyan-300 shadow-[0_0_15px_2px_rgba(0,191,255,0.9)]' : ''}
      `}
    >
      <div className="relative w-40 h-40 overflow-hidden bg-black">
        {/* Image */}
        <img
          src={image}
          alt={title}
          className={`
            w-full h-full object-cover transition-transform duration-300
            ${isSelected ? 'scale-105' : 'scale-100'}
          `}
        />

        {/* Overlay title */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm px-2 py-1">
          {title}
        </div>
      </div>
    </motion.div>
  );
};

export default SelectableBox;
