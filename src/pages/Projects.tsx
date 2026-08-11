import { motion } from "motion/react";
import PageHero from "../components/PageHero";
import AnimatedSection from "../components/AnimatedSection";
import { projectsData } from "../data";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "../lib/seo";

export default function Projects() {
  useSEO("Our Projects", "Discover the practical initiatives of EarthSprings Global Grace Empowerment Initiative (ESGGEI) aimed at empowering communities and restoring hope through sustainable development projects in Nigeria.");
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero 
        title="Our Projects" 
        subtitle="Practical initiatives designed to empower communities, improve livelihoods, and restore hope."
        image="/images/gallery/outreach-01.webp"
      />

      {projectsData.map((prog, idx) => {
        const isCream = idx % 2 === 0;
        return (
          <AnimatedSection key={prog.id}>
          <section
            id={prog.id}
            className={`py-24 lg:py-32 ${isCream ? "bg-cream" : "bg-white"} border-b-[3px] border-primary/15 relative overflow-hidden`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col md:flex-row gap-12 lg:gap-24 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`w-full md:w-1/2 overflow-hidden bg-gray-100 group relative aspect-[4/5] md:aspect-auto md:h-[600px] rounded-3xl transition-all duration-500 ${
                  idx === 0 
                    ? 'shadow-[0_20px_50px_rgba(212,168,79,0.15)] ring-2 ring-[#D4A84F]/30 hover:shadow-[0_30px_60px_rgba(212,168,79,0.25)]' 
                    : 'shadow-[0_15px_35px_rgba(110,142,66,0.08)] hover:shadow-[0_25px_45px_rgba(110,142,66,0.15)]'
                }`}>
                  <img 
                    src={prog.image} 
                    alt={prog.title} 
                    className="w-full h-full object-cover transition-all duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-103"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                       (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=1000&auto=format&fit=crop&fm=webp`;
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 py-8 relative">
                  <div className="flex items-center space-x-4 mb-6 relative z-10">
                    <div className={`h-[3px] w-16 transition-all ${idx === 0 ? 'bg-[#D4A84F]' : 'bg-primary-light'}`} />
                    <span className={`font-sans font-black text-sm md:text-base uppercase tracking-[0.3em] transition-colors ${idx === 0 ? 'text-[#D4A84F]' : 'text-primary-light'}`}>
                      Project {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-8 leading-tight relative z-10">{prog.title}</h2>
                  <p className="text-charcoal/70 text-lg leading-relaxed mb-10 font-light relative z-10">{prog.description}</p>
                  
                  <div className="mb-12 relative z-10">
                    <h3 className="font-sans font-semibold text-primary/60 text-xs uppercase tracking-widest mb-6 border-b border-primary/20 pb-2">Key Activities</h3>
                    <ul className="space-y-4">
                      {prog.keyActivities.map((act, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-primary-light mr-4 mt-0.5 flex-shrink-0 stroke-1" />
                          <span className="text-charcoal/80 font-light">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 mb-12 relative z-10">
                    <div className="border-l-2 border-primary/20 pl-4">
                      <span className="font-semibold text-primary/50 text-xs uppercase tracking-widest block mb-2">Target Group</span>
                      <span className="text-charcoal/80 font-serif text-lg">{prog.supports}</span>
                    </div>
                    <div className="border-l-2 border-primary/20 pl-4">
                      <span className="font-semibold text-primary/50 text-xs uppercase tracking-widest block mb-2">Desired Impact</span>
                      <span className="text-charcoal/80 font-serif text-lg">{prog.expectedImpact}</span>
                    </div>
                  </div>

                  <Link 
                    to="/partner" 
                    className="inline-flex items-center text-primary-light hover:text-primary transition-all group uppercase tracking-widest text-sm relative z-10 font-semibold"
                  >
                    Support This Project <span className="sr-only">({prog.title})</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 w-4 h-4 group-hover:translate-x-1.5 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
          </AnimatedSection>
        );
      })}

      <AnimatedSection>
      <section className="py-32 bg-primary text-center px-4 sm:px-6 lg:px-8 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop&fm=webp')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-primary/95 relative border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white mb-8 leading-tight"
          >
            Create lasting change today.
          </motion.h2>
          <p className="text-lg md:text-xl text-cream/70 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            Whether through sponsorship, active partnership, or shared expertise, your involvement can drive real and measurable impact in rural and underserved areas.
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
               Get Involved
             </Link>
          </motion.div>
        </div>
      </section>
      </AnimatedSection>
    </div>
  );
}
