"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { ChevronDown, Phone, Mail, MapPin } from 'lucide-react';

interface FooterLink {
  href: string;
  label: string;
  ariaLabel?: string;
  isExternal?: boolean;
}

interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [isMounted, setIsMounted] = useState(false);
  
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  // Handle client-side mounting
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const footerSections = useMemo<FooterSection[]>(() => [
{
  id: 'industries',
  title: 'Industries',
  links: [
    { href: '/trucking-transportation', label: 'Trucking & Transportation', ariaLabel: 'Trucking industry insurance solutions' },
    { href: '/construction', label: 'Construction', ariaLabel: 'Construction industry insurance' },
    { href: '/manufacturing-insurance', label: 'Manufacturing', ariaLabel: 'Manufacturing industry coverage' },
    { href: '/public-entity', label: 'Public Entity', ariaLabel: 'Public entity insurance solutions' },
    { href: '/non-profit', label: 'Non-Profit Human Service', ariaLabel: 'Non-profit organization insurance' },
  ]
},
    // {
    //   id: 'coverage',
    //   title: 'Coverage',
    //   links: [
    //     { href: '/workers-comp', label: 'Workers\' Compensation', ariaLabel: 'Workers compensation insurance' },
    //     { href: '/general-liability', label: 'General Liability', ariaLabel: 'General liability insurance coverage' },
    //     { href: '/commercial-auto', label: 'Commercial Auto', ariaLabel: 'Commercial auto insurance solutions' },
    //     { href: '/cyber-liability', label: 'Cyber Liability', ariaLabel: 'Cyber liability protection' },
    //     { href: '/commercial-property', label: 'Commercial Property', ariaLabel: 'Commercial property insurance' },
    //   ]
    // },
{
  id: 'support',
  title: 'Support',
  links: [
    { href: '/file-claims', label: 'File a Claim', ariaLabel: 'File an insurance claim' },
    { href: '/file-claims#support', label: '24/7 Claims Support', ariaLabel: '24/7 claims assistance' },
    { href: 'tel:+18006694301', label: 'Emergency Claims Line', ariaLabel: 'Call emergency claims line', isExternal: true },
    { href: '/faq-page', label: 'FAQ', ariaLabel: 'Frequently asked questions' },
    { href: '/contact#resources', label: 'Resources', ariaLabel: 'Insurance resources and guides' },
  ]
},
    {
      id: 'company',
      title: 'Company',
      links: [
        { href: '/about-us', label: 'About Us', ariaLabel: 'Learn about Moxie Risk Partners' },
        { href: '/about-us#mission', label: 'Our Mission', ariaLabel: 'Our company mission and values' },
        { href: '/about-us#team', label: 'Our Team', ariaLabel: 'Meet our insurance experts' },
        // { href: '/careers', label: 'Careers', ariaLabel: 'Career opportunities' },
        // { href: '/news', label: 'News & Updates', ariaLabel: 'Company news and industry updates' },
      ]
    }
  ], []);

  const toggleSection = useCallback((sectionId: string) => {
    setOpenSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  }, []);

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    
    // Handle external links (tel:, mailto:, http:, https:)
    if (href?.startsWith('tel:') || href?.startsWith('mailto:') || 
        href?.startsWith('http:') || href?.startsWith('https:')) {
      return; // Let browser handle these
    }

    // Handle hash links
    if (href?.includes('#')) {
      e.preventDefault();
      const [path, hash] = href.split('#');
      const currentPath = window.location.pathname;
      
      if (path === currentPath || path === '') {
        // Same page - scroll to section
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        // Different page - navigate then scroll
        window.location.href = href;
      }
    }
  }, []);

  return (
     <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Company Info Section */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo and Company Name */}
            <div className="flex items-center space-x-4">
              <img 
                src="/images/logoWhite.webp" 
                alt="Moxie Risk Partners Logo" 
                className="h-16 w-auto"
                loading="lazy"
              />
              <div>
                <h3 className="text-xl font-bold text-white">Moxie Risk Partners</h3>
                <p className="text-orange-300 text-sm font-medium">Insurance that moves as fast as you do.</p>
              </div>
            </div>

            {/* Mission Statement */}
            <p className="text-gray-200 leading-relaxed">
              Specialized commercial insurance solutions that protect the businesses, 
              organizations, and entities that build America.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <a 
                  href="tel:+18006694301" 
                  className="text-gray-200 hover:text-orange-400 transition-colors"
                  aria-label="Call us at (800) 669-4301"
                >
                  (800) 669-4301
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <a 
                  href="mailto:info@moxieriskpartners.com" 
                  className="text-gray-200 hover:text-orange-400 transition-colors"
                  aria-label="Email us at info@moxieriskpartners.com"
                >
                  info@moxieriskpartners.com
                </a>
              </div>
            </div>

            {/* Trust Elements */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>A-Rated Carriers</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center md:justify-items-start md:ml-12">
              {footerSections.map((section) => (
                <div key={section.id} className="space-y-4 text-center md:text-left">
                  
                  {/* Desktop Section Title */}
                  <h4 className="hidden md:block text-lg font-semibold text-white border-b border-orange-500 pb-2">
                    {section.title}
                  </h4>

                  {/* Mobile Collapsible Section */}
                  <div className="md:hidden">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center justify-between w-full text-lg font-semibold text-white py-2 border-b border-gray-600"
                      aria-expanded={openSections.has(section.id)}
                      aria-controls={`footer-section-${section.id}`}
                    >
                      {section.title}
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform ${
                          openSections.has(section.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Links */}
                  <div 
                    id={`footer-section-${section.id}`}
                    className={`space-y-2 ${
                      openSections.has(section.id) || (isMounted && window.innerWidth >= 768) ? 'block' : 'hidden'
                    } md:block`}
                  >
                    {section.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="block text-gray-200 hover:text-orange-400 transition-colors py-1 text-sm"
                        aria-label={link.ariaLabel || link.label}
                        onClick={handleLinkClick}
                        {...(link.isExternal && {
                          target: link.href.startsWith('http') ? '_blank' : undefined,
                          rel: link.href.startsWith('http') ? 'noopener noreferrer' : undefined
                        })}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
   </div>
        {/* CTA Section */}
        <div className="mt-12 pt-8 border-t border-gray-600">
       
          </div>
        </div>


      {/* Bottom Footer */}
      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-gray-300 text-sm text-center md:text-left">
              © {currentYear} Moxie Risk Partners. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6 text-sm">
              <a 
                href="/privacy" 
                className="text-gray-300 hover:text-orange-400 transition-colors"
                onClick={handleLinkClick}
              >
                Privacy Policy
              </a>
              <a 
                href="/terms" 
                className="text-gray-300 hover:text-orange-400 transition-colors"
                onClick={handleLinkClick}
              >
                Terms & Conditions
              </a>
              <a 
                href="/accessibility" 
                className="text-gray-300 hover:text-orange-400 transition-colors"
                onClick={handleLinkClick}
              >
                Accessibility
              </a>
            </div>

            {/* License Info */}
            <div className="text-gray-400 text-xs text-center md:text-right">
              Licensed Insurance Agency
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);