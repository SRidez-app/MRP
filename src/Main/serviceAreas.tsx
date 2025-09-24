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

  useEffect(() => {
    setIsVisible(true);
    setIsMounted(true);
  }, []);

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

  const filteredStates = selectedRegion === 'all' 
    ? SUPPORTED_STATES 
    : SUPPORTED_STATES.filter(state => state.region === selectedRegion);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center max-w-4xl mx-auto mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find the Coverage You Need
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Enter your zip code to discover available commercial insurance options in your area
          </p>
          
          {/* Zip Code Search */}
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter your zip code"
                  value={zipCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                    setZipCode(value);
                    setError('');
                    // Clear search results when input is cleared
                    if (value === '') {
                      setSearchPerformed(false);
                      setFoundState(null);
                    }
                  }}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-lg text-gray-900 placeholder-gray-500"
                  maxLength={5}
                  suppressHydrationWarning
                />
              </div>
              <button
                onClick={handleZipSearch}
                disabled={isLoading || zipCode.length !== 5}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
                suppressHydrationWarning
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Search'
                )}
              </button>
            </div>
            
            {/* Results */}
            {searchPerformed && (
              <div className="mt-6 p-6 bg-white rounded-xl shadow-lg border-l-4 border-orange-500">
                {foundState ? (
                  <div className="text-center">
                    <div className="text-green-600 text-2xl mb-2">✓</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Great news! We serve {foundState.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Full commercial insurance coverage available in the {foundState.region} region
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                        Get Quote Now
                      </button>
                      <button className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-2 rounded-lg font-semibold transition-colors">
                        Contact Local Rep
                      </button>
                    </div>
                  </div>
                ) : error && (
                  <div className="text-center">
                    <div className="text-amber-600 text-2xl mb-2">⚠</div>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                      Contact Us Anyway
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* States Grid Section */}
        <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'} delay-200`}>
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-orange-500">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Commercial Insurance Available Nationwide
              </h3>
              <p className="text-gray-600 mb-6">
                We proudly serve businesses across {SUPPORTED_STATES.length} states with specialized regional expertise
              </p>
              
              {/* Region Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
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

            {/* States Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {filteredStates.map((state, index) => (
                <div
                  key={state.code}
                  className="group bg-gray-50 hover:bg-orange-50 border hover:border-orange-200 rounded-lg p-3 text-center transition-all duration-200 cursor-pointer transform hover:-translate-y-1 hover:shadow-md"
                  style={{ animationDelay: `${index * 20}ms` }}
                >
                  <div className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {state.code}
                  </div>
                  <div className="text-xs text-gray-600 group-hover:text-orange-500 transition-colors mt-1">
                    {state.name}
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-orange-400 transition-colors">
                    {state.region}
                  </div>
                </div>
              ))}
            </div>

         
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} delay-400`}>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Don't see your state? Let's talk anyway.
            </h3>
            <p className="text-lg mb-6 text-orange-100">
              Our coverage is expanding rapidly. Contact us to discuss your commercial insurance needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-colors"
                suppressHydrationWarning
              >
                Call (800) 669-4301
              </button>
              <button 
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 rounded-lg font-bold transition-colors"
                suppressHydrationWarning
              >
                Email Us Today
              </button>
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