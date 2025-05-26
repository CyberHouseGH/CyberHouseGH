import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Instagram, Youtube, Video } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Cyberhouse Logo"
                className="h-37 w-45"
              />
            </div>
            <p className="text-gray-400">
              Empowering individuals with digital skills, training, and a strong tech community.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-cyan-500">About Us</Link></li>
              <li><Link to="/training" className="text-gray-400 hover:text-cyan-500">Training Programs</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-cyan-500">News & Articles</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-cyan-500">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Sub-Groups</h3>
            <ul className="space-y-2">
              <li><Link to="/cyber-guardians" className="text-gray-400 hover:text-cyan-500">Cyber Guardians</Link></li>
              <li><Link to="/threat-hunters" className="text-gray-400 hover:text-cyan-500">Threat Hunters</Link></li>
              <li><Link to="/cyber-innovators" className="text-gray-400 hover:text-cyan-500">Cyber Innovators</Link></li>
              <li><Link to="/sentinels" className="text-gray-400 hover:text-cyan-500">Cyber Sentinels</Link></li>
              <li><Link to="/ambassadors" className="text-gray-400 hover:text-cyan-500">Cyberhouse Ambassadors</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://x.com/CyberHouse008?t=SHWOSu7jMfqps6gO9ADZpw&s=09" className="text-gray-400 hover:text-cyan-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/cyberhouse008/?igsh=cnF0MHhmczVuOGJz" className="text-gray-400 hover:text-cyan-500">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/@cyberhouseghana" className="text-gray-400 hover:text-cyan-500">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="https://www.tiktok.com/@cyberhouseghana?_t=ZM-8vPxcUff7ln&_r=1" className="text-gray-400 hover:text-cyan-500">
                <Video className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Cyberhouseghana. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}