
import React from 'react';
import Navbar from '@/components/Navbar';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Cookie Policy</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">1. Introduction</h2>
              <p>This Cookie Policy explains how VibePicker ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">2. What are cookies?</h2>
              <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">3. Why do we use cookies?</h2>
              <p>We use cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our website for advertising, analytics and other purposes.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">4. Types of cookies we use</h2>
              <p>The specific types of cookies served through our website and the purposes they perform include:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Essential website cookies: These cookies are strictly necessary to provide you with services available through our website.</li>
                <li>Performance and functionality cookies: These cookies are used to enhance the performance and functionality of our website.</li>
                <li>Analytics and customization cookies: These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are.</li>
                <li>Advertising cookies: These cookies are used to make advertising messages more relevant to you.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">5. How can you control cookies?</h2>
              <p>You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">6. Updates to this Cookie Policy</h2>
              <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">7. Contact Us</h2>
              <p>If you have any questions about our use of cookies or other technologies, please contact us at privacy@vibepicker.pro.</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;
