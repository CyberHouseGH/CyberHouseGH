import React from 'react';
import { Shield, Users, Target, BookOpen, Award, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CyberGuardians() {
  const responsibilities = [
    {
      icon: Shield,
      title: 'Community Protection',
      description: 'Lead the first line of defense in protecting our community from cyber threats.',
      color: 'text-blue-500'
    },
    {
      icon: Users,
      title: 'Security Education',
      description: 'Conduct workshops and training sessions on cybersecurity best practices.',
      color: 'text-green-500'
    },
    {
      icon: Target,
      title: 'Threat Prevention',
      description: 'Identify and prevent potential security risks before they become threats.',
      color: 'text-red-500'
    },
    {
      icon: BookOpen,
      title: 'Knowledge Sharing',
      description: 'Create and maintain educational resources for the community.',
      color: 'text-purple-500'
    }
  ];

  const trainingModules = [
    {
      title: 'Security Fundamentals',
      duration: '4 weeks',
      level: 'Beginner',
      topics: ['Basic Security Concepts', 'Risk Assessment', 'Security Tools', 'Incident Response']
    },
    {
      title: 'Advanced Protection',
      duration: '6 weeks',
      level: 'Intermediate',
      topics: ['Threat Analysis', 'Security Architecture', 'Defense Strategies', 'Security Auditing']
    },
    {
      title: 'Leadership Training',
      duration: '3 weeks',
      level: 'Advanced',
      topics: ['Team Management', 'Crisis Response', 'Strategic Planning', 'Communication']
    }
  ];

  const achievements = [
    {
      title: 'Community Impact',
      stats: '500+',
      description: 'Members Protected'
    },
    {
      title: 'Training Sessions',
      stats: '50+',
      description: 'Workshops Conducted'
    },
    {
      title: 'Success Rate',
      stats: '98%',
      description: 'Threat Prevention'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cyber Guardians</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The first line of defense in our community, dedicated to protecting and educating members about cybersecurity.
          </p>
        </div>
      </section>

      {/* Responsibilities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Our Responsibilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {responsibilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
                  <Icon className={`h-12 w-12 ${item.color} mx-auto mb-4`} />
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Training Modules */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Training Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainingModules.map((module, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{module.title}</h3>
                  <div className="flex items-center mb-4">
                    <Video className="h-5 w-5 text-cyan-500 mr-2" />
                    <span className="text-gray-600">{module.duration}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-600">{module.level}</span>
                  </div>
                  <div className="space-y-2">
                    {module.topics.map((topic, i) => (
                      <div key={i} className="flex items-center">
                        <Shield className="h-4 w-4 text-cyan-500 mr-2" />
                        <span className="text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-6 w-full bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors">
                    Start Training
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-cyan-500 mb-2">
                  {achievement.stats}
                </div>
                <div className="text-xl font-semibold mb-2">{achievement.title}</div>
                <div className="text-gray-600">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Become a Cyber Guardian</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our elite team of cybersecurity defenders and help protect our community from digital threats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/join"
              className="bg-cyan-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-cyan-600 transition-colors"
            >
              Apply Now
            </Link>
            <Link
              to="/training"
              className="bg-white text-black px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              View Training Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}