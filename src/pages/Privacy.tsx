
import React from 'react';
import Navbar from '@/components/Navbar';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Privacy Policy</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">1. Introduction</h2>
              <p>Welcome to VibePicker. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">2. Data Collection</h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you including your name, email address, preferences, and other information you provide when using our service.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">3. How We Use Your Data</h2>
              <p>We use your data to provide you with personalized services, improve our platform, communicate with you, and ensure the security of our services.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">4. Data Sharing</h2>
              <p>We may share your data with service providers who assist us in delivering our services, when required by law, or with your consent.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">5. Data Security</h2>
              <p>We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">6. Your Rights</h2>
              <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to access, correct, erase, restrict, and object to processing of your personal data.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">7. Changes to This Policy</h2>
              <p>We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">8. Contact Us</h2>
              <p>If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@vibepicker.pro.</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
