
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-6 h-6">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400 opacity-80"></div>
        <div className="absolute inset-[2px] bg-background rounded-full"></div>
        <div className="absolute inset-[5px] rounded-t-full bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400 rotate-45"></div>
      </div>
      <span className="font-bold text-lg tracking-tight">lovable</span>
    </div>
  );
};

export default Logo;
