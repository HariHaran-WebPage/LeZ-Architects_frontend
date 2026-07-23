"use client"
import React, { useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  HeartHandshake, 
  ArrowRight, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useContactForm } from '../hooks/useContactForm';
import toast, { Toaster } from 'react-hot-toast';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Color constants for consistent theming
const COLORS = {
  primary: {
    gray: { 
      light: '#F8F9FA', 
      medium: '#E9ECEF', 
      dark: '#DEE2E6',
      subtle: '#F1F3F5',
      rich: '#343A40',
      charcoal: '#212529'
    }
  },
  gradients: {
    grayLight: 'from-[#F8F9FA] to-[#E9ECEF]',
    grayMedium: 'from-[#E9ECEF] to-[#DEE2E6]',
    grayDark: 'from-[#495057] to-[#343A40]',
    grayCharcoal: 'from-[#343A40] to-[#212529]'
  }
} as const;

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Animated component wrapper
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ContactPage = () => {
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

  const socialMediaIcons = [
    { name: 'facebook', icon: Facebook },
    { name: 'twitter', icon: Twitter },
    { name: 'instagram', icon: Instagram },
    { name: 'linkedin', icon: Linkedin },
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#F8F9FA]">
      <Toaster />
      
      {/* Font imports and global styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      `}</style>

      {/* Hero Section - Same as Blog page */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 via-transparent to-gray-700/20 animate-[shimmer_8s_ease-in-out_infinite]"></div>
        </div>
        
        {/* Grid Background */}
        <div className="absolute inset-0 z-10 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `linear-gradient(90deg, transparent 49.9%, ${COLORS.primary.gray.light} 50%, transparent 50.1%)`, 
            backgroundSize: '60px 60px' 
          }}></div>
          <div className="absolute inset-0" style={{ 
            backgroundImage: `linear-gradient(transparent 49.9%, ${COLORS.primary.gray.light} 50%, transparent 50.1%)`, 
            backgroundSize: '60px 60px' 
          }}></div>
        </div>
        
        {/* Animated Lines */}
        <div className="absolute inset-0 z-10 opacity-15">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent animate-[slideDown_4s_ease-in-out_infinite]"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent animate-[slideDown_4s_ease-in-out_infinite]" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent animate-[slideRight_4s_ease-in-out_infinite]"></div>
          <div className="absolute left-0 bottom-1/4 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent animate-[slideRight_4s_ease-in-out_infinite]" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Floating Dots */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-60 animate-[float_6s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full opacity-40 animate-[float_8s_ease-in-out_infinite]" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white rounded-full opacity-50 animate-[float_7s_ease-in-out_infinite]" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-white rounded-full opacity-30 animate-[float_5s_ease-in-out_infinite]" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 right-1/5 w-1 h-1 bg-white rounded-full opacity-40 animate-[float_9s_ease-in-out_infinite]" style={{animationDelay: '3s'}}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-20 text-center px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="mb-6 inline-block">
            <div className="flex items-center gap-4 sm:gap-6 mb-6">
              <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[expandWidth_1.5s_ease-out]"></div>
              <div className="relative">
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-[fadeInUp_1s_ease-out] drop-shadow-2xl relative z-10" />
                <div className="absolute -inset-3 bg-white/10 rounded-full blur-sm animate-pulse"></div>
              </div>
              <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent via-white/60 to-transparent animate-[expandWidth_1.5s_ease-out_0.5s]"></div>
            </div>
          </div>
          
          <p style={{ 
            fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontWeight: '300',
            letterSpacing: '0.3em',
            fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)'
          }} className="text-gray-300 mb-4 animate-[fadeInUp_1s_ease-out] tracking-wider uppercase">
            Get In Touch With Us
          </p>
          
          <div className="relative mb-6">
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontWeight: '300',
              color: 'white',
              letterSpacing: '0.02em',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)'
            }} className="tracking-tight animate-[fadeInUp_1.2s_ease-out] drop-shadow-2xl leading-none">
              <span className="inline-block relative group mb-2">
                <span className="relative z-10 transition-all duration-500 group-hover:text-gray-200">Contact</span>
                <div className={`absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r ${COLORS.gradients.grayLight} transform origin-left animate-[expandWidth_1.8s_ease-out] shadow-lg shadow-gray-400/50`}></div>
                <div className="absolute inset-0 blur-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </span>
              
              <span className="block md:inline-block mx-2 sm:mx-3 md:mx-4">
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300 font-normal italic animate-[shimmer_4s_ease-in-out_infinite] text-4xl sm:text-5xl md:text-6xl" style={{backgroundSize: '200% auto'}}>
                  Us
                </span>
              </span>
              
              <span className="inline-block relative group mt-2 md:mt-0">
                <span className="relative z-10 transition-all duration-500 group-hover:text-gray-200">Today</span>
                <div className={`absolute -bottom-2 right-0 w-full h-0.5 bg-gradient-to-l ${COLORS.gradients.grayMedium} transform origin-right animate-[expandWidth_1.8s_ease-out_0.3s] shadow-lg shadow-gray-500/50`}></div>
                <div className="absolute inset-0 blur-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </span>
            </h1>
            
            {/* Corner Decorations */}
            <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-l-2 border-white/30 animate-[fadeInUp_1s_ease-out]"></div>
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-r-2 border-white/30 animate-[fadeInUp_1s_ease-out]"></div>
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-l-2 border-white/30 animate-[fadeInUp_1s_ease-out]"></div>
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-r-2 border-white/30 animate-[fadeInUp_1s_ease-out]"></div>
            
            {/* Center Glow Effect */}
            <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 w-32 h-32 sm:w-40 sm:h-40 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          </div>
          
          <p style={{ 
            fontFamily: "'Source Serif Pro', Georgia, serif",
            fontWeight: '300',
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            lineHeight: '1.8'
          }} className="text-gray-300 max-w-2xl mx-auto animate-[fadeInUp_1.5s_ease-out] leading-relaxed tracking-wide px-4">
            We're here to help and answer any questions you might have about our services
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="mb-12 sm:mb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className={`w-8 h-0.5 bg-gradient-to-r ${COLORS.gradients.grayMedium}`}></div>
              <HeartHandshake className="w-6 h-6 text-gray-600" />
              <div className={`w-8 h-0.5 bg-gradient-to-l ${COLORS.gradients.grayMedium}`}></div>
            </div>
            
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontWeight: '400',
              letterSpacing: '0.02em',
              fontSize: 'clamp(2rem, 4vw, 3.75rem)'
            }} className="mb-6 text-gray-900">
              Let's Connect
            </h2>
            
            <p style={{ 
              fontFamily: "'Source Serif Pro', Georgia, serif",
              fontWeight: '300',
              lineHeight: '1.8',
              fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
            }} className="text-gray-700 max-w-2xl mx-auto mb-8">
              Reach out to us and let's discuss how we can bring your architectural vision to life
            </p>
          </div>
        </AnimatedSection>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-1"
          >
            <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 p-8 h-full">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-gray-100 to-gray-200">
                  <HeartHandshake className="w-6 h-6 text-gray-700" />
                </div>
                <h2 className="text-3xl font-light pt-1" style={{ fontFamily: "'Playfair Display', serif", color: COLORS.primary.gray.rich }}>
                  Get In Touch
                </h2>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-r from-gray-100 to-gray-200">
                    <MapPin className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2" style={{ fontFamily: "'Playfair Display', serif", color: COLORS.primary.gray.rich }}>
                      Our Location
                    </h3>
                    <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                      123 Business Avenue<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-r from-gray-100 to-gray-200">
                    <Phone className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2" style={{ fontFamily: "'Playfair Display', serif", color: COLORS.primary.gray.rich }}>
                      Phone Number
                    </h3>
                    <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                      +1 (555) 123-4567<br />
                      +1 (555) 987-6543
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-r from-gray-100 to-gray-200">
                    <Mail className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2" style={{ fontFamily: "'Playfair Display', serif", color: COLORS.primary.gray.rich }}>
                      Email Address
                    </h3>
                    <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                      contact@example.com<br />
                      support@example.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-xl font-medium mb-6" style={{ fontFamily: "'Playfair Display', serif", color: COLORS.primary.gray.rich }}>
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  {socialMediaIcons.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href="#"
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 bg-gradient-to-r from-gray-100 to-gray-200"
                      >
                        <Icon className="w-6 h-6 text-gray-700" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-2"
          >
            <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 p-8 h-full">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-gray-100 to-gray-200">
                  <Send className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h2 className="text-3xl font-light mb-2" style={{ fontFamily: "'Playfair Display', serif", color: COLORS.primary.gray.rich }}>
                    Send us a Message
                  </h2>
                  <p className="text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Fill out the form below and we'll get back to you as soon as possible
                  </p>
                </div>
              </div>
              
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
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ fontFamily: "'Inter', sans-serif", color: COLORS.primary.gray.rich }}>
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
                    <label htmlFor="city" className="block text-sm font-medium mb-2" style={{ fontFamily: "'Inter', sans-serif", color: COLORS.primary.gray.rich }}>
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
                    <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ fontFamily: "'Inter', sans-serif", color: COLORS.primary.gray.rich }}>
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
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ fontFamily: "'Inter', sans-serif", color: COLORS.primary.gray.rich }}>
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
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ fontFamily: "'Inter', sans-serif", color: COLORS.primary.gray.rich }}>
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
                  className={`group inline-flex items-center justify-center gap-3 w-full text-white py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-500 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-medium text-lg relative bg-gradient-to-r ${COLORS.gradients.grayCharcoal}`}
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
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 sm:p-12 md:p-16 shadow-2xl border border-gray-700 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ 
                backgroundImage: `linear-gradient(45deg, transparent 45%, ${COLORS.primary.gray.light} 45%, ${COLORS.primary.gray.light} 55%, transparent 55%)`, 
                backgroundSize: '30px 30px' 
              }}></div>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className={`w-6 h-0.5 bg-gradient-to-r ${COLORS.gradients.grayLight}`}></div>
                <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                <div className={`w-6 h-0.5 bg-gradient-to-l ${COLORS.gradients.grayLight}`}></div>
              </div>
              
              <h2 style={{ 
                fontFamily: "'Playfair Display', serif",
                fontWeight: '400',
                letterSpacing: '0.02em',
                fontSize: 'clamp(2rem, 4vw, 3.75rem)'
              }} className="text-white mb-4">
                Ready to Connect?
              </h2>
              
              <p style={{ 
                fontFamily: "'Source Serif Pro', Georgia, serif",
                fontWeight: '300',
                lineHeight: '1.8',
                fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
              }} className="text-gray-300 mb-8 leading-relaxed">
                Reach out to us today and let's discuss how we can help bring your architectural vision to life.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a 
                  href="tel:+15551234567" 
                  className="group inline-flex items-center justify-center gap-4 px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full text-lg font-medium hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-700"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </motion.a>
                
                <motion.a 
                  href="mailto:contact@example.com" 
                  className="group inline-flex items-center justify-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full text-lg font-medium hover:bg-white/20 hover:border-white/50 transition-all duration-500"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-5 h-5" />
                  <span>Email Us</span>
                </motion.a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Map Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 rounded-xl">
            <div className="h-96 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.177631294987!2d-74.00594908459418!3d40.71278367933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316e12e88d%3A0x8f6b6e81129a8a38!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
                title="Location Map"
              />
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        
        @keyframes expandWidth { 
          from { width: 0; opacity: 0; } 
          to { width: 100%; opacity: 1; } 
        }
        
        @keyframes slideDown { 
          0% { transform: translateY(-100%); opacity: 0; } 
          50% { opacity: 1; } 
          100% { transform: translateY(100%); opacity: 0; } 
        }
        
        @keyframes slideRight { 
          0% { transform: translateX(-100%); opacity: 0; } 
          50% { opacity: 1; } 
          100% { transform: translateX(100%); opacity: 0; } 
        }
        
        @keyframes float { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-15px); } 
        }
        
        @keyframes shimmer { 
          0% { background-position: -1000px 0; } 
          100% { background-position: 1000px 0; } 
        }
      `}</style>

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
                className={`px-6 py-3 bg-gradient-to-r ${COLORS.gradients.grayCharcoal} text-white rounded-xl hover:shadow-lg transition-all duration-300`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;