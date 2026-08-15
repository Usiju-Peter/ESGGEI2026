import { useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import PageHero from "../components/PageHero";
import AnimatedSection from "../components/AnimatedSection";
import { Link } from "react-router-dom";
import { useSEO } from "../lib/seo";
import { teamData } from "../data";

export default function About() {
  const [selectedMember, setSelectedMember] = useState<typeof teamData[0] | null>(null);
  useSEO("About Us", "Learn about EarthSprings Global Grace Empowerment Initiative (ESGGEI), our identity, story, vision, and mission to empower vulnerable communities through sustainable development.");
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero 
        title="About Us" 
        subtitle="We exist to empower vulnerable lives through education, agriculture, literacy, advocacy, and social support."
        image="/images/gallery/outreach-24.webp"
      />

      <AnimatedSection>
        <section className="py-24 lg:py-32 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-primary/50 text-[11px] uppercase tracking-[0.2em] mb-4 block font-semibold">Our Identity</span>
                <h2 className="text-4xl font-serif font-semibold text-primary mb-8 leading-tight">Who We Are</h2>
                <p className="text-charcoal/70 leading-relaxed text-lg font-light">
                  EarthSprings Global Grace Empowerment Initiative is a non-profit, non-governmental organization committed to transforming lives through empowerment programs that target vulnerable and marginalized populations. Our mission is rooted in promoting access to education, sustainable farming, gender equity, and social welfare for underserved communities across Nigeria and beyond.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-primary/50 text-[11px] uppercase tracking-[0.2em] mb-4 block font-semibold">Our Origin</span>
                <h2 className="text-4xl font-serif font-semibold text-primary mb-8 leading-tight">Our Story</h2>
                <p className="text-charcoal/70 leading-relaxed text-lg font-light">
                  Across Nigeria’s rural communities, many families carry deep potential but face barriers such as poor access to education, low agricultural productivity, economic instability, limited resources, and social exclusion. ESGGEI was created to respond to these challenges with practical, compassionate, and sustainable interventions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection placeholderHeight="300px">
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
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-550" />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl font-serif font-medium text-primary mb-1 group-hover:text-primary-light transition-colors duration-300">{member.name}</h3>
                    <p className="text-charcoal/70 uppercase tracking-[0.15em] text-[11px] mb-6">{member.role}</p>
                    <div className="flex-grow" />
                    <button className="text-primary group-hover:text-primary-light transition-colors text-left uppercase text-[11px] tracking-widest w-max pb-1 border-b border-primary/20 group-hover:border-primary" aria-label={`Read bio of ${member.name}`}>
                      Read Bio <span className="sr-only">for {member.name}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <Link to="/team" className="border border-primary/20 text-primary hover:bg-primary hover:text-white px-10 py-4 rounded-full transition-colors inline-block uppercase tracking-widest text-sm">Meet Our Team</Link>
          </motion.div>
        </section>
      </AnimatedSection>

      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} onClick={() => setSelectedMember(null)} className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.98, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto relative z-10 rounded-2xl shadow-2xl p-8 sm:p-12 border border-gray-100">
            <button onClick={() => setSelectedMember(null)} className="absolute top-6 right-6 bg-gray-50 hover:bg-gray-100 p-2.5 rounded-full transition-colors z-20"><X className="w-5 h-5 text-charcoal" /></button>
            <div className="mb-8 text-left"><h3 className="text-3xl sm:text-4xl font-serif font-semibold text-primary mb-2 tracking-tight">{selectedMember.name}</h3><p className="text-charcoal/40 tracking-[0.12em] uppercase text-xs font-semibold">{selectedMember.role}</p><div className="h-1 w-12 bg-primary/20 rounded mt-4" /></div>
            <div className="prose prose-sm sm:prose-base prose-charcoal text-left">{selectedMember.fullBio.split('\n\n').map((paragraph, i) => <p key={i} className="mb-4 font-light leading-relaxed text-charcoal/85">{paragraph}</p>)}</div>
          </motion.div>
        </div>
      )}

      <AnimatedSection>
        <section className="border-t border-primary/10 bg-white py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">How we work</span>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-primary md:text-5xl">Practical change, shaped with communities.</h2>
              <p className="mt-6 text-lg leading-relaxed text-charcoal/70">Our programmes connect people to useful knowledge, supportive relationships, and opportunities they can carry forward. We listen first, work with local partners, and adapt our support to the context of each community.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                ['Community-led', 'Local voices help define priorities, strengthen trust, and guide the solutions we support.'],
                ['Connected support', 'Education, livelihoods, advocacy, and social care work together because community needs rarely stand alone.'],
                ['Built to last', 'We focus on practical skills, shared ownership, and sustainable approaches that can continue beyond a single intervention.'],
              ].map(([title, text]) => <div key={title} className="border-l-2 border-primary/20 pl-6"><h3 className="font-serif text-2xl font-semibold text-primary">{title}</h3><p className="mt-3 leading-relaxed text-charcoal/70">{text}</p></div>)}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="py-32 bg-white border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                {/* Vision Section */}
                <div className="w-full">
                  <span className="text-xs uppercase tracking-[0.35em] text-primary-light font-bold block mb-4">The Blueprint</span>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary mb-8 tracking-tight">
                    Our Vision
                  </h2>
                  <p className="text-primary/95 text-2xl md:text-4xl lg:text-[2.8rem] font-serif leading-relaxed font-normal tracking-tight max-w-4xl mx-auto">
                    “To build a society where every child learns, every woman thrives, and every vulnerable life is empowered to reach its full potential.”
                  </p>
                </div>

                {/* Solid Thick Divider */}
                <div className="h-[2px] bg-primary/25 w-full my-20" />

                {/* Mission Section */}
                <div className="w-full">
                  <span className="text-xs uppercase tracking-[0.35em] text-primary-light font-bold block mb-4">The Commitment</span>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary mb-8 tracking-tight">
                    Our Mission
                  </h2>
                  <p className="text-primary/95 text-2xl md:text-4xl lg:text-[2.8rem] font-serif leading-relaxed font-normal tracking-tight max-w-4xl mx-auto">
                    “To empower individuals and communities through education, agriculture, literacy, advocacy, and social support, with a special focus on children, women, widows, and the aged.”
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="py-24 lg:py-32 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Our Aims and Objectives</h2>
              <p className="text-charcoal/70 max-w-2xl mx-auto text-lg font-light">Strategic pillars guiding our day-to-day initiatives and community programs.</p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Community and Agriculture",
                  desc: "Empower vulnerable and marginalized groups through sustainable initiatives in education, agriculture, and community development."
                },
                {
                  title: "Literacy and Gender Equity",
                  desc: "Promote literacy, self-reliance, and gender equity among disadvantaged populations."
                },
                {
                  title: "Targeted Social Support",
                  desc: "Improve the well-being of out-of-school children, widows, the aged, and the girl child through targeted intervention programs."
                }
              ].map((aim, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/70 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 hover:bg-white hover:border-primary/25 hover:shadow-[0_12px_30px_rgba(110,142,66,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 relative group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/8 transition-colors duration-300" />
                  <span className="text-sm font-sans tracking-[0.2em] text-primary-light/65 font-bold">0{idx + 1}</span>
                  <h3 className="text-xl font-serif font-semibold text-primary">{aim.title}</h3>
                  <p className="text-charcoal/70 leading-relaxed font-light text-base">
                    {aim.desc}
                  </p>
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
              Join us in restoring hope.
            </motion.h2>
            <p className="text-lg md:text-xl text-cream/70 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              Every contribution of time, resource, or advocacy helps us empower vulnerable communities and build a sustainable future where dignity is restored.
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
                Support Our Mission
              </Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
