"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Phone, Mail, Truck, AlertCircle, FileText, Award, Target, Scale } from 'lucide-react';
import { commAutoFields } from '@/config/industryFormConfigs';
import Link from 'next/link';
import dynamic from 'next/dynamic'; 

const IndustryQuoteForm = dynamic(
  () => import('@/Components/IndustryQuoteForm'),
  { ssr: false }
)


interface LiabilityBenefit {
  icon: React.ElementType;
  title: string;
  description: string;
  stat: string;
}

interface BusinessType {
  name: string;
  description: string;
  minCoverage: string;
  riskLevel: 'standard' | 'moderate' | 'high';
}

interface CoverageComponent {
  title: string;
  description: string;
  features: string[];
  isCore: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const CommAutoLiability = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      question: "What is the minimum liability coverage required for commercial trucks?",
      answer: "FMCSA requires $750,000 minimum liability for interstate operations with general freight. Hazmat carriers need $5 million. Many shippers require $1 million minimum.",
      isOpen: false
    },
    {
      question: "Does commercial auto liability cover my own vehicle damage?",
      answer: "No, liability insurance only covers damage to others. You need physical damage coverage (comprehensive and collision) to protect your own vehicles.",
      isOpen: false
    },
    {
      question: "Can I use personal auto insurance for business vehicles?",
      answer: "No, personal auto policies exclude commercial use. Business vehicles require commercial auto liability insurance to comply with regulations and ensure coverage.",
      isOpen: false
    },
    {
      question: "What factors affect commercial liability insurance costs?",
      answer: "Key factors include driving records, vehicle types, coverage limits, business type, operating radius, cargo hauled, and claims history.",
      isOpen: false
    },
    {
      question: "How quickly can I get a certificate of insurance?",
      answer: "We provide instant certificates of insurance once your policy is bound. This is essential for DOT compliance and meeting shipper requirements.",
      isOpen: false
    },
    {
      question: "Do I need different coverage for different states?",
      answer: "Coverage follows your vehicles across state lines, but you must meet the highest requirements of all states where you operate. We ensure multi-state compliance.",
      isOpen: false
    }
  ]);




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

  const liabilityBenefits: LiabilityBenefit[] = [
    {
      icon: Shield,
      title: "DOT Compliance",
      description: "Meet all FMCSA requirements with proper liability limits and instant certificate issuance for DOT compliance.",
      stat: "Federally compliant"
    },
    {
      icon: Scale,
      title: "Legal Protection",
      description: "Comprehensive legal defense coverage including court costs, attorney fees, and settlement negotiations.",
      stat: "Full legal defense"
    },
    {
      icon: AlertCircle,
      title: "Medical Coverage",
      description: "Extensive bodily injury protection covering medical bills, rehabilitation, and long-term care expenses.",
      stat: "Complete medical"
    },
    {
      icon: FileText,
      title: "Property Protection",
      description: "Coverage for third-party property damage including vehicles, buildings, cargo, and infrastructure.",
      stat: "Property coverage"
    }
  ];

  const businessTypes: BusinessType[] = [
    { 
      name: "Interstate Trucking", 
      description: "Long-haul and regional carriers operating across state lines", 
      minCoverage: "$750,000 minimum",
      riskLevel: "high"
    },
    { 
      name: "Local Delivery", 
      description: "Last-mile delivery services and local freight operations", 
      minCoverage: "$300,000 minimum",
      riskLevel: "moderate"
    },
    { 
      name: "Construction Contractors", 
      description: "Contractors using trucks and commercial vehicles for job sites", 
      minCoverage: "$500,000 recommended",
      riskLevel: "moderate"
    },
    { 
      name: "Service Companies", 
      description: "Plumbing, electrical, HVAC, and maintenance service vehicles", 
      minCoverage: "$300,000 minimum",
      riskLevel: "standard"
    },
    { 
      name: "Food Service", 
      description: "Restaurants, catering, and food truck operations", 
      minCoverage: "$500,000 recommended",
      riskLevel: "moderate"
    },
    { 
      name: "Hazmat Transport", 
      description: "Carriers transporting hazardous materials and regulated substances", 
      minCoverage: "$1,000,000 - $5,000,000 required",
      riskLevel: "high"
    }
  ];

  const coverageComponents: CoverageComponent[] = [
    {
      title: "Bodily Injury Liability",
      description: "Covers medical expenses, lost wages, rehabilitation, and legal costs when your vehicle injures others.",
      features: [
        "Medical and hospital expenses",
        "Rehabilitation and therapy costs",
        "Lost wages and earning capacity",
        "Pain and suffering damages",
        "Legal defense and court costs"
      ],
      isCore: true
    },
    {
      title: "Property Damage Liability",
      description: "Protects against damage to other vehicles, buildings, cargo, and property caused by your commercial vehicle.",
      features: [
        "Vehicle repair and replacement",
        "Building and structure damage",
        "Cargo and freight losses",
        "Infrastructure and road damage",
        "Legal defense coverage"
      ],
      isCore: true
    },
    {
      title: "Uninsured/Underinsured Motorist Coverage",
      description: "Protection when accidents involve drivers with insufficient or no liability insurance coverage.",
      features: [
        "Bodily injury from uninsured drivers",
        "Property damage protection",
        "Hit-and-run incident coverage",
        "Underinsured motorist protection"
      ],
      isCore: false
    },
    {
      title: "Medical Payments Coverage",
      description: "No-fault medical coverage for your drivers and passengers regardless of accident responsibility.",
      features: [
        "Immediate medical expense coverage",
        "No-fault protection",
        "Driver and passenger coverage",
        "Ambulance and emergency care"
      ],
      isCore: false
    }
  ];

  const toggleFAQ = (index: number) => {
    setFaqItems(prev => prev.map((item, idx) => ({
      ...item,
      isOpen: idx === index ? !item.isOpen : false
    })));
  };


  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section ref={heroRef} className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Hero Image */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/commAuto1.png" 
                  alt="Commercial trucks on highway with liability protection"
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
                    Commercial Auto
                    <span className="block text-transparent bg-gradient-to-r from-[#CC9F54] to-[#B8893D] bg-clip-text">
                      Liability Insurance
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                    Protect your business with federally compliant commercial auto liability insurance. From DOT minimum requirements to enhanced protection, we ensure your commercial vehicles meet all legal requirements while safeguarding your business assets.
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {[
                    'DOT Compliance',
                    'Instant Certificates',
                    'Nationwide Coverage'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#CC9F54] flex-shrink-0" />
                      <span className="text-lg font-medium text-gray-800">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
            <Link 
  href="/quote-form"
  className="bg-gradient-to-r from-[#CC9F54] to-[#B8893D] hover:from-[#B8893D] hover:to-[#A87A32] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group"
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

      {/* Benefits Section */}
    {/* Policy Review Section */}
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div className="mb-16">
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
        Is Your Coverage Optimized for Your Business?
      </h2>
      <p className="text-xl text-gray-600 max-w-4xl mb-6">
        Many carriers operate with inadequate liability coverage or gaps in protection that can significantly increase premiums and expose their business to unnecessary risk. Our consultative approach ensures your policy is tailored to your specific operations, helping you maintain compliance while controlling costs.
      </p>
    </div>
    
    <div className="bg-white rounded-xl p-8 border-2 border-[#E5CFA5] mb-8 max-w-4xl">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Coverage Issues We Address:</h3>
      <ul className="space-y-4">
        <li className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-[#CC9F54] mt-1 flex-shrink-0" />
          <span className="text-gray-700">Insufficient liability limits leading to higher premiums at renewal</span>
        </li>
        <li className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-[#CC9F54] mt-1 flex-shrink-0" />
          <span className="text-gray-700">Coverage gaps that leave your business exposed to claims</span>
        </li>
        <li className="flex items-start space-x-3">
          {/* <AlertCircle className="w-5 h-5 text-[#CC9F54] mt-1 flex-shrink-0" /> */}
          {/* <span className="text-gray-700">Non-compliance issues that can result in fines and operational delays</span> */}
        </li>
      </ul>
    </div>

    <a 
      href="tel:+15155817187"
      className="inline-flex items-center bg-gradient-to-r from-[#CC9F54] to-[#B8893D] hover:from-[#B8893D] hover:to-[#A87A32] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
    >
      Schedule Your Policy Review
      <ArrowRight className="ml-2 w-5 h-5" />
    </a>
  </div>
</section>
      {/* Business Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Coverage Requirements by Business Type
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Different commercial operations have varying liability requirements based on federal regulations, cargo types, and operational risks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessTypes.map((businessType) => (
              <div key={businessType.name} className={`bg-white rounded-xl p-6 border-2 hover:shadow-lg transition-all duration-300 ${
                businessType.riskLevel === 'high' ? 'border-red-200' :
                businessType.riskLevel === 'moderate' ? 'border-[#E5CFA5]' :
                'border-gray-200'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {businessType.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    businessType.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                    businessType.riskLevel === 'moderate' ? 'bg-[#FBF5EB] text-[#A87A32]' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {businessType.riskLevel} risk
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {businessType.description}
                </p>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <span className="text-sm font-semibold text-gray-900">
                    {businessType.minCoverage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Components Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              What Commercial Auto Liability Insurance Covers
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Comprehensive liability protection includes both core required coverages and optional enhancements to protect your business from financial loss.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {coverageComponents.map((coverage) => (
              <div key={coverage.title} className={`rounded-xl p-8 border-2 ${
                coverage.isCore ? 'bg-[#FBF5EB] border-[#E5CFA5]' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {coverage.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    coverage.isCore ? 'bg-[#CC9F54] text-white' : 'bg-gray-600 text-white'
                  }`}>
                    {coverage.isCore ? 'Required' : 'Optional'}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">
                  {coverage.description}
                </p>
                <ul className="space-y-3">
                  {coverage.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#CC9F54] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Federal and State Liability Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Stay compliant with all DOT and state requirements while protecting your business from costly liability claims.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-[#FBF5EB] to-[#F5EDE0] rounded-xl p-6 border border-[#E5CFA5]">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Interstate Commerce</h3>
              <p className="text-gray-600 text-sm mb-4">FMCSA requires minimum $750,000 liability for interstate commercial operations.</p>
              <div className="text-2xl font-bold text-[#CC9F54]">$750,000 minimum</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Hazardous Materials</h3>
              <p className="text-gray-600 text-sm mb-4">Carriers transporting hazmat require significantly higher liability limits.</p>
              <div className="text-2xl font-bold text-red-600">$1,000,000 -</div>
<div className="text-xl font-bold text-red-600">$5,000,000</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">State Minimums</h3>
              <p className="text-gray-600 text-sm mb-4">Each state has minimum liability requirements for commercial vehicle operations.</p>
              <div className="text-2xl font-bold text-blue-600">Varies by state</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Shipper Requirements</h3>
              <p className="text-gray-600 text-sm mb-4">Many shippers and brokers require higher limits than federal minimums.</p>
              <div className="text-2xl font-bold text-green-600">$1M+ common</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Commercial Auto Liability Insurance FAQ
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Common questions about commercial auto liability coverage, requirements, and costs
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <button
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 rounded-xl transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={faq.isOpen}
                  suppressHydrationWarning
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

      {/* Final CTA with Form */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - CTA Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Get DOT Compliant
                  <span className="block text-transparent bg-gradient-to-r from-[#CC9F54] to-[#B8893D] bg-clip-text">
                    Liability Coverage Today
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Don't risk operating without proper liability protection. Our commercial auto liability insurance ensures DOT compliance while protecting your business from costly claims and legal expenses.
                </p>
              </div>

              {/* Contact Information Grid */}
              <div className="grid md:grid-cols-1 gap-6">
                
                {/* Phone */}
                <div className="text-center p-6 bg-gray-100 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Call Us Now</h4>
                  <a href="tel:+15155817187" className="text-lg font-bold text-gray-900 hover:text-[#CC9F54] transition-colors">
                    (515) 581-7187
                  </a>
                  <p className="text-xs text-gray-500 mt-1">24/7 Available</p>
                </div>

                {/* Email */}
                <div className="text-center p-6 bg-gray-100 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 bg-[#CC9F54] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Email Us</h4>
                  <a href="mailto:quotes@moxieriskpartners.com" className="text-lg font-bold text-gray-900 hover:text-[#CC9F54] transition-colors break-all">
                    quotes@moxieriskpartners.com
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Quick Response</p>
                </div>
              </div>
            </div>

            {/* Right Side - Quote Form */}
            
      {/* Right Side - Quote Form */}
<div>
  <IndustryQuoteForm 
    industry="commercial-auto"
    formName="Commercial Auto Liability Quote"
    title="Get Your Free Quote"
    subtitle="Fast, competitive liability insurance quotes"
    fields={commAutoFields}
  />
</div>
          </div>
        </div>
      </section>

  
    </div>
  );
};

export default CommAutoLiability;