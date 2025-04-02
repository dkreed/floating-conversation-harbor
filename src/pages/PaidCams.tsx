
import React from 'react';
import Navbar from '@/components/Navbar';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaidCams = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[5%] w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <Navbar />
      
      <section className="pt-24 pb-16 px-4 md:px-8 max-w-4xl mx-auto relative z-10">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
        
        <div className="glass-panel rounded-xl p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Top Paid Cams Reviewed</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg">Comprehensive reviews of premium webcam services with paid features.</p>
            
            {/* Content would go here */}
            <div className="rounded-lg bg-background/50 p-6 border border-red-900/10">
              <p>Content coming soon!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaidCams;
