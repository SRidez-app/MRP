"use client";

import React from 'react';
import Image from 'next/image';

const ComingSoon = () => {
  const handleEarlyAccess = () => {
    window.location.href = 'mailto:quotes@moxieriskpartners.com?subject=Early Quote Access Request';
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        {/* Desktop: Video with fallback image */}
        <div className="hidden md:block w-full h-full relative">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              filter: 'brightness(0.4)'
            }}
          >
            <source src="/hero5.mp4" type="video/mp4" />
            {/* Desktop fallback image */}
            <Image 
              src="/images/hero.webp" 
              alt="Moxie Risk Partners Hero Background" 
              fill
              className="object-cover"
              priority
            />
          </video>
        </div>
        
        {/* Mobile: Static image only */}
        <div className="md:hidden">
          <Image 
            src="/images/hero.webp" 
            alt="Moxie Risk Partners Hero Background" 
            fill
            className="object-cover"
            style={{ 
              filter: 'brightness(0.4)'
            }}
            priority
          />
        </div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Logo - Far Left */}
      <div className="absolute top-6 left-6 z-20">
        <Image 
          src="/images/logoWhite.webp" 
          alt="Moxie Risk Partners Logo" 
          width={180}
          height={60}
          className="w-auto h-12 md:h-16"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          
          {/* Coming Soon Badge */}
          <div className="inline-block mb-8 px-6 py-3 rounded-full" style={{
            background: 'rgba(204, 159, 84, 0.15)',
            backdropFilter: 'blur(12px)',
            border: '2px solid rgba(217, 188, 130, 0.3)'
          }}>
            <span className="text-xl md:text-2xl font-bold tracking-wider" style={{ 
              color: '#D9BC82',
              textShadow: '0 0 20px rgba(217, 188, 130, 0.5)'
            }}>
              COMING SOON
            </span>
          </div>

          {/* Main Content */}
          <div className="space-y-6 mb-12">
            {/* Tagline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight" style={{ 
              color: '#ffffffff', 
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' 
            }}>
              Commercial insurance that moves as fast as you do.
            </h1>
            
            {/* Company Name */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold" style={{ 
              color: '#CC9F54', 
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)' 
            }}>
              Moxie Risk Partners
            </h2>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-white leading-relaxed max-w-3xl mx-auto" style={{ 
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)' 
            }}>
              Specialized commercial insurance for trucking, construction, manufacturing, nonprofit, and public entities with DOT compliance support and 24/7 claims advocacy. 
              <strong style={{ color: '#D9BC82' }}> Fast quotes and expedited service</strong> - we protect what builds America.
            </p>
          </div>

          {/* Early Access Section */}
          <div className="mb-12">
            <div className="inline-block rounded-2xl p-8 shadow-2xl max-w-md mx-auto" style={{
              background: 'linear-gradient(135deg, rgba(30, 30, 35, 0.95) 0%, rgba(45, 45, 50, 0.92) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(217, 188, 130, 0.15)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)'
            }}>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ 
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' 
              }}>
                Get Your Quote Now
              </h3>
              <p className="text-white/80 mb-6 text-sm md:text-base">
                No need to wait - receive personalized insurance quotes today
              </p>
              
              <button 
                onClick={handleEarlyAccess}
                className="w-full bg-[#CC9F54] hover:bg-[#B8893D] text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Request Quote Now
              </button>
              
              <p className="text-white/60 text-xs mt-4">
                Email us at <a href="mailto:quotes@moxieriskpartners.com" className="text-[#D9BC82] hover:text-[#E5CFA5] underline">quotes@moxieriskpartners.com</a>
              </p>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="flex flex-wrap gap-8 pt-6 pb-6 px-6 border-t border-white/20 justify-center rounded-lg max-w-2xl mx-auto" style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold" style={{ 
                color: '#D9BC82', 
                textShadow: '0 0 8px rgba(217, 188, 130, 0.4)' 
              }}>24/7</div>
              <div className="text-white/90 text-sm font-medium">Claims Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold" style={{ 
                color: '#D9BC82', 
                textShadow: '0 0 8px rgba(217, 188, 130, 0.4)' 
              }}>48</div>
              <div className="text-white/90 text-sm font-medium">States</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold" style={{ 
                color: '#D9BC82', 
                textShadow: '0 0 8px rgba(217, 188, 130, 0.4)' 
              }}>100%</div>
              <div className="text-white/90 text-sm font-medium">Compliant</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ComingSoon;