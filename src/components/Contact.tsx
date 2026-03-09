import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="relative py-32 noise-overlay">
      <div className="relative z-10 container mx-auto px-6 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">Hai să lucrăm împreună</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-6">Contactează-mă</h2>
          <p className="text-muted-foreground mb-10 font-body leading-relaxed">
            Ai un proiect în minte? Scrie-mi și hai să discutăm detaliile. 
            Primești un răspuns rapid și o estimare clară.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:contact@motionstudio.md"
            className="animated-stroke-btn gradient-btn rounded-full px-8 py-3.5 text-base font-medium text-primary-foreground transition-colors flex items-center gap-2"
          >
            <Mail size={18} />
            Trimite Email
          </a>
          <a
            href="https://www.fiverr.com/s/BR4ZKDz"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect rounded-full px-8 py-3.5 text-base font-medium text-secondary-foreground hover:text-foreground transition-all duration-300 flex items-center gap-2"
          >
            <MessageCircle size={16} />
            Fiverr
          </a>
        </motion.div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2026 MotionStudio. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
