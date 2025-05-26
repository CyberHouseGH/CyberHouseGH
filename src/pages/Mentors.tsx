import React from 'react';
import { Mail, Linkedin, Github, Code, BookOpen, Users, Megaphone } from 'lucide-react';

const mentors = [
  {
    name: 'Nana Kweku Baah',
    role: 'Developer',
    expertise: ['Tool Development', 'Cybersecurity', 'Scripting'],
    image: 'image2.jpeg',
    email: 'nana.baah@cyberhouse.com',
    task: 'Assist the Cyber Innovators with developing or refining a basic cybersecurity tool idea. Guide members with scripting or tool planning .',
    icon: Code
  },
  {
    name: 'Efua Bentum',
    role: 'Head of Content Creators & Public Speaking',
    expertise: ['Content Creation', 'Public Speaking', 'Training'],
    image: 'image7.jpeg',
    email: 'mmefbentum22@gmail.com',
    task: 'Support the Sentinels in preparing content. Also help with content review and delivery quality.',
    icon: BookOpen
  },
  {
    name: 'Karim Nurudeen',
    role: 'Head of Developers',
    expertise: ['AI Development', 'Networking', 'Web and Database Administration'],
    image: 'karim.jpg',
    email: 'karimnurudeen13@gmail.com',
    task: 'Oversee the AI Innovators, assists in automation , Provide input and support for technical feasibility.',
    icon: Code
  },
  {
    name: 'Dwayne Eshun',
    role: 'Developer',
    expertise: ['Security Tools', 'Penetration Tester', 'Technical Training'],
    image: 'image10.jpeg',
    email: 'dwayne.eshun@cyberhouse.com',
    task: 'Help Threat Hunters (decode mini challenge), (tool discovery). Provide tech help and explanations where needed.',
    icon: Code
  },

  {
    name: 'Ebenezar Boadu Tetteh',
    role: 'Marketing Manager',
    expertise: ['Marketing Strategy', 'Brand Development', 'Community Outreach'],
    image: 'image3.jpeg',
    email: 'ebenezar.tetteh@cyberhouse.com',
    task: 'Oversee marketing initiatives and brand development for Cyberhouse.',
    icon: Megaphone
  },
  {
    name: 'Johua Taigo',
    role: 'Leader',
    expertise: ['Team Leadership', 'Community Building'],
    image: 'image1.jpeg',
    email: 'perryessandoh3@gmail.com',
    task: 'Oversees cyberhouse activities.',
    icon: Users
  },
  {
    name: 'Perry Essandoh',
    role: 'Chief Executive Officer',
    expertise: ['Team Leadership', 'Community Building'],
    image: 'perry.jpeg',
    email: 'perryessandoh3@gmail.com',
    task: 'Oversees cyberhouse activities.',
    icon: Users
  }
];

export default function Mentors() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Our Team</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center">
            Meet our dedicated team of professionals working to make Cyberhouse a leading cybersecurity community.
          </p>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mentors.map((member) => {
              const Icon = member.icon;
              return (
                <div key={member.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center mb-2">
                        <Icon className="h-6 w-6 text-cyan-500 mr-2" />
                        <h3 className="text-xl font-bold">{member.name}</h3>
                      </div>
                      <p className="text-cyan-600 font-medium mb-4">{member.role}</p>

                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-500 mb-2">Responsibilities</h4>
                        <p className="text-gray-600 text-sm">{member.task}</p>
                      </div>

                      <div className="flex items-center pt-4 border-t border-gray-200">
                        <a
                          href={`mailto:${member.email}`}
                          className="text-gray-500 hover:text-cyan-600 transition-colors mr-4"
                          title="Email"
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                        <a
                          href="#"
                          className="text-gray-500 hover:text-cyan-600 transition-colors mr-4"
                          title="LinkedIn"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a
                          href="#"
                          className="text-gray-500 hover:text-cyan-600 transition-colors"
                          title="GitHub"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Have questions or want to learn more about our programs? Reach out to our team members directly or contact us through our general inquiry line.
          </p>
          <a
            href="mailto:team@cyberhouse.com"
            className="bg-cyan-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-cyan-600 transition-colors inline-block"
          >
            Contact Team
          </a>
        </div>
      </section>
    </div>
  );
}