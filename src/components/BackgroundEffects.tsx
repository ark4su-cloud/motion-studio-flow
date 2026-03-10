import { motion } from "framer-motion";

const blobs = [
  { className: "top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[hsl(255,70%,30%)]", dur: 25, dx: 40, dy: 30 },
  { className: "top-[20%] right-[-10%] w-[500px] h-[500px] bg-[hsl(240,60%,25%)]", dur: 30, dx: -35, dy: 40 },
  { className: "bottom-[10%] left-[10%] w-[450px] h-[450px] bg-[hsl(270,50%,28%)]", dur: 22, dx: 30, dy: -35 },
  { className: "top-[50%] left-[40%] w-[350px] h-[350px] bg-[hsl(250,55%,22%)]", dur: 28, dx: -25, dy: 25 },
  { className: "bottom-[-5%] right-[20%] w-[400px] h-[400px] bg-[hsl(260,65%,20%)]", dur: 35, dx: 20, dy: -30 },
];

const BackgroundEffects = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    {blobs.map((b, i) => (
      <motion.div
        key={i}
        animate={{
          x: [0, b.dx, -b.dx * 0.7, 0],
          y: [0, b.dy, -b.dy * 0.6, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute rounded-full blur-[120px] opacity-60 ${b.className}`}
      />
    ))}
    {/* Noise overlay on entire background */}
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  </div>
);

export default BackgroundEffects;
