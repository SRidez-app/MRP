"use client";

import React, { useState } from 'react';
import SuccessModal from './successModal';

// Field configuration types
export interface SelectOption {
  value: string;
  label: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[]; // For select fields
}

interface IndustryQuoteFormProps {
  industry: string; // e.g., 'trucking', 'construction', etc.
  formName: string; // e.g., "Trucking Industry Quote"
  title?: string;
  subtitle?: string;
  fields: FormField[]; // Custom fields for each form
}

const IndustryQuoteForm: React.FC<IndustryQuoteFormProps> = ({ 
  industry,
  formName,
  title = "Get Your Free Quote",
  subtitle = "Fast, competitive insurance quotes",
  fields
}) => {
  // Initialize form data dynamically based on fields
  const initialFormData: Record<string, string> = {};
  fields.forEach(field => {
    initialFormData[field.name] = '';
  });

  const [formData, setFormData] = useState<Record<string, string>>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    // Clear error when user starts typing
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Validate required fields
    const missingFields = fields
      .filter(field => field.required && !formData[field.name])
      .map(field => field.label);

    if (missingFields.length > 0) {
      setErrorMessage(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }

    setIsSubmitting(true);

    try {
      // Build payload for Momentum API - Sends to API with PascalCase
      const momentumPayload = {
        // Contact Info - ContactName is primary (prevents duplicates)
        ContactName: formData.contactName || '',
        Email: formData.email || '',
        Phone: formData.phone || '',
        
        // Business/Entity/Organization name
        CompanyName: formData.companyName || formData.organizationName || formData.entityName || '',
        
        // Include ALL form fields (Momentum will map what it needs)
        ...formData,
        
        // Metadata
        industry: industry,
        formType: formName,
        source: `${industry} Page Form`,
        
        // Formatted description with all data
        description: `${formName}
${Object.entries(formData)
  .map(([key, value]) => {
    const field = fields.find(f => f.name === key);
    return field ? `${field.label}: ${value}` : '';
  })
  .filter(Boolean)
  .join('\n')}

Source: ${industry} Page`
      };

      // Send to API
      const response = await fetch('/api/momentum-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(momentumPayload)
      });

      const result = await response.json();

      if (result.success) {
        // Show success modal with confetti
        setShowSuccessModal(true);
        setShowConfetti(true);
        
        // Reset form data
        setFormData(initialFormData);
        
      } else {
        setErrorMessage(
          result.message || 'Unable to submit your quote. Please call (515) 581-7187 for immediate assistance.'
        );
      }

    } catch (error) {
      setErrorMessage('Unable to submit your quote at this time. Please call (515) 581-7187 for immediate assistance.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowConfetti(false);
  };

  const renderField = (field: FormField) => {
    const commonClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9F54] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 placeholder:text-gray-500 bg-white";

    switch (field.type) {
      case 'select':
        return (
          <select
            value={formData[field.name]}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={commonClasses}
            required={field.required}
            disabled={isSubmitting}
          >
            <option value="">{field.placeholder || 'Select...'}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'email':
        return (
          <input
            type="email"
            value={formData[field.name]}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={commonClasses}
            placeholder={field.placeholder || field.label}
            required={field.required}
            disabled={isSubmitting}
          />
        );

      case 'tel':
        return (
          <input
            type="tel"
            value={formData[field.name]}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={commonClasses}
            placeholder={field.placeholder || '(555) 123-4567'}
            required={field.required}
            disabled={isSubmitting}
          />
        );

      case 'text':
      default:
        return (
          <input
            type="text"
            value={formData[field.name]}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={commonClasses}
            placeholder={field.placeholder || field.label}
            required={field.required}
            disabled={isSubmitting}
          />
        );
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-[#FBF5EB] to-[#F5EDE0] rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{errorMessage}</span>
            </div>
          )}

          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#CC9F54] to-[#B8893D] hover:from-[#A87A32] hover:to-[#9A7030] disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed"
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
              'Get My Quote Now'
            )}
          </button>

          {/* Trust Badge */}
          <div className="text-center pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm mb-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              100% Secure & Confidential
            </div>
            <p className="text-gray-500 text-xs">
              No spam, unsubscribe anytime. Licensed agents only.
            </p>
          </div>
        </form>
      </div>

      {/* Success Modal with Confetti */}
      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        showConfetti={showConfetti}
      />
    </>
  );
};

export default IndustryQuoteForm;