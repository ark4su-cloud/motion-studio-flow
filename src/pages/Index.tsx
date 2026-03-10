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
      {/* Dynamic Profile Background */}
      <motion.div
        style={{ opacity, scale }}
        className="fixed inset-0 z-[1] pointer-events-none"
      >
        <div
          className="absolute inset-0 bg-[length:150%_auto] md:bg-[length:100%_auto] bg-[position:center_top] bg-no-repeat opacity-90"
          style={{
            backgroundImage: "url('/poza 4k profil ArtioMotion.jpeg')",
            maskImage: "linear-gradient(to bottom, black 30%, transparent 90%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 90%)",
          }}
        />
        <div className="absolute inset-0 bg-background/30" />
      </motion.div>

      <div className="relative z-10 w-full h-full">
        <LinkInBio />
      </div>
    </div>
  );
};

export default Index;
