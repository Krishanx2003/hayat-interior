'use client';

import React, { useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'residential', name: 'Residential' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'kitchen', name: 'Kitchens' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Modern Villa - Gurugram',
      category: 'residential',
      image:
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      location: 'Gurugram',
      area: '3500 sq ft',
      href: '/portfolio/modern-villa-gurugram',
    },
    {
      id: 2,
      title: 'Luxury Kitchen Design',
      category: 'kitchen',
      image:
        'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      location: 'Delhi NCR',
      area: '400 sq ft',
      href: '/portfolio/luxury-kitchen',
    },
    {
      id: 3,
      title: 'Corporate Office Space',
      category: 'commercial',
      image:
        'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      location: 'Noida',
      area: '5000 sq ft',
      href: '/portfolio/corporate-office',
    },
    {
      id: 4,
      title: 'Contemporary Apartment',
      category: 'residential',
      image:
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      location: 'Greater Noida',
      area: '1800 sq ft',
      href: '/portfolio/contemporary-apartment',
    },
    {
      id: 5,
      title: 'Minimalist Kitchen',
      category: 'kitchen',
      image:
        'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      location: 'Faridabad',
      area: '350 sq ft',
      href: '/portfolio/minimalist-kitchen',
    },
    {
      id: 6,
      title: 'Premium Penthouse',
      category: 'residential',
      image:
        'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      location: 'Delhi NCR',
      area: '4200 sq ft',
      href: '/portfolio/premium-penthouse',
    },
  ];

  const filteredProjects = activeCategory === 'all' ? projects : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-semibold text-lg mb-4 block">Our Work</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Portfolio Showcase</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our diverse portfolio of completed projects across Delhi NCR, showcasing our expertise in creating
            beautiful, functional spaces.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-900 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Link
              href={project.href}
              key={project.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-200">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <span className="text-amber-400 font-semibold">{project.area}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
  <Link
    href="/portfolio"
    className="bg-gray-900 text-white px-2 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold flex items-center justify-center mx-auto group"
  >
    View All Projects
    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
  </Link>
</div>
      </div>
    </section>
  );
}