'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Molle } from 'next/font/google';

interface LandingProps {
  id?: string;
}
  const molle = Molle({
  weight: '400',
  subsets: ['latin'],
});
const Landing: React.FC<LandingProps> = ({ id }) => {
  const [currentProfession, setCurrentProfession] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.1 });

  const professions = useMemo(() => [
    "Full Stack Developer",
    "iOS/Android Developer",
    "ML Engineer",
    "DevOps Engineer",
    "AI Engineer",
    "Startup Enthusiast"
  ], []);

  const gradientColors = useMemo(() => [
    '#3b82f6',
    '#6366f1',
    '#8b5cf6',
    '#d946ef',
    '#ec4899',
    '#f43f5e',
    '#10b981',
    '#14b8a6',
    '#0ea5e9',
  ], []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }), []);

  // Handle profession rotation with typing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProfession((prev) => (prev + 1) % professions.length);
      setCurrentIndex(0);
      setDisplayText('');
    }, 3000);
    return () => clearInterval(interval);
  }, [professions.length]);

  // Handle typing animation
  useEffect(() => {
    if (currentIndex < professions[currentProfession].length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + professions[currentProfession][currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50 + Math.random() * 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, currentProfession, professions]);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/my-resume.pdf';
    link.download = 'Prince-Rajbhar-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const getGradient = useCallback(() => {
    return `linear-gradient(45deg, 
      ${gradientColors[0]} 0%, 
      ${gradientColors[1]} 20%, 
      ${gradientColors[2]} 40%, 
      ${gradientColors[3]} 60%, 
      ${gradientColors[4]} 80%, 
      ${gradientColors[0]} 100%)`;
  }, [gradientColors]);

  return (
     <section id={id} className="">
    <div 
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:via-purple-900 dark:to-black"
    >
      <motion.div 
        className="relative z-10 container mx-auto px-6 py-24 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
      <motion.h1 
  className={`${molle.className} text-4xl md:text-6xl lg:text-7xl font-bold mb-6`}
  variants={itemVariants}
  onHoverStart={() => setIsHovering(true)}
  onHoverEnd={() => setIsHovering(false)}
  animate={{
    backgroundImage: getGradient(),
    backgroundSize: isHovering ? '400% 400%' : '200% 200%',
    textShadow: isHovering ? 
      "0 0 15px rgba(99, 102, 241, 0.7), 0 0 30px rgba(236, 72, 153, 0.5)" : 
      "0 0 10px rgba(59, 130, 246, 0.5)",
    scale: isHovering ? 1.03 : 1
  }}
  transition={{ 
    duration: 0.5,
    backgroundImage: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "linear"
    },
    scale: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }}
  style={{
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    display: 'inline-block',
    padding: '0 0.25em'
  }}
>
  Prince Rajbhar
</motion.h1>


        <div className="h-24 md:h-32 mb-8 overflow-hidden relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentProfession}
              className="text-3xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-green-300 to-purple-400"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{
                y: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 }
              }}
            >
              {displayText}
              <motion.span 
                className="inline-block w-2 h-10 bg-white ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </motion.h2>
          </AnimatePresence>
        </div>

        <motion.p 
          className="text-lg md:text-xl  max-w-3xl mx-auto mb-12 text-gray-700 dark:text-gray-300"
          variants={itemVariants}
        >
          Innovative developer with expertise across multiple domains including web, mobile, 
          machine learning, and cloud technologies. Passionate about building scalable solutions 
          and transforming ideas into reality. Startup enthusiast with a focus on creating 
          impactful products.
        </motion.p>

        <motion.div 
          className="flex flex-wrap justify-center gap-6"
          variants={itemVariants}
        >
          <motion.button
            className="px-8 py-3 rounded-full font-medium relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            style={{
              background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
              backgroundSize: '200% 100%',
              color: 'white',
            }}
          >
            <span className="relative z-10">Download Resume</span>
            <motion.span 
              className="absolute inset-0 bg-white opacity-0"
              animate={{ 
                opacity: isHovering ? 0.2 : 0,
                x: isHovering ? '100%' : '-100%'
              }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          <motion.button
            className="px-8 py-3 rounded-full font-medium relative overflow-hidden border-2 border-purple-400 text-gray-700 dark:text-gray-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Join My Network</span>
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 opacity-0"
              animate={{ 
                opacity: isHovering ? 1 : 0,
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mt-1"
              animate={{
                y: [0, 6, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.5,
              }}
            />
          </div>
          <p className="text-purple-400 mt-2 text-sm">Explore More</p>
        </div>
      </motion.div>
    </div>
    </section>
  );
};

export default Landing;