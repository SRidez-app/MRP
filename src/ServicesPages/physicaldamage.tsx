"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Phone, Mail, Truck, Wrench, DollarSign, FileText, AlertTriangle, Car, Flame } from 'lucide-react';
import Link from 'next/link';

import { physicalDamageFields } from '@/config/industryFormConfigs';
import dynamic from 'next/dynamic';

const IndustryQuoteForm = dynamic(
  () => import('@/Components/IndustryQuoteForm'),
  { ssr: false }
);


interface CoverageType {
  title: string;
  description: string;
  features: string[];
  icon: React.ElementType;
}

interface Enhancement {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const PhysicalDamage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      question: "What's the difference between collision and comprehensive coverage?",
      answer: "Collision coverage pays for damage when your vehicle hits or is hit by another vehicle or object, or when your vehicle overturns. Comprehensive coverage protects against non-collision events like theft, fire, vandalism, weather damage, and falling objects. Most businesses need both types for complete protection.",
      isOpen: false
    },
    {
      question: "Is physical damage insurance required by law?",
      answer: "While federal and state laws don't mandate physical damage coverage, it's often required by lenders or leasing companies if you're financing vehicles. Even for owned vehicles, it's essential protection given the high cost of commercial vehicle replacement and repairs.",
      isOpen: false
    },
    {
      question: "How is my vehicle's value determined after a loss?",
      answer: "Insurers typically use Actual Cash Value (ACV), which factors in the vehicle's original cost minus depreciation, age, mileage, and condition. Some policies offer Stated Value coverage where you and the insurer agree on a value upfront, though payment at loss is still typically the lesser of stated value or ACV.",
      isOpen: false
    },
    {
      question: "What does Gap coverage protect against?",
      answer: "Gap coverage protects you when your vehicle is totaled and you owe more on your loan or lease than the vehicle's actual cash value. It pays the difference between the insurance settlement and your remaining loan balance, preventing out-of-pocket expenses after a total loss.",
      isOpen: false
    },
    {
      question: "Are rental vehicles covered under physical damage insurance?",
      answer: "Standard physical damage coverage typically applies only to owned and specifically scheduled leased vehicles. However, you can add Hired Auto Physical Damage coverage to protect rental or borrowed vehicles you use for business purposes. This is essential if you regularly rent vehicles.",
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

  const coverageTypes: CoverageType[] = [
    {
      title: "Collision Coverage",
      description: "Protects your vehicles when damaged in an accident with another vehicle or object, regardless of who's at fault.",
      features: [
        "Accidents with other vehicles",
        "Single-vehicle accidents",
        "Hitting stationary objects",
        "Vehicle rollover incidents"
      ],
      icon: Car
    },
    {
      title: "Comprehensive Coverage",
      description: "Covers damage from non-collision events, providing all-risk protection for your vehicles beyond accident scenarios.",
      features: [
        "Theft and vandalism",
        "Fire and explosion",
        "Weather damage (hail, wind, flood)",
        "Falling objects and glass breakage"
      ],
      icon: Shield
    },
    {
      title: "Specified Causes Coverage",
      description: "A cost-effective alternative to comprehensive that covers specific, named perils rather than all-risk protection.",
      features: [
        "Fire and lightning",
        "Theft and malicious mischief",
        "Wind, hail, and flood",
        "Earthquake and explosion"
      ],
      icon: Flame
    }
  ];

  const enhancements: Enhancement[] = [
    {
      icon: DollarSign,
      title: "Gap Coverage",
      description: "Covers the difference between your vehicle's actual cash value and your outstanding loan or lease balance in the event of a total loss, protecting you from financial shortfalls."
    },
    {
      icon: Truck,
      title: "Rental Reimbursement",
      description: "Pays for temporary rental vehicle costs while your damaged vehicle is being repaired, keeping your business operations running smoothly during downtime."
    },
    {
      icon: Wrench,
      title: "Towing & Labor",
      description: "Covers towing costs to the nearest qualified repair facility after a covered loss, with options for extended towing to your preferred repair location."
    },
    {
      icon: FileText,
      title: "Downtime Coverage",
      description: "Provides compensation when your vehicle is out of service for extended repairs following a covered loss, helping offset lost revenue during repair periods."
    },
    {
      icon: Car,
      title: "Hired Auto Physical Damage",
      description: "Extends protection to vehicles you rent, hire, or borrow for business use, covering physical damage exposures beyond your owned fleet."
    },
    {
      icon: AlertTriangle,
      title: "Equipment & Accessories",
      description: "Covers permanently installed equipment, custom modifications, and specialized tools beyond standard vehicle coverage, including GPS systems and communication devices."
    }
  ];

  const vehicleCategories = [
    {
      title: "Light Commercial Vehicles",
      types: ["Cargo Vans", "Pickup Trucks", "Service Vehicles", "Utility Vehicles", "Panel Vans"]
    },
    {
      title: "Heavy Commercial Trucks",
      types: ["Semi-Tractors", "Straight Trucks", "Box Trucks", "Dump Trucks", "Flatbed Trucks"]
    },
    {
      title: "Specialized Equipment",
      types: ["Refrigerated Units", "Tank Vehicles", "Heavy Haul Equipment", "Tow Trucks", "Construction Equipment"]
    },
    {
      title: "Trailers & Attachments",
      types: ["Dry Van Trailers", "Flatbed Trailers", "Refrigerated Trailers", "Dump Trailers", "Specialty Trailers"]
    }
  ];

  const exclusions = [
    {
      title: "Wear and Tear",
      description: "Normal aging, deterioration, mechanical breakdown, and road damage to tires"
    },
    {
      title: "Racing & Competition",
      description: "Vehicles used in organized racing, speed contests, or demolition events"
    },
    {
      title: "Intentional Damage",
      description: "Damage caused deliberately by the insured or with their knowledge"
    },
    {
      title: "War & Nuclear Hazards",
      description: "Damage from war, military action, nuclear reaction, or radioactive contamination"
    },
    {
      title: "Non-Permanent Equipment",
      description: "Portable electronic devices not permanently installed in the vehicle"
    },
    {
      title: "Diminution of Value",
      description: "Reduction in vehicle's market value after repairs from a covered accident"
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
                  src="/images/phydamage.png" 
                  alt="Commercial vehicles protected by physical damage insurance"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>

            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                    Commercial Auto
                    <span className="block text-transparent bg-gradient-to-r from-[#CC9F54] to-[#B8893D] bg-clip-text">
                      Physical Damage Insurance
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                    Comprehensive protection for your commercial vehicles against collision, theft, fire, vandalism, and weather damage. Safeguard your assets and keep your business moving forward.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    'Collision & Comprehensive Coverage',
                    'Actual Cash Value or Stated Amount',
                    'Flexible Deductible Options'
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

      {/* Coverage Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Types of Physical Damage Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Choose from multiple coverage options designed to protect your commercial vehicles from a wide range of risks, from accidents to natural disasters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {coverageTypes.map((coverage) => {
              const IconComponent = coverage.icon;
              return (
                <div key={coverage.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3">
                      <IconComponent className="w-6 h-6 text-[#CC9F54]" />
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

      {/* Coverage Enhancements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Coverage Enhancements
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Customize your physical damage protection with additional coverages that address specific business needs and provide comprehensive financial security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enhancements.map((enhancement) => {
              const IconComponent = enhancement.icon;
              return (
                <div key={enhancement.title} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#CC9F54] to-[#B8893D] rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {enhancement.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {enhancement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Vehicles We Cover
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Physical damage protection for every type of commercial vehicle in your operation, from light-duty vans to heavy-haul tractors and specialized equipment.
            </p>
          </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vehicleCategories.map((category) => (
              <div key={category.title} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#E5CFA5]">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.types.map((type) => (
                    <li key={type} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-[#CC9F54] flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Don't See Your Vehicle CTA */}
          <div className="mt-12 bg-gradient-to-r from-[#FBF5EB] to-[#F5EDE0] border-2 border-[#E5CFA5] rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Don't See Your Vehicle Type?
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
              We cover virtually every type of commercial vehicle. If your specialized equipment, custom vehicle, or unique fleet isn't listed above, our experts can create a tailored physical damage solution for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+15155817187" 
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#CC9F54] to-[#B8893D] hover:from-[#B8893D] hover:to-[#A87A32] text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us: (515) 581-7187
              </a>
              <a 
                href="mailto:quotes@moxieriskpartners.com" 
                className="inline-flex items-center justify-center border-2 border-[#CC9F54] text-[#CC9F54] hover:bg-[#B8893D] hover:text-white px-8 py-3 rounded-lg font-bold transition-all duration-300"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Our Team
              </a>
            </div>
          </div>
        </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <FileText className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Important Note</h4>
                <p className="text-gray-700">
                  Coverage exclusions can vary by policy and state. Always review your specific policy documents and discuss your coverage with your insurance agent to understand exactly what is and isn't covered under your physical damage insurance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Not Covered */}

      


      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Physical Damage Insurance FAQs
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Common questions about protecting your commercial vehicles with physical damage coverage
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

      {/* Final CTA with Contact Form */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Protect Your Assets with
                  <span className="block text-transparent bg-gradient-to-r from-[#CC9F54] to-[#B8893D] bg-clip-text">
                    Physical Damage Coverage
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Don't leave your commercial vehicles vulnerable to costly damage. Get comprehensive physical damage protection tailored to your business needs. Our experienced agents will help you find the right coverage with competitive rates.
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
  industry="physical-damage"
  formName="Physical Damage Coverage Quote"
  title="Get Your Free Quote"
  subtitle="Customized physical damage protection for your fleet"
  fields={physicalDamageFields}
/>
              
           
            
          </div>
        </div>
      </section>
      
    
          </div>


  );
};

export default PhysicalDamage;