"use client";

import React, { useEffect, useState } from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  showConfetti: boolean;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, showConfetti }) => {
  const [localShowConfetti, setLocalShowConfetti] = useState(false);

  useEffect(() => {
    if (showConfetti) {
      console.log('SuccessModal: showConfetti triggered, setting localShowConfetti to true');
      setLocalShowConfetti(true);
      // Auto-hide confetti after 2.5 seconds
      const timer = setTimeout(() => {
        console.log('SuccessModal: hiding confetti after timeout');
        setLocalShowConfetti(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  useEffect(() => {
    console.log('SuccessModal: localShowConfetti changed to:', localShowConfetti);
  }, [localShowConfetti]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop and Content with Confetti Container */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        {/* Confetti Animation - Positioned within the modal backdrop */}
        {localShowConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
          
            
            {/* CSS Confetti */}
            <div className="confetti-container">
              {[...Array(60)].map((_, i) => (
                <div
                  key={`confetti-${i}`}
                  className="confetti-piece"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    backgroundColor: ['#ff6b35', '#ffaa85', '#4ade80', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#fbbf24'][Math.floor(Math.random() * 8)]
                  }}
                />
              ))}
              
              {/* Add some larger celebratory pieces */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={`big-confetti-${i}`}
                  className="big-confetti-piece"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.8}s`,
                    backgroundColor: ['#ff6b35', '#ffaa85'][Math.floor(Math.random() * 2)]
                  }}
                />
              ))}
            </div>

            <style jsx>{`
              .confetti-container {
                position: absolute;
                width: 100%;
                height: 100%;
                overflow: hidden;
                top: 0;
                left: 0;
              }
              
              .confetti-piece {
                position: absolute;
                width: 12px;
                height: 12px;
                border-radius: 2px;
                animation: confettiInstantFall 2.5s linear forwards;
                z-index: 60;
                opacity: 0;
              }
              
              .big-confetti-piece {
                position: absolute;
                width: 16px;
                height: 8px;
                border-radius: 3px;
                animation: confettiInstantFall 2.8s linear forwards;
                z-index: 60;
                opacity: 0;
              }
              
              @keyframes confettiInstantFall {
                0% {
                  transform: translateY(-50px) rotate(0deg) scale(1);
                  opacity: 0;
                }
                1% {
                  opacity: 1;
                }
                100% {
                  transform: translateY(120vh) rotate(720deg) scale(0.5);
                  opacity: 0;
                }
              }

              @media (prefers-reduced-motion: reduce) {
                .confetti-piece,
                .big-confetti-piece {
                  animation: none !important;
                  opacity: 0;
                }
              }
            `}</style>
          </div>
        )}

        {/* Modal Content */}
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative z-50">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
          
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Submitted!</h3>
            <p className="text-gray-600 mb-6">We'll contact you shortly with your personalized quote.</p>
            
            <div className="text-left">
              <p className="text-sm text-gray-700 mb-3 font-medium">
                Quick Resources:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <a href="/trucking-insurance" className="text-orange-600 hover:text-orange-700 hover:underline">
                  Trucking Insurance
                </a>
                <a href="/construction" className="text-orange-600 hover:text-orange-700 hover:underline">
                  Construction
                </a>
                <a href="/nonprofit" className="text-orange-600 hover:text-orange-700 hover:underline">
                  Nonprofit
                </a>
                <a href="/manufacturing" className="text-orange-600 hover:text-orange-700 hover:underline">
                  Manufacturing
                </a>
                <a href="/workers-comp" className="text-orange-600 hover:text-orange-700 hover:underline">
                  Workers Comp
                </a>
                <a href="/claims" className="text-orange-600 hover:text-orange-700 hover:underline">
                  Claims Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;