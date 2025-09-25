"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Industry {
  id: string;
  title: string;
  description: string;
  image: string; // Changed from 'any' to 'string'
  href: string;
  badge: string;
}

const INDUSTRIES_DATA: Industry[] = [
  {
    id: 'trucking',
    title: "Trucking & Transportation",
    description: "Comprehensive fleet insurance with DOT compliance support, cargo protection, and specialized coverage for owner-operators and commercial fleets.",
    image: "/images/Trucking2.png", // Updated to use public path
    href: "/trucking-transportation", // Match your app directory structure
    badge: "Most Popular",
  },
  {
    id: 'construction',
    title: "Construction & Contracting", 
    description: "Specialized protection for contractors, builders, and construction professionals with general liability, workers' comp, and project-specific coverage.",
    image: "/images/construct.png", // Updated to use public path
    href: "/construction", // Match your app directory structure
    badge: "Essential",
  },
  {
    id: 'manufacturing',
    title: "Manufacturing & Production",
    description: "Product liability, equipment breakdown, and operational coverage for manufacturers across all industries from food processing to electronics.",
    image: "/images/Manufact.png", // Updated to use public path
    href: "/manufacturing", // Match your app directory structure
    badge: "Comprehensive",
  },
  {
    id: 'nonprofit',
    title: "Nonprofit & Human Services",
    description: "Tailored coverage for nonprofits, human service organizations, and community groups with D&O, professional liability, and volunteer protection.",
    image: "/images/nonProf.png", // Updated to use public path
    href: "/nonProfit", // Match your app directory structure
    badge: "Specialized",
  },
  {
    id: 'public-entity',
    title: "Government & Public Entities",
    description: "Comprehensive coverage for municipalities, public agencies, and government organizations with specialized liability and constitutional coverage.",
    image: "/images/publicE1.png", // Updated to use public path
    href: "/publicE", // Match your app directory structure
    badge: "Government",
  }
];

const IndustryCard = React.memo(({ industry, index }: { industry: Industry; index: number }) => (
  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
    {/* Badge */}
    <div className="absolute top-4 left-4 z-10">
      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
        {industry.badge}
      </span>
    </div>

    {/* Background Image */}
    <div className="relative h-64 overflow-hidden">
      <Image
        src={industry.image}
        alt={`${industry.title} background`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority={index < 2}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
        {industry.title}
      </h3>
      
      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
        {industry.description}
      </p>

      {/* CTA */}
      <a 
        href={industry.href}
        className="flex items-center justify-center w-full bg-gray-900 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 group-hover:bg-orange-600"
      >
        Learn More
        <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
));

IndustryCard.displayName = 'IndustryCard';

const Overview: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left Column - Story */}
          <div className={`space-y-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Your Trusted Commercial Insurance Partner
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              With over 25 years of combined experience, Moxie Risk Partners brings trusted insurance 
              solutions to commercial businesses nationwide. Our team of industry specialists understands 
              the unique challenges facing trucking companies, contractors, manufacturers, and nonprofits.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Our team of dedicated specialists works exclusively with commercial accounts, providing 
              personalized service and expert guidance to protect what matters most to your business.
            </p>

            {/* Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {[
                'Industry Expertise',
                'Radical Transparency', 
                'A-Rated Carriers',
                'Fast Claims Response'
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Mission Section */}
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} delay-200`}>
            {/* Mission Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-orange-50 border border-orange-200 rounded-full">
              <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="text-orange-600 font-medium text-sm">Our Mission</span>
            </div>

            {/* Mission Statement */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm">
        <blockquote className="text-gray-800 text-lg leading-relaxed italic">
  &quot;To provide specialized commercial insurance solutions that protect the businesses, 
  organizations, and entities that build America. We combine deep industry knowledge 
  with personalized service to deliver the coverage, compliance, and peace of mind 
  our clients need to focus on what they do best.&quot;
</blockquote>
              {/* Mission Attribution */}
              <div className="mt-6 flex items-center">
                <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 mr-4"></div>
                <span className="text-orange-600 font-semibold">Moxie Risk Partners</span>
              </div>
            </div>

           
          </div>
        </div>

             {/* Industries Section */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Comprehensive Coverage Across Critical Industries
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Deep expertise across trucking, construction, manufacturing, nonprofit, and public entities 
              with industry-specific coverage, regulatory compliance support, and dedicated specialists.
            </p>
          </div>

          {/* Industries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES_DATA.map((industry, index) => (
              <IndustryCard key={industry.id} industry={industry} index={index} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default React.memo(Overview);