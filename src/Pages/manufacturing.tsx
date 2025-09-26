// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import { CheckCircle, ArrowRight, Shield, Clock, Users, Star, Phone, Mail, MapPin, Factory, Settings, Zap, Database, AlertTriangle, Cpu } from 'lucide-react';

// interface CoverageData {
//   type: string;
//   typeCode: string;
//   title: string;
//   description: string;
//   commonApplications: string[];
//   risksCovered: string[];
//   whoNeedsIt: string[];
//   coverageAmount: string;
//   specialFeatures: string[];
//   icon: React.ElementType;
// }

// interface FAQItem {
//   question: string;
//   answer: string;
//   isOpen: boolean;
// }

// const ManufacturingPage = () => {
//   const [selectedType, setSelectedType] = useState('product-liability');
//   const [isVisible, setIsVisible] = useState(false);
//   const [faqItems, setFaqItems] = useState<FAQItem[]>([
//     {
//       question: "What types of manufacturing insurance do I need?",
//       answer: "Most manufacturing businesses need Product Liability, General Liability, Workers' Compensation, and Commercial Property insurance as core coverage. Additional coverage may include Equipment Breakdown, Cyber Liability, and Environmental Liability depending on your specific manufacturing operations and industry requirements.",
//       isOpen: false
//     },
//     {
//       question: "How much does manufacturing insurance cost?",
//       answer: "Manufacturing insurance costs vary significantly based on your industry type, business size, annual revenue, and coverage needs. Product liability typically ranges from $500-$2,000 annually per $1M in coverage. Workers' compensation costs depend on your industry classification and typically range from 1-5% of payroll.",
//       isOpen: false
//     },
//     {
//       question: "Is product liability insurance required for manufacturers?",
//       answer: "While not legally required in most states, product liability insurance is essential for manufacturers as it protects against costly lawsuits from product defects, design flaws, or injuries caused by your products. Many contracts and retailers require manufacturers to carry product liability coverage.",
//       isOpen: false
//     },
//     {
//       question: "What is equipment breakdown insurance and do I need it?",
//       answer: "Equipment breakdown insurance covers the cost of repairing or replacing manufacturing equipment that breaks down due to mechanical, electrical, or pressure system failures. It also covers business interruption losses while equipment is being repaired. This coverage is crucial for manufacturers who rely on expensive machinery.",
//       isOpen: false
//     },
//     {
//       question: "How does my industry type affect my manufacturing insurance rates?",
//       answer: "Different manufacturing industries have varying risk levels that directly impact insurance rates. Food manufacturing may have contamination risks, chemical manufacturing has environmental exposures, and automotive manufacturing faces product recall risks. Our specialists understand industry-specific risks and can recommend appropriate coverage.",
//       isOpen: false
//     }
//   ]);
//   const [formData, setFormData] = useState({
//     companyName: '',
//     contactName: '',
//     email: '',
//     phone: '',
//     industryType: '',
//     annualRevenue: ''
//   });

//   const heroRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => setIsVisible(entry.isIntersecting),
//       { threshold: 0.1 }
//     );

//     if (heroRef.current) {
//       observer.observe(heroRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const coverageTypes: CoverageData[] = [
//     {
//       type: 'Product Liability',
//       typeCode: 'product-liability',
//       title: 'Product Liability Insurance',
//       description: 'Comprehensive protection against manufacturing defects, design flaws, and product-related injuries or damages. Essential coverage for any business that manufactures, distributes, or sells products.',
//       commonApplications: ['Manufacturing defects', 'Design errors', 'Product recalls', 'Consumer injuries', 'Property damage claims'],
//       risksCovered: ['Manufacturing defect coverage', 'Design error protection', 'Product recall expenses', 'Legal defense costs', 'Settlement payments'],
//       whoNeedsIt: ['All manufacturers', 'Product distributors', 'Private label producers', 'Component suppliers', 'Consumer goods companies'],
//       coverageAmount: '$1M - $10M per occurrence',
//       specialFeatures: ['Recall coverage', 'Worldwide territory', 'Defense cost coverage', 'Settlement authority'],
//       icon: AlertTriangle
//     },
//     {
//       type: 'General Liability',
//       typeCode: 'general-liability',
//       title: 'General Liability Insurance',
//       description: 'Protection against third-party property damage, bodily injury, and premises liability claims from manufacturing operations. Core coverage for manufacturing facilities and operations.',
//       commonApplications: ['Premises liability', 'Operations coverage', 'Visitor injuries', 'Property damage', 'Personal injury claims'],
//       risksCovered: ['Premises liability coverage', 'Operations protection', 'Personal injury claims', 'Medical payments', 'Products-completed operations'],
//       whoNeedsIt: ['Manufacturing facilities', 'Production operations', 'Warehouse operations', 'Distribution centers', 'All manufacturing businesses'],
//       coverageAmount: '$1M - $5M per occurrence',
//       specialFeatures: ['Blanket additional insured', 'Waiver of subrogation', 'Primary & non-contributory', 'Broad form coverage'],
//       icon: Shield
//     },
//     {
//       type: 'Equipment Breakdown',
//       typeCode: 'equipment-breakdown',
//       title: 'Equipment Breakdown Insurance',
//       description: 'Specialized coverage for manufacturing equipment failure, machinery breakdown, and resulting business interruption. Critical protection for production-dependent businesses.',
//       commonApplications: ['Machinery breakdown', 'Electrical failures', 'Mechanical breakdown', 'Computer equipment', 'Production interruption'],
//       risksCovered: ['Machinery breakdown coverage', 'Business interruption', 'Expediting expenses', 'Spoilage coverage', 'Extra expense'],
//       whoNeedsIt: ['Heavy manufacturers', 'Technology companies', 'Food processors', 'Chemical manufacturers', 'Equipment-dependent operations'],
//       coverageAmount: 'Equipment replacement value',
//       specialFeatures: ['24/7 claims support', 'Emergency repairs', 'Temporary replacement', 'Loss prevention services'],
//       icon: Settings
//     },
//     {
//       type: 'Commercial Property',
//       typeCode: 'commercial-property',
//       title: 'Commercial Property Insurance',
//       description: 'Protect manufacturing facilities, inventory, raw materials, and finished goods from fire, theft, and natural disasters. Comprehensive asset protection for manufacturers.',
//       commonApplications: ['Building protection', 'Equipment coverage', 'Inventory protection', 'Raw materials', 'Finished goods'],
//       risksCovered: ['Fire & explosion', 'Weather damage', 'Theft & vandalism', 'Business interruption', 'Extra expense'],
//       whoNeedsIt: ['Facility owners', 'Equipment lessees', 'Inventory holders', 'Multi-location operations', 'All manufacturers'],
//       coverageAmount: 'Property replacement cost',
//       specialFeatures: ['Agreed value coverage', 'Inflation guard', 'Debris removal', 'Ordinance & law coverage'],
//       icon: Factory
//     },
//     {
//       type: 'Cyber Liability',
//       typeCode: 'cyber-liability',
//       title: 'Cyber Liability Insurance',
//       description: 'Protection against data breaches, cyber attacks, and technology-related risks in modern manufacturing operations. Essential for connected manufacturing environments.',
//       commonApplications: ['Data breaches', 'Cyber attacks', 'System failures', 'Privacy violations', 'Business interruption'],
//       risksCovered: ['Data breach response', 'Cyber extortion coverage', 'Business interruption', 'Regulatory fines', 'Credit monitoring'],
//       whoNeedsIt: ['Connected manufacturers', 'IoT operations', 'Customer data holders', 'Cloud-based systems', 'Digital manufacturers'],
//       coverageAmount: '$1M - $25M per claim',
//       specialFeatures: ['Incident response team', '24/7 hotline', 'Forensic investigation', 'Public relations support'],
//       icon: Cpu
//     },
//     {
//       type: 'Environmental Liability',
//       typeCode: 'environmental-liability',
//       title: 'Environmental Liability Insurance',
//       description: 'Coverage for pollution incidents, environmental cleanup, and regulatory compliance issues. Critical for manufacturers with environmental exposures.',
//       commonApplications: ['Pollution incidents', 'Waste disposal', 'Chemical spills', 'Soil contamination', 'Regulatory violations'],
//       risksCovered: ['Pollution cleanup', 'Third-party claims', 'Regulatory defense', 'Business interruption', 'Remediation costs'],
//       whoNeedsIt: ['Chemical manufacturers', 'Industrial operations', 'Waste generators', 'Fuel storage operations', 'Heavy industry'],
//       coverageAmount: '$1M - $50M per claim',
//       specialFeatures: ['Gradual pollution coverage', 'Transportation coverage', 'Contractors coverage', 'Legal defense'],
//       icon: Database
//     }
//   ];

//   const industryCategories = [
//     {
//       title: "Food & Beverage",
//       industries: ["Food Processing", "Beverage Production", "Packaging Operations", "Specialty Foods", "Organic Manufacturing"]
//     },
//     {
//       title: "Automotive Manufacturing", 
//       industries: ["Auto Parts Manufacturing", "Component Assembly", "Aftermarket Parts", "Automotive Electronics", "Supplier Operations"]
//     },
//     {
//       title: "Electronics & Technology",
//       industries: ["Electronic Components", "Consumer Electronics", "Industrial Equipment", "Semiconductor Manufacturing", "Technology Hardware"]
//     },
//     {
//       title: "Chemical & Materials",
//       industries: ["Chemical Processing", "Pharmaceutical Manufacturing", "Specialty Chemicals", "Raw Materials", "Industrial Coatings"]
//     },
//     {
//       title: "Textile & Apparel",
//       industries: ["Clothing Manufacturing", "Fabric Production", "Textile Processing", "Footwear Manufacturing", "Industrial Textiles"]
//     },
//     {
//       title: "Metal & Machinery",
//       industries: ["Metal Fabrication", "Machinery Manufacturing", "Industrial Equipment", "Tool Manufacturing", "Heavy Machinery"]
//     }
//   ];

//   const consultingServices = [
//     {
//       title: "Proper Building Valuations",
//       description: "Accurate replacement cost assessments for manufacturing facilities, ensuring adequate coverage limits and avoiding costly underinsurance gaps that could devastate your business.",
//       icon: Factory
//     },
//     {
//       title: "Business Income Analysis",
//       description: "Expert evaluation of business interruption exposures and extra expense requirements, protecting your cash flow during production shutdowns and facility repairs.",
//       icon: Clock
//     },
//     {
//       title: "Employee Retention Cost Evaluation",
//       description: "Comprehensive analysis of key employee replacement costs and retention strategies, helping you protect against talent loss and maintain operational continuity.",
//       icon: Users
//     },
//     {
//       title: "Grant & Funding Writing",
//       description: "Professional grant writing services for manufacturing expansion, equipment upgrades, and safety improvements - accessing funding opportunities often overlooked by businesses.",
//       icon: Star
//     },
//     {
//       title: "Co-Bots Assessment",
//       description: "Collaborative robotics evaluation and implementation planning, helping manufacturers safely integrate automation while managing liability and operational risks.",
//       icon: Zap
//     }
//   ];

//   const selectedCoverage = coverageTypes.find(coverage => coverage.typeCode === selectedType) || coverageTypes[0];

//   const toggleFAQ = (index: number) => {
//     setFaqItems(prev => prev.map((item, idx) => ({
//       ...item,
//       isOpen: idx === index ? !item.isOpen : false
//     })));
//   };

//   const handleFormSubmit = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     console.log('Manufacturing insurance form submitted:', formData);
//   };

//   const handleTypeSelection = (typeCode: string) => {
//     setSelectedType(typeCode);
//   };

//   return (
//     <div className="min-h-screen bg-white">
      
//       {/* Hero Section - Side by Side Layout */}
//       <section ref={heroRef} className="bg-white py-12 lg:py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
            
//             {/* Left Side - Hero Image */}
//             <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
//               <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//                 <img 
//                   src="/images/manufacHero1.png" 
//                   alt="Manufacturing professional working with equipment"
//                   className="w-full h-[500px] lg:h-[600px] object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
//               </div>
//             </div>

//             {/* Right Side - Content */}
//             <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
//               <div className="space-y-8">
//                 <div>
//                   <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
//                     Manufacturing
//                     <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
//                       Insurance Solutions
//                     </span>
//                   </h1>
                  
//                   <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
//                     Comprehensive protection for manufacturers across all industries. Specialized coverage for 
//                     product liability, equipment breakdown, and operational risks.
//                   </p>
//                 </div>

//                 {/* Features */}
//                 <div className="space-y-4">
//                   {[
//                     'All Manufacturing Types',
//                     'Product Liability Experts',
//                     'Equipment Protection'
//                   ].map((feature, index) => (
//                     <div key={index} className="flex items-center space-x-3">
//                       <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
//                       <span className="text-lg font-medium text-gray-800">{feature}</span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* CTA Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group">
//                     Get Your Quote
//                     <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
//                   </button>
                  
//                   <a href="tel:+18003265581" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center">
//                     Call (800) 326-5581
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Coverage Options Selector Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
//           {/* Section Header - Left Aligned */}
//           <div className="mb-16">
//             <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
//               Choose Your Manufacturing Coverage
//             </h2>
//             <p className="text-xl text-gray-600 max-w-4xl mb-6">
//               From product liability to equipment breakdown, we provide comprehensive insurance 
//               solutions tailored to your specific manufacturing operations and industry requirements.
//             </p>
//             {/* Underline bar */}
//             {/* <div className="w-96 h-2 bg-gray-900 rounded-full"></div> */}
//           </div>

//           {/* Coverage Type Buttons */}
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
//             {coverageTypes.map((coverage) => {
//               const IconComponent = coverage.icon;
//               return (
//                 <button
//                   key={coverage.typeCode}
//                   onClick={() => handleTypeSelection(coverage.typeCode)}
//                   className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
//                     selectedType === coverage.typeCode
//                       ? 'border-orange-600 bg-orange-50 shadow-lg scale-105'
//                       : 'border-gray-200 bg-white hover:border-orange-300'
//                   }`}
//                 >
//                   <div className="text-center">
//                     <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center">
//                       <IconComponent 
//                         className={`w-12 h-12 transition-all duration-300 ${
//                           selectedType === coverage.typeCode ? 'text-orange-600' : 'text-gray-600'
//                         } group-hover:scale-110`}
//                       />
//                     </div>
//                     <h3 className={`text-sm font-bold transition-colors ${
//                       selectedType === coverage.typeCode ? 'text-orange-600' : 'text-gray-800'
//                     }`}>
//                       {coverage.type}
//                     </h3>
//                   </div>
                  
//                   {/* Selected Indicator */}
//                   {selectedType === coverage.typeCode && (
//                     <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
//                       <CheckCircle className="w-4 h-4 text-white" />
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Coverage Details Panel */}
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-12">
            
//             {/* Coverage Header */}
//             <div className="flex flex-col lg:flex-row justify-between items-start mb-8 pb-6 border-b-2 border-orange-100">
//               <div className="mb-4 lg:mb-0">
//                 <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
//                   {selectedCoverage.title}
//                 </h3>
//                 <div className="inline-block bg-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm">
//                   Coverage: {selectedCoverage.coverageAmount}
//                 </div>
//               </div>
//             </div>

//             {/* Coverage Description */}
//             <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-4xl">
//               {selectedCoverage.description}
//             </p>

//             {/* Coverage Details Grid */}
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              
//               {/* Common Applications */}
//               <div className="space-y-4">
//                 <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-orange-200">
//                   Common Applications
//                 </h4>
//                 <div className="space-y-2">
//                   {selectedCoverage.commonApplications.map((application, index) => (
//                     <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
//                       <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
//                       <span className="text-gray-700 text-sm">{application}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Risks Covered */}
//               <div className="space-y-4">
//                 <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-orange-200">
//                   Risks Covered
//                 </h4>
//                 <div className="space-y-2">
//                   {selectedCoverage.risksCovered.map((risk, index) => (
//                     <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
//                       <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
//                       <span className="text-gray-700 text-sm">{risk}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Who Needs It */}
//               <div className="space-y-4">
//                 <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-orange-200">
//                   Who Needs This Coverage
//                 </h4>
//                 <div className="space-y-2">
//                   {selectedCoverage.whoNeedsIt.map((who, index) => (
//                     <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
//                       <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
//                       <span className="text-gray-700 text-sm">{who}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Special Features */}
//               <div className="space-y-4">
//                 <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-orange-200">
//                   Special Features
//                 </h4>
//                 <div className="space-y-2">
//                   {selectedCoverage.specialFeatures.map((feature, index) => (
//                     <div key={index} className="flex items-start space-x-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
//                       <Star className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0 fill-current" />
//                       <span className="text-gray-800 text-sm font-medium">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Risk Management Services Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
//           <div className="mb-16">
//             <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
//               Risk Management Services
//             </h2>
//             <p className="text-xl text-gray-600 max-w-4xl mb-6">
//               Strategic business advisory services that differentiate us from traditional insurance agents. 
//               We're your comprehensive risk management partner, not just your insurance provider.
//             </p>
//             {/* <div className="w-96 h-2 bg-gray-900 rounded-full"></div> */}
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {consultingServices.map((service) => {
//               const IconComponent = service.icon;
//               return (
//                 <div key={service.title} className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
//                   <div className="mb-6">
//                     <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
//                       <IconComponent className="w-8 h-8 text-white" />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">
//                       {service.title}
//                     </h3>
//                   </div>
//                   <p className="text-gray-600 leading-relaxed">
//                     {service.description}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Industries Served Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
//           <div className="mb-16">
//             <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
//               Industries Served
//             </h2>
//             <p className="text-xl text-gray-600 max-w-4xl mb-6">
//               Specialized insurance solutions for every manufacturing sector and production type
//             </p>
//             {/* <div className="w-96 h-2 bg-gray-900 rounded-full"></div> */}
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {industryCategories.map((category) => (
//               <div key={category.title} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-200">
//                   {category.title}
//                 </h3>
//                 <ul className="space-y-2">
//                   {category.industries.map((industry) => (
//                     <li key={industry} className="flex items-center space-x-2">
//                       <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
//                       <span className="text-gray-700 text-sm">{industry}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
//           <div className="text-center mb-16">
//             <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
//               Manufacturing Insurance FAQs
//             </h2>
//             <p className="text-xl text-gray-600 mb-6">
//               Common questions about manufacturing insurance coverage, costs, and requirements
//             </p>
//           </div>

//           <div className="space-y-4">
//             {faqItems.map((faq, index) => (
//               <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
//                 <button
//                   className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-100 rounded-xl transition-colors duration-200"
//                   onClick={() => toggleFAQ(index)}
//                   aria-expanded={faq.isOpen}
//                   suppressHydrationWarning
//                 >
//                   <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
//                   <div className={`w-6 h-6 flex-shrink-0 transform transition-transform duration-200 ${faq.isOpen ? 'rotate-180' : ''}`}>
//                     <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </button>
//                 {faq.isOpen && (
//                   <div className="px-6 pb-6">
//                     <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced CTA Footer with Quote Form */}
//       <section className="relative py-20 bg-gray-50 overflow-hidden">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
            
//             {/* Left Side - CTA Content */}
//             <div className="space-y-8">
//               <div>
//                 <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//                   Ready to Protect Your
//                   <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
//                     Manufacturing Business?
//                   </span>
//                 </h2>
                
//                 <p className="text-xl text-gray-600 leading-relaxed mb-8">
//                   Join thousands of manufacturers who trust Moxie Risk Partners 
//                   for their insurance needs. Get your quote today and experience the difference 
//                   specialized manufacturing insurance expertise makes.
//                 </p>
//               </div>

//               {/* Contact Information Grid */}
//               <div className="grid md:grid-cols-1 gap-6">
                
//                 {/* Phone */}
//                 <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
//                   <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
//                     <Phone className="w-6 h-6 text-white" />
//                   </div>
//                   <h4 className="text-sm font-semibold text-gray-900 mb-1">Call Us Now</h4>
//                   <a href="tel:+18003265581" className="text-lg font-bold text-green-600 hover:text-green-700 transition-colors">
//                     (800) 326-5581
//                   </a>
//                   <p className="text-xs text-gray-500 mt-1">24/7 Available</p>
//                 </div>

//                 {/* Email */}
//                 <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
//                   <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mx-auto mb-3">
//                     <Mail className="w-6 h-6 text-white" />
//                   </div>
//                   <h4 className="text-sm font-semibold text-gray-900 mb-1">Email Us</h4>
//                   <a href="mailto:quotes@moxieriskpartners.com" className="text-lg font-bold text-purple-600 hover:text-purple-700 transition-colors break-all">
//                     quotes@moxieriskpartners.com
//                   </a>
//                   <p className="text-xs text-gray-500 mt-1">Quick Response</p>
//                 </div>

         
//               </div>
//             </div>

//             {/* Right Side - Quote Form */}
//             <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Shield className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Free Quote</h3>
//                 <p className="text-gray-600">Fast, competitive manufacturing insurance quotes</p>
//               </div>

//               <form onSubmit={handleFormSubmit} className="space-y-4">
                
//                 {/* Company Name */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Company Name *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
//                     placeholder="Your Company Name"
//                     value={formData.companyName}
//                     onChange={(e) => setFormData({...formData, companyName: e.target.value})}
//                     suppressHydrationWarning
//                   />
//                 </div>

//                 {/* Contact Name */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Contact Name *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
//                     placeholder="Your Full Name"
//                     value={formData.contactName}
//                     onChange={(e) => setFormData({...formData, contactName: e.target.value})}
//                     suppressHydrationWarning
//                   />
//                 </div>

//                 {/* Email and Phone Row */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Email *
//                     </label>
//                     <input
//                       type="email"
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
//                       placeholder="email@company.com"
//                       value={formData.email}
//                       onChange={(e) => setFormData({...formData, email: e.target.value})}
//                       suppressHydrationWarning
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Phone *
//                     </label>
//                     <input
//                       type="tel"
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
//                       placeholder="(555) 123-4567"
//                       value={formData.phone}
//                       onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                       suppressHydrationWarning
//                     />
//                   </div>
//                 </div>

//                 {/* Industry Type and Annual Revenue Row */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Industry Type *
//                     </label>
//                     <select
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900"
//                       value={formData.industryType}
//                       onChange={(e) => setFormData({...formData, industryType: e.target.value})}
//                       suppressHydrationWarning
//                     >
//                       <option value="" className="text-gray-500">Select Industry</option>
//                       <option value="food-beverage" className="text-gray-900">Food & Beverage</option>
//                       <option value="automotive" className="text-gray-900">Automotive</option>
//                       <option value="electronics" className="text-gray-900">Electronics</option>
//                       <option value="chemical" className="text-gray-900">Chemical</option>
//                       <option value="textile" className="text-gray-900">Textile</option>
//                       <option value="metal" className="text-gray-900">Metal & Machinery</option>
//                       <option value="other" className="text-gray-900">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Annual Revenue *
//                     </label>
//                     <select
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900"
//                       value={formData.annualRevenue}
//                       onChange={(e) => setFormData({...formData, annualRevenue: e.target.value})}
//                       suppressHydrationWarning
//                     >
//                       <option value="" className="text-gray-500">Select Revenue</option>
//                       <option value="under-1m" className="text-gray-900">Under $1M</option>
//                       <option value="1m-5m" className="text-gray-900">$1M - $5M</option>
//                       <option value="5m-25m" className="text-gray-900">$5M - $25M</option>
//                       <option value="25m-100m" className="text-gray-900">$25M - $100M</option>
//                       <option value="over-100m" className="text-gray-900">Over $100M</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group mt-6"
//                   suppressHydrationWarning
//                 >
//                   Get My Quote Now
//                   <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
//                 </button>

//                 {/* Trust Elements */}
//                 <div className="text-center mt-4 space-y-2">
//                   <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
//                     <CheckCircle className="w-4 h-4 text-green-500" />
//                     <span>100% Secure & Confidential</span>
//                   </div>
//                   <p className="text-xs text-gray-500">
//                     No spam, unsubscribe anytime. Licensed agents only.
//                   </p>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ManufacturingPage;







"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Clock, Users, Star, Phone, Mail, MapPin, Factory, Settings, Zap, Database, AlertTriangle, Cpu } from 'lucide-react';
import SuccessModal from '@/Components/successModal';

interface CoverageData {
  type: string;
  typeCode: string;
  title: string;
  description: string;
  commonApplications: string[];
  risksCovered: string[];
  whoNeedsIt: string[];
  coverageAmount: string;
  specialFeatures: string[];
  icon: React.ElementType;
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const ManufacturingPage = () => {
  const [selectedType, setSelectedType] = useState('product-liability');
  const [isVisible, setIsVisible] = useState(false);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      question: "What types of manufacturing insurance do I need?",
      answer: "Most manufacturing businesses need Product Liability, General Liability, Workers' Compensation, and Commercial Property insurance as core coverage. Additional coverage may include Equipment Breakdown, Cyber Liability, and Environmental Liability depending on your specific manufacturing operations and industry requirements.",
      isOpen: false
    },
    {
      question: "How much does manufacturing insurance cost?",
      answer: "Manufacturing insurance costs vary significantly based on your industry type, business size, annual revenue, and coverage needs. Product liability typically ranges from $500-$2,000 annually per $1M in coverage. Workers' compensation costs depend on your industry classification and typically range from 1-5% of payroll.",
      isOpen: false
    },
    {
      question: "Is product liability insurance required for manufacturers?",
      answer: "While not legally required in most states, product liability insurance is essential for manufacturers as it protects against costly lawsuits from product defects, design flaws, or injuries caused by your products. Many contracts and retailers require manufacturers to carry product liability coverage.",
      isOpen: false
    },
    {
      question: "What is equipment breakdown insurance and do I need it?",
      answer: "Equipment breakdown insurance covers the cost of repairing or replacing manufacturing equipment that breaks down due to mechanical, electrical, or pressure system failures. It also covers business interruption losses while equipment is being repaired. This coverage is crucial for manufacturers who rely on expensive machinery.",
      isOpen: false
    },
    {
      question: "How does my industry type affect my manufacturing insurance rates?",
      answer: "Different manufacturing industries have varying risk levels that directly impact insurance rates. Food manufacturing may have contamination risks, chemical manufacturing has environmental exposures, and automotive manufacturing faces product recall risks. Our specialists understand industry-specific risks and can recommend appropriate coverage.",
      isOpen: false
    }
  ]);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    industryType: '',
    annualRevenue: ''
  });

  // Modal state management
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      type: 'Product Liability',
      typeCode: 'product-liability',
      title: 'Product Liability Insurance',
      description: 'Comprehensive protection against manufacturing defects, design flaws, and product-related injuries or damages. Essential coverage for any business that manufactures, distributes, or sells products.',
      commonApplications: ['Manufacturing defects', 'Design errors', 'Product recalls', 'Consumer injuries', 'Property damage claims'],
      risksCovered: ['Manufacturing defect coverage', 'Design error protection', 'Product recall expenses', 'Legal defense costs', 'Settlement payments'],
      whoNeedsIt: ['All manufacturers', 'Product distributors', 'Private label producers', 'Component suppliers', 'Consumer goods companies'],
      coverageAmount: '$1M - $10M per occurrence',
      specialFeatures: ['Recall coverage', 'Worldwide territory', 'Defense cost coverage', 'Settlement authority'],
      icon: AlertTriangle
    },
    {
      type: 'General Liability',
      typeCode: 'general-liability',
      title: 'General Liability Insurance',
      description: 'Protection against third-party property damage, bodily injury, and premises liability claims from manufacturing operations. Core coverage for manufacturing facilities and operations.',
      commonApplications: ['Premises liability', 'Operations coverage', 'Visitor injuries', 'Property damage', 'Personal injury claims'],
      risksCovered: ['Premises liability coverage', 'Operations protection', 'Personal injury claims', 'Medical payments', 'Products-completed operations'],
      whoNeedsIt: ['Manufacturing facilities', 'Production operations', 'Warehouse operations', 'Distribution centers', 'All manufacturing businesses'],
      coverageAmount: '$1M - $5M per occurrence',
      specialFeatures: ['Blanket additional insured', 'Waiver of subrogation', 'Primary & non-contributory', 'Broad form coverage'],
      icon: Shield
    },
    {
      type: 'Equipment Breakdown',
      typeCode: 'equipment-breakdown',
      title: 'Equipment Breakdown Insurance',
      description: 'Specialized coverage for manufacturing equipment failure, machinery breakdown, and resulting business interruption. Critical protection for production-dependent businesses.',
      commonApplications: ['Machinery breakdown', 'Electrical failures', 'Mechanical breakdown', 'Computer equipment', 'Production interruption'],
      risksCovered: ['Machinery breakdown coverage', 'Business interruption', 'Expediting expenses', 'Spoilage coverage', 'Extra expense'],
      whoNeedsIt: ['Heavy manufacturers', 'Technology companies', 'Food processors', 'Chemical manufacturers', 'Equipment-dependent operations'],
      coverageAmount: 'Equipment replacement value',
      specialFeatures: ['24/7 claims support', 'Emergency repairs', 'Temporary replacement', 'Loss prevention services'],
      icon: Settings
    },
    {
      type: 'Commercial Property',
      typeCode: 'commercial-property',
      title: 'Commercial Property Insurance',
      description: 'Protect manufacturing facilities, inventory, raw materials, and finished goods from fire, theft, and natural disasters. Comprehensive asset protection for manufacturers.',
      commonApplications: ['Building protection', 'Equipment coverage', 'Inventory protection', 'Raw materials', 'Finished goods'],
      risksCovered: ['Fire & explosion', 'Weather damage', 'Theft & vandalism', 'Business interruption', 'Extra expense'],
      whoNeedsIt: ['Facility owners', 'Equipment lessees', 'Inventory holders', 'Multi-location operations', 'All manufacturers'],
      coverageAmount: 'Property replacement cost',
      specialFeatures: ['Agreed value coverage', 'Inflation guard', 'Debris removal', 'Ordinance & law coverage'],
      icon: Factory
    },
    {
      type: 'Cyber Liability',
      typeCode: 'cyber-liability',
      title: 'Cyber Liability Insurance',
      description: 'Protection against data breaches, cyber attacks, and technology-related risks in modern manufacturing operations. Essential for connected manufacturing environments.',
      commonApplications: ['Data breaches', 'Cyber attacks', 'System failures', 'Privacy violations', 'Business interruption'],
      risksCovered: ['Data breach response', 'Cyber extortion coverage', 'Business interruption', 'Regulatory fines', 'Credit monitoring'],
      whoNeedsIt: ['Connected manufacturers', 'IoT operations', 'Customer data holders', 'Cloud-based systems', 'Digital manufacturers'],
      coverageAmount: '$1M - $25M per claim',
      specialFeatures: ['Incident response team', '24/7 hotline', 'Forensic investigation', 'Public relations support'],
      icon: Cpu
    },
    {
      type: 'Environmental Liability',
      typeCode: 'environmental-liability',
      title: 'Environmental Liability Insurance',
      description: 'Coverage for pollution incidents, environmental cleanup, and regulatory compliance issues. Critical for manufacturers with environmental exposures.',
      commonApplications: ['Pollution incidents', 'Waste disposal', 'Chemical spills', 'Soil contamination', 'Regulatory violations'],
      risksCovered: ['Pollution cleanup', 'Third-party claims', 'Regulatory defense', 'Business interruption', 'Remediation costs'],
      whoNeedsIt: ['Chemical manufacturers', 'Industrial operations', 'Waste generators', 'Fuel storage operations', 'Heavy industry'],
      coverageAmount: '$1M - $50M per claim',
      specialFeatures: ['Gradual pollution coverage', 'Transportation coverage', 'Contractors coverage', 'Legal defense'],
      icon: Database
    }
  ];

  const industryCategories = [
    {
      title: "Food & Beverage",
      industries: ["Food Processing", "Beverage Production", "Packaging Operations", "Specialty Foods", "Organic Manufacturing"]
    },
    {
      title: "Automotive Manufacturing", 
      industries: ["Auto Parts Manufacturing", "Component Assembly", "Aftermarket Parts", "Automotive Electronics", "Supplier Operations"]
    },
    {
      title: "Electronics & Technology",
      industries: ["Electronic Components", "Consumer Electronics", "Industrial Equipment", "Semiconductor Manufacturing", "Technology Hardware"]
    },
    {
      title: "Chemical & Materials",
      industries: ["Chemical Processing", "Pharmaceutical Manufacturing", "Specialty Chemicals", "Raw Materials", "Industrial Coatings"]
    },
    {
      title: "Textile & Apparel",
      industries: ["Clothing Manufacturing", "Fabric Production", "Textile Processing", "Footwear Manufacturing", "Industrial Textiles"]
    },
    {
      title: "Metal & Machinery",
      industries: ["Metal Fabrication", "Machinery Manufacturing", "Industrial Equipment", "Tool Manufacturing", "Heavy Machinery"]
    }
  ];

  const consultingServices = [
    {
      title: "Proper Building Valuations",
      description: "Accurate replacement cost assessments for manufacturing facilities, ensuring adequate coverage limits and avoiding costly underinsurance gaps that could devastate your business.",
      icon: Factory
    },
    {
      title: "Business Income Analysis",
      description: "Expert evaluation of business interruption exposures and extra expense requirements, protecting your cash flow during production shutdowns and facility repairs.",
      icon: Clock
    },
    {
      title: "Employee Retention Cost Evaluation",
      description: "Comprehensive analysis of key employee replacement costs and retention strategies, helping you protect against talent loss and maintain operational continuity.",
      icon: Users
    },
    {
      title: "Grant & Funding Writing",
      description: "Professional grant writing services for manufacturing expansion, equipment upgrades, and safety improvements - accessing funding opportunities often overlooked by businesses.",
      icon: Star
    },
    {
      title: "Co-Bots Assessment",
      description: "Collaborative robotics evaluation and implementation planning, helping manufacturers safely integrate automation while managing liability and operational risks.",
      icon: Zap
    }
  ];

  const selectedCoverage = coverageTypes.find(coverage => coverage.typeCode === selectedType) || coverageTypes[0];

  const toggleFAQ = (index: number) => {
    setFaqItems(prev => prev.map((item, idx) => ({
      ...item,
      isOpen: idx === index ? !item.isOpen : false
    })));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Start submitting state
    setIsSubmitting(true);
    
    try {
      console.log('Manufacturing insurance form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success modal with confetti
      setShowSuccessModal(true);
      setShowConfetti(true);
      
      // Reset form
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        industryType: '',
        annualRevenue: ''
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle error state here if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowConfetti(false);
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
                  src="/images/manufacHero1.png" 
                  alt="Manufacturing professional working with equipment"
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
                    Manufacturing
                    <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                      Insurance Solutions
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                    Comprehensive protection for manufacturers across all industries. Specialized coverage for 
                    product liability, equipment breakdown, and operational risks.
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {[
                    'All Manufacturing Types',
                    'Product Liability Experts',
                    'Equipment Protection'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                      <span className="text-lg font-medium text-gray-800">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group"
                    suppressHydrationWarning={true}
                  >
                    Get Your Quote
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  
                  <a href="tel:+18003265581" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center">
                    Call (800) 326-5581
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Options Selector Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header - Left Aligned */}
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Choose Your Manufacturing Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              From product liability to equipment breakdown, we provide comprehensive insurance 
              solutions tailored to your specific manufacturing operations and industry requirements.
            </p>
          </div>

          {/* Coverage Type Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {coverageTypes.map((coverage) => {
              const IconComponent = coverage.icon;
              return (
                <button
                  key={coverage.typeCode}
                  onClick={() => handleTypeSelection(coverage.typeCode)}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    selectedType === coverage.typeCode
                      ? 'border-orange-600 bg-orange-50 shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-orange-300'
                  }`}
                  suppressHydrationWarning={true}
                >
                  <div className="text-center">
                    <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                      <IconComponent 
                        className={`w-12 h-12 transition-all duration-300 ${
                          selectedType === coverage.typeCode ? 'text-orange-600' : 'text-gray-600'
                        } group-hover:scale-110`}
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
              );
            })}
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
              
              {/* Common Applications */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-orange-200">
                  Common Applications
                </h4>
                <div className="space-y-2">
                  {selectedCoverage.commonApplications.map((application, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{application}</span>
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

      {/* Risk Management Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Risk Management Services
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Strategic business advisory services that differentiate us from traditional insurance agents. 
              We're your comprehensive risk management partner, not just your insurance provider.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultingServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <div key={service.title} className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Served Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Industries Served
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mb-6">
              Specialized insurance solutions for every manufacturing sector and production type
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryCategories.map((category) => (
              <div key={category.title} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-200">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.industries.map((industry) => (
                    <li key={industry} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{industry}</span>
                    </li>
                  ))}
                </ul>
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
              Manufacturing Insurance FAQs
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Common questions about manufacturing insurance coverage, costs, and requirements
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                <button
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={faq.isOpen}
                  suppressHydrationWarning={true}
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

      {/* Enhanced CTA Footer with Quote Form */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - CTA Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Ready to Protect Your
                  <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                    Manufacturing Business?
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Join thousands of manufacturers who trust Moxie Risk Partners 
                  for their insurance needs. Get your quote today and experience the difference 
                  specialized manufacturing insurance expertise makes.
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
                  <a href="tel:+18003265581" className="text-lg font-bold text-green-600 hover:text-green-700 transition-colors">
                    (800) 326-5581
                  </a>
                  <p className="text-xs text-gray-500 mt-1">24/7 Available</p>
                </div>

                {/* Email */}
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Email Us</h4>
                  <a href="mailto:quotes@moxieriskpartners.com" className="text-lg font-bold text-purple-600 hover:text-purple-700 transition-colors break-all">
                    quotes@moxieriskpartners.com
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Quick Response</p>
                </div>

         
              </div>
            </div>

            {/* Right Side - Quote Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Free Quote</h3>
                <p className="text-gray-600">Fast, competitive manufacturing insurance quotes</p>
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
                    suppressHydrationWarning={true}
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
                    suppressHydrationWarning={true}
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
                      suppressHydrationWarning={true}
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
                      suppressHydrationWarning={true}
                    />
                  </div>
                </div>

                {/* Industry Type and Annual Revenue Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Industry Type *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900"
                      value={formData.industryType}
                      onChange={(e) => setFormData({...formData, industryType: e.target.value})}
                      suppressHydrationWarning={true}
                    >
                      <option value="" className="text-gray-500">Select Industry</option>
                      <option value="food-beverage" className="text-gray-900">Food & Beverage</option>
                      <option value="automotive" className="text-gray-900">Automotive</option>
                      <option value="electronics" className="text-gray-900">Electronics</option>
                      <option value="chemical" className="text-gray-900">Chemical</option>
                      <option value="textile" className="text-gray-900">Textile</option>
                      <option value="metal" className="text-gray-900">Metal & Machinery</option>
                      <option value="other" className="text-gray-900">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Annual Revenue *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900"
                      value={formData.annualRevenue}
                      onChange={(e) => setFormData({...formData, annualRevenue: e.target.value})}
                      suppressHydrationWarning={true}
                    >
                      <option value="" className="text-gray-500">Select Revenue</option>
                      <option value="under-1m" className="text-gray-900">Under $1M</option>
                      <option value="1m-5m" className="text-gray-900">$1M - $5M</option>
                      <option value="5m-25m" className="text-gray-900">$5M - $25M</option>
                      <option value="25m-100m" className="text-gray-900">$25M - $100M</option>
                      <option value="over-100m" className="text-gray-900">Over $100M</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group mt-6"
                  suppressHydrationWarning={true}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get My Quote Now
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
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

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        showConfetti={showConfetti}
      />
    </div>
  );
};

export default ManufacturingPage;