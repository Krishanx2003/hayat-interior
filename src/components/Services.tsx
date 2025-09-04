import React from 'react';
import { Home, ChefHat, Building, Wrench, Palette, Sofa, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      icon: <Home className="w-12 h-12" />,
      title: 'Home Interior Design',
      description:
        'Complete residential interior solutions from living rooms to bedrooms, creating spaces that reflect your personality and lifestyle.',
      image:
        'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  
    },
    {
      icon: <ChefHat className="w-12 h-12" />,
      title: 'Modular Kitchen Design',
      description:
        'Functional and beautiful kitchen designs with smart storage solutions, premium materials, and modern appliances integration.',
      image:
        'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',

    },
    {
      icon: <Building className="w-12 h-12" />,
      title: 'Office & Commercial Design',
      description:
        'Professional workspace designs that boost productivity while maintaining aesthetic appeal for offices, retail, and commercial spaces.',
      image:
        'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: 'Turnkey Solutions',
      description:
        'End-to-end interior design services from concept to completion, handling every aspect of your interior transformation.',
      image:
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',

    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: 'Space Planning',
      description:
        'Optimal space utilization with intelligent layouts that maximize functionality while maintaining visual harmony and flow.',
      image:
        'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',

    },
    {
      icon: <Sofa className="w-12 h-12" />,
      title: 'Renovation Services',
      description:
        'Complete home makeovers and refurbishing services to breathe new life into your existing spaces with modern design elements.',
      image:
        'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  
    },
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-semibold text-lg mb-4 block">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Interior Design Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From residential homes to commercial spaces, we deliver stunning interior designs that perfectly balance
            aesthetics, functionality, and affordability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-8">
                <div className="text-blue-900 mb-4 group-hover:text-amber-500 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
              
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}