import React from 'react';
import { Users, Globe, Megaphone, Award, Target, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Ambassadors() {
  // Component code remains the same until the hero section
  const roles = [
    {
      icon: Users,
      title: 'Community Building',
      description: 'Growing and nurturing the Cyberhouse community.',
      color: 'text-blue-500'
    },
    {
      icon: Globe,
      title: 'Outreach Programs',
      description: 'Connecting with organizations and institutions.',
      color: 'text-green-500'
    },
    {
      icon: Megaphone,
      title: 'Awareness Campaigns',
      description: 'Promoting cybersecurity awareness and education.',
      color: 'text-purple-500'
    },
    {
      icon: Target,
      title: 'Event Organization',
      description: 'Planning and executing community events.',
      color: 'text-red-500'
    }
  ];

  const events = [
    {
      title: 'Cybersecurity Awareness Month',
      date: 'October 2025',
      description: 'Month-long campaign promoting security awareness',
      activities: ['Workshops', 'Webinars', 'Competitions', 'Networking']
    },
    {
      title: 'Tech Career Fair',
      date: 'September 2025',
      description: 'Connecting students with industry opportunities',
      activities: ['Job Fair', 'Resume Workshop', 'Mock Interviews', 'Networking']
    },
    {
      title: 'Community Hackathon',
      date: 'August 2025',
      description: 'Collaborative problem-solving event',
      activities: ['Coding', 'Team Building', 'Mentorship', 'Presentations']
    }
  ];

  const impact = [
    {
      number: '10,000+',
      label: 'Community Members',
      description: 'Engaged and active'
    },
    {
      number: '100+',
      label: 'Events Organized',
      description: 'Successfully executed'
    },
    {
      number: '50+',
      label: 'Partner Organizations',
      description: 'Strong collaborations'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cyberhouse Ambassadors</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Representing and growing the Cyberhouse community through outreach, events, and partnerships.
          </p>
          <div className="mt-8">
            <a
              href="https://chat.whatsapp.com/CdOpw8NVIkq3HGtLOCH2lV"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-colors"
            >
              Join our WhatsApp Group
            </a>
          </div>
        </div>
      </section>

      {/* Rest of the component remains the same */}
      {/* Roles Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Ambassador Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
                  <Icon className={`h-12 w-12 ${role.color} mx-auto mb-4`} />
                  <h3 className="text-xl font-semibold mb-3">{role.title}</h3>
                  <p className="text-gray-600">{role.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 text-cyan-500 mr-2" />
                    <span className="text-gray-600">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="space-y-2">
                    {event.activities.map((activity, i) => (
                      <div key={i} className="flex items-center">
                        <Target className="h-4 w-4 text-cyan-500 mr-2" />
                        <span className="text-gray-700">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impact.map((stat, index) => (
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
          <h2 className="text-3xl font-bold mb-6">Become an Ambassador</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Help us grow the Cyberhouse community and make a lasting impact in cybersecurity education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/join"
              className="bg-cyan-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-cyan-600 transition-colors"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="bg-white text-black px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}