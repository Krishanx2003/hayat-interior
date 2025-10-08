'use client';

import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const serviceLinks = [
    { name: 'Home Interior Design', href: '/#services' },
    { name: 'Modular Kitchen Design', href: '/#services' },
    { name: 'Office Interior Design', href: '/#services' },
    { name: 'Turnkey Solutions', href: '/#services' },
    { name: 'Renovation & Remodeling', href: '/#services' },
    { name: 'Space Planning & Consultation', href: '/#services' },
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'Our Process', href: '/#process' },
  ];

  const serviceAreas = [
    'Delhi NCR',
    'Noida',
    'Greater Noida',
    'Faridabad',
    'Gurugram',
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-3xl font-bold mb-6 block">
              Hayat<span className="text-amber-500">Interior</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              We bring you carefully curated interior design ideas that blend beauty and functionality. 
              From concept to creation, <strong>Hayat Interior</strong> transforms your vision into inspiring, timeless spaces.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-amber-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-amber-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-amber-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-amber-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((service, index) => (
                <li key={index}>
                  <Link href={service.href} className="text-gray-300 hover:text-amber-500 transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-amber-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-500" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-500" />
                <span className="text-gray-300">contact@hayatinterior.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-500 mt-1" />
                <div className="text-gray-300">
                  <p className="font-semibold mb-2">Service Areas:</p>
                  <div className="grid grid-cols-1 gap-1">
                    {serviceAreas.map((area, index) => (
                      <span key={index} className="text-sm">{area}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Hayat Interior. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-amber-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-amber-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-amber-500 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
