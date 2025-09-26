"use client";

import React, { useState, useEffect } from 'react';

interface State {
  code: string;
  name: string;
  region: string;
}

// All supported states (no CA, AK, HI)
const SUPPORTED_STATES: State[] = [
  { code: 'AL', name: 'Alabama', region: 'Southeast' },
  { code: 'AZ', name: 'Arizona', region: 'Southwest' },
  { code: 'AR', name: 'Arkansas', region: 'Southeast' },
  { code: 'CO', name: 'Colorado', region: 'West' },
  { code: 'CT', name: 'Connecticut', region: 'Northeast' },
  { code: 'DE', name: 'Delaware', region: 'Northeast' },
  { code: 'FL', name: 'Florida', region: 'Southeast' },
  { code: 'GA', name: 'Georgia', region: 'Southeast' },
  { code: 'ID', name: 'Idaho', region: 'West' },
  { code: 'IL', name: 'Illinois', region: 'Midwest' },
  { code: 'IN', name: 'Indiana', region: 'Midwest' },
  { code: 'IA', name: 'Iowa', region: 'Midwest' },
  { code: 'KS', name: 'Kansas', region: 'Midwest' },
  { code: 'KY', name: 'Kentucky', region: 'Southeast' },
  { code: 'LA', name: 'Louisiana', region: 'Southeast' },
  { code: 'ME', name: 'Maine', region: 'Northeast' },
  { code: 'MD', name: 'Maryland', region: 'Northeast' },
  { code: 'MA', name: 'Massachusetts', region: 'Northeast' },
  { code: 'MI', name: 'Michigan', region: 'Midwest' },
  { code: 'MN', name: 'Minnesota', region: 'Midwest' },
  { code: 'MS', name: 'Mississippi', region: 'Southeast' },
  { code: 'MO', name: 'Missouri', region: 'Midwest' },
  { code: 'MT', name: 'Montana', region: 'West' },
  { code: 'NE', name: 'Nebraska', region: 'Midwest' },
  { code: 'NV', name: 'Nevada', region: 'West' },
  { code: 'NH', name: 'New Hampshire', region: 'Northeast' },
  { code: 'NJ', name: 'New Jersey', region: 'Northeast' },
  { code: 'NM', name: 'New Mexico', region: 'Southwest' },
  { code: 'NY', name: 'New York', region: 'Northeast' },
  { code: 'NC', name: 'North Carolina', region: 'Southeast' },
  { code: 'ND', name: 'North Dakota', region: 'Midwest' },
  { code: 'OH', name: 'Ohio', region: 'Midwest' },
  { code: 'OK', name: 'Oklahoma', region: 'Southwest' },
  { code: 'OR', name: 'Oregon', region: 'West' },
  { code: 'PA', name: 'Pennsylvania', region: 'Northeast' },
  { code: 'RI', name: 'Rhode Island', region: 'Northeast' },
  { code: 'SC', name: 'South Carolina', region: 'Southeast' },
  { code: 'SD', name: 'South Dakota', region: 'Midwest' },
  { code: 'TN', name: 'Tennessee', region: 'Southeast' },
  { code: 'TX', name: 'Texas', region: 'Southwest' },
  { code: 'UT', name: 'Utah', region: 'West' },
  { code: 'VT', name: 'Vermont', region: 'Northeast' },
  { code: 'VA', name: 'Virginia', region: 'Southeast' },
  { code: 'WA', name: 'Washington', region: 'West' },
  { code: 'WV', name: 'West Virginia', region: 'Southeast' },
  { code: 'WI', name: 'Wisconsin', region: 'Midwest' },
  { code: 'WY', name: 'Wyoming', region: 'West' }
];

// Group states by region
const REGIONS = {
  'Northeast': SUPPORTED_STATES.filter(s => s.region === 'Northeast'),
  'Southeast': SUPPORTED_STATES.filter(s => s.region === 'Southeast'),
  'Midwest': SUPPORTED_STATES.filter(s => s.region === 'Midwest'),
  'West': SUPPORTED_STATES.filter(s => s.region === 'West'),
  'Southwest': SUPPORTED_STATES.filter(s => s.region === 'Southwest')
};

