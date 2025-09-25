"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Clock, Users, Star, Phone, Mail, MapPin } from 'lucide-react';

interface CoverageData {
  type: string;
  typeCode: string;
  title: string;
  description: string;
  commonLoads: string[];
  risksCovered: string[];
  whoNeedsIt: string[];
  coverageAmount: string;
  specialFeatures: string[];
  image: string;
}

const TruckingTransportationPage = () => {
  const [selectedType, setSelectedType] = useState('dry-van');
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    dotNumber: '',
    fleetSize: ''
  });

  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const coverageTypes: CoverageData[] = [
    {
      type: 'Dry Van',
      typeCode: 'dry-van',
      title: 'Dry Van Cargo Insurance',
      description: 'Comprehensive motor truck cargo protection for general freight haulers. Covers packaged goods, retail freight, and non-perishable cargo during loading, transit, and unloading operations.',
      commonLoads: ['Packaged goods', 'Retail freight', 'Non-perishable items', 'General freight', 'Consumer products'],
      risksCovered: ['Theft protection', 'Collision damage', 'Load shift damage', 'Fire coverage', 'Vandalism'],
      whoNeedsIt: ['General freight haulers', 'Contract carriers', 'Distribution companies', 'Amazon contractors', 'FTL carriers'],
      coverageAmount: '$100,000 - $250,000',
      specialFeatures: ['UIIA endorsement available', 'Broad form coverage', 'Specific shipper options', 'Intermodal container coverage'],
      image: '/images/dryvan.png'
    },
    {
      type: 'Flatbed',
      typeCode: 'flatbed',
      title: 'Flatbed Cargo Insurance',
      description: 'Heavy-duty cargo insurance for flatbed operations. Covers lumber, steel, machinery, and construction materials with specialized protection for load securement and weather-related damages.',
      commonLoads: ['Steel products', 'Lumber', 'Heavy machinery', 'Construction materials', 'Industrial equipment'],
      risksCovered: ['Load securement failure', 'Weather damage', 'Shifting load damage', 'Theft protection', 'Transit accidents'],
      whoNeedsIt: ['Flatbed operators', 'Construction logistics', 'Steel haulers', 'Equipment transporters', 'Building material carriers'],
      coverageAmount: '$100,000 - $250,000',
      specialFeatures: ['Rollover deductible structure', 'Tarped load coverage', 'Oversized load endorsements', 'Weather protection'],
      image: '/images/flatbed.png'
    },
    {
      type: 'Refrigerated',
      typeCode: 'refrigerated',
      title: 'Reefer Cargo Insurance',
      description: 'Specialized temperature-controlled cargo insurance for cold chain logistics. Protects perishable freight including produce, pharmaceuticals, dairy, and frozen goods against temperature fluctuations and spoilage.',
      commonLoads: ['Fresh produce', 'Pharmaceuticals', 'Dairy products', 'Frozen foods', 'Medical supplies'],
      risksCovered: ['Reefer breakdown coverage', 'Spoilage protection', 'Temperature fluctuation', 'Mechanical failure', 'Power outage damage'],
      whoNeedsIt: ['Food transporters', 'Cold chain logistics', 'Pharmaceutical haulers', 'Grocery distributors', 'Medical transport'],
      coverageAmount: '$100,000 - $250,000',
      specialFeatures: ['Reefer mechanical coverage', 'Spoilage protection', 'Temperature monitoring', 'Delayed delivery coverage'],
      image: '/images/refrigerated.png'
    },
    {
      type: 'Hazmat',
      typeCode: 'hazmat',
      title: 'Hazmat Cargo Insurance',
      description: 'High-limit hazardous materials cargo insurance for DOT-compliant carriers. Covers chemicals, fuels, and dangerous goods with pollution liability and environmental damage protection.',
      commonLoads: ['Industrial chemicals', 'Petroleum products', 'Corrosive materials', 'Flammable liquids', 'Hazardous waste'],
      risksCovered: ['Spill coverage', 'Explosion protection', 'Fire damage', 'Environmental liability', 'Cleanup costs'],
      whoNeedsIt: ['Hazmat carriers', 'Chemical distributors', 'Fuel transporters', 'Industrial waste haulers', 'Tanker operators'],
      coverageAmount: '$1,000,000 - $5,000,000',
      specialFeatures: ['Pollution liability coverage', 'Environmental cleanup', 'DOT compliance support', 'Emergency response'],
      image: '/images/hazmat.png'
    },
    {
      type: 'Auto Hauler',
      typeCode: 'auto-hauler',
      title: 'Auto Transport Insurance',
      description: 'Specialized vehicle transport cargo insurance for car carriers. Protects new and used vehicles, specialty autos, and salvage cars during loading, transport, and delivery operations.',
      commonLoads: ['New vehicles', 'Used cars', 'Specialty vehicles', 'Salvage automobiles', 'Exotic cars'],
      risksCovered: ['Load shift damage', 'Road debris damage', 'Vehicle theft', 'Loading/unloading damage', 'Weather damage'],
      whoNeedsIt: ['Auto transport companies', 'Dealership transporters', 'Auction haulers', 'Enclosed car carriers', 'RV transporters'],
      coverageAmount: '$100,000 - $1,000,000',
      specialFeatures: ['Open & enclosed coverage', 'High-value vehicle options', 'Loading coverage', 'Multi-vehicle protection'],
      image: '/images/autoHauler.png'
    },
    {
      type: 'Dump Truck',
      typeCode: 'dump-truck',
      title: 'Dump Truck Cargo Insurance',
      description: 'Heavy-duty insurance for aggregate and construction material haulers. Covers sand, gravel, asphalt, and demolition debris with protection for spillage and environmental contamination.',
      commonLoads: ['Sand & gravel', 'Asphalt', 'Dirt & soil', 'Demolition debris', 'Road salt'],
      risksCovered: ['Load spillage', 'Tip-over coverage', 'Environmental contamination', 'Equipment damage', 'Material theft'],
      whoNeedsIt: ['Aggregate haulers', 'Construction contractors', 'Road maintenance', 'Demolition companies', 'Mining operations'],
      coverageAmount: '$50,000 - $250,000',
      specialFeatures: ['Multi-dump type coverage', 'Off-road operations', 'Environmental protection', 'Construction site coverage'],
      image: '/images/dumptruck.png'
    }
  ];

  const selectedCoverage = coverageTypes.find(coverage => coverage.typeCode === selectedType) || coverageTypes[0];

  const handleFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleTypeSelection = (typeCode: string) => {
    setSelectedType(typeCode);
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section - Side by Side Layout */}
      <section ref={heroRef} className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Hero Image */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/truckhero.png" 
                  alt="Commercial trucking fleet on highway"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                    Commercial Truck
                    <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                      Cargo Insurance
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                    Comprehensive motor truck cargo protection for all freight types and trailer configurations. 
                    Competitive rates, expert guidance, and nationwide coverage for owner-operators and fleets.
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {[
                    'All Trailer Types',
                    'Nationwide Coverage', 
                   
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                      <span className="text-lg font-medium text-gray-800">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group">
                    Get Your Quote
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  
                  <a href="tel:+18006694301" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center">
                    Call (800) 669-4301
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cargo Coverage Selector Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header - Left Aligned */}
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Choose Your Specialized Cargo Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Each trailer type and freight category has unique risks and requirements. 
              Select your specific cargo type below to explore tailored coverage options and industry-specific endorsements.
            </p>
            {/* Underline bar */}
            <div className="w-96 h-2 bg-gray-900 rounded-full"></div>
          </div>

          {/* Cargo Type Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {coverageTypes.map((coverage) => (
              <button
                key={coverage.typeCode}
                onClick={() => handleTypeSelection(coverage.typeCode)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  selectedType === coverage.typeCode
                    ? 'border-orange-600 bg-orange-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-white hover:border-orange-300'
                }`}
              >
                <div className="text-center">
                  <div className="mb-4 mx-auto w-20 h-16 flex items-center justify-center">
                    <img
                      src={coverage.image}
                      alt={coverage.type}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className={`text-sm font-bold transition-colors ${
                    selectedType === coverage.typeCode ? 'text-orange-600' : 'text-gray-800'
                  }`}>
                    {coverage.type}
                  </h3>
                </div>
                
                {/* Selected Indicator */}
                {selectedType === coverage.typeCode && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Coverage Details Panel */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-12">
            
            {/* Coverage Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-8 pb-6 border-b-2 border-orange-100">
              <div className="mb-4 lg:mb-0">
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {selectedCoverage.title}
                </h3>
                <div className="inline-block bg-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                  Coverage: {selectedCoverage.coverageAmount}
                </div>
              </div>
            </div>

            {/* Coverage Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-4xl">
              {selectedCoverage.description}
            </p>

            {/* Coverage Details Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              
              {/* Common Loads */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-orange-200">
                  Common Loads Covered
                </h4>
                <div className="space-y-2">
                  {selectedCoverage.commonLoads.map((load, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{load}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks Covered */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-orange-200">
                  Risks Covered
                </h4>
                <div className="space-y-2">
                  {selectedCoverage.risksCovered.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who Needs It */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-orange-200">
                  Who Needs This Coverage
                </h4>
                <div className="space-y-2">
                  {selectedCoverage.whoNeedsIt.map((who, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{who}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Features */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-orange-200">
                  Special Features
                </h4>
                <div className="space-y-2">
                  {selectedCoverage.specialFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <Star className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0 fill-current" />
                      <span className="text-gray-800 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Footer with Quote Form */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - CTA Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Ready to Protect Your
                  <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                    Trucking Business?
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Join thousands of trucking professionals who trust Moxie Risk Partners. 
                  Get your quote today and experience specialized cargo insurance expertise.
                </p>
              </div>

            
                    {/* Contact Information Grid */}
                          <div className="grid md:grid-cols-1 gap-6">
                        
                            {/* Phone */}
                            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <Phone className="w-6 h-6 text-white" />
                              </div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-1">Call Us Now</h4>
                              <a href="tel:+18006694301" className="text-lg font-bold text-green-600 hover:text-green-700 transition-colors">
                                (800) 669-4301
                              </a>
                              <p className="text-xs text-gray-500 mt-1">24/7 Available</p>
                            </div>
            
                            {/* Email */}
                            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <Mail className="w-6 h-6 text-white" />
                              </div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-1">Email Us</h4>
                              <a href="mailto:quotes@mrpinsurance.com" className="text-lg font-bold text-purple-600 hover:text-purple-700 transition-colors break-all">
                                quotes@mrpinsurance.com
                              </a>
                              <p className="text-xs text-gray-500 mt-1">Quick Response</p>
                            </div>
            
                        
                          </div>
                    
            

              {/* Trust Elements */}
              <div className="flex flex-wrap justify-start items-center gap-4 pt-6 border-t border-gray-200">
           
              </div>
            </div>

            {/* Right Side - Quote Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Free Quote</h3>
                <p className="text-gray-600">Fast, competitive trucking insurance quotes</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                    placeholder="Your Company Name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  />
                </div>

                {/* Contact Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                    placeholder="Your Full Name"
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                  />
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                      placeholder="email@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                {/* DOT Number and Fleet Size Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      US DOT # *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                      placeholder="DOT Number"
                      value={formData.dotNumber}
                      onChange={(e) => setFormData({...formData, dotNumber: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fleet Size *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900"
                      value={formData.fleetSize}
                      onChange={(e) => setFormData({...formData, fleetSize: e.target.value})}
                    >
                      <option value="" className="text-gray-500">Select Size</option>
                      <option value="1" className="text-gray-900">1 Vehicle</option>
                      <option value="2-5" className="text-gray-900">2-5 Vehicles</option>
                      <option value="6-25" className="text-gray-900">6-25 Vehicles</option>
                      <option value="26+" className="text-gray-900">26+ Vehicles</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group mt-6"
                >
                  Get My Quote Now
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Trust Elements */}
                <div className="text-center mt-4 space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>100% Secure & Confidential</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    No spam, unsubscribe anytime. Licensed agents only.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TruckingTransportationPage;