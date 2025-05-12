import Navbar from '@/components/Navbar'
import Contact from '@/components/portfolio/Contact'
import Edu from '@/components/portfolio/Edu'
import Landing from '@/components/portfolio/Landing'
import Project from '@/components/portfolio/Project'
import Skill from '@/components/portfolio/Skill'
import Footer from '@/components/portfolio/Footer'
import React from 'react'
import AboutMe from '@/components/portfolio/AboutMe'

const page = () => {
  return (
    <div>
      <Navbar/>
      <Landing/>
      <AboutMe/>
      <Edu/>
      <Skill/>
      <Project/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default page
