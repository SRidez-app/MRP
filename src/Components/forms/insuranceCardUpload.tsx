'use client';

import React, { useState, useRef } from 'react';
import { CreditCard, Check, AlertCircle, Loader2, X, Eye } from 'lucide-react';
import { InsuranceCardData } from './types';

interface InsuranceCardUploadProps {
  onDataExtracted: (data: InsuranceCardData, file?: File) => void;  // Updated to include file
  extractedData: InsuranceCardData | null;
  onClear: () => void;
}

// Minimum dimensions for accurate OCR
const MIN_WIDTH = 1200;
const MIN_HEIGHT = 800;

const InsuranceCardUpload: React.FC<InsuranceCardUploadProps> = ({
  onDataExtracted,
  extractedData,
  onClear,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);  // Store the file
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to resize image if too small
  const resizeImageIfNeeded = (file: File): Promise<{ base64: string; mediaType: string }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => {
          const originalWidth = img.width;
          const originalHeight = img.height;

          // Calculate if we need to upscale
          let targetWidth = originalWidth;
          let targetHeight = originalHeight;
          
          // If image is smaller than minimum, scale it up
          if (originalWidth < MIN_WIDTH || originalHeight < MIN_HEIGHT) {
            const scaleX = MIN_WIDTH / originalWidth;
            const scaleY = MIN_HEIGHT / originalHeight;
            const scale = Math.max(scaleX, scaleY, 1);
            
            targetWidth = Math.round(originalWidth * scale);
            targetHeight = Math.round(originalHeight * scale);
          }

          // Create canvas and draw resized image
          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          // Use better image smoothing for upscaling
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          // Draw the image
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          // Convert to base64 with high quality
          const base64 = canvas.toDataURL('image/jpeg', 0.95).split(',')[1];
          
          console.log(`Image resized: ${originalWidth}x${originalHeight} → ${targetWidth}x${targetHeight}`);
          
          resolve({ base64, mediaType: 'image/jpeg' });
        };

        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG, etc.)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be less than 10MB');
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadedFile(file);  // Store the file

    try {
      // Create preview
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      // Resize image if needed and convert to base64
      const { base64, mediaType } = await resizeImageIfNeeded(file);

      // Call API
      const response = await fetch('/api/parse-insurance-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64,
          mediaType: mediaType,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to parse insurance card');
      }

      // Pass both the extracted data AND the original file to parent
      onDataExtracted(result.data, file);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process insurance card');
      setPreviewUrl(null);
      setUploadedFile(null);  // Clear file on error
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClear = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setError(null);
    setUploadedFile(null);  // Clear the stored file
    onClear();
  };

  // Show extracted data summary
  if (extractedData && (extractedData.insuranceCompany || extractedData.policyNumber)) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-green-800">Insurance Card Scanned</h4>
              <p className="text-sm text-green-600">Data extracted successfully</p>
            </div>
          </div>
          <div className="flex gap-2">
            {previewUrl && (
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="text-green-600 hover:text-green-700 p-2 hover:bg-green-100 rounded-lg transition-colors"
                title="View card"
              >
                <Eye className="w-5 h-5" />
              </button>
            )}
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
              title="Remove card"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Extracted Data Summary */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {extractedData.insuranceCompany && (
            <div className="bg-white/60 rounded-lg px-3 py-2">
              <span className="text-gray-500 text-xs block">Insurance Company</span>
              <span className="font-medium text-gray-900">{extractedData.insuranceCompany}</span>
            </div>
          )}
          {extractedData.policyNumber && (
            <div className="bg-white/60 rounded-lg px-3 py-2">
              <span className="text-gray-500 text-xs block">Policy Number</span>
              <span className="font-medium text-gray-900">{extractedData.policyNumber}</span>
            </div>
          )}
          {(extractedData.policyholderFirstName || extractedData.policyholderLastName) && (
            <div className="bg-white/60 rounded-lg px-3 py-2">
              <span className="text-gray-500 text-xs block">Policyholder</span>
              <span className="font-medium text-gray-900">
                {extractedData.policyholderFirstName} {extractedData.policyholderLastName}
              </span>
            </div>
          )}
          {(extractedData.vehicleYear || extractedData.vehicleMake || extractedData.vehicleModel) && (
            <div className="bg-white/60 rounded-lg px-3 py-2">
              <span className="text-gray-500 text-xs block">Vehicle</span>
              <span className="font-medium text-gray-900">
                {[extractedData.vehicleYear, extractedData.vehicleMake, extractedData.vehicleModel]
                  .filter(Boolean)
                  .join(' ')}
              </span>
            </div>
          )}
        </div>

        <p className="text-xs text-green-600 mt-3">
          ✓ This data will be used to auto-fill fields and the card image will be attached to your claim
        </p>

        {/* Preview Modal */}
        {showPreview && previewUrl && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setShowPreview(false)}
          >
            <div className="relative max-w-2xl">
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={previewUrl}
                alt="Insurance Card"
                className="max-h-[80vh] rounded-lg shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Upload state
  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
          isUploading
            ? 'border-[#D9BC82] bg-[#FBF5EB]'
            : error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 hover:border-[#D9BC82] hover:bg-[#FBF5EB]/50 cursor-pointer'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="insurance-card-upload"
          disabled={isUploading}
        />
        <label
          htmlFor="insurance-card-upload"
          className={isUploading ? 'cursor-wait' : 'cursor-pointer'}
        >
          <div className="w-14 h-14 bg-[#FBF5EB] rounded-full flex items-center justify-center mx-auto mb-3">
            {isUploading ? (
              <Loader2 className="w-7 h-7 text-[#CC9F54] animate-spin" />
            ) : (
              <CreditCard className="w-7 h-7 text-[#CC9F54]" />
            )}
          </div>
          <p className="text-gray-700 font-medium">
            {isUploading ? (
              'Analyzing insurance card...'
            ) : (
              <>
                <span className="text-[#CC9F54]">Upload your insurance card</span> to auto-fill
              </>
            )}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            We&apos;ll extract policy info, vehicle details, and policyholder name
          </p>
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default InsuranceCardUpload;

//*Testing**//