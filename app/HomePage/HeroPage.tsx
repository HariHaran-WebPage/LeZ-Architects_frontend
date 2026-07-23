"use client"

import { useState, useEffect } from 'react';
import CompactContactFormModal from '../contact/ContactModel'; 

export default function HeroPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const slides = [
    { src: "./hero_image1.jpg", alt: "Residential Architecture" },
    { src: "./hero_image2.jpg", alt: "Commercial Architecture" },
    { src: "./hero_image3.jpg", alt: "Luxury Villa Design" }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      // Fade out text
      setTextVisible(false);
      
      // After text fades out, change slide
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        // Fade text back in
        setTimeout(() => setTextVisible(true), 100);
      }, 600);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Function to handle modal open
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-[90vh] relative overflow-hidden bg-black">
      {/* Enhanced Slideshow with Adjusted Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[1800ms] ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className={`w-full h-full transition-all duration-[8000ms] ease-out ${
              index === currentSlide ? 'scale-[1.1]' : 'scale-100'
            }`}>
              <img 
                src={slide.src} 
                alt={slide.alt}
                className="w-full h-full object-cover brightness-90"
              />
            </div>
            {/* Sophisticated Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Minimalist Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-[2px] rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? 'bg-white w-20' 
                : 'bg-white/40 w-10 hover:bg-white/70 hover:w-14'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Premium Content with Adjusted Typography */}
      <div className="relative z-10 flex items-center h-full">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 w-full">
          <div className="text-left max-w-4xl">
            {/* Main Heading with Reduced Size */}
            <div className="mb-6 overflow-hidden">
              <h1 className={`text-5xl lg:text-7xl font-extralight text-white mb-4 transform transition-all duration-1000 ease-out ${
                isVisible && textVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
              }`}
              style={{ 
                fontFamily: '"Playfair Display", "Cormorant Garamond", "Georgia", serif',
                letterSpacing: '-0.03em',
                lineHeight: '0.95',
                fontWeight: '300'
              }}>
                LeZ Architects
              </h1>
            </div>
              
            {/* Refined Divider with Tagline */}
            <div className={`flex items-center space-x-6 mb-8 transform transition-all duration-1000 delay-150 ease-out ${
              isVisible && textVisible ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0'
            }`}>
              <div className="relative w-20 h-[1px] bg-white/60">
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform transition-transform duration-1500 ${
                  textVisible ? 'translate-x-full delay-300' : '-translate-x-full'
                }`}></div>
              </div>
              <p className="text-xs lg:text-sm text-white/80 font-light uppercase tracking-[0.35em]"
                style={{ fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif', fontWeight: '300' }}>
                Coimbatore
              </p>
            </div>

            {/* Hero Statement with Reduced Text Size */}
            <div className="mb-10 space-y-4 max-w-2xl">
              <p className={`text-xl lg:text-3xl text-white font-light leading-tight transform transition-all duration-1000 delay-300 ease-out ${
                isVisible && textVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ 
                fontFamily: '"Lora", "Spectral", "Georgia", serif',
                fontWeight: '300',
                letterSpacing: '-0.015em',
                lineHeight: '1.4'
              }}>
                Creating timeless spaces that blend{' '}
                <span className="italic font-normal text-white/95 relative">
                  luxury, innovation, and sustainability
                  <span className="absolute bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-white/40 via-white/20 to-transparent"></span>
                </span>
              </p>
              
              <p className={`text-sm lg:text-lg text-white/70 font-light leading-relaxed transform transition-all duration-1000 delay-450 ease-out ${
                isVisible && textVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ 
                fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif',
                fontWeight: '300',
                letterSpacing: '-0.005em',
                lineHeight: '1.65'
              }}>
                Specializing in contemporary residential architecture, luxury villas, and forward-thinking commercial environments.
              </p>
            </div>

            {/* Sophisticated CTA Button - Now Opens Modal */}
            <div className={`mt-12 transform transition-all duration-1000 delay-600 ease-out ${
              isVisible && textVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <button 
                onClick={handleOpenModal}
                className="group relative inline-flex items-center px-8 py-3.5 text-xs font-medium text-black bg-white hover:bg-black hover:text-white transition-all duration-500 overflow-hidden border border-white/20 hover:border-white/40"
                style={{ 
                  fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif', 
                  letterSpacing: '0.2em',
                  fontWeight: '500'
                }}>
                {/* Subtle Slide-in Effect */}
                <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                
                {/* Button Content */}
                <span className="relative z-10 transition-colors duration-500">EXPLORE PROJECTS</span>
                <svg className="ml-3 w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-all duration-500 ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className={`absolute bottom-12 right-12 z-20 hidden lg:flex flex-col items-center space-y-4 transform transition-all duration-1200 delay-1200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/40 to-transparent relative overflow-hidden">
          <div className="absolute top-0 w-full h-8 bg-gradient-to-b from-white to-transparent animate-scroll"></div>
        </div>
        <span className="text-[10px] font-light tracking-[0.25em] text-white/60 uppercase"
          style={{ 
            writingMode: 'vertical-rl', 
            textOrientation: 'mixed',
            fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif',
            fontWeight: '300'
          }}>
          Explore
        </span>
      </div>

      {/* Contact Form Modal */}
      <CompactContactFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Schedule a Consultation"
      />

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=Lora:ital,wght@0,300;0,400;1,400&family=Inter:wght@300;400;500&display=swap');
        
        @keyframes scroll {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(150%);
            opacity: 0;
          }
        }
        
        .animate-scroll {
          animation: scroll 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}