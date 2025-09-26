"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Phone, Mail, HelpCircle, Users, Factory, HardHat, Building, Heart, FileText, Gavel } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
  category: string;
}

const FAQPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    // Claims FAQs
    {
      question: "How quickly should I report a claim?",
      answer: "Immediately. Our 24/7 hotline ensures you can report anytime for all business types. Quick reporting preserves evidence and activates our industry-specialized response team.",
      isOpen: false,
      category: "claims"
    },
    {
      question: "What information do I need to report a claim?",
      answer: "Policy number, incident details, location, photos, and contact information. Additional details vary by industry: trucking requires DOT numbers and cargo details, construction needs project information, manufacturing requires equipment details.",
      isOpen: false,
      category: "claims"
    },
    {
      question: "What makes your claims service different?",
      answer: "Industry-specialized adjusters for trucking, construction, and manufacturing. 1-hour response guarantee, A+ AM Best rating, and 98.7% customer satisfaction with nationwide coverage. Every claim is unique - call our experts to discuss your specific situation and timeline.",
      isOpen: false,
      category: "claims"
    },
    {
      question: "Will my rates increase after filing a claim?",
      answer: "Not all claims affect rates. Comprehensive claims (weather, theft) typically don't impact pricing regardless of your industry. We focus on loss prevention programs to minimize rate impacts.",
      isOpen: false,
      category: "claims"
    },
    {
      question: "Do you handle claims for all business types?",
      answer: "Yes. We provide comprehensive claims support nationwide for trucking, construction, manufacturing, and all commercial business types through our network of specialized adjusters.",
      isOpen: false,
      category: "claims"
    },

    // Construction FAQs
    {
      question: "What construction insurance do I need?",
      answer: "Most construction businesses need General Liability, Workers' Compensation, and Commercial Auto as core coverage. Additional requirements vary by state, project type, and contracts.",
      isOpen: false,
      category: "construction"
    },
    {
      question: "How much does construction insurance cost?",
      answer: "Costs vary by trade, experience, and location. General liability typically ranges $400-$1,500 annually per $100K revenue. Workers' comp is 2-15% of payroll depending on classification.",
      isOpen: false,
      category: "construction"
    },
    {
      question: "Do subcontractors need their own insurance?",
      answer: "Yes, subcontractors typically need General Liability, Workers' Compensation, and Commercial Auto. You'll need certificates of insurance and may add the GC as additional insured.",
      isOpen: false,
      category: "construction"
    },
    {
      question: "What is Builder's Risk insurance?",
      answer: "Builder's Risk protects construction projects during building from fire, wind, theft, and vandalism. Required for new construction and major renovations, covering structure, materials, and equipment.",
      isOpen: false,
      category: "construction"
    },
    {
      question: "How does EMR affect my premiums?",
      answer: "Experience Modification Rate directly impacts Workers' Comp premiums and bidding ability. Below 1.0 reduces costs, above 1.0 increases them. We help manage EMR through safety programs.",
      isOpen: false,
      category: "construction"
    },

    // Manufacturing FAQs
    {
      question: "What types of manufacturing insurance do I need?",
      answer: "Most manufacturing businesses need Product Liability, General Liability, Workers' Compensation, and Commercial Property insurance as core coverage. Additional coverage may include Equipment Breakdown, Cyber Liability, and Environmental Liability depending on your specific manufacturing operations and industry requirements.",
      isOpen: false,
      category: "manufacturing"
    },
    {
      question: "How much does manufacturing insurance cost?",
      answer: "Manufacturing insurance costs vary significantly based on your industry type, business size, annual revenue, and coverage needs. Product liability typically ranges from $500-$2,000 annually per $1M in coverage. Workers' compensation costs depend on your industry classification and typically range from 1-5% of payroll.",
      isOpen: false,
      category: "manufacturing"
    },
    {
      question: "Is product liability insurance required for manufacturers?",
      answer: "While not legally required in most states, product liability insurance is essential for manufacturers as it protects against costly lawsuits from product defects, design flaws, or injuries caused by your products. Many contracts and retailers require manufacturers to carry product liability coverage.",
      isOpen: false,
      category: "manufacturing"
    },
    {
      question: "What is equipment breakdown insurance and do I need it?",
      answer: "Equipment breakdown insurance covers the cost of repairing or replacing manufacturing equipment that breaks down due to mechanical, electrical, or pressure system failures. It also covers business interruption losses while equipment is being repaired. This coverage is crucial for manufacturers who rely on expensive machinery.",
      isOpen: false,
      category: "manufacturing"
    },
    {
      question: "How does my industry type affect my manufacturing insurance rates?",
      answer: "Different manufacturing industries have varying risk levels that directly impact insurance rates. Food manufacturing may have contamination risks, chemical manufacturing has environmental exposures, and automotive manufacturing faces product recall risks. Our specialists understand industry-specific risks and can recommend appropriate coverage.",
      isOpen: false,
      category: "manufacturing"
    },

    // Workers Compensation FAQs
    {
      question: "Is workers' compensation insurance required for my business?",
      answer: "Workers' compensation requirements vary by state, but most states require coverage if you have employees. Some states have different thresholds (like 3+ employees), and certain industries have specific requirements. Independent contractors typically aren't covered, but misclassification can result in penalties. We help ensure you meet your state's specific requirements.",
      isOpen: false,
      category: "workers-comp"
    },
    {
      question: "How much does workers' compensation insurance cost?",
      answer: "Workers' comp costs are calculated based on your industry classification code, payroll, and claims history. Rates typically range from $0.50 to $5.00 per $100 of payroll, depending on risk level. High-risk industries like construction or manufacturing pay more than office environments. Your experience modification rate (EMR) can significantly impact costs based on your safety record.",
      isOpen: false,
      category: "workers-comp"
    },
    {
      question: "What does workers' compensation insurance cover?",
      answer: "Workers' comp covers medical expenses, lost wages (typically 60-70% of salary), disability benefits, and rehabilitation costs for work-related injuries or illnesses. It also provides death benefits for families of workers killed on the job. Coverage includes both immediate injuries and occupational diseases that develop over time from workplace exposures.",
      isOpen: false,
      category: "workers-comp"
    },
    {
      question: "How do I file a workers' compensation claim?",
      answer: "Report the injury to your employer immediately (within 24-48 hours in most states). Seek medical attention from an approved provider if possible. Your employer should provide claim forms and report to their insurance carrier. Document everything and keep copies of all medical records. We provide 24/7 claims support to guide you through the process.",
      isOpen: false,
      category: "workers-comp"
    },
    {
      question: "Can I be sued if I have workers' compensation coverage?",
      answer: "Workers' comp provides legal protection by preventing employees from suing for workplace injuries in most cases. This 'exclusive remedy' protection means employees receive guaranteed benefits but generally cannot pursue additional damages through lawsuits. However, intentional acts or gross negligence may not be protected.",
      isOpen: false,
      category: "workers-comp"
    },
    {
      question: "How can I reduce my workers' compensation premiums?",
      answer: "Implement comprehensive safety programs, provide regular employee training, maintain good claims management, conduct return-to-work programs, and work with experienced brokers to ensure proper classification codes. Regular safety audits and prompt injury reporting can improve your experience modification rate and reduce premiums over time.",
      isOpen: false,
      category: "workers-comp"
    },
    {
      question: "What items do I need in order to get a workers compensation quote?",
      answer: "To get an accurate workers compensation quote, you'll need: your business's federal tax ID number, detailed job descriptions and classification codes for all employees, current and projected annual payroll by job classification, your experience modification rate (EMR) if available, previous workers comp policy information, claims history for the past 3-5 years, and information about your safety programs and training procedures.",
      isOpen: false,
      category: "workers-comp"
    },

    // Non-Profit FAQs
    {
      question: "What insurance coverage do nonprofits need?",
      answer: "Nonprofits typically need General Liability, Directors & Officers, Professional Liability, and cyber liability insurance. Many also require Employment Practices Liability and specific coverage for volunteer activities.",
      isOpen: false,
      category: "nonprofit"
    },
    {
      question: "How can employee engagement reduce insurance costs?",
      answer: "Engaged employees have 70% fewer safety incidents, reducing workers' compensation claims. They also create better workplace culture, lowering Employment Practices Liability exposure and improving retention rates.",
      isOpen: false,
      category: "nonprofit"
    },
    {
      question: "Why do nonprofits need cybersecurity assessments?",
      answer: "27% of nonprofits worldwide have experienced cyberattacks, yet 70% have no documented cybersecurity policies. Assessments protect donor data, ensure compliance, and reduce cyber insurance premiums.",
      isOpen: false,
      category: "nonprofit"
    },
    {
      question: "How does grant writing connect to insurance?",
      answer: "Many grants require comprehensive insurance documentation, risk assessment plans, and compliance frameworks. Our integrated approach addresses both funding requirements and risk management needs.",
      isOpen: false,
      category: "nonprofit"
    },
    {
      question: "What makes nonprofit building valuations different?",
      answer: "Nonprofit valuations address unique challenges like mixed-use buildings, donated properties, historic structures, and grant compliance requirements that standard appraisals don't cover.",
      isOpen: false,
      category: "nonprofit"
    },

    // Public Entity FAQs
    {
      question: "What insurance coverage do public entities need?",
      answer: "Public entities typically need Public Officials Liability, Employment Practices Liability, Law Enforcement Liability, Constitutional Rights Coverage, and comprehensive property insurance. Coverage varies by entity type and services provided.",
      isOpen: false,
      category: "public-entity"
    },
    {
      question: "How does succession planning reduce operational risk?",
      answer: "Succession planning ensures service continuity during leadership transitions, reduces key person dependencies, and maintains institutional knowledge. This directly impacts insurance claims related to service disruptions and governance issues.",
      isOpen: false,
      category: "public-entity"
    },
    {
      question: "Why are risk assessments critical for government entities?",
      answer: "Public entities face unique risks including constitutional rights violations, law enforcement liability, and public safety responsibilities. Comprehensive risk assessments using COSO and ISO frameworks help identify and mitigate these exposures.",
      isOpen: false,
      category: "public-entity"
    },
    {
      question: "How do building valuations support FEMA compliance?",
      answer: "Accurate property valuations are essential for FEMA Public Assistance Program eligibility and disaster recovery funding calculations. They also ensure adequate insurance coverage for federal assistance requirements.",
      isOpen: false,
      category: "public-entity"
    },
    {
      question: "What makes public entity disaster planning different?",
      answer: "Government disaster planning must address whole community engagement, critical infrastructure protection, and federal framework compliance including NIMS, National Response Framework, and Emergency Management Assistance Compact requirements.",
      isOpen: false,
      category: "public-entity"
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

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'claims', name: 'Claims', icon: Shield },
    { id: 'construction', name: 'Construction', icon: HardHat },
    { id: 'manufacturing', name: 'Manufacturing', icon: Factory },
    { id: 'workers-comp', name: 'Workers Comp', icon: Users },
    { id: 'nonprofit', name: 'Non-Profit', icon: Heart },
    { id: 'public-entity', name: 'Public Entity', icon: Building }
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setFaqItems(prev => prev.map((item, idx) => ({
      ...item,
      isOpen: idx === index ? !item.isOpen : false
    })));
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-white py-12 lg:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/faq.png" 
            alt="FAQ - Frequently asked questions about insurance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Frequently Asked
              <span className="block text-transparent bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text">
                Questions
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8 max-w-4xl mx-auto">
              Get answers to common questions about insurance coverage, claims, and industry-specific requirements.
            </p>

            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-white/90 font-semibold">
                Can't find what you're looking for? Contact our experts directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse by Category</h2>
            <p className="text-gray-600">Select a category to find specific answers to your questions</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    selectedCategory === category.id
                      ? 'border-orange-600 bg-orange-50 shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-orange-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="mb-3 mx-auto w-12 h-12 flex items-center justify-center">
                      <IconComponent 
                        className={`w-8 h-8 transition-all duration-300 ${
                          selectedCategory === category.id ? 'text-orange-600' : 'text-gray-600'
                        } group-hover:scale-110`}
                      />
                    </div>
                    <h3 className={`text-sm font-bold transition-colors ${
                      selectedCategory === category.id ? 'text-orange-600' : 'text-gray-800'
                    }`}>
                      {category.name}
                    </h3>
                  </div>
                  
                  {/* Selected Indicator */}
                  {selectedCategory === category.id && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {selectedCategory === 'all' ? 'All Questions' : categories.find(c => c.id === selectedCategory)?.name + ' Questions'}
            </h2>
            <p className="text-xl text-gray-600">
              {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <button
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  onClick={() => toggleFAQ(faqItems.findIndex(item => item === faq))}
                  aria-expanded={faq.isOpen}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-2 h-2 rounded-full ${
                        faq.category === 'claims' ? 'bg-blue-500' :
                        faq.category === 'construction' ? 'bg-orange-500' :
                        faq.category === 'manufacturing' ? 'bg-purple-500' :
                        faq.category === 'workers-comp' ? 'bg-green-500' :
                        faq.category === 'nonprofit' ? 'bg-pink-500' :
                        faq.category === 'public-entity' ? 'bg-indigo-500' : 'bg-gray-500'
                      }`}></div>
                    </div>
                    <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                  </div>
                  <div className={`w-6 h-6 flex-shrink-0 transform transition-transform duration-200 ${faq.isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {faq.isOpen && (
                  <div className="px-6 pb-6 pl-12">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600">Try selecting a different category or contact us directly.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg--50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 lg:p-12 border border-orange-200 shadow-lg">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900">Still Have Questions?</h3>
              
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                Our insurance experts are here to help with personalized answers to your specific questions. 
                Contact us directly for detailed guidance on your insurance needs.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                
                {/* Phone */}
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <a href="tel:+18003265581" className="block">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform cursor-pointer">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                  </a>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Call Us Now</h4>
                  <a href="tel:+18003265581" className="text-lg font-bold text-green-600 hover:text-green-700 transition-colors">
                    (800) 326-5581
                  </a>
                  <p className="text-xs text-gray-500 mt-1">24/7 Available</p>
                </div>

                {/* Email */}
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                  <a href="mailto:info@moxieriskpartners.com" className="block">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform cursor-pointer">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                  </a>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Email Us</h4>
                  <a href="mailto:infos@moxieriskpartners.com" className="text-lg font-bold text-purple-600 hover:text-purple-700 transition-colors break-all">
                    info@moxieriskpartners.com
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Quick Response</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* <a 
                  href="/contact" 
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group"
                >
                  Get Personal Help
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;