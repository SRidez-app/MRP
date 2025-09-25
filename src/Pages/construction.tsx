"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Clock, Users, Star, Phone, Mail, MapPin, Hammer, HardHat, Truck, Building } from 'lucide-react';

interface CoverageData {
  type: string;
  typeCode: string;
  title: string;
  description: string;
  commonProjects: string[];
  risksCovered: string[];
  whoNeedsIt: string[];
  coverageAmount: string;
  specialFeatures: string[];
  icon: React.ElementType;
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const ConstructionPage = () => {
  const [selectedType, setSelectedType] = useState('general-liability');
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      question: "What construction insurance do I need?",
      answer: "Most construction businesses need General Liability, Workers' Compensation, and Commercial Auto as core coverage. Additional requirements vary by state, project type, and contracts.",
      isOpen: false
    },
    {
      question: "How much does construction insurance cost?",
      answer: "Costs vary by trade, experience, and location. General liability typically ranges $400-$1,500 annually per $100K revenue. Workers' comp is 2-15% of payroll depending on classification.",
      isOpen: false
    },
    {
      question: "Do subcontractors need their own insurance?",
      answer: "Yes, subcontractors typically need General Liability, Workers' Compensation, and Commercial Auto. You'll need certificates of insurance and may add the GC as additional insured.",
      isOpen: false
    },
    {
      question: "What is Builder's Risk insurance?",
      answer: "Builder's Risk protects construction projects during building from fire, wind, theft, and vandalism. Required for new construction and major renovations, covering structure, materials, and equipment.",
      isOpen: false
    },
    {
      question: "How does EMR affect my premiums?",
      answer: "Experience Modification Rate directly impacts Workers' Comp premiums and bidding ability. Below 1.0 reduces costs, above 1.0 increases them. We help manage EMR through safety programs.",
      isOpen: false
    }
  ]);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    contractorType: '',
    yearsExperience: ''
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

  const coverageTypes: CoverageData[] = [
    {
      type: 'General Liability',
      typeCode: 'general-liability',
      title: 'General Liability Insurance',
      description: 'Comprehensive protection against third-party claims, property damage, and completed operations. Essential coverage for all construction trades with protection against lawsuits and accidents.',
      commonProjects: ['Commercial construction', 'Residential building', 'Renovation projects', 'Public works', 'Private contracts'],
      risksCovered: ['Third-party injury claims', 'Property damage', 'Products-completed operations', 'Personal & advertising injury', 'Defense costs'],
      whoNeedsIt: ['General contractors', 'Subcontractors', 'Construction managers', 'Specialty trades', 'Design-build firms'],
      coverageAmount: '$1M - $2M per occurrence',
      specialFeatures: ['Completed operations coverage', 'Additional insured endorsements', 'Primary & non-contributory', 'Waiver of subrogation'],
      icon: Shield
    },
    {
      type: 'Workers Compensation',
      typeCode: 'workers-comp',
      title: 'Workers Compensation Insurance',
      description: 'Mandatory employee protection with EMR management and safety training support. Covers medical expenses, lost wages, and provides crucial protection for your workforce.',
      commonProjects: ['All construction projects', 'Employee protection', 'Payroll-based coverage', 'Multi-state operations', 'Subcontractor oversight'],
      risksCovered: ['Work-related injuries', 'Medical expenses', 'Lost wage replacement', 'Disability benefits', 'Return-to-work programs'],
      whoNeedsIt: ['All construction employers', 'General contractors', 'Specialty contractors', 'Construction services', 'Labor contractors'],
      coverageAmount: 'State-mandated minimums',
      specialFeatures: ['EMR rate management', 'Safety training programs', 'Claims management', 'Experience modification'],
      icon: HardHat
    },
    {
      type: 'Builders Risk',
      typeCode: 'builders-risk',
      title: 'Builders Risk Insurance',
      description: 'Project protection from fire, weather, vandalism, and theft during construction. Covers the structure, materials, and equipment while work is in progress.',
      commonProjects: ['New construction', 'Major renovations', 'Commercial buildings', 'Residential developments', 'Infrastructure projects'],
      risksCovered: ['Fire & explosion', 'Weather damage', 'Theft & vandalism', 'Material damage', 'Equipment protection'],
      whoNeedsIt: ['Project owners', 'General contractors', 'Construction managers', 'Developers', 'Property managers'],
      coverageAmount: 'Project value coverage',
      specialFeatures: ['Soft cost coverage', 'Debris removal', 'Expediting expenses', 'Permission to occupy'],
      icon: Building
    },
    {
      type: 'Commercial Auto',
      typeCode: 'commercial-auto',
      title: 'Commercial Auto Insurance',
      description: 'Specialized coverage for construction vehicles and equipment transport. Protects your fleet with comprehensive liability and physical damage coverage.',
      commonProjects: ['Fleet operations', 'Equipment transport', 'Material delivery', 'Service calls', 'Job site mobility'],
      risksCovered: ['Vehicle liability', 'Physical damage', 'Comprehensive coverage', 'Collision protection', 'Uninsured motorist'],
      whoNeedsIt: ['Fleet operators', 'Equipment transporters', 'Service contractors', 'Material suppliers', 'Mobile services'],
      coverageAmount: '$1M+ liability limits',
      specialFeatures: ['Fleet discounts', 'Equipment coverage', 'Driver training', 'Telematics programs'],
      icon: Truck
    },
    {
      type: 'Professional Liability',
      typeCode: 'professional-liability',
      title: 'Professional Liability Insurance',
      description: 'Errors & omissions protection for design professionals and consultants. Covers mistakes, omissions, and professional negligence claims.',
      commonProjects: ['Design services', 'Engineering work', 'Consulting projects', 'Plan review', 'Construction management'],
      risksCovered: ['Design errors', 'Professional omissions', 'Negligent acts', 'Breach of duty', 'Defense costs'],
      whoNeedsIt: ['Architects', 'Engineers', 'Design consultants', 'Construction managers', 'Project managers'],
      coverageAmount: '$1M - $5M per claim',
      specialFeatures: ['Prior acts coverage', 'Extended reporting', 'Regulatory defense', 'Cyber liability add-on'],
      icon: Users
    },
    {
      type: 'Tools & Equipment',
      typeCode: 'tools-equipment',
      title: 'Tools & Equipment Insurance',
      description: 'Protect valuable tools and machinery from theft, damage, and loss. Comprehensive coverage for contractors\' most important assets.',
      commonProjects: ['Tool protection', 'Equipment coverage', 'Machinery insurance', 'Mobile equipment', 'Contractor assets'],
      risksCovered: ['Theft protection', 'Damage coverage', 'Loss of use', 'Replacement cost', 'Breakdown coverage'],
      whoNeedsIt: ['All contractors', 'Equipment owners', 'Tool-dependent trades', 'Mobile contractors', 'Specialty trades'],
      coverageAmount: 'Actual tool value',
      specialFeatures: ['Replacement cost coverage', 'Newly acquired coverage', 'Worldwide territory', 'No deductible options'],
      icon: Hammer
    }
  ];

  const tradeCategories = [
    {
      title: "General Construction",
      trades: ["General Contractors", "Commercial Builders", "Residential Contractors", "Construction Managers", "Design-Build Firms"]
    },
    {
      title: "Specialty Trades", 
      trades: ["Electrical Contractors", "Plumbing & HVAC", "Roofing Contractors", "Flooring Installers", "Drywall & Painting"]
    },
    {
      title: "Heavy Construction",
      trades: ["Excavation & Earthwork", "Concrete Contractors", "Paving & Asphalt", "Utility Construction", "Infrastructure"]
    },
    {
      title: "Professional Services",
      trades: ["Architects", "Engineers", "Construction Consultants", "Project managers", "Surveyors"]
    }
  ];

  const selectedCoverage = coverageTypes.find(coverage => coverage.typeCode === selectedType) || coverageTypes[0];

  const toggleFAQ = (index: number) => {
    setFaqItems(prev => prev.map((item, idx) => ({
      ...item,
      isOpen: idx === index ? !item.isOpen : false
    })));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Construction insurance form submitted:', formData);
  };

  const handleTypeSelection = (typeCode: string) => {
    setSelectedType(typeCode);
  };

  // Don't render form until mounted to avoid hydration issues
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
                    src="/images/constructhero.png" 
                    alt="Construction workers on building site"
                    className="w-full h-[500px] lg:h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="transform transition-all duration-1000 delay-300">
                <div className="space-y-8">
                  <div>
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                      Construction
                      <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                        Insurance
                      </span>
                    </h1>
                    
                    <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                      Protect your construction business with comprehensive coverage designed for contractors, 
                      builders, and construction professionals. Expert guidance and competitive rates.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    {[
                      'All Construction Trades',
                      'Competitive Rates',
                      'Expert Support'
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
                  src="/images/constructhero.png" 
                  alt="Construction workers on building site"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                    Construction
                    <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                      Insurance
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                    Protect your construction business with comprehensive coverage designed for contractors, 
                    builders, and construction professionals. Expert guidance and competitive rates.
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {[
                    'All Construction Trades',
                    'Competitive Rates',
                    'Expert Support'
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

      {/* Coverage Options Selector Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header - Left Aligned */}
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Choose Your Construction Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Each construction trade and project type has unique risks and requirements. 
              Select your specific coverage type below to explore tailored protection options and industry-specific endorsements.
            </p>
            {/* Underline bar */}
            <div className="w-96 h-2 bg-gray-900 rounded-full"></div>
          </div>

          {/* Coverage Type Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {coverageTypes.map((coverage) => {
              const IconComponent = coverage.icon;
              return (
                <button
                  key={coverage.typeCode}
                  onClick={() => handleTypeSelection(coverage.typeCode)}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    selectedType === coverage.typeCode
                      ? 'border-orange-600 bg-orange-50 shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-orange-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                      <IconComponent 
                        className={`w-12 h-12 transition-all duration-300 ${
                          selectedType === coverage.typeCode ? 'text-orange-600' : 'text-gray-600'
                        } group-hover:scale-110`}
                      />
                    </div>
                    <h3 className={`text-sm font-bold transition-colors ${
                      selectedType === coverage.typeCode ? 'text-orange-600' : 'text-gray-800'
                    }`}>
                      {coverage.type}
                    </h3>
                  </div>
                  
                  {/* Selected Indicator */}
                  {selectedType === coverage.typeCode && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Coverage Details Panel */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-12">
            
            {/* Coverage Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-8 pb-6 border-b-2 border-orange-100">
              <div className="mb-4 lg:mb-0">
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {selectedCoverage.title}
                </h3>
                <div className="inline-block bg-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                  Coverage: {selectedCoverage.coverageAmount}
                </div>
              </div>
            </div>

            {/* Coverage Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-4xl">
              {selectedCoverage.description}
            </p>

            {/* Coverage Details Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              
              {/* Common Projects */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-orange-200">
                  Common Projects
                </h4>
                <div className="space-y-2">
                  {selectedCoverage.commonProjects.map((project, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{project}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks Covered */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-orange-200">
                  Risks Covered
                </h4>
                <div className="space-y-2">
                  {selectedCoverage.risksCovered.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who Needs It */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-orange-200">
                  Who Needs This Coverage
                </h4>
                <div className="space-y-2">
                  {selectedCoverage.whoNeedsIt.map((who, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{who}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Features */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-orange-200">
                  Special Features
                </h4>
                <div className="space-y-2">
                  {selectedCoverage.specialFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <Star className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0 fill-current" />
                      <span className="text-gray-800 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Construction Trades We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Specialized insurance solutions for every construction specialty
            </p>
            <div className="w-96 h-2 bg-gray-900 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tradeCategories.map((category) => (
              <div key={category.title} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-200">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.trades.map((trade) => (
                    <li key={trade} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{trade}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Construction Insurance FAQs
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Common questions about construction insurance coverage and requirements
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <button
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 rounded-xl transition-colors duration-200"
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
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - CTA Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Ready to Protect Your
                  <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                    Construction Business?
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Join thousands of construction professionals who trust Moxie Risk Partners. 
                  Get your quote today and experience specialized construction insurance expertise.
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
                  <a href="mailto:quotes@mrpinsurance.com" className="text-lg font-bold text-purple-600 hover:text-purple-700 transition-colors break-all">
                    quotes@mrpinsurance.com
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
                <p className="text-gray-600">Fast, competitive construction insurance quotes</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                    placeholder="Your Company Name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
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
                      placeholder="email@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                {/* Contractor Type and Experience Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contractor Type *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900"
                      value={formData.contractorType}
                      onChange={(e) => setFormData({...formData, contractorType: e.target.value})}
                    >
                      <option value="">Select Type</option>
                      <option value="general">General Contractor</option>
                      <option value="electrical">Electrical</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="roofing">Roofing</option>
                      <option value="hvac">HVAC</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Years Experience *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900"
                      value={formData.yearsExperience}
                      onChange={(e) => setFormData({...formData, yearsExperience: e.target.value})}
                    >
                      <option value="">Select Years</option>
                      <option value="0-2">0-2 Years</option>
                      <option value="3-5">3-5 Years</option>
                      <option value="6-10">6-10 Years</option>
                      <option value="10+">10+ Years</option>
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

export default ConstructionPage;