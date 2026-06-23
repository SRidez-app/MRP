'use client' 

import React, { useState, useEffect } from 'react';
import { X, Upload, ZoomIn } from 'lucide-react';
import { WitnessInfo, UploadedFile } from './types';

// ============================================
// TEXT INPUT COMPONENT
// ============================================
interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder,
  className = '',
  labelClassName = 'font-medium',
}) => (
  <div className={className}>
    <label className={`block text-sm text-gray-700 mb-2 ${labelClassName}`}>
      {label} {required && <span className="text-[#CC9F54]">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 bg-white hover:border-gray-300"
    />
  </div>
);

// ============================================
// TEXT AREA COMPONENT
// ============================================
interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  required?: boolean;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  rows = 3,
  required = false,
  placeholder,
  className = '',
  labelClassName = 'font-medium',
}) => (
  <div className={className}>
    <label className={`block text-sm text-gray-700 mb-2 ${labelClassName}`}>
      {label} {required && <span className="text-[#CC9F54]">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 bg-white hover:border-gray-300 resize-none"
    />
  </div>
);

// ============================================
// SELECT COMPONENT
// ============================================
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  placeholder = 'Select an option',
  className = '',
  labelClassName = 'font-medium',
}) => (
  <div className={className}>
    <label className={`block text-sm text-gray-700 mb-2 ${labelClassName}`}>
      {label} {required && <span className="text-[#CC9F54]">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 bg-white hover:border-gray-300 cursor-pointer"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// ============================================
// RADIO GROUP COMPONENT
// ============================================
interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: RadioOption[];
  required?: boolean;
  className?: string;
  labelClassName?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  className = '',
  labelClassName = 'font-semibold',
}) => (
  <div className={className}>
    <p className={`block text-sm text-gray-700 mb-3 ${labelClassName}`}>
      {label} {required && <span className="text-[#CC9F54]">*</span>}
    </p>
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <label
          key={option.value}
          className={`inline-flex items-center px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all select-none ${
            value === option.value
              ? 'border-[#CC9F54] bg-[#FBF5EB] text-[#A87A32]'
              : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            className="absolute opacity-0 w-0 h-0"
          />
          <span
            className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0 transition-colors ${
              value === option.value ? 'border-[#CC9F54]' : 'border-gray-400'
            }`}
          >
            {value === option.value && (
              <span className="w-2 h-2 rounded-full bg-[#CC9F54]"></span>
            )}
          </span>
          <span className="font-medium text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  </div>
);

// ============================================
// FORM SECTION WRAPPER
// ============================================
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  darkHeader?: boolean;
  icon?: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  darkHeader = false,
  icon,
}) => (
  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    {darkHeader ? (
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-4">
        <div className="flex items-center gap-3">
          {icon && <div className="text-[#D9BC82]">{icon}</div>}
          <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
        </div>
      </div>
    ) : (
      <div className="border-b-4 border-[#CC9F54] px-6 py-4 bg-gradient-to-r from-[#FBF5EB] to-white">
        <div className="flex items-center gap-3">
          {icon && <div className="text-[#CC9F54]">{icon}</div>}
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h2>
        </div>
      </div>
    )}
    <div className="p-5 sm:p-8">{children}</div>
  </div>
);

// ============================================
// SUB SECTION WRAPPER
// ============================================
interface SubSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const SubSection: React.FC<SubSectionProps> = ({
  title,
  children,
  className = 'mt-6 pt-6 border-t border-gray-100',
}) => (
  <div className={className}>
    {title && (
      <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
        <div className="w-1 h-4 bg-[#CC9F54] rounded mr-2"></div>
        {title}
      </h3>
    )}
    {children}
  </div>
);

