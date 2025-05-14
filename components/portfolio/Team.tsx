'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Molle } from 'next/font/google';

  const molle = Molle({
  weight: '400',
  subsets: ['latin'],
});
interface TeamMember {
  name: string;
  role: string;
  location: string;
  opinion: string;
  avatar: string;
}

interface TeamProps {
  id?: string;
}

export default function TeamCollaboration({ id }: TeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const teamMembers: TeamMember[] = [
    {
      name: 'John Carter',
      role: 'Lead Developer',
      location: 'New York, USA',
      opinion: 'Working with you was an absolute pleasure. Your attention to detail and communication skills made this project a huge success.',
      avatar: '/prince.jpg',
    },
     {
      name: 'John Carter',
      role: 'Lead Developer',
      location: 'New York, USA',
      opinion: 'Working with you was an absolute pleasure. Your attention to detail and communication skills made this project a huge success.',
      avatar: '/prince.jpg',
    },
     {
      name: 'John Carter',
      role: 'Lead Developer',
      location: 'New York, USA',
      opinion: 'Working with you was an absolute pleasure. Your attention to detail and communication skills made this project a huge success.',
      avatar: '/prince.jpg',
    },
     {
      name: 'John Carter',
      role: 'Lead Developer',
      location: 'New York, USA',
      opinion: 'Working with you was an absolute pleasure. Your attention to detail and communication skills made this project a huge success.',
      avatar: '/prince.jpg',
    },
    // Add more team members...
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoScroll && containerRef.current) {
      interval = setInterval(() => {
        if (containerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
          const maxScroll = scrollWidth - clientWidth;

          if (scrollLeft >= maxScroll - 50) {
            containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
          }
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoScroll]);

return (
  <section
    id={id}
    className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-purple-900 dark:via-black dark:to-purple-900 relative overflow-hidden"
  >
    <div className="container mx-auto px-4">
      <h2 className={`${molle.className} text-4xl md:text-6xl font-bold mb-4 pt-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-center mb-6`}>
  Team Collaborations
</h2>

      <p className="text-center text-gray-900 dark:text-white max-w-3xl mx-auto mb-12">
        Our success is built on strong collaboration. Here are a few words from our teammates
        and contributors who played a vital role in bringing our vision to life. Each person
        brought unique strengths, creativity, and commitment to the project.
      </p>

      <div
        ref={containerRef}
        className="flex overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth"
        onMouseEnter={() => setAutoScroll(false)}
        onMouseLeave={() => setAutoScroll(true)}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex space-x-8 min-w-max">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="snap-center flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:via-purple-900 dark:to-black rounded-xl p-6 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-900 dark:text-white font-semibold">{member.name}</h3>
                  <p className="text-blue-700 text-sm">{member.role}</p>
                  <p className="text-gray-900 dark:text-white text-sm">{member.location}</p>
                </div>
              </div>
              <p className="text-gray-900 dark:text-white italic relative pl-6 before:content-['“'] before:absolute before:left-0 before:text-3xl before:text-purple-500">
                {member.opinion}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center space-x-2 mt-8">
        {teamMembers.map((_, index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:via-purple-900 dark:to-black transition-colors"
          />
        ))}
      </div>
    </div>
  </section>
);

}
