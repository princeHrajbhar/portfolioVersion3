'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { FiCode, FiCpu, FiDatabase, FiLayers, FiServer, FiSmartphone } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiPostgresql, SiTensorflow, SiInternetarchive, SiArduino, SiMysql, SiMongodb } from 'react-icons/si';
import { JSX } from 'react/jsx-runtime';
import { Molle } from 'next/font/google';

const molle = Molle({
  weight: '400',
  subsets: ['latin'],
});

type SkillCategory = 'frontend' | 'backend' | 'devops' | 'database' | 'mobile' | 'AI' | 'all';
type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface SkillProps {
  id?: string;
}

interface Skill {
  id: string;
  name: string;
  icon: JSX.Element;
  category: SkillCategory[];
  level: SkillLevel;
  experience: string;
  description: string;
  color: string;
}

const Skill: React.FC<SkillProps> = ({ id }) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  
  // Check if skills container is in view
  const isInView = useInView(skillsContainerRef, {
    once: true,
    margin: "-100px",
    amount: 0.1
  });

  // Scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityRange = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  // Check for mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Skill data
  const skillsData: Skill[] = [
    {
      id: 'react',
      name: 'React',
      icon: <FaReact />,
      category: ['frontend', 'mobile'],
      level: 'expert',
      experience: '1+ years',
      description: 'Building complex, interactive UIs with hooks, context, and performance optimizations.',
      color: 'text-blue-400'
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      icon: <SiNextdotjs />,
      category: ['frontend', 'backend'],
      level: 'expert',
      experience: '1+ years',
      description: 'SSR, SSG, ISR, API routes, middleware, and advanced optimizations.',
      color: 'text-gray-800 dark:text-gray-100'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      icon: <SiTypescript />,
      category: ['frontend', 'backend'],
      level: 'advanced',
      experience: '1+ years',
      description: 'Strong typing, generics, utility types, and complex type definitions.',
      color: 'text-blue-600'
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      icon: <SiTailwindcss />,
      category: ['frontend'],
      level: 'advanced',
      experience: '1+ years',
      description: 'Utility-first CSS with custom plugins and theming support.',
      color: 'text-cyan-400'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      icon: <FaNodeJs />,
      category: ['backend'],
      level: 'advanced',
      experience: '1+ years',
      description: 'Building scalable server-side applications and APIs with Express, NestJS.',
      color: 'text-green-500'
    },
    {
      id: 'python',
      name: 'Python',
      icon: <FaPython />,
      category: ['backend'],
      level: 'intermediate',
      experience: '1+ years',
      description: 'Data processing, scripting, and backend development with Django/Flask.',
      color: 'text-yellow-400'
    },
    {
      id: 'nlp',
      name: 'Natural Language Processing (NLP)',
      icon: <SiTensorflow />,
      category: ['AI'],
      level: 'intermediate',
      experience: '1+ years',
      description: 'Text preprocessing, sentiment analysis, and transformer-based models like BERT.',
      color: 'text-indigo-600'
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      icon: <SiPostgresql />,
      category: ['database'],
      level: 'intermediate',
      experience: '1+ years',
      description: 'Database design, query optimization, and advanced SQL features.',
      color: 'text-blue-700'
    },
    {
      id: 'aws',
      name: 'AWS',
      icon: <FaAws />,
      category: ['devops'],
      level: 'intermediate',
      experience: '1+ years',
      description: 'EC2, S3, Lambda, RDS, and other cloud services deployment.',
      color: 'text-orange-500'
    },
    {
      id: 'docker',
      name: 'Docker',
      icon: <FaDocker />,
      category: ['devops'],
      level: 'intermediate',
      experience: '1+ years',
      description: 'Containerization, Docker Compose, and deployment workflows.',
      color: 'text-blue-500'
    },
    {
      id: 'iot',
      name: 'Internet of Things (IoT)',
      icon: <SiInternetarchive />,
      category: ['backend', 'AI'],
      level: 'intermediate',
      experience: '1+ years',
      description: 'Built smart systems integrating sensors, microcontrollers, and cloud services.',
      color: 'text-green-600'
    },
    {
      id: 'arduino',
      name: 'Arduino',
      icon: <SiArduino />,
      category: ['backend', 'AI'],
      level: 'intermediate',
      experience: '1+ years',
      description: 'Prototyped embedded systems, sensor integrations, and real-time device control.',
      color: 'text-orange-600'
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      icon: <SiMongodb />,
      category: ['database'],
      level: 'intermediate',
      experience: '1+ years',
      description: 'Designed NoSQL schemas, handled CRUD operations, and optimized queries for scalable applications.',
      color: 'text-green-700'
    },
    {
      id: 'sql',
      name: 'SQL',
      icon: <SiMysql />,
      category: ['database'],
      level: 'intermediate',
      experience: '1+ years',
      description: 'Performed data modeling, complex joins, query optimization, and database management.',
      color: 'text-blue-700'
    }
  ];

  // Generate deterministic particle positions
  const getParticlePositions = () => {
    const positions = [];
    for (let i = 0; i < 15; i++) { // Reduced particles for mobile
      const seed = i * 137.3;
      const x = Math.abs(Math.sin(seed) * 50 + 50);
      const y = Math.abs(Math.cos(seed * 0.7) * 50 + 50);
      
      positions.push({
        x: `${x}%`,
        y: `${y}%`,
        color: i % 3 === 0 ? 'bg-blue-400/30' : i % 2 === 0 ? 'bg-purple-400/30' : 'bg-green-400/30',
        delay: (i * 0.2) % 6,
        id: i
      });
    }
    return positions;
  };

  // Get particle positions (deterministic)
  const particlePositions = getParticlePositions();

  // Generate deterministic floating icon positions
  const getFloatingIconPositions = () => {
    const positions = [];
    for (let i = 0; i < skillsData.length; i++) {
      const seed = i * 97.7;
      positions.push({
        left: `${10 + (Math.abs(Math.sin(seed)) * 80)}%`,
        top: `${20 + (Math.abs(Math.cos(seed * 0.9)) * 60)}%`,
        id: i
      });
    }
    return positions;
  };

  const floatingIconPositions = getFloatingIconPositions();

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category.includes(activeCategory));

  const categories: { id: SkillCategory; name: string; icon: JSX.Element }[] = [
    { id: 'all', name: 'All Skills', icon: <FiCode /> },
    { id: 'frontend', name: 'Frontend', icon: <FiLayers /> },
    { id: 'backend', name: 'Backend', icon: <FiServer /> },
    { id: 'database', name: 'Database', icon: <FiDatabase /> },
    { id: 'devops', name: 'DevOps', icon: <FiCpu /> },
    { id: 'mobile', name: 'Mobile', icon: <FiSmartphone /> }
  ];

  const getLevelColor = (level: SkillLevel) => {
    switch (level) {
      case 'beginner': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      case 'intermediate': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'advanced': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300';
      case 'expert': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300';
    }
  };

  const getLevelWidth = (level: SkillLevel) => {
    switch (level) {
      case 'beginner': return '25%';
      case 'intermediate': return '50%';
      case 'advanced': return '75%';
      case 'expert': return '100%';
      default: return '0%';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05 // Reduced stagger for faster mobile loading
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4, // Faster animation for mobile
        ease: "easeOut"
      }
    }
  };

  // Floating particles background
  const Particle = ({ x, y, color, delay }: { x: string; y: string; color: string; delay: number }) => (
    <motion.div
      className={`absolute rounded-full ${color} w-1.5 h-1.5`}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.4, 0],
        y: [0, -30],
        x: [0, Math.random() > 0.5 ? 10 : -10]
      }}
      transition={{
        delay,
        duration: 5 + Math.random() * 3, // Reduced duration for mobile
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ left: x, top: y }}
    />
  );

  return (
    <section id={id} className="relative">
      <div 
        ref={containerRef}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-purple-900 dark:via-black dark:to-purple-900 text-gray-900 dark:text-white p-4 sm:p-6 md:p-8 relative overflow-hidden"
      >
        {/* Animated background particles - deterministic */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particlePositions.map((particle) => (
            <Particle
              key={particle.id}
              x={particle.x}
              y={particle.y}
              color={particle.color}
              delay={particle.delay}
            />
          ))}
        </div>

        {/* Floating skill icons in background - deterministic */}
        <motion.div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ y: yRange, opacity: opacityRange }}
        >
          {skillsData.map((skill, i) => {
            const position = floatingIconPositions[i] || { left: '50%', top: '50%' };
            return (
              <motion.div
                key={`bg-${skill.id}`}
                className={`absolute ${skill.color} opacity-10`}
                style={{
                  left: position.left,
                  top: position.top,
                  fontSize: isMobile ? '1.5rem' : '4rem'
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 20 + i * 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {skill.icon}
              </motion.div>
            );
          })}
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header with 3D effect */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="mb-8 md:mb-12 text-center px-2"
          >
            <motion.h1
              className={`${molle.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl pt-4 md:pt-8 font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-green-500`}
              whileHover={{ scale: isMobile ? 1 : 1.02 }}
            >
              My Skills & Expertise
            </motion.h1>
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Technologies I&apos;ve mastered and tools I use to build amazing digital experiences
            </motion.p>
          </motion.div>

          {/* Interactive category tabs - Scrollable on mobile */}
          <motion.div 
            className="flex flex-nowrap md:flex-wrap gap-2 md:gap-3 mb-8 md:mb-12 px-2 overflow-x-auto pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ 
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent'
            }}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={!isMobile ? { 
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                } : {}}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex-shrink-0 px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-medium transition-all relative overflow-hidden flex items-center gap-2 whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gradient-to-br dark:from-purple-900/80 dark:via-black/80 dark:to-purple-900/80 backdrop-blur-sm text-gray-300 border border-gray-700 shadow hover:border-gray-600'
                }`}
              >
                {category.icon}
                <span className="text-sm md:text-base">{category.name}</span>
                {activeCategory === category.id && (
                  <motion.span
                    layoutId="activeCategoryIndicator"
                    className="absolute inset-0 bg-white/10 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Skills grid with scroll-triggered animations */}
          <motion.div
            ref={skillsContainerRef}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-2"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                variants={itemVariants}
                custom={index}
                className="relative group"
                onMouseEnter={() => !isMobile && setIsHovering(skill.id)}
                onMouseLeave={() => !isMobile && setIsHovering(null)}
              >
                {/* Skill card - Using the same gradient as main page */}
                <motion.div
                  onClick={() => setSelectedSkill(selectedSkill?.id === skill.id ? null : skill)}
                  className={`h-full bg-gradient-to-br dark:from-purple-900/90 dark:via-black/90 dark:to-purple-900/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 border border-gray-700 ${
                    selectedSkill?.id === skill.id 
                      ? 'ring-2 ring-blue-500' 
                      : 'hover:shadow-xl hover:border-gray-600'
                  }`}
                  whileHover={!isMobile ? { 
                    y: -5,
                    boxShadow: "0 15px 30px -5px rgba(0,0,0,0.2)"
                  } : {}}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-4 md:p-6">
                    {/* Skill icon with floating animation */}
                    <motion.div
                      animate={{
                        y: isHovering === skill.id && !isMobile ? [0, -5, 0] : 0,
                        rotate: isHovering === skill.id && !isMobile ? [0, 10, -10, 0] : 0
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className={`text-3xl md:text-4xl mb-3 md:mb-4 ${skill.color}`}
                    >
                      {skill.icon}
                    </motion.div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-white truncate">
                        {skill.name}
                      </h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getLevelColor(skill.level)} w-fit`}>
                        {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                      </span>
                    </div>

                    {/* Experience bar */}
                    <div className="mb-3 md:mb-4">
                      <div className="text-xs text-gray-300 mb-1">
                        {skill.experience} experience
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 md:h-2">
                        <motion.div 
                          className={`h-1.5 md:h-2 rounded-full ${
                            skill.level === 'beginner' ? 'bg-blue-500' :
                            skill.level === 'intermediate' ? 'bg-green-500' :
                            skill.level === 'advanced' ? 'bg-purple-500' :
                            'bg-yellow-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: getLevelWidth(skill.level) }}
                          transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
                        />
                      </div>
                    </div>

                    {/* Expanded details */}
                    <AnimatePresence>
                      {selectedSkill?.id === skill.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs md:text-sm text-gray-300 pt-3 border-t border-gray-700">
                            {skill.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Show hint on mobile */}
                    {!selectedSkill?.id && (
                      <div className="text-xs text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {isMobile ? 'Tap to see details' : 'Click to see details'}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Glow effect - desktop only */}
                {isHovering === skill.id && !isMobile && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-blue-500/10 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Empty state */}
          {filteredSkills.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 md:py-12"
            >
              <div className="text-4xl md:text-5xl mb-4">🧐</div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
                No skills found in this category
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                Try selecting a different category above
              </p>
            </motion.div>
          )}
        </div>

        {/* Scroll indicator for mobile */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40"
          >
            <div className="text-xs text-gray-300 bg-gradient-to-r from-purple-900/80 to-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow border border-gray-700">
              Scroll →
            </div>
          </motion.div>
        )}

        {/* 3D floating action button - Using the same gradient */}
        <motion.div
          className="fixed bottom-8 right-8 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-xl text-white"
            style={{
              boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)'
            }}
          >
            <FiCode className="text-xl" />
          </motion.button>
        </motion.div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .overflow-x-auto::-webkit-scrollbar {
          height: 4px;
        }
        .overflow-x-auto::-webkit-scrollbar-track {
          background: rgba(156, 163, 175, 0.1);
          border-radius: 10px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 10px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
      `}</style>
    </section>
  );
};

export default Skill;