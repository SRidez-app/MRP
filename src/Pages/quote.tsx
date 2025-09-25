"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, Shield, Phone, MessageSquare, Clock, Star } from 'lucide-react';


interface QuoteFormData {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  fleetSize: string;
  primaryCargo: string;
  domiciledState: string;
  yearsInBusiness: string;
  previousClaims: string;
  currentInsurance: string;
  desiredStartDate: string;
  additionalInfo: string;
}

const QuotePage: React.FC = () => {
  const [formData, setFormData] = useState<QuoteFormData>({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    fleetSize: '',
    primaryCargo: '',
    domiciledState: '',
    yearsInBusiness: '',
    previousClaims: '',
    currentInsurance: '',
    desiredStartDate: '',
    additionalInfo: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // All US states for the domiciled state dropdown
  const allStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Quote submitted:', formData);
    
    setIsSubmitting(false);
    setCurrentStep(4); // Show thank you step
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.businessName && formData.contactName && formData.phone && formData.email);
      case 2:
        return !!(formData.fleetSize && formData.primaryCargo && formData.domiciledState);
      case 3:
        return !!(formData.yearsInBusiness && formData.previousClaims);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < 3 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderProgressBar = () => (
    <div className="w-full max-w-2xl mx-auto mb-12">
      {/* Progress Track */}
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {[1, 2, 3].map(step => (
            <div key={step} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  currentStep > step 
                    ? 'bg-green-500 text-white' 
                    : currentStep === step 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {currentStep > step ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  step
                )}
              </div>
              <span className={`text-sm font-medium mt-2 ${
                currentStep >= step ? 'text-orange-600' : 'text-gray-500'
              }`}>
                {step === 1 && 'Contact Info'}
                {step === 2 && 'Business Details'}
                {step === 3 && 'Insurance History'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
        <p className="text-lg text-gray-600">Let's start with your basic information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="space-y-2">
          <label htmlFor="businessName" className="block text-sm font-semibold text-gray-700">
            Business Name *
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900 placeholder-gray-500"
            placeholder="e.g., ABC Trucking LLC"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contactName" className="block text-sm font-semibold text-gray-700">
            Contact Name *
          </label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900 placeholder-gray-500"
            placeholder="Your full name"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900 placeholder-gray-500"
            placeholder="(555) 123-4567"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900 placeholder-gray-500"
            placeholder="your@email.com"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Business Operations</h2>
        <p className="text-lg text-gray-600">Tell us about your trucking operation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="space-y-2">
          <label htmlFor="fleetSize" className="block text-sm font-semibold text-gray-700">
            Fleet Size *
          </label>
          <select
            id="fleetSize"
            name="fleetSize"
            value={formData.fleetSize}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900"
            required
          >
            <option value="">Select fleet size</option>
            <option value="2-9">2-9 Non-Fleet</option>
            <option value="10-50">10-50 Mid-Fleet</option>
            <option value="50-100">50-100 Large Fleet</option>
            <option value="100+">100+ Enterprise</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="primaryCargo" className="block text-sm font-semibold text-gray-700">
            Primary Cargo Type *
          </label>
          <select
            id="primaryCargo"
            name="primaryCargo"
            value={formData.primaryCargo}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900"
            required
          >
            <option value="">Select cargo type</option>
            <option value="dry-van">Dry Van</option>
            <option value="reefer">Reefer (Refrigerated)</option>
            <option value="flatbed">Flatbed</option>
            <option value="intermodal">Intermodal</option>
            <option value="ltl">LTL (Less Than Truckload)</option>
            <option value="hazmat">Hazmat</option>
            <option value="oversized">Oversized/Heavy Haul</option>
            <option value="mixed">Mixed Freight</option>
          </select>
        </div>

        <div className="md:col-span-2 space-y-2">
          <label htmlFor="domiciledState" className="block text-sm font-semibold text-gray-700">
            State of Domicile *
          </label>
          <select
            id="domiciledState"
            name="domiciledState"
            value={formData.domiciledState}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900"
            required
          >
            <option value="">Select your domiciled state</option>
            {allStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <p className="text-sm text-gray-500">The state where your business is legally domiciled</p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Insurance Background</h2>
        <p className="text-lg text-gray-600">Help us understand your insurance history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="space-y-2">
          <label htmlFor="yearsInBusiness" className="block text-sm font-semibold text-gray-700">
            Years in Business *
          </label>
          <select
            id="yearsInBusiness"
            name="yearsInBusiness"
            value={formData.yearsInBusiness}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900"
            required
          >
            <option value="">Select years</option>
            <option value="new">New Business (Under 1 year)</option>
            <option value="1-2">1-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="previousClaims" className="block text-sm font-semibold text-gray-700">
            Claims in Last 3 Years *
          </label>
          <select
            id="previousClaims"
            name="previousClaims"
            value={formData.previousClaims}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900"
            required
          >
            <option value="">Select claims history</option>
            <option value="none">No claims</option>
            <option value="1">1 claim</option>
            <option value="2-3">2-3 claims</option>
            <option value="4+">4+ claims</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="currentInsurance" className="block text-sm font-semibold text-gray-700">
            Current Insurance Carrier
          </label>
          <input
            type="text"
            id="currentInsurance"
            name="currentInsurance"
            value={formData.currentInsurance}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900 placeholder-gray-500"
            placeholder="e.g., Progressive, State Farm, or None"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="desiredStartDate" className="block text-sm font-semibold text-gray-700">
            Desired Coverage Start Date
          </label>
          <input
            type="date"
            id="desiredStartDate"
            name="desiredStartDate"
            value={formData.desiredStartDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label htmlFor="additionalInfo" className="block text-sm font-semibold text-gray-700">
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900 placeholder-gray-500 resize-none"
            placeholder="Any special requirements, equipment details, or questions..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );

  const renderThankYou = () => (
    <div className="text-center space-y-8 max-w-4xl mx-auto">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Quote Request Submitted!</h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          Thanks for choosing Moxie Risk Partners. Our trucking insurance experts will review your information and contact you within 2 business hours with your customized quote.
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
            <p className="text-gray-600">Our underwriters review your application</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Quote Preparation</h4>
            <p className="text-gray-600">We prepare your customized quote options</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Expert Consultation</h4>
            <p className="text-gray-600">We call to discuss your options and answer questions</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Need immediate assistance?</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="tel:+18006694301" 
            className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call (800) 669-4301
          </a>
          <button className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Live Chat
          </button>
        </div>
      </div>
    </div>
  );

  if (currentStep === 4) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-12 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderThankYou()}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
      
      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Hero Image */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/quote.png" 
                  alt="Get your comprehensive insurance quote today"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Get Your Insurance
                  <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                    Quote Today
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Fast, competitive rates and expert guidance from insurance specialists. 
                  Get personalized coverage options quickly with our streamlined process.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {[
                  'Expert Consultation Included',
                  'Multiple Carrier Options',
                  'Fast Response Within Hours'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span className="text-lg font-medium text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:+18006694301" 
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call (800) 669-4301
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Progress Bar */}
          {renderProgressBar()}
          
          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 lg:p-12">
            
            {/* Form Steps */}
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            
            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-gray-200">
              {currentStep > 1 ? (
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-bold transition-colors flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 3 ? (
                <button 
                  type="button" 
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl disabled:shadow-none"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isStepValid(currentStep)}
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get My Quote
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="font-medium">100% Secure & Confidential</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Expert Support Available</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuotePage;