import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import TypingCycle from "./TypingCycle";

const Hero = () => {
  return (
    <section
      id="acasa"
      className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
    >

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6 font-body"
          >
            Motion Design · Animație · Video
          </motion.p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6">
            <TypingCycle />
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              care captivează
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 font-body font-light"
          >
            Servicii profesionale de motion design pentru branduri care vor să iasă în evidență.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="animated-stroke-btn gradient-btn rounded-full px-8 py-3.5 text-base font-medium text-primary-foreground transition-colors flex items-center gap-2"
          >
            Începe un Proiect
            <ArrowRight size={18} />
          </a>
          <a
            href="#portofoliu"
            className="glass-effect rounded-full px-8 py-3.5 text-base font-medium text-secondary-foreground hover:text-foreground transition-all duration-300 flex items-center gap-2"
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
