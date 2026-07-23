// CompactContactFormModal.tsx
"use client"

import React, { useEffect, useCallback } from 'react';
import { X, ArrowRight, AlertCircle, Send, Mail, User, MapPin, Phone } from 'lucide-react';
import { useContactForm } from '../hooks/useContactForm';
import toast, { Toaster } from 'react-hot-toast';

interface CompactContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const CompactContactFormModal: React.FC<CompactContactFormModalProps> = ({
  isOpen,
  onClose,
  title = "Schedule a Consultation"
}) => {
  const {
    formData,
    loading,
    success,
    error,
    fieldErrors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetContactForm,
    isFormValid
  } = useContactForm();

  // Memoize the success handler
  const handleSuccess = useCallback(() => {
    toast.success('Message sent! We\'ll contact you soon.', {
      duration: 3000,
      position: 'top-center',
    });
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Handle success state
  useEffect(() => {
    if (success) {
      handleSuccess();
    }
  }, [success, handleSuccess]);

  // Handle modal open/close
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        resetContactForm();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fix: Add proper type for form event
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Improved validation helper functions with gradient borders
  const getInputClass = (fieldName: keyof typeof fieldErrors) => {
    const baseClass = "w-full px-4 py-3.5 border-b rounded-none bg-transparent focus:outline-none transition-all duration-300 placeholder-gray-400/70 disabled:opacity-50 disabled:cursor-not-allowed text-sm";
    
    if (fieldErrors[fieldName]) {
      return `${baseClass} border-red-400/50 focus:border-red-500`;
    }
    
    return `${baseClass} border-gray-300/50 focus:border-gray-800`;
  };

  const getTextareaClass = () => {
    const baseClass = "w-full px-4 py-3.5 border-b rounded-none bg-transparent focus:outline-none transition-all duration-300 placeholder-gray-400/70 disabled:opacity-50 disabled:cursor-not-allowed min-h-[120px] text-sm resize-none";
    
    if (fieldErrors.message) {
      return `${baseClass} border-red-400/50 focus:border-red-500`;
    }
    
    return `${baseClass} border-gray-300/50 focus:border-gray-800`;
  };

  if (!isOpen) return null;

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 z-[100] overflow-y-auto">
        {/* Enhanced Backdrop with subtle gradient */}
        <div 
          className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70 backdrop-blur-xl transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
        
        <div className="flex min-h-full items-center justify-center p-4">
          {/* Modern Modal Container with gradient border */}
          <div 
            className="relative w-full max-w-lg mx-auto animate-[fadeInUp_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient Border Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-2xl opacity-30 blur-sm"></div>
            
            <div className="relative bg-gradient-to-br from-white via-white to-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-white/10">
              {/* Decorative Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600"></div>
              
              {/* Header with Icon */}
              <div className="px-8 pt-8 pb-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center shadow-lg">
                      <Send className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 
                        className="text-2xl font-light text-gray-900"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Let's discuss your architectural vision
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100/50 transition-all duration-200 hover:scale-110 group"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-gray-500 group-hover:text-gray-800 transition-colors duration-200" />
                  </button>
                </div>
                
                {/* Form */}
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Grid for Name and City */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name Field */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <User className="w-4 h-4 text-gray-600" />
                        <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700">
                          Full Name *
                        </label>
                      </div>
                      <input
                        type="text"
                        id="modal-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={loading}
                        className={getInputClass('name')}
                        placeholder="Enter your full name"
                        maxLength={50}
                      />
                      {fieldErrors.name && (
                        <p className="text-red-500 text-xs mt-2 flex items-center gap-2">
                          <AlertCircle className="w-3 h-3" />
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>
                    
                    {/* City Field */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-gray-600" />
                        <label htmlFor="modal-city" className="block text-sm font-medium text-gray-700">
                          City *
                        </label>
                      </div>
                      <input
                        type="text"
                        id="modal-city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={loading}
                        className={getInputClass('city')}
                        placeholder="Enter your city"
                        maxLength={30}
                      />
                      {fieldErrors.city && (
                        <p className="text-red-500 text-xs mt-2 flex items-center gap-2">
                          <AlertCircle className="w-3 h-3" />
                          {fieldErrors.city}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Indian Mobile Number Field */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Phone className="w-4 h-4 text-gray-600" />
                      <label htmlFor="modal-phone" className="block text-sm font-medium text-gray-700">
                        Indian Mobile Number *
                      </label>
                    </div>
                    <div className="relative">
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center gap-2 bg-gray-100/50 px-3 py-2 rounded-l">
                        <span className="text-lg">🇮🇳</span>
                        <span className="text-gray-600 text-sm font-medium">+91</span>
                      </div>
                      <input
                        type="tel"
                        id="modal-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={loading}
                        className={`pl-20 ${getInputClass('phone')} rounded-r`}
                        placeholder="XXXXX XXXXX"
                        maxLength={12}
                      />
                    </div>
                    {fieldErrors.phone ? (
                      <p className="text-red-500 text-xs mt-2 flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" />
                        {fieldErrors.phone}
                      </p>
                    ) : (
                      <p className="text-gray-500 text-xs mt-2">
                        Enter 10-digit Indian mobile number
                      </p>
                    )}
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Mail className="w-4 h-4 text-gray-600" />
                      <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700">
                        Email Address *
                      </label>
                    </div>
                    <input
                      type="email"
                      id="modal-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                      className={getInputClass('email')}
                      placeholder="Enter your email address"
                    />
                    {fieldErrors.email && (
                      <p className="text-red-500 text-xs mt-2 flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" />
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                  
                  {/* Message Field */}
                  <div>
                    <label htmlFor="modal-message" className="block text-sm font-medium text-gray-700 mb-3">
                      Project Details *
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                      rows={4}
                      className={getTextareaClass()}
                      placeholder="Tell us about your architectural vision, project requirements, and any specific details..."
                      maxLength={500}
                    />
                    {fieldErrors.message && (
                      <p className="text-red-500 text-xs mt-2 flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" />
                        {fieldErrors.message}
                      </p>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-gray-500 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Minimum 50 characters recommended
                      </p>
                      <span className={`text-xs font-medium ${
                        formData.message.length >= 50 ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {formData.message.length}/500
                      </span>
                    </div>
                  </div>
                  
                  {/* Submit Button with Gradient */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading || !isFormValid}
                      className="group relative w-full py-4 px-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {/* Animated Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Subtle Pattern Overlay */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{ 
                          backgroundImage: `linear-gradient(45deg, transparent 45%, white 45%, white 55%, transparent 55%)`, 
                          backgroundSize: '20px 20px' 
                        }}></div>
                      </div>
                      
                      <div className="relative z-10 flex items-center justify-center gap-3">
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm font-medium tracking-wide">SENDING...</span>
                          </>
                        ) : (
                          <>
                            <span className="text-sm font-medium tracking-wide">SEND CONSULTATION REQUEST</span>
                            <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                          </>
                        )}
                      </div>
                    </button>
                    
                    {/* Form Status */}
                    {!isFormValid && !loading && (
                      <p className="text-amber-600 text-xs flex items-center justify-center gap-2 mt-3 p-3 bg-amber-50/50 rounded-lg">
                        <AlertCircle className="w-3 h-3" />
                        Please complete all fields with valid information to proceed
                      </p>
                    )}
                  </div>
                </form>
              </div>
              
              {/* Footer */}
              <div className="px-8 py-6 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <p className="text-gray-500 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <span className="font-medium">Response Time:</span> 24 hours
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-gray-500 text-xs">Available now</span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-3 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                  By submitting, you agree to our Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap');
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.98); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        .animate-\\[fadeInUp_0\\.3s_ease-out\\] {
          animation: fadeInUp 0.3s ease-out;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Custom scrollbar for textarea */
        textarea::-webkit-scrollbar {
          width: 6px;
        }
        
        textarea::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        textarea::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        
        textarea::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        
        /* Focus styles for inputs */
        input:focus, textarea:focus {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        
        /* Gradient text effect */
        .gradient-text {
          background: linear-gradient(90deg, #4b5563, #1f2937, #111827);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </>
  );
};

export default CompactContactFormModal;