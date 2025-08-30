import React, { useState } from 'react';
import { Mail, Phone, MapPin, Twitter, Instagram } from 'lucide-react';
import { sendContactMessage } from '../lib/firebase';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);
    try {
      const result = await sendContactMessage({ name, email, subject, message });
      if (result.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatus('error');
        setError(result.error || 'Failed to send message');
      }
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Failed to send message');
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center">
            Have questions? We're here to help. Reach out to us through any of our channels.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'success' && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-md">Message sent successfully!</div>
                )}
                {status === 'error' && error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-cyan-500 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Email</h3>
                    <p className="text-gray-600">cyberhouse008@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-cyan-500 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Phone</h3>
                    <p className="text-gray-600">+233 -208394038</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-cyan-500 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Location</h3>
                    <p className="text-gray-600">
                      ACCRA-GHANA
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Follow us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://x.com/CyberHouse008?t=SHWOSu7jMfqps6gO9ADZpw&s=09"
                      className="text-gray-400 hover:text-cyan-500 transition-colors"
                    >
                      <Twitter className="h-6 w-6" />
                    </a>


                    <a
                      href="https://www.instagram.com/cyberhouse008/?igsh=cnF0MHhmczVuOGJz"
                      className="text-gray-400 hover:text-cyan-500 transition-colors"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-3">How can I join Cyberhouse?</h3>
              <p className="text-gray-600">
                Visit our Join page to fill out the membership application form. Once submitted, our team will review your application and get back to you within 48 hours.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-3">What training programs do you offer?</h3>
              <p className="text-gray-600">
                We offer various programs including Cybersecurity Awareness, Ethical Hacking, Graphic Design, and more. Check our Training page for the full list.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-3">Are the training programs free?</h3>
              <p className="text-gray-600">
                Some introductory courses are free for members. Premium courses have a fee, but we offer scholarships for eligible students.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-3">How can I contribute to Cyberhouse?</h3>
              <p className="text-gray-600">
                Members can contribute by submitting articles, participating in events, mentoring others, or joining our volunteer program.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}