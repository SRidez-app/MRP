"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Clock, Users, Star, Phone, Mail, MapPin, AlertTriangle, FileText, Lock, Scale, Gavel } from 'lucide-react';

const TermsPage = () => {
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

    // Handle scrolling to anchor on page load
    const hash = window.location.hash.substring(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }

    return () => observer.disconnect();
  }, []);

  const liabilityItems = [
    {
      title: "Indirect Damages",
      description: "No liability for consequential losses",
      icon: AlertTriangle
    },
    {
      title: "Liability Cap", 
      description: "Limited to amounts paid in previous 12 months",
      icon: Shield
    },
    {
      title: "Website Availability",
      description: "No warranties on uptime or accuracy", 
      icon: Clock
    },
    {
      title: "Business Decisions",
      description: "User assumes risk for decisions based on our information",
      icon: Users
    }
  ];

  const responsibilityCategories = [
    {
      title: "Information Accuracy",
      items: [
        "Provide accurate and truthful information",
        "Update information when circumstances change"
      ]
    },
    {
      title: "Account Security", 
      items: [
        "Maintain the confidentiality of your account credentials",
        "Notify us immediately of any unauthorized use"
      ]
    },
    {
      title: "Lawful Use",
      items: [
        "Use our services only for lawful purposes",
        "Respect intellectual property rights",
        "Not interfere with Website operations or security"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section - Full Width Background */}
      <section ref={heroRef} className="relative bg-white py-12 lg:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/terms.png" 
            alt="Terms of Use - Legal document and professional consultation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Terms of Use
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8 max-w-4xl mx-auto">
              These terms govern your use of the Moxie Risk Partners website and services.
            </p>

            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-white/90 font-semibold">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Our Terms and Conditions
            </h2>
          </div>

          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              Welcome to Moxie Risk Partners. These Terms of Use govern your access to and use of our website, 
              services, and any content we provide. By using our services, you agree to be bound by these terms.
            </p>
            <p>
              Please read these terms carefully before using our website or services. If you do not agree with 
              these terms, you should not access or use our services.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content Sections */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Section 1: Acceptance of Terms */}
          <div id="acceptance" className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">1. Acceptance of Terms</h2>
              </div>
            </div>
            
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                By accessing or using the Moxie Risk Partners website ("Website"), you agree to be bound by these Terms of Use ("Terms"). 
                If you do not agree to these Terms, please do not use our Website or services.
              </p>
              <p>
                Moxie Risk Partners reserves the right to modify these Terms at any time. Changes will be posted on this page, 
                and your continued use of the Website constitutes acceptance of any modifications.
              </p>
            </div>
          </div>

          {/* Section 2: License to Use */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">2. License to Use</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable license to access and use our Website for legitimate business purposes 
                and obtaining insurance quotes and information. This license does not include:
              </p>
              
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h4 className="text-xl font-bold text-red-900 mb-4">Prohibited Uses</h4>
                <ul className="space-y-2">
                  {[
                    "Commercial use or resale of our content",
                    "Copying, distributing, or modifying our materials", 
                    "Using automated systems to access our Website",
                    "Attempting to gain unauthorized access to our systems"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-red-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Insurance Services */}
          <div id="insurance-services" className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">3. Insurance Services</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Licensed Insurance Agency</h3>
                <p className="text-blue-800 leading-relaxed">
                  Moxie Risk Partners is a licensed insurance agency. All insurance quotes and information provided are estimates only. 
                  Actual coverage and rates are subject to underwriting review and approval by insurance carriers.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Important Disclaimers</h3>
                <ul className="space-y-2">
                  {[
                    "Underwriting review and approval by insurance carriers",
                    "Verification of information provided",
                    "State regulations and carrier guidelines", 
                    "Final policy terms and conditions"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <p className="text-yellow-900 font-semibold">
                  <strong>No coverage exists until a policy is issued and premium is paid. Information on our Website does not constitute 
                  a contract of insurance or guarantee of coverage.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: User Responsibilities */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">4. User Responsibilities</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                When using our Website and services, you agree to:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {responsibilityCategories.map((category, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">{category.title}</h4>
                    <ul className="space-y-2">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                You are responsible for all activity that occurs under your account and must notify us immediately of any 
                unauthorized use or security breaches.
              </p>
            </div>
          </div>

          {/* Section 5: Privacy and Data Protection */}
          <div id="privacy-data" className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">5. Privacy and Data Protection</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-3">Your Privacy Matters</h3>
                <p className="text-green-800 leading-relaxed">
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, 
                  which is incorporated into these Terms by reference.
                </p>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                By using our services, you consent to the collection, use, and sharing of your information as described in our 
                Privacy Policy and as necessary to provide insurance services.
              </p>
            </div>
          </div>

          {/* Section 6: Insurance Disclaimers */}
          <div id="disclaimers" className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">6. Insurance Disclaimers</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h3 className="text-xl font-bold text-red-900 mb-3">Important Insurance Notice</h3>
                <p className="text-red-800 font-semibold mb-2">
                  OUR WEBSITE AND SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
                </p>
                <p className="text-red-800 leading-relaxed">
                  We do not warrant that our Website will be uninterrupted, error-free, or free of harmful components. 
                  Information on our Website is for general purposes only and should not be considered as professional advice 
                  for your specific situation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Specific Insurance Disclaimers</h3>
                <ul className="space-y-3">
                  {[
                    { title: "No Coverage Guarantee:", desc: "Quotes are estimates only and do not guarantee coverage" },
                    { title: "Carrier Approval:", desc: "All coverage is subject to underwriting and carrier approval" },
                    { title: "Rate Changes:", desc: "Insurance rates may change based on final underwriting review" },
                    { title: "Policy Terms:", desc: "Actual coverage is governed by the issued insurance policy" },
                    { title: "State Regulations:", desc: "Coverage availability varies by state and regulation" },
                    { title: "Binding Coverage:", desc: "Coverage is not bound until confirmed by the insurance carrier" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-gray-900">{item.title}</span>
                        <span className="text-gray-700"> {item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 7: Limitation of Liability */}
          <div id="liability" className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">7. Limitation of Liability</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                <strong>To the maximum extent permitted by law, Moxie Risk Partners shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages arising from your use of our Website or services.</strong>
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our total liability for any claims related to our Website or services shall not exceed the amount you paid 
                us for services in the twelve months preceding the claim.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {liabilityItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 8: Governing Law */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Gavel className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">8. Governing Law</h2>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              These Terms are governed by the laws of the State where Moxie Risk Partners is headquartered, without regard 
              to conflict of law principles. Any disputes arising under these Terms will be subject to the exclusive jurisdiction 
              of the courts in that state.
            </p>
          </div>

          {/* Section 9: Termination */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">9. Termination</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-gray-600 leading-relaxed">
                We may terminate or suspend your access to our Website at any time, with or without notice, for violation of these Terms 
                or for any other reason. Upon termination, your right to use our Website ceases immediately.
              </p>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <p className="text-blue-800">
                  Termination does not affect any rights or obligations that have accrued prior to the effective date of termination.
                </p>
              </div>
            </div>
          </div>

          {/* Section 10: Contact Information */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">10. Contact Us</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-gray-600 leading-relaxed">
                If you have questions about these Terms of Use, please contact us:
              </p>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="space-y-2">
                  <p className="font-bold text-gray-900">Moxie Risk Partners</p>
                  <p className="text-gray-700">Legal Department</p>
                  <p className="text-gray-700">Email: info@moxieriskpartners.com</p>
                  <p className="text-gray-700">Phone: (800) 326-5581</p>
                </div>
              </div>
            </div>
          </div>

          {/* Agreement Confirmation */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 lg:p-12 border border-orange-200 shadow-lg">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900">Terms Acknowledgment</h3>
              
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  By using our Website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. 
                  These Terms constitute the entire agreement between you and Moxie Risk Partners regarding your use of our Website.
                </p>
                <p>
                  We appreciate your business and look forward to serving your insurance needs. If you have any questions 
                  or concerns about these terms, please contact us.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group"
                >
                  Contact Our Legal Team
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default TermsPage;