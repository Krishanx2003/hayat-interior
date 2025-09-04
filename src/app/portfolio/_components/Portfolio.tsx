'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight } from 'lucide-react';
import WhatsAppClick from '@/components/WhatsAppClick';


const Portfolio = () => {
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
      title: 'Modern Living Room',
      category: 'residential',
      location: 'Delhi NCR',
      budget: '₹3.5L',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Contemporary design with neutral tones',
    },
    {
      id: 2,
      title: 'Luxury Kitchen',
      category: 'kitchen',
      location: 'Gurugram',
      budget: '₹4.2L',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Modular kitchen with island design',
    },
    {
      id: 3,
      title: 'Corporate Office',
      category: 'commercial',
      location: 'Noida',
      budget: '₹8.5L',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Modern workspace design for 50+ employees',
    },
    {
      id: 4,
      title: 'Master Bedroom',
      category: 'residential',
      location: 'Faridabad',
      budget: '₹2.8L',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Elegant bedroom with walk-in wardrobe',
    },
    {
      id: 5,
      title: 'Restaurant Interior',
      category: 'commercial',
      location: 'Greater Noida',
      budget: '₹6.2L',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Fine dining restaurant with ambient lighting',
    },
    {
      id: 6,
      title: 'Compact Kitchen',
      category: 'kitchen',
      location: 'Delhi NCR',
      budget: '₹2.5L',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Space-efficient design for small apartments',
    },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <div className="section-header animate-fade-in">
          <h2 className="section-title">Our Portfolio</h2>
          <p className="section-subtitle">
            Explore our stunning interior design projects across Delhi NCR
          </p>
        </div>
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category.id)}
              className={`${
                activeCategory === category.id
                  ? 'btn-hero-primary'
                  : 'btn-outline-hero'
              } transition-all duration-300`}
            >
              {category.name}
            </Button>
          ))}
        </div>
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.id}`}
              className="portfolio-card group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="portfolio-overlay">
                <div className="text-center text-white">
                  <ExternalLink className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium">View Project</p>
                </div>
              </div>
              <div className="p-6 bg-card">
                <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{project.location}</span>
                  <span className="font-semibold text-accent">{project.budget}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* Button Group */}
        <div className="text-center mt-16">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="btn-hero-primary group">
              <Link href="/portfolio">
                View Full Portfolio
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <WhatsAppClick
              className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center group"
              message="Hello, I'm interested in exploring your portfolio with Elite Interiors. Can we discuss your projects?"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;