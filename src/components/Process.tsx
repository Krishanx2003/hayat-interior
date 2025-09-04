
import React from 'react';
import { MessageCircle, Lightbulb, Hammer, Key } from 'lucide-react';
import Link from 'next/link';

export default function Process() {
  const steps = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Consultation',
      description:
        'We start with understanding your vision, requirements, budget, and lifestyle to create a personalized design brief.',
      details: ['Site visit & measurements', 'Requirement analysis', 'Budget discussion', 'Timeline planning'],
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Design',
      description:
        'Our expert designers create detailed plans, 3D visualizations, and material selections tailored to your needs.',
      details: ['3D design concepts', 'Material selection', 'Color schemes', 'Furniture planning'],
    },
    {
      icon: <Hammer className="w-8 h-8" />,
      title: 'Execution',
      description:
        'Professional implementation with quality materials, skilled craftsmen, and regular progress updates throughout the project.',
      details: ['Project management', 'Quality materials', 'Skilled execution', 'Regular updates'],
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: 'Handover',
      description:
        'Final quality checks, styling, and handover of your beautifully transformed space, ready for you to enjoy.',
      details: ['Quality inspection', 'Final styling', 'Warranty coverage', 'Maintenance guide'],
    },
  ];

  return (
    <section id="process" className="py-24 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-semibold text-lg mb-4 block">Our Process</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How We Work</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our streamlined 4-step process ensures smooth project delivery from initial consultation to final handover,
            keeping you involved every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 text-white rounded-full mb-4">
                    {step.icon}
                  </div>
                  <div className="text-3xl font-bold text-amber-500 mb-2">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed text-center">{step.description}</p>

                <ul className="space-y-2">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 -right-4 w-8 h-0.5 bg-amber-500 z-10"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h3>
            <p className="text-gray-600 mb-6">
              Book a free consultation today and let&apos;s discuss your dream interior design project.
            </p>
            <Link
              href="/#contact"
              className="bg-blue-900 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
            >
              Schedule Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}