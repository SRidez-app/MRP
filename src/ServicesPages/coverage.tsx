"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Phone, Mail, X } from 'lucide-react';
import SuccessModal from '../Components/successModal';
import Link from 'next/link';



interface CoverageType {
  id: string;
  title: string;
  description: string;
  detailedOverview: string;
  coverageAmount: string;
  keyFeatures: string[];
  whoNeedsIt: string[];
}

const CoveragePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCoverage, setSelectedCoverage] = useState<CoverageType | null>(null);

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    coverageType: [] as string[], // Changed to array for multiple selections
    industry: '' // Changed from industryType to industry
  });
  
  const [isCoverageDropdownOpen, setIsCoverageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef(null);
  const formRef = useRef<HTMLDivElement>(null);

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedCoverage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCoverage]);

  
  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.companyName || !formData.contactName || !formData.email || 
        !formData.phone || formData.coverageType.length === 0 || !formData.industry) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Submitting coverage page form...', formData);
      
      // Build payload for Momentum API - NO firstName/lastName to prevent duplicates
      const momentumPayload = {
        // Contact Info - ONLY contactName (prevents duplicates)
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        
        // Business Info
        companyName: formData.companyName,
        industry: formData.industry,
        
        // Coverage Info - send as array
        coverageNeeded: formData.coverageType,
        
        // Form metadata
        formType: 'Coverage Page Quote',
        source: 'Coverage Page Form',
        
        // Description field with all details
        description: `Coverage Page Quote

Contact: ${formData.contactName}
Company: ${formData.companyName}
Email: ${formData.email}
Phone: ${formData.phone}
Industry: ${formData.industry}
Coverage Requested:
${formData.coverageType.map(coverage => {
  const option = allCoverageOptions.find(opt => opt.value === coverage);
  return `- ${option?.label || coverage}`;
}).join('\n')}

Source: Coverage Page Form`
      };
      
      console.log('Sending to API:', momentumPayload);
      
      // Send to API
      const response = await fetch('/api/momentum-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(momentumPayload)
      });
      
      const result = await response.json();
      console.log('API response:', result);
      
      if (result.success) {
        console.log('✓ Quote submitted successfully!');
        
        // Show success modal with confetti
        setShowSuccessModal(true);
        setShowConfetti(true);
        
        // Reset form
        setFormData({
          companyName: '',
          contactName: '',
          email: '',
          phone: '',
          coverageType: [],
          industry: ''
        });
        
      } else {
        alert(`Error submitting quote: ${result.message}\n\nPlease call (515) 581-7187`);
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('Unable to submit. Please call (515) 581-7187 for immediate assistance.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowConfetti(false);
  };

  const openCoverageModal = (coverage: CoverageType) => {
    setSelectedCoverage(coverage);
  };

  const closeCoverageModal = () => {
    setSelectedCoverage(null);
  };

  const scrollToForm = () => {
    closeCoverageModal();
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // All 16 coverage options for the form dropdown
  const allCoverageOptions = [
    { value: 'commercial-auto-liability', label: 'Commercial Auto Liability' },
    { value: 'physical-damage', label: 'Physical Damage' },
    { value: 'motor-truck-cargo', label: 'Motor Truck Cargo' },
    { value: 'non-trucking-liability', label: 'Non-Trucking Liability (NTL)' },
    { value: 'occupational-accident', label: 'Occupational Accident (Occ/Acc)' },
    { value: 'general-liability', label: 'General Liability' },
    { value: 'workers-comp', label: "Workers' Compensation" },
    { value: 'builders-risk', label: 'Builders Risk' },
    { value: 'cyber-liability', label: 'Cyber Liability' },
    { value: 'product-liability', label: 'Product Liability' },
    { value: 'commercial-property', label: 'Commercial Property' },
    { value: 'professional-liability', label: 'Professional Liability' },
    { value: 'tools-equipment', label: 'Tools & Equipment' },
    { value: 'equipment-breakdown', label: 'Equipment Breakdown' },
    { value: 'environmental-liability', label: 'Environmental Liability' },
    { value: 'multiple-other', label: 'Multiple Coverages / Not Sure / Other' }
  ];

  const handleCoverageToggle = (coverageValue: string) => {
    setFormData(prev => ({
      ...prev,
      coverageType: prev.coverageType.includes(coverageValue)
        ? prev.coverageType.filter(c => c !== coverageValue)
        : [...prev.coverageType, coverageValue]
    }));
  };

  // Add this function right after the allCoverageOptions array definition
const getIndustrySpecificCoverages = (industry: string) => {
  if (!industry) return allCoverageOptions; // Show all if no industry selected
  
  const coveragesByIndustry: { [key: string]: string[] } = {
    'trucking': [
      'commercial-auto-liability',
      'physical-damage',
      'motor-truck-cargo',
      'non-trucking-liability',
      'occupational-accident',
      'general-liability',
      'multiple-other'
    ],
    'construction': [
      'general-liability',
      'workers-comp',
      'builders-risk',
      'commercial-auto-liability',
      'professional-liability',
      'tools-equipment',
      'multiple-other'
    ],
    'manufacturing': [
      'product-liability',
      'equipment-breakdown',
      'commercial-property',
      'cyber-liability',
      'environmental-liability',
      'general-liability',
      'multiple-other'
    ],
    'nonprofit': [
      'general-liability',
      'workers-comp',
      'professional-liability',
      'cyber-liability',
      'commercial-property',
      'multiple-other'
    ],
    'public-entity': [
      'general-liability',
      'workers-comp',
      'cyber-liability',
      'commercial-property',
      'professional-liability',
      'multiple-other'
    ]
  };
  
  const relevantCoverages = coveragesByIndustry[industry] || [];
  return allCoverageOptions.filter(option => 
    relevantCoverages.includes(option.value)
  );
};

// Add this useEffect after the other useEffect hooks
useEffect(() => {
  if (formData.industry) {
    const validCoverages = getIndustrySpecificCoverages(formData.industry);
    const validCoverageValues = validCoverages.map(opt => opt.value);
    
    // Remove any selected coverages that aren't valid for the new industry
    const filteredCoverageType = formData.coverageType.filter(coverage => 
      validCoverageValues.includes(coverage)
    );
    
    if (filteredCoverageType.length !== formData.coverageType.length) {
      setFormData(prev => ({
        ...prev,
        coverageType: filteredCoverageType
      }));
    }
  }
}, [formData.industry]);

  const coverageTypes: CoverageType[] = [
    // CONSTRUCTION COVERAGES
    {
      id: 'general-liability',
      title: 'General Liability',
      description: 'Protection against third-party claims for bodily injury, property damage, and advertising injury',
      detailedOverview: 'Comprehensive protection against third-party claims, property damage, and completed operations. Essential coverage for all construction trades with protection against lawsuits and accidents.',
      coverageAmount: '$1M - $2M per occurrence',
      keyFeatures: [
        'Third-party injury claims protection',
        'Property damage coverage',
        'Products-completed operations',
        'Additional insured endorsements',
        'Primary & non-contributory coverage'
      ],
      whoNeedsIt: ['General contractors', 'Subcontractors', 'Construction managers', 'Specialty trades', 'Design-build firms']
    },
    {
      id: 'workers-compensation',
      title: "Workers' Compensation",
      description: 'Mandatory employee protection covering medical expenses, lost wages, and disability benefits for work-related injuries',
      detailedOverview: 'Mandatory employee protection with EMR management and safety training support. Covers medical expenses, lost wages, and provides crucial protection for your workforce.',
      coverageAmount: 'State-mandated minimums',
      keyFeatures: [
        'Work-related injuries coverage',
        'Medical expenses',
        'Lost wage replacement',
        'Disability benefits',
        'Return-to-work programs',
        'EMR rate management'
      ],
      whoNeedsIt: ['All construction employers', 'General contractors', 'Specialty contractors', 'Construction services', 'Labor contractors']
    },
    {
      id: 'builders-risk',
      title: "Builders Risk",
      description: 'Project protection from fire, weather, vandalism, and theft during construction covering structures, materials, and equipment',
      detailedOverview: 'Project protection from fire, weather, vandalism, and theft during construction. Covers the structure, materials, and equipment while work is in progress.',
      coverageAmount: 'Project value coverage',
      keyFeatures: [
        'Fire & explosion protection',
        'Weather damage coverage',
        'Theft & vandalism',
        'Material damage',
        'Soft cost coverage',
        'Debris removal'
      ],
      whoNeedsIt: ['Project owners', 'General contractors', 'Construction managers', 'Developers', 'Property managers']
    },
    {
      id: 'professional-liability',
      title: 'Professional Liability',
      description: 'Errors and omissions coverage for professional services and advice provided to clients',
      detailedOverview: 'Errors & omissions protection for design professionals and consultants. Covers mistakes, omissions, and professional negligence claims.',
      coverageAmount: '$1M - $5M per claim',
      keyFeatures: [
        'Design errors coverage',
        'Professional omissions protection',
        'Negligent acts',
        'Breach of duty coverage',
        'Prior acts coverage',
        'Extended reporting'
      ],
      whoNeedsIt: ['Architects', 'Engineers', 'Design consultants', 'Construction managers', 'Project managers']
    },
    {
      id: 'tools-equipment',
      title: 'Tools & Equipment',
      description: 'Protect valuable tools and machinery from theft, damage, and loss with comprehensive replacement cost coverage',
      detailedOverview: 'Protect valuable tools and machinery from theft, damage, and loss. Comprehensive coverage for contractors\' most important assets.',
      coverageAmount: 'Actual tool value',
      keyFeatures: [
        'Theft protection',
        'Damage coverage',
        'Loss of use',
        'Replacement cost coverage',
        'Newly acquired coverage',
        'Worldwide territory'
      ],
      whoNeedsIt: ['All contractors', 'Equipment owners', 'Tool-dependent trades', 'Mobile contractors', 'Specialty trades']
    },
    
    // MANUFACTURING COVERAGES
    {
      id: 'product-liability',
      title: 'Product Liability',
      description: 'Comprehensive protection against manufacturing defects, design flaws, and product-related injuries or damages',
      detailedOverview: 'Comprehensive protection against manufacturing defects, design flaws, and product-related injuries or damages. Essential coverage for any business that manufactures, distributes, or sells products.',
      coverageAmount: '$1M - $10M per occurrence',
      keyFeatures: [
        'Manufacturing defect coverage',
        'Design error protection',
        'Product recall expenses',
        'Legal defense costs',
        'Worldwide territory',
        'Settlement authority'
      ],
      whoNeedsIt: ['All manufacturers', 'Product distributors', 'Private label producers', 'Component suppliers', 'Consumer goods companies']
    },
    {
      id: 'equipment-breakdown',
      title: 'Equipment Breakdown',
      description: 'Specialized coverage for manufacturing equipment failure, machinery breakdown, and resulting business interruption',
      detailedOverview: 'Specialized coverage for manufacturing equipment failure, machinery breakdown, and resulting business interruption. Critical protection for production-dependent businesses.',
      coverageAmount: 'Equipment replacement value',
      keyFeatures: [
        'Machinery breakdown coverage',
        'Business interruption',
        'Expediting expenses',
        'Spoilage coverage',
        '24/7 claims support',
        'Emergency repairs'
      ],
      whoNeedsIt: ['Heavy manufacturers', 'Technology companies', 'Food processors', 'Chemical manufacturers', 'Equipment-dependent operations']
    },
    {
      id: 'commercial-property',
      title: 'Commercial Property',
      description: 'Coverage for buildings, equipment, inventory, and business property against damage and loss',
      detailedOverview: 'Protect manufacturing facilities, inventory, raw materials, and finished goods from fire, theft, and natural disasters. Comprehensive asset protection for manufacturers.',
      coverageAmount: 'Property replacement cost',
      keyFeatures: [
        'Fire & explosion coverage',
        'Weather damage',
        'Theft & vandalism',
        'Business interruption',
        'Agreed value coverage',
        'Debris removal'
      ],
      whoNeedsIt: ['Facility owners', 'Equipment lessees', 'Inventory holders', 'Multi-location operations', 'All manufacturers']
    },
    {
      id: 'cyber-liability',
      title: 'Cyber Liability',
      description: 'Protection against data breaches, cyber attacks, and digital security incidents',
      detailedOverview: 'Protection against data breaches, cyber attacks, and technology-related risks in modern manufacturing operations. Essential for connected manufacturing environments.',
      coverageAmount: '$1M - $25M per claim',
      keyFeatures: [
        'Data breach response',
        'Cyber extortion coverage',
        'Business interruption',
        'Regulatory fines',
        'Incident response team',
        'Forensic investigation'
      ],
      whoNeedsIt: ['Connected manufacturers', 'IoT operations', 'Customer data holders', 'Cloud-based systems', 'Digital manufacturers']
    },
    {
      id: 'environmental-liability',
      title: 'Environmental Liability',
      description: 'Coverage for pollution incidents, environmental cleanup, and regulatory compliance issues',
      detailedOverview: 'Coverage for pollution incidents, environmental cleanup, and regulatory compliance issues. Critical for manufacturers with environmental exposures.',
      coverageAmount: '$1M - $50M per claim',
      keyFeatures: [
        'Pollution cleanup',
        'Third-party claims',
        'Regulatory defense',
        'Business interruption',
        'Gradual pollution coverage',
        'Transportation coverage'
      ],
      whoNeedsIt: ['Chemical manufacturers', 'Industrial operations', 'Waste generators', 'Fuel storage operations', 'Heavy industry']
    },
    
    // TRUCKING & TRANSPORTATION COVERAGES - CONSOLIDATED COMMERCIAL AUTO
    {
      id: 'commercial-auto-liability',
      title: 'Commercial Auto Liability',
      description: 'Comprehensive protection for all commercial vehicles from pickup trucks to tractor trailers with liability and optional physical damage coverage',
      detailedOverview: 'Complete commercial auto insurance for all vehicle types and industries. Whether you\'re insuring a construction pickup truck or a fleet of tractor trailers, we provide comprehensive liability protection with optional physical damage coverage. DOT-compliant for trucking operations and tailored coverage for construction, delivery, and service businesses. Mandatory liability coverage with competitive rates and expert guidance from experienced agents.',
      coverageAmount: '$1M - $5M+ liability',
      keyFeatures: [
        'DOT compliance for trucking',
        'Third-party liability protection',
        'Bodily injury & property damage coverage',
        'Optional collision & comprehensive (physical damage)',
        'Cargo incidental coverage',
        'MCS-90 endorsement',
        'Uninsured motorist protection',
        'Fleet discounts available',
        'Flexible deductibles',
        'Umbrella policies up to $10M available'
      ],
      whoNeedsIt: ['All commercial vehicle operations', 'Trucking companies', 'Fleet operators', 'Construction companies', 'Transportation businesses', 'Equipment transporters', 'Service contractors', 'Material suppliers', 'Delivery services']
    },
    {
      id: 'physical-damage',
      title: 'Physical Damage Insurance',
      description: 'Vehicle protection coverage for your fleet covering actual cash value or stated amount for collision and comprehensive claims',
      detailedOverview: 'Comprehensive vehicle protection for your commercial trucks and equipment. Covers collision, comprehensive, and total loss with flexible deductible options.',
      coverageAmount: 'ACV or Stated Amount',
      keyFeatures: [
        'Collision coverage',
        'Comprehensive coverage',
        'Total loss protection',
        'Flexible deductibles',
        'Towing & labor',
        'Rental reimbursement'
      ],
      whoNeedsIt: ['Businesses with commercial vehicles', 'Fleet owners', 'Leased equipment', 'New truck buyers', 'High-value equipment']
    },
    {
      id: 'motor-truck-cargo',
      title: 'Motor Truck Cargo',
      description: 'Freight protection covering goods in transit from loading to final delivery with comprehensive coverage options',
      detailedOverview: 'Essential protection for goods in transit covering theft, damage, and loss of freight. Required by most brokers and shippers with customizable limits from $100,000 to over $250,000 per load, with capabilities to write policies up to $1M for specialized cargo.',
      coverageAmount: '$100K - $250K+ per load',
      keyFeatures: [
        'Goods in transit coverage',
        'Loading/unloading protection',
        'Theft coverage',
        'Damage protection',
        'Refrigeration breakdown',
        'Debris removal',
        'Higher limits available up to $1M'
      ],
      whoNeedsIt: ['All trucking operations hauling freight', 'Owner operators', 'Fleet carriers', 'Specialized haulers', 'Refrigerated transport']
    },
    {
      id: 'non-trucking-liability',
      title: 'Non-Trucking Liability (NTL)',
      description: 'Bobtail coverage for owner operators when operating under own authority without a trailer or outside dispatch',
      detailedOverview: 'Non-Trucking Liability (NTL), also known as Bobtail insurance, protects owner operators when driving their truck for personal use or without a trailer. This coverage is essential for independent drivers operating under their own authority when not under dispatch.',
      coverageAmount: '$1M+ liability coverage',
      keyFeatures: [
        'Personal use protection',
        'Bobtail coverage',
        'Non-dispatch operation',
        'Affordable premiums',
        'Quick policy issuance',
        '24/7 claims support'
      ],
      whoNeedsIt: ['Owner operators', 'Independent drivers', 'Lease purchase operators', 'Contract carriers', 'Individual truckers']
    },
    {
      id: 'occupational-accident',
      title: 'Occupational Accident (Occ/Acc)',
      description: 'Medical and disability coverage for owner operators and independent contractors in lieu of workers compensation',
      detailedOverview: 'Occupational Accident insurance provides medical expense coverage, disability benefits, and accidental death protection for owner operators and independent contractors who are not eligible for traditional workers compensation coverage. Essential protection for individual drivers.',
      coverageAmount: 'Up to $1M coverage',
      keyFeatures: [
        'Medical expense coverage',
        'Disability benefits',
        'Accidental death benefit',
        'No workers comp needed',
        'Affordable premiums',
        'Quick claim processing'
      ],
      whoNeedsIt: ['Owner operators', 'Independent contractors', '1099 drivers', 'Lease operators', 'Individual truckers']
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        /* Fluid Responsive Scaling - Works on ALL screen sizes */
        :root {
          --fluid-spacing-xs: clamp(0.5rem, 1vw, 1rem);
          --fluid-spacing-sm: clamp(1rem, 2vw, 1.5rem);
          --fluid-spacing-md: clamp(1.5rem, 3vw, 2rem);
          --fluid-spacing-lg: clamp(2rem, 4vw, 3rem);
          --fluid-spacing-xl: clamp(3rem, 6vw, 5rem);
        }
        
        /* Ensure smooth scaling on ultra-wide monitors */
        @media (min-width: 2000px) {
          .responsive-container {
            max-width: 1920px;
            margin-left: auto;
            margin-right: auto;
          }
        }
        
        /* Prevent overflow on any screen */
        * {
          box-sizing: border-box;
        }
      `}</style>

      
      {/* Hero Section */}
      <section ref={heroRef} className="bg-white py-12 lg:py-[clamp(3rem,8vw,5rem)]">
        <div className="responsive-container max-w-[min(90rem,95vw)] mx-auto px-[clamp(1rem,3vw,2rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,4vw,3rem)] items-center">
            
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/coverage.png" 
                  alt="Commercial insurance coverage solutions"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>

            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
                <div>
                  <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-gray-900 leading-tight mb-6">
                   Insurance
                    <span className="block text-transparent bg-gradient-to-r from-[#CC9F54] to-[#B8893D] bg-clip-text">
                      Coverage Solutions
                    </span>
                  </h1>
                  
                  <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-gray-600 leading-relaxed mb-8 max-w-lg">
                    From commercial auto liability to workers' compensation, we provide comprehensive insurance solutions 
                    tailored to your business needs. Expert guidance, competitive rates, and superior service.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    'DOT Compliant Coverage',
                    'All Industries Served',
                    '24/7 Expert Support'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#CC9F54] flex-shrink-0" />
                      <span className="text-[clamp(0.95rem,1.2vw,1.125rem)] font-medium text-gray-800">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                                           <Link 
  href="/quote-form"
  className="bg-gradient-to-r from-[#CC9F54] to-[#B8893D] hover:from-[#A87A32] hover:to-[#9A7030] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group"
   suppressHydrationWarning
>
  Get Your Quote
</Link>
                  
                  <a href="tel:+15155817187" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.75rem,1.5vw,1rem)] rounded-lg font-bold text-[clamp(0.95rem,1.2vw,1.125rem)] min-h-[3rem] transition-all duration-300 flex items-center justify-center">
                    Call (515) 581-7187
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Coverage Types Section - Cards with Modal */}
      <section className="py-[clamp(3rem,8vw,5rem)] bg-gray-50">
        <div className="responsive-container max-w-[min(90rem,95vw)] mx-auto px-[clamp(1rem,3vw,2rem)]">
          
          <div className="mb-16">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 mb-4 leading-tight">
              Our Insurance <span className="text-transparent bg-gradient-to-r from-[#CC9F54] to-[#B8893D] bg-clip-text">Coverage Options</span>
            </h2>
            <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-gray-600 max-w-3xl">
              Comprehensive protection across all industries. Click "Learn More" on any coverage to see details.
            </p>
          </div>

          {/* Coverage Grid - Cards */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6">
            {coverageTypes.map((coverage) => (
              <div 
                key={coverage.id}
                className="bg-white rounded-xl border border-gray-200 hover:border-[#CC9F54] hover:shadow-lg transition-all duration-300 p-6 flex flex-col"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {coverage.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {coverage.description}
                </p>

                {/* Learn More Button */}
                <button
                  onClick={() => openCoverageModal(coverage)}
                  className="mt-auto flex items-center text-[#CC9F54] hover:text-[#B8893D] font-semibold text-sm transition-colors group"
                  suppressHydrationWarning
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Details Modal */}
      {selectedCoverage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 bg-white/80 backdrop-blur-md"
            onClick={closeCoverageModal}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-scale border border-gray-200">
            
            {/* Close Button */}
            <button
              onClick={closeCoverageModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              suppressHydrationWarning
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Modal Header */}
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 pr-10">
                {selectedCoverage.title}
              </h2>
              <p className="text-gray-600">
                {selectedCoverage.description}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-[clamp(1rem,2.5vw,1.5rem)]">
              
              {/* Overview */}
              <div>
                <h3 className="text-[clamp(0.95rem,1.2vw,1.125rem)] font-bold text-gray-900 mb-3">Overview</h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedCoverage.detailedOverview}
                </p>
              </div>

              {/* Coverage Amount */}
              <div>
                <h3 className="text-[clamp(0.95rem,1.2vw,1.125rem)] font-bold text-gray-900 mb-3">Coverage Amount</h3>
                <p className="text-[#CC9F54] font-bold text-xl">
                  {selectedCoverage.coverageAmount}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-[clamp(0.95rem,1.2vw,1.125rem)] font-bold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {selectedCoverage.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who Needs This */}
              <div>
                <h3 className="text-[clamp(0.95rem,1.2vw,1.125rem)] font-bold text-gray-900 mb-3">Who Needs This Coverage</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCoverage.whoNeedsIt.map((item, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 bg-[#FBF5EB] text-[#9A7030] rounded-full text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer - CTA Buttons */}
            <div className="p-8 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:+15155817187" 
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 px-6 rounded-lg font-bold text-[clamp(0.95rem,1.2vw,1.125rem)] min-h-[3rem] transition-all duration-300 flex items-center justify-center group shadow-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
                <button 
                  onClick={scrollToForm}
                  className="flex-1 bg-gradient-to-r from-[#CC9F54] to-[#B8893D] hover:from-[#A87A32] hover:to-[#9A7030] text-white py-4 px-6 rounded-lg font-bold text-[clamp(0.95rem,1.2vw,1.125rem)] min-h-[3rem] transition-all duration-300 flex items-center justify-center group shadow-lg"
                >
                  Get a Quote
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile-optimized CTA Section */}
      <section className="py-[clamp(3rem,8vw,5rem)] bg-gradient-to-br from-gray-50 to-white">
        <div className="responsive-container max-w-[min(64rem,95vw)] mx-auto px-[clamp(1rem,3vw,2rem)]">
          <div className="text-center animate-fade-in-up delay-400">
            <div className="bg-gradient-to-r from-[#CC9F54] to-[#B8893D] rounded-2xl p-[clamp(1.5rem,4vw,2rem)] text-white shadow-2xl">
              <h3 className="text-[clamp(1.25rem,2.5vw,2rem)] font-bold mb-[clamp(0.75rem,2vw,1rem)]">
                Need Help Finding the Right Coverage?
              </h3>
              <p className="text-[clamp(1rem,1.5vw,1.25rem)] mb-[clamp(1rem,3vw,1.5rem)] text-[#F0E2C8] px-[clamp(0.5rem,1vw,0.5rem)]">
                Our insurance experts are standing by to help you find the perfect protection for your business. Get personalized guidance today.
              </p>
              <div className="flex flex-col gap-[clamp(0.75rem,2vw,1rem)] sm:flex-row justify-center">
                <a 
                  href="tel:+15155817187"
                  className="bg-white text-[#CC9F54] hover:bg-gray-100 px-[clamp(1.5rem,4vw,2rem)] py-[clamp(0.75rem,2vw,0.875rem)] rounded-lg font-bold transition-colors text-[clamp(0.875rem,1.2vw,1rem)] shadow-md hover:shadow-lg"
                >
                  Call (515) 581-7187
                </a>
                <button 
                  onClick={scrollToForm}
                  className="border-2 border-white text-white hover:bg-white hover:text-[#CC9F54] px-[clamp(1.5rem,4vw,2rem)] py-[clamp(0.75rem,2vw,0.875rem)] rounded-lg font-bold transition-colors text-[clamp(0.875rem,1.2vw,1rem)]"
                  suppressHydrationWarning
                >
                  Get Free Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-[clamp(3rem,8vw,5rem)] bg-white">
        <div className="responsive-container max-w-[min(90rem,95vw)] mx-auto px-[clamp(1rem,3vw,2rem)]">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 mb-4">
              Why Choose
              <span className="block text-transparent bg-gradient-to-r from-[#CC9F54] to-[#B8893D] bg-clip-text">
                Moxie Risk Partners?
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-[clamp(1.5rem,3vw,2rem)]">
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-[#CC9F54] to-[#B8893D] rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold text-gray-900 mb-4">Expert Guidance</h3>
              <p className="text-gray-600">
                Licensed insurance professionals with decades of combined experience across all industries
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-[#CC9F54] to-[#B8893D] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold text-gray-900 mb-4">Competitive Rates</h3>
              <p className="text-gray-600">
                Access to multiple A-rated carriers ensures you get the best coverage at the most competitive prices
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-[#CC9F54] to-[#B8893D] rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock claims support and dedicated service team always available when you need us
              </p>
            </div>
          </div>
        </div>
      </section>

      
      {/* Enhanced CTA Footer with Quote Form */}
      <section ref={formRef} className="relative py-[clamp(3rem,8vw,5rem)] bg-gray-50 overflow-hidden">
        <div className="responsive-container max-w-[min(90rem,95vw)] mx-auto px-[clamp(1rem,3vw,2rem)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,4vw,3rem)] items-center">
            
            {/* Left Side - CTA Content */}
            <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
              <div>
                <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-gray-900 mb-6 leading-tight">
                  Ready to Protect Your
                  <span className="block text-transparent bg-gradient-to-r from-[#CC9F54] to-[#B8893D] bg-clip-text">
                    Business?
                  </span>
                </h2>
                
                <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-gray-600 leading-relaxed mb-8">
                  Join thousands of businesses who trust Moxie Risk Partners for their insurance needs. 
                  Get your quote today and experience the difference specialized expertise makes.
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
                  <a href="tel:+15155817187" className="text-[clamp(0.95rem,1.2vw,1.125rem)] font-bold text-green-600 hover:text-green-700 transition-colors">
                    (515) 581-7187
                  </a>
                  <p className="text-xs text-gray-500 mt-1">24/7 Available</p>
                </div>

                {/* Email */}
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Email Us</h4>
                  <a href="mailto:quotes@moxieriskpartners.com" className="text-[clamp(0.95rem,1.2vw,1.125rem)] font-bold text-purple-600 hover:text-purple-700 transition-colors break-all">
                    quotes@moxieriskpartners.com
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Quick Response</p>
                </div>
              </div>
            </div>

           {/* Right Side - Quote Form */}
<div className="bg-gradient-to-br from-[#FBF5EB] to-[#F5EDE0] rounded-2xl shadow-xl border border-gray-200 p-8">
  
  <div className="text-center mb-6">
    <div className="w-16 h-16 bg-gradient-to-br from-[#CC9F54] to-[#B8893D] rounded-full flex items-center justify-center mx-auto mb-4">
      <Shield className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold text-gray-900 mb-2">Get Your Free Quote</h3>
    <p className="text-gray-600">Fast, competitive insurance quotes</p>
  </div>

  <div className="space-y-4">
    
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Company Name *
      </label>
      <input
        type="text"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9F54] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500 bg-white"
        placeholder="Your Company Name"
        value={formData.companyName}
        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
        suppressHydrationWarning
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Contact Name *
      </label>
      <input
        type="text"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9F54] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500 bg-white"
        placeholder="Your Full Name"
        value={formData.contactName}
        onChange={(e) => setFormData({...formData, contactName: e.target.value})}
        suppressHydrationWarning
      />
    </div>

    {/* MOBILE: Stack vertically, DESKTOP: 2 columns */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9F54] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500 bg-white"
          placeholder="email@company.com"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          suppressHydrationWarning
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Phone *
        </label>
        <input
          type="tel"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9F54] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500 bg-white"
          placeholder="(555) 123-4567"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          suppressHydrationWarning
        />
      </div>
    </div>

    {/* Industry - Full width on mobile, better UX */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Industry *
      </label>
      <select
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9F54] focus:border-transparent outline-none transition-all text-gray-900 bg-white"
        value={formData.industry}
        onChange={(e) => setFormData({...formData, industry: e.target.value})}
        suppressHydrationWarning
      >
        <option value="">Select Industry</option>
        <option value="trucking">Trucking & Transportation</option>
        <option value="construction">Construction & Contracting</option>
        <option value="manufacturing">Manufacturing & Production</option>
        <option value="nonprofit">Nonprofit & Human Services</option>
        <option value="public-entity">Government & Public Entities</option>
      </select>
    </div>

    {/* Coverage - Full width on mobile for better dropdown UX */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Coverage Type * <span className="text-gray-500 text-xs">(Select all that apply)</span>
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsCoverageDropdownOpen(!isCoverageDropdownOpen)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9F54] focus:border-transparent outline-none transition-all text-left flex justify-between items-center text-gray-900 bg-white min-h-[3rem]"
        >
          <span className="text-gray-700 truncate">
            {formData.coverageType.length === 0 
              ? 'Select coverage types...'
              : formData.coverageType.length === 1
              ? allCoverageOptions.find(opt => opt.value === formData.coverageType[0])?.label
              : `${formData.coverageType.length} coverage types selected`
            }
          </span>
          <svg 
            className={`w-5 h-5 transition-transform text-gray-600 flex-shrink-0 ml-2 ${isCoverageDropdownOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isCoverageDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {getIndustrySpecificCoverages(formData.industry).map((option) => (
              <label 
                key={option.value} 
                className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <input
                  type="checkbox"
                  checked={formData.coverageType.includes(option.value)}
                  onChange={() => handleCoverageToggle(option.value)}
                  className="mr-3 w-4 h-4 text-[#CC9F54] border-gray-300 rounded focus:ring-[#CC9F54] flex-shrink-0"
                />
                <span className="text-gray-900 text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>

    <button
      onClick={handleFormSubmit}
      disabled={isSubmitting}
      className="w-full bg-gradient-to-r from-[#CC9F54] to-[#B8893D] hover:from-[#A87A32] hover:to-[#9A7030] text-white py-4 rounded-lg font-bold text-[clamp(0.95rem,1.2vw,1.125rem)] min-h-[3rem] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      suppressHydrationWarning
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Submitting...
        </span>
      ) : (
        <>
          Get My Quote Now
          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </button>

    <div className="text-center mt-4 space-y-2">
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span>100% Secure & Confidential</span>
      </div>
      <p className="text-xs text-gray-500">
        No spam, unsubscribe anytime. Licensed agents only.
      </p>
    </div>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        showConfetti={showConfetti}
      />
    </div>
  );
};

export default CoveragePage;