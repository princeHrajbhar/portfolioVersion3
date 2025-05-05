'use client'
import React from 'react'

const BackgroundVideo = () => {
  return (
    <video
      autoPlay
      muted
      loop
      className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
    >
      <source src="/techex.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default BackgroundVideo
