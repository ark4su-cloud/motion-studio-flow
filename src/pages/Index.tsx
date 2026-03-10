import BackgroundEffects from "@/components/BackgroundEffects";
import InteractiveParticles from "@/components/InteractiveParticles";
import LinkInBio from "@/components/LinkInBio";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const { scrollY } = useScroll();

  useEffect(() => {
    const trackPageView = async () => {
      // Extract UTM Source from URL (e.g., ?source=youtube)
      const urlParams = new URLSearchParams(window.location.search);
      const source = urlParams.get('source') || 'direct';

      // Only track once per session logic (using sessionStorage)
      if (!sessionStorage.getItem("hasTrackedPageView")) {
        try {
          await supabase.from("analytics").insert([{
            event_type: "page_view",
            link_name: "home_page",
            source: source // Capture the source
          }]);
          sessionStorage.setItem("hasTrackedPageView", "true");
        } catch (e) {
          console.error(e);
        }
      }
    };
    trackPageView();
  }, []);

  // Fade out image slowly as you scroll down
  const opacity = useTransform(scrollY, [0, 800], [0.8, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.05]);

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-primary">
      {/* Dynamic Profile Background with Blending */}
      <motion.div
        style={{ opacity, scale }}
        className="fixed inset-0 z-[1] pointer-events-none"
      >
        {/* Organic Glow Blobs for edge blending (mostly for PC) */}
        <div className="absolute inset-0 overflow-hidden hidden md:block">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[25%] w-[35%] h-[35%] bg-[hsl(90,60%,45%)]/15 blur-[100px] rounded-full"
          />
        </div>

        <div
          className="absolute inset-0 bg-[length:140%_auto] md:bg-[length:80%_auto] md:bg-[position:center_10%] bg-[position:center_top] bg-no-repeat opacity-90 transition-all duration-700"
          style={{
            backgroundImage: "url('/poza 4k profil ArtioMotion.jpeg')",
            // Advanced Multi-directional Masking: soft fade on top, bottom, and sides on PC
            maskImage: "radial-gradient(ellipse at center 30%, black 20%, transparent 80%), linear-gradient(to bottom, black 40%, transparent 95%)",
            WebkitMaskImage: "radial-gradient(ellipse at center 30%, black 20%, transparent 80%), linear-gradient(to bottom, black 40%, transparent 95%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        
        {/* Subtle Noise overlay specifically for the image area */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="absolute inset-0 bg-background/20" />
      </motion.div>

      <div className="relative z-10 w-full h-full">
        <LinkInBio />
      </div>
    </div>
  );
};

export default Index;
