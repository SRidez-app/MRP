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
    <section className="py-20 bg-gradient-to-br from-[#FBF5EB] via-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(204, 159, 84, 0.2) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(204, 159, 84, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(204, 159, 84, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Content */}
          <div className={`${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            {/* Title */}
            <div className="relative mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="relative">
                  Ready to 
                  <div className="absolute -top-8 md:-top-12 left-0 w-full h-8 md:h-12 bg-gradient-to-r from-[#FBF5EB]0/10 to-transparent rounded-lg"></div>
                </span>
                <br />
                <span className="text-[#B8893D]">Protect</span> Your
                <br />
                Business?
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
              Get personalized commercial insurance solutions from trusted specialists who understand your industry and local market.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {[
                {
                  svg: (
                    <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Shield body */}
                      <path d="M6 4.5L14 2L22 4.5V12C22 17.5 18.5 22 14 24C9.5 22 6 17.5 6 12V4.5Z" fill="#CC9F54" fillOpacity="0.15" stroke="#CC9F54" strokeWidth="1.5" strokeLinejoin="round"/>
                      {/* Sword blade */}
                      <path d="M14 7V17" stroke="#CC9F54" strokeWidth="1.8" strokeLinecap="round"/>
                      {/* Sword crossguard */}
                      <path d="M10.5 12.5H17.5" stroke="#CC9F54" strokeWidth="1.8" strokeLinecap="round"/>
                      {/* Sword pommel */}
                      <circle cx="14" cy="19" r="1" fill="#CC9F54"/>
                    </svg>
                  ),
                  text: 'Industry-leading coverage options',
                  desc: 'Comprehensive protection tailored to your business'
                },
                {
                  svg: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#CC9F54" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                      <path d="M2 12h20" />
                      <path d="M12 2c2.5 3.5 4 7.5 4 10s-1.5 6.5-4 10" />
                      <circle cx="12" cy="12" r="3" fill="#CC9F54" opacity="0.2" />
                      <circle cx="12" cy="12" r="1.5" fill="#CC9F54" />
                    </svg>
                  ),
                  text: 'Local expertise in your market',
                  desc: 'Regional specialists who know your area'
                },
                {
                  svg: (
                    <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Clock face */}
                      <circle cx="14" cy="14" r="11.5" stroke="#CC9F54" strokeWidth="1.5"/>
                      {/* Inner ring */}
                      <circle cx="14" cy="14" r="9" stroke="#CC9F54" strokeWidth="0.5" strokeOpacity="0.3"/>
                      {/* Hour hand */}
                      <path d="M14 14V8" stroke="#CC9F54" strokeWidth="2" strokeLinecap="round"/>
                      {/* Minute hand */}
                      <path d="M14 14L19 11" stroke="#CC9F54" strokeWidth="1.5" strokeLinecap="round"/>
                      {/* Center dot */}
                      <circle cx="14" cy="14" r="1.5" fill="#CC9F54"/>
                      {/* Hour markers */}
                      <circle cx="14" cy="4.5" r="0.8" fill="#CC9F54"/>
                      <circle cx="14" cy="23.5" r="0.8" fill="#CC9F54"/>
                      <circle cx="4.5" cy="14" r="0.8" fill="#CC9F54"/>
                      <circle cx="23.5" cy="14" r="0.8" fill="#CC9F54"/>
                    </svg>
                  ),
                  text: 'Fast quote turnaround time',
                  desc: 'Quick responses when you need them most'
                }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center mr-4">
                    {benefit.svg}
                  </div>
                  <div className="flex-1">
                    <span className="text-gray-900 font-semibold text-lg block">{benefit.text}</span>
                    <span className="text-gray-600 text-sm">{benefit.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="font-medium">Secure & Confidential</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium">No Obligation</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#F0E2C8] rounded-full flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-[#B8893D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-medium">Fast Response</span>
              </div>
            </div>
          </div>

          {/* Right Side - CTA Card */}
          <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'} delay-400`}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100 relative overflow-hidden">
              
              {/* Card Background Decorations */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#FBF5EB]0/10 to-transparent rounded-full transform translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#D4B06B]/10 to-transparent rounded-full transform -translate-x-16 translate-y-16"></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F0E2C8] rounded-2xl mb-6">
                    <svg className="w-8 h-8 text-[#B8893D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    Get Your Free Quote Today
                  </h3>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Connect with local specialists who provide personalized coverage solutions for your business needs.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-[#B8893D] mb-1">24/7</div>
                    <div className="text-xs text-gray-600 font-medium">Claims Support</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-[#B8893D] mb-1">48</div>
                    <div className="text-xs text-gray-600 font-medium">States Covered</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-[#B8893D] mb-1">100%</div>
                    <div className="text-xs text-gray-600 font-medium">Compliant</div>
                  </div>
                </div>

            {/* Action Buttons */}
                <div className="space-y-4">
                  <a 
                    href="tel:+15155817187"
                    className="w-full bg-[#CC9F54] hover:bg-[#B8893D] text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center group"
                  >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call (515) 581-7187
                    
                  </a>
                  
                  <a 
                    href="/quote-form"
                    className="w-full border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center group"
                  >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Get Free Quote
                 
                  </a>
                </div>

                {/* Bottom Note */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Free consultation • No commitment required • Local experts ready to help
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  );
};

export default React.memo(CallToAction);