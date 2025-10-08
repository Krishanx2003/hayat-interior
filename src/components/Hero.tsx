import React from 'react';
import { ArrowRight, Star, Users, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Modern luxury living room designed by Hayat Interior"
          className="object-cover"
          width={1920}
          height={1080}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Elevate Your
            <span className="block text-amber-400">Home Aesthetics</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
            At <strong>Hayat Interior</strong>, we bring you thoughtfully curated interior design ideas 
            to reimagine your living spaces. 
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href="/#contact"
              className="bg-amber-500 text-white px-8 py-4 rounded-lg hover:bg-amber-600 transition-all duration-300 font-semibold flex items-center justify-center group"
            >
              Book Your Free Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#portfolio"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 font-semibold"
            >
              Explore Our Portfolio
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-500 p-3 rounded-full">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-gray-300">Delighted Clients</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-amber-500 p-3 rounded-full">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">15+</div>
                <div className="text-gray-300">Creative Designers</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-amber-500 p-3 rounded-full">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">5 Years</div>
                <div className="text-gray-300">Of Design Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
