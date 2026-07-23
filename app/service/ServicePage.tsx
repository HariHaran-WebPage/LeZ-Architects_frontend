"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Building2, Home, Map, Briefcase, ArrowRight, Hammer, Trees, Sparkles, Award, Users, CheckCircle2 } from 'lucide-react';

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

const ServicesPage = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  
  const architectureServices = [
    {
      id: 1, 
      icon: <Hammer className="w-8 h-8" />,
      title: "Elevation & Construction",
      subtitle: "Engineering Excellence",
      description: "LeZ Architects and Interiors specializes in architectural design, elevation planning, and construction services, delivering modern, elegant, and structurally sound buildings. We blend 3D elevations, lighting, materials, and innovative construction techniques to create functional and visually striking spaces.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000",
      features: [
        "Advanced 3D Elevation Design",
        "Structural Engineering & Planning",
        "Construction Project Management",
        "Material Selection & Quality Control"
      ]
    },
    {
      id: 2, 
      icon: <Map className="w-8 h-8" />,
      title: "Master Site Planning",
      subtitle: "Strategic Development",
      description: "LeZ Architects and Interiors specializes in master site planning, creating strategically designed, functional, and sustainable spaces. We integrate architecture, landscape design, infrastructure planning, and modern aesthetics to deliver comprehensive site solutions for residential, commercial, and mixed-use projects.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000",
      features: [
        "Comprehensive Site Analysis",
        "Sustainable Urban Planning",
        "Infrastructure Integration",
        "Mixed-Use Development Strategy"
      ]
    },
    {
      id: 3, 
      icon: <Trees className="w-8 h-8" />,
      title: "Landscape Design",
      subtitle: "Natural Integration",
      description: "LeZ Architects and Interiors creates stunning landscape designs that blend modern architecture, greenery, lighting, and functional outdoor spaces. We transform gardens, terraces, and outdoor areas into aesthetic, sustainable, and serene environments.",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1000",
      features: [
        "Custom Garden & Terrace Design",
        "Sustainable Landscape Solutions",
        "Outdoor Lighting Architecture",
        "Eco-Friendly Material Selection"
      ]
    }
  ];

  const interiorServices = [
    {
      id: 1, 
      icon: <Home className="w-8 h-8" />,
      title: "Residential Design",
      subtitle: "Luxury Living Spaces",
      description: "LeZ Architects and Interiors creates luxury residential interiors that blend modern design, lighting, wood finishes, and functional spaces. Our expert team transforms homes into elegant sanctuaries with personalized details and timeless style.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000",
      features: [
        "Bespoke Interior Architecture",
        "Premium Material & Finish Selection",
        "Integrated Lighting Design",
        "Custom Furniture & Fixtures"
      ]
    },
    {
      id: 2, 
      icon: <Briefcase className="w-8 h-8" />,
      title: "Commercial Design",
      subtitle: "Business Environments",
      description: "LeZ Architects and Interiors specializes in modern commercial interior design, blending architecture, lighting, space planning, and premium materials to create inspiring business environments. From office interiors to retail and hospitality spaces, we deliver functional, aesthetic, and brand-focused designs.",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1000",
      features: [
        "Corporate Office Design",
        "Retail & Hospitality Spaces",
        "Brand-Aligned Aesthetics",
        "Ergonomic Workspace Planning"
      ]
    }
  ];

  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in-view');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
    );
    
    serviceRefs.current.forEach((ref) => { 
      if (ref) observer.observe(ref); 
    });
    
    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null, idx: number) => {
    if (el && !serviceRefs.current.includes(el)) {
      serviceRefs.current[idx] = el;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#F8F9FA]">
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

        .service-item {
          opacity: 0;
          transform: translateY(60px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .service-item.animate-in-view {
          opacity: 1;
          transform: translateY(0);
        }
        
        .image-reveal {
          clip-path: inset(0 100% 0 0);
          transition: clip-path 1.2s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .service-item.animate-in-view .image-reveal {
          clip-path: inset(0 0 0 0);
        }
      `}</style>

      {/* Hero Section - Same as About page */}
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
                <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-[fadeInUp_1s_ease-out] drop-shadow-2xl relative z-10" />
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
            Our Services
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
                <span className="relative z-10 transition-all duration-500 group-hover:text-gray-200">Architecture</span>
                <div className={`absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r ${COLORS.gradients.grayLight} transform origin-left animate-[expandWidth_1.8s_ease-out] shadow-lg shadow-gray-400/50`}></div>
                <div className="absolute inset-0 blur-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </span>
              
              <span className="block md:inline-block mx-2 sm:mx-3 md:mx-4">
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300 font-normal italic animate-[shimmer_4s_ease-in-out_infinite] text-4xl sm:text-5xl md:text-6xl" style={{backgroundSize: '200% auto'}}>
                  &
                </span>
              </span>
              
              <span className="inline-block relative group mt-2 md:mt-0">
                <span className="relative z-10 transition-all duration-500 group-hover:text-gray-200">Interiors</span>
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
            Comprehensive Design Solutions Tailored to Your Vision
          </p>
        </div>
      </section>

      {/* Architecture Services Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#F8F9FA] to-[#E9ECEF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Hammer className="w-6 h-6 text-gray-700" />
              <span style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '500',
                letterSpacing: '0.15em',
                fontSize: 'clamp(0.75rem, 1vw, 0.875rem)'
              }} className="text-gray-600 uppercase">
                Architecture Services
              </span>
            </div>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontWeight: '400',
              letterSpacing: '0.02em',
              fontSize: 'clamp(2rem, 4vw, 3.75rem)'
            }} className="text-gray-900 mb-6 leading-tight">
              Innovative Designs for Modern Living
            </h2>
          </div>

          <div className="space-y-16">
            {architectureServices.map((svc, i) => (
              <div 
                key={svc.id} 
                ref={(el) => addToRefs(el, i)} 
                className="service-item"
                onMouseEnter={() => setActiveService(svc.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${i % 2 === 1 ? 'lg:direction-reverse' : ''}`}>
                  {/* Image Column */}
                  <div className={`relative ${i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative group">
                      {/* Image Container */}
                      <div className="relative overflow-hidden rounded-2xl shadow-xl">
                        <div className="image-reveal">
                          <img 
                            src={svc.image} 
                            alt={svc.title}
                            className="w-full h-[300px] md:h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent"></div>
                        
                        {/* Overlay Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                              {React.cloneElement(svc.icon, { className: "w-5 h-5 text-white" })}
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-white/50 to-transparent"></div>
                          </div>
                          <h3 style={{ 
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: '300',
                            fontSize: '1.5rem'
                          }} className="text-white mb-1">
                            {svc.title}
                          </h3>
                          <p style={{ 
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: '300'
                          }} className="text-white/70 text-sm tracking-wide">
                            {svc.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Column */}
                  <div className={`${i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl flex items-center justify-center text-white">
                            {React.cloneElement(svc.icon, { className: "w-6 h-6" })}
                          </div>
                          <div className="flex-1">
                            <h3 style={{ 
                              fontFamily: "'Playfair Display', serif",
                              fontWeight: '400',
                              fontSize: '1.875rem'
                            }} className="text-gray-900">
                              {svc.title}
                            </h3>
                            <p style={{ 
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: '500'
                            }} className="text-gray-700">
                              {svc.subtitle}
                            </p>
                          </div>
                        </div>
                        
                        <p style={{ 
                          fontFamily: "'Source Serif Pro', Georgia, serif",
                          fontWeight: '300',
                          lineHeight: '1.8',
                          fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
                        }} className="text-gray-700 leading-relaxed mb-6">
                          {svc.description}
                        </p>
                      </div>
                      
                      {/* Features List */}
                      <div className="space-y-4 pt-6 border-t border-gray-200">
                        <h4 style={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: '500',
                          fontSize: '0.875rem'
                        }} className="text-gray-600 uppercase tracking-widest">
                          Key Features
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {svc.features.map((feature, idx) => (
                            <div 
                              key={idx}
                              className="flex items-start gap-3 group/item"
                            >
                              <div className="flex-shrink-0 mt-1">
                                <CheckCircle2 className="w-4 h-4 text-gray-600 transition-transform duration-300 group-hover/item:scale-110" />
                              </div>
                              <span style={{ 
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: '300'
                              }} className="text-gray-700 text-sm leading-relaxed">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <button style={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: '500',
                        letterSpacing: '0.05em',
                        fontSize: '0.75rem'
                      }} className="group mt-4 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg flex items-center gap-2 hover:from-gray-700 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl tracking-wide">
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interior Design Services Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#F1F3F5] to-[#E9ECEF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Home className="w-6 h-6 text-gray-700" />
              <span style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '500',
                letterSpacing: '0.15em',
                fontSize: 'clamp(0.75rem, 1vw, 0.875rem)'
              }} className="text-gray-600 uppercase">
                Interior Design Services
              </span>
            </div>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontWeight: '400',
              letterSpacing: '0.02em',
              fontSize: 'clamp(2rem, 4vw, 3.75rem)'
            }} className="text-gray-900 mb-6 leading-tight">
              Transforming Spaces with Elegance & Functionality
            </h2>
          </div>

          <div className="space-y-16">
            {interiorServices.map((svc, i) => (
              <div 
                key={svc.id} 
                ref={(el) => addToRefs(el, architectureServices.length + i)} 
                className="service-item"
                onMouseEnter={() => setActiveService(svc.id + 10)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${i % 2 === 1 ? 'lg:direction-reverse' : ''}`}>
                  {/* Image Column */}
                  <div className={`relative ${i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative group">
                      {/* Image Container */}
                      <div className="relative overflow-hidden rounded-2xl shadow-xl">
                        <div className="image-reveal">
                          <img 
                            src={svc.image} 
                            alt={svc.title}
                            className="w-full h-[300px] md:h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent"></div>
                        
                        {/* Overlay Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                              {React.cloneElement(svc.icon, { className: "w-5 h-5 text-white" })}
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-white/50 to-transparent"></div>
                          </div>
                          <h3 style={{ 
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: '300',
                            fontSize: '1.5rem'
                          }} className="text-white mb-1">
                            {svc.title}
                          </h3>
                          <p style={{ 
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: '300'
                          }} className="text-white/70 text-sm tracking-wide">
                            {svc.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Column */}
                  <div className={`${i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl flex items-center justify-center text-white">
                            {React.cloneElement(svc.icon, { className: "w-6 h-6" })}
                          </div>
                          <div className="flex-1">
                            <h3 style={{ 
                              fontFamily: "'Playfair Display', serif",
                              fontWeight: '400',
                              fontSize: '1.875rem'
                            }} className="text-gray-900">
                              {svc.title}
                            </h3>
                            <p style={{ 
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: '500'
                            }} className="text-gray-700">
                              {svc.subtitle}
                            </p>
                          </div>
                        </div>
                        
                        <p style={{ 
                          fontFamily: "'Source Serif Pro', Georgia, serif",
                          fontWeight: '300',
                          lineHeight: '1.8',
                          fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
                        }} className="text-gray-700 leading-relaxed mb-6">
                          {svc.description}
                        </p>
                      </div>
                      
                      {/* Features List */}
                      <div className="space-y-4 pt-6 border-t border-gray-200">
                        <h4 style={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: '500',
                          fontSize: '0.875rem'
                        }} className="text-gray-600 uppercase tracking-widest">
                          Key Features
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {svc.features.map((feature, idx) => (
                            <div 
                              key={idx}
                              className="flex items-start gap-3 group/item"
                            >
                              <div className="flex-shrink-0 mt-1">
                                <CheckCircle2 className="w-4 h-4 text-gray-600 transition-transform duration-300 group-hover/item:scale-110" />
                              </div>
                              <span style={{ 
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: '300'
                              }} className="text-gray-700 text-sm leading-relaxed">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <button style={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: '500',
                        letterSpacing: '0.05em',
                        fontSize: '0.75rem'
                      }} className="group mt-4 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg flex items-center gap-2 hover:from-gray-700 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl tracking-wide">
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#F8F9FA] to-[#F1F3F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-gray-700" />
              <span style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '500',
                letterSpacing: '0.15em',
                fontSize: 'clamp(0.75rem, 1vw, 0.875rem)'
              }} className="text-gray-600 uppercase">
                Why Choose Us
              </span>
            </div>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontWeight: '400',
              letterSpacing: '0.02em',
              fontSize: 'clamp(2rem, 4vw, 3.75rem)'
            }} className="text-gray-900 mb-6 leading-tight">
              Excellence in Every Detail
            </h2>
            <p style={{ 
              fontFamily: "'Source Serif Pro', Georgia, serif",
              fontWeight: '300',
              lineHeight: '1.8',
              fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
            }} className="text-gray-700 max-w-3xl mx-auto">
              We combine creative vision with technical expertise to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Creative Excellence",
                description: "Innovative design solutions that blend aesthetics with functionality, creating spaces that inspire and endure."
              },
              {
                icon: <Hammer className="w-8 h-8" />,
                title: "Technical Precision",
                description: "Meticulous attention to detail and structural integrity ensures every project is built to last."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Client Collaboration",
                description: "We work closely with you throughout the process, ensuring your vision is realized exactly as imagined."
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: '400',
                  fontSize: '1.5rem'
                }} className="text-gray-900 mb-4">{item.title}</h3>
                <p style={{ 
                  fontFamily: "'Source Serif Pro', Georgia, serif",
                  fontWeight: '300',
                  lineHeight: '1.7',
                  fontSize: 'clamp(0.875rem, 1vw, 1rem)'
                }} className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `linear-gradient(90deg, transparent 49.9%, rgba(255,255,255,0.1) 50%, transparent 50.1%)`, 
            backgroundSize: '50px 50px' 
          }}></div>
          <div className="absolute inset-0" style={{ 
            backgroundImage: `linear-gradient(transparent 49.9%, rgba(255,255,255,0.1) 50%, transparent 50.1%)`, 
            backgroundSize: '50px 50px' 
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontWeight: '400',
            letterSpacing: '0.02em',
            fontSize: 'clamp(2rem, 4vw, 3.75rem)'
          }} className="text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          
          <p style={{ 
            fontFamily: "'Source Serif Pro', Georgia, serif",
            fontWeight: '300',
            lineHeight: '1.8',
            fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
          }} className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your project and discover how our architecture and interior design services can bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button style={{ 
              fontFamily: "'Poppins', sans-serif",
              fontWeight: '500',
              letterSpacing: '0.05em',
              fontSize: '0.875rem'
            }} className="group px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg flex items-center gap-2 hover:from-gray-700 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl tracking-wide">
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            
            <button style={{ 
              fontFamily: "'Poppins', sans-serif",
              fontWeight: '500',
              letterSpacing: '0.05em',
              fontSize: '0.875rem'
            }} className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg hover:bg-white/20 hover:border-white/40 transition-all duration-300 tracking-wide">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;