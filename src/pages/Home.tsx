import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { projectsData, impactData, teamData } from "../data";
import { useSEO } from "../lib/seo";
import AnimatedSection from "../components/AnimatedSection";

export default function Home() {
  useSEO("Home", "Join EarthSprings Global Grace Empowerment Initiative (ESGGEI) as we transform lives in Nigeria through empowerment programs targeting education, sustainable farming, and social welfare.");
  const [selectedMember, setSelectedMember] = useState<typeof teamData[0] | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-32 md:pt-40 pb-20 overflow-hidden bg-primary">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 8, ease: "linear" }}
        >
          <picture>
            <source srcSet="/images/hero.avif" type="image/avif" media="(min-width: 800px)" />
            <source srcSet="/images/hero-800.avif" type="image/avif" />
            <source srcSet="/images/hero.webp" type="image/webp" media="(min-width: 800px)" />
            <source srcSet="/images/hero-800.webp" type="image/webp" />
            <img 
              src="/images/hero.jpg" 
              alt="" /* Presentational image is decorative for screen readers since heading text follows */
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </motion.div>
        <div className="absolute inset-0 bg-primary/70 z-0" />
        
        {/* Beautiful dynamic atmospheric ambient glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[350px] bg-primary-light/15 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[220px] bg-[#D4A84F]/12 rounded-full blur-[100px] pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center">
          <div className="max-w-4xl text-center flex flex-col items-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] font-serif font-bold text-white leading-[1.1] mb-6 text-center tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]"
            >
              Empowering Lives.<br />
              <span className="text-cream/90">Restoring Hope.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-lg md:text-2xl text-cream/90 mb-10 max-w-2xl leading-relaxed font-light mx-auto text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
            >
              EarthSprings Global Grace Empowerment Initiative supports vulnerable communities through education, sustainable agriculture, literacy, advocacy, and social support.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                to="/projects" 
                className="bg-primary-light hover:bg-[#7a9d4a] text-white px-8 py-4 rounded-full text-lg transition-colors flex items-center justify-center group"
              >
                Explore Our Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/partner" 
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full text-lg transition-colors text-center"
              >
                Partner With Us
              </Link>
            </motion.div>


          </div>
        </div>
      </section>

      {/* 2. About Preview Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center group">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group-hover:translate-x-2 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-primary mb-8 leading-tight">
                Rooted in compassion.<br />Growing lasting change.
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-8 text-lg font-light">
                EarthSprings Global Grace Empowerment Initiative is a non-profit, non-governmental organization committed to transforming lives through practical empowerment programs for vulnerable and marginalized communities. We work across education, agriculture, literacy, advocacy, and social support to help children learn, women thrive, and families build sustainable livelihoods.
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center text-primary-light hover:text-primary transition-colors group/link uppercase tracking-widest text-sm"
              >
                Learn About ESGGEI
                <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden aspect-[4/5] md:aspect-auto md:h-[600px] rounded-none md:rounded-[2rem] group"
            >
              <picture>
                <source srcSet="/images/hero.avif" type="image/avif" media="(min-width: 800px)" />
                <source srcSet="/images/hero-800.avif" type="image/avif" />
                <source srcSet="/images/hero.webp" type="image/webp" media="(min-width: 800px)" />
                <source srcSet="/images/hero-800.webp" type="image/webp" />
                <img 
                  src="/images/hero.jpg" 
                  alt="Community Outreach" 
                  className="w-full h-full object-cover transition-all duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-103"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/hero.jpg";
                  }}
                />
              </picture>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatedSection placeholderHeight="250px">
        {/* 3. Mission and Vision Section */}
        <section className="py-32 bg-beige">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col p-10 h-full rounded-3xl border border-primary/10 bg-white/50 backdrop-blur-sm shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow duration-500"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-serif font-semibold text-primary">Our Vision</h3>
                </div>
                <p className="text-charcoal/70 leading-relaxed text-lg font-light flex-grow">
                  To build a society where every child learns, every woman thrives, and every vulnerable life is empowered to reach its full potential.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="flex flex-col p-10 h-full rounded-3xl border border-primary/10 bg-white/50 backdrop-blur-sm shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow duration-500"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-serif font-semibold text-primary">Our Mission</h3>
                </div>
                <p className="text-charcoal/70 leading-relaxed text-lg font-light flex-grow">
                  To empower individuals and communities through education, agriculture, literacy, advocacy, and social support, with a special focus on children, women, widows, and the aged.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection placeholderHeight="300px">
        {/* 4. Projects Preview Section */}
        <section className="py-24 bg-primary relative overflow-hidden">
          {/* Decorative elements to add texture and depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
          <div className="absolute -left-64 -bottom-64 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-white">Our Core Project Areas</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 text-left">
              {projectsData.slice(0, showAllProjects ? 6 : 3).map((prog, idx) => (
                <motion.div
                  key={prog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group cursor-pointer"
                >
                  <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-8 h-full rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.15)] hover:bg-white/10 hover:border-white/20 hover:shadow-[0_25px_50px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition-all duration-500">
                    <h3 className="text-xl font-serif font-medium text-white mb-4 leading-snug">{prog.title}</h3>
                    <p className="text-cream/70 mb-8 font-light leading-relaxed group-hover:text-cream/90 transition-colors duration-500">{prog.shortDescription}</p>
                    <Link to={prog.href} className="text-cream hover:text-white text-sm uppercase tracking-widest border-b border-cream/20 hover:border-white pb-1 transition-all">
                      Learn More <span className="sr-only">about {prog.title}</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="border border-white/20 text-white hover:bg-white hover:text-primary px-10 py-4 rounded-full transition-all uppercase tracking-widest text-sm font-medium hover:scale-105 shadow-sm active:scale-95"
              >
                {showAllProjects ? "View Less" : "View All Projects"}
              </button>
            </div>
          </motion.div>
        </section>
      </AnimatedSection>

      <AnimatedSection placeholderHeight="300px">
        {/* 7. Leadership Section */}
        <section className="py-24 bg-cream border-t border-primary/20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-primary mb-16">Meet the people behind the mission.</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-16 text-left">
              {teamData.slice(0, 3).map((member, idx) => (
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
                      decoding="async"
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
            <div>
              <Link to="/team" className="border border-primary/20 text-primary hover:bg-primary hover:text-white px-10 py-4 rounded-full transition-colors inline-block uppercase tracking-widest text-sm">
                Meet Our Team
              </Link>
            </div>
          </motion.div>
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
                <h3 className="text-3xl sm:text-4xl font-serif font-semibold text-primary mb-2 tracking-tight">{selectedMember.name}</h3>
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



      {/* Final CTA */}
      <section className="py-32 bg-primary text-center px-4 sm:px-6 lg:px-8 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=70&w=800&auto=format&fit=crop&fm=webp')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-primary/95 relative border-t border-white/10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-4xl mx-auto text-white"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-semibold mb-8 leading-tight text-white">Let’s build sustainable, equitable, and thriving communities.</h2>
          <p className="text-lg md:text-xl text-cream/70 mb-12 leading-relaxed font-light max-w-2xl mx-auto">Your support can help provide education, agricultural training, social support, and hope to vulnerable lives across Nigeria.</p>
          <div className="flex justify-center">
            <Link 
              to="/partner" 
              className="bg-white text-primary hover:bg-cream px-12 py-5 rounded-full transition-all text-center text-base sm:text-lg font-medium tracking-wide shadow-md hover:scale-105 inline-block"
            >
              Partner With Us
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
