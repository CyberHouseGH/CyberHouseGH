import React, { useState } from 'react';
import { Shield, Users, Award, Rocket, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Join() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission with selected tier
    navigate('/register', { state: { membershipType: selectedTier } });
  };

  const benefits = [
    {
      icon: Shield,
      title: 'Expert Training',
      description: 'Access to premium cybersecurity courses and workshops'
    },
    {
      icon: Users,
      title: 'Network Growth',
      description: 'Connect with industry professionals and like-minded individuals'
    },
    {
      icon: Award,
      title: 'Certification',
      description: 'Earn certificates upon completing training programs'
    },
    {
      icon: Rocket,
      title: 'Career Growth',
      description: 'Access to job opportunities and career guidance'
    }
  ];

  const membershipLevels = [
    {
      name: 'Student',
      price: 'Free',
      features: [
        'Access to basic training materials',
        'Community forum access',
        'Monthly workshops',
        'Student project support'
      ],
      recommended: false
    },
    {
      name: 'Professional',
      price: '$29/month',
      features: [
        'All Student features',
        'Advanced training courses',
        'Priority mentorship',
        'Industry certifications',
        'Job board access'
      ],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'All Professional features',
        'Custom training programs',
        'Dedicated support',
        'Team collaboration tools',
        'Corporate workshops'
      ],
      recommended: false
    }
  ];

  const handleTierSelect = (tier: string) => {
    setSelectedTier(tier);
    if (tier === 'Enterprise') {
      navigate('/contact', { state: { enquiryType: 'enterprise' } });
    } else {
      navigate('/register', { state: { membershipType: tier } });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Cyberhouse</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the membership tier that best fits your needs and start your journey in cybersecurity today.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Member Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-cyan-50 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                    <Icon className="h-8 w-8 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership Levels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Membership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipLevels.map((level, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ${
                  level.recommended ? 'ring-2 ring-cyan-500' : ''
                }`}
              >
                {level.recommended && (
                  <div className="bg-cyan-500 text-white text-center py-2">
                    Recommended
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">{level.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{level.price}</span>
                    {level.price !== 'Custom' && (
                      <span className="text-gray-500">/month</span>
                    )}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {level.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Shield className="h-5 w-5 text-cyan-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleTierSelect(level.name)}
                    className={`w-full py-3 px-4 rounded-md font-medium flex items-center justify-center ${
                      level.recommended
                        ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {level.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">What's included in the free account?</h3>
              <p className="text-gray-600">
                The free student account includes access to basic training materials, community forums, monthly workshops, and student project support. It's perfect for beginners starting their cybersecurity journey.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Can I upgrade my membership later?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade your membership at any time. Your benefits will be immediately upgraded to the new tier, and you'll only be charged the difference in price.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for Professional memberships. Enterprise solutions can be arranged through our sales team.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Is there a minimum commitment period?</h3>
              <p className="text-gray-600">
                No, you can cancel your membership at any time. For Professional memberships, you'll continue to have access until the end of your current billing period.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}