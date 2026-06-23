"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Phone, Mail, Truck, FileText, Users, Award, DollarSign, Clock } from 'lucide-react';
import { ownerOperatorFields } from '@/config/industryFormConfigs';
import Link from 'next/link';
import dynamic from 'next/dynamic'; // Add this import

// Add dynamic import with ssr disabled
const IndustryQuoteForm = dynamic(
  () => import('@/Components/IndustryQuoteForm'),
  { ssr: false }
);

interface CoverageOption {
  title: string;
  description: string;
  features: string[];
  category: 'required' | 'recommended' | 'optional';
  icon: React.ElementType;
}

interface AuthorityType {
  title: string;
  description: string;
  coverages: string[];
}

interface CostFactor {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const OwnerOperator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      question: "Do I need my own insurance if I'm leased to a carrier?",
      answer: "Yes, motor carrier policies typically only cover liability when under dispatch. You need your own physical damage, non-trucking use, and other coverages to fill the gaps when you're not hauling their freight.",
      isOpen: false
    },
    {
      question: "What's the minimum liability coverage required for owner operators?",
      answer: "FMCSA requires $750,000 minimum for general freight interstate operations. Many brokers and shippers require $1 million. Hazmat and other specialized cargo types require higher limits up to $5 million.",
      isOpen: false
    },
    {
      question: "Can I get monthly payment terms for my insurance?",
      answer: "Yes, we offer flexible payment options including monthly billing to help manage your cash flow. Down payment requirements vary by coverage type and your qualifications.",
      isOpen: false
    },
    {
      question: "How quickly can I get owner operator coverage?",
      answer: "With proper documentation, we can often provide same-day coverage and instant certificates. DOT filings are submitted immediately upon binding your policy.",
      isOpen: false
    },
    {
      question: "What's the difference between own authority and leased operators?",
      answer: "Own authority operators run under their own DOT numbers and need full primary liability coverage. Leased operators work under a carrier's authority but still need physical damage and non-trucking use coverage for protection gaps.",
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

  const coverageOptions: CoverageOption[] = [
    {
      title: "Primary Auto Liability",
      description: "Required federal coverage protecting against third-party bodily injury and property damage claims from trucking operations.",
      features: ["FMCSA Minimum $750K Coverage", "Higher Limits Available", "Interstate Operations", "Instant Certificates"],
      category: 'required',
      icon: Shield
    },
    {
      title: "Physical Damage Coverage",
      description: "Comprehensive protection for your truck and equipment against collision, theft, vandalism, and weather damage.",
      features: ["Collision Coverage", "Comprehensive Protection", "Agreed Value Options", "Flexible Deductibles"],
      category: 'recommended',
      icon: Truck
    },
    {
      title: "Motor Truck Cargo",
      description: "Protection for freight you're hauling from pickup to delivery, covering loss or damage to customer goods.",
      features: ["$5K to $250K Limits", "Loading/Unloading Coverage", "Refrigerated Cargo", "General Average Protection"],
      category: 'recommended',
      icon: FileText
    },
    {
      title: "Non-Trucking Use Liability",
      description: "Personal use coverage when your truck isn't under dispatch, filling gaps in motor carrier policies.",
      features: ["Personal Errands Coverage", "Bobtail Protection", "Off-Duty Accidents", "Gap Coverage"],
      category: 'optional',
      icon: Users
    },
    {
      title: "Trailer Interchange",
      description: "Physical damage protection for non-owned trailers you use under interchange agreements with other carriers.",
      features: ["Non-Owned Trailer Protection", "Interchange Agreements", "Comprehensive & Collision", "Industry Standard Terms"],
      category: 'optional',
      icon: Award
    },
    {
      title: "Occupational Accident",
      description: "Medical and income protection for owner operators who aren't eligible for traditional workers' compensation coverage.",
      features: ["Medical Expense Coverage", "Disability Benefits", "Accidental Death Benefits", "Workers Comp Alternative"],
      category: 'optional',
      icon: Users
    }
  ];

  const authorityTypes: AuthorityType[] = [
    {
      title: "Own Authority Operators",
      description: "Independent truckers operating under their own DOT authority with complete control over their business operations and freight selection.",
      coverages: ["Primary Auto Liability ($750K-$1M+)", "Physical Damage Coverage", "Motor Truck Cargo Insurance", "General Liability Protection"]
    },
    {
      title: "Leased to Motor Carrier",
      description: "Owner operators working under permanent lease agreements with motor carriers, operating under the carrier's authority.",
      coverages: ["Non-Trucking Use Liability", "Physical Damage Protection", "Trailer Interchange Coverage", "Occupational Accident Insurance"]
    }
  ];

  const costFactors: CostFactor[] = [
    {
      title: "Driving Record & Experience",
      description: "Clean MVR records and trucking experience qualify for better rates and preferred coverage options with leading carriers.",
      icon: Award
    },
    {
      title: "Equipment Type & Value",
      description: "Truck age, replacement value, and safety features affect both liability and physical damage premium calculations.",
      icon: Truck
    },
    {
      title: "Cargo & Operating Authority",
      description: "General freight, specialized hauling, hazmat, and operating radius each present different risk profiles and rates.",
      icon: FileText
    },
    {
      title: "Coverage Limits & Deductibles",
      description: "Higher liability limits and lower physical damage deductibles increase premium but provide comprehensive protection.",
      icon: Shield
    },
    {
      title: "Business History & Claims",
      description: "Established operators with good loss history and no recent claims qualify for competitive pricing and better terms.",
      icon: Clock
    },
    {
      title: "Payment Terms & Billing",
      description: "Annual payments typically offer discounts, while monthly billing provides cash flow flexibility for independent operators.",
      icon: DollarSign
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
            
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/ownerOp.png" 
                  alt="Owner operator truck driver with their commercial vehicle"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>

            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                    Owner Operator
                    <span className="block text-transparent bg-gradient-to-r from-[#CC9F54] to-[#B8893D] bg-clip-text">
                      Insurance
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                    Specialized coverage designed specifically for independent truck drivers who own and operate their own commercial vehicles. DOT compliant protection with competitive rates.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    'DOT Compliant Coverage',
                    'Flexible Payment Terms',
                    '24/7 Claims Support'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#CC9F54] flex-shrink-0" />
                      <span className="text-lg font-medium text-gray-800">{feature}</span>
                    </div>
                  ))}
                </div>

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

      {/* Coverage Options */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Coverage Options
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              From required federal liability to optional enhancements, we provide comprehensive insurance solutions tailored to your specific operating authority and business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coverageOptions.map((coverage) => {
              const IconComponent = coverage.icon;
              return (
                <div 
                  key={coverage.title} 
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-[#CC9F54]" />
                      </div>
                   
                    </div>
                    <h3 className="text-xl font-bold text-white">{coverage.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{coverage.description}</p>
                    <ul className="space-y-2">
                      {coverage.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-[#CC9F54] mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
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

      {/* Authority Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Coverage by Operating Authority
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Your insurance needs depend on whether you operate under your own DOT authority or lease to a motor carrier. We provide the right coverage for both situations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {authorityTypes.map((authority) => (
              <div key={authority.title} className="bg-gradient-to-br from-[#FBF5EB] to-[#F5EDE0] rounded-xl p-8 border border-[#E5CFA5]">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {authority.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {authority.description}
                </p>
                <ul className="space-y-3">
                  {authority.coverages.map((coverage, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#CC9F54] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800 font-medium">{coverage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Factors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              What Affects Your Insurance Costs?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Several factors influence your premium rates. Understanding these helps you make informed decisions about your coverage and find the best value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {costFactors.map((factor) => {
              const IconComponent = factor.icon;
              return (
                <div key={factor.title} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#CC9F54] to-[#B8893D] rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {factor.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {factor.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Owner Operator Insurance FAQ
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Common questions about owner operator insurance coverage, requirements, and costs
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

      {/* Final CTA with Form */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Ready to Protect Your
                  <span className="block text-transparent bg-gradient-to-r from-[#CC9F54] to-[#B8893D] bg-clip-text">
                    Trucking Business?
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Join thousands of independent truck drivers who trust Moxie Risk Partners for their insurance needs. Get specialized owner operator coverage designed for your unique risks and requirements.
                </p>
              </div>

              <div className="grid md:grid-cols-1 gap-6">
                
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

           
          
           

            <IndustryQuoteForm  // 6 lines
  industry="owner-operator"
  formName="Owner Operator Insurance Quote"
  title="Get Your Free Quote"
  subtitle="Fast, competitive owner operator insurance quotes"
  fields={ownerOperatorFields}
/>
          </div>
        </div>
      </section>

    </div>
  );
};
export default OwnerOperator;