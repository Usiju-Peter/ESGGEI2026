import * as React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import PageHero from "../components/PageHero";
import { Mail, Phone, Globe, CheckCircle2, Facebook, Instagram, Linkedin, CreditCard, Copy, Check } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import { useSEO } from "../lib/seo";

export default function Partner() {
  useSEO("Contact Us & Partners", "Get in touch with EarthSprings Global Grace Empowerment Initiative (ESGGEI) to partner, volunteer, donate, or learn more about our mission in Nigeria.");
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("success");
    setTimeout(() => setFormStatus("idle"), 5000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero 
        title="Contact Us" 
        subtitle="We would love to hear from partners, volunteers, donors, and organizations ready to build lasting impact."
        image="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop&fm=webp"
      />

      <AnimatedSection>
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-6"
            >
              <h2 className="sr-only">Contact Channels</h2>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start space-x-4"
              >
                <div className="bg-primary/5 p-3 rounded-2xl text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-primary mb-1 text-lg">Email Us</h3>
                  <a href="mailto:esgeei@gmail.com" className="text-charcoal/70 hover:text-primary transition-colors">esgeei@gmail.com</a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start space-x-4"
              >
                <div className="bg-primary/5 p-3 rounded-2xl text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-primary mb-1 text-lg">Call Us</h3>
                  <a href="tel:08064676210" className="text-charcoal/70 hover:text-primary transition-colors">0806 467 6210</a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start space-x-4"
              >
                <div className="bg-primary/5 p-3 rounded-2xl text-primary">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-primary mb-1 text-lg">Website</h3>
                  <a href="https://www.esggei.org.ng/" target="_blank" rel="noreferrer" className="text-charcoal/70 hover:text-primary transition-colors">www.esggei.org.ng</a>
                </div>
              </motion.div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-serif font-bold text-primary mb-4 text-lg">Quick Contact</h3>
                <div className="space-y-3">
                  <a href="tel:08064676210" className="w-full flex items-center justify-center space-x-2 bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors">
                    <Phone size={18} />
                    <span>Call ESGGEI</span>
                  </a>
                  <a href="mailto:esgeei@gmail.com" className="w-full flex items-center justify-center space-x-2 border border-primary text-primary py-3 rounded-xl font-medium hover:bg-primary/5 transition-colors">
                    <Mail size={18} />
                    <span>Email ESGGEI</span>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              {formStatus === "success" ? (
                <div className="bg-white p-12 rounded-3xl shadow-lg border border-gray-100 h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">Thank you for reaching out.</h3>
                  <p className="text-charcoal/70 max-w-md">ESGGEI will get back to you soon. We appreciate your interest in our mission.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 space-y-6">
                  <h3 className="sr-only">Inquiry Form</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullname" className="block text-sm font-medium text-charcoal mb-2">Full Name</label>
                      <input id="fullname" required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50/50" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
                      <input id="email" required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50/50" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">Phone Number</label>
                      <input id="phone" required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50/50" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">Subject</label>
                      <input id="subject" required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50/50" />
                    </div>
                  </div>
      
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">Message</label>
                    <textarea id="message" required rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50/50"></textarea>
                  </div>
      
                  <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-4 rounded-xl transition-colors">
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* Donation Accounts and Social Connect */}
      <AnimatedSection>
      <section className="py-24 bg-white border-t border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Left Column: Direct Donations */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-serif font-bold text-primary mb-3">Support Our Work</h2>
                <p className="text-charcoal/70 leading-relaxed font-light">
                  Direct financial support enables us to buy seeds, build learning kits, and fund daily outreach programs across Nigeria. Every amount count toward restoring hope.
                </p>
              </div>

              <div className="space-y-6">
                {/* Bank Account */}
                <div className="border border-primary/15 rounded-3xl p-8 bg-[#fdfcf7] hover:shadow-md transition-shadow relative overflow-hidden flex flex-col gap-6">
                  {/* Subtle decorative background graphic */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                  
                  <div>
                    <div className="bg-primary/10 w-max p-2.5 rounded-2xl text-primary mb-6">
                      <CreditCard size={20} />
                    </div>
                    <span className="text-xs uppercase tracking-[0.15em] text-primary/60 font-semibold block mb-5">Donation Account Details</span>
                    <div className="space-y-4 text-base">
                      <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-gray-100 pb-3 gap-2">
                        <span className="text-charcoal/40 font-semibold uppercase tracking-wider text-xs w-24 shrink-0">Bank</span>
                        <span className="text-primary font-serif font-semibold text-lg">Fidelity Bank</span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-gray-100 pb-3 gap-2">
                        <span className="text-charcoal/40 font-semibold uppercase tracking-wider text-xs w-24 shrink-0">Name</span>
                        <span className="text-charcoal/80 font-medium font-serif leading-tight">Earthsprings Global Empowerment Initiative</span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-baseline pb-1 gap-2">
                        <span className="text-charcoal/40 font-semibold uppercase tracking-wider text-xs w-24 shrink-0">Account</span>
                        <span className="font-mono text-primary font-bold text-xl tracking-wider select-all">5601549746</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-5 mt-2">
                    <button 
                      onClick={() => handleCopy("5601549746")}
                      className="w-full py-4 px-6 bg-primary hover:bg-primary-light text-white rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center justify-center space-x-2 shadow-sm active:scale-95"
                    >
                      {copiedText === "5601549746" ? (
                        <>
                          <Check size={14} className="text-white animate-fade-in" />
                          <span>Copied Account Number!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Account Details</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Social Media Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-3xl font-serif font-bold text-primary mb-3">Follow Our Journey</h2>
                <p className="text-charcoal/70 leading-relaxed font-light">
                  We post direct updates from our empowerment missions, field surveys, and community gatherings. Connect with us on social media to participate in campaigns and advocacy efforts.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 my-2">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-6 bg-[#1877F2]/5 hover:bg-[#1877F2]/10 border border-transparent hover:border-[#1877F2]/30 rounded-2xl flex flex-col items-center justify-center text-center transition-all group scale-100 hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform">
                    <Facebook size={22} fill="currentColor" stroke="none" />
                  </div>
                  <span className="font-serif font-bold text-primary block text-base md:text-lg">Facebook</span>
                </a>

                <a 
                  href="https://www.instagram.com/esggei/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-6 bg-gradient-to-tr from-[#f9ce34]/5 via-[#ee2a7b]/5 to-[#6228d7]/5 hover:from-[#f9ce34]/10 hover:via-[#ee2a7b]/10 hover:to-[#6228d7]/10 border border-transparent hover:border-[#ee2a7b]/30 rounded-2xl flex flex-col items-center justify-center text-center transition-all group scale-100 hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform">
                    <Instagram size={22} />
                  </div>
                  <span className="font-serif font-bold text-primary block text-base md:text-lg">Instagram</span>
                </a>

                <a 
                  href="https://www.linkedin.com/in/earthsprings-global-grace-empowerment-initiative-esggei-aa132537b/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-6 bg-[#0077B5]/5 hover:bg-[#0077B5]/10 border border-transparent hover:border-[#0077B5]/30 rounded-2xl flex flex-col items-center justify-center text-center transition-all group scale-100 hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#0077B5] text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform">
                    <Linkedin size={22} fill="currentColor" stroke="none" />
                  </div>
                  <span className="font-serif font-bold text-primary block text-base md:text-lg">LinkedIn</span>
                </a>

                <a 
                  href="https://x.com/esggei" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-6 bg-charcoal/5 hover:bg-charcoal/10 border border-transparent hover:border-charcoal/30 rounded-2xl flex flex-col items-center justify-center text-center transition-all group scale-100 hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 rounded-full bg-charcoal text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <span className="font-serif font-bold text-primary block text-base md:text-lg">X (Twitter)</span>
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      </AnimatedSection>

    </div>
  );
}