// ============================================
// CONTACT FIELDS (REUSABLE GROUP)
// ============================================
interface ContactFieldsProps {
  prefix: string;
  values: {
    name: string;
    title?: string;
    phone: string;
    email: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showTitle?: boolean;
  required?: boolean;
}

export const ContactFields: React.FC<ContactFieldsProps> = ({
  prefix,
  values,
  onChange,
  showTitle = true,
  required = false,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <TextInput
      label="NAME"
      name={`${prefix}Name`}
      value={values.name}
      onChange={onChange}
      required={required}
    />
    {showTitle && values.title !== undefined && (
      <TextInput
        label="TITLE"
        name={`${prefix}Title`}
        value={values.title}
        onChange={onChange}
        required={required}
      />
    )}
    <TextInput
      label="PHONE"
      name={`${prefix}Phone`}
      value={values.phone}
      onChange={onChange}
      type="tel"
      required={required}
    />
    <TextInput
      label="EMAIL"
      name={`${prefix}Email`}
      value={values.email}
      onChange={onChange}
      type="email"
      required={required}
    />
  </div>
);

// ============================================
// VEHICLE FIELDS (REUSABLE GROUP)
// ============================================
interface VehicleFieldsProps {
  prefix: string;
  values: {
    year: string;
    make: string;
    model: string;
    vin?: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showVin?: boolean;
}

export const VehicleFields: React.FC<VehicleFieldsProps> = ({
  prefix,
  values,
  onChange,
  showVin = true,
}) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <TextInput
        label="YEAR"
        name={`${prefix}Year`}
        value={values.year}
        onChange={onChange}
      />
      <TextInput
        label="MAKE"
        name={`${prefix}Make`}
        value={values.make}
        onChange={onChange}
      />
      <TextInput
        label="MODEL"
        name={`${prefix}Model`}
        value={values.model}
        onChange={onChange}
      />
    </div>
    {showVin && values.vin !== undefined && (
      <TextInput
        label="VIN # (last 6 digits min)"
        name={`${prefix}Vin`}
        value={values.vin}
        onChange={onChange}
      />
    )}
  </>
);

// ============================================
// OWNER FIELDS (REUSABLE GROUP)
// ============================================
interface OwnerFieldsProps {
  prefix: string;
  nameValue: string;
  contactValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export const OwnerFields: React.FC<OwnerFieldsProps> = ({
  prefix,
  nameValue,
  contactValue,
  onChange,
  label = 'OWNER name and contact information',
}) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="space-y-3">
      <input
        type="text"
        name={`${prefix}OwnerName`}
        value={nameValue}
        onChange={onChange}
        placeholder="Owner name"
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
      />
      <input
        type="text"
        name={`${prefix}OwnerContact`}
        value={contactValue}
        onChange={onChange}
        placeholder="Contact information"
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 hover:border-gray-300"
      />
    </div>
  </div>
);

// ============================================
// WITNESS ENTRY COMPONENT
// ============================================
interface WitnessEntryProps {
  witness: WitnessInfo;
  index: number;
  onChange: (id: string, field: keyof WitnessInfo, value: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

export const WitnessEntry: React.FC<WitnessEntryProps> = ({
  witness,
  index,
  onChange,
  onRemove,
  canRemove,
}) => (
  <div className="bg-gray-50 border-2 border-gray-100 rounded-xl p-4 sm:p-5 mb-4 hover:border-[#E5CFA5] transition-colors">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#CC9F54] rounded-full flex items-center justify-center text-white font-bold text-sm">
          {index + 1}
        </div>
        <h4 className="font-semibold text-gray-900">Witness #{index + 1}</h4>
      </div>
      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(witness.id)}
          className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
          aria-label="Remove witness"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={witness.name}
          onChange={(e) => onChange(witness.id, 'name', e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 bg-white hover:border-gray-300"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="tel"
          value={witness.phone}
          onChange={(e) => onChange(witness.id, 'phone', e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 bg-white hover:border-gray-300"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={witness.email}
          onChange={(e) => onChange(witness.id, 'email', e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 bg-white hover:border-gray-300"
        />
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Statement</label>
      <textarea
        value={witness.statement}
        onChange={(e) => onChange(witness.id, 'statement', e.target.value)}
        rows={3}
        placeholder="Witness account of what happened..."
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC9F54] focus:ring-2 focus:ring-[#CC9F54]/20 outline-none transition-all text-gray-900 bg-white hover:border-gray-300 resize-none"
      />
    </div>
  </div>
);

// ============================================
// IMAGE LIGHTBOX COMPONENT
// ============================================
interface ImageLightboxProps {
  isOpen: boolean;
  imageUrl: string;
  fileName: string;
  onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ isOpen, imageUrl, fileName, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-[#D9BC82] transition-colors p-2"
          aria-label="Close preview"
        >
          <X className="h-8 w-8" />
        </button>
        
        {/* Image */}
        <img
          src={imageUrl}
          alt={fileName}
          className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        
        {/* File Name */}
        <p className="text-white text-center mt-4 text-sm truncate">{fileName}</p>
      </div>
    </div>
  );
};

// ============================================
// FILE UPLOAD COMPONENT WITH IMAGE THUMBNAILS
// ============================================
interface UploadedFileWithPreview extends UploadedFile {
  previewUrl?: string;
}

interface FileUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  acceptedTypes?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  files,
  onFilesChange,
  maxFiles = 10,
  acceptedTypes = '.png,.jpg,.jpeg,image/png,image/jpeg,image/jpg,.pdf,.doc,.docx,video/*',
}) => {
  const [filesWithPreviews, setFilesWithPreviews] = useState<UploadedFileWithPreview[]>([]);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; name: string } | null>(null);

  // Generate preview URLs for image files
  useEffect(() => {
    const generatePreviews = async () => {
      const updatedFiles: UploadedFileWithPreview[] = await Promise.all(
        files.map(async (file) => {
          if (file.type.startsWith('image/') && file.file) {
            const previewUrl = URL.createObjectURL(file.file);
            return { ...file, previewUrl };
          }
          return file;
        })
      );
      setFilesWithPreviews(updatedFiles);
    };

    generatePreviews();

    // Cleanup preview URLs when component unmounts or files change
    return () => {
      filesWithPreviews.forEach((file) => {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
    };
  }, [files]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = [];
    const remainingSlots = maxFiles - files.length;

    for (let i = 0; i < Math.min(selectedFiles.length, remainingSlots); i++) {
      const file = selectedFiles[i];
      newFiles.push({
        id: `${Date.now()}-${i}`,
        name: file.name,
        type: file.type,
        size: file.size,
        file: file,
      });
    }

    onFilesChange([...files, ...newFiles]);
    e.target.value = '';
  };

  const handleRemoveFile = (id: string) => {
    const fileToRemove = filesWithPreviews.find((f) => f.id === id);
    if (fileToRemove?.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    onFilesChange(files.filter((f) => f.id !== id));
  };

  const handleImageClick = (file: UploadedFileWithPreview) => {
    if (file.previewUrl) {
      setLightboxImage({ url: file.previewUrl, name: file.name });
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const isImageFile = (type: string): boolean => {
    return type.startsWith('image/');
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        PHOTOS & DOCUMENTS
      </label>
      <p className="text-sm text-gray-600 mb-4">
        Upload photos of the scene, vehicle damage, dashcam footage, police reports, or any
        other relevant documents. (Max {maxFiles} files)
      </p>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          files.length >= maxFiles
            ? 'border-gray-200 bg-gray-50'
            : 'border-gray-300 hover:border-[#D9BC82] hover:bg-[#FBF5EB]/50 cursor-pointer'
        }`}
      >
        <input
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          disabled={files.length >= maxFiles}
        />
        <label
          htmlFor="file-upload"
          className={files.length >= maxFiles ? 'cursor-not-allowed' : 'cursor-pointer'}
        >
          <div className="w-16 h-16 bg-[#FBF5EB] rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="h-8 w-8 text-[#CC9F54]" />
          </div>
          <p className="text-gray-700">
            <span className="text-[#CC9F54] font-semibold hover:text-[#A87A32]">
              Click to upload
            </span>{' '}
            or drag and drop
          </p>
          <p className="text-sm text-gray-500 mt-2">
            PNG, JPG, JPEG, PDF, and documents up to 25MB each
          </p>
        </label>
      </div>

      {/* Image Thumbnails Grid */}
      {filesWithPreviews.some((f) => isImageFile(f.type)) && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filesWithPreviews
              .filter((f) => isImageFile(f.type))
              .map((file) => (
                <div
                  key={file.id}
                  className="relative group rounded-xl overflow-hidden border-2 border-gray-200 hover:border-[#D9BC82] transition-all bg-gray-100 aspect-square"
                >
                  {/* Thumbnail Image */}
                  <img
                    src={file.previewUrl}
                    alt={file.name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => handleImageClick(file)}
                  />
                  
                  {/* Hover Overlay */}
                  <div 
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                    onClick={() => handleImageClick(file)}
                  >
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(file.id);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  {/* File Name */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-white text-xs truncate">{file.name}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Non-Image Files List */}
      {filesWithPreviews.some((f) => !isImageFile(f.type)) && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Documents & Videos</p>
          <div className="space-y-2">
            {filesWithPreviews
              .filter((f) => !isImageFile(f.type))
              .map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between bg-white border-2 border-gray-100 px-4 py-3 rounded-lg hover:border-[#E5CFA5] transition-colors"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="flex-shrink-0">
                      {file.type.startsWith('video/') ? (
                        <div className="h-10 w-10 bg-[#FBF5EB] rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold text-[#CC9F54]">VID</span>
                        </div>
                      ) : file.type.includes('pdf') ? (
                        <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold text-red-600">PDF</span>
                        </div>
                      ) : (
                        <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-600">DOC</span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(file.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all flex-shrink-0 ml-4"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxImage !== null}
        imageUrl={lightboxImage?.url || ''}
        fileName={lightboxImage?.name || ''}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
};

// ============================================
// YES/NO RADIO OPTIONS (CONSTANT)
// ============================================
export const yesNoOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];