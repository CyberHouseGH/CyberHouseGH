import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, BookOpen, Users, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-black text-white">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/baa.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '0.3'
          }}
        />
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            {...fadeInUp}
          >
            Welcome to <span className="text-cyan-500">Cyberhouse</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            A movement dedicated to cybersecurity awareness, education, and innovation. We empower individuals with digital skills, training, and a strong tech community to protect and secure the future.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              to="/join"
              className="bg-cyan-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-cyan-600 transition-colors transform hover:scale-105"
            >
              Join Cyberhouse Now
            </Link>
            <Link
              to="/training"
              className="bg-white text-black px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              Explore Our Training Programs
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Cyberhouse?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Shield className="h-12 w-12 text-cyan-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Training</h3>
              <p className="text-gray-600">
                Learn from industry professionals and gain practical cybersecurity skills.
              </p>
            </motion.div>
            <motion.div
              className="text-center p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Users className="h-12 w-12 text-cyan-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Strong Community</h3>
              <p className="text-gray-600">
                Join a network of like-minded individuals passionate about cybersecurity.
              </p>
            </motion.div>
            <motion.div
              className="text-center p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Lock className="h-12 w-12 text-cyan-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-World Projects</h3>
              <p className="text-gray-600">
                Work on actual cybersecurity challenges and build your portfolio.
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Latest News Section */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Latest News & Updates</h2>
            <Link to="/news" className="text-cyan-500 hover:text-cyan-600">
              View All News →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={`baa.png`}
                  alt="Cybersecurity"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Latest Cybersecurity Trends</h3>
                  <p className="text-gray-600 mb-4">
                    Stay updated with the latest developments in cybersecurity and technology.
                  </p>
                  <Link to="/news/1" className="text-cyan-500 hover:text-cyan-600">
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Cybersecurity Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Cyberhouse today and become part of a growing community of cybersecurity professionals.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/join"
              className="bg-cyan-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-cyan-600 transition-colors inline-block"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}