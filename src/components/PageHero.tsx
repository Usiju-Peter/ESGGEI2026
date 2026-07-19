import { motion } from "motion/react";

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  image?: string;
}

export default function PageHero({ badge, title, subtitle, image }: PageHeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-32 md:pt-40 pb-20 overflow-hidden bg-primary text-center">
      {image && (
        <>
          <motion.div 
            className="absolute inset-0 z-0"
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 8, ease: "linear" }}
          >
            <img 
              src={image} 
              alt="" /* Keeps presentational image decorative for screen readers since title is already read as H1 */
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
              loading="eager"
              fetchPriority="high"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=123524&color=F7F1E8&size=800&font-size=0.1`;
                (e.target as HTMLImageElement).style.opacity = '0.1';
              }} 
            />
          </motion.div>
          <div className="absolute inset-0 bg-primary/70 z-0" />
        </>
      )}
      
      {!image && (
        <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1F4D35] via-[#123524] to-[#123524]" />
      )}

      {/* Beautiful dynamic atmospheric ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[350px] bg-primary-light/15 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[220px] bg-[#D4A84F]/12 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {badge && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-8 border border-white/20"
          >
            <span className="w-2 h-2 rounded-full bg-primary-light" />
            <span className="text-sm font-medium text-cream tracking-wide uppercase">
              {badge}
            </span>
          </motion.div>
        )}

        <motion.h1 
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] font-serif font-bold text-white leading-[1.1] mb-6 text-center tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {title}
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-2xl text-cream/90 mb-10 max-w-2xl leading-relaxed font-light mx-auto text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
