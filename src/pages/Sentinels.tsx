import React from 'react';
import { Shield, BookOpen, Target, Video, Users, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sentinels() {
  const features = [
    {
      icon: Shield,
      title: 'Daily Cyber Tips',
      description: 'Stay updated with quick, actionable security tips to enhance your online safety.',
      color: 'text-blue-500'
    },
    {
      icon: BookOpen,
      title: 'Cyber Awareness Campaigns',
      description: 'Access educational content and discussions on trending cybersecurity topics.',
      color: 'text-green-500'
    },
    {
      icon: Video,
      title: 'Hands-on Learning',
      description: 'Watch video tutorials on security best practices and practical defense strategies.',
      color: 'text-purple-500'
    },
    {
      icon: Target,
      title: 'CTF Challenges',
      description: 'Participate in Capture The Flag challenges to learn about security vulnerabilities.',
      color: 'text-red-500'
    },
    {
      icon: Users,
      title: 'Expert Sessions & Webinars',
      description: 'Learn from industry professionals sharing insights on cybersecurity trends.',
      color: 'text-yellow-500'
    },
    {
      icon: Download,
      title: 'Resource Hub',
      description: 'Access downloadable security guides, articles, and recommended tools.',
      color: 'text-cyan-500'
    }
  ];

  const upcomingEvents = [
    {
      date: '2025-04-15',
      title: 'Phishing Defense Workshop',
      speaker: 'Perry Essandoh',
      type: 'Workshop'
    },
    {
      date: '2025-04-20',
      title: 'Advanced CTF Challenge',
      speaker: 'Karim Nurudeen',
      type: 'Challenge'
    },
    {
      date: '2025-04-25',
      title: 'Zero Trust Security',
      speaker: 'Mrs. Effuah Bentum',
      type: 'Webinar'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sentinels</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cyber Awareness & Defense - Empowering members with cybersecurity knowledge and defense strategies to protect against digital threats.
          </p>
          <div className="mt-8">
            <a
              href="https://chat.whatsapp.com/Ih2nzEVTMP7ImcemhWrVc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-colors"
            >
              Join our WhatsApp Group
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Activities & Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
                  <Icon className={`h-12 w-12 ${feature.color} mb-4`} />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="text-sm text-cyan-500 mb-2">{event.type}</div>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">with {event.speaker}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <button className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Latest Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Security Guides</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Download className="h-5 w-5 text-cyan-500 mr-2" />
                  <a href="#" className="text-gray-700 hover:text-cyan-500">Password Security Best Practices</a>
                </li>
                <li className="flex items-center">
                  <Download className="h-5 w-5 text-cyan-500 mr-2" />
                  <a href="#" className="text-gray-700 hover:text-cyan-500">Phishing Prevention Guide</a>
                </li>
                <li className="flex items-center">
                  <Download className="h-5 w-5 text-cyan-500 mr-2" />
                  <a href="#" className="text-gray-700 hover:text-cyan-500">Data Protection Checklist</a>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Video Tutorials</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Video className="h-5 w-5 text-cyan-500 mr-2" />
                  <a href="#" className="text-gray-700 hover:text-cyan-500">Two-Factor Authentication Setup</a>
                </li>
                <li className="flex items-center">
                  <Video className="h-5 w-5 text-cyan-500 mr-2" />
                  <a href="#" className="text-gray-700 hover:text-cyan-500">Secure Browser Configuration</a>
                </li>
                <li className="flex items-center">
                  <Video className="h-5 w-5 text-cyan-500 mr-2" />
                  <a href="#" className="text-gray-700 hover:text-cyan-500">VPN Usage Guide</a>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Tools & Software</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Shield className="h-5 w-5 text-cyan-500 mr-2" />
                  <a href="#" className="text-gray-700 hover:text-cyan-500">Recommended Password Managers</a>
                </li>
                <li className="flex items-center">
                  <Shield className="h-5 w-5 text-cyan-500 mr-2" />
                  <a href="#" className="text-gray-700 hover:text-cyan-500">Antivirus Software Guide</a>
                </li>
                <li className="flex items-center">
                  <Shield className="h-5 w-5 text-cyan-500 mr-2" />
                  <a href="#" className="text-gray-700 hover:text-cyan-500">Security Assessment Tools</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Sentinels Community</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Be part of a growing community dedicated to cybersecurity excellence and continuous learning.
          </p>
          <Link
            to="/join"
            className="bg-cyan-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-cyan-600 transition-colors inline-block"
          >
            Become a Sentinel
          </Link>
        </div>
      </section>
    </div>
  );
}