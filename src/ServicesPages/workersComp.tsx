"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Clock, Users, Star, Phone, Mail, MapPin, HardHat, Factory, Truck, Heart, Building, FileText } from 'lucide-react';
import { workersCompFields } from '@/config/industryFormConfigs';
import Link from 'next/link';
import dynamic from 'next/dynamic'; // Add this import

// Add dynamic import with ssr disabled
const IndustryQuoteForm = dynamic(
  () => import('@/Components/IndustryQuoteForm'),
  { ssr: false }
);

interface CoverageData {
  type: string;
  typeCode: string;
  title: string;
  description: string;
  // badge: string;
  features: string[];
  icon: React.ElementType;
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const WorkersCompPage = () => {
  const [selectedType, setSelectedType] = useState('manufacturing');
  const [isVisible, setIsVisible] = useState(false);



  const [faqItems, setFaqItems] = useState
  
  
  
  
  
  
  <FAQItem[]>([
    {
      question: "Is workers' compensation insurance required for my business?",
      answer: "Workers' compensation requirements vary by state, but most states require coverage if you have employees. Some states have different thresholds (like 3+ employees), and certain industries have specific requirements. Independent contractors typically aren't covered, but misclassification can result in penalties. We help ensure you meet your state's specific requirements.",
      isOpen: false
    },
    {
      question: "How much does workers' compensation insurance cost?",
      answer: "Workers' comp costs are calculated based on your industry classification code, payroll, and claims history. Rates typically range from $0.50 to $5.00 per $100 of payroll, depending on risk level. High-risk industries like construction or manufacturing pay more than office environments. Your experience modification rate (EMR) can significantly impact costs based on your safety record.",
      isOpen: false
    },
    {
      question: "What does workers' compensation insurance cover?",
      answer: "Workers' comp covers medical expenses, lost wages (typically 60-70% of salary), disability benefits, and rehabilitation costs for work-related injuries or illnesses. It also provides death benefits for families of workers killed on the job. Coverage includes both immediate injuries and occupational diseases that develop over time from workplace exposures.",
      isOpen: false
    },
    {
      question: "How do I file a workers' compensation claim?",
      answer: "Report the injury to your employer immediately (within 24-48 hours in most states). Seek medical attention from an approved provider if possible. Your employer should provide claim forms and report to their insurance carrier. Document everything and keep copies of all medical records. We provide 24/7 claims support to guide you through the process.",
      isOpen: false
    },
    {
      question: "Can I be sued if I have workers' compensation coverage?",
      answer: "Workers' comp provides legal protection by preventing employees from suing for workplace injuries in most cases. This 'exclusive remedy' protection means employees receive guaranteed benefits but generally cannot pursue additional damages through lawsuits. However, intentional acts or gross negligence may not be protected.",
      isOpen: false
    },
    {
      question: "How can I reduce my workers' compensation premiums?",
      answer: "Implement comprehensive safety programs, provide regular employee training, maintain good claims management, conduct return-to-work programs, and work with experienced brokers to ensure proper classification codes. Regular safety audits and prompt injury reporting can improve your experience modification rate and reduce premiums over time.",
      isOpen: false
    },
    {
      question: "What items do I need in order to get a workers compensation quote?",
      answer: "To get an accurate workers compensation quote, you'll need: your business's federal tax ID number, detailed job descriptions and classification codes for all employees, current and projected annual payroll by job classification, your experience modification rate (EMR) if available, previous workers comp policy information, claims history for the past 3-5 years, and information about your safety programs and training procedures.",
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

  const industryTypes: CoverageData[] = [
    {
      type: 'Manufacturing',
      typeCode: 'manufacturing',
      title: 'Manufacturing',
      description: 'Specialized coverage for manufacturing employees facing industrial hazards, machinery risks, and occupational injuries.',
      // badge: 'High Risk',
      features: ['Industrial Injury Coverage', 'Machinery Accident Protection', 'Occupational Illness Benefits', 'Return-to-Work Programs'],
      icon: Factory
    },
    {
      type: 'Construction',
      typeCode: 'construction',
      title: 'Construction',
      description: 'Comprehensive protection for construction workers in high-risk environments with specialized injury and safety programs.',
      // badge: 'High Risk',
      features: ['Fall Protection Coverage', 'Heavy Equipment Injuries', 'Site Safety Programs', 'Temporary Disability Benefits'],
      icon: HardHat
    },
    {
      type: 'Trucking',
      typeCode: 'trucking',
      title: 'Trucking',
      description: 'Specialized coverage for commercial drivers and transportation employees with road-specific injury protection.',
      // badge: 'Transport Focused',
       features: ['Driver Injury Coverage', 'Loading/Unloading Protection', 'Mechanic Injury Coverage', 'Fleet Safety Programs'],
      icon: Truck
    },
    {
      type: 'Non-Profit',
      typeCode: 'nonprofit',
      title: 'Non-Profit',
      description: 'Affordable workers\' compensation solutions for non-profit organizations with volunteer and employee protection.',
      // badge: 'Specialized',
      features: ['Volunteer Coverage Options', 'Budget-Friendly Premiums', 'Event Injury Protection', 'Staff Safety Programs'],
      icon: Heart
    },
    {
      type: 'Public Entity',
      typeCode: 'public-entity',
      title: 'Public Entity',
      description: 'Government and municipal employee coverage with public sector-specific benefits and regulatory compliance.',
      // badge: 'Government',
      features: ['Government Employee Coverage', 'Municipal Benefits', 'Public Safety Officers', 'Regulatory Compliance'],
      icon: Building
    },
    {
      type: 'General Business',
      typeCode: 'general-business',
      title: 'General Business',
      description: 'Standard workers\' compensation coverage for office environments, retail, and low-risk business operations.',
      // badge: 'Standard',
      features: ['Office Injury Coverage', 'Slip and Fall Protection', 'Repetitive Strain Benefits', 'Standard Medical Coverage'],
      icon: FileText
    }
  ];

  const coverageDetails = [
    {
      title: 'Medical Expenses',
      description: '100% coverage of medical costs related to work injuries, including emergency care, surgery, rehabilitation, and ongoing treatment from approved healthcare providers.',
      icon: Heart
    },
    {
      title: 'Lost Wage Replacement',
      description: 'Typically 60-70% of average weekly wages for employees unable to work due to work-related injuries, with benefits continuing throughout recovery period.',
      icon: Clock
    },
    {
      title: 'Disability Benefits',
      description: 'Temporary and permanent disability benefits for employees with lasting impairments, including vocational rehabilitation and job retraining services.',
      icon: Shield
    },
    {
      title: 'Death Benefits',
      description: 'Financial support for families of workers who die from work-related injuries, including funeral expenses and ongoing income replacement for dependents.',
      icon: Users
    }
  ];

  const claimsSteps = [
    {
      number: 1,
      title: 'Report Immediately',
      description: 'Notify us within 24 hours of the incident via phone, online, or email'
    },
    {
      number: 2,
      title: 'Document Everything',
      description: 'Gather incident details, witness information, and medical records'
    },
    {
      number: 3,
      title: 'Medical Treatment',
      description: 'Ensure injured employee receives appropriate medical care from approved providers'
    },
    {
      number: 4,
      title: 'Follow Up',
      description: 'Stay in contact with our claims team for updates and return-to-work coordination'
    }
  ];

  const selectedIndustry = industryTypes.find(industry => industry.typeCode === selectedType) || industryTypes[0];

  const toggleFAQ = (index: number) => {
    setFaqItems(prev => prev.map((item, idx) => ({
      ...item,
      isOpen: idx === index ? !item.isOpen : false
    })));
  };



  const handleTypeSelection = (typeCode: string) => {
    setSelectedType(typeCode);
  };


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
                  src="/images/workCompHero1.png" 
                  alt="Workers on construction site for workers compensation insurance"
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
                    Workers' Compensation
                    <span className="block text-transparent bg-gradient-to-r from-[#CC9F54] to-[#B8893D] bg-clip-text">
                      Insurance
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                    Comprehensive workers' compensation coverage across all industries. Protect your employees 
                    and your business with specialized coverage, expert claims management, and industry-specific safety programs.
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {[
                    'All Industries Covered',
                    '24/7 Claims Support',
                    'Return-to-Work Programs'
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

      {/* Coverage by Industry Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header - Left Aligned */}
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Coverage by Industry
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Specialized workers' compensation solutions tailored to your industry's unique risks and requirements
            </p>
            {/* Underline bar */}
            {/* <div className="w-96 h-2 bg-gray-900 rounded-full"></div> */}
          </div>

          {/* Industry Type Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {industryTypes.map((industry) => {
              const IconComponent = industry.icon;
              return (
                <button
                  key={industry.typeCode}
                  onClick={() => handleTypeSelection(industry.typeCode)}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    selectedType === industry.typeCode
                      ? 'border-[#CC9F54] bg-[#FBF5EB] shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-[#D9BC82]'
                  }`}
                >
                  <div className="text-center">
                    <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                      <IconComponent 
                        className={`w-12 h-12 transition-all duration-300 ${
                          selectedType === industry.typeCode ? 'text-[#CC9F54]' : 'text-gray-600'
                        } group-hover:scale-110`}
                      />
                    </div>
                    <h3 className={`text-sm font-bold transition-colors ${
                      selectedType === industry.typeCode ? 'text-[#CC9F54]' : 'text-gray-800'
                    }`}>
                      {industry.type}
                    </h3>
                  </div>
                  
                  {/* Selected Indicator */}
                  {selectedType === industry.typeCode && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#CC9F54] rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Badge */}
                  <div className="absolute -top-1 left-2">
                    {/* <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      industry.badge === 'High Risk' ? 'bg-red-100 text-red-800' :
                      industry.badge === 'Government' ? 'bg-blue-100 text-blue-800' :
                      industry.badge === 'Transport Focused' ? 'bg-purple-100 text-purple-800' :
                      industry.badge === 'Specialized' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {industry.badge}
                    </span> */}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Industry Details Panel */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-12">
            
            {/* Industry Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-8 pb-6 border-b-2 border-[#E5CFA5]">
              <div className="mb-4 lg:mb-0">
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {selectedIndustry.title} Workers' Compensation
                </h3>
                {/* <div className={`inline-block px-4 py-2 rounded-full font-bold text-sm ${
                  selectedIndustry.badge === 'High Risk' ? 'bg-red-600 text-white' :
                  selectedIndustry.badge === 'Government' ? 'bg-blue-600 text-white' :
                  selectedIndustry.badge === 'Transport Focused' ? 'bg-purple-600 text-white' :
                  selectedIndustry.badge === 'Specialized' ? 'bg-green-600 text-white' :
                  'bg-gray-600 text-white'
                }`}>
                  {selectedIndustry.badge}
                </div> */}
              </div>
            </div>

            {/* Industry Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-4xl">
              {selectedIndustry.description}
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {selectedIndustry.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-[#FBF5EB] rounded-lg border border-[#E5CFA5]">
                  <CheckCircle className="w-5 h-5 text-[#CC9F54] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    {/* Coverage Details Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              What Workers' Compensation Covers
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Comprehensive protection for workplace injuries and occupational illnesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
            {coverageDetails.map((detail) => {
              const IconComponent = detail.icon;
              return (
                <div key={detail.title} className="p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-[#D9BC82] aspect-square flex flex-col justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#CC9F54] to-[#B8893D] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
                    {detail.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm text-left">
                    {detail.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Claims Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              File a Workers' Compensation Claim
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Quick and easy claim filing process with 24/7 expert support
            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Claims Process Steps */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Claim Filing Process</h3>
              <div className="space-y-6">
                {claimsSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#CC9F54] to-[#B8893D] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{step.number}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Report a Claim</h3>
              
              {/* Phone */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">24/7 Claims Hotline</h4>
                    <a href="tel:+15155817187" className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors">
                      (515) 581-7187
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Immediate assistance available</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#A87A32] to-[#8A652B] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Email Claims Team</h4>
                    <a href="mailto:claims@moxieriskpartners.com" className="text-lg font-bold text-[#A87A32] hover:text-[#8A652B] transition-colors break-all">
                      claims@moxieriskpartners.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Email documentation support</p>
                  </div>
                </div>
              </div>

              {/* Online Portal */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Online Portal</h4>
                    <a href="/claims" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      File Online Claim
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                    <p className="text-sm text-gray-500 mt-2">Secure online claim filing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Workers' Compensation FAQs
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Common questions about workers' compensation coverage, requirements, and claims
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                <button
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-100 rounded-xl transition-colors duration-200"
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

      {/* Enhanced CTA Footer with Quote Form */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - CTA Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Ready to Protect Your
                  <span className="block text-transparent bg-gradient-to-r from-[#CC9F54] to-[#B8893D] bg-clip-text">
                    Employees and Business?
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Join thousands of employers who trust Moxie Risk Partners 
                  for their workers' compensation needs. Get your quote today and experience 
                  the difference specialized industry expertise makes for your coverage and claims.
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
              
<div>
  <IndustryQuoteForm 
    industry="workers-comp"
    formName="Workers Compensation Quote"
    title="Get Your Free Quote"
    subtitle="Fast, competitive workers' compensation insurance quotes"
    fields={workersCompFields}
  />
</div>
           
            </div>
          </div>

      </section>
 
    </div>
  );
};

export default WorkersCompPage;