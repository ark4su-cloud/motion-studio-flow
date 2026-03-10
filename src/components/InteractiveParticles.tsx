import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NUM_PARTICLES = 60;

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
}

const InteractiveParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 }); // start offscreen

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: NUM_PARTICLES }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(initialParticles);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Track scroll velocity
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const deltaY = window.scrollY - lastScrollY;
      (window as any).lastScrollDelta = deltaY;
      lastScrollY = window.scrollY;
      
      // Decay the delta quickly so particles don't keep flying after scroll stops
      setTimeout(() => {
        (window as any).lastScrollDelta *= 0.5;
      }, 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      (window as any).lastScrollDelta = 0;
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((p) => {
          let { x, y, vx, vy } = p;

          // Mouse interaction (gravity / repulsion)
          const dx = mousePos.x - x;
          const dy = mousePos.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const interactionRadius = 150;
          if (distance < interactionRadius) {
            // Push away logic
            const force = (interactionRadius - distance) / interactionRadius;
            vx -= (dx / distance) * force * 0.5;
            vy -= (dy / distance) * force * 0.5;
          }

          // Apply scroll velocity (global to window that we track via a side effect)
          if ((window as any).lastScrollDelta) {
            vy -= (window as any).lastScrollDelta * 0.0008; // Even gentler scroll push force
          }
          
          // Natural drift + velocity damping
          x += vx;
          y += vy;
          vx *= 0.85; // Very high friction so they stop instantly after a force
          vy *= 0.85;

          // Add a tiny bit of random movement back
          vx += (Math.random() - 0.5) * 0.1;
          vy += (Math.random() - 0.5) * 0.1;

          // Edges wrap around
          if (x < 0) x = window.innerWidth;
          if (x > window.innerWidth) x = 0;
          if (y < 0) y = window.innerHeight;
          if (y > window.innerHeight) y = 0;

          return { ...p, x, y, vx, vy };
        })
      );
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animationFrameId = requestAnimationFrame(animateParticles);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/40"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveParticles;
