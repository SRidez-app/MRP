"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Region {
  id: string;
  name: string;
  states: string[];
  coordinates: { x: number; y: number };
}

interface ContactPopupProps {
  region: Region | null;
  state?: string | null;
  onClose: () => void;
}

// CORRECTED REGIONS based on your specifications
const REGIONS: Region[] = [
  {
    id: 'northeast',
    name: 'Northeast',
    states: ['ME', 'NH', 'VT', 'MA', 'RI', 'CT', 'NY', 'NJ', 'PA'],
    coordinates: { x: 85, y: 25 }
  },
  {
    id: 'southeast',
    name: 'Southeast', 
    states: ['FL', 'GA', 'SC', 'NC', 'VA', 'WV', 'KY', 'TN', 'AL', 'MS', 'AR', 'LA'],
    coordinates: { x: 75, y: 55 }
  },
  {
    id: 'midwest',
    name: 'Midwest',
    states: ['OH', 'IN', 'IL', 'MI', 'WI', 'MN', 'IA', 'MO', 'ND', 'SD', 'NE', 'KS'],
    coordinates: { x: 58, y: 35 }
  },
  {
    id: 'west',
    name: 'West',
    states: ['CO', 'WY', 'MT', 'ID', 'UT', 'NV', 'WA', 'OR'],
    coordinates: { x: 30, y: 35 }
  }
];

// CORRECTED State coordinates and names
const STATE_COORDINATES: { [key: string]: { x: number; y: number; name: string } } = {
  // Northeast
  'ME': { x: 92, y: 12, name: 'Maine' },
  'NH': { x: 88, y: 18, name: 'New Hampshire' },
  'VT': { x: 85, y: 18, name: 'Vermont' },
  'MA': { x: 90, y: 23, name: 'Massachusetts' },
  'RI': { x: 91, y: 26, name: 'Rhode Island' },
  'CT': { x: 88, y: 28, name: 'Connecticut' },
  'NY': { x: 82, y: 22, name: 'New York' },
  'NJ': { x: 87, y: 32, name: 'New Jersey' },
  'PA': { x: 83, y: 30, name: 'Pennsylvania' },
  
  // Southeast
  'FL': { x: 82, y: 75, name: 'Florida' },
  'GA': { x: 78, y: 60, name: 'Georgia' },
  'SC': { x: 80, y: 54, name: 'South Carolina' },
  'NC': { x: 82, y: 48, name: 'North Carolina' },
  'VA': { x: 82, y: 40, name: 'Virginia' },
  'WV': { x: 78, y: 36, name: 'West Virginia' },
  'KY': { x: 76, y: 42, name: 'Kentucky' },
  'TN': { x: 74, y: 48, name: 'Tennessee' },
  'AL': { x: 73, y: 60, name: 'Alabama' },
  'MS': { x: 68, y: 58, name: 'Mississippi' },
  'AR': { x: 66, y: 55, name: 'Arkansas' },
  'LA': { x: 66, y: 66, name: 'Louisiana' },
  
  // Midwest
  'OH': { x: 78, y: 35, name: 'Ohio' },
  'IN': { x: 73, y: 38, name: 'Indiana' },
  'IL': { x: 68, y: 42, name: 'Illinois' },
  'MI': { x: 76, y: 28, name: 'Michigan' },
  'WI': { x: 69, y: 25, name: 'Wisconsin' },
  'MN': { x: 64, y: 22, name: 'Minnesota' },
  'IA': { x: 63, y: 38, name: 'Iowa' },
  'MO': { x: 66, y: 45, name: 'Missouri' },
  'ND': { x: 56, y: 18, name: 'North Dakota' },
  'SD': { x: 56, y: 28, name: 'South Dakota' },
  'NE': { x: 58, y: 38, name: 'Nebraska' },
  'KS': { x: 58, y: 50, name: 'Kansas' },
  
  // West
  'CO': { x: 50, y: 42, name: 'Colorado' },
  'WY': { x: 49, y: 32, name: 'Wyoming' },
  'MT': { x: 48, y: 20, name: 'Montana' },
  'ID': { x: 40, y: 25, name: 'Idaho' },
  'UT': { x: 43, y: 45, name: 'Utah' },
  'NV': { x: 36, y: 42, name: 'Nevada' },
  'WA': { x: 33, y: 10, name: 'Washington' },
  'OR': { x: 32, y: 22, name: 'Oregon' },
  
};

const ContactPopup: React.FC<ContactPopupProps> = ({ region, state, onClose }) => {
  const displayName = state ? STATE_COORDINATES[state]?.name : region?.name;
  const isRegion = !!region && !state;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-fade-in-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl transition-colors"
        >
          ×
        </button>
        
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {displayName} Coverage Available
          </h3>
          
          <p className="text-gray-600 mb-6">
            {isRegion 
              ? `We provide comprehensive commercial insurance across all ${region.states.length} states in the ${region.name} region.`
              : `We provide full commercial insurance coverage in ${displayName}.`
            }
          </p>
          
          <div className="space-y-3">
            <button 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              onClick={() => {
                console.log(`Contact rep for ${displayName}`);
                onClose();
              }}
            >
              Contact Regional Rep
            </button>
            
            <button 
              className="w-full border-2 border-gray-300 hover:border-orange-500 text-gray-700 hover:text-orange-600 py-3 px-6 rounded-lg font-semibold transition-colors"
              onClick={() => {
                console.log(`Get quote for ${displayName}`);
                onClose();
              }}
            >
              Get Quick Quote
            </button>
          </div>
          
          {isRegion && (
            <div className="mt-6 text-left">
              <p className="text-sm text-gray-700 font-medium mb-2">States in {region.name}:</p>
              <div className="flex flex-wrap gap-2">
                {region.states.map((stateCode) => (
                  <span 
                    key={stateCode}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                  >
                    {STATE_COORDINATES[stateCode]?.name || stateCode}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ServiceAreas: React.FC = () => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleRegionHover = (regionId: string | null) => {
    setHoveredRegion(regionId);
  };

  const handleRegionClick = (regionId: string) => {
    const region = REGIONS.find(r => r.id === regionId);
    if (region) {
      setSelectedRegion(region);
      setSelectedState(null);
      setShowContactPopup(true);
    }
  };

  const closeContactPopup = () => {
    setShowContactPopup(false);
    setSelectedRegion(null);
    setSelectedState(null);
  };

  // Calculate total states (should be 45: 48 total minus CA, AK, plus HI = 46, but excluding TX, OK, AZ, NM based on your regions = 42 + HI + 2 missing = need to verify)
  const totalStates = REGIONS.reduce((total, region) => total + region.states.length, 0);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Coverage Across {totalStates} States
          </h2>
          <p className="text-xl text-gray-600">
            Serving {totalStates} states with specialized regional expertise and local support. 
            Hover over location pins to see coverage details and contact options.
          </p>
        </div>

        {/* Interactive Map Section */}
        <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'} delay-200`}>
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-orange-500">
            
            {/* Map Container - Added overflow visible and extra padding for popups */}
            <div className="relative w-full max-w-4xl mx-auto overflow-visible" style={{ paddingTop: '120px' }}>
              {/* Map Image - Wrapped in container with negative margin to offset padding */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden" style={{ marginTop: '-120px' }}>
                <Image
                  src="/images/map.png"
                  alt="United States Coverage Map"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Region Hover Areas */}
                {REGIONS.map((region) => (
                  <div
                    key={region.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${region.coordinates.x - 8}%`,
                      top: `${region.coordinates.y - 8}%`,
                      width: '16%',
                      height: '16%',
                    }}
                    onMouseEnter={() => handleRegionHover(region.id)}
                    onMouseLeave={() => handleRegionHover(null)}
                    onClick={() => handleRegionClick(region.id)}
                  >
                    {/* Invisible hover area */}
                    <div className="w-full h-full" />
                    
                    {/* Region highlight overlay */}
                    {hoveredRegion === region.id && (
                      <div 
                        className="absolute inset-0 bg-orange-500/20 border-2 border-orange-500 rounded-lg animate-pulse"
                        style={{
                          boxShadow: '0 0 20px rgba(255, 107, 53, 0.4)'
                        }}
                      />
                    )}
                  </div>
                ))}

                {/* Regional Location Pins and Labels */}
                {REGIONS.map((region) => (
                  <div
                    key={`pin-${region.id}`}
                    className="absolute"
                    style={{
                      left: `${region.coordinates.x}%`,
                      top: `${region.coordinates.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Location Pin */}
                    <div
                      className="cursor-pointer group relative z-10"
                      onMouseEnter={() => handleRegionHover(region.id)}
                      onMouseLeave={() => handleRegionHover(null)}
                      onClick={() => handleRegionClick(region.id)}
                    >
                      {/* Pin Icon */}
                      <div className={`flex items-center justify-center transition-all duration-200 ${
                        hoveredRegion === region.id ? 'scale-110' : ''
                      }`}>
                        <svg 
                          className={`w-8 h-8 transition-colors duration-200 ${
                            hoveredRegion === region.id ? 'text-orange-600' : 'text-orange-500'
                          }`} 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>

                      {/* Hover Popup with States and Actions */}
                      {hoveredRegion === region.id && (
                        <div className={`absolute bottom-full mb-3 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 ${
                          region.id === 'northeast' 
                            ? 'right-0' 
                            : region.id === 'west'
                            ? 'left-0'
                            : 'left-1/2 transform -translate-x-1/2'
                        }`}>
                          {/* Arrow */}
                          <div className={`absolute top-full border-8 border-transparent border-t-white ${
                            region.id === 'northeast' 
                              ? 'right-4' 
                              : region.id === 'west'
                              ? 'left-4'
                              : 'left-1/2 transform -translate-x-1/2'
                          }`} />
                          <div className={`absolute top-full mt-px border-7 border-transparent border-t-gray-200 ${
                            region.id === 'northeast' 
                              ? 'right-4' 
                              : region.id === 'west'
                              ? 'left-4'
                              : 'left-1/2 transform -translate-x-1/2'
                          }`} />
                          
                          {/* Content */}
                          <div className="text-center">
                            <h4 className="font-bold text-lg text-gray-900 mb-2">{region.name} Region</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Coverage across {region.states.length} states
                            </p>
                            
                            {/* States Grid */}
                            <div className="flex flex-wrap gap-1 mb-4 justify-center">
                              {region.states.map((stateCode) => (
                                <span 
                                  key={stateCode}
                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                                >
                                  {STATE_COORDINATES[stateCode]?.name || stateCode}
                                </span>
                              ))}
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="space-y-2">
                              <button 
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log(`Contact rep for ${region.name}`);
                                  handleRegionClick(region.id);
                                }}
                              >
                                Contact Regional Rep
                              </button>
                              
                              <button 
                                className="w-full border border-gray-300 hover:border-orange-500 text-gray-700 hover:text-orange-600 py-2 px-4 rounded-lg text-sm font-semibold transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log(`Get quote for ${region.name}`);
                                  handleRegionClick(region.id);
                                }}
                              >
                                Get Quick Quote
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Region Label */}
                    <div
                      className="mt-12 pointer-events-none"
                    >
                      <div 
                        className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 ${
                          hoveredRegion === region.id
                            ? 'bg-orange-500 text-white shadow-lg scale-110'
                            : 'bg-white/90 text-gray-700 shadow-md'
                        }`}
                      >
                        {region.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <div className="mt-6 text-center space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Hover</span> over location pins to see coverage details and contact options
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Click</span> any region card below to get started
                </p>
              </div>
            </div>

            {/* Coverage Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-200">
              {[
                { label: 'States Covered', value: totalStates.toString(), desc: 'Nationwide presence' },
                { label: 'Regional Offices', value: '4', desc: 'Strategic locations' },
                { label: 'Local Reps', value: '25+', desc: 'Expert specialists' },
                { label: 'Response Time', value: '<2hrs', desc: 'Average callback' }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{stat.value}</div>
                  <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Expertise Cards */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} delay-400`}>
          {REGIONS.map((region) => (
            <div 
              key={region.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onMouseEnter={() => handleRegionHover(region.id)}
              onMouseLeave={() => handleRegionHover(null)}
              onClick={() => handleRegionClick(region.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{region.name}</h3>
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
              
              <p className="text-gray-600 mb-4">
                Specialized coverage across {region.states.length} states with dedicated regional expertise.
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {region.states.slice(0, 4).map((state) => (
                  <span key={state} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {STATE_COORDINATES[state]?.name || state}
                  </span>
                ))}
                {region.states.length > 4 && (
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                    +{region.states.length - 4} more
                  </span>
                )}
              </div>
              
              <button 
                className="w-full text-orange-600 hover:text-orange-700 font-semibold text-sm"
                suppressHydrationWarning
              >
                Contact Regional Team 
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Popup */}
      {showContactPopup && (
        <ContactPopup
          region={selectedRegion}
          state={selectedState}
          onClose={closeContactPopup}
        />
      )}

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

export default React.memo(ServiceAreas);