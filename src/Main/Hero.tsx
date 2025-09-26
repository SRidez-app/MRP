"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SuccessModal from '@/Components/successModal';

interface FormData {
  firstName: string;
  lastName: string;
  industry: string;
  coverageNeeded: string[];
  phone: string;
  email: string;
  dotNumber?: string;
}

const Hero = () => {
  // Removed unused isVisible variable
  const [isCoverageDropdownOpen, setIsCoverageDropdownOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    industry: '',
    coverageNeeded: [],
    phone: '',
    email: '',
    dotNumber: ''
  });

  // Industry options
  const industryOptions = [
    { value: 'trucking', label: 'Trucking & Transportation' },
    { value: 'construction', label: 'Construction & Contracting' },
    { value: 'manufacturing', label: 'Manufacturing & Production' },
    { value: 'nonprofit', label: 'Nonprofit & Human Services' },
    { value: 'public-entity', label: 'Government & Public Entities' }
  ];

  // Updated coverage options with client's requested order for trucking
  const getCoverageOptions = (industry: string) => {
    const baseOptions = [
      { value: 'general-liability', label: 'General Liability' },
      { value: 'property', label: 'Commercial Property' },
      { value: 'cyber-liability', label: 'Cyber Liability' },
      { value: 'workers-comp', label: 'Workers Compensation' }
    ];

    switch (industry) {
      case 'trucking':
        return [
          { value: 'auto-liability', label: 'Auto Liability' },
          { value: 'physical-damage', label: 'Physical Damage' },
          { value: 'motor-truck-cargo', label: 'Motor Truck Cargo' },
          { value: 'general-liability', label: 'General Liability' },
          { value: 'workers-comp', label: 'Workers Compensation' },
          { value: 'ntl-phys', label: 'NTL/Phys' },
          { value: 'occupational-accident', label: 'Occupational Accident' },
          { value: 'brokerage-coverages', label: 'Brokerage Coverages' },
          { value: 'garaging-shop', label: 'Garaging/Shop Coverages' },
          { value: 'commercial-property', label: 'Commercial Property' },
          { value: 'cyber-liability', label: 'Cyber Liability' }
        ];
      
      case 'construction':
        return [
          ...baseOptions,
          { value: 'commercial-auto', label: 'Commercial Auto' },
          { value: 'professional-liability', label: 'Professional Liability' },
          { value: 'contractors-pollution', label: 'Contractors Pollution' },
          { value: 'surety-bonds', label: 'Surety Bonds' }
        ];
      
      case 'manufacturing':
        return [
          ...baseOptions,
          { value: 'product-liability', label: 'Product Liability' },
          { value: 'professional-liability', label: 'Professional Liability' },
          { value: 'equipment-breakdown', label: 'Equipment Breakdown' },
          { value: 'business-interruption', label: 'Business Interruption' }
        ];
      
      case 'nonprofit':
        return [
          ...baseOptions,
          { value: 'directors-officers', label: 'Directors & Officers' },
          { value: 'employment-practices', label: 'Employment Practices Liability' },
          { value: 'professional-liability', label: 'Professional Liability' },
          { value: 'volunteer-accident', label: 'Volunteer Accident' }
        ];
      
      case 'public-entity':
        return [
          ...baseOptions,
          { value: 'public-officials', label: 'Public Officials Liability' },
          { value: 'law-enforcement', label: 'Law Enforcement Liability' },
          { value: 'employment-practices', label: 'Employment Practices Liability' },
          { value: 'constitutional-rights', label: 'Constitutional Rights Coverage' }
        ];
      
      default:
        return baseOptions;
    }
  };

  const coverageOptions = getCoverageOptions(formData.industry);

  // Navigation handlers
  const handleGetQuote = () => {
    router.push('/quote-form');
  };

  const handleCallExpert = () => {
    window.location.href = 'tel:+18006694301';
  };

  // Form handlers
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIndustryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      industry: value,
      coverageNeeded: []
    }));
  };

  const handleCoverageToggle = (coverageValue: string) => {
    setFormData(prev => ({
      ...prev,
      coverageNeeded: prev.coverageNeeded.includes(coverageValue)
        ? prev.coverageNeeded.filter(c => c !== coverageValue)
        : [...prev.coverageNeeded, coverageValue]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show success popup with confetti
    setShowSuccessPopup(true);
    setTriggerConfetti(true);
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      industry: '',
      coverageNeeded: [],
      phone: '',
      email: '',
      dotNumber: ''
    });
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    setTriggerConfetti(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCoverageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close popup on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showSuccessPopup) {
        closeSuccessPopup();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showSuccessPopup]);

  return (
    <>
      {/* Background Video/Image */}
     <section id="hero-section" className="relative min-h-screen overflow-hidden">
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
                filter: 'brightness(0.4)',
                minWidth: '100%',
                minHeight: '100%',
                width: 'auto',
                height: 'auto'
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

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              
              {/* Left Side: Hero Content */}
              <div className="space-y-8">
                {/* Flipped: Tagline First (Bigger) */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight" style={{ color: '#ffffffff', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
                  Commercial insurance that moves as fast as you do.
                </h1>
                {/* #ffaa85 */}
                {/* Company Name Second (Smaller, Orange) */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold" style={{ color: '#ff6b35', textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)' }}>
                  Moxie Risk Partners
                </h2>
                
                {/* Updated Description (removed "instant") - Fixed apostrophe */}
<p className="text-lg md:text-xl text-white leading-relaxed max-w-2xl" style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)' }}>
  Specialized commercial insurance for trucking, construction, manufacturing, nonprofit, and public entities with DOT compliance support and 24/7 claims advocacy. 
  <strong style={{ color: '#ffaa85' }}> Fast quotes and expedited service</strong> - we protect what builds America.
</p>
                
                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleGetQuote}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md text-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    suppressHydrationWarning
                  >
                    Get Quote Now
                  </button>
                  <button 
                    onClick={handleCallExpert}
                    className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-md text-lg font-medium transition-colors duration-200"
                    suppressHydrationWarning
                  >
                    Call Expert
                  </button>
                </div>
                
                {/* Trust Bar - Updated to 48 States */}
                <div className="flex flex-wrap gap-8 pt-6 pb-6 px-6 mt-8 border-t border-white/20 justify-center rounded-lg" style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold" style={{ color: '#ffaa85', textShadow: '0 0 8px rgba(255, 170, 133, 0.4)' }}>24/7</div>
                    <div className="text-white/90 text-sm font-medium">Claims Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold" style={{ color: '#ffaa85', textShadow: '0 0 8px rgba(255, 170, 133, 0.4)' }}>48</div>
                    <div className="text-white/90 text-sm font-medium">States</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold" style={{ color: '#ffaa85', textShadow: '0 0 8px rgba(255, 170, 133, 0.4)' }}>100%</div>
                    <div className="text-white/90 text-sm font-medium">Compliant</div>
                  </div>
                </div>
              </div>

              {/* Right Side: Enhanced Quote Form - Hidden on Mobile */}
              <div className="hidden lg:block lg:max-w-md xl:max-w-lg">
                <div className="rounded-2xl p-8 shadow-2xl" style={{
                  background: 'linear-gradient(135deg, rgba(30, 30, 35, 0.95) 0%, rgba(45, 45, 50, 0.92) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 170, 133, 0.15)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 170, 133, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
                }}>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>Get Your Quote</h3>
                    <p className="text-white/80">Quick & easy commercial insurance quote</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          First Name <span className="text-red-400">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900 placeholder-gray-500"
                          placeholder="John"
                          required
                          suppressHydrationWarning
                        />
                      </div>
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Last Name <span className="text-red-400">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900 placeholder-gray-500"
                          placeholder="Doe"
                          required
                          suppressHydrationWarning
                        />
                      </div>
                    </div>

                    {/* Industry Selection */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Industry <span className="text-red-400">*</span>
                      </label>
                      <select 
                        value={formData.industry}
                        onChange={(e) => handleIndustryChange(e.target.value)}
                        className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900"
                        required
                        suppressHydrationWarning
                      >
                        <option value="" className="text-gray-500">Select your industry</option>
                        {industryOptions.map((option) => (
                          <option key={option.value} value={option.value} className="text-gray-900">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Coverage Dropdown */}
                    {formData.industry && (
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Coverage Needed <span className="text-gray-400">(Select all that apply)</span>
                        </label>
                        <div className="relative" ref={dropdownRef}>
                          <button
                            type="button"
                            onClick={() => setIsCoverageDropdownOpen(!isCoverageDropdownOpen)}
                            className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-left flex justify-between items-center text-gray-900"
                          >
                            <span className="text-gray-700">
                              {formData.coverageNeeded.length === 0 
                                ? 'Select coverage types...'
                                : formData.coverageNeeded.length === 1
                                ? coverageOptions.find(opt => opt.value === formData.coverageNeeded[0])?.label
                                : `${formData.coverageNeeded.length} coverage types selected`
                              }
                            </span>
                            <svg 
                              className={`w-5 h-5 transition-transform text-gray-600 ${isCoverageDropdownOpen ? 'rotate-180' : ''}`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          {isCoverageDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                              {coverageOptions.map((option) => (
                                <label 
                                  key={option.value} 
                                  className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                >
                                  <input
                                    type="checkbox"
                                    checked={formData.coverageNeeded.includes(option.value)}
                                    onChange={() => handleCoverageToggle(option.value)}
                                    className="mr-3 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                                  />
                                  <span className="text-gray-900 text-sm font-medium">{option.label}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* DOT Number for Trucking */}
                    {formData.industry === 'trucking' && (
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          US DOT # <span className="text-red-400">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={formData.dotNumber || ''}
                          onChange={(e) => handleInputChange('dotNumber', e.target.value)}
                          className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900 placeholder-gray-500"
                          placeholder="Enter your USDOT number"
                          required
                          suppressHydrationWarning
                        />
                        <p className="text-gray-400 text-xs mt-1">Required for trucking & transportation businesses</p>
                      </div>
                    )}

                    {/* Contact Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Phone <span className="text-red-400">*</span>
                        </label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900 placeholder-gray-500"
                          placeholder="(555) 123-4567"
                          required
                          suppressHydrationWarning
                        />
                      </div>
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900 placeholder-gray-500"
                          placeholder="your@email.com"
                          required
                          suppressHydrationWarning
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg text-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      suppressHydrationWarning
                    >
                      Get My Quote
                    </button>

                    {/* Trust Elements */}
                    <div className="text-center pt-4 border-t border-white/20">
                      <div className="flex items-center justify-center gap-2 text-white/80 text-sm mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        100% Secure & Confidential
                      </div>
                      <p className="text-white/60 text-xs">
                        By submitting, you agree to receive quotes from licensed agents. No spam, unsubscribe anytime.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal with Confetti */}
      <SuccessModal 
        isOpen={showSuccessPopup}
        onClose={closeSuccessPopup}
        showConfetti={triggerConfetti}
      />
    </>
  );
};

export default Hero;