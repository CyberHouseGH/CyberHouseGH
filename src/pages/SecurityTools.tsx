import React, { useState } from 'react';
import { Shield, Lock, AlertTriangle, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function SecurityTools() {
  const { user } = useAuth();
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    switch (strength) {
      case 0:
      case 1:
        return 'Very Weak';
      case 2:
        return 'Weak';
      case 3:
        return 'Medium';
      case 4:
        return 'Strong';
      case 5:
        return 'Very Strong';
      default:
        return '';
    }
  };

  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordInput(password);
    setPasswordStrength(checkPasswordStrength(password));
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Very Weak':
        return 'text-red-600';
      case 'Weak':
        return 'text-orange-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'Strong':
        return 'text-green-500';
      case 'Very Strong':
        return 'text-emerald-500';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Security Tools</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center">
            Access our collection of cybersecurity tools to help protect your digital identity.
          </p>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email Breach Checker */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
                  <h2 className="text-2xl font-bold">Email Breach Checker</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Check if your email has been compromised in any known data breaches. This tool helps you identify potential security risks associated with your email accounts.
                </p>
                <div className="space-y-4">
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-gray-600">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      Checks against multiple breach databases
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      Instant results
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      Detailed breach information
                    </li>
                  </ul>
                  <a
                    href="https://haveibeenpwned.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors group"
                  >
                    Check Email on haveibeenpwned.com
                    <ExternalLink className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Password Strength Checker */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Lock className="h-8 w-8 text-cyan-500 mr-3" />
                  <h2 className="text-2xl font-bold">Password Strength Checker</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Test the strength of your passwords to ensure they meet modern security standards. Our tool analyzes various aspects of password security.
                </p>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Quick Check
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={passwordInput}
                      onChange={handlePasswordCheck}
                      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Enter password to check strength"
                    />
                  </div>
                  {passwordStrength && (
                    <div className="mt-4">
                      <p className="text-lg font-semibold">
                        Strength:{' '}
                        <span className={getStrengthColor(passwordStrength)}>
                          {passwordStrength}
                        </span>
                      </p>
                    </div>
                  )}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-gray-600 mb-4">
                      For a more detailed analysis, use our advanced password checker:
                    </p>
                    <a
                      href="https://sayperry.github.io/Password-Strength-Checker/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-cyan-500 text-white px-6 py-3 rounded-md hover:bg-cyan-600 transition-colors group"
                    >
                      Advanced Password Checker
                      <ExternalLink className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Tips Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Security Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Password Security</h3>
              <ul className="space-y-3 text-gray-600">
                <li>Use unique passwords for each account</li>
                <li>Include numbers, symbols, and mixed case letters</li>
                <li>Make passwords at least 12 characters long</li>
                <li>Avoid personal information in passwords</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Email Security</h3>
              <ul className="space-y-3 text-gray-600">
                <li>Enable two-factor authentication</li>
                <li>Be cautious of unexpected attachments</li>
                <li>Verify sender addresses carefully</li>
                <li>Don't click suspicious links</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">General Safety</h3>
              <ul className="space-y-3 text-gray-600">
                <li>Keep software up to date</li>
                <li>Use a password manager</li>
                <li>Regular security audits</li>
                <li>Backup important data</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}