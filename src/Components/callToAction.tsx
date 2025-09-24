"use client";

import React, { useState, useEffect } from 'react';

const CallToAction: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 170, 133, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255, 107, 53, 0.2) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Mission & Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {/* Mission Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
              <svg className="w-5 h-5 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="text-orange-300 font-medium text-sm">Our Mission</span>
            </div>

            {/* Mission Statement */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <blockquote className="text-white/90 text-lg leading-relaxed italic">
                "To provide specialized commercial insurance solutions that protect the businesses, 
                organizations, and entities that build America. We combine deep industry knowledge 
                with personalized service to deliver the coverage, compliance, and peace of mind 
                our clients need to focus on what they do best."
              </blockquote>
              
              {/* Mission Attribution */}
              <div className="mt-6 flex items-center">
                <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-orange-300 mr-4"></div>
                <span className="text-orange-300 font-semibold">Moxie Risk Partners</span>
              </div>
            </div>

            {/* Value Propositions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '🏢', title: 'Industry Experts', desc: '25+ years combined experience' },
                { icon: '🗺️', title: 'Local Knowledge', desc: 'Regional specialists nationwide' },
                { icon: '🛡️', title: 'Full Protection', desc: 'Comprehensive coverage solutions' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-white/80">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-white">{item.title}</div>
                    <div className="text-sm text-white/60">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - CTA Card */}
          <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'} delay-200`}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 relative overflow-hidden">
              {/* Card Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-50 to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                    Find Your Local Moxie Risk Partners Specialist
                  </h3>
                  
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Get connected with a regional specialist who understands your local market 
                    and can provide personalized commercial insurance solutions.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-4 mb-8">
                  {[
                    'Local market expertise in your region',
                    'Personalized coverage recommendations',
                    'Direct access to decision makers',
                    'Ongoing support and claims advocacy'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center group"
                    suppressHydrationWarning
                  >
                    Find Local Specialist
                    <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  
                  <button 
                    className="w-full border-2 border-gray-300 hover:border-orange-500 text-gray-700 hover:text-orange-600 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:bg-orange-50 flex items-center justify-center group"
                    suppressHydrationWarning
                  >
                    Get a Quote
                    <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </button>
                </div>

                {/* Trust Elements */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Secure & Confidential
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Fast Response
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      No Obligation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className={`mt-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} delay-400`}>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex flex-wrap gap-8 justify-center text-center">
              <div className="text-white">
                <div className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#ffaa85', textShadow: '0 0 8px rgba(255, 170, 133, 0.4)' }}>24/7</div>
                <div className="text-white/90 text-sm font-medium">Claims Support</div>
              </div>
              <div className="text-white">
                <div className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#ffaa85', textShadow: '0 0 8px rgba(255, 170, 133, 0.4)' }}>48</div>
                <div className="text-white/90 text-sm font-medium">States</div>
              </div>
              <div className="text-white">
                <div className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#ffaa85', textShadow: '0 0 8px rgba(255, 170, 133, 0.4)' }}>100%</div>
                <div className="text-white/90 text-sm font-medium">Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  );
};

export default React.memo(CallToAction);