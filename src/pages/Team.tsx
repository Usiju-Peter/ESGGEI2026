import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import AnimatedSection from "../components/AnimatedSection";
import { teamData } from "../data";
import { X } from "lucide-react";
import { useSEO } from "../lib/seo";

export default function Team() {
  useSEO("Our Team", "Meet the dedicated team behind EarthSprings Global Grace Empowerment Initiative (ESGGEI) working to restore dignity and sustainable livelihood in communities.");
  const [selectedMember, setSelectedMember] = useState<typeof teamData[0] | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero 
        title="Our Team" 
        subtitle="Meet the people guiding ESGGEI’s mission of empowerment, dignity, and sustainable development."
        image="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=1200&auto=format&fit=crop&fm=webp"
      />

      <AnimatedSection>
        <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Our Core Leadership Team Members</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {teamData.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedMember(member)}
                className="flex flex-col h-full bg-white/45 backdrop-blur-sm p-6 rounded-3xl border border-primary/5 shadow-[0_12px_35px_rgba(110,142,66,0.06)] hover:border-primary/25 hover:bg-white hover:shadow-[0_25px_50px_-12px_rgba(110,142,66,0.22)] hover:-translate-y-3 hover:scale-[1.02] transition-all duration-500 ease-[0.16,1,0.3,1] cursor-pointer group"
              >
                <div className="aspect-[4/5] bg-gray-50 overflow-hidden rounded-2xl relative w-full mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-550" />
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif font-medium text-primary mb-1 group-hover:text-primary-light transition-colors duration-300">{member.name}</h3>
                  <p className="text-charcoal/50 uppercase tracking-[0.15em] text-[11px] mb-6">{member.role}</p>
                  <div className="flex-grow" />
                  <button 
                    className="text-primary group-hover:text-primary-light transition-colors text-left uppercase text-[11px] tracking-widest w-max pb-1 border-b border-primary/20 group-hover:border-primary"
                    aria-label={`Read bio of ${member.name}`}
                  >
                    Read Bio <span className="sr-only">for {member.name}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="py-32 bg-primary text-center px-4 sm:px-6 lg:px-8 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop&fm=webp')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-primary/95 relative border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white mb-8 leading-tight"
          >
            Empower communities with our team.
          </motion.h2>
          <p className="text-lg md:text-xl text-cream/70 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            Connect with our dedicated leaders and volunteers to design, fund, or execute life-changing projects in sustainable development, education, and advocacy.
          </p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center"
          >
            <Link 
              to="/partner" 
              className="bg-white hover:bg-cream text-primary px-12 py-5 rounded-full transition-all text-center text-base sm:text-lg font-medium tracking-wide shadow-md hover:scale-105 inline-block"
            >
              Join Our Efforts
            </Link>
          </motion.div>
        </div>
      </section>
      </AnimatedSection>

      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.98, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto relative z-10 rounded-2xl shadow-2xl p-8 sm:p-12 border border-gray-100"
            >
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 bg-gray-50 hover:bg-gray-100 p-2.5 rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>
              
              <div className="mb-8 text-left">
                <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-primary mb-2 tracking-tight">{selectedMember.name}</h2>
                <p className="text-charcoal/40 tracking-[0.12em] uppercase text-xs font-semibold">{selectedMember.role}</p>
                <div className="h-1 w-12 bg-primary/20 rounded mt-4" />
              </div>
              <div className="prose prose-sm sm:prose-base prose-charcoal text-left">
                {selectedMember.fullBio.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 font-light leading-relaxed text-charcoal/85">{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
