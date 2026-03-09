import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "Animații",
  "Logo Motion",
  "Promo Video",
  "Tipografie",
  "Intro & Outro",
  "2D & 3D",
  "Sound Design",
  "Lottie",
  "Reclame",
];

const TypingCycle = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "hold" | "deleting">("typing");

  const currentWord = words[wordIndex];

  const tick = useCallback(() => {
    if (phase === "typing") {
      if (displayText.length < currentWord.length) {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
      } else {
        setPhase("hold");
      }
    } else if (phase === "deleting") {
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        setWordIndex((prev) => (prev + 1) % words.length);
        setPhase("typing");
      }
    }
  }, [phase, displayText, currentWord]);

  useEffect(() => {
    if (phase === "hold") {
      const t = setTimeout(() => setPhase("deleting"), 3000);
      return () => clearTimeout(t);
    }
    const speed = phase === "typing" ? 80 : 40;
    const t = setTimeout(tick, speed);
    return () => clearTimeout(t);
  }, [tick, phase]);

  return (
    <span className="inline-block relative">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={displayText}
          initial={{ opacity: 0.7, y: 4, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.15 }}
          className="gradient-text"
        >
          {displayText}
        </motion.span>
      </AnimatePresence>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-baseline translate-y-[0.1em] rounded-full"
      />
    </span>
  );
};

export default TypingCycle;