const ServiceAreas: React.FC = () => {
  const [zipCode, setZipCode] = useState('');
  const [foundState, setFoundState] = useState<State | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    setIsMounted(true);
  }, []);

  // Array of popup images
  const popupImages = [
    '/images/popup.png',
    '/images/popup2.png', 
    '/images/popup3.png'
  ];

  // Simple zip code to state lookup (simplified - in production you'd use a real API)
  const zipToState = (zip: string): State | null => {
    const zipNum = parseInt(zip);
    
    // Simplified zip code ranges (this would be more comprehensive in production)
    const zipRanges: { [key: string]: [number, number][] } = {
      'AL': [[35000, 36999]],
      'AZ': [[85000, 86999]],
      'AR': [[71600, 72999]],
      'CO': [[80000, 81999]],
      'CT': [[6000, 6999]],
      'DE': [[19700, 19999]],
      'FL': [[32000, 34999]],
      'GA': [[30000, 31999], [39800, 39999]],
      'ID': [[83200, 83999]],
      'IL': [[60000, 62999]],
      'IN': [[46000, 47999]],
      'IA': [[50000, 52999]],
      'KS': [[66000, 67999]],
      'KY': [[40000, 42999]],
      'LA': [[70000, 71599]],
      'ME': [[3900, 4999]],
      'MD': [[20600, 21999]],
      'MA': [[1000, 2799]],
      'MI': [[48000, 49999]],
      'MN': [[55000, 56799]],
      'MS': [[38600, 39799]],
      'MO': [[63000, 65999]],
      'MT': [[59000, 59999]],
      'NE': [[68000, 69999]],
      'NV': [[89000, 89999]],
      'NH': [[3000, 3899]],
      'NJ': [[7000, 8999]],
      'NM': [[87000, 88999]],
      'NY': [[10000, 14999]],
      'NC': [[27000, 28999]],
      'ND': [[58000, 58999]],
      'OH': [[43000, 45999]],
      'OK': [[73000, 74999]],
      'OR': [[97000, 97999]],
      'PA': [[15000, 19699]],
      'RI': [[2800, 2999]],
      'SC': [[29000, 29999]],
      'SD': [[57000, 57999]],
      'TN': [[37000, 38599]],
      'TX': [[75000, 79999], [73301, 73399], [77000, 77999]],
      'UT': [[84000, 84999]],
      'VT': [[5000, 5999]],
      'VA': [[20100, 20199], [22000, 24699]],
      'WA': [[98000, 99499]],
      'WV': [[24700, 26999]],
      'WI': [[53000, 54999]],
      'WY': [[82000, 83199]]
    };

    for (const [stateCode, ranges] of Object.entries(zipRanges)) {
      for (const [min, max] of ranges) {
        if (zipNum >= min && zipNum <= max) {
          return SUPPORTED_STATES.find(s => s.code === stateCode) || null;
        }
      }
    }
    
    return null;
  };

  const handleZipSearch = async () => {
    if (!zipCode || zipCode.length !== 5) {
      setError('Please enter a valid 5-digit zip code');
      return;
    }

    setIsLoading(true);
    setError('');
    setSearchPerformed(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const state = zipToState(zipCode);

    if (state) {
      setFoundState(state);
      setError('');
    } else {
      setFoundState(null);
      setError('Sorry, we don&apos;t currently provide coverage in this area. Contact us to discuss options.');
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleZipSearch();
    }
  };

  const handleStateClick = (state: State) => {
    setSelectedState(state);
    setIsModalOpen(true);
    // Cycle through images (0, 1, 2, then back to 0)
    setImageIndex(prev => (prev + 1) % 3);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedState(null);
  };

  const filteredStates = selectedRegion === 'all' 
    ? SUPPORTED_STATES 
    : SUPPORTED_STATES.filter(state => state.region === selectedRegion);

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Mobile optimized */}
        <div className={`text-center max-w-4xl mx-auto mb-12 sm:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Find the Coverage You Need
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 px-2">
            Enter your zip code to discover available commercial insurance options in your area
          </p>
          
          {/* Mobile-friendly Zip Code Search */}
          <div className="max-w-md mx-auto px-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter your zip code"
                  value={zipCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                    setZipCode(value);
                    setError('');
                    if (value === '') {
                      setSearchPerformed(false);
                      setFoundState(null);
                    }
                  }}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-4 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-lg text-gray-900 placeholder-gray-500"
                  maxLength={5}
                  suppressHydrationWarning
                />
              </div>
              <button
                onClick={handleZipSearch}
                disabled={isLoading || zipCode.length !== 5}
                className="w-full sm:w-auto px-6 py-4 sm:py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors text-lg"
                suppressHydrationWarning
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  'Search'
                )}
              </button>
            </div>
            
            {/* Mobile-optimized Results */}
            {searchPerformed && (
              <div className="mt-6 p-4 sm:p-6 bg-white rounded-xl shadow-lg border-l-4 border-orange-500">
                {foundState ? (
                  <div className="text-center">
                    <div className="text-green-600 text-2xl mb-2">✓</div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      Great news! We serve {foundState.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                      Full commercial insurance coverage available in the {foundState.region} region
                    </p>
                    <div className="flex flex-col gap-3 justify-center">
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base">
                        Get Quote Now
                      </button>
                      <button className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base">
                        Contact Local Rep
                      </button>
                    </div>
                  </div>
                ) : error && (
                  <div className="text-center">
                    <div className="text-amber-600 text-2xl mb-2">⚠</div>
                    <p className="text-sm sm:text-base text-gray-700 mb-4">{error}</p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base">
                      Contact Us Anyway
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* States Grid Section - Mobile optimized */}
        <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'} delay-200`}>
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 border-t-4 border-orange-500">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Commercial Insurance Available Nationwide
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2">
                We proudly serve businesses across {SUPPORTED_STATES.length} states with specialized regional expertise
              </p>
              
              {/* Mobile-friendly Region Filter */}
              <div className="mb-6 sm:mb-8">
                {/* Mobile: Dropdown select */}
                <div className="sm:hidden">
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900 bg-white"
                    suppressHydrationWarning
                  >
                    <option value="all">All States ({SUPPORTED_STATES.length})</option>
                    {Object.entries(REGIONS).map(([region, states]) => (
                      <option key={region} value={region}>
                        {region} ({states.length})
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Desktop: Button tabs (unchanged) */}
                <div className="hidden sm:flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setSelectedRegion('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedRegion === 'all'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    suppressHydrationWarning
                  >
                    All States ({SUPPORTED_STATES.length})
                  </button>
                  {Object.entries(REGIONS).map(([region, states]) => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedRegion === region
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      suppressHydrationWarning
                    >
                      {region} ({states.length})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile-optimized States Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3">
              {filteredStates.map((state, index) => (
                <div
                  key={state.code}
                  onClick={() => handleStateClick(state)}
                  className="group bg-gray-50 hover:bg-orange-50 border hover:border-orange-200 rounded-lg p-2 sm:p-3 text-center transition-all duration-200 cursor-pointer transform hover:-translate-y-1 hover:shadow-md"
                  style={{ animationDelay: `${index * 20}ms` }}
                >
                  <div className="text-sm sm:text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {state.code}
                  </div>
                  <div className="text-xs text-gray-600 group-hover:text-orange-500 transition-colors mt-1 leading-tight">
                    {state.name}
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-orange-400 transition-colors hidden sm:block">
                    {state.region}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

       {/* Mobile-optimized CTA Section */}
        <div className={`text-center mt-12 sm:mt-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} delay-400`}>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Don't see your state? Let's talk anyway.
            </h3>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 text-orange-100 px-2">
              Our coverage is expanding rapidly. Contact us to discuss your commercial insurance needs.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
              <a 
                 href="tel:+18003265581"
                className="bg-white text-orange-600 hover:bg-gray-100 px-6 sm:px-8 py-3 rounded-lg font-bold transition-colors text-sm sm:text-base"
              >
                Call (800) 326-5581
              </a>
            <a 
  href="/contact-us"
  className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-6 sm:px-8 py-3 rounded-lg font-bold transition-colors text-sm sm:text-base"
>
  Contact Us Today
</a>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Modal - Works for both Mobile and Desktop */}
      {isModalOpen && selectedState && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full mx-2 sm:mx-4 overflow-hidden shadow-2xl transform transition-all animate-modal-appear max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all shadow-lg"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Responsive Layout: Vertical on mobile, Horizontal on desktop */}
            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="h-48 sm:h-64 md:w-2/5 md:h-auto relative">
                <img 
                  src={popupImages[imageIndex]}
                  alt={`Commercial insurance in ${selectedState.name}`}
                  className="w-full h-full object-cover"
                />
                {/* State Badge Overlay */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                  <div className="bg-orange-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-lg">
                    <span className="font-bold text-sm sm:text-lg">{selectedState.code}</span>
                  </div>
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-6 md:w-3/5 md:p-10 flex flex-col justify-center">
                {/* Header */}
                <div className="mb-4 sm:mb-6">
                  <div className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 bg-orange-100 text-orange-700 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {selectedState.region} Region
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                    Get Started in {selectedState.name}
                  </h3>
                  
                  <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
                    Professional commercial insurance coverage with specialized expertise for businesses in {selectedState.name}.
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  <div className="flex items-start">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 mr-2 sm:mr-3 flex-shrink-0">
                      <svg className="w-2 h-2 sm:w-3 sm:h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800 text-sm sm:text-base">Comprehensive Coverage</span>
                      <p className="text-gray-600 text-xs sm:text-sm">Full commercial insurance solutions tailored to your industry</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 mr-2 sm:mr-3 flex-shrink-0">
                      <svg className="w-2 h-2 sm:w-3 sm:h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800 text-sm sm:text-base">Local {selectedState.region} Expertise</span>
                      <p className="text-gray-600 text-xs sm:text-sm">Regional specialists who understand your market</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 mr-2 sm:mr-3 flex-shrink-0">
                      <svg className="w-2 h-2 sm:w-3 sm:h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800 text-sm sm:text-base">Fast Quote Response</span>
                      <p className="text-gray-600 text-xs sm:text-sm">Quick turnaround on quotes and policy questions</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 sm:px-6 rounded-lg font-bold transition-colors flex items-center justify-center shadow-lg hover:shadow-xl text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Get Quote Now
                  </button>
                  <button className="flex-1 border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white py-3 px-4 sm:px-6 rounded-lg font-bold transition-colors flex items-center justify-center text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Expert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default React.memo(ServiceAreas);