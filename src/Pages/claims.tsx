"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Clock, Users, Star, Phone, Mail, MessageCircle, FileText, AlertCircle, Headphones } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

interface ProcessStep {
  step: string;
  title: string;
  time: string;
  description: string;
}

interface ClaimsResource {
  title: string;
  description: string;
  features: string[];
  availability: string;
  icon: React.ElementType;
}

const ClaimsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      question: "How quickly should I report a claim?",
      answer: "Immediately. Our 24/7 hotline ensures you can report anytime for all business types. Quick reporting preserves evidence and activates our industry-specialized response team.",
      isOpen: false
    },
    {
      question: "What information do I need to report a claim?",
      answer: "Policy number, incident details, location, photos, and contact information. Additional details vary by industry: trucking requires DOT numbers and cargo details, construction needs project information, manufacturing requires equipment details.",
      isOpen: false
    },
    {
      question: "What makes your claims service different?",
      answer: "Industry-specialized adjusters for trucking, construction, and manufacturing. 1-hour response guarantee, A+ AM Best rating, and 98.7% customer satisfaction with nationwide coverage. Every claim is unique - call our experts to discuss your specific situation and timeline.",
      isOpen: false
    },
    {
      question: "Will my rates increase after filing a claim?",
      answer: "Not all claims affect rates. Comprehensive claims (weather, theft) typically don't impact pricing regardless of your industry. We focus on loss prevention programs to minimize rate impacts.",
      isOpen: false
    },
    {
      question: "Do you handle claims for all business types?",
      answer: "Yes. We provide comprehensive claims support nationwide for trucking, construction, manufacturing, and all commercial business types through our network of specialized adjusters.",
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

  const claimsResources: ClaimsResource[] = [
    {
      title: "Property & Casualty Claims",
      description: "Comprehensive coverage for property damage, liability claims, and casualty incidents across all industries",
      features: ["Commercial Property", "General Liability", "Auto Claims", "Equipment Damage"],
      availability: "24/7 Support",
      icon: Shield
    },
    {
      title: "Workers' Compensation Claims", 
      description: "Specialized support for workplace injuries with return-to-work programs and medical management",
      features: ["Injury Reporting", "Medical Management", "Return-to-Work", "Disability Benefits"],
      availability: "Immediate Response",
      icon: Users
    },
    {
      title: "Specialty Industry Claims",
      description: "Expert handling for industry-specific incidents including cargo, equipment breakdown, and professional liability",
      features: ["Cargo Claims", "Equipment Breakdown", "Professional Liability", "Product Liability"],
      availability: "Industry Specialists",
      icon: FileText
    }
  ];

  const processSteps: ProcessStep[] = [
    { 
      step: "01", 
      title: "Report Claim", 
      time: "24/7 Hotline",
      description: "Call, email, or report online anytime"
    },
    { 
      step: "02", 
      title: "Expert Assigned", 
      time: "Within 1 Hour",
      description: "Industry-specialized adjuster reviews your case"
    },
    { 
      step: "03", 
      title: "Investigation", 
      time: "Immediate Start",
      description: "Evidence gathering and documentation begins"
    },
    { 
      step: "04", 
      title: "Coverage Review", 
      time: "Ongoing Support",
      description: "Policy analysis and benefit determination"
    },
    { 
      step: "05", 
      title: "Resolution Support", 
      time: "Continuous",
      description: "Advocacy and monitoring throughout process"
    }
  ];

  const supportSteps = [
    {
      number: 1,
      title: "Instant Response",
      description: "Call, email, or submit online anytime - our team responds within 1 hour guaranteed"
    },
    {
      number: 2,
      title: "Industry Experts",
      description: "Specialized adjusters who understand your business type and specific coverage needs"
    },
    {
      number: 3,
      title: "Personal Advocate",
      description: "Dedicated claims representative guides you through every step of the process"
    },
    {
      number: 4,
      title: "Ongoing Support",
      description: "Continuous monitoring and support as often as you need - weekly, monthly, or as required"
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
      
      {/* Hero Section - Side by Side Layout */}
      <section ref={heroRef} className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Hero Image */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/claimsHero1.png" 
                  alt="Commercial insurance claims support for all industries"
                  className="w-full h-[580px] lg:h-[680px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
             
                    <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                      Claims Support
                    </span>
                  </h1>
                  
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    24/7 Nationwide Expert Support for All Industries
                  </h2>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                    When incidents happen, every minute counts. Our industry-specialized claims teams provide 
                    immediate nationwide support with A+ AM Best financial strength and 1-hour response guarantee 
                    for trucking, construction, manufacturing, and all commercial business types.
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {[
                    '1-Hour Response',
                    'All Industries',
                    'A+ AM Best Rated'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                      <span className="text-lg font-medium text-gray-800">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+18006694301" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group">
                Call : (800) 669-4301
      
              </a>
                  
                  <a href="#claims-resources" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center">
                    View Resources
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Claims Resources Section */}
      <section id="claims-resources" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header - Left Aligned */}
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              What Type of Claim Are You Reporting?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Comprehensive claims support for all commercial business types with specialized expertise for your industry
            </p>
            {/* Underline bar */}
            <div className="w-96 h-1 bg-gray-900 rounded-full"></div>
          </div>

          {/* Claims Resources Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {claimsResources.map((resource) => {
              const IconComponent = resource.icon;
              return (
                <div key={resource.title} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  
                  {/* Header */}
                  <div className="bg-gray-900 text-white p-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <IconComponent className="w-8 h-8" />
                      <h3 className="text-xl font-bold">{resource.title}</h3>
                    </div>
                    <span className="inline-block bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {resource.availability}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {resource.description}
                    </p>

                    <ul className="space-y-2">
                      {resource.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Our Claims Support Process
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Streamlined support from report to resolution with continuous advocacy throughout your claim
            </p>
            <div className="w-96 h-1 bg-gray-900 rounded-full"></div>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-5 gap-6 mb-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                <div className="text-orange-600 font-medium text-sm mb-2">{step.time}</div>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Important Disclaimer */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Important: Claim Resolution Times</h4>
                <p className="text-gray-700 leading-relaxed">
                  Every claim is unique and resolution times vary significantly based on complexity, investigation requirements, and circumstances beyond our control. 
                  While we provide immediate support and continuous advocacy, larger liability claims may take months or years to fully resolve. 
                  <strong> We offer ongoing monitoring and support as often as you need - weekly, monthly, or as your situation requires.</strong> 
                  <span className="inline-block mt-2">
                    <a href="tel:+18006694301" className="text-orange-600 hover:text-orange-700 font-semibold underline">
                      Call our experts now to discuss your specific claim timeline →
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Claims Support FAQ
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Get instant answers to common questions about our claims process for all business types
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

      {/* 24/7 Support Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              24/7 Claims Support
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Round-the-clock expert assistance for all your commercial insurance claims
            </p>
            <div className="w-96 h-1 bg-gray-900 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Why Our Support Works */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Why Our Support Works</h3>
              <div className="space-y-6">
                {supportSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
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
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Get Support Now</h3>
              
              {/* Phone */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">24/7 Emergency Line</h4>
                    <a href="tel:+18006694301" className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors">
                      (800) 669-4301
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Always available for urgent claims</p>
                  </div>
                </div>
              </div>

              {/* Live Chat */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Live Chat Support</h4>
                    <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      Start Live Chat
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                    <p className="text-sm text-gray-500 mt-2">Real-time assistance online</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Priority Email</h4>
                    <a href="mailto:claims@moxieriskpartners.com" className="text-lg font-bold text-purple-600 hover:text-purple-700 transition-colors break-all">
                      claims@moxieriskpartners.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Email documentation support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Need to File a
              <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                Claim?
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-4xl mx-auto">
              Industry-specialized claims teams ready 24/7/365 nationwide for trucking, construction, 
              manufacturing, and all commercial business types
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+18006694301" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group">
                Report Claim: (800) 669-4301
                <Phone className="ml-2 w-5 h-5" />
              </a>
              
              <a href="tel:+18006694301" className="bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center">
                Contact Claims Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClaimsPage;