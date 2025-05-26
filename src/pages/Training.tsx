import React from 'react';
import { Shield, Monitor, Search, BookOpen, Clock, Users, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Training() {
  const courses = [
    {
      title: 'Cybersecurity Awareness & Ethical Hacking',
      description: 'Learn the fundamentals of cybersecurity and ethical hacking techniques.',
      duration: '12 weeks',
      level: 'Beginner to Intermediate',
      icon: Shield,
      topics: [
        'Introduction to Cybersecurity',
        'Network Security Basics',
        'Ethical Hacking Methodology',
        'Web Application Security',
        'Malware Analysis'
      ]
    },
    {
      title: 'Graphic Design & Video Editing',
      description: 'Master the art of digital design and video production.',
      duration: '8 weeks',
      level: 'All Levels',
      icon: Monitor,
      topics: [
        'Design Principles',
        'Adobe Creative Suite',
        'Video Editing Techniques',
        'Motion Graphics',
        'Project Portfolio'
      ]
    },
    {
      title: 'Cyber Threat Analysis & Digital Forensics',
      description: 'Develop skills in threat detection and digital investigation.',
      duration: '16 weeks',
      level: 'Intermediate to Advanced',
      icon: Search,
      topics: [
        'Threat Intelligence',
        'Incident Response',
        'Digital Forensics Tools',
        'Log Analysis',
        'Case Studies'
      ]
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Training & Development</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Enhance your skills with our comprehensive training programs designed by industry experts.
          </p>
        </div>
      </section>

      {/* Course Catalog */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12">
            {courses.map((course) => {
              const Icon = course.icon;
              return (
                <div key={course.title} className="bg-gray-50 rounded-lg p-8 shadow-lg">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/3">
                      <div className="flex items-center mb-4">
                        <Icon className="h-8 w-8 text-cyan-500 mr-3" />
                        <h2 className="text-2xl font-bold">{course.title}</h2>
                      </div>
                      <p className="text-gray-600 mb-6">{course.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-gray-400 mr-2" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-gray-400 mr-2" />
                          <span>{course.level}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-3">What you'll learn:</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.topics.map((topic) => (
                          <li key={topic} className="flex items-center">
                            <ArrowRight className="h-4 w-4 text-cyan-500 mr-2" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:w-1/3 flex flex-col justify-center items-center bg-white rounded-lg p-6 shadow-inner">
                      <Award className="h-16 w-16 text-cyan-500 mb-4" />
                      <Link
                        to="/join"
                        className="bg-cyan-500 text-white px-6 py-3 rounded-md font-medium hover:bg-cyan-600 transition-colors w-full text-center"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of learners and start your journey towards becoming a cybersecurity professional.
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
              className="bg-gray-800 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-900 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}