import React from 'react';
import { Shield, Search, PenTool as Tool, Newspaper, Megaphone } from 'lucide-react';

export default function About() {
  const subGroups = [
    {
      icon: Shield,
      name: 'Cyber Guardians',
      description: 'Educate & protect against cyber threats, forming the first line of defense in our community.',
      color: 'text-blue-500'
    },
    {
      icon: Search,
      name: 'Threat Hunters',
      description: 'Investigate and analyze attacks, staying ahead of emerging cyber threats.',
      color: 'text-purple-500'
    },
    {
      icon: Tool,
      name: 'Cyber Innovators',
      description: 'Build cutting-edge cybersecurity solutions and tools for the community.',
      color: 'text-green-500'
    },
    {
      icon: Newspaper,
      name: 'Cyber Sentinels',
      description: 'Report security news & trends, keeping our community informed and prepared.',
      color: 'text-yellow-500'
    },
    {
      icon: Megaphone,
      name: 'Cyberhouse Ambassadors',
      description: 'Expand and grow the community, spreading cybersecurity awareness.',
      color: 'text-red-500'
    }
  ];

  const benefits = [
    'Access to exclusive training materials and workshops',
    'Networking opportunities with industry professionals',
    'Hands-on experience with real-world cybersecurity projects',
    'Mentorship from experienced practitioners',
    'Regular CTF competitions and challenges',
    'Recognition and certificates for achievements',
    'Access to job opportunities and internships'
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">About Cyberhouse</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center">
            We are a community-driven organization dedicated to empowering individuals with cybersecurity skills and knowledge. Our mission is to create a safer digital world through education, innovation, and collaboration.
          </p>
        </div>
      </section>

      {/* Sub-Groups Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Our Sub-Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.name} className="bg-gray-50 rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
                  <Icon className={`h-12 w-12 ${group.color} mb-4`} />
                  <h3 className="text-xl font-semibold mb-3">{group.name}</h3>
                  <p className="text-gray-600">{group.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Why Join Cyberhouse?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6">Member Benefits</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Shield className="h-6 w-6 text-cyan-500 mr-3 flex-shrink-0 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-black rounded-lg p-8 text-white">
              <h3 className="text-2xl font-semibold mb-6">Our Impact</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-500 mb-2">500+</div>
                  <div className="text-gray-300">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-500 mb-2">50+</div>
                  <div className="text-gray-300">Training Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-500 mb-2">100+</div>
                  <div className="text-gray-300">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-500 mb-2">20+</div>
                  <div className="text-gray-300">Partner Companies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}