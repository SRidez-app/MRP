"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Phone, Mail, Truck, Package, Users, FileText } from 'lucide-react';
import { truckingTransportationFields } from '@/config/industryFormConfigs';
import Link from 'next/link';
import dynamic from 'next/dynamic';


const IndustryQuoteForm = dynamic(
  () => import('@/Components/IndustryQuoteForm'),
  { ssr: false }
);

interface InsuranceType {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

const TruckingTransportationPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

 



  const insuranceTypes: InsuranceType[] = [
    {
      id: 'commercial-auto-liability',
      title: 'Commercial Auto Liability',
      subtitle: 'DOT Compliant Protection',
      image: '/images/commAuto1.png',
      href: '/commercial-auto-liability',
    },
    {
      id: 'physical-damage',
      title: 'Physical Damage Insurance',
      subtitle: 'Vehicle Protection',
      image: '/images/phydamage.png',
      href: '/physical-damage',
    },
    {
      id: 'motor-truck-cargo',
      title: 'Motor Truck Cargo',
      subtitle: 'Freight Protection',
      image: '/images/cargoHero.png',
      href: '/motor-truck-cargo',
    },
    {
      id: 'owner-operator',
      title: 'Owner Operator Insurance',
      subtitle: 'For Independent Truckers',
      image: '/images/ownerOp.png',
      href: '/owner-operator',
    },
    {
      id: 'workers-compensation',
      title: "Workers' Compensation",
      subtitle: 'Employee Protection',
      image: '/images/workCompHero1.png',
      href: '/workers-compensation',
    },
    {
      id: 'captives',
      title: 'Captive Insurance Programs',
      subtitle: 'Risk Management Solutions',
      image: '/images/captives.png',
      href: '/captives-benefit',
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section ref={heroRef} className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/truckhero.png" 
                  alt="Commercial trucking and transportation insurance"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>

            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                    Trucking & Transportation
                    <span className="block text-transparent bg-gradient-to-r from-[#B8893D] to-[#B8893D] bg-clip-text">
                      Insurance Solutions
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                    Comprehensive insurance solutions for owner-operators, fleets, and freight protection. 
                    DOT-compliant coverage with competitive rates and expert guidance for all trucking operations.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    'Owner Operators & Fleets',
                    'DOT Compliance Support',
                    '24/7 Claims Service'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#B8893D] flex-shrink-0" />
                      <span className="text-lg font-medium text-gray-800">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
<Link 
  href="/quote-form"
  className="bg-gradient-to-r from-[#B8893D] to-[#B8893D] hover:from-[#A87A32] hover:to-[#9A7030] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group"
>
  Get Your Quote
</Link>
                  
                  <a href="tel:+15155817187" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center">
                    Call (515) 581-7187
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Comprehensive Insurance Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              From DOT-compliant liability to cargo protection, we provide complete coverage 
              solutions tailored to your trucking operation's unique needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insuranceTypes.map((type) => {
              return (
                <div key={type.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
                  
                  {/* Image Section */}
                  <div className="relative h-84 overflow-hidden flex-shrink-0">
                    <img
                      src={type.image}
                      alt={type.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="space-y-4 flex-grow">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {type.title}
                        </h3>
                        <p className="text-sm font-semibold text-[#B8893D]">
                          {type.subtitle}
                        </p>
                      </div>

                     
                    </div>

         
                 {/* CTA Buttons */}
<div className="flex gap-3 mt-6">
  <a 
    href={type.href}
    className="flex-1 bg-gradient-to-r from-[#B8893D] to-[#B8893D] hover:from-[#A87A32] hover:to-[#9A7030] text-white py-3 rounded-lg font-semibold text-center transition-all duration-300"
  >
    Learn More
  </a>
  <Link 
    href="/quote-form"
    className="flex-1 border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white py-3 rounded-lg font-semibold transition-all duration-300 text-center"
  >
    Get Quote
  </Link>
</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Why Choose Moxie Risk Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              With decades of trucking insurance expertise, we understand your unique challenges 
              and provide solutions that keep your wheels turning and your business protected.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Industry Expertise",
                description: "Specialized trucking insurance knowledge with dedicated transportation specialists",
                icon: Shield
              },
              {
                title: "Fast Service",
                description: "Same-day certificates, instant filings, and 24/7 claims support when you need it",
                icon: CheckCircle
              },
              {
                title: "Competitive Rates",
                description: "Access to multiple A-rated carriers ensuring the best coverage at the best price",
                icon: FileText
              },
              {
                title: "DOT Compliance",
                description: "Complete compliance support including BMC-91X filings and regulatory guidance",
                icon: Truck
              }
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#B8893D] to-[#B8893D] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact/Quote Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Get Your Free Trucking Insurance Quote
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fast, competitive quotes for all types of trucking operations. 
              Our specialists are ready to help you get on the road with the right coverage.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Methods */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Our Trucking Specialists</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Get expert guidance on DOT compliance, coverage requirements, and competitive rates. 
                  Our team specializes in trucking insurance and understands your unique needs.
                </p>
              </div>

          <div className="grid md:grid-cols-1 gap-6">
                {/* Phone */}
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Call Us Now</h4>
                  <a href="tel:+15155817187" className="text-lg font-bold text-green-600 hover:text-green-700 transition-colors">
                     Call (515) 581-7187
                  </a>
                  <p className="text-xs text-gray-500 mt-1">24/7 Available</p>
                </div>

                {/* Email */}
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Email Us</h4>
                  <a href="mailto:quotes@moxieriskpartners.com" className="text-lg font-bold text-purple-600 hover:text-purple-700 transition-colors break-all">
                    quotes@moxieriskpartners.com
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Quick Response</p>
                </div>
              </div>
    

            </div>
            <div>
  <IndustryQuoteForm 
    industry="trucking-transportation"
    formName="Trucking & Transportation Quote"
    title="Get Your Free Quote"
    subtitle="Fast, competitive trucking insurance quotes"
    fields={truckingTransportationFields}
  />
</div>

          </div>
        </div>
      </section>


    </div>
  );
};

export default TruckingTransportationPage;