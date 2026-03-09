import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="acasa"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[100px] animate-float" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6 font-body">
            Motion Design · Animație · Video
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6">
            <span className="gradient-text">Animații</span>
            <br />
            care captivează
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 font-body font-light">
            Servicii profesionale de motion design pentru branduri care vor să iasă în evidență.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="animated-stroke-btn rounded-full px-8 py-3.5 text-base font-medium text-foreground hover:text-primary-foreground transition-colors flex items-center gap-2"
          >
            Începe un Proiect
            <ArrowRight size={18} />
          </a>
          <a
            href="#portofoliu"
            className="glass-effect rounded-full px-8 py-3.5 text-base font-medium text-secondary-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            <Play size={16} />
            Vezi Lucrările
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
