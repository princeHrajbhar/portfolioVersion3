'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutMe = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-purple-900 dark:via-black dark:to-purple-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-12 items-center"
        >
          {/* Image Section - Left Side with Enhanced Filter */}
          <div className="md:w-1/3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative rounded-2xl overflow-hidden">
                {/* Purple-black filter overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-purple-900/20 to-transparent mix-blend-multiply rounded-2xl z-10"></div>
                <Image
                  src="/prince1.jpg"
                  alt="Prince Kumar"
                  width={400}
                  height={400}
                  className="relative rounded-2xl border-4 border-white dark:border-gray-800 shadow-xl w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>

          {/* Content Section - Right Side */}
          <div className="md:w-2/3">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              About <span className="text-purple-600 dark:text-purple-400">Me</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-6"
            >
              Passionate frontend developer with 5+ years of experience creating
              beautiful, responsive, and user-friendly web applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4 text-gray-700 dark:text-gray-300"
            >
              <p>
                I specialize in modern JavaScript frameworks like React and Next.js,
                with a strong focus on creating accessible, performant user interfaces.
                My approach combines technical expertise with an eye for design.
              </p>

              <p>
                Currently working at <span className="font-medium text-purple-600 dark:text-purple-400">Tech Company</span> where
                I lead the frontend development team and architect scalable solutions.
              </p>

              <p>
                When I&apos;m not coding, you&apos;ll find me hiking in the mountains,
                reading science fiction, or experimenting with new cooking recipes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Contact Me
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="/resume.pdf"
                download
                className="px-6 py-3 border-2 border-purple-500 text-purple-600 dark:text-purple-400 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                Download Resume
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;