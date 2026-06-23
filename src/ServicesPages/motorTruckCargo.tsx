"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Phone, Mail, Truck, Package, AlertTriangle, Thermometer, Lock, FileText, Star } from 'lucide-react';
import Link from 'next/link';
import { motorTruckCargoFields } from '@/config/industryFormConfigs';
import dynamic from 'next/dynamic'; // Add this import

// Add dynamic import with ssr disabled
const IndustryQuoteForm = dynamic(
  () => import('@/Components/IndustryQuoteForm'),
  { ssr: false }
);


interface CargoBenefit {
  icon: React.ElementType;
  title: string;
  description: string;
  stat: string;
}

interface CoverageType {
  title: string;
  description: string;
  features: string[];
  isIncluded: boolean;
}

interface CargoType {
  name: string;
  description: string;
  riskLevel: 'standard' | 'specialized' | 'high-risk';
}

interface CoverageDetail {
  title: string;
  description: string;
  limit: string;
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

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

const MotorTruckCargo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('dry-van');
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      question: "Is cargo insurance required for truckers?",
      answer: "While not federally required, most shippers and brokers require truckers to carry cargo insurance to protect their freight. It's essential for securing contracts and protecting your business.",
      isOpen: false
    },
    {
      question: "What's the difference between cargo insurance and freight insurance?",
      answer: "Motor truck cargo insurance and freight insurance refer to the same coverage - protection for goods being transported. The terms are used interchangeably in the trucking industry.",
      isOpen: false
    },
    {
      question: "How much cargo insurance coverage do I need?",
      answer: "Coverage limits typically range from $5,000 to $250,000 depending on the value of freight you haul. Many shippers require minimum limits of $100,000 to $250,000.",
      isOpen: false
    },
    {
      question: "Does cargo insurance cover refrigerated freight?",
      answer: "Standard cargo insurance may have limited coverage for refrigerated goods. Refrigeration breakdown coverage is available as an optional enhancement for temperature-sensitive cargo.",
      isOpen: false
    },
    {
      question: "What happens if cargo is damaged during loading?",
      answer: "Motor truck cargo insurance typically covers damage that occurs during loading and unloading operations, as well as while goods are in transit between pickup and delivery.",
      isOpen: false
    }
  ]);


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

  // Dynamic Cargo Coverage Data
  const coverageDataTypes: CoverageData[] = [
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
      risksCovered: ['Reefer breakdown coverage', 'Spoilage protection', 'Temperature fluctuation'],
      whoNeedsIt: ['Food transporters', 'Cold chain logistics', 'Pharmaceutical haulers', 'Grocery distributors', 'Medical transport'],
      coverageAmount: '$100,000 - $250,000',
      specialFeatures: ['Mechanical breakdown coverage', 'Driver error coverage', 'Spoilage protection', 'Temperature monitoring', 'Delayed delivery coverage'],
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

  const selectedCoverage = coverageDataTypes.find(coverage => coverage.typeCode === selectedType) || coverageDataTypes[0];

  const handleTypeSelection = (typeCode: string) => {
    setSelectedType(typeCode);
  };

  const cargoBenefits: CargoBenefit[] = [
    {
      icon: Shield,
      title: "Broad Form Protection",
      description: "Comprehensive coverage that protects against a wider range of risks than standard cargo policies.",
      stat: "Maximum coverage"
    },
    {
      icon: Truck,
      title: "Transit Coverage",
      description: "Protection during loading, transportation, unloading, and temporary storage at terminals.",
      stat: "End-to-end protection"
    },
    {
      icon: Thermometer,
      title: "Refrigeration Breakdown",
      description: "Specialized coverage for temperature-controlled cargo and refrigeration equipment failure.",
      stat: "Perishable goods"
    },
    {
      icon: Lock,
      title: "Theft & Security",
      description: "Coverage for theft, mysterious disappearance, and cargo security incidents during transit.",
      stat: "Security protection"
    }
  ];

  const coverageTypes: CoverageType[] = [
    {
      title: "Fire and Collision",
      description: "Primary coverage for cargo damage due to vehicle accidents, fires, and collision-related incidents.",
      features: [
        "Vehicle accident damage",
        "Fire and explosion coverage",
        "Rollover incident protection",
        "Multi-vehicle collision coverage"
      ],
      isIncluded: true
    },
    {
      title: "Theft and Pilferage",
      description: "Protection against cargo theft, mysterious disappearance, and employee dishonesty.",
      features: [
        "Cargo theft coverage",
        "Mysterious disappearance",
        "Employee dishonesty protection",
        "Pilferage and partial loss"
      ],
      isIncluded: true
    },
    {
      title: "Weather and Natural Disasters",
      description: "Coverage for cargo damage caused by weather events and natural disasters.",
      features: [
        "Hail and wind damage",
        "Flood and water damage",
        "Lightning strike coverage",
        "Natural disaster protection"
      ],
      isIncluded: true
    },
    {
      title: "Loading and Unloading",
      description: "Protection during cargo handling operations at pickup and delivery locations.",
      features: [
        "Loading dock accidents",
        "Crane and forklift damage",
        "Improper handling coverage",
        "Terminal storage protection"
      ],
      isIncluded: true
    },
    {
      title: "Refrigeration Breakdown",
      description: "Specialized coverage for temperature-sensitive cargo when refrigeration equipment fails.",
      features: [
        "Equipment failure coverage",
        "Spoilage protection",
        "Temperature deviation losses",
        "Maintenance failure coverage"
      ],
      isIncluded: false
    },
    {
      title: "General Average and Salvage",
      description: "Coverage for proportional losses and salvage expenses in multi-party cargo situations.",
      features: [
        "General average contributions",
        "Salvage expense coverage",
        "Sue and labor costs",
        "Loss mitigation expenses"
      ],
      isIncluded: false
    }
  ];

  const cargoTypes: CargoType[] = [
    { name: "General Freight", description: "Standard manufactured goods and consumer products", riskLevel: "standard" },
    { name: "Electronics", description: "Consumer electronics, computers, and technology equipment", riskLevel: "specialized" },
    { name: "Food & Beverage", description: "Packaged food products, beverages, and consumer goods", riskLevel: "standard" },
    { name: "Refrigerated Goods", description: "Perishable food items and temperature-controlled products", riskLevel: "specialized" },
    { name: "Automotive Parts", description: "Vehicle components, tires, and automotive accessories", riskLevel: "standard" },
    { name: "Construction Materials", description: "Building supplies, lumber, and construction equipment", riskLevel: "standard" },
    { name: "High-Value Goods", description: "Valuable merchandise requiring enhanced security", riskLevel: "high-risk" },
    { name: "Hazardous Materials", description: "Chemicals and regulated dangerous goods", riskLevel: "high-risk" }
  ];

  const coverageDetails: CoverageDetail[] = [
    {
      title: "Debris Removal",
      description: "Coverage for cleanup and removal of damaged cargo and debris after an incident.",
      limit: "Up to $10,000"
    },
    {
      title: "Earned Freight Charges",
      description: "Protection against loss of freight charges for undelivered loads due to covered incidents.",
      limit: "Up to $10,000"
    },
    {
      title: "Pollution Cleanup",
      description: "Environmental cleanup costs for cargo-related pollution or hazardous material spills.",
      limit: "Up to $10,000"
    },
    {
      title: "Sue and Labor",
      description: "Legal expenses and costs to prevent further loss to damaged cargo.",
      limit: "Included"
    },
    {
      title: "Reloading Expenses",
      description: "Costs to transfer undamaged cargo to another vehicle after an incident.",
      limit: "Up to $5,000"
    },
    {
      title: "General Average",
      description: "Proportional contributions for shared losses in multi-party cargo situations.",
      limit: "Included"
    }
  ];

  const toggleFAQ = (index: number) => {
    setFaqItems(prev => prev.map((item, idx) => ({
      ...item,
      isOpen: idx === index ? !item.isOpen : false
    })));
  };

  

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section ref={heroRef} className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/cargoHero.png" 
                  alt="Motor truck cargo insurance for freight protection"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>

            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                    Motor Truck Cargo
                    <span className="block text-transparent bg-gradient-to-r from-[#CC9F54] to-[#B8893D] bg-clip-text">
                      Insurance Solutions
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                    Comprehensive freight protection from loading dock to delivery. Protect the cargo you haul with broad form coverage up to $250,000.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    'Broad Form Coverage',
                    '$250K Max Coverage',
                    '24/7 Claims Support'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#CC9F54] flex-shrink-0" />
                      <span className="text-lg font-medium text-gray-800">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
             <Link 
  href="/quote-form"
  className="bg-gradient-to-r from-[#CC9F54] to-[#B8893D] hover:from-[#B8893D] hover:to-[#A87A32] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group"
>
  Get Your Quote
</Link>
                  
                  <a href="tel:+15155817187" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center">
                    Call (515) 581-7187
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Why Motor Truck Cargo Insurance is Essential
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Truckers assume enormous financial responsibility for the property they haul. Cargo insurance provides crucial protection against the unique risks of transporting freight.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cargoBenefits.map((benefit) => {
              const IconComponent = benefit.icon;
              return (
                <div key={benefit.title} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#CC9F54] to-[#B8893D] rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {benefit.description}
                  </p>
                  <div className="inline-block bg-[#FBF5EB] text-[#CC9F54] px-4 py-2 rounded-full font-bold text-sm">
                    {benefit.stat}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cargo Coverage Selector Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Choose Your Specialized Cargo Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Each trailer type and freight category has unique risks and requirements. 
              Select your specific cargo type below to explore tailored coverage options and industry-specific endorsements.
            </p>
          </div>

          {/* Cargo Type Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {coverageDataTypes.map((coverage) => (
              <button
                key={coverage.typeCode}
                onClick={() => handleTypeSelection(coverage.typeCode)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  selectedType === coverage.typeCode
                    ? 'border-[#CC9F54] bg-[#FBF5EB] shadow-lg scale-105'
                    : 'border-gray-200 bg-white hover:border-[#D9BC82]'
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
                    selectedType === coverage.typeCode ? 'text-[#CC9F54]' : 'text-gray-800'
                  }`}>
                    {coverage.type}
                  </h3>
                </div>
                
                {/* Selected Indicator */}
                {selectedType === coverage.typeCode && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#CC9F54] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Coverage Details Panel */}
          <div className="bg-gray-50 rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-12">
            
            {/* Coverage Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-8 pb-6 border-b-2 border-[#E5CFA5]">
              <div className="mb-4 lg:mb-0">
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {selectedCoverage.title}
                </h3>
                <div className="inline-block bg-[#CC9F54] text-white px-4 py-2 rounded-full font-bold text-sm">
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
                <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-[#E5CFA5]">
                  Common Loads Covered
                </h4>
                <div className="space-y-2">
                  {selectedCoverage.commonLoads.map((load, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-white rounded-lg border border-gray-100">
                      <CheckCircle className="w-4 h-4 text-[#CC9F54] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{load}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks Covered */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-[#E5CFA5]">
                  Risks Covered
                </h4>
                <div className="space-y-2">
                  {selectedCoverage.risksCovered.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-white rounded-lg border border-gray-100">
                      <CheckCircle className="w-4 h-4 text-[#CC9F54] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who Needs It */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-[#E5CFA5]">
                  Who Needs This Coverage
                </h4>
                <div className="space-y-2">
                  {selectedCoverage.whoNeedsIt.map((who, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-white rounded-lg border border-gray-100">
                      <CheckCircle className="w-4 h-4 text-[#CC9F54] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{who}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Features */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-[#E5CFA5]">
                  Special Features
                </h4>
                <div className="space-y-2">
                  {selectedCoverage.specialFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-[#FBF5EB] rounded-lg border border-[#E5CFA5]">
                      <Star className="w-4 h-4 text-[#CC9F54] mt-0.5 flex-shrink-0 fill-current" />
                      <span className="text-gray-800 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Coverage Options
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Our broad form cargo insurance provides comprehensive protection against the full spectrum of transit risks your freight faces.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coverageTypes.map((coverage) => (
              <div 
                key={coverage.title} 
                className={`rounded-xl p-6 border-2 ${
                  coverage.isIncluded 
                    ? 'bg-[#FBF5EB] border-[#E5CFA5]' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {coverage.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    coverage.isIncluded 
                      ? 'bg-[#CC9F54] text-white' 
                      : 'bg-gray-600 text-white'
                  }`}>
                    {coverage.isIncluded ? 'Included' : 'Optional'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {coverage.description}
                </p>
                <ul className="space-y-2">
                  {coverage.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-[#CC9F54] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cargo Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Coverage for All Types of Freight
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              We provide specialized coverage options tailored to different cargo types and risk levels in the trucking industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cargoTypes.map((cargoType) => (
              <div 
                key={cargoType.name} 
                className={`bg-white rounded-xl p-6 border-2 hover:shadow-lg transition-all duration-300 ${
                  cargoType.riskLevel === 'high-risk' ? 'border-red-200' :
                  cargoType.riskLevel === 'specialized' ? 'border-[#E5CFA5]' :
                  'border-gray-200'
                }`}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {cargoType.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {cargoType.description}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  cargoType.riskLevel === 'high-risk' ? 'bg-red-100 text-red-700' :
                  cargoType.riskLevel === 'specialized' ? 'bg-[#FBF5EB] text-[#A87A32]' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {cargoType.riskLevel.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Details */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              What's Included in Motor Truck Cargo Insurance?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Our comprehensive cargo policies include essential coverages and services that many other insurers exclude or charge extra for.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coverageDetails.map((detail) => (
              <div key={detail.title} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {detail.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {detail.description}
                </p>
                <div className="inline-block bg-[#CC9F54] text-white px-4 py-2 rounded-full font-bold text-sm">
                  {detail.limit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Motor Truck Cargo Insurance FAQs
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Common questions about motor truck cargo insurance coverage, requirements, and claims
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                <button
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={faq.isOpen}
                  suppressHydrationWarning
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <div className={`w-6 h-6 flex-shrink-0 transform transition-transform duration-200 ${faq.isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {faq.isOpen && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with Form */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Protect Your Freight with
                  <span className="block text-transparent bg-gradient-to-r from-[#CC9F54] to-[#B8893D] bg-clip-text">
                    Cargo Insurance
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Don't let cargo losses destroy your trucking business. Get comprehensive motor truck cargo insurance coverage that protects your liability from loading dock to final delivery.
                </p>
              </div>

              <div className="grid md:grid-cols-1 gap-6">
                
                <div className="text-center p-6 bg-gray-100 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Call Us Now</h4>
                  <a href="tel:+15155817187" className="text-lg font-bold text-gray-900 hover:text-[#CC9F54] transition-colors">
                    (515) 581-7187
                  </a>
                  <p className="text-xs text-gray-500 mt-1">24/7 Available</p>
                </div>

                <div className="text-center p-6 bg-gray-100 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 bg-[#CC9F54] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Email Us</h4>
                  <a href="mailto:quotes@moxieriskpartners.com" className="text-lg font-bold text-gray-900 hover:text-[#CC9F54] transition-colors break-all">
                    quotes@moxieriskpartners.com
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Quick Response</p>
                </div>
              </div>
            </div>

           
             
       
            <div>
  <IndustryQuoteForm 
    industry="motor-truck-cargo"
    formName="Motor Truck Cargo Quote"
    title="Get Your Free Quote"
    subtitle="Fast, competitive cargo insurance quotes"
    fields={motorTruckCargoFields}
  />
</div>
          </div>
        </div>
      </section>

   
    </div>
  );
};

export default MotorTruckCargo;