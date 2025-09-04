import React from 'react';
import { Shield, Palette, Wallet, Clock, Users, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Wallet className="w-8 h-8" />,
      title: 'Affordable Pricing',
      description: 'Premium quality interiors at competitive prices with transparent pricing and no hidden costs.',
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Aesthetic Excellence',
      description: 'Beautiful designs that reflect your personality while maintaining functionality and comfort.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Quality Assurance',
      description: 'Premium materials, skilled craftsmen, and rigorous quality checks ensure lasting results.',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Timely Delivery',
      description: 'Project completion within agreed timelines with regular updates and milestone tracking.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Team',
      description: 'Experienced designers and skilled craftsmen dedicated to bringing your vision to life.',
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Award-Winning Designs',
      description: 'Recognition for excellence in interior design and customer satisfaction across Delhi NCR.',
    },
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-semibold text-lg mb-4 block">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Trusted Interior Design Partner
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We combine creativity, functionality, and affordability to deliver interior design solutions
            that exceed expectations and transform the way you live and work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 border border-gray-200 rounded-2xl hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-blue-900 mb-4 group-hover:text-amber-500 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-12 rounded-3xl text-white">
            <h3 className="text-3xl font-bold mb-6">Ready to Transform Your Space?</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have trusted us with their interior design dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="bg-amber-500 text-white px-8 py-4 rounded-lg hover:bg-amber-600 transition-colors font-semibold"
              >
                Start Your Project
              </Link>
              <Link
                href="/#portfolio"
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 font-semibold"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}