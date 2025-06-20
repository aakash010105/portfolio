import React from 'react';

const UserCard = ({ name, imgSrc, onClick, isSelected, className = '', style = {} }) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex flex-col items-center justify-start cursor-pointer transition-all duration-300
        w-48 h-70 overflow-hidden border
        ${isSelected
          ? 'border-2 border-blue-500 shadow-[0_0_12px_2px_rgba(0,255,255,0.9)] scale-105'
          : 'border-2 border-transparent hover:border-blue-500 hover:shadow-[0_0_10px_1px_rgba(0,255,255,0.6)]'
        }
        ${className}
      `}
      style={style}
    >
      {/* Image container */}
      <div className="flex-grow flex items-center justify-center w-full overflow-hidden">
        <img
          src={imgSrc}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Name container with black background */}
      <div className="w-full bg-black flex-grow relative p-10">
        <span className="absolute top-1 left-3 text-white text-lg font-medium">
          {name}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
