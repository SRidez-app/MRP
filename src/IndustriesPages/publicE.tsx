"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Clock, Users, Star, Phone, Mail, MapPin, Building, AlertCircle, FileText, Award, Target, X } from 'lucide-react';
import IndustryQuoteForm from '@/Components/IndustryQuoteForm';
import { publicEntityFields } from '@/config/industryFormConfigs';
import Link from 'next/link';


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

// SuccessModal Component (inline to avoid import issues)
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  showConfetti: boolean;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, showConfetti }) => {
  const [confettiPieces, setConfettiPieces] = useState<Array<{
    id: number;
    left: number;
    animationDelay: number;
    backgroundColor: string;
  }>>([]);

  useEffect(() => {
    if (isOpen && showConfetti) {
      const colors = ['#B8893D', '#B8893D', '#D4B06B', '#B8893D', '#E5CFA5'];
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 0.5,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)]
      }));
      setConfettiPieces(pieces);

      const timer = setTimeout(() => {
        setConfettiPieces([]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, showConfetti]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {showConfetti && confettiPieces.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="absolute w-2 h-2 opacity-0"
              style={{
                left: `${piece.left}%`,
                top: '-10px',
                backgroundColor: piece.backgroundColor,
                animation: `confetti-fall 3s ease-out forwards`,
                animationDelay: `${piece.animationDelay}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-modal-appear"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-bounce-once">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Quote Request Received!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your interest in our public entity insurance solutions. 
              One of our specialized agents will contact you within 24 hours.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
              <h4 className="font-semibold text-gray-900 mb-3">What happens next?</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="font-bold text-[#B8893D] mr-2">1.</span>
                  <span>We'll review your entity's specific needs</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-[#B8893D] mr-2">2.</span>
                  <span>Our expert will contact you to discuss coverage options</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-[#B8893D] mr-2">3.</span>
                  <span>You'll receive a comprehensive quote tailored to your organization</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-[#B8893D] to-[#B8893D] hover:from-[#A87A32] hover:to-[#9A7030] text-white py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
            >
              Got It, Thanks!
            </button>

            <p className="text-xs text-gray-500 mt-4">
              Need immediate assistance? Call us at{' '}
              <a href="tel:+15155817187" className="text-[#B8893D] hover:text-[#B8893D] font-semibold">
                (515) 581-7187
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes modal-appear {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes bounce-once {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .animate-modal-appear {
          animation: modal-appear 0.3s ease-out forwards;
        }

        .animate-bounce-once {
          animation: bounce-once 0.6s ease-in-out;
        }
      `}</style>
    </>
  );
};

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

 
  const handleTypeSelection = (typeCode: string) => {
    setSelectedType(typeCode);
  };

  // Don't render interactive elements until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        <section ref={heroRef} className="bg-white py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
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

              <div className="transform transition-all duration-1000 delay-300">
                <div className="space-y-8">
                  <div>
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                      Public Entity Insurance &
                      <span className="block text-transparent bg-gradient-to-r from-[#B8893D] to-[#B8893D] bg-clip-text">
                        Risk Management
                      </span>
                    </h1>
                    
                    <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                      Comprehensive risk management solutions designed specifically for government entities, 
                      municipalities, and public organizations. Protect your community while ensuring operational continuity.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      'Government-Focused Coverage',
                      'FEMA Compliance Ready',
                      'Public Sector Expertise'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-[#B8893D] flex-shrink-0" />
                        <span className="text-lg font-medium text-gray-800">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-gradient-to-r from-[#B8893D] to-[#B8893D] hover:from-[#A87A32] hover:to-[#9A7030] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group">
                      Get Your Quote
                     
                    </button>
                    
                    <a href="tel:+15155817187" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center">
                       Call (515) 581-7187
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#B8893D]"></div>
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

            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                    Public Entity Insurance &
                    <span className="block text-transparent bg-gradient-to-r from-[#B8893D] to-[#B8893D] bg-clip-text">
                      Risk Management
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                    Comprehensive risk management solutions designed specifically for government entities, 
                    municipalities, and public organizations. Protect your community while ensuring operational continuity.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    'Government-Focused Coverage',
                    'FEMA Compliance Ready',
                    'Public Sector Expertise'
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

      {/* Specialized Services Selector Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Specialized Services
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Integrated risk management and emergency planning services designed for public sector success.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {serviceTypes.map((service) => {
              const IconComponent = service.icon;
              return (
                <button
                  key={service.typeCode}
                  onClick={() => handleTypeSelection(service.typeCode)}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    selectedType === service.typeCode
                      ? 'border-[#B8893D] bg-[#FBF5EB] shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-[#B8893D]'
                  }`}
                >
                  <div className="text-center">
                    <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                      <IconComponent 
                        className={`w-12 h-12 transition-all duration-300 ${
                          selectedType === service.typeCode ? 'text-[#B8893D]' : 'text-gray-600'
                        } group-hover:scale-110`}
                      />
                    </div>
                    <h3 className={`text-sm font-bold transition-colors ${
                      selectedType === service.typeCode ? 'text-[#B8893D]' : 'text-gray-800'
                    }`}>
                      {service.type}
                    </h3>
                  </div>
                  
                  {selectedType === service.typeCode && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#B8893D] rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-12">
            
            <div className="flex flex-col lg:flex-row justify-between items-start mb-8 pb-6 border-b-2 border-[#F0E2C8]">
              <div className="mb-4 lg:mb-0">
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-4xl">
              {selectedService.description}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {selectedService.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-[#FBF5EB] rounded-lg border border-[#E5CFA5]">
                  <Star className="w-5 h-5 text-[#B8893D] mt-0.5 flex-shrink-0 fill-current" />
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
                  <div className="w-16 h-16 bg-gradient-to-br from-[#B8893D] to-[#B8893D] rounded-xl flex items-center justify-center mx-auto mb-6">
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
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {publicEntityTypes.map((sector) => (
              <div key={sector.title} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#E5CFA5]">
                  {sector.title}
                </h3>
                <ul className="space-y-2">
                  {sector.entities.map((entity) => (
                    <li key={entity} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-[#B8893D] flex-shrink-0" />
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
            
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Ready to Protect Your
                  <span className="block text-transparent bg-gradient-to-r from-[#B8893D] to-[#B8893D] bg-clip-text">
                    Public Entity?
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Join thousands of government entities who trust our specialized expertise. 
                  Get comprehensive risk management solutions tailored to your public service mission today.
                </p>
              </div>

              <div className="grid md:grid-cols-1 gap-6">
            
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Call Us Now</h4>
                  <a href="tel:+15155817187" className="text-lg font-bold text-green-600 hover:text-green-700 transition-colors">
                    (515) 581-7187
                  </a>
                  <p className="text-xs text-gray-500 mt-1">24/7 Available</p>
                </div>

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
<IndustryQuoteForm  // 6 lines
  industry="public-entity"
  formName="Public Entity Insurance Quote"
  title="Get Your Free Quote"
  subtitle="Fast, competitive public entity insurance quotes"
  fields={publicEntityFields}
/>
     
          </div>
        </div>
      </section>

  
    </div>
  );
};

export default PublicEntityPage;