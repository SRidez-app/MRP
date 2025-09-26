"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link'; 

const Header = () => {
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileIndustriesOpen, setIsMobileIndustriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsIndustriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsMobileIndustriesOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle logo click to scroll to hero section
  const handleLogoClick = () => {
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      // Scroll to hero section
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home page
      window.location.href = '/';
    }
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    setIsMobileIndustriesOpen(false);
  };

  const industries = [
    { name: 'Trucking & Transportation', href: '/trucking-transportation' },
    { name: 'Construction', href: '/construction-insurance' }, 
    { name: 'Manufacturing', href: '/manufacturing-insurance' },
    { name: 'Public Entity', href: '/public-entity' },
    { name: 'Non-Profit Human Service', href: '/non-profit' }
  ];

  const navItems = [
   { name: "Workers' Comp", href: '/workers-comp' },
    { name: 'Claims', href: '/file-claims' },
    { name: 'Contact', href: '/contact-us' },
    { name: 'About', href: '/about-us' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - BIGGER & Touchable */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={handleLogoClick}
              aria-label="Go to homepage"
              suppressHydrationWarning={true}
            >
              <img 
                src="/logo.png" 
                alt="Company Logo" 
                className="h-14 w-auto sm:h-16"
              />
            </button>
          </div>

          {/* Desktop Navigation - CENTERED */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8">
              {/* Industries Dropdown with HOVER */}
              <div 
                className="relative" 
                ref={dropdownRef}
                onMouseEnter={() => setIsIndustriesOpen(true)}
                onMouseLeave={() => {
                  setTimeout(() => setIsIndustriesOpen(false), 150);
                }}
              >
                <button
                  onClick={() => setIsIndustriesOpen(!isIndustriesOpen)}
                  className="flex items-center text-gray-700 hover:text-orange-500 px-2 py-2 text-lg font-medium transition-colors duration-200"
                  aria-expanded={isIndustriesOpen}
                  suppressHydrationWarning={true}
                >
                  Industries
                  <ChevronDown 
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      isIndustriesOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Dropdown Menu with HOVER */}
                {isIndustriesOpen && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-10"
                    onMouseEnter={() => setIsIndustriesOpen(true)}
                    onMouseLeave={() => {
                      setTimeout(() => setIsIndustriesOpen(false), 150);
                    }}
                  >
                    {industries.map((industry, index) => (
                      <Link
                        key={index}
                        href={industry.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                        onClick={() => setIsIndustriesOpen(false)}
                      >
                        {industry.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation Items */}
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-700 hover:text-orange-500 px-3 py-2 text-lg font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Get Quote Button - RIGHT SIDE (Changed to Orange) */}
          <div className="hidden md:flex">
            <Link 
              href="/quote-form"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
            suppressHydrationWarning={true}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {/* Mobile Industries Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileIndustriesOpen(!isMobileIndustriesOpen)}
                  className="flex items-center justify-between w-full text-left text-gray-700 hover:text-orange-500 hover:bg-gray-50 px-3 py-2 text-lg font-semibold rounded-md transition-colors duration-200"
                  suppressHydrationWarning={true}
                >
                  Industries
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isMobileIndustriesOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Mobile Industries Submenu */}
                {isMobileIndustriesOpen && (
                  <div className="mt-1 space-y-1 pl-4">
                    {industries.map((industry, index) => (
                      <Link
                        key={index}
                        href={industry.href}
                        className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 text-sm rounded-md transition-colors duration-150"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileIndustriesOpen(false);
                        }}
                      >
                        {industry.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Navigation Items */}
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block text-gray-700 hover:text-orange-500 hover:bg-gray-50 px-3 py-2 text-lg font-semibold rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Get Quote Button (Changed to Orange) */}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <Link 
                  href="/quote"
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 shadow-sm text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;