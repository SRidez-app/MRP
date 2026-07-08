

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Truck, AlertCircle, Download, Send, Plus, ChevronLeft, ChevronRight, 
  Check, FileText, Users, Shield, Cloud, Car, Package, Building, Heart, CreditCard, Camera, X
} from 'lucide-react';
import InsuranceCardUpload from './insuranceCardUpload';
import { InsuranceCardData, initialInsuranceCardData } from './types';
import CompleteModal from './completeModal';
import Header from '../Header';
import Footer from '../footer';
import {
  FormData,
  WitnessInfo,
  UploadedFile,
  initialFormData,
  weatherOptions,
  roadConditionOptions,
  visibilityOptions,
} from './types';
import {
  TextInput,
  TextArea,
  Select,
  RadioGroup,
  SubSection,
  ContactFields,
  VehicleFields,
  OwnerFields,
  WitnessEntry,
  FileUpload,
  yesNoOptions,
} from './formFields';

import './styles.css';

// ============================================
// STEP CONFIGURATION
// ============================================
interface Step {
  id: string;
  title: string;
  shortTitle: string;
  icon: React.ReactNode;
  isConditional?: boolean;
  conditionField?: keyof FormData;
  conditionValue?: string;
}

const STEPS: Step[] = [
  { id: 'incident', title: 'Incident Details', shortTitle: 'Incident', icon: <FileText className="w-5 h-5" /> },
  { id: 'contacts', title: 'Contact Information', shortTitle: 'Contacts', icon: <Users className="w-5 h-5" /> },
  { id: 'police', title: 'Police & Citation', shortTitle: 'Police', icon: <Shield className="w-5 h-5" /> },
  { id: 'conditions', title: 'Conditions & Towing', shortTitle: 'Conditions', icon: <Cloud className="w-5 h-5" /> },
  { id: 'truck-driver', title: 'Truck & Driver', shortTitle: 'Truck', icon: <Truck className="w-5 h-5" /> },
  { id: 'trailer', title: 'Trailer Information', shortTitle: 'Trailer', icon: <Truck className="w-5 h-5" />, isConditional: true, conditionField: 'trailerPulling', conditionValue: 'yes' },
  { id: 'cargo', title: 'Cargo Information', shortTitle: 'Cargo', icon: <Package className="w-5 h-5" />, isConditional: true, conditionField: 'cargoDamaged', conditionValue: 'yes' },
  { id: 'other-parties', title: 'Other Parties', shortTitle: 'Others', icon: <Car className="w-5 h-5" /> },
  { id: 'witnesses', title: 'Witnesses & Docs', shortTitle: 'Witnesses', icon: <Camera className="w-5 h-5" /> },
  { id: 'review', title: 'Review & Submit', shortTitle: 'Review', icon: <Check className="w-5 h-5" /> },
];

// ============================================
// PROGRESS BAR COMPONENT
// ============================================
interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  completedSteps: Set<number>;
  onStepClick: (index: number) => void;
  formData: FormData;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep, completedSteps, onStepClick, formData }) => {
  const getActiveSteps = () => {
    return steps.filter(step => {
      if (!step.isConditional) return true;
      if (step.conditionField && step.conditionValue) {
        return formData[step.conditionField] === step.conditionValue;
      }
      return true;
    });
  };

  const activeSteps = getActiveSteps();
  const activeCurrentIndex = activeSteps.findIndex(s => s.id === steps[currentStep]?.id);

  return (
    <div className="mb-8">
      {/* Mobile Progress */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {activeCurrentIndex + 1} of {activeSteps.length}
          </span>
          <span className="text-sm font-semibold text-[#CC9F54]">
            {steps[currentStep]?.title}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#CC9F54] to-[#B8893D] h-2 rounded-full transition-all duration-500"
            style={{ width: `${((activeCurrentIndex + 1) / activeSteps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Progress */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          {activeSteps.map((step, index) => {
            const originalIndex = steps.findIndex(s => s.id === step.id);
            const isCompleted = completedSteps.has(originalIndex);
            const isCurrent = originalIndex === currentStep;
            const isPast = index < activeCurrentIndex;

            return (
              <React.Fragment key={step.id}>
                <button
                  type="button"
                  onClick={() => onStepClick(originalIndex)}
                  className={`flex flex-col items-center group transition-all ${
                    isCurrent || isCompleted || isPast ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                  }`}
                  disabled={!isCurrent && !isCompleted && !isPast}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-[#CC9F54] to-[#B8893D] text-white shadow-lg scale-110'
                        : isCompleted || isPast
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {isCompleted || isPast ? <Check className="w-5 h-5" /> : step.icon}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium transition-colors ${
                      isCurrent ? 'text-[#CC9F54]' : isCompleted || isPast ? 'text-green-600' : 'text-gray-400'
                    }`}
                  >
                    {step.shortTitle}
                  </span>
                </button>

                {index < activeSteps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-colors duration-300 ${
                      isPast || isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};


// ============================================
// STEP CONTENT WRAPPER
// ============================================
interface StepContentProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const StepContent: React.FC<StepContentProps> = ({ title, subtitle, children }) => (
  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-5">
      <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
      {subtitle && <p className="text-gray-300 text-sm mt-1">{subtitle}</p>}
    </div>
    <div className="p-6 sm:p-8">{children}</div>
  </div>
);

// ============================================
// MAIN FORM COMPONENT
// ============================================
const TruckingClaimsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [witnesses, setWitnesses] = useState<WitnessInfo[]>([
    { id: '1', name: '', phone: '', email: '', statement: '' },
  ]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [policeReportFiles, setPoliceReportFiles] = useState<UploadedFile[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otherVehicleDriverSameAsOwner, setOtherVehicleDriverSameAsOwner] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [insuranceCardFile, setInsuranceCardFile] = useState<File | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [truckOwnedByCompany, setTruckOwnedByCompany] = useState(false);
  const [resetCountdown, setResetCountdown] = useState<number | null>(null);
  const [claimNumber, setClaimNumber] = useState<string | null>(null);
const [citationFiles, setCitationFiles] = useState<UploadedFile[]>([]);
const [billOfLadingFiles, setBillOfLadingFiles] = useState<UploadedFile[]>([]);
const [sameAsClaimsContact, setSameAsClaimsContact] = useState(false);
const [trailerSameAsTruck, setTrailerSameAsTruck] = useState(false);
const [cargoSeeBillOfLading, setCargoSeeBillOfLading] = useState(false);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [insuranceCardData, setInsuranceCardData] = useState<InsuranceCardData | null>(null);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Reset form function
const resetForm = () => {
  setFormData(initialFormData);
  setWitnesses([{ id: '1', name: '', phone: '', email: '', statement: '' }]);
  setUploadedFiles([]);
  setPoliceReportFiles([]);
  setCitationFiles([]);
  setBillOfLadingFiles([]);
  setSameAsClaimsContact(false);
  setTrailerSameAsTruck(false);
  setCargoSeeBillOfLading(false);
  setTruckOwnedByCompany(false);
  setOtherVehicleDriverSameAsOwner(false); // Add this
  setCurrentStep(0);
  setCompletedSteps(new Set());
  setSubmitStatus('idle');
  setSubmitError(null);
  setShowSuccessModal(false);
  setResetCountdown(null);
  setInsuranceCardData(null);
  setClaimNumber(null);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  // Clear all timers
  const clearResetTimers = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setResetCountdown(null);
  };

  // Start auto-reset timer after successful submission
  const startResetTimer = () => {
    clearResetTimers();
    
    // Start countdown display
    setResetCountdown(20);
    
    countdownIntervalRef.current = setInterval(() => {
      setResetCountdown((prev) => {
        if (prev === null || prev <= 1) {
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    // Set main reset timer
    resetTimerRef.current = setTimeout(() => {
      resetForm();
    }, 20000);
  };

  // Handle user activity - cancel auto-reset if user interacts
  const handleUserActivity = () => {
    if (submitStatus === 'success' && resetTimerRef.current) {
      clearResetTimers();
    }
  };

  const handleInsuranceCardExtracted = (data: InsuranceCardData, file?: File) => {
  setInsuranceCardData(data);
  if (file) {
    setInsuranceCardFile(file);
  }
  
  // Auto-fill policy fields if they're empty
  if (data.insuranceCompany && !formData.claimantInsuranceCompany) {
    setFormData(prev => ({
      ...prev,
      claimantInsuranceCompany: data.insuranceCompany,
    }));
  }
  if (data.policyNumber && !formData.claimantPolicyNumber) {
    setFormData(prev => ({
      ...prev,
      claimantPolicyNumber: data.policyNumber,
    }));
  }
};

const clearInsuranceCardData = () => {
  setInsuranceCardData(null);
  setInsuranceCardFile(null);  
  setFormData(prev => ({
    ...prev,
    claimantInsuranceCompany: '',
    claimantPolicyNumber: '',
  }));
};

  // Set up activity listeners when form is submitted
  useEffect(() => {
    if (submitStatus === 'success') {
      startResetTimer();

      const container = formContainerRef.current;
      if (container) {
        container.addEventListener('click', handleUserActivity);
        container.addEventListener('keydown', handleUserActivity);
        container.addEventListener('touchstart', handleUserActivity);
      }

      return () => {
        clearResetTimers();
        if (container) {
          container.removeEventListener('click', handleUserActivity);
          container.removeEventListener('keydown', handleUserActivity);
          container.removeEventListener('touchstart', handleUserActivity);
        }
      };
    }
  }, [submitStatus]);

  // Get active steps (filter out conditional steps that don't apply)
  const getActiveStepIndices = (): number[] => {
    return STEPS.map((step, index) => ({ step, index }))
      .filter(({ step }) => {
        if (!step.isConditional) return true;
        if (step.conditionField && step.conditionValue) {
          return formData[step.conditionField] === step.conditionValue;
        }
        return true;
      })
      .map(({ index }) => index);
  };

  const activeStepIndices = getActiveStepIndices();

  // ============================================
  // HANDLERS
  // ============================================
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWitnessChange = (id: string, field: keyof WitnessInfo, value: string) => {
    setWitnesses((prev) =>
      prev.map((w) => (w.id === id ? { ...w, [field]: value } : w))
    );
  };

  const addWitness = () => {
    setWitnesses((prev) => [
      ...prev,
      { id: Date.now().toString(), name: '', phone: '', email: '', statement: '' },
    ]);
  };

  const removeWitness = (id: string) => {
    setWitnesses((prev) => prev.filter((w) => w.id !== id));
  };

  const goToNextStep = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    
    // Find next active step
    const currentActiveIndex = activeStepIndices.indexOf(currentStep);
    if (currentActiveIndex < activeStepIndices.length - 1) {
      setCurrentStep(activeStepIndices[currentActiveIndex + 1]);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevStep = () => {
    const currentActiveIndex = activeStepIndices.indexOf(currentStep);
    if (currentActiveIndex > 0) {
      setCurrentStep(activeStepIndices[currentActiveIndex - 1]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToStep = (stepIndex: number) => {
    if (completedSteps.has(stepIndex) || activeStepIndices.indexOf(stepIndex) <= activeStepIndices.indexOf(currentStep)) {
      setCurrentStep(stepIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

const handleSubmit = async () => {
  setIsSubmitting(true);
  setSubmitError(null);

  try {
    // Compress image files before upload (resize + JPEG quality reduction)
    const compressImage = (file: File, maxWidth = 1600, quality = 0.7): Promise<File> => {
      return new Promise((resolve) => {
        if (!file.type.startsWith('image/') || file.type === 'image/gif') {
          resolve(file);
          return;
        }
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        img.onload = () => {
          let { width, height } = img;
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob && blob.size < file.size) {
                resolve(new File([blob], file.name, { type: 'image/jpeg' }));
              } else {
                resolve(file);
              }
            },
            'image/jpeg',
            quality
          );
          URL.revokeObjectURL(img.src);
        };
        img.onerror = () => {
          URL.revokeObjectURL(img.src);
          resolve(file);
        };
        img.src = URL.createObjectURL(file);
      });
    };

    const fileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
      });
    };

    // Helper: safely parse a fetch response (handles non-JSON errors like 413)
    const safeParseResponse = async (response: Response) => {
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        throw new Error(
          response.status === 413
            ? 'The uploaded files are too large. Please reduce file sizes or upload fewer files.'
            : text || `Server error (${response.status})`
        );
      }
    };

    const getInitials = () => {
      const name = formData.claimsContactName.trim();
      if (!name) return 'unknown';
      const parts = name.split(' ').filter(Boolean);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1]).toLowerCase();
      }
      return name.substring(0, 2).toLowerCase();
    };

    const initials = getInitials();

    // Helper: compress + convert a file to base64 attachment object
    const processFile = async (f: UploadedFile, index: number, section: string, prefix: string, totalCount: number) => {
      if (!f.file) return null;
      const compressed = await compressImage(f.file);
      const base64 = await fileToBase64(compressed);
      const ext = f.name.split('.').pop() || 'png';
      const suffix = totalCount > 1 ? `${index + 1}` : '';
      return {
        name: `${prefix}${suffix}_${initials}.${ext}`,
        originalName: f.name,
        type: compressed.type,
        size: compressed.size,
        data: base64,
        section,
      };
    };

    // Process all file categories with compression
    const policeReportFilesData = (await Promise.all(
      policeReportFiles.map((f, i) => processFile(f, i, 'police_report', 'police_report', policeReportFiles.length))
    )).filter(Boolean);

    const citationFilesData = (await Promise.all(
      citationFiles.map((f, i) => processFile(f, i, 'citation', 'citation', citationFiles.length))
    )).filter(Boolean);

    const billOfLadingFilesData = (await Promise.all(
      billOfLadingFiles.map((f, i) => processFile(f, i, 'bill_of_lading', 'bill_of_lading', billOfLadingFiles.length))
    )).filter(Boolean);

    const uploadedFilesData = (await Promise.all(
      uploadedFiles.map((f, i) => processFile(f, i, 'incident_photos', 'incident_photo', uploadedFiles.length))
    )).filter(Boolean);

    let insuranceCardFileData = null;
    if (insuranceCardFile) {
      const compressed = await compressImage(insuranceCardFile);
      const base64 = await fileToBase64(compressed);
      const ext = insuranceCardFile.name.split('.').pop() || 'png';
      insuranceCardFileData = {
        name: `insurance_card_${initials}.${ext}`,
        originalName: insuranceCardFile.name,
        type: compressed.type,
        size: compressed.size,
        data: base64,
        section: 'insurance_card',
      };
    }

    // Gather all file objects for size calculation
    const allFiles = [
      ...policeReportFilesData,
      ...citationFilesData,
      ...billOfLadingFilesData,
      ...uploadedFilesData,
      ...(insuranceCardFileData ? [insuranceCardFileData] : []),
    ];

    // Calculate total base64 data size (bytes)
    const totalBase64Size = allFiles.reduce((sum, f) => sum + (f?.data?.length || 0), 0);
    const MAX_CHUNK_SIZE = 3 * 1024 * 1024; // 3MB of base64 data per request (safe under 4.5MB Vercel limit)

    if (totalBase64Size <= MAX_CHUNK_SIZE) {
      // All files fit in one request — send everything together
      const submitData = {
        formData,
        witnesses: witnesses.filter((w) => w.name),
        files: uploadedFilesData,
        policeReportFiles: policeReportFilesData,
        citationFiles: citationFilesData,
        billOfLadingFiles: billOfLadingFilesData,
        insuranceCardFile: insuranceCardFileData,
      };

      const response = await fetch('/api/submit-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const result = await safeParseResponse(response);
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit claim');
      }

      setClaimNumber(result.claimNumber);
      setSubmitStatus('success');
      setShowSuccessModal(true);
    } else {
      // Files are too large for one request — use chunked upload
      // Step 1: Split files into chunks that fit within the size limit
      const fileChunks: (typeof allFiles)[] = [];
      let currentChunk: typeof allFiles = [];
      let currentChunkSize = 0;

      for (const file of allFiles) {
        if (!file) continue;
        const fileSize = file.data.length;
        if (currentChunkSize + fileSize > MAX_CHUNK_SIZE && currentChunk.length > 0) {
          fileChunks.push(currentChunk);
          currentChunk = [];
          currentChunkSize = 0;
        }
        currentChunk.push(file);
        currentChunkSize += fileSize;
      }
      if (currentChunk.length > 0) {
        fileChunks.push(currentChunk);
      }

      // Step 2: Send form data with first chunk of files
      const firstChunk = fileChunks[0] || [];
      const firstChunkBySection = {
        files: firstChunk.filter(f => f?.section === 'incident_photos'),
        policeReportFiles: firstChunk.filter(f => f?.section === 'police_report'),
        citationFiles: firstChunk.filter(f => f?.section === 'citation'),
        billOfLadingFiles: firstChunk.filter(f => f?.section === 'bill_of_lading'),
        insuranceCardFile: firstChunk.find(f => f?.section === 'insurance_card') || null,
      };

      const submitData = {
        formData,
        witnesses: witnesses.filter((w) => w.name),
        ...firstChunkBySection,
        totalFileChunks: fileChunks.length,
      };

      const response = await fetch('/api/submit-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const result = await safeParseResponse(response);
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit claim');
      }

      const returnedClaimNumber = result.claimNumber;

      // Step 3: Send remaining file chunks as supplementary uploads
      for (let i = 1; i < fileChunks.length; i++) {
        const chunk = fileChunks[i];
        const chunkResponse = await fetch('/api/submit-claim-files', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            claimNumber: returnedClaimNumber,
            claimsContactEmail: formData.claimsContactEmail,
            companyName: formData.companyName,
            files: chunk,
            chunkIndex: i + 1,
            totalChunks: fileChunks.length,
          }),
        });

        const chunkResult = await safeParseResponse(chunkResponse);
        if (!chunkResponse.ok || !chunkResult.success) {
          console.error(`Failed to upload file chunk ${i + 1}:`, chunkResult.error);
          // Continue with submission even if supplementary files fail
        }
      }

      setClaimNumber(returnedClaimNumber);
      setSubmitStatus('success');
      setShowSuccessModal(true);
    }
  } catch (error) {
    console.error('Submit error:', error);
    setSubmitStatus('error');
    setSubmitError(error instanceof Error ? error.message : 'Failed to submit claim. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  const handleModalClose = () => {
    setShowSuccessModal(false);
    // User manually closed modal, so they're interacting - clear the auto-reset
    clearResetTimers();
  };

  const isLastStep = activeStepIndices.indexOf(currentStep) === activeStepIndices.length - 1;
  const isFirstStep = activeStepIndices.indexOf(currentStep) === 0;

  // ============================================
  // RENDER STEP CONTENT
  // ============================================
  const renderStepContent = () => {
    switch (STEPS[currentStep]?.id) {
  // STEP 1: INCIDENT DETAILS
case 'incident':
  return (
    <StepContent title="Incident Details" subtitle="Tell us about the incident">
      <div className="space-y-6">
        {/* Company & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="NAME OF YOUR COMPANY"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
            labelClassName="font-semibold"
          />
          <TextInput
            label="DATE OF INCIDENT"
            name="incidentDate"
            value={formData.incidentDate}
            onChange={handleInputChange}
            type="date"
            required
            labelClassName="font-semibold"
          />
        </div>



         {/* Insurance Card Upload - NEW */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
            INSURANCE CARD (OPTIONAL)
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Upload your insurance card to auto-fill policy and vehicle information throughout the form.
          </p>
          <InsuranceCardUpload
            onDataExtracted={handleInsuranceCardExtracted}
            extractedData={insuranceCardData}
            onClear={clearInsuranceCardData}
          />
        </div>

        {/* Policy Information */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
            YOUR POLICY INFORMATION
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="INSURANCE COMPANY"
              name="claimantInsuranceCompany"
              value={formData.claimantInsuranceCompany}
              onChange={handleInputChange}
              required
              labelClassName="font-semibold"
              placeholder="e.g., Progressive, Great West"
            />
            <TextInput
              label="POLICY NUMBER"
              name="claimantPolicyNumber"
              value={formData.claimantPolicyNumber}
              onChange={handleInputChange}
              required
              labelClassName="font-semibold"
            />
          </div>
        </div>

        {/* Time of Incident */}
        <div className="pt-6 border-t border-gray-100">
          <label className="block text-sm text-gray-700 mb-2 font-semibold">
            TIME OF INCIDENT <span className="text-[#CC9F54]">*</span>
          </label>
          <div className="flex gap-3 max-w-md">
            <select
              name="incidentHour"
              value={formData.incidentHour}
              onChange={handleInputChange}
              required
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 bg-white hover:border-gray-300 cursor-pointer"
            >
              <option value="">Hour</option>
              {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((hour) => (
                <option key={hour} value={hour.toString()}>
                  {hour}
                </option>
              ))}
            </select>
            <select
              name="incidentMinute"
              value={formData.incidentMinute}
              onChange={handleInputChange}
              required
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 bg-white hover:border-gray-300 cursor-pointer"
            >
              <option value="">Min</option>
              {['00', '15', '30', '45'].map((min) => (
                <option key={min} value={min}>
                  :{min}
                </option>
              ))}
            </select>
            <select
              name="incidentPeriod"
              value={formData.incidentPeriod}
              onChange={handleInputChange}
              required
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 bg-white hover:border-gray-300 cursor-pointer font-medium"
            >
              <option value="">AM/PM</option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="STREET ADDRESS"
            name="incidentAddress"
            value={formData.incidentAddress}
            onChange={handleInputChange}
            required
            labelClassName="font-semibold"
            placeholder="123 Main St"
          />
          <TextInput
            label="NEAREST INTERSECTION"
            name="incidentIntersection"
            value={formData.incidentIntersection}
            onChange={handleInputChange}
            labelClassName="font-semibold"
            placeholder="Main St & 1st Ave"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TextInput
            label="CITY"
            name="incidentCity"
            value={formData.incidentCity}
            onChange={handleInputChange}
            required
            labelClassName="font-semibold"
            className="col-span-2 md:col-span-1"
          />
          <TextInput
            label="STATE"
            name="incidentState"
            value={formData.incidentState}
            onChange={handleInputChange}
            required
            labelClassName="font-semibold"
            placeholder="IA"
          />
          <TextInput
            label="ZIP CODE"
            name="incidentZip"
            value={formData.incidentZip}
            onChange={handleInputChange}
            required
            labelClassName="font-semibold"
            placeholder="50001"
          />
        </div>

        <TextArea
          label="BRIEF DESCRIPTION OF INCIDENT"
          name="incidentDescription"
          value={formData.incidentDescription}
          onChange={handleInputChange}
          required
          rows={4}
          labelClassName="font-semibold"
          placeholder="Please provide a detailed description of what happened..."
        />
      </div>
    </StepContent>
  );

      // STEP 2: CONTACTS
     case 'contacts':
  return (
    <StepContent title="Contact Information" subtitle="Who should we contact about this claim?">
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
            BUSINESS CONTACT FOR CLAIMS
          </h3>
          {insuranceCardData && (insuranceCardData.policyholderFirstName || insuranceCardData.policyholderLastName) && (
  <div className="mb-4">
    <button
      type="button"
      onClick={() => {
        const fullName = `${insuranceCardData.policyholderFirstName} ${insuranceCardData.policyholderLastName}`.trim();
        setFormData(prev => ({
          ...prev,
          claimsContactName: fullName,
        }));
      }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
    >
      <CreditCard className="w-4 h-4" />
      Use policyholder name: {insuranceCardData.policyholderFirstName} {insuranceCardData.policyholderLastName}
    </button>
  </div>
)}
          <p className="text-sm text-gray-600 mb-4">Who should the claims adjuster contact?</p>
          <ContactFields
            prefix="claimsContact"
            values={{
              name: formData.claimsContactName,
              title: formData.claimsContactTitle,
              phone: formData.claimsContactPhone,
              email: formData.claimsContactEmail,
            }}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
            PERSON COMPLETING THIS FORM
          </h3>
          
          {/* Same as Claims Contact Checkbox */}
          <label className="flex items-center gap-3 mb-4 cursor-pointer group">
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              sameAsClaimsContact 
                ? 'bg-[#CC9F54] border-[#CC9F54]' 
                : 'border-gray-300 group-hover:border-[#D9BC82]'
            }`}>
              {sameAsClaimsContact && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
            <input
              type="checkbox"
              checked={sameAsClaimsContact}
              onChange={(e) => {
                setSameAsClaimsContact(e.target.checked);
                if (e.target.checked) {
                  setFormData(prev => ({
                    ...prev,
                    completingPersonName: prev.claimsContactName,
                    completingPersonTitle: prev.claimsContactTitle,
                    completingPersonPhone: prev.claimsContactPhone,
                    completingPersonEmail: prev.claimsContactEmail,
                  }));
                }
              }}
              className="sr-only"
            />
            <span className="text-sm font-medium text-gray-700">Same as Claims Contact</span>
          </label>

          {!sameAsClaimsContact && (
            <ContactFields
              prefix="completingPerson"
              values={{
                name: formData.completingPersonName,
                title: formData.completingPersonTitle,
                phone: formData.completingPersonPhone,
                email: formData.completingPersonEmail,
              }}
              onChange={handleInputChange}
              required
            />
          )}
          
          {sameAsClaimsContact && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <span className="font-semibold">{formData.claimsContactName}</span> will be used as the person completing this form.
              </p>
            </div>
          )}
        </div>
      </div>
    </StepContent>
  );

      // STEP 3: POLICE & CITATION
      case 'police':
        return (
          <StepContent title="Police & Citation" subtitle="Was law enforcement involved?">
            <div className="space-y-6">
              <RadioGroup
                label="Was a police report filed?"
                name="policeReportFiled"
                value={formData.policeReportFiled}
                onChange={handleInputChange}
                options={yesNoOptions}
                required
              />

              {formData.policeReportFiled === 'yes' && (
                <div className="space-y-6 pl-4 border-l-4 border-[#E5CFA5] bg-[#FBF5EB]/50 p-4 rounded-r-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput
                      label="Police Report Number"
                      name="policeReportNumber"
                      value={formData.policeReportNumber}
                      onChange={handleInputChange}
                    />
                    <TextInput
                      label="Police Department"
                      name="policeReportDepartment"
                      value={formData.policeReportDepartment}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  {/* Police Report Upload */}
                  <div className="pt-4 border-t border-[#E5CFA5]">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      UPLOAD POLICE REPORT
                    </label>
                    <p className="text-sm text-gray-600 mb-3">
                      If you have a copy of the police report, please upload it here.
                    </p>
                    <div
                      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                        policeReportFiles.length >= 5
                          ? 'border-gray-200 bg-white'
                          : 'border-[#D9BC82] hover:border-[#D9BC82] hover:bg-[#FBF5EB]/50 cursor-pointer bg-white'
                      }`}
                    >
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.zip,.heic"
                        onChange={(e) => {
                          const selectedFiles = e.target.files;
                          if (!selectedFiles) return;
                          const newFiles: UploadedFile[] = [];
                          const remainingSlots = 5 - policeReportFiles.length;
                          for (let i = 0; i < Math.min(selectedFiles.length, remainingSlots); i++) {
                            const file = selectedFiles[i];
                            newFiles.push({
                              id: `police-${Date.now()}-${i}`,
                              name: file.name,
                              type: file.type,
                              size: file.size,
                              file: file,
                            });
                          }
                          setPoliceReportFiles([...policeReportFiles, ...newFiles]);
                          e.target.value = '';
                        }}
                        className="hidden"
                        id="police-report-upload"
                        disabled={policeReportFiles.length >= 5}
                      />
                      <label
                        htmlFor="police-report-upload"
                        className={policeReportFiles.length >= 5 ? 'cursor-not-allowed' : 'cursor-pointer'}
                      >
                        <div className="w-12 h-12 bg-[#FBF5EB] rounded-full flex items-center justify-center mx-auto mb-3">
                          <FileText className="h-6 w-6 text-[#CC9F54]" />
                        </div>
                        <p className="text-gray-700 text-sm">
                          <span className="text-[#CC9F54] font-semibold">Click to upload</span> police report
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF, images, or documents (max 5 files)</p>
                      </label>
                    </div>

                    {policeReportFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {policeReportFiles.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between bg-white border border-gray-200 px-3 py-2 rounded-lg"
                          >
                            <div className="flex items-center space-x-2 min-w-0">
                              <div className="h-8 w-8 bg-[#FBF5EB] rounded flex items-center justify-center flex-shrink-0">
                                <FileText className="h-4 w-4 text-[#CC9F54]" />
                              </div>
                              <span className="text-sm text-gray-900 truncate">{file.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setPoliceReportFiles(policeReportFiles.filter(f => f.id !== file.id))}
                              className="text-gray-400 hover:text-red-500 p-1 flex-shrink-0"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <RadioGroup
                label="Was a citation issued?"
                name="citationIssued"
                value={formData.citationIssued}
                onChange={handleInputChange}
                options={yesNoOptions}
                required
              />

              {formData.citationIssued === 'yes' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-4 border-[#E5CFA5] bg-[#FBF5EB]/50 p-4 rounded-r-lg">
                  <TextInput
                    label="Citation Issued To"
                    name="citationIssuedTo"
                    value={formData.citationIssuedTo}
                    onChange={handleInputChange}
                    placeholder="Name of person cited"
                  />
                  <TextInput
                    label="Citation Number"
                    name="citationNumber"
                    value={formData.citationNumber}
                    onChange={handleInputChange}
                  />
                  <TextInput
                    label="Violation Description"
                    name="citationViolation"
                    value={formData.citationViolation}
                    onChange={handleInputChange}
                    className="md:col-span-2"
                  />
                </div>
              )}
            </div>
          </StepContent>
        );

      // STEP 4: CONDITIONS & TOWING
      case 'conditions':
        return (
          <StepContent title="Conditions & Towing" subtitle="Environmental factors and towing information">
            <div className="space-y-8">
              {/* Weather & Road */}
              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
                  WEATHER & ROAD CONDITIONS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select
                    label="Weather Conditions"
                    name="weatherConditions"
                    value={formData.weatherConditions}
                    onChange={handleInputChange}
                    options={weatherOptions}
                    required
                  />
                  <Select
                    label="Road Conditions"
                    name="roadConditions"
                    value={formData.roadConditions}
                    onChange={handleInputChange}
                    options={roadConditionOptions}
                    required
                  />
                  <Select
                    label="Visibility"
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                    options={visibilityOptions}
                    required
                  />
                </div>
              </div>

              {/* DOT Recordable */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
                  DOT RECORDABLE
                </h3>
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 mb-4">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> A crash is DOT recordable if it results in a fatality,
                    bodily injury requiring immediate medical treatment away from the scene, or
                    disabling damage to any vehicle requiring towing.
                  </p>
                </div>
                <RadioGroup
                  label="Is this incident DOT recordable?"
                  name="dotRecordable"
                  value={formData.dotRecordable}
                  onChange={handleInputChange}
                  options={[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                    { value: 'unknown', label: 'Unknown' },
                  ]}
                  required
                />
                {formData.dotRecordable === 'yes' && (
                  <div className="mt-4 pl-4 border-l-4 border-[#E5CFA5] bg-[#FBF5EB]/50 p-4 rounded-r-lg">
                    <TextArea
                      label="Reason for DOT Recordability"
                      name="dotRecordableReason"
                      value={formData.dotRecordableReason}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="e.g., Fatality, injury requiring medical transport, vehicle towed..."
                    />
                  </div>
                )}
              </div>

              {/* Towing */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
                  TOWING INFORMATION
                </h3>
                <RadioGroup
                  label="Was towing required?"
                  name="towingRequired"
                  value={formData.towingRequired}
                  onChange={handleInputChange}
                  options={yesNoOptions}
                  required
                />
                {formData.towingRequired === 'yes' && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-4 border-[#E5CFA5] bg-[#FBF5EB]/50 p-4 rounded-r-lg">
                    <TextInput
                      label="Towing Company Name"
                      name="towingCompanyName"
                      value={formData.towingCompanyName}
                      onChange={handleInputChange}
                    />
                    <TextInput
                      label="Towing Company Phone"
                      name="towingCompanyPhone"
                      value={formData.towingCompanyPhone}
                      onChange={handleInputChange}
                      type="tel"
                    />
                    <TextInput
                      label="Tow Destination"
                      name="towingDestination"
                      value={formData.towingDestination}
                      onChange={handleInputChange}
                      placeholder="Where was the vehicle towed to?"
                      className="md:col-span-2"
                    />
                  </div>
                )}
              </div>
            </div>
          </StepContent>
        );

      // STEP 5: TRUCK & DRIVER
case 'truck-driver':
  return (
    <StepContent title="Truck & Driver" subtitle="Your vehicle and driver information">
      <div className="space-y-8">
        {/* Truck */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
            TRUCK INFORMATION
          </h3>

          {insuranceCardData && (insuranceCardData.vehicleYear || insuranceCardData.vehicleMake || insuranceCardData.vehicleModel || insuranceCardData.vehicleVin) && (
  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-blue-600" />
        <span className="text-sm font-medium text-blue-800">
          Vehicle from insurance card: {insuranceCardData.vehicleYear} {insuranceCardData.vehicleMake} {insuranceCardData.vehicleModel}
        </span>
      </div>
      <button
        type="button"
        onClick={() => {
          setFormData(prev => ({
            ...prev,
            truckYear: insuranceCardData.vehicleYear || prev.truckYear,
            truckMake: insuranceCardData.vehicleMake || prev.truckMake,
            truckModel: insuranceCardData.vehicleModel || prev.truckModel,
            truckVin: insuranceCardData.vehicleVin || prev.truckVin,
          }));
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        Use This Vehicle
      </button>
    </div>
  </div>
)}
          <RadioGroup
            label="Was your truck damaged?"
            name="truckDamaged"
            value={formData.truckDamaged}
            onChange={handleInputChange}
            options={yesNoOptions}
            required
            className="mb-6"
          />
          
          {/* Truck Owned by Company Checkbox */}
          <label className="flex items-center gap-3 mb-4 cursor-pointer group">
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              truckOwnedByCompany 
                ? 'bg-[#CC9F54] border-[#CC9F54]' 
                : 'border-gray-300 group-hover:border-[#D9BC82]'
            }`}>
              {truckOwnedByCompany && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
            <input
              type="checkbox"
              checked={truckOwnedByCompany}
              onChange={(e) => {
                setTruckOwnedByCompany(e.target.checked);
                if (e.target.checked) {
                  // Clear owner fields if truck is owned by company
                  setFormData(prev => ({
                    ...prev,
                    truckOwnerName: '',
                    truckOwnerPhone: '',
                    truckOwnerEmail: '',
                  }));
                }
              }}
              className="sr-only"
            />
            <span className="text-sm font-medium text-gray-700">Truck is owned by our company</span>
          </label>

          {truckOwnedByCompany && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                Truck is owned by <span className="font-semibold">{formData.companyName || 'your company'}</span>.
              </p>
            </div>
          )}

          {!truckOwnedByCompany && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TRUCK OWNER name and contact (if not owned by your company)
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  name="truckOwnerName"
                  value={formData.truckOwnerName}
                  onChange={handleInputChange}
                  placeholder="Owner name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="truckOwnerPhone"
                      value={formData.truckOwnerPhone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Email (optional)</label>
                    <input
                      type="email"
                      name="truckOwnerEmail"
                      value={formData.truckOwnerEmail}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <VehicleFields
            prefix="truck"
            values={{
              year: formData.truckYear,
              make: formData.truckMake,
              model: formData.truckModel,
              vin: formData.truckVin,
            }}
            onChange={handleInputChange}
          />
        </div>

        {/* Driver */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
            DRIVER INFORMATION
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <TextInput
              label="DRIVER name"
              name="driverName"
              value={formData.driverName}
              onChange={handleInputChange}
              required
            />
            <TextInput
              label="DRIVER phone"
              name="driverPhone"
              value={formData.driverPhone}
              onChange={handleInputChange}
              type="tel"
            />
            <TextInput
              label="DRIVER license #"
              name="driverLicense"
              value={formData.driverLicense}
              onChange={handleInputChange}
            />
            <TextInput
              label="STATE"
              name="driverState"
              value={formData.driverState}
              onChange={handleInputChange}
            />
          </div>
          <RadioGroup
            label="DRIVER is (choose one):"
            name="driverType"
            value={formData.driverType}
            onChange={handleInputChange}
            options={[
              { value: 'employee', label: 'Employee' },
              { value: 'owner-operator', label: 'Owner-Operator' },
            ]}
            className="mb-6"
          />
          <RadioGroup
            label="WAS YOUR DRIVER INJURED?"
            name="driverInjured"
            value={formData.driverInjured}
            onChange={handleInputChange}
            options={yesNoOptions}
            required
          />
        </div>

        {/* Trailer Question */}
        <div className="pt-6 border-t border-gray-100">
          <RadioGroup
            label="Was your truck pulling a trailer?"
            name="trailerPulling"
            value={formData.trailerPulling}
            onChange={handleInputChange}
            options={yesNoOptions}
            required
          />
          {formData.trailerPulling === 'yes' && (
            <p className="mt-3 text-sm text-[#CC9F54] font-medium">
              ✓ Trailer details will be collected in the next step
            </p>
          )}
        </div>
      </div>
    </StepContent>
  );

      // STEP 6: TRAILER (CONDITIONAL)
   case 'trailer':
  return (
    <StepContent title="Trailer Information" subtitle="Details about the trailer">
      <div className="space-y-6">
        <RadioGroup
          label="Was the trailer damaged?"
          name="trailerDamaged"
          value={formData.trailerDamaged}
          onChange={handleInputChange}
          options={yesNoOptions}
          className="mb-6"
        />

        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
            TRAILER OWNER
          </h3>
          
          {/* Same as Truck Owner Checkbox */}
          <label className="flex items-center gap-3 mb-4 cursor-pointer group">
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              trailerSameAsTruck 
                ? 'bg-[#CC9F54] border-[#CC9F54]' 
                : 'border-gray-300 group-hover:border-[#D9BC82]'
            }`}>
              {trailerSameAsTruck && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
            <input
              type="checkbox"
              checked={trailerSameAsTruck}
              onChange={(e) => {
                setTrailerSameAsTruck(e.target.checked);
                if (e.target.checked) {
                  setFormData(prev => ({
                    ...prev,
                    trailerOwnerName: prev.truckOwnerName,
                    trailerOwnerPhone: prev.truckOwnerPhone,
                    trailerOwnerEmail: prev.truckOwnerEmail,
                  }));
                }
              }}
              className="sr-only"
            />
            <span className="text-sm font-medium text-gray-700">Same as Truck Owner</span>
          </label>

          {!trailerSameAsTruck && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TRAILER OWNER name and contact (if not owned by your company)
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  name="trailerOwnerName"
                  value={formData.trailerOwnerName}
                  onChange={handleInputChange}
                  placeholder="Owner name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="trailerOwnerPhone"
                      value={formData.trailerOwnerPhone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Email (optional)</label>
                    <input
                      type="email"
                      name="trailerOwnerEmail"
                      value={formData.trailerOwnerEmail}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {trailerSameAsTruck && formData.truckOwnerName && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                <span className="font-semibold">{formData.truckOwnerName}</span> will be used as the trailer owner.
              </p>
            </div>
          )}
        </div>

        <VehicleFields
          prefix="trailer"
          values={{
            year: formData.trailerYear,
            make: formData.trailerMake,
            model: formData.trailerModel,
            vin: formData.trailerVin,
          }}
          onChange={handleInputChange}
        />

        {/* Cargo Question */}
        <div className="pt-6 border-t border-gray-100">
          <RadioGroup
            label="Was your cargo damaged?"
            name="cargoDamaged"
            value={formData.cargoDamaged}
            onChange={handleInputChange}
            options={yesNoOptions}
            required
          />
          {formData.cargoDamaged === 'yes' && (
            <p className="mt-3 text-sm text-[#CC9F54] font-medium">
              ✓ Cargo details will be collected in the next step
            </p>
          )}
        </div>
      </div>
    </StepContent>
  );
      // STEP 7: CARGO (CONDITIONAL)
     case 'cargo':
  return (
    <StepContent title="Cargo Information" subtitle="Details about the damaged cargo">
      <div className="space-y-6">
        <RadioGroup
          label="Cargo was (choose one):"
          name="cargoType"
          value={formData.cargoType}
          onChange={handleInputChange}
          options={[
            { value: 'pulled', label: 'Pulled' },
            { value: 'driven', label: 'Driven' },
          ]}
          className="mb-6"
        />

        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
            CARGO OWNER
          </h3>
          
          {/* See Bill of Lading Checkbox */}
          <label className="flex items-center gap-3 mb-4 cursor-pointer group">
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              cargoSeeBillOfLading 
                ? 'bg-[#CC9F54] border-[#CC9F54]' 
                : 'border-gray-300 group-hover:border-[#D9BC82]'
            }`}>
              {cargoSeeBillOfLading && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
            <input
              type="checkbox"
              checked={cargoSeeBillOfLading}
              onChange={(e) => setCargoSeeBillOfLading(e.target.checked)}
              className="sr-only"
            />
            <span className="text-sm font-medium text-gray-700">See Bill of Lading for cargo owner information</span>
          </label>

          {cargoSeeBillOfLading && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-amber-800 mb-4">
                <strong>Note:</strong> Please upload the Bill of Lading below. The claims adjuster will reference it for cargo owner information.
              </p>
              
              {/* Bill of Lading Upload */}
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  billOfLadingFiles.length >= 3
                    ? 'border-gray-200 bg-white'
                    : 'border-amber-300 hover:border-amber-400 hover:bg-amber-100/50 cursor-pointer bg-white'
                }`}
              >
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.zip,.heic"
                  onChange={(e) => {
                    const selectedFiles = e.target.files;
                    if (!selectedFiles) return;
                    const newFiles: UploadedFile[] = [];
                    const remainingSlots = 3 - billOfLadingFiles.length;
                    for (let i = 0; i < Math.min(selectedFiles.length, remainingSlots); i++) {
                      const file = selectedFiles[i];
                      newFiles.push({
                        id: `bol-${Date.now()}-${i}`,
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        file: file,
                      });
                    }
                    setBillOfLadingFiles([...billOfLadingFiles, ...newFiles]);
                    e.target.value = '';
                  }}
                  className="hidden"
                  id="bol-upload"
                  disabled={billOfLadingFiles.length >= 3}
                />
                <label
                  htmlFor="bol-upload"
                  className={billOfLadingFiles.length >= 3 ? 'cursor-not-allowed' : 'cursor-pointer'}
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-6 w-6 text-amber-600" />
                  </div>
                  <p className="text-gray-700 text-sm">
                    <span className="text-amber-600 font-semibold">Click to upload</span> Bill of Lading
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF or images (max 3 files)</p>
                </label>
              </div>

              {billOfLadingFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {billOfLadingFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between bg-white border border-gray-200 px-3 py-2 rounded-lg"
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        <div className="h-8 w-8 bg-amber-100 rounded flex items-center justify-center flex-shrink-0">
                          <FileText className="h-4 w-4 text-amber-600" />
                        </div>
                        <span className="text-sm text-gray-900 truncate">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setBillOfLadingFiles(billOfLadingFiles.filter(f => f.id !== file.id))}
                        className="text-gray-400 hover:text-red-500 p-1 flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!cargoSeeBillOfLading && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CARGO OWNER name and contact information
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  name="cargoOwnerName"
                  value={formData.cargoOwnerName}
                  onChange={handleInputChange}
                  placeholder="Owner name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="cargoOwnerPhone"
                      value={formData.cargoOwnerPhone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Email (optional)</label>
                    <input
                      type="email"
                      name="cargoOwnerEmail"
                      value={formData.cargoOwnerEmail}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <TextArea
          label="DESCRIPTION OF DAMAGED CARGO"
          name="cargoDescription"
          value={formData.cargoDescription}
          onChange={handleInputChange}
          rows={4}
          placeholder="Describe the cargo and the damage..."
        />
      </div>
    </StepContent>
  );

      // STEP 8: OTHER PARTIES
      case 'other-parties':
  return (
    <StepContent title="Other Parties" subtitle="Other vehicles, property damage, and injuries">
      <div className="space-y-8">
        {/* Other Vehicles */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
            OTHER VEHICLE(S)
          </h3>
          <p className="text-sm text-gray-600 italic mb-4">
            For additional vehicles, please note in the description.
          </p>

          {/* Vehicle Owner */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              VEHICLE OWNER name and contact
            </label>
            <div className="space-y-3">
              <input
                type="text"
                name="otherVehicleOwnerName"
                value={formData.otherVehicleOwnerName}
                onChange={handleInputChange}
                placeholder="Owner name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="otherVehicleOwnerPhone"
                    value={formData.otherVehicleOwnerPhone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Email (optional)</label>
                  <input
                    type="email"
                    name="otherVehicleOwnerEmail"
                    value={formData.otherVehicleOwnerEmail}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Driver - with "Same as Owner" checkbox */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              DRIVER name and contact
            </label>
            
            {/* Same as Vehicle Owner Checkbox */}
            <label className="flex items-center gap-3 mb-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                otherVehicleDriverSameAsOwner 
                  ? 'bg-[#CC9F54] border-[#CC9F54]' 
                  : 'border-gray-300 group-hover:border-[#D9BC82]'
              }`}>
                {otherVehicleDriverSameAsOwner && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <input
                type="checkbox"
                checked={otherVehicleDriverSameAsOwner}
                onChange={(e) => {
                  setOtherVehicleDriverSameAsOwner(e.target.checked);
                  if (e.target.checked) {
                    setFormData(prev => ({
                      ...prev,
                      otherVehicleDriverName: prev.otherVehicleOwnerName,
                      otherVehicleDriverPhone: prev.otherVehicleOwnerPhone,
                      otherVehicleDriverEmail: prev.otherVehicleOwnerEmail,
                    }));
                  }
                }}
                className="sr-only"
              />
              <span className="text-sm font-medium text-gray-700">Same as Vehicle Owner</span>
            </label>

            {!otherVehicleDriverSameAsOwner && (
              <div className="space-y-3">
                <input
                  type="text"
                  name="otherVehicleDriverName"
                  value={formData.otherVehicleDriverName}
                  onChange={handleInputChange}
                  placeholder="Driver name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="otherVehicleDriverPhone"
                      value={formData.otherVehicleDriverPhone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Email (optional)</label>
                    <input
                      type="email"
                      name="otherVehicleDriverEmail"
                      value={formData.otherVehicleDriverEmail}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {otherVehicleDriverSameAsOwner && formData.otherVehicleOwnerName && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <span className="font-semibold">{formData.otherVehicleOwnerName}</span> is also the driver.
                </p>
              </div>
            )}
          </div>

          {/* Insurance */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              INSURANCE information
            </label>
            <div className="space-y-3">
              <input
                type="text"
                name="otherVehicleInsuranceName"
                value={formData.otherVehicleInsuranceName}
                onChange={handleInputChange}
                placeholder="Insurance company name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
              />
              <input
                type="text"
                name="otherVehicleInsurancePolicy"
                value={formData.otherVehicleInsurancePolicy}
                onChange={handleInputChange}
                placeholder="Policy number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
              />
            </div>
          </div>

          <VehicleFields
            prefix="otherVehicle"
            values={{
              year: formData.otherVehicleYear,
              make: formData.otherVehicleMake,
              model: formData.otherVehicleModel,
            }}
            onChange={handleInputChange}
            showVin={false}
          />
        </div>

        {/* Property Damage */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
            OTHER DAMAGED PROPERTY
          </h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PROPERTY OWNER name and contact
            </label>
            <div className="space-y-3">
              <input
                type="text"
                name="propertyOwnerName"
                value={formData.propertyOwnerName}
                onChange={handleInputChange}
                placeholder="Property owner name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="propertyOwnerPhone"
                    value={formData.propertyOwnerPhone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Email (optional)</label>
                  <input
                    type="email"
                    name="propertyOwnerEmail"
                    value={formData.propertyOwnerEmail}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>

          <TextArea
            label="DESCRIPTION OF DAMAGED PROPERTY"
            name="propertyDescription"
            value={formData.propertyDescription}
            onChange={handleInputChange}
            rows={3}
            placeholder="Describe the property and damage..."
          />
        </div>

        {/* Bodily Injury */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
            BODILY INJURY
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Other than your driver (already identified above)
          </p>
          
          <div className="space-y-3">
            <input
              type="text"
              name="injuredPartyName"
              value={formData.injuredPartyName}
              onChange={handleInputChange}
              placeholder="Injured party name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Phone *</label>
                <input
                  type="tel"
                  name="injuredPartyPhone"
                  value={formData.injuredPartyPhone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Email (optional)</label>
                <input
                  type="email"
                  name="injuredPartyEmail"
                  value={formData.injuredPartyEmail}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </StepContent>
  );

      // STEP 9: WITNESSES & DOCS
      case 'witnesses':
        return (
          <StepContent title="Witnesses & Documentation" subtitle="Add witnesses and upload photos/documents">
            <div className="space-y-8">
              {/* Witnesses */}
              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
                  WITNESS INFORMATION
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Please provide information for any witnesses to the incident.
                </p>

                {witnesses.map((witness, index) => (
                  <WitnessEntry
                    key={witness.id}
                    witness={witness}
                    index={index}
                    onChange={handleWitnessChange}
                    onRemove={removeWitness}
                    canRemove={witnesses.length > 1}
                  />
                ))}

                <button
                  type="button"
                  onClick={addWitness}
                  className="flex items-center gap-2 text-[#CC9F54] hover:text-[#A87A32] font-semibold px-4 py-2 rounded-lg hover:bg-[#FBF5EB] transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Another Witness
                </button>
              </div>

              {/* File Upload */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
                  PHOTOS & DOCUMENTATION
                </h3>
                <FileUpload
                  files={uploadedFiles}
                  onFilesChange={setUploadedFiles}
                  maxFiles={30}
                />
              </div>
            </div>
          </StepContent>
        );

      // STEP 10: REVIEW & SUBMIT
      case 'review':
        return (
          <StepContent title="Review & Submit" subtitle="Review your information before submitting">
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Incident</h4>
                  <p className="text-sm text-gray-600">{formData.companyName || 'Not provided'}</p>
                  <p className="text-sm text-gray-600">
                    {formData.incidentDate || 'Date not provided'} at {formData.incidentHour ? `${formData.incidentHour}:${formData.incidentMinute || '00'} ${formData.incidentPeriod}` : 'Time not provided'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formData.incidentAddress && `${formData.incidentAddress}, `}
                    {formData.incidentCity && `${formData.incidentCity}, `}
                    {formData.incidentState} {formData.incidentZip}
                  </p>
                  {formData.incidentIntersection && (
                    <p className="text-sm text-gray-500">Near: {formData.incidentIntersection}</p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Claims Contact</h4>
                  <p className="text-sm text-gray-600">{formData.claimsContactName || 'Not provided'}</p>
                  <p className="text-sm text-gray-600">{formData.claimsContactPhone}</p>
                  <p className="text-sm text-gray-600">{formData.claimsContactEmail}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Driver</h4>
                  <p className="text-sm text-gray-600">{formData.driverName || 'Not provided'}</p>
                  <p className="text-sm text-gray-600">{formData.driverType === 'employee' ? 'Employee' : formData.driverType === 'owner-operator' ? 'Owner-Operator' : ''}</p>
                  <p className="text-sm text-gray-600">Injured: {formData.driverInjured === 'yes' ? 'Yes' : 'No'}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Truck</h4>
                  <p className="text-sm text-gray-600">{formData.truckYear} {formData.truckMake} {formData.truckModel}</p>
                  <p className="text-sm text-gray-600">Damaged: {formData.truckDamaged === 'yes' ? 'Yes' : 'No'}</p>
                  <p className="text-sm text-gray-600">Trailer: {formData.trailerPulling === 'yes' ? 'Yes' : 'No'}</p>
                </div>
              </div>

              {/* Checklist */}
              <div className="bg-[#FBF5EB] rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Submission Checklist</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${formData.companyName ? 'bg-green-500' : 'bg-gray-300'}`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700">Incident details completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${formData.incidentAddress && formData.incidentCity && formData.incidentState ? 'bg-green-500' : 'bg-gray-300'}`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700">Location information provided</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${formData.claimsContactName ? 'bg-green-500' : 'bg-gray-300'}`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700">Contact information provided</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${formData.driverName ? 'bg-green-500' : 'bg-gray-300'}`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700">Driver information completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${uploadedFiles.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700">Photos/documents uploaded ({uploadedFiles.length} files)</span>
                  </div>
                </div>
              </div>

              {/* Error Status (only show error inline, success goes to modal) */}
              {submitStatus === 'error' && (
                <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 rounded-r-xl">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-red-800 font-semibold">
                        There was an error submitting the form.
                      </p>
                      {submitError && (
                        <p className="text-red-600 text-sm mt-1">{submitError}</p>
                      )}
                      <p className="text-red-600 text-sm mt-1">Please try again or contact us directly.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </StepContent>
        );

      default:
        return null;
    }
  };

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <>
      <Header />
      <section 
        ref={formContainerRef}
        className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#FBF5EB] py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Trucking Incident Report
            </h1>
            <p className="text-gray-600">
              Complete all sections and submit to your Claims contact
            </p>
          </div>

          {/* Progress Bar */}
          <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            <ProgressBar
              steps={STEPS}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={goToStep}
              formData={formData}
            />
          </div>

          {/* Step Content */}
          <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className={`mt-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={goToPrevStep}
                disabled={isFirstStep}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  isFirstStep
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              {isLastStep ? (
                <div className="flex gap-3">
          
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#CC9F54] to-[#B8893D] text-white rounded-xl font-bold hover:from-[#B8893D] hover:to-[#A87A32] transition-all disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Submitting...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <Check className="w-5 h-5" />
                        Submitted
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#CC9F54] to-[#B8893D] text-white rounded-xl font-bold hover:from-[#B8893D] hover:to-[#A87A32] transition-all shadow-lg hover:shadow-xl"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

 {/* Success Modal */}
<CompleteModal 
  isOpen={showSuccessModal} 
  onClose={handleModalClose} 
  onStartNew={resetForm}
  countdown={resetCountdown}
  claimNumber={claimNumber}
/>

      <Footer />
    </>
  );
};

export default TruckingClaimsForm;



//*Testing again//