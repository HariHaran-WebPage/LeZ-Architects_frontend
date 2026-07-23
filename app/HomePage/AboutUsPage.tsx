'use client';

import React, { useState, useEffect } from 'react';
import CompactContactFormModal from '../contact/ContactModel'; 

const HomeAboutPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevImageIndex, setPrevImageIndex] = useState(0);
  const [rippleKey, setRippleKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  
  const images = [
    {
      src: "./hero_image1.jpg",
      alt: "Residential Architecture",
      text: 'Residential Excellence'
    },
    {
      src: "./hero_image2.jpg", 
      alt: "Commercial Architecture",
      text: 'Commercial Innovation'
    },
    {
      src: "./hero_image3.jpg",
      alt: "Luxury Villa Design",
      text: 'Luxury Designs'
    }
  ];

  // Modal handlers
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPrevImageIndex(currentImageIndex);
    setRippleKey(prev => prev + 1);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const prevImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPrevImageIndex(currentImageIndex);
    setRippleKey(prev => prev + 1);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextImage();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Source+Serif+Pro:wght@300;400;600&display=swap');
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(var(--rotate-start, 0deg));
          }
          50% {
            transform: translateY(-20px) rotate(var(--rotate-end, 10deg));
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes wave-reveal {
          0% {
            clip-path: circle(0% at 100% 0%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            clip-path: circle(150% at 100% 0%);
            opacity: 1;
          }
        }

        @keyframes wave-exit {
          0% {
            clip-path: circle(150% at 100% 0%);
            opacity: 1;
          }
          100% {
            clip-path: circle(0% at 0% 100%);
            opacity: 0;
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fade-in-scale {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(-5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-wave-reveal {
          animation: wave-reveal 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-wave-exit {
          animation: wave-exit 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-ripple {
          animation: ripple 1.5s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animate-fade-in-scale {
          animation: fade-in-scale 0.7s ease-out forwards;
        }

        .image-transition {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }

        .gradient-overlay {
          background: linear-gradient(
            45deg,
            rgba(15, 23, 42, 0.4) 0%,
            rgba(15, 23, 42, 0.2) 50%,
            rgba(15, 23, 42, 0.4) 100%
          );
        }

        .text-glow {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
      `}</style>
      
      <section id="about" className="min-h-[80vh] flex items-center justify-center py-12 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/50 to-indigo-100/40 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-violet-100/40 to-purple-100/30 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-slate-100/30 to-zinc-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-slate-400/20 rounded-full animate-bounce" style={{ animationDuration: '3s', animationDelay: '0s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-slate-400/20 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-slate-400/20 rounded-full animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
          <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-slate-400/20 rounded-full animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            
            {/* Left Column - Simplified Image Display */}
            <div className="relative group animate-fade-in-up lg:-translate-x-8 perspective-1000" style={{ animationDelay: '0.2s' }}>
              <div className="relative z-10 transform group-hover:-translate-y-3 group-hover:scale-[1.03] transition-all duration-700 ease-out group-hover:rotate-1 transform-style-3d">
                {/* Main Image Container */}
                <div className="aspect-[5/4] bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-100 rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15 border-[10px] border-white relative group-hover:shadow-3xl group-hover:shadow-slate-900/25 transition-all duration-700">
                  
                  {/* Three Image Stack with Water Wave Animation */}
                  <div className="absolute inset-0">
                    {images.map((image, index) => {
                      const isActive = index === currentImageIndex;
                      const isPrev = index === prevImageIndex;
                      const shouldShow = isActive || (isPrev && isAnimating);
                      
                      if (!shouldShow) return null;
                      
                      return (
                        <div
                          key={index}
                          className={`absolute inset-0 w-full h-full flex items-center justify-center relative overflow-hidden ${
                            isActive
                              ? 'z-30 animate-wave-reveal'
                              : 'z-20 animate-wave-exit'
                          }`}
                          style={{
                            backgroundImage: `url(${image.src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }}
                        >
                          {/* Enhanced Gradient Overlay */}
                          <div className="absolute inset-0 gradient-overlay"></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
                          
                          {/* Wave Ripple Effect */}
                          {isActive && isAnimating && (
                            <div 
                              key={rippleKey}
                              className="absolute top-0 right-0 w-32 h-32 rounded-full border-4 border-white/30 animate-ripple"
                            ></div>
                          )}
                          
                          {/* Enhanced Animated Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                          
                          {/* Enhanced Text Container */}
                          <div className="relative z-20 text-center px-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                            <span className="text-white text-xl font-semibold italic z-10 text-center tracking-wide text-glow drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-700" 
                                  style={{ fontFamily: "'Source Serif Pro', serif" }}>
                              {image.text}
                            </span>
                            <div className="w-16 h-0.5 bg-white/80 rounded-full mx-auto mt-3 transform group-hover:scale-110 transition-transform duration-700"></div>
                          </div>

                          {/* Floating Elements on Image */}
                          <div className="absolute top-4 left-4 w-3 h-3 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="absolute bottom-4 right-4 w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Image Navigation Dots - Simplified */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-40">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (!isAnimating && index !== currentImageIndex) {
                            setIsAnimating(true);
                            setPrevImageIndex(currentImageIndex);
                            setRippleKey(prev => prev + 1);
                            setCurrentImageIndex(index);
                            setTimeout(() => setIsAnimating(false), 1200);
                          }
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-500 transform hover:scale-125 ${
                          index === currentImageIndex
                            ? 'bg-white scale-125 shadow-lg'
                            : 'bg-white/50 hover:bg-white/80 shadow-md'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Simplified Floating Elements - Only decorative */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-slate-600/90 via-slate-700/90 to-slate-900/90 rounded-3xl rotate-12 opacity-95 shadow-2xl shadow-slate-900/40 group-hover:rotate-[25deg] group-hover:scale-110 transition-all duration-700 animate-float backdrop-blur-sm" style={{ '--rotate-start': '12deg', '--rotate-end': '20deg' } as React.CSSProperties}></div>
                <div className="absolute -top-3 -left-3 w-16 h-16 bg-gradient-to-br from-zinc-600/90 via-zinc-700/90 to-slate-900/90 rounded-3xl -rotate-6 opacity-90 shadow-xl shadow-slate-900/30 group-hover:-rotate-[15deg] group-hover:scale-105 transition-all duration-700 animate-float backdrop-blur-sm" style={{ animationDelay: '1s', '--rotate-start': '-6deg', '--rotate-end': '-12deg' } as React.CSSProperties}></div>
              </div>
              
              {/* Enhanced Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100/40 via-transparent to-zinc-100/30 rounded-3xl transform rotate-3 scale-105 opacity-60 group-hover:rotate-2 group-hover:scale-[1.06] transition-transform duration-700"></div>
            </div>

            {/* Right Column - Enhanced Typography & Content */}
            <div className="space-y-6 lg:translate-x-6">
              {/* Section Header with staggered animation */}
              <div className="space-y-5 animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-[2.5px] bg-gradient-to-r from-slate-800 via-slate-600 to-slate-400 rounded-full"></div>
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-[0.3em]"
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}>
                    About Our Studio
                  </span>
                </div>
                
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-slate-900 leading-[0.9] tracking-tight mb-2"
                      style={{ fontFamily: "'Playfair Display', serif", fontWeight: '500' }}>
                    About Us
                  </h2>
                  <div className="w-24 h-[3px] bg-gradient-to-r from-slate-700 via-slate-500 to-slate-300 rounded-full mt-4 mb-3"></div>
                  <p className="text-xl md:text-2xl lg:text-3xl text-slate-700 font-normal italic leading-tight"
                     style={{ fontFamily: "'Source Serif Pro', serif", fontStyle: 'italic', fontWeight: '400' }}>
                    Crafting Timeless Spaces
                  </p>
                </div>
              </div>

              {/* Enhanced Content with Improved Typography */}
              <div className="space-y-5 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-slate-800 leading-relaxed font-light tracking-wide"
                     style={{ 
                       fontFamily: "'Source Serif Pro', serif", 
                       lineHeight: '1.7',
                       fontWeight: '300'
                     }}>
                    At <span className="font-semibold text-slate-900 bg-gradient-to-r from-slate-100/90 to-zinc-50/70 px-2 py-1 border-l-[5px] border-slate-700 pl-3 rounded-r-md shadow-sm" 
                            style={{ fontFamily: "'Inter', sans-serif" }}>
                      LeZ Architects, Coimbatore
                    </span>, we transform visionary ideas into inspiring, functional spaces that stand the test of time.
                  </p>
                  
                  <p className="text-base md:text-lg text-slate-700 leading-relaxed font-light tracking-wide"
                     style={{ 
                       fontFamily: "'Source Serif Pro', serif", 
                       lineHeight: '1.7',
                       fontWeight: '300'
                     }}>
                    With extensive expertise in architectural design, residential projects, commercial buildings, and turnkey construction, we deliver innovative, sustainable, and cost-effective solutions meticulously tailored to your unique requirements.
                  </p>
                </div>
              </div>

              {/* Enhanced Stats Section with Improved Typography */}
              <div className="grid grid-cols-3 gap-4 pt-4 animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
                <div className="text-center p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg shadow-slate-900/8 hover:shadow-xl hover:shadow-slate-900/15 hover:-translate-y-1 transition-all duration-300 group border-2 border-slate-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10"
                       style={{ fontFamily: "'Playfair Display', serif" }}>50+</div>
                  <div className="text-[11px] text-slate-600 uppercase tracking-[0.18em] font-semibold relative z-10" 
                       style={{ fontFamily: "'Inter', sans-serif" }}>Projects</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg shadow-slate-900/8 hover:shadow-xl hover:shadow-slate-900/15 hover:-translate-y-1 transition-all duration-300 group border-2 border-slate-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10"
                       style={{ fontFamily: "'Playfair Display', serif" }}>100%</div>
                  <div className="text-[11px] text-slate-600 uppercase tracking-[0.18em] font-semibold relative z-10" 
                       style={{ fontFamily: "'Inter', sans-serif" }}>Satisfaction</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg shadow-slate-900/8 hover:shadow-xl hover:shadow-slate-900/15 hover:-translate-y-1 transition-all duration-300 group border-2 border-slate-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10"
                       style={{ fontFamily: "'Playfair Display', serif" }}>24/7</div>
                  <div className="text-[11px] text-slate-600 uppercase tracking-[0.18em] font-semibold relative z-10" 
                       style={{ fontFamily: "'Inter', sans-serif" }}>Support</div>
                </div>
              </div>

              {/* Enhanced CTA Button - Now opens modal */}
              <div className="pt-6 animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
                <button 
                  onClick={handleOpenModal}
                  className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl hover:from-slate-800 hover:via-slate-700 hover:to-slate-800 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-slate-900/30 overflow-hidden border-2 border-slate-700 w-full md:w-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative z-10 text-sm md:text-base font-semibold tracking-[0.25em] uppercase flex items-center space-x-3" 
                        style={{ fontFamily: "'Inter', sans-serif" }}>
                    <span className="drop-shadow-md">Discover Our Work</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <CompactContactFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Schedule a Consultation"
      />
    </>
  );
};

export default HomeAboutPage;