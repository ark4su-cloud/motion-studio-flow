import { motion } from "framer-motion";
import {
  Layers, Video, Type, Monitor, Music, FileCode, Sparkles, Clapperboard,
} from "lucide-react";

const services = [
  { icon: Sparkles, title: "Animație Custom", desc: "Orice stil, orice complexitate — de la simplu la spectaculos." },
  { icon: Layers, title: "Animație 2D & Logo", desc: "Logo-uri animate și grafice 2D care dau viață brandului tău." },
  { icon: Video, title: "Reclame Video", desc: "IG Ads, FB Ads, videoclipuri promoționale care convertesc." },
  { icon: Clapperboard, title: "Intro / Outro", desc: "Introduceri și încheieri profesionale 2D sau 3D." },
  { icon: Type, title: "Animație Tipografie", desc: "Text animat cu impact pentru orice platformă." },
  { icon: Monitor, title: "Device Scenes", desc: "Prezentări pe dispozitive și lower thirds elegante." },
  { icon: Music, title: "Sound Design", desc: "Design sonor care completează perfect animația." },
  { icon: FileCode, title: "Lottie Animation", desc: "Animații .json optimizate pentru web și aplicații mobile." },
];

const cardVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.05, y: -8 },
};

const siblingVariants = {
  rest: { scale: 1 },
  shrink: { scale: 0.97 },
};

const Services = () => {
  return (
    <section id="servicii" className="relative py-32 z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">Ce ofer</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text">Servicii</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 group/grid">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover="hover"
              variants={cardVariants}
              className="glass-card rounded-2xl p-6 cursor-default transition-all duration-500
                         group-hover/grid:[&:not(:hover)]:scale-[0.97] group-hover/grid:[&:not(:hover)]:opacity-70"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
              >
                <s.icon size={20} className="text-primary" />
              </motion.div>
              <h3 className="font-display text-base font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
