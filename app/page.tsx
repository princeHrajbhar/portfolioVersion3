'use client';

import Navbar from '@/components/Navbar';
import Contact from '@/components/portfolio/Contact';
import Edu from '@/components/portfolio/Edu';
import Landing from '@/components/portfolio/Landing';
import Project from '@/components/portfolio/Project';
import Skill from '@/components/portfolio/Skill';
import Footer from '@/components/portfolio/Footer';
import React, { useState, useEffect } from 'react';
import AboutMe from '@/components/portfolio/AboutMe';

const PortfolioPage = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <Landing id="home" />
      <AboutMe id="about" />
      <Edu id="education" />
      <Skill id="skills" />
      <Project id="projects" />
      <Contact id="contact" />
      <Footer />
    </div>
  );
};

export default PortfolioPage;