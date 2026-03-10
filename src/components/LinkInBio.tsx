import { motion } from "framer-motion";
import { Instagram, MessageCircle, Youtube, Music2, Send, Palette, Camera, Play, Linkedin } from "lucide-react";
import TypewriterServices from "./TypewriterServices";
import { supabase } from "@/lib/supabase";

const socialIcons = [
  { icon: Instagram, href: "https://www.instagram.com/artiomotion.md", label: "Instagram" },
  { icon: MessageCircle, href: "https://wa.me/37368189267", label: "WhatsApp" },
  { icon: Youtube, href: "https://www.youtube.com/@ArtioMotionMD/shorts", label: "YouTube" },
  { icon: Music2, href: "https://www.tiktok.com/@artiomotion?is_from_webapp=1&sender_device=pc", label: "TikTok" },
];

const links = [
  { label: "Telegram: Contact @ArtioMotion", icon: Send, href: "https://t.me/ArtioMotion", highlight: true },
  { label: "NEW Fiverr", icon: Palette, href: "https://www.fiverr.com/s/8zX6GxZ" },
  { label: "Instagram", icon: Camera, href: "https://www.instagram.com/artiomotion.md" },
  { label: "WhatsApp", icon: MessageCircle, href: "https://wa.me/37368189267" },
  { label: "TikTok", icon: Music2, href: "https://www.tiktok.com/@artiomotion?is_from_webapp=1&sender_device=pc" },
  { label: "ArtioMotion YouTube", icon: Youtube, href: "https://www.youtube.com/@ArtioMotionMD/shorts" },
  { label: "vimeo.com", icon: Play, href: "https://vimeo.com/artiomotion?fl=pp&fe=sh" },
  { label: "www.linkedin.com", icon: Linkedin, href: "https://www.linkedin.com/in/artiom-casu" },
];

const LinkInBio = () => {
  const trackClick = async (linkName: string) => {
    try {
      await supabase.from('analytics').insert([{
        event_type: 'click',
        link_name: linkName
      }]);
    } catch (err) {
      console.error("Error logging click:", err);
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex items-start justify-center px-4 py-8">
      <div className="w-full max-w-md pt-[35vh] md:pt-[45vh]">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-10"
        >
          {/* Note: The physical profile avatar image has been removed 
              as we are using the main background profile picture instead */}

          <h1 className="font-display text-5xl font-extrabold tracking-tight gradient-text-glow mb-2 drop-shadow-md">
            ArtioMotion
          </h1>

          <TypewriterServices />

          <p className="text-sm text-foreground/90 font-body max-w-xs leading-relaxed drop-shadow-sm font-medium mt-2">
            Professional Motion Designer · Animation · Video Production
          </p>

          <div className="flex items-center gap-3 mt-6">
            {socialIcons.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick(`Social Top: ${s.label}`)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full glass-effect flex items-center justify-center text-foreground/90 hover:text-white hover:bg-white/10 transition-colors duration-200 backdrop-blur-md border border-white/20 shadow-lg"
                aria-label={s.label}
              >
                <s.icon size={22} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Link Buttons */}
        <div className="flex flex-col gap-3">
          {links.map((link, i) => {
            const isTelegram = link.highlight;

            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick(link.label)}
                initial={{ opacity: 0, y: 20 }}
                animate={isTelegram ? {
                  opacity: 1,
                  y: 0,
                  scale: [1, 1.05, 1]
                } : { opacity: 1, y: 0 }}
                transition={isTelegram ? {
                  opacity: { duration: 0.4, delay: 0.4 + i * 0.07 },
                  y: { duration: 0.4, delay: 0.4 + i * 0.07 },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }
                } : { duration: 0.4, delay: 0.4 + i * 0.07 }}
                whileHover={{ scale: isTelegram ? 1.08 : 1.04, transition: { duration: 0.3, ease: "easeOut" } }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-2xl glass-card group relative overflow-hidden backdrop-blur-md border border-white/10 shadow-lg transition-colors duration-200 ${link.highlight ? "animated-stroke bg-primary/20 hover:bg-primary/30" : "stroke-on-hover hover:bg-white/5"
                  }`}
              >
                {/* Extra glowing background effect for telegram */}
                {isTelegram && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                )}

                <div className="relative flex items-center gap-4 px-6 py-4 z-10">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-inner ${isTelegram ? 'bg-primary text-primary-foreground' : 'bg-white/10 text-foreground group-hover:bg-white/20'
                      }`}
                  >
                    <link.icon size={20} className={isTelegram ? "" : "text-foreground/90"} />
                  </motion.div>
                  <span className={`text-base font-semibold font-body transition-colors ${isTelegram ? 'text-white drop-shadow-md' : 'text-foreground/90 group-hover:text-white'
                    }`}>
                    {link.label}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-center text-xs text-foreground/60 mt-12 mb-8 font-body font-medium drop-shadow-sm"
        >
          © 2026 ArtioMotion
        </motion.p>
      </div>
    </div>
  );
};

export default LinkInBio;
