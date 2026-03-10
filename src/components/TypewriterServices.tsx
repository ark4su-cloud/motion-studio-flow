import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const services = [
  "Logo Animation",
  "Promo Video",
  "Video Editing",
  "Typography Animation",
  "Advertisement Video",
  "Intro / Outro",
  "Lottie Animation",
  "& More"
];

const TypewriterServices = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleType = () => {
      const i = loopNum % services.length;
      const fullText = services[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 40 : 80);

      if (!isDeleting && text === fullText) {
        // Pause at the end of the word
        timer = setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && text === '') {
        // Switch to the next word
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        timer = setTimeout(handleType, 400);
      } else {
        // Continue typing or deleting
        timer = setTimeout(handleType, typingSpeed);
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="h-8 mt-1 mb-2 flex justify-center items-center">
      <span className="text-primary font-body font-semibold tracking-wide text-xl drop-shadow-sm flex items-center">
        {text}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="inline-block ml-[2px] w-[2px] h-[1em] bg-primary align-middle"
        />
      </span>
    </div>
  );
};

export default TypewriterServices;
