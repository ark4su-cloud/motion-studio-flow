import { motion } from "framer-motion";

const blobs = [
  { className: "top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[hsl(80,50%,35%)]", dur: 12, dx: 60, dy: 50 },
  { className: "top-[30%] right-[-10%] w-[400px] h-[400px] bg-[hsl(65,45%,32%)]", dur: 14, dx: -55, dy: 60 },
  { className: "bottom-[5%] left-[15%] w-[350px] h-[350px] bg-[hsl(90,40%,30%)]", dur: 10, dx: 45, dy: -50 },
];

const BackgroundEffects = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    {blobs.map((b, i) => (
      <motion.div
        key={i}
        animate={{
          x: [0, b.dx, -b.dx * 0.7, 0],
          y: [0, b.dy, -b.dy * 0.6, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute rounded-full blur-[100px] opacity-50 ${b.className}`}
      />
    ))}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  </div>
);

export default BackgroundEffects;
