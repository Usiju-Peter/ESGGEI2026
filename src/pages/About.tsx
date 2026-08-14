import { ArrowRight, Handshake, Heart, Leaf, Scale, ShieldCheck, Users } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
import PageHero from "../components/PageHero";
import { projectsData, teamData } from "../data";
import { useSEO } from "../lib/seo";

const values = [
  { title: "Integrity", text: "We act honestly, responsibly, and with respect for the people and communities we serve.", icon: ShieldCheck },
  { title: "Inclusivity", text: "We create space for children, women, widows, older people, farmers, and other underserved groups to participate.", icon: Users },
  { title: "Accountability", text: "We value clear purpose, responsible stewardship, and learning from the outcomes of our work.", icon: Scale },
  { title: "Sustainability", text: "We favour practical approaches that strengthen local capacity and support lasting livelihoods.", icon: Leaf },
  { title: "Empowerment", text: "We help people build knowledge, confidence, agency, and opportunities they can carry forward.", icon: Heart },
  { title: "Collaboration", text: "We work with communities, volunteers, professionals, and aligned organisations to achieve more together.", icon: Handshake },
];

export default function About() {
  useSEO(
    "About EarthSprings Global Grace Empowerment Initiative",
    "Discover ESGGEI's story, mission, values, community-led approach, programmes, leadership, and work supporting vulnerable communities in Nigeria.",
    { path: "/about", image: "/images/gallery/outreach-24.webp" },
  );

  return (
    <div className="flex min-h-screen flex-col">
      <PageHero
        badge="About ESGGEI"
        title="Building stronger communities."
        subtitle="We connect compassion with practical action across education, sustainable agriculture, advocacy, and social support."
        image="/images/gallery/outreach-24.webp"
      />

      <AnimatedSection>
        <section className="bg-cream py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 md:grid-cols-12 md:gap-y-20 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-7"
            >
              <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/50">Our Identity</span>
              <h2 className="mb-8 font-serif text-4xl font-semibold leading-tight text-primary md:text-5xl">Who We Are</h2>
              <div className="space-y-5 text-lg font-light leading-relaxed text-charcoal/70">
                <p>EarthSprings Global Grace Empowerment Initiative (ESGGEI) is a non-profit, non-governmental organisation supporting vulnerable and marginalised people through education, sustainable agriculture, literacy, advocacy, and social welfare.</p>
                <p>We serve children, women, youth, widows, older people, smallholder farmers, and underserved communities in Nigeria. Our work connects immediate care with practical knowledge and opportunities that can strengthen dignity, resilience, and self-reliance.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-l-2 border-primary/20 pl-8 md:col-span-7 md:col-start-6 md:pl-10"
            >
              <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/50">Our Origin</span>
              <h2 className="mb-8 font-serif text-4xl font-semibold leading-tight text-primary md:text-5xl">Why We Began</h2>
              <p className="text-lg font-light leading-relaxed text-charcoal/70">Across Nigeria's rural and low-income communities, families carry deep potential while facing barriers such as limited access to learning, low agricultural productivity, economic uncertainty, scarce resources, and social exclusion. ESGGEI was created to respond with compassionate, community-informed, and sustainable interventions.</p>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="border-y border-primary/10 bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">Purpose and direction</p>
            <div className="mt-12 grid gap-16 md:grid-cols-12 md:gap-y-20">
              <div className="md:col-span-7">
                <h2 className="font-serif text-4xl font-semibold text-primary md:text-5xl">Our Vision</h2>
                <p className="mt-6 font-serif text-2xl leading-relaxed text-primary/90 md:text-3xl">To build a society where every child learns, every woman thrives, and every vulnerable life is empowered to reach its full potential.</p>
              </div>
              <div className="border-l-2 border-primary/20 pl-8 md:col-span-7 md:col-start-6 md:pl-10">
                <h2 className="font-serif text-4xl font-semibold text-primary md:text-5xl">Our Mission</h2>
                <p className="mt-6 font-serif text-2xl leading-relaxed text-primary/90 md:text-3xl">To empower individuals and communities through education, agriculture, literacy, advocacy, and social support, with a special focus on children, women, widows, and the aged.</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="bg-beige py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">What guides us</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold text-primary md:text-5xl">Our Core Values</h2>
              <p className="mt-6 text-lg leading-relaxed text-charcoal/70">These principles shape how we make decisions, build relationships, and remain accountable to the communities at the centre of our work.</p>
            </div>
            <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {values.map(({ title, text, icon: Icon }) => (
                <article key={title} className="border-l-2 border-primary/20 pl-6">
                  <Icon className="h-6 w-6 text-primary-light" aria-hidden="true" />
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-primary">{title}</h3>
                  <p className="mt-3 leading-relaxed text-charcoal/70">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">Our approach</p>
                <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-primary md:text-5xl">Practical change, shaped with communities.</h2>
                <p className="mt-6 text-lg leading-relaxed text-charcoal/70">We listen to local priorities, connect related needs, and shape support around the realities people face. This means treating community members as participants in their own futures and building programmes around dignity, usefulness, and shared ownership.</p>
                <div className="mt-10 space-y-7">
                  {[
                    ["Listen first", "Community voices help define needs, resources, and the most relevant path forward."],
                    ["Connect the work", "Education, livelihoods, advocacy, healthcare, and social support are stronger when they reinforce one another."],
                    ["Build for continuity", "Skills, local participation, and sustainable practices help progress continue beyond a single intervention."],
                  ].map(([title, text], index) => <div key={title} className="grid grid-cols-[2rem_1fr] gap-4"><span className="font-serif text-lg text-primary-light">0{index + 1}</span><div><h3 className="font-serif text-xl font-semibold text-primary">{title}</h3><p className="mt-2 leading-relaxed text-charcoal/70">{text}</p></div></div>)}
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[2rem]">
                <img src="/images/gallery/outreach-07.webp" alt="EarthSprings volunteer listening to a community member during outreach" width="1200" height="1600" className="h-[560px] w-full object-cover" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="bg-cream py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">What we do</p>
                <h2 className="mt-4 font-serif text-4xl font-semibold text-primary md:text-5xl">Connected programmes for lasting wellbeing.</h2>
              </div>
              <Link to="/projects" className="group inline-flex items-center text-sm font-semibold uppercase tracking-[0.16em] text-primary hover:text-primary-light">Explore all projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
            </div>
            <div className="mt-14 grid gap-8 lg:grid-cols-3">
              {projectsData.map((programme) => {
                const Icon = programme.icon;
                return <article key={programme.id} className="flex flex-col bg-white p-8 shadow-[0_14px_35px_rgba(18,53,36,0.06)]"><Icon className="h-7 w-7 text-primary-light" aria-hidden="true" /><h3 className="mt-7 font-serif text-2xl font-semibold text-primary">{programme.title}</h3><p className="mt-4 flex-1 leading-relaxed text-charcoal/70">{programme.description}</p><Link to={programme.href} className="group mt-8 inline-flex items-center text-sm font-semibold text-primary">Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link></article>;
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="bg-primary py-24 text-white lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="overflow-hidden rounded-[2rem]">
              <img src="/images/gallery/outreach-25.webp" alt="EarthSprings team with community leaders at the June 2026 outreach" width="1200" height="900" className="h-[430px] w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4A84F]">Our work in action</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold text-white md:text-5xl">A growing story of practical service.</h2>
              <p className="mt-6 text-lg leading-relaxed text-cream/75">On 27 June 2026, ESGGEI brought volunteers, health workers, community members, and leaders together in Guruku Gbayi Community, Karu LGA, Nasarawa State, for an Integrated Agriculture &amp; Medical Outreach.</p>
              <p className="mt-4 leading-relaxed text-cream/70">The event included community registration, health screening, consultation, care, and support. It represents the kind of connected, community-led action ESGGEI is building upon as its programmes grow.</p>
              <div className="mt-9 flex flex-wrap gap-4"><Link to="/gallery" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-primary hover:bg-cream">View the gallery</Link><Link to="/blog/from-purpose-to-action" className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white hover:bg-white hover:text-primary">Read our story</Link></div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">Leadership</p><h2 className="mt-4 font-serif text-4xl font-semibold text-primary md:text-5xl">People behind the mission.</h2></div>
              <Link to="/team" className="group inline-flex items-center text-sm font-semibold uppercase tracking-[0.16em] text-primary hover:text-primary-light">Meet the full team <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {teamData.slice(0, 3).map((member) => <article key={member.id}><div className="overflow-hidden rounded-[1.5rem] bg-beige"><img src={member.image} alt={`${member.name}, ${member.role}`} className="aspect-[4/5] w-full object-cover" loading="lazy" decoding="async" /></div><h3 className="mt-6 font-serif text-2xl font-semibold text-primary">{member.name}</h3><p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-primary-light">{member.role}</p><p className="mt-4 leading-relaxed text-charcoal/70">{member.shortBio}</p></article>)}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="border-t border-primary/10 bg-beige py-24 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
            <div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">Partners and supporters</p><h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-primary md:text-5xl">Collaboration makes the work stronger.</h2><p className="mt-6 max-w-3xl text-lg leading-relaxed text-charcoal/70">We welcome responsible partnerships with individuals, community groups, professionals, companies, and institutions whose support aligns with the needs and dignity of the people we serve.</p></div>
            <div className="border-l-2 border-primary/20 pl-8"><h3 className="font-serif text-2xl font-semibold text-primary">Ways to contribute</h3><ul className="mt-6 space-y-4 text-charcoal/70"><li>Programme sponsorship and responsible funding</li><li>Technical expertise and professional volunteering</li><li>Relevant products, tools, and in-kind resources</li><li>Advocacy and community mobilisation</li></ul><Link to="/partner" className="group mt-8 inline-flex items-center font-semibold text-primary">Explore partnership options <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link></div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="relative bg-primary px-4 py-28 text-center text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-4xl font-semibold leading-tight text-white md:text-6xl">Be part of the change.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">Support our work, volunteer your expertise, or partner with us to help communities build opportunity, dignity, and sustainable livelihoods.</p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"><Link to="/partner" className="rounded-full bg-white px-8 py-4 font-medium text-primary hover:bg-cream">Partner With Us</Link><Link to="/projects" className="rounded-full border border-white/25 px-8 py-4 font-medium text-white hover:bg-white hover:text-primary">Explore Our Work</Link></div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
