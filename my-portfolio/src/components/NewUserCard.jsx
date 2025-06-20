// src/components/NewUserCard.jsx
import React from 'react';

const NewUserCard = ({ name, imgSrc, onClick, isSelected, className = '', style = {} }) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center cursor-pointer
        transition-all duration-300 overflow-hidden
        bg-white/10
        backdrop-blur-sm
        border border-white/20
        shadow-lg
        hover:bg-white/20
        hover:border-white/30
        hover:shadow-xl
        w-48 
        h-[272px]
        ${isSelected
          ? 'ring-4 ring-blue-400 ring-offset-2 ring-offset-transparent scale-105'
          : ''
        }
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

      <img
        src={imgSrc}
        alt={name}
        className="object-contain mb-3 relative z-10 left-2"
        style={{ width: '150px', height: '150px' }}
      />
      <span className="text-white text-lg font-mid relative z-10 right-1">{name}</span>
    </div>
  );
};

export default NewUserCard;