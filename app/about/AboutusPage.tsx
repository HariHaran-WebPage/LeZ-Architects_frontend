"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Building2, Award, Lightbulb, Target, Shield, ArrowRight, } from 'lucide-react';

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

interface AnimatedCounterProps {
  end: string;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const endNum = parseInt(end.replace(/\D/g, ''));
          const startTime = Date.now();
          
          const updateCounter = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * endNum);
            setCount(current);
            if (progress < 1) requestAnimationFrame(updateCounter);
            else setCount(endNum);
          };
          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.5 }
    );
    
    if (counterRef.current) observer.observe(counterRef.current);
    
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={counterRef}>
      {count}
      {suffix}
    </span>
  );
};

interface ValueItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StatItem {
  number: string;
  suffix: string;
  label: string;
}

const AboutPage = () => {
  const values: ValueItem[] = [
    { 
      icon: <Lightbulb className="w-10 h-10" />, 
      title: "Innovation", 
      description: "Pushing boundaries with cutting-edge design solutions that redefine modern architecture and create spaces for the future" 
    },
    { 
      icon: <Target className="w-10 h-10" />, 
      title: "Purpose-Driven", 
      description: "Every element serves a function, ensuring spaces work beautifully, efficiently, and meaningfully for their inhabitants" 
    },
    { 
      icon: <Shield className="w-10 h-10" />, 
      title: "Sustainability", 
      description: "Eco-conscious designs that stand the test of time while protecting our environment for generations to come" 
    },
    { 
      icon: <Award className="w-10 h-10" />, 
      title: "Excellence", 
      description: "Uncompromising quality in every detail, from initial concept through final completion and beyond" 
    }
  ];

  const stats: StatItem[] = [
    { number: "10", suffix: "+", label: "Years Experience" },
    { number: "500", suffix: "+", label: "Projects Completed" },
    { number: "100", suffix: "%", label: "Client Satisfaction" },
    { number: "50", suffix: "+", label: "Awards Won" }
  ];

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
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-15px); } 
        }
        
        @keyframes shimmer { 
          0% { background-position: -1000px 0; } 
          100% { background-position: 1000px 0; } 
        }
      `}</style>

      {/* Hero Section - Improved Design */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
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
            fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontWeight: '300',
            letterSpacing: '0.3em',
            fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)'
          }} className="text-gray-300 mb-4 animate-[fadeInUp_1s_ease-out] tracking-wider uppercase">
            About Us
          </p>
          
          <div className="relative mb-6">
            <h1 style={{ 
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
              fontWeight: '300',
              color: 'white',
              letterSpacing: '0.02em',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)'
            }} className="tracking-tight animate-[fadeInUp_1.2s_ease-out] drop-shadow-2xl leading-none">
              <span className="inline-block relative group mb-2">
                <span className="relative z-10 transition-all duration-500 group-hover:text-gray-200">Architects</span>
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
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontWeight: '300',
            letterSpacing: '0.05em',
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            lineHeight: '1.8'
          }} className="text-gray-300 max-w-2xl mx-auto animate-[fadeInUp_1.5s_ease-out] leading-relaxed tracking-wide px-4">
            Crafting timeless spaces where design meets purpose
          </p>
        </div>
      </section>
      
      {/* Who We Are Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#F8F9FA] to-[#E9ECEF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-gray-700" />
              <span style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '500',
                letterSpacing: '0.15em',
                fontSize: 'clamp(0.75rem, 1vw, 0.875rem)'
              }} className="text-gray-600 uppercase">
                Who We Are
              </span>
            </div>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontWeight: '400',
              letterSpacing: '0.02em',
              fontSize: 'clamp(2rem, 4vw, 3.75rem)'
            }} className="text-gray-900 mb-6 leading-tight">
              Pioneering Architectural Excellence
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <p style={{ 
                  fontFamily: "'Source Serif Pro', Georgia, serif",
                  fontWeight: '300',
                  lineHeight: '1.8',
                  fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
                }} className="text-gray-700 leading-relaxed">
                  <span className="font-semibold text-gray-900 text-xl">Lez Architects & Interiors</span> is a leading architectural and interior design company based in Coimbatore. With over a decade of experience, we specialize in crafting modern architectural designs, residential villas, commercial spaces, and interior environments that seamlessly combine creativity, functionality, and sustainability.
                </p>
                
                <p style={{ 
                  fontFamily: "'Source Serif Pro', Georgia, serif",
                  fontWeight: '300',
                  lineHeight: '1.8',
                  fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
                }} className="text-gray-700 leading-relaxed">
                  Our mission is to design spaces that inspire — places where form meets purpose. As one of the most trusted architects in Coimbatore, we bring a personalized approach to every project, ensuring that each design reflects the client's vision, lifestyle, and environment.
                </p>
              </div>
              <div className="mt-8">
                <p style={{ 
                  fontFamily: "'Source Serif Pro', Georgia, serif",
                  fontWeight: '300',
                  lineHeight: '1.8',
                  fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
                }} className="text-gray-700 leading-relaxed max-w-4xl">
                  From concept to completion, we focus on delivering innovative, cost-effective, and sustainable solutions tailored to meet individual needs. At Lez Architects & Interiors, we integrate architecture, interiors, and execution with precision and excellence.
                </p>
              </div>
              
              <button style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '500',
                letterSpacing: '0.05em',
                fontSize: '0.875rem'
              }} className="group mt-8 px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg flex items-center gap-2 hover:from-gray-700 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl tracking-wide">
                Explore Our Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Mobile view */}
              <div className="grid grid-cols-2 gap-4 md:hidden">
                <div className="col-span-2 relative h-64 rounded-2xl overflow-hidden group cursor-pointer shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" 
                    alt="Modern Architecture" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 to-gray-800/40 group-hover:from-gray-900/70 group-hover:to-gray-800/50 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ 
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: '300',
                      fontSize: '1.25rem'
                    }} className="text-white tracking-wide">Modern Architecture</span>
                  </div>
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop" 
                    alt="Interior Design" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-700/40 group-hover:from-gray-800/60 group-hover:to-gray-700/50 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ 
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: '300',
                      fontSize: '1.125rem'
                    }} className="text-white">Interiors</span>
                  </div>
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop" 
                    alt="Residential Projects" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700/50 to-gray-800/40 group-hover:from-gray-700/60 group-hover:to-gray-800/50 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ 
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: '300',
                      fontSize: '1.125rem'
                    }} className="text-white">Residential</span>
                  </div>
                </div>
                <div className="col-span-2 relative h-48 rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" 
                    alt="Commercial Spaces" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-600/50 to-gray-700/40 group-hover:from-gray-600/60 group-hover:to-gray-700/50 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ 
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: '300',
                      fontSize: '1.125rem'
                    }} className="text-white">Commercial</span>
                  </div>
                </div>
              </div>

              {/* Desktop view */}
              <div className="hidden md:grid grid-cols-3 gap-4 h-[500px]">
                <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" 
                    alt="Featured Project" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-800/30 group-hover:from-gray-900/60 group-hover:to-gray-800/40 transition-all duration-300"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 style={{ 
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: '300',
                      fontSize: '1.875rem'
                    }} className="text-white mb-2">Featured Project</h3>
                    <button style={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: '500',
                      fontSize: '0.875rem'
                    }} className="text-white/90 hover:text-white flex items-center gap-2 font-medium group-hover:gap-3 transition-all tracking-wide">
                      View Our Portfolio
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop" 
                    alt="Interior Design" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800/40 to-gray-700/30 group-hover:from-gray-800/50 group-hover:to-gray-700/40 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ 
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: '300',
                      fontSize: '1.25rem'
                    }} className="text-white">Interiors</span>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop" 
                    alt="Residential Projects" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700/40 to-gray-800/30 group-hover:from-gray-700/50 group-hover:to-gray-800/40 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ 
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: '300',
                      fontSize: '1.25rem'
                    }} className="text-white">Residential</span>
                  </div>
                </div>

                <div className="col-span-3 relative rounded-2xl overflow-hidden group cursor-pointer shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" 
                    alt="Commercial Spaces" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-600/40 to-gray-700/30 group-hover:from-gray-600/50 group-hover:to-gray-700/40 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ 
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: '300',
                      fontSize: '1.25rem'
                    }} className="text-white">Commercial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#F1F3F5] to-[#E9ECEF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-gray-700" />
              <span style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '500',
                letterSpacing: '0.15em',
                fontSize: 'clamp(0.75rem, 1vw, 0.875rem)'
              }} className="text-gray-600 uppercase">
                Our Values
              </span>
            </div>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontWeight: '400',
              letterSpacing: '0.02em',
              fontSize: 'clamp(2rem, 4vw, 3.75rem)'
            }} className="text-gray-900">
              What Drives Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: '400',
                  fontSize: '1.5rem'
                }} className="text-gray-900 mb-4">{value.title}</h3>
                <p style={{ 
                  fontFamily: "'Source Serif Pro', Georgia, serif",
                  fontWeight: '300',
                  lineHeight: '1.7',
                  fontSize: 'clamp(0.875rem, 1vw, 1rem)'
                }} className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#F8F9FA] to-[#F1F3F5]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Target className="w-6 h-6 text-gray-700" />
              <span style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '500',
                letterSpacing: '0.15em',
                fontSize: 'clamp(0.75rem, 1vw, 0.875rem)'
              }} className="text-gray-600 uppercase">
                Our Expertise
              </span>
            </div>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontWeight: '400',
              letterSpacing: '0.02em',
              fontSize: 'clamp(2rem, 4vw, 3.75rem)'
            }} className="text-gray-900 mb-6 leading-tight">
              Crafting Exceptional Experiences
            </h2>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p style={{ 
              fontFamily: "'Source Serif Pro', Georgia, serif",
              fontWeight: '300',
              lineHeight: '1.8',
              fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
            }} className="">
              Our multidisciplinary team of architects, interior designers, and planners is dedicated to creating spaces that enhance the way people live, work, and interact. Whether it's a modern home design in Coimbatore, a corporate workspace, or a master planning project, we approach each assignment with passion, innovation, and integrity.
            </p>
            <p style={{ 
              fontFamily: "'Source Serif Pro', Georgia, serif",
              fontWeight: '300',
              lineHeight: '1.8',
              fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
            }} className="">
              We believe great design begins with a clear understanding of people and their surroundings. That's why every project we create tells a story — one of thoughtful planning, aesthetic brilliance, and sustainable design excellence that stands the test of time.
            </p>
            <p style={{ 
              fontFamily: "'Playfair Display', serif",
              fontWeight: '400',
              lineHeight: '1.6',
              letterSpacing: '0.01em',
              fontSize: 'clamp(1.25rem, 1.5vw, 1.5rem)'
            }} className="text-gray-900 italic mt-8 pt-6 border-t border-gray-200">
              At Lez Architects & Interiors, we don't just design buildings — we design experiences that inspire modern living.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="mb-4">
                  <div style={{ 
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: '300',
                    fontSize: 'clamp(2.5rem, 5vw, 3.75rem)'
                  }} className="text-white">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </div>
                </div>
                <p style={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: '300',
                  letterSpacing: '0.1em',
                  fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)'
                }} className="text-white/70 group-hover:text-white transition-colors tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;