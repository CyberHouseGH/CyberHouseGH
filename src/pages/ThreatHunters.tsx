import React from 'react';
import { Search, Shield, Target, Code, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ThreatHunters() {
  const capabilities = [
    {
      icon: Search,
      title: 'Threat Detection',
      description: 'Advanced monitoring and detection of potential security threats.',
      color: 'text-purple-500'
    },
    {
      icon: Shield,
      title: 'Incident Response',
      description: 'Rapid response and mitigation of identified security incidents.',
      color: 'text-blue-500'
    },
    {
      icon: Target,
      title: 'Vulnerability Assessment',
      description: 'Systematic evaluation of security weaknesses and risks.',
      color: 'text-red-500'
    },
    {
      icon: Code,
      title: 'Security Analysis',
      description: 'In-depth analysis of security incidents and attack patterns.',
      color: 'text-green-500'
    }
  ];

  const tools = [
    {
      name: 'Network Monitoring',
      description: 'Real-time network traffic analysis and anomaly detection',
      features: ['Packet Analysis', 'Traffic Monitoring', 'Alert System', 'Log Analysis']
    },
    {
      name: 'Threat Intelligence',
      description: 'Collection and analysis of threat data from multiple sources',
      features: ['Data Collection', 'Pattern Recognition', 'Risk Assessment', 'Threat Scoring']
    },
    {
      name: 'Incident Management',
      description: 'Comprehensive incident tracking and response system',
      features: ['Case Management', 'Response Coordination', 'Documentation', 'Analytics']
    }
  ];

  const stats = [
    {
      number: '1000+',
      label: 'Threats Detected',
      description: 'Successfully identified and analyzed'
    },
    {
      number: '99.9%',
      label: 'Response Rate',
      description: 'Average incident response time'
    },
    {
      number: '24/7',
      label: 'Monitoring',
      description: 'Continuous security surveillance'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Threat Hunters</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Elite security analysts dedicated to identifying, tracking, and neutralizing cyber threats before they become incidents.
          </p>
          <div className="mt-8">
            <a
              href="https://chat.whatsapp.com/Lqb92t2tjYuGh44k85bQpE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-colors"
            >
              Join our WhatsApp Group
            </a>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Our Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
                  <Icon className={`h-12 w-12 ${capability.color} mx-auto mb-4`} />
                  <h3 className="text-xl font-semibold mb-3">{capability.title}</h3>
                  <p className="text-gray-600">{capability.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Our Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{tool.name}</h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <div className="space-y-2">
                    {tool.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <Shield className="h-4 w-4 text-cyan-500 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-cyan-500 mb-2">{stat.number}</div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Threat Hunting Team</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Be part of an elite team dedicated to protecting our digital infrastructure from emerging threats.
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
              View Requirements
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}