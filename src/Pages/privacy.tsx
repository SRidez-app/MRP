"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Clock, Users, Star, Phone, Mail, MapPin, AlertTriangle, FileText, Lock, Scale, Gavel, Eye, Database, UserCheck, Trash2, Download, Ban } from 'lucide-react';

const PrivacyPage = () => {
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

  const usageCategories = [
    {
      title: "Insurance Services",
      items: [
        "Providing insurance quotes and recommendations",
        "Processing insurance applications and policies",
        "Managing your insurance coverage and claims",
        "Communicating with insurance carriers on your behalf"
      ]
    },
    {
      title: "Business Operations",
      items: [
        "Improving our website and services",
        "Customer support and service delivery",
        "Fraud prevention and security",
        "Legal compliance and regulatory requirements"
      ]
    },
    {
      title: "Marketing and Communications",
      items: [
        "Sending relevant insurance information and updates",
        "Marketing communications (with your consent)",
        "Newsletter and educational content",
        "Surveys and feedback requests"
      ]
    }
  ];

  const privacyRights = [
    {
      title: "Access",
      description: "Request copies of your personal information",
      icon: Eye
    },
    {
      title: "Correction",
      description: "Request correction of inaccurate information",
      icon: UserCheck
    },
    {
      title: "Deletion",
      description: "Request deletion of your personal information",
      icon: Trash2
    },
    {
      title: "Portability",
      description: "Request transfer of your data to another service",
      icon: Download
    },
    {
      title: "Objection",
      description: "Object to certain processing activities",
      icon: Ban
    },
    {
      title: "Restriction",
      description: "Request limitation on how we use your data",
      icon: Lock
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section - Full Width Background */}
      <section ref={heroRef} className="relative bg-white py-12 lg:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/privacy.png" 
            alt="Privacy Policy - Data protection and security"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Privacy Policy
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8 max-w-4xl mx-auto">
              Your privacy matters to us. Learn how we protect and handle your personal information.
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
        <div className="px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our Commitment to Your Privacy
            </h2>
          </div>

          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              Moxie Risk Partners is committed to protecting your privacy and maintaining the security of your personal information. 
              This Privacy Policy explains how we collect, use, share, and protect information when you visit our website or use our services.
            </p>
            <p>
              By using our website and services, you consent to the practices described in this Privacy Policy. 
              Please read this policy carefully to understand our practices regarding your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content Sections */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Section 1: Information We Collect */}
          <div id="information-collected" className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">1. Information We Collect</h2>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Personal Information You Provide</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">We collect information that you voluntarily provide to us, including:</p>
                <ul className="space-y-2">
                  {[
                    "Contact information (name, email address, phone number, mailing address)",
                    "Insurance-related information for quotes and applications",
                    "Payment information when processing transactions",
                    "Communication preferences and marketing consent",
                    "Any other information you choose to provide through forms or communications"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Information Collected Automatically</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">When you visit our website, we automatically collect certain information:</p>
                <ul className="space-y-2">
                  {[
                    "Device information (IP address, browser type, operating system)",
                    "Usage data (pages visited, time spent, referral sources)",
                    "Cookies and similar tracking technologies",
                    "Location information (general geographic area)"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: How We Use Your Information */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">2. How We Use Your Information</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                We use your personal information for the following purposes:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {usageCategories.map((category, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
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
            </div>
          </div>

          {/* Section 3: How We Share Your Information */}
          <div id="information-sharing" className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">3. How We Share Your Information</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                We may share your personal information in the following circumstances:
              </p>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Insurance Partners</h3>
                <p className="text-blue-800 leading-relaxed">
                  We share your information with licensed insurance carriers, brokers, and related service providers 
                  to obtain quotes, process applications, and provide insurance services. These partners are bound by 
                  confidentiality agreements and regulatory requirements.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Other Sharing Circumstances</h3>
                <ul className="space-y-3">
                  {[
                    { title: "Service Providers:", desc: "Third-party vendors who help us operate our business" },
                    { title: "Legal Requirements:", desc: "When required by law, court order, or government request" },
                    { title: "Business Transfers:", desc: "In connection with mergers, acquisitions, or asset sales" },
                    { title: "Consent:", desc: "When you explicitly authorize us to share your information" },
                    { title: "Protection:", desc: "To protect our rights, property, or safety, or that of others" }
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

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <p className="text-green-900 font-semibold">
                  <strong>We do not sell your personal information to third parties for their marketing purposes.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Cookies and Tracking Technologies */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">4. Cookies and Tracking Technologies</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                We use cookies, web beacons, and similar technologies to enhance your experience and analyze website usage.
              </p>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h3>
                <ul className="space-y-3">
                  {[
                    { title: "Essential Cookies:", desc: "Required for basic website functionality" },
                    { title: "Analytics Cookies:", desc: "Help us understand how you use our website" },
                    { title: "Marketing Cookies:", desc: "Used to deliver relevant advertisements" },
                    { title: "Preference Cookies:", desc: "Remember your settings and preferences" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-gray-900">{item.title}</span>
                        <span className="text-gray-700"> {item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h4 className="text-lg font-bold text-yellow-900 mb-2">Managing Cookies</h4>
                <p className="text-yellow-800">
                  You can control cookies through your browser settings. Note that disabling certain cookies 
                  may limit website functionality and your ability to receive quotes.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Data Security */}
          <div id="data-security" className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">5. Data Security</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-3">Our Security Commitment</h3>
                <p className="text-green-800 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Security Measures Include</h3>
                <ul className="space-y-2">
                  {[
                    "Encryption of sensitive data in transit and at rest",
                    "Regular security assessments and updates",
                    "Access controls and employee training",
                    "Secure data centers and network infrastructure",
                    "Incident response and breach notification procedures"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Shield className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <p className="text-red-900 font-semibold">
                  <strong>Important:</strong> While we strive to protect your information, no method of transmission 
                  over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Your Privacy Rights */}
          <div id="your-rights" className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">6. Your Privacy Rights</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {privacyRights.map((right, index) => {
                  const IconComponent = right.icon;
                  return (
                    <div key={index} className="text-center p-6 bg-white rounded-xl border border-gray-200">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{right.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{right.description}</p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <p className="text-blue-800">
                  To exercise these rights, please contact us using the information provided below. 
                  We may need to verify your identity before processing your request.
                </p>
              </div>
            </div>
          </div>

          {/* Section 7: Data Retention */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">7. Data Retention</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services, 
                comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Retention Periods</h3>
                <ul className="space-y-3">
                  {[
                    { title: "Active Customers:", desc: "For the duration of our business relationship" },
                    { title: "Insurance Records:", desc: "As required by insurance regulations" },
                    { title: "Marketing Data:", desc: "Until you opt out or we no longer need it" },
                    { title: "Website Analytics:", desc: "Typically 2-3 years" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Clock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
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

          {/* Section 8: Children's Privacy */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">8. Children's Privacy</h2>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <p className="text-purple-900 leading-relaxed">
                Our website and services are not intended for children under 13. We do not knowingly collect 
                personal information from children under 13. If we become aware that we have collected such information, 
                we will take steps to delete it promptly.
              </p>
            </div>
          </div>

          {/* Section 9: Policy Updates */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">9. Updates to This Policy</h2>
              </div>
            </div>
            
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, 
                technology, legal requirements, or other factors. We will post the updated policy on our website 
                and indicate the effective date.
              </p>
              <p>
                For material changes, we may provide additional notice, such as email notification or 
                a prominent website notice.
              </p>
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
                If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, 
                please contact us:
              </p>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="space-y-2">
                  <p className="font-bold text-gray-900">Moxie Risk Partners</p>
                  <p className="text-gray-700">Privacy Officer</p>
                  <p className="text-gray-700">Email: info@moxieriskpartners.com</p>
                  <p className="text-gray-700">Phone: (800) 326-5581</p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Acknowledgment */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 lg:p-12 border border-orange-200 shadow-lg">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900">Privacy Acknowledgment</h3>
              
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  By using our website and services, you acknowledge that you have read, understood, and agree to 
                  the collection, use, and sharing of your information as described in this Privacy Policy.
                </p>
                <p>
                  We are committed to protecting your privacy and maintaining your trust. If you have any questions 
                  or concerns, please don't hesitate to contact us.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group"
                >
                  Contact Privacy Officer
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

export default PrivacyPage;