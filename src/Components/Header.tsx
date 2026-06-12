

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link'; 

const Header = () => {
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileIndustriesOpen, setIsMobileIndustriesOpen] = useState(false);
  const industriesDropdownRef = useRef<HTMLDivElement>(null);
  const industriesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear any existing timeout
  const clearDropdownTimeout = (timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Set dropdown to close after delay
  const setDropdownTimeout = (timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>, setOpen: (value: boolean) => void) => {
    clearDropdownTimeout(timeoutRef);
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 500);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (industriesDropdownRef.current && !industriesDropdownRef.current.contains(event.target as Node)) {
        setIsIndustriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearDropdownTimeout(industriesTimeoutRef);
    };
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
    if (window.location.pathname === '/') {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.location.href = '/';
    }
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
      { name: 'Coverage', href: '/coverage-options' }, 
    { name: 'Claims', href: '/file-claims' },
    { name: 'Contact', href: '/contact-us' },
    // { name: 'About', href: '/about-us' }
  ];
  
  // NowCerts portal URL with your agency ID
  const portalUrl = "https://www7.nowcerts.com/Login.aspx?AgencyId=9f838b40-7a33-4852-a129-7375ca8d7936&ShowAgencyLogo=true";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={handleLogoClick}
              aria-label="Go to homepage"
              suppressHydrationWarning={true}
            >
              <img 
                src="/images/logo.png" 
                alt="Company Logo" 
                className="h-14 w-auto sm:h-16"
              />
            </button>
          </div>

          {/* Desktop Navigation - CENTERED */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8">
              {/* Industries Dropdown */}
              <div 
                className="relative" 
                ref={industriesDropdownRef}
                onMouseEnter={() => {
                  clearDropdownTimeout(industriesTimeoutRef);
                  setIsIndustriesOpen(true);
                }}
                onMouseLeave={() => setDropdownTimeout(industriesTimeoutRef, setIsIndustriesOpen)}
              >
                <button
                  onClick={() => setIsIndustriesOpen(!isIndustriesOpen)}
                  className="flex items-center text-gray-700 hover:text-[#B8893D] px-2 py-2 text-lg font-medium transition-colors duration-200"
                  aria-expanded={isIndustriesOpen}
                  suppressHydrationWarning={true}
                >
                  Industries
      
                </button>

                {isIndustriesOpen && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-10"
                    onMouseEnter={() => clearDropdownTimeout(industriesTimeoutRef)}
                    onMouseLeave={() => setDropdownTimeout(industriesTimeoutRef, setIsIndustriesOpen)}
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

              {/* Navigation Items - Coverage is now a regular link */}
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-700 hover:text-[#B8893D] px-3 py-2 text-lg font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Client Portal Link - Opens in new tab */}
              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#B8893D] px-3 py-2 text-lg font-medium transition-colors duration-200"
              >
                Client Portal
              </a>
            </div>
          </nav>

          {/* Get Quote Button */}
          <div className="hidden md:flex">
            <Link 
              href="/quote-form"
              className="bg-[#B8893D] hover:bg-[#B8893D] text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm whitespace-nowrap"
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
                  className="flex items-center justify-between w-full text-left text-gray-700 hover:text-[#B8893D] hover:bg-gray-50 px-3 py-2 text-lg font-semibold rounded-md transition-colors duration-200"
                  suppressHydrationWarning={true}
                >
                  Industries
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isMobileIndustriesOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

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

              {/* Mobile Navigation Items - Coverage is now a regular link */}
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block text-gray-700 hover:text-[#B8893D] hover:bg-gray-50 px-3 py-2 text-lg font-semibold rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Client Portal Link - Opens in new tab */}
              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-700 hover:text-[#B8893D] hover:bg-gray-50 px-3 py-2 text-lg font-semibold rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Client Portal
              </a>

              {/* Mobile Get Quote Button */}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <Link 
                  href="/quote-form"
                  className="block w-full bg-[#B8893D] hover:bg-[#B8893D] text-white px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 shadow-sm text-center"
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