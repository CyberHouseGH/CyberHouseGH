import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load all pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Training = React.lazy(() => import('./pages/Training'));
const News = React.lazy(() => import('./pages/News'));
const ArticleDetail = React.lazy(() => import('./pages/ArticleDetail'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Join = React.lazy(() => import('./pages/Join'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Sentinels = React.lazy(() => import('./pages/Sentinels'));
const CyberGuardians = React.lazy(() => import('./pages/CyberGuardians'));
const ThreatHunters = React.lazy(() => import('./pages/ThreatHunters'));
const CyberInnovators = React.lazy(() => import('./pages/CyberInnovators'));
const Ambassadors = React.lazy(() => import('./pages/Ambassadors'));
const SecurityTools = React.lazy(() => import('./pages/SecurityTools'));
const Mentors = React.lazy(() => import('./pages/Mentors'));

// Loading component with animation
const PageLoader = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen flex items-center justify-center"
  >
    <motion.div 
      animate={{ 
        rotate: 360,
        scale: [1, 1.2, 1],
      }}
      transition={{ 
        duration: 1.5,
        repeat: Infinity,
        ease: "linear" 
      }}
      className="rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"
    />
  </motion.div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/training" element={<Training />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/news/:id" element={<ArticleDetail />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/join" element={<Join />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/sentinels" element={<Sentinels />} />
                  <Route path="/cyber-guardians" element={<CyberGuardians />} />
                  <Route path="/threat-hunters" element={<ThreatHunters />} />
                  <Route path="/cyber-innovators" element={<CyberInnovators />} />
                  <Route path="/ambassadors" element={<Ambassadors />} />
                  <Route path="/security-tools" element={<SecurityTools />} />
                  <Route path="/mentors" element={<Mentors />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>
          <ScrollToTop />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;