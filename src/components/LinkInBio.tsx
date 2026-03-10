import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, MessageCircle, Youtube, Music2, Send, Palette, Camera, Briefcase, Play, Linkedin } from "lucide-react";

const socialIcons = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: MessageCircle, href: "#", label: "WhatsApp" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Music2, href: "#", label: "TikTok" },
];

const links = [
  { emoji: "📩", label: "Telegram: Contact @ArtioMotion", icon: Send, href: "#" },
  { emoji: "🎨", label: "NEW Fiverr", icon: Palette, href: "#" },
  { emoji: "📸", label: "Instagram", icon: Camera, href: "#" },
  { emoji: "💬", label: "WhatsApp", icon: MessageCircle, href: "#" },
  { emoji: "🎵", label: "TikTok", icon: Music2, href: "#" },
  { emoji: "▶️", label: "ArtioMotion YouTube", icon: Youtube, href: "#" },
  { emoji: "🎬", label: "vimeo.com", icon: Play, href: "#" },
  { emoji: "💼", label: "www.linkedin.com", icon: Linkedin, href: "#" },
];

const tabs = ["Links", "Shop"] as const;

const LinkInBio = () => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Links");

  return (
    <div className="relative z-10 min-h-screen flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-8"
        >
          {/* Avatar with animated stroke */}
          <div className="animated-stroke-avatar rounded-full mb-5">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
              <span className="font-display text-2xl font-bold gradient-text">AM</span>
            </div>
          </div>

          <h1 className="font-display text-2xl font-bold gradient-text-glow mb-2">
            ArtioMotion
          </h1>
          <p className="text-sm text-muted-foreground font-body max-w-xs leading-relaxed">
            Professional Motion Designer · Animation · Video Production
          </p>

          {/* Social icons row */}
          <div className="flex items-center gap-3 mt-5">
            {socialIcons.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label={s.label}
              >
                <s.icon size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative rounded-full px-6 py-2 text-sm font-medium font-body transition-all duration-300 ${
                activeTab === tab
                  ? "animated-stroke glass-effect text-foreground"
                  : "glass-effect text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Link Buttons */}
        <div className="flex flex-col gap-3">
          {activeTab === "Links" &&
            links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="animated-stroke rounded-2xl glass-card group"
              >
                <div className="relative flex items-center gap-4 px-5 py-4">
                  {/* Platform icon */}
                  <div className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
                    <link.icon size={18} className="text-foreground/80" />
                  </div>
                  <span className="text-sm font-medium font-body text-foreground/90 group-hover:text-foreground transition-colors">
                    {link.label}
                  </span>
                </div>
              </motion.a>
            ))}

          {activeTab === "Shop" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-2xl px-6 py-10 text-center"
            >
              <p className="text-muted-foreground font-body text-sm">
                Coming soon — stay tuned! ✨
              </p>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-center text-xs text-muted-foreground mt-12 font-body"
        >
          © 2026 ArtioMotion
        </motion.p>
      </div>
    </div>
  );
};

export default LinkInBio;
