
import React from 'react';
import { Search, Heart } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 opacity-90 shadow-lg shadow-red-600/30"></div>
        <div className="absolute inset-0 rounded-full flex items-center justify-center">
          <Search className="w-4 h-4 text-white stroke-[3]" />
        </div>
        <div className="absolute -top-1 -right-1">
          <Heart className="w-3 h-3 text-white fill-white" />
        </div>
      </div>
      <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">FindMe.ai</span>
    </div>
  );
};

export default Logo;
