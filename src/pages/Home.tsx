import { useState, type HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projectsData, impactData } from "../data";
import { useSEO } from "../lib/seo";
import AnimatedSection from "../components/AnimatedSection";

type StaticMotionDivProps = HTMLAttributes<HTMLDivElement> & {
  initial?: unknown;
  animate?: unknown;
  exit?: unknown;
  whileInView?: unknown;
  viewport?: unknown;
  transition?: unknown;
};

function StaticMotionDiv({ initial, animate, exit, whileInView, viewport, transition, ...props }: StaticMotionDivProps) {
  return <div {...props} />;
}

const motion = { div: StaticMotionDiv };

export default function Home() {
  useSEO("Home", "Join EarthSprings Global Grace Empowerment Initiative (ESGGEI) as we transform lives in Nigeria through empowerment programs targeting education, sustainable farming, and social welfare.");
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-32 md:pt-40 pb-20 overflow-hidden bg-primary">
        <picture className="absolute inset-0 z-0">
          <source srcSet="/images/gallery/outreach-25-home.avif" type="image/avif" />
          <img
            src="/images/gallery/outreach-25-home.webp"
            alt=""
            className="h-full w-full object-cover opacity-40 mix-blend-overlay"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-primary/70 z-0" />
        
        {/* Beautiful dynamic atmospheric ambient glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[350px] bg-primary-light/15 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[220px] bg-[#D4A84F]/12 rounded-full blur-[100px] pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center">
          <div className="max-w-4xl text-center flex flex-col items-center">
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] font-serif font-bold text-white leading-[1.1] mb-6 text-center tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]"
            >
              Empowering Lives.<br />
              <span className="text-cream/90">Restoring Hope.</span>
            </h1>
            
            <p
              className="text-lg md:text-2xl text-cream/90 mb-10 max-w-2xl leading-relaxed font-light mx-auto text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
            >
              EarthSprings Global Grace Empowerment Initiative supports vulnerable communities through education, sustainable agriculture, literacy, advocacy, and social support.
            </p>
            
            <div
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
            </div>


          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 rounded-3xl border border-primary/10 bg-cream p-8 shadow-sm md:grid-cols-[1.15fr_0.85fr] md:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">Why EarthSprings</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-primary md:text-5xl">Practical support for communities facing connected challenges.</h2>
              <p className="mt-6 text-lg leading-relaxed text-charcoal/70">Many families face barriers that overlap: children out of school, limited livelihood opportunities, low agricultural productivity, scarce resources, and social exclusion. ESGGEI works alongside communities to respond with useful, respectful support that strengthens opportunity and dignity.</p>
            </div>
            <div className="border-l-2 border-primary/20 pl-6 md:pl-8">
              <h3 className="font-serif text-2xl font-semibold text-primary">How we work</h3>
              <p className="mt-4 leading-relaxed text-charcoal/70">We listen to local priorities, resources, and gaps, then shape practical programmes around the needs of the communities we serve. Our integrated approach connects education, sustainable agriculture, literacy, advocacy, medical outreach, and social support.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link to="/projects" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark">Learn About Our Programmes</Link>
                <Link to="/partner" className="inline-flex items-center justify-center rounded-full border border-primary/20 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white">Support Our Work</Link>
              </div>
            </div>
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
            <div className="relative overflow-hidden aspect-[4/5] md:aspect-auto md:h-[600px] rounded-none md:rounded-[2rem] border border-primary/10">
              <picture className="block h-full w-full">
                <source srcSet="/images/gallery/outreach-28-home.avif" type="image/avif" />
                <img
                  src="/images/gallery/outreach-28-home.webp"
                  alt="Community members gathered during an EarthSprings outreach"
                  className="h-full w-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection placeholderHeight="250px">
        {/* 3. Mission and Vision Section */}
        <section className="border-y border-primary/15 bg-beige py-24 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-14 text-center font-serif text-4xl font-bold text-primary md:text-5xl lg:text-6xl">Our Vision &amp; Mission</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full flex-col rounded-3xl border border-primary/15 bg-white/70 p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-lg md:p-10"
              >
                <div className="mb-6">
                  <h3 className="font-serif text-3xl font-bold text-primary">Our Vision</h3>
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
                className="flex h-full flex-col rounded-3xl border border-primary/15 bg-white/70 p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-lg md:p-10"
              >
                <div className="mb-6">
                  <h3 className="font-serif text-3xl font-bold text-primary">Our Mission</h3>
                </div>
                <p className="text-charcoal/70 leading-relaxed text-lg font-light flex-grow">
                  To empower individuals and communities through education, agriculture, literacy, advocacy, and social support, with a special focus on children, women, widows, and the aged.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection placeholderHeight="280px">
        <section className="border-b border-[#8f5721] bg-[#B26F2B] py-24 md:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">Impact in Progress</h2>
            <div className="mt-12 rounded-3xl border border-white/25 bg-cream/95 p-8 shadow-[0_18px_45px_rgba(61,31,8,0.18)] md:p-12">
              <h3 className="font-serif text-3xl font-semibold text-primary md:text-4xl">A community outreach built around dignity.</h3>
              <p className="mt-6 text-lg leading-relaxed text-charcoal/70">At the Integrated Agriculture &amp; Medical Outreach in Guruku Gbayi Community, Karu LGA, Nasarawa State, ESGGEI brought community members, volunteers, and health workers together for registration, health screening, care, and support. The outreach reflects what makes our approach distinct: connected services, community participation, and practical action that responds to real needs.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/gallery" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark">View Outreach Photos</Link><Link to="/blog" className="inline-flex items-center justify-center rounded-full border border-primary/20 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white">Read Our Story</Link></div>
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

      <AnimatedSection placeholderHeight="360px">
        <section className="bg-white py-24 md:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">Questions and answers</p><h2 className="mt-4 font-serif text-4xl font-semibold text-primary md:text-5xl">How you can take part.</h2></div>
            <div className="mt-12 divide-y divide-primary/10 rounded-3xl border border-primary/10 bg-cream">
              {[
                ['What does ESGGEI do?', 'ESGGEI supports vulnerable communities through education, sustainable agriculture, literacy, advocacy, and social support.'],
                ['How are programmes shaped for communities?', 'We listen to local priorities, resources, and gaps, then shape practical programmes around the needs of the communities we serve.'],
                ['How can I support ESGGEI?', 'You can support ESGGEI by partnering, volunteering, sharing expertise, advocating for our work, or making a donation.'],
                ['Where does ESGGEI work?', 'ESGGEI works with vulnerable and marginalised communities in Nigeria through locally shaped education, livelihood, advocacy, and social support programmes.'],
                ['Can organisations partner with ESGGEI?', 'Yes. Organisations can partner through funding, technical expertise, volunteering, advocacy, or in-kind support aligned with community priorities.'],
                ['How can I stay connected to ESGGEI?', 'Follow our stories, outreach updates, and project news through the website, gallery, blog, and social channels.'],
              ].map(([question, answer]) => <details key={question} className="group p-6 md:p-7"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl font-semibold text-primary [&::-webkit-details-marker]:hidden">{question}<span className="text-2xl font-light text-primary-light transition-transform group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl leading-relaxed text-charcoal/70">{answer}</p></details>)}
            </div>
          </div>
        </section>
      </AnimatedSection>

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
