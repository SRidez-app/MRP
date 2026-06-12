"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Clock, Users, Star, Phone, Mail, MapPin, Truck, Factory, Building, Heart, AlertTriangle, FileText } from 'lucide-react';

interface ClaimType {
  id: string;
  title: string;
  description: string;
  services: string[];
  footerText: string;
  icon: React.ElementType;
}

const ContactPage = () => {
  const [selectedClaimType, setSelectedClaimType] = useState('trucking');
  const [isVisible, setIsVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
const [showThankYou, setShowThankYou] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  hearAbout: '',
  insuranceNeeds: ''
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

  const claimTypes: ClaimType[] = [
    {
      id: 'trucking',
      title: 'Trucking & Transportation Claims',
      description: 'Specialized claims support for trucking companies, owner-operators, and transportation businesses. Our team understands the complexities of commercial transportation claims.',
      services: [
        'Motor Truck Cargo Claims',
        'Commercial Auto Liability',
        'Physical Damage Claims',
        'Bobtail & Non-Trucking Liability',
        'General Liability Claims'
      ],
      footerText: 'Our transportation specialists are available 24/7 to handle your trucking claims with expertise and urgency.',
      icon: Truck
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing Claims',
      description: 'Comprehensive claims support for manufacturing operations, including product liability, equipment breakdown, and facility damage claims.',
      services: [
        'Product Liability Claims',
        'Equipment Breakdown',
        'Property Damage Claims',
        'Business Interruption',
        'Workers\' Compensation'
      ],
      footerText: 'Our manufacturing claims team provides rapid response and specialized knowledge for industrial operations.',
      icon: Factory
    },
    {
      id: 'public-entity',
      title: 'Public Entity Claims',
      description: 'Specialized claims handling for government entities, municipalities, and public organizations with unique regulatory requirements.',
      services: [
        'Public Officials Liability',
        'Employment Practices Liability',
        'Law Enforcement Liability',
        'Property Claims',
        'Constitutional Rights Coverage'
      ],
      footerText: 'Our public sector claims specialists understand government operations and compliance requirements.',
      icon: Building
    },
    {
      id: 'nonprofit',
      title: 'Non-Profit Claims',
      description: 'Tailored claims support for non-profit organizations, understanding the unique challenges and budget considerations of the sector.',
      services: [
        'General Liability Claims',
        'Directors & Officers',
        'Volunteer Accident Coverage',
        'Property Claims',
        'Event Liability'
      ],
      footerText: 'Our non-profit claims team provides compassionate, efficient service tailored to mission-driven organizations.',
      icon: Heart
    }
  ];

  const selectedClaim = claimTypes.find(claim => claim.id === selectedClaimType) || claimTypes[0];

const handleFormSubmit = async (e: React.MouseEvent) => {
  e.preventDefault();
  
  // Validate required fields
  if (!formData.firstName || !formData.lastName || !formData.email || 
      !formData.phone || !formData.hearAbout || !formData.insuranceNeeds) {
    alert('Please fill in all required fields');
    return;
  }
  
    setIsSubmitting(true);

  try {
    console.log('Submitting contact form...', formData);
    
    // Build payload for Momentum API
    const momentumPayload = {
      // Contact Info - Use contactName combining first + last
      contactName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      
      // Business Info
      companyName: formData.company || 'Not Provided',
      
      // Form metadata
      formType: 'Contact Page Inquiry',
      source: 'Contact Page Form',
      leadSource: formData.hearAbout,
      
      // Industry - general since this is contact form
      industry: 'general-inquiry',
      
      // Description field with all details
      description: `Contact Page Inquiry

Contact: ${formData.firstName} ${formData.lastName}
Company: ${formData.company || 'Not Provided'}
Email: ${formData.email}
Phone: ${formData.phone}
How they heard about us: ${formData.hearAbout}

Insurance Needs:
${formData.insuranceNeeds}

Source: Contact Page Form`
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
      console.log('✓ Contact form submitted successfully!');
      
      // Show success message
      setFormSubmitted(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        hearAbout: '',
        insuranceNeeds: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
      
    } else {
      alert(`Error submitting form: ${result.message}\n\nPlease call (515) 581-7187`);
    }
    
  } catch (error) {
    console.error('Error:', error);
    alert('Unable to submit. Please call (515) 581-7187 for immediate assistance.');
  } finally {
    // ✅ This runs whether success or error
    setIsSubmitting(false);
  }
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClaimTypeChange = (claimId: string) => {
    setSelectedClaimType(claimId);
  };

const renderThankYou = () => (
  <div className="min-h-screen bg-white py-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-8">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Thank You for Reaching Out!</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            We've received your message and our team will contact you within 24 hours to discuss your insurance needs.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">What happens next?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Review</h4>
              <p className="text-gray-600">Our team reviews your inquiry and prepares information</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Personalization</h4>
              <p className="text-gray-600">We customize solutions based on your specific needs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Contact</h4>
              <p className="text-gray-600">We reach out to discuss your options and answer questions</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#B8893D] to-[#B8893D] rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Need immediate assistance?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+15155817187" 
              className="bg-white text-[#B8893D] hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center cursor-pointer"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (515) 581-7187
            </a>
            <a 
              href="mailto:info@moxieriskpartners.com"
              className="border-2 border-white text-white hover:bg-white hover:text-[#B8893D] px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center cursor-pointer"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

if (showThankYou) {
  return renderThankYou();
}

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
                  src="/images/contactus.png" 
                  alt="Professional insurance team ready to help with your coverage needs"
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
                    Contact
                    <span className="block text-transparent bg-gradient-to-r from-[#B8893D] to-[#B8893D] bg-clip-text">
                      Our Team
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                    Let's discuss your insurance needs. Our experienced team provides fast, competitive 
                    quotes and answers all your questions. Get personalized coverage recommendations in minutes, 
                    not days.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-4">
                  <a
                    href="mailto:info@moxieriskpartners.com"
                    className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors duration-200 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Email Us</p>
                      <p className="text-lg font-bold text-purple-600 group-hover:text-purple-700">info@moxieriskpartners.com</p>
                    </div>
                  </a>

                  <a
                    href="tel:+15155817187"
                    className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors duration-200 group"
                  >
 <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Call Us</p>
                      <p className="text-lg font-bold text-green-600 group-hover:text-green-700">(515) 581-7187</p>
                    </div>
                  </a>
                </div>

                {/* Help Text */}
                <div className="bg-[#FBF5EB] p-4 rounded-lg border border-[#E5CFA5]">
                  <p className="text-[#8A6528] font-semibold text-center">
                    24/7 Help available! Get in touch with our dedicated team now.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Claims Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight text-center">
              Reporting a Claim?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto text-center mb-6">
              Choose your industry below for specialized claims support tailored to your business needs
            </p>
          </div>

          {/* Claim Type Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {claimTypes.map((claimType) => {
              const IconComponent = claimType.icon;
              return (
                <button
                  key={claimType.id}
                  onClick={() => handleClaimTypeChange(claimType.id)}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    selectedClaimType === claimType.id
                      ? 'border-[#B8893D] bg-[#FBF5EB] shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-[#B8893D]'
                  }`}
                  suppressHydrationWarning={true}
                >
                  <div className="text-center">
                    <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                      <IconComponent 
                        className={`w-12 h-12 transition-all duration-300 ${
                          selectedClaimType === claimType.id ? 'text-[#B8893D]' : 'text-gray-600'
                        } group-hover:scale-110`}
                      />
                    </div>
                    <h3 className={`text-sm font-bold transition-colors ${
                      selectedClaimType === claimType.id ? 'text-[#B8893D]' : 'text-gray-800'
                    }`}>
                      {claimType.title.replace(' Claims', '')}
                    </h3>
                  </div>
                  
                  {/* Selected Indicator */}
                  {selectedClaimType === claimType.id && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#B8893D] rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Claim Details Panel */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-12">
            
            {/* Claim Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-8 pb-6 border-b-2 border-[#F0E2C8]">
              <div className="mb-4 lg:mb-0">
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {selectedClaim.title}
                </h3>
              </div>
            </div>

            {/* Claim Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-4xl">
              {selectedClaim.description}
            </p>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {selectedClaim.services.map((service, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-[#FBF5EB] rounded-lg border border-[#E5CFA5]">
                  <CheckCircle className="w-5 h-5 text-[#B8893D] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{service}</span>
                </div>
              ))}
            </div>

            {/* Footer Text and CTA */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-700 mb-4">
                <strong>Report a claim 24/7:</strong> {selectedClaim.footerText}
              </p>
              <a 
                href="/file-claims" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#B8893D] to-[#B8893D] hover:from-[#A87A32] hover:to-[#9A7030] text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Claims Support
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Get Your Free Quote!
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Fill out the form below and get an insurance expert to discuss coverage or quotes within 24 hours. 
              All information is kept confidential and secure.
            </p>
          </div>

          {/* Success Message */}
          {formSubmitted && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div className="text-center">
                  <h3 className="text-lg font-bold text-green-900">Thank You!</h3>
                  <p className="text-green-700">Your request has been submitted successfully. Someone will reach out to you shortly to discuss your insurance needs.</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-[#FBF5EB] to-[#F5EDE0] rounded-2xl p-8 border border-gray-200 shadow-lg">
            
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8893D] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500 bg-white"
                  placeholder="Your First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  suppressHydrationWarning={true}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8893D] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500 bg-white"
                  placeholder="Your Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  suppressHydrationWarning={true}
                />
              </div>
            </div>

            {/* Email and Phone Row */}
{/* Email and Phone Row */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Email Address *
    </label>
    <input
      type="email"
      name="email"
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8893D] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500 bg-white"
      placeholder="email@company.com"
      value={formData.email}
      onChange={handleInputChange}
      suppressHydrationWarning={true}
    />
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Phone Number *
    </label>
    <input
      type="tel"
      name="phone"
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8893D] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500 bg-white"
      placeholder="(555) 123-4567"
      value={formData.phone}
      onChange={handleInputChange}
      suppressHydrationWarning={true}
    />
  </div>
</div>

            {/* Company Name */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8893D] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500 bg-white"
                placeholder="Your Company Name"
                value={formData.company}
                onChange={handleInputChange}
                suppressHydrationWarning={true}
              />
            </div>

            {/* How did you hear about us */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                How did you hear about us? *
              </label>
              <select
                name="hearAbout"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8893D] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500 bg-white"
                value={formData.hearAbout}
                onChange={handleInputChange}
                suppressHydrationWarning={true}
              >
                <option value="">Select an option...</option>
                <option value="google">Google Search</option>
                <option value="facebook">Facebook</option>
                <option value="linkedin">LinkedIn</option>
                <option value="referral">Referral</option>
                <option value="industry-event">Industry Event</option>
                <option value="email">Email</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Insurance Needs */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tell us about your insurance needs *
              </label>
              <textarea
                name="insuranceNeeds"
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8893D] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500 resize-vertical bg-white"
                placeholder="Please describe your operation, number of vehicles, types of coverage needed, current insurance challenges, etc."
                value={formData.insuranceNeeds}
                onChange={handleInputChange}
                suppressHydrationWarning={true}
              />
            </div>

            {/* Submit Button */}
        <button
  type="button"
  onClick={handleFormSubmit}
  disabled={isSubmitting}
  className="w-full bg-gradient-to-r from-[#B8893D] to-[#B8893D] hover:from-[#A87A32] hover:to-[#9A7030] disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group mb-4 cursor-pointer disabled:cursor-not-allowed disabled:transform-none"
  suppressHydrationWarning={true}
>
  {isSubmitting ? (
    <>
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
      Submitting...
    </>
  ) : (
    <>
      GET MY FREE QUOTE
      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
    </>
  )}
</button>

            {/* Disclaimer */}
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              By clicking "Get My Free Quote", you authorize Moxie Risk Partners to contact you with offers and information. 
              No coverage exists until a policy is issued and premium is paid.
            </p>
         </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;