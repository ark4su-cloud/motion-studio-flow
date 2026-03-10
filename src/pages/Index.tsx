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
      {/* Dynamic Profile Background with Organic Blending */}
      <motion.div
        style={{ opacity, scale }}
        className="fixed inset-0 z-[1] pointer-events-none"
      >
        {/* Organic Glow Blobs (Moving blurred colors) */}
        <div className="absolute inset-0 overflow-hidden hidden md:block opacity-40">
          <motion.div 
            animate={{ 
              x: [-20, 30, -20],
              y: [-10, 40, -10],
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[25%] w-[30%] h-[40%] bg-primary/25 blur-[120px] rounded-full"
          />
          <motion.div 
            animate={{ 
              x: [30, -30, 30],
              y: [20, -20, 20],
              scale: [1.1, 0.9, 1.1] 
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] right-[30%] w-[30%] h-[35%] bg-[hsl(90,60%,45%)]/20 blur-[110px] rounded-full"
          />
        </div>

        {/* Main Profile Image with Radial Masking (No abrupt cuts) */}
        <div
          className="absolute inset-0 bg-[length:140%_auto] md:bg-[length:85%_auto] md:bg-[position:center_15%] bg-[position:center_top] bg-no-repeat opacity-90 transition-all duration-700"
          style={{
            backgroundImage: "url('/poza 4k profil ArtioMotion.jpeg')",
            // Radial mask to fade ALL edges (top, bottom, left, right)
            maskImage: "radial-gradient(ellipse at center 40%, black 20%, rgba(0,0,0,0.8) 40%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse at center 40%, black 20%, rgba(0,0,0,0.8) 40%, transparent 85%)",
          }}
        />
        
        {/* Moving Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.035] md:opacity-[0.025] pointer-events-none">
          <motion.div 
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 100%"] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />
        </div>
        
        <div className="absolute inset-0 bg-background/20" />
      </motion.div>

      <div className="relative z-10 w-full h-full">
        <LinkInBio />
      </div>
    </div>
  );
};

export default Index;
