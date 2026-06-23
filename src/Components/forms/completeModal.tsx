"use client";

import React from 'react';
import { Check, Phone, Mail, X } from 'lucide-react';

interface CompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartNew: () => void;
  countdown: number | null;
  claimNumber: string | null;
}

const CompleteModal: React.FC<CompleteModalProps> = ({ 
  isOpen, 
  onClose, 
  onStartNew, 
  countdown, 
  claimNumber 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-modal-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon & Title */}
        <div className="pt-8 pb-4 px-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" strokeWidth={3} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Claim Submitted Successfully</h2>
          <p className="text-gray-500 text-sm mt-1">Your incident report has been received</p>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Claim Number */}
          {claimNumber && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Reference Number</p>
              <p className="text-xl font-bold text-[#CC9F54] tracking-wide">{claimNumber}</p>
            </div>
          )}

          <p className="text-sm text-gray-600 text-center mb-4">
            A confirmation email has been sent. Our team will be in touch soon.
          </p>

          {/* Contact Options */}
          <div className="flex gap-3 mb-4">
            <a 
              href="tel:5155817187" 
              className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-3 py-2.5 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#CC9F54]" />
              <span className="text-sm font-medium text-gray-700">(515) 581-7187</span>
            </a>
            <a 
              href="mailto:claims@moxieriskpartners.com" 
              className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-3 py-2.5 transition-colors"
            >
              <Mail className="w-4 h-4 text-[#CC9F54]" />
              <span className="text-sm font-medium text-gray-700">Email Us</span>
            </a>
          </div>

          {/* Auto-reset countdown */}
          {countdown !== null && (
            <p className="text-xs text-gray-400 text-center mb-4">
              Form resets in {countdown}s · Click to cancel
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={onStartNew}
              className="flex-1 py-2.5 bg-gradient-to-r from-[#CC9F54] to-[#B8893D] text-white rounded-lg font-medium hover:from-[#B8893D] hover:to-[#A87A32] transition-all"
            >
              New Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteModal;