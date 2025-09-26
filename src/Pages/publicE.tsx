"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Clock, Users, Star, Phone, Mail, MapPin, Building, AlertCircle, FileText, Award, Target } from 'lucide-react';

interface ServiceData {
  type: string;
  typeCode: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ElementType;
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const PublicEntityPage = () => {
  const [selectedType, setSelectedType] = useState('succession-planning');
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      question: "What insurance coverage do public entities need?",
      answer: "Public entities typically need Public Officials Liability, Employment Practices Liability, Law Enforcement Liability, Constitutional Rights Coverage, and comprehensive property insurance. Coverage varies by entity type and services provided.",
      isOpen: false
    },
    {
      question: "How does succession planning reduce operational risk?",
      answer: "Succession planning ensures service continuity during leadership transitions, reduces key person dependencies, and maintains institutional knowledge. This directly impacts insurance claims related to service disruptions and governance issues.",
      isOpen: false
    },
    {
      question: "Why are risk assessments critical for government entities?",
      answer: "Public entities face unique risks including constitutional rights violations, law enforcement liability, and public safety responsibilities. Comprehensive risk assessments using COSO and ISO frameworks help identify and mitigate these exposures.",
      isOpen: false
    },
    {
      question: "How do building valuations support FEMA compliance?",
      answer: "Accurate property valuations are essential for FEMA Public Assistance Program eligibility and disaster recovery funding calculations. They also ensure adequate insurance coverage for federal assistance requirements.",
      isOpen: false
    },
    {
      question: "What makes public entity disaster planning different?",
      answer: "Government disaster planning must address whole community engagement, critical infrastructure protection, and federal framework compliance including NIMS, National Response Framework, and Emergency Management Assistance Compact requirements.",
      isOpen: false
    }
  ]);
  const [formData, setFormData] = useState({
    entityName: '',
    contactName: '',
    email: '',
    phone: '',
    entityType: '',
    annualBudget: ''
  });

  const heroRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const serviceTypes: ServiceData[] = [
    {
      type: 'Succession Planning',
      typeCode: 'succession-planning',
      title: 'Succession Planning',
      description: 'Comprehensive leadership development and continuity planning for critical government positions and essential services.',
      features: ['GFOA 10-Step Framework', 'Key Person Insurance', 'Continuity Assurance'],
      icon: Users
    },
    {
      type: 'Risk Assessments',
      typeCode: 'risk-assessments',
      title: 'Risk Assessments',
      description: 'Comprehensive risk evaluation using COSO Enterprise Risk Management and ISO 31000 frameworks for government entities.',
      features: ['COSO Framework', 'ISO 31000 Guidelines', 'NIST Risk Management'],
      icon: AlertCircle
    },
    {
      type: 'Building Valuations',
      typeCode: 'building-valuations',
      title: 'Building Valuations',
      description: 'Specialized property assessments for government facilities, courts, infrastructure, and historic buildings with USPAP compliance.',
      features: ['USPAP Compliance', 'GASB Standards', 'FEMA Eligibility'],
      icon: Building
    },
    {
      type: 'Disaster Planning',
      typeCode: 'disaster-planning',
      title: 'Disaster Planning',
      description: 'Comprehensive emergency management and business continuity planning aligned with federal frameworks and FEMA requirements.',
      features: ['FEMA Compliance', 'NIMS Integration', 'Critical Infrastructure'],
      icon: Shield
    }
  ];

  const publicEntityTypes = [
    {
      title: "Municipal Government",
      entities: ["City Councils", "Town Governments", "Municipal Utilities", "Public Works", "Parks & Recreation"]
    },
    {
      title: "County Government", 
      entities: ["County Commissioners", "Sheriff Departments", "County Courts", "Public Health", "Emergency Services"]
    },
    {
      title: "Special Districts",
      entities: ["School Districts", "Fire Districts", "Water Districts", "Transportation Authorities", "Hospital Districts"]
    },
    {
      title: "State & Federal",
      entities: ["State Agencies", "Federal Contractors", "Public Universities", "Correctional Facilities", "Military Installations"]
    }
  ];

  const whyChooseUs = [
    {
      title: 'Public Service Focus',
      description: 'We understand that public service comes first. Our solutions protect your organization while supporting your ability to serve your community effectively and maintain public trust.',
      icon: Target
    },
    {
      title: 'Federal Framework Compliance',
      description: 'Our solutions align with FEMA requirements, NIMS standards, and federal frameworks, ensuring your entity maintains eligibility for disaster assistance and federal funding.',
      icon: FileText
    },
    {
      title: 'Government Expertise',
      description: 'Our team specializes in public sector risk management with deep understanding of government operations, regulatory requirements, and public accountability standards.',
      icon: Award
    }
  ];

  const selectedService = serviceTypes.find(service => service.typeCode === selectedType) || serviceTypes[0];

  const toggleFAQ = (index: number) => {
    setFaqItems(prev => prev.map((item, idx) => ({
      ...item,
      isOpen: idx === index ? !item.isOpen : false
    })));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Public entity form submitted:', formData);
  };

  const handleTypeSelection = (typeCode: string) => {
    setSelectedType(typeCode);
  };

  // Don't render interactive elements until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section - Side by Side Layout */}
        <section ref={heroRef} className="bg-white py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Hero Image */}
              <div className="transform transition-all duration-1000">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/pubE2.png" 
                    alt="Government building and public entity professionals"
                    className="w-full h-[520px] lg:h-[620px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="transform transition-all duration-1000 delay-300">
                <div className="space-y-8">
                  <div>
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                      Public Entity Insurance &
                      <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                        Risk Management
                      </span>
                    </h1>
                    
                    <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                      Comprehensive risk management solutions designed specifically for government entities, 
                      municipalities, and public organizations. Protect your community while ensuring operational continuity.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    {[
                      'Government-Focused Coverage',
                      'FEMA Compliance Ready',
                      'Public Sector Expertise'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                        <span className="text-lg font-medium text-gray-800">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group">
                      Get Your Quote
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                    
                    <a href="tel:+18006694301" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center">
                      Call (800) 669-4301
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section - Side by Side Layout */}
      <section ref={heroRef} className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Hero Image */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/pubE2.png" 
                  alt="Government building and public entity professionals"
                  className="w-full h-[520px] lg:h-[620px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                    Public Entity Insurance &
                    <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                      Risk Management
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                    Comprehensive risk management solutions designed specifically for government entities, 
                    municipalities, and public organizations. Protect your community while ensuring operational continuity.
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {[
                    'Government-Focused Coverage',
                    'FEMA Compliance Ready',
                    'Public Sector Expertise'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                      <span className="text-lg font-medium text-gray-800">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group">
                    Get Your Quote
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  
                  <a href="tel:+18006694301" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center">
                    Call (800) 669-4301
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Services Selector Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header - Left Aligned */}
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Specialized Services
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Integrated risk management and emergency planning services designed for public sector success.
            </p>
            {/* Underline bar */}
            <div className="w-96 h-2 bg-gray-900 rounded-full"></div>
          </div>

          {/* Service Type Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {serviceTypes.map((service) => {
              const IconComponent = service.icon;
              return (
                <button
                  key={service.typeCode}
                  onClick={() => handleTypeSelection(service.typeCode)}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    selectedType === service.typeCode
                      ? 'border-orange-600 bg-orange-50 shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-orange-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                      <IconComponent 
                        className={`w-12 h-12 transition-all duration-300 ${
                          selectedType === service.typeCode ? 'text-orange-600' : 'text-gray-600'
                        } group-hover:scale-110`}
                      />
                    </div>
                    <h3 className={`text-sm font-bold transition-colors ${
                      selectedType === service.typeCode ? 'text-orange-600' : 'text-gray-800'
                    }`}>
                      {service.type}
                    </h3>
                  </div>
                  
                  {/* Selected Indicator */}
                  {selectedType === service.typeCode && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Service Details Panel */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-12">
            
            {/* Service Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-8 pb-6 border-b-2 border-orange-100">
              <div className="mb-4 lg:mb-0">
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            {/* Service Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-4xl">
              {selectedService.description}
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {selectedService.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <Star className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0 fill-current" />
                  <span className="text-gray-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Why Public Entities Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
              We understand the unique challenges facing government and public sector organizations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((benefit) => {
              const IconComponent = benefit.icon;
              return (
                <div key={benefit.title} className="text-center p-8 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Public Entities Served Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Public Entities We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Specialized insurance and risk management for every type of government and public organization
            </p>
            <div className="w-96 h-2 bg-gray-900 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {publicEntityTypes.map((sector) => (
              <div key={sector.title} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-200">
                  {sector.title}
                </h3>
                <ul className="space-y-2">
                  {sector.entities.map((entity) => (
                    <li key={entity} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{entity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Public Entity Insurance FAQs
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Common questions about public entity insurance coverage and risk management services
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                <button
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={faq.isOpen}
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <div className={`w-6 h-6 flex-shrink-0 transform transition-transform duration-200 ${faq.isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {faq.isOpen && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Footer with Quote Form */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - CTA Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Ready to Protect Your
                  <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                    Public Entity?
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Join thousands of government entities who trust our specialized expertise. 
                  Get comprehensive risk management solutions tailored to your public service mission today.
                </p>
              </div>

              {/* Contact Information Grid */}
              <div className="grid md:grid-cols-1 gap-6">
            
                {/* Phone */}
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Call Us Now</h4>
                  <a href="tel:+18006694301" className="text-lg font-bold text-green-600 hover:text-green-700 transition-colors">
                    (800) 669-4301
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

            {/* Right Side - Quote Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Free Quote</h3>
                <p className="text-gray-600">Fast, competitive public entity insurance quotes</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                {/* Entity Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Entity Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                    placeholder="Your Entity Name"
                    value={formData.entityName}
                    onChange={(e) => setFormData({...formData, entityName: e.target.value})}
                  />
                </div>

                {/* Contact Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                    placeholder="Your Full Name"
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                  />
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                      placeholder="email@entity.gov"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                {/* Entity Type and Annual Budget Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Entity Type *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900"
                      value={formData.entityType}
                      onChange={(e) => setFormData({...formData, entityType: e.target.value})}
                    >
                      <option value="">Select Type</option>
                      <option value="municipal">Municipal Government</option>
                      <option value="county">County Government</option>
                      <option value="special-district">Special District</option>
                      <option value="state-federal">State & Federal</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Annual Budget *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900"
                      value={formData.annualBudget}
                      onChange={(e) => setFormData({...formData, annualBudget: e.target.value})}
                    >
                      <option value="">Select Budget</option>
                      <option value="under-1m">Under $1M</option>
                      <option value="1m-10m">$1M - $10M</option>
                      <option value="10m-50m">$10M - $50M</option>
                      <option value="50m-250m">$50M - $250M</option>
                      <option value="over-250m">Over $250M</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group mt-6"
                >
                  Get My Quote Now
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Trust Elements */}
                <div className="text-center mt-4 space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>100% Secure & Confidential</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    No spam, unsubscribe anytime. Licensed agents only.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicEntityPage;