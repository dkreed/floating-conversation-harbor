
import React from 'react';
import { Heart, Webcam } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8">
        {/* Main background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 via-red-600 to-red-700 opacity-90 shadow-lg shadow-red-600/40"></div>
        
        {/* Inner circle */}
        <div className="absolute inset-[2px] rounded-full bg-background/80"></div>
        
        {/* Webcam icon - Fixed padding */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Webcam className="w-4 h-4 text-red-500" strokeWidth={2.5} />
        </div>
        
        {/* Heart */}
        <div className="absolute -top-1 -right-1">
          <Heart className="w-3 h-3 text-white fill-red-400" />
        </div>
      </div>
      <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-pink-400 to-red-600 bg-clip-text text-transparent">VibePicker</span>
    </div>
  );
};

export default Logo;
