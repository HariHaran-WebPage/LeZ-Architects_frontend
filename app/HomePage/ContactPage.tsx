"use client"
import React, { useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  HeartHandshake, 
  ArrowRight, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useContactForm } from '../hooks/useContactForm';
import toast, { Toaster } from 'react-hot-toast';

// Social media icons remain as in your original HomeContactPage
const socialIcons = [
  {
    name: 'facebook',
    icon: (
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    name: 'twitter',
    icon: (
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63a9.935 9.935 0 002.46-2.543l-.047-.02z"/>
      </svg>
    )
  },
  {
    name: 'instagram',
    icon: (
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.22 14.815 3.73 13.664 3.73 12.367s.49-2.448 1.396-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.906.875 1.396 2.026 1.396 3.323s-.49 2.448-1.396 3.323c-.875.807-2.026 1.297-3.323 1.297zm8.062-9.745c-.36 0-.652-.292-.652-.652s.292-.652.652-.652c.36 0 .652.292.652.652s-.292.652-.652.652zm1.396 8.062c-1.036 1.036-2.448 1.687-4.024 1.687s-2.988-.651-4.024-1.687c-1.036-1.036-1.687-2.448-1.687-4.024s.651-2.988 1.687-4.024c1.036-1.036 2.448-1.687 4.024-1.687s2.988.651 4.024 1.687c1.036 1.036 1.687 2.448 1.687 4.024s-.651 2.988-1.687 4.024z"/>
      </svg>
    )
  },
  {
    name: 'linkedin',
    icon: (
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  }
];

const COLORS = {
  primary: {
    gray: {
      400: '#949494',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    white: '#ffffff',
    black: '#000000',
  },
};

const HomeContactPage = () => {
  // Use the same contact form hook
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
    clearContactError,
    isFormValid
  } = useContactForm();

  // Show success/error toasts
  useEffect(() => {
    if (success) {
      toast.success('Message sent successfully! We\'ll get back to you soon.', {
        duration: 5000,
        position: 'top-right',
        icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      });
    }
    
    if (error && !Object.keys(fieldErrors).length) {
      toast.error(error, {
        duration: 5000,
        position: 'top-right',
        icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      });
    }
  }, [success, error, fieldErrors]);

  // Reset success state after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        resetContactForm();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, resetContactForm]);

  // Validation helper functions
  const getInputClass = (fieldName: string) => {
    const baseClass = "w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed";
    
    if (fieldErrors[fieldName]) {
      return `${baseClass} border-red-300 focus:ring-red-500`;
    }
    
    return `${baseClass} border-gray-300 focus:ring-gray-800`;
  };

  const getTextareaClass = () => {
    const baseClass = "w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50 placeholder-gray-400 resize-vertical disabled:opacity-50 disabled:cursor-not-allowed min-h-[150px]";
    
    if (fieldErrors.message) {
      return `${baseClass} border-red-300 focus:ring-red-500`;
    }
    
    return `${baseClass} border-gray-300 focus:ring-gray-800`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-200">
      <Toaster />
      
      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Thank You!
              </h3>
              <p className="text-gray-600 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                Your message has been sent successfully. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={resetContactForm}
                className="px-6 py-3 bg-gradient-to-r from-[#737373] to-[#525252] text-white rounded-xl hover:shadow-lg transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div 
        className="bg-gradient-to-b from-black to-gray-900 text-white py-20 px-4"
        style={{ fontFamily: "'Playfair Display', serif", fontWeight: '500' }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Get in touch with us - We're here to help and answer any questions you might have
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-96 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.177631294987!2d-74.00594908459418!3d40.71278367933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316e12e88d%3A0x8f6b6e81129a8a38!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="filter grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
              <h2 
                className="text-3xl mb-8 text-gray-800"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: '500' }}
              >
                Get In Touch
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-gray-500 to-gray-700 p-3 rounded-xl shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Location</h3>
                    <p className="text-gray-600">123 Business Avenue<br />New York, NY 10001<br />United States</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-gray-500 to-gray-700 p-3 rounded-xl shadow-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone Number</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-gray-500 to-gray-700 p-3 rounded-xl shadow-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Address</h3>
                    <p className="text-gray-600">contact@example.com</p>
                    <p className="text-gray-600">support@example.com</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialIcons.map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className="bg-gradient-to-r from-gray-500 to-gray-700 p-3 rounded-xl shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200 flex items-center justify-center"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
              <h2 
                className="text-3xl mb-2 text-gray-800"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: '500' }}
              >
                Send us a Message
              </h2>
              <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you as soon as possible</p>
              
              {/* Validation Summary */}
              {Object.keys(fieldErrors).length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-800 font-medium mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Please fix the following errors:
                      </p>
                      <ul className="text-red-600 text-sm list-disc list-inside space-y-1">
                        {fieldErrors.name && <li>Name: {fieldErrors.name}</li>}
                        {fieldErrors.city && <li>City: {fieldErrors.city}</li>}
                        {fieldErrors.phone && <li>Phone: {fieldErrors.phone}</li>}
                        {fieldErrors.email && <li>Email: {fieldErrors.email}</li>}
                        {fieldErrors.message && <li>Message: {fieldErrors.message}</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                      className={getInputClass('name')}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      placeholder="Enter your full name"
                      maxLength={50}
                    />
                    {fieldErrors.name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>
                  
                  {/* City Field */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                      className={getInputClass('city')}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      placeholder="Enter your city"
                      maxLength={30}
                    />
                    {fieldErrors.city && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {fieldErrors.city}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Field with Indian Flag */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Indian Mobile Number *
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                        <span className="text-lg">🇮🇳</span>
                        <span className="text-gray-600 text-sm">+91</span>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={loading}
                        className={`pl-20 ${getInputClass('phone')}`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        placeholder="XXXXX XXXXX"
                        maxLength={12}
                      />
                    </div>
                    {fieldErrors.phone ? (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {fieldErrors.phone}
                      </p>
                    ) : (
                      <p className="text-gray-500 text-xs mt-1">
                        Enter 10-digit Indian mobile number
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                      className={getInputClass('email')}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      placeholder="Enter your email address"
                    />
                    {fieldErrors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    rows={6}
                    className={getTextareaClass()}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    placeholder="Tell us how we can help you..."
                    maxLength={500}
                  />
                  {fieldErrors.message && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className={`group inline-flex items-center justify-center gap-3 w-full text-white py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-500 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-semibold text-lg relative ${
                    isFormValid 
                      ? 'bg-gradient-to-r from-gray-600 to-gray-800' 
                      : 'bg-gradient-to-r from-gray-400 to-gray-500'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isFormValid ? 'group-hover:translate-x-1' : ''}`} />
                    </>
                  )}
                </button>

                {/* Form Status */}
                <div className="text-center">
                  {!isFormValid && !loading && (
                    <p className="text-yellow-600 text-sm flex items-center justify-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Please complete all fields with valid information to enable submission
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

   

      {/* Add necessary styles */}
      <style jsx global>{`
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
        
        .resize-vertical {
          resize: vertical;
        }
        
        .min-h-\\[150px\\] {
          min-height: 150px;
        }
        
        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(0.25rem);
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
        
        .grayscale {
          filter: grayscale(100%);
        }
        
        .hover\\:grayscale-0:hover {
          filter: grayscale(0%);
        }
      `}</style>
    </div>
  );
};

export default HomeContactPage;