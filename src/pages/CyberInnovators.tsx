import React from 'react';
import { Code, Lightbulb, PenTool as Tool, Rocket, Users, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CyberInnovators() {
  const innovations = [
    {
      icon: Code,
      title: 'Security Tools',
      description: 'Developing cutting-edge cybersecurity solutions and tools.',
      color: 'text-blue-500'
    },
    {
      icon: Lightbulb,
      title: 'Research & Development',
      description: 'Exploring new approaches to cybersecurity challenges.',
      color: 'text-yellow-500'
    },
    {
      icon: Tool,
      title: 'Custom Solutions',
      description: 'Building tailored security solutions for specific needs.',
      color: 'text-green-500'
    },
    {
      icon: Rocket,
      title: 'Innovation Lab',
      description: 'Testing and implementing new security technologies.',
      color: 'text-purple-500'
    }
  ];

  const projects = [
    {
      name: 'Threat Detection System',
      status: 'In Development',
      description: 'AI-powered system for early threat detection',
      technologies: ['Python', 'Machine Learning', 'Cloud Computing']
    },
    {
      name: 'Security Dashboard',
      status: 'Beta Testing',
      description: 'Unified interface for security monitoring',
      technologies: ['React', 'Node.js', 'GraphQL']
    },
    {
      name: 'Vulnerability Scanner',
      status: 'Released',
      description: 'Automated security assessment tool',
      technologies: ['Go', 'Docker', 'REST API']
    }
  ];

  const achievements = [
    {
      number: '20+',
      label: 'Tools Developed',
      description: 'Security solutions created'
    },
    {
      number: '5000+',
      label: 'Active Users',
      description: 'Using our solutions'
    },
    {
      number: '10+',
      label: 'Research Papers',
      description: 'Published findings'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cyber Innovators</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Building the next generation of cybersecurity solutions through innovation and technology.
          </p>
          <div className="mt-8">
            <a
              href="https://chat.whatsapp.com/FF8UO80Ktk8DLIjeCKnXbg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-colors"
            >
              Join our WhatsApp Group
            </a>
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Our Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {innovations.map((innovation, index) => {
              const Icon = innovation.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
                  <Icon className={`h-12 w-12 ${innovation.color} mx-auto mb-4`} />
                  <h3 className="text-xl font-semibold mb-3">{innovation.title}</h3>
                  <p className="text-gray-600">{innovation.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Current Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <span className="text-sm text-cyan-500">{project.status}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-cyan-500 mb-2">{achievement.number}</div>
                <div className="text-xl font-semibold mb-2">{achievement.label}</div>
                <div className="text-gray-600">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Innovation Team</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Help shape the future of cybersecurity through innovation and technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/join"
              className="bg-cyan-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-cyan-600 transition-colors"
            >
              Join Our Team
            </Link>
            <Link
              to="/projects"
              className="bg-white text-black px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}