'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FiArrowRight, FiCode, FiChevronDown } from 'react-icons/fi';
import { FaGraduationCap, FaLaptopCode, FaCertificate } from 'react-icons/fa';
import { Molle } from 'next/font/google';

  const molle = Molle({
  weight: '400',
  subsets: ['latin'],
});
interface EduProps {
  id?: string;
}

type TimelineItem = {
  id: string;
  title: string;
  institution?: string;
  company?: string;
  position?: string;
  duration: string;
  description: string[];
  type: 'education' | 'experience' | 'certification';
  skills?: string[];
};

type TabType = 'education' | 'experience' | 'certifications';

const Edu: React.FC<EduProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState<TabType>('education');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Check system color scheme preference
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    };
    
    checkDarkMode();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);
    
    return () => mediaQuery.removeEventListener('change', checkDarkMode);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest * 100);
    if (latest > 0.01 && !hasScrolled) {
      setHasScrolled(true);
    }
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Timeline data remains the same
  const timelineData: TimelineItem[] = [
   {
  id: 'cert-1',
  title: 'NEC Basic Track',
  company: 'IIT Bombay - National Entrepreneurship Cell',
  duration: 'Jan 2025',
  description: [
    'Completed an intensive entrepreneurship program focused on startup ideation, business model development, and leadership skills',
    'Engaged in workshops on innovation management, team building, and product-market fit strategies',
    'Led a capstone project simulating real-world startup challenges to develop problem-solving and decision-making skills'
  ],
  type: 'certification',
  skills: ['Startup Strategy', 'Entrepreneurship', 'Leadership', 'Innovation Management', 'Business Model Development', 'Team Building', 'Problem Solving']
},

    {
      id: 'edu-2',
      title: 'Bachelor of Technology in Computer Science',
      institution: 'SRM University Delhi NCR',
      duration: '2022 - 2026',
      description: [
        '3rd year 6th Sem',
        'Final year project: "Smart Home Automation System"',
        'Active member of the coding club and hackathon participant',
        'Active member of Ecell & Incubation Center'
      ],
      type: 'education',
      skills: ['CSE All Core Subject', 'DS/AI with IBM', 'Embedded Systems', 'IoT']
    },
    {
      id: 'edu-3',
      title: 'Hight School',
      institution: 'S.P.A.M.H.S.S. KATA C. AHROLA AZAMGARH',
      duration: '2018 - 2019',
      description: [
        'Major subjects: Science, Hindi, English, Social Science, Computer Science',
        'Peak performer in current affair and international relationship challenge, 1st spot'
      ],
      type: 'education',
      skills: ['current affair', 'reasoning','critical thinking', 'Problem Solving']
    },
     {
      id: 'edu-3',
      title: 'Higher Secondary Education',
      institution: 'Mangal Murti Higher Secondary school Mumbai ',
      duration: '2019 - 2021',
      description: [
        'Major subjects: Physics, Chemistry, Mathematics, biology, IT Computer Science',
        '1st Rank in TypeMaster Challenge,2 spot in High acurracy data entry challenge using excel '
      ],
      type: 'education',
      skills: ['MS Excel', 'MS Word','Power Point','Tally Prime', 'HTML', 'CSS', 'IT','Grafic Designing using autodesk Maya & Bulender','Video Editing' ]
    },
    {
      id: 'exp-3',
      title: 'Campus Ambassador',
      company: 'TechFest Global',
      position: 'Ambassador',
      duration: 'Feb 2023 - May 2023',
      description: [
        'Promoted national-level coding contests on campus',
        'Managed event logistics and student registrations',
        'Increased event participation by 35%'
      ],
      type: 'experience',
      skills: ['Public Speaking', 'Event Management', 'Networking']
    },
    {
      id: 'cert-3',
      title: 'Python for Data Science',
      company: 'IBM',
      duration: 'Mar 2023',
      description: [
        'Mastered data wrangling, visualization, and predictive analytics',
        'Built final project: Customer churn prediction using logistic regression'
      ],
      type: 'certification',
      skills: ['Python', 'Pandas', 'Seaborn', 'Scikit-learn']
    },
    {
      id: 'cert-4',
      title: 'Git & GitHub Essentials',
      company: 'Udemy',
      duration: 'Jan 2023',
      description: [
        'Covered version control fundamentals and collaborative workflows',
        'Built team projects using branches, pull requests, and merge conflicts'
      ],
      type: 'certification',
      skills: ['Git', 'GitHub', 'Version Control']
    },
    {
  id: 'cert-5',
  title: 'Essentials of Hadoop',
  company: 'IBM',
  duration: 'Feb 2023',
  description: [
    'Learned fundamentals of distributed computing and Hadoop ecosystem',
    'Explored HDFS, MapReduce, and performed hands-on tasks on Hadoop clusters'
  ],
  type: 'certification',
  skills: ['Hadoop', 'HDFS', 'MapReduce']
},
{
  id: 'cert-6',
  title: 'Machine Learning Using R',
  company: 'IBM',
  duration: 'Apr 2023',
  description: [
    'Developed machine learning models using R programming',
    'Worked on classification, regression, and clustering techniques'
  ],
  type: 'certification',
  skills: ['R', 'Machine Learning', 'Data Science']
},
{
  id: 'cert-7',
  title: 'Cloud Application and Development (CAD)',
  company: 'IBM',
  duration: 'May 2023',
  description: [
    'Explored cloud-native application development and deployment on IBM Cloud',
    'Built and deployed scalable apps using containerization and microservices'
  ],
  type: 'certification',
  skills: ['Cloud Computing', 'DevOps', 'IBM Cloud', 'Microservices']
},
{
  id: 'cert-8',
  title: 'Android Studio Using Kotlin',
  company: 'IBM',
  duration: 'Jun 2023',
  description: [
    'Built Android applications using Kotlin and Android Studio',
    'Implemented interactive UI, API integrations, and local data storage'
  ],
  type: 'certification',
  skills: ['Kotlin', 'Android Studio', 'Mobile Development']
},
{
  id: 'cert-9',
  title: 'Blockchain & IoT',
  company: 'IBM',
  duration: 'Jul 2023',
  description: [
    'Learned integration of blockchain technology with IoT systems',
    'Built decentralized and secure IoT-based applications'
  ],
  type: 'certification',
  skills: ['Blockchain', 'IoT', 'Smart Contracts']
},
{
  id: 'cert-10',
  title: 'Big Data Analysis',
  company: 'IBM',
  duration: 'Aug 2023',
  description: [
    'Analyzed large-scale datasets using big data technologies',
    'Worked with tools like Hadoop and Spark for real-world data processing'
  ],
  type: 'certification',
  skills: ['Big Data', 'Data Analysis', 'Hadoop', 'Apache Spark']
},
{
  id: 'cert-11',
  title: 'IBM Watson Assistant Chatbot',
  company: 'IBM',
  duration: 'Sep 2023',
  description: [
    'Built AI-powered chatbot using IBM Watson Assistant',
    'Integrated natural language processing for real-time user interaction'
  ],
  type: 'certification',
  skills: ['Chatbot', 'NLP', 'IBM Watson Assistant']
},
{
  id: 'cert-12',
  title: 'Agile Methodology',
  company: 'IBM',
  duration: 'Oct 2023',
  description: [
    'Learned Agile principles, Scrum framework, and iterative project management',
    'Applied Agile practices in software development case studies'
  ],
  type: 'certification',
  skills: ['Agile', 'Scrum', 'Project Management']
},
{
  id: 'cert-13',
  title: 'Technovate 3.0',
  company: 'IBM',
  duration: 'Nov 2023',
  description: [
    'Participated in a national-level innovation and technology event',
    'Showcased project ideas and engaged in hands-on tech workshops'
  ],
  type: 'certification',
  skills: ['Innovation', 'Hackathon', 'Prototyping']
},
{
  id: 'cert-14',
  title: 'Data Privacy Fundamentals',
  company: 'IBM',
  duration: 'Dec 2023',
  description: [
    'Understood key data privacy principles and regulations (GDPR, CCPA)',
    'Learned data protection strategies and compliance best practices'
  ],
  type: 'certification',
  skills: ['Data Privacy', 'Cybersecurity', 'Compliance']
},
{
  id: 'cert-15',
  title: 'Industrial Training Certification',
  company: 'IBM',
  duration: 'Jan 2024',
  description: [
    'Completed hands-on industrial training on real-world software projects',
    'Worked collaboratively following Agile and SDLC methodologies'
  ],
  type: 'certification',
  skills: ['Team Collaboration', 'Real-World Projects', 'Software Development']
}

  ];

  const filteredData = timelineData.filter(item => item.type === activeTab || 
    (activeTab === 'certifications' && item.type === 'certification'));

  const handleItemClick = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const getIcon = (type: 'education' | 'experience' | 'certification', size = 20) => {
    switch (type) {
      case 'education': return <FaGraduationCap className="text-blue-400" size={size} />;
      case 'experience': return <FaLaptopCode className="text-green-400" size={size} />;
      case 'certification': return <FaCertificate className="text-purple-400" size={size} />;
      default: return <FiCode className="text-gray-400" size={size} />;
    }
  };

  const getTabColor = (tab: TabType) => {
    switch (tab) {
      case 'education': return isDarkMode 
        ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
        : 'bg-gradient-to-r from-blue-400 to-blue-500';
      case 'experience': return isDarkMode 
        ? 'bg-gradient-to-r from-green-600 to-green-700' 
        : 'bg-gradient-to-r from-green-400 to-green-500';
      case 'certifications': return isDarkMode 
        ? 'bg-gradient-to-r from-purple-600 to-purple-700' 
        : 'bg-gradient-to-r from-purple-400 to-purple-500';
      default: return isDarkMode 
        ? 'bg-gradient-to-r from-gray-600 to-gray-700' 
        : 'bg-gradient-to-r from-gray-400 to-gray-500';
    }
  };

  const tabs = [
    { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
    { id: 'experience', label: 'Experience', icon: <FaLaptopCode /> },
    { id: 'certifications', label: 'Certifications', icon: <FaCertificate /> }
  ] as const;

  const Particle = ({ x, y, color }: { x: string; y: string; color: string }) => (
    <motion.div
      className={`absolute rounded-full ${color} w-2 h-2`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        y: [0, -20],
        x: [0, Math.random() > 0.5 ? 10 : -10]
      }}
      transition={{
        duration: 4 + Math.random() * 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ left: x, top: y }}
    />
  );

  return (
     <section id={id} className="">
    <div 
      ref={containerRef}
      className={`min-h-screen p-4 md:p-8 lg:p-12 relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:via-purple-900 dark:to-black text-white'
          : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900'
      }`}
    >
      {[...Array(20)].map((_, i) => (
        <Particle
          key={i}
          x={`${Math.random() * 100}%`}
          y={`${Math.random() * 100}%`}
          color={
            isDarkMode
              ? i % 3 === 0 ? 'bg-blue-400/30' : i % 2 === 0 ? 'bg-purple-400/30' : 'bg-green-400/30'
              : i % 3 === 0 ? 'bg-blue-300/30' : i % 2 === 0 ? 'bg-purple-300/30' : 'bg-indigo-300/30'
          }
        />
      ))}

      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={hasScrolled ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-8 md:mb-16 text-center md:text-left"
        >
          <motion.h1 
  className={`${molle.className} text-4xl pt-8 md:text-6xl font-bold mb-2 bg-clip-text text-transparent mt-8 ${
    isDarkMode 
      ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400' 
      : 'bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500'
  }`}
  whileHover={{ scale: 1.02 }}
>
  My Professional Journey
</motion.h1>

          <motion.p 
            className={`text-lg md:text-xl max-w-2xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0 }}
            animate={hasScrolled ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
           Explore my educational background, diverse work experience, technical skills, and professional certifications that showcase my journey and growth as a developer.
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap gap-3 mb-8 md:mb-12 justify-center md:justify-start"
          initial={{ opacity: 0 }}
          animate={hasScrolled ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ 
                scale: 1.05,
                y: -3,
                boxShadow: isDarkMode 
                  ? "0 10px 20px rgba(0,0,0,0.2)" 
                  : "0 10px 20px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab(tab.id);
                setExpandedItem(null);
              }}
              className={`px-6 py-3 rounded-xl font-medium transition-all relative overflow-hidden flex items-center gap-2 ${
                activeTab === tab.id
                  ? `${getTabColor(tab.id)} text-white shadow-lg`
                  : isDarkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-black text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <div className="relative">
          <motion.div 
            className={`absolute left-4 md:left-8 top-0 h-full w-1 rounded-full hidden md:block ${
              isDarkMode 
                ? 'bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500'
                : 'bg-gradient-to-b from-blue-400 via-purple-400 to-indigo-400'
            }`}
            initial={{ scaleY: 0 }}
            animate={hasScrolled ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {isMobile && (
            <div className="absolute left-4 top-0 h-full w-2 flex flex-col items-center">
              {filteredData.map((_, i) => (
                <motion.div
                  key={`mobile-dot-${i}`}
                  className={`w-3 h-3 rounded-full mb-8 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-500'
                      : 'bg-gradient-to-r from-blue-300 to-purple-400'
                  }`}
                  initial={{ scale: 0 }}
                  animate={hasScrolled ? { scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                />
              ))}
            </div>
          )}

          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={hasScrolled ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-6 md:space-y-8"
            >
              {filteredData.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={hasScrolled ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 100
                  }}
                  className="relative group"
                  onMouseEnter={() => !isMobile && setIsHovering(item.id)}
                  onMouseLeave={() => !isMobile && setIsHovering(null)}
                >
                  <motion.div
                    animate={{
                      scale: isHovering === item.id || expandedItem === item.id ? [1, 1.1, 1] : 1,
                      boxShadow: isHovering === item.id || expandedItem === item.id ? 
                        `0 0 15px ${item.type === 'education' ? 'rgba(96, 165, 250, 0.7)' : 
                         item.type === 'experience' ? 'rgba(74, 222, 128, 0.7)' : 
                         'rgba(167, 139, 250, 0.7)'}` : 'none'
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`absolute left-0 md:left-8 top-6 h-5 w-5 rounded-full ${
                      item.type === 'education' ? isDarkMode ? 'bg-blue-500' : 'bg-blue-400' :
                      item.type === 'experience' ? isDarkMode ? 'bg-green-500' : 'bg-green-400' :
                      isDarkMode ? 'bg-purple-500' : 'bg-purple-400'
                    } transform -translate-x-1/2 z-10 flex items-center justify-center shadow-lg`}
                  >
                    {getIcon(item.type, 14)}
                  </motion.div>

                  <motion.div
                    layout
                    onClick={() => handleItemClick(item.id)}
                    className={`ml-10 md:ml-24 p-5 md:p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                      isHovering === item.id
                        ? isDarkMode ? 'bg-gradient-to-br  dark:from-purple-900 dark:via-black dark:to-purple-900 shadow-xl' : 'bg-white shadow-xl'
                        : isDarkMode ? 'bg-gradient-to-br  dark:from-black dark:via-purple-900 dark:to-black hover:bg-gray-800' : 'bg-white/90 hover:bg-white'
                    } ${
                      expandedItem === item.id ? 'ring-2 ring-opacity-50 ' + 
                        (item.type === 'education' ? isDarkMode ? 'ring-blue-500' : 'ring-blue-400' :
                         item.type === 'experience' ? isDarkMode ? 'ring-green-500' : 'ring-green-400' :
                         isDarkMode ? 'ring-purple-500' : 'ring-purple-400') : ''
                    } border ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}
                    whileHover={!isMobile ? { 
                      scale: 1.02,
                      boxShadow: isDarkMode 
                        ? "0 10px 25px -5px rgba(0,0,0,0.3)"
                        : "0 10px 25px -5px rgba(0,0,0,0.1)"
                    } : {}}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <motion.h3 
                          className="text-lg md:text-xl lg:text-2xl font-bold mb-1"
                          animate={{ 
                            color: isHovering === item.id || expandedItem === item.id ? 
                              item.type === 'education' ? '#60a5fa' : 
                              item.type === 'experience' ? '#4ade80' : 
                              '#a78bfa' : isDarkMode ? 'white' : 'text-gray-800'
                          }}
                        >
                          {item.title}
                        </motion.h3>
                        <motion.p 
                          className={`text-base md:text-lg ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}
                          animate={{
                            x: isHovering === item.id || expandedItem === item.id ? 5 : 0
                          }}
                        >
                          {item.institution || item.company}
                          {item.position && <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}> • {item.position}</span>}
                        </motion.p>
                      </div>
                      <motion.span 
                        className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                        }`}
                        animate={{
                          scale: isHovering === item.id || expandedItem === item.id ? 1.05 : 1
                        }}
                      >
                        {item.duration}
                      </motion.span>
                    </div>

                    <AnimatePresence>
                      {expandedItem === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="mt-4 overflow-hidden"
                        >
                          <ul className="space-y-2">
                            {item.description.map((desc, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                                className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                              >
                                <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-500'} mr-2`}>•</span> {desc}
                              </motion.li>
                            ))}
                          </ul>
                          
                          {item.skills && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                              className="mt-4 flex flex-wrap gap-2"
                            >
                              {item.skills.map((skill) => (
                                <motion.span
                                  key={skill}
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ type: 'spring', stiffness: 200 }}
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    item.type === 'education' 
                                      ? isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                                      : item.type === 'experience' 
                                        ? isDarkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'
                                        : isDarkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-800'
                                  }`}
                                >
                                  {skill}
                                </motion.span>
                              ))}
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div
                      animate={{
                        x: isHovering === item.id || expandedItem === item.id ? 5 : 0,
                        color: isHovering === item.id || expandedItem === item.id ? 
                          item.type === 'education' ? '#60a5fa' : 
                          item.type === 'experience' ? '#4ade80' : 
                          '#a78bfa' : isDarkMode ? '#60a5fa' : '#3b82f6'
                      }}
                      className="mt-3 flex items-center text-sm md:text-base font-medium"
                    >
                      {expandedItem === item.id ? 'Hide details' : 'Show details'}
                      <motion.span
                        animate={{ 
                          rotate: expandedItem === item.id ? 180 : 0
                        }}
                      >
                        <FiChevronDown className="ml-1" />
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={hasScrolled ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"
        >
          <FiArrowRight className="text-white text-xl" />
        </motion.button>
      </motion.div>
    </div>
    </section>
  );
};

export default Edu;