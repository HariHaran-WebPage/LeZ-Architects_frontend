'use client';

import { useState, useEffect, useRef } from 'react';

// Define interfaces for our data structures
interface Service {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
}

const SERVICES: Service[] = [
  {
    id: 1,
    category: "Architecture",
    title: "Residential Architecture",
    subtitle: "Crafting Dream Homes",
    description: "Bespoke residential designs that blend functionality with aesthetic excellence, creating spaces that reflect your lifestyle.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    link: "/service"
  },
  {
    id: 2,
    category: "Architecture",
    title: "Commercial Architecture",
    subtitle: "Building Business Success",
    description: "Innovative commercial spaces designed to enhance productivity and create lasting impressions on clients.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    link: "/service"
  },
  {
    id: 3,
    category: "Architecture",
    title: "Landscape Design",
    subtitle: "Outdoor Excellence",
    description: "Transform outdoor spaces into harmonious environments that complement architectural design and nature.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    link: "/service"
  },
  {
    id: 4,
    category: "Interiors",
    title: "Luxury Interiors",
    subtitle: "Sophisticated Living Spaces",
    description: "Elegant interior designs featuring premium materials, custom furnishings, and exquisite attention to detail.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
    link: "/service"
  },
  {
    id: 5,
    category: "Interiors",
    title: "Office Interiors",
    subtitle: "Productive Workspaces",
    description: "Contemporary office designs that inspire creativity, collaboration, and enhance employee wellbeing.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    link: "/service"
  },
  {
    id: 6,
    category: "Interiors",
    title: "Retail Interiors",
    subtitle: "Engaging Shopping Experiences",
    description: "Strategic retail design that captivates customers and maximizes brand impact in commercial spaces.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    link: "/service"
  }
];

export default function HomeServicesPage() {
  const [activeService, setActiveService] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isMobileSliderPaused, setIsMobileSliderPaused] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const filteredServices = activeCategory === 'All' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategory);

  // Handle service page navigation
  const handleViewDetails = (serviceLink: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('Navigate to:', serviceLink);
    // Replace with: router.push(serviceLink);
  };

  const handleServiceClick = (serviceLink: string) => {
    console.log('Navigate to:', serviceLink);
    // Replace with: router.push(serviceLink);
  };

  const handleExploreProject = (title: string) => {
    console.log('Explore project:', title);
    // Add your modal or navigation logic here
  };

  // Auto-slide for hero section
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setActiveService((prev) => (prev + 1) % SERVICES.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [isPaused]);

  // Auto-slide for mobile slider
  useEffect(() => {
    if (isMobileSliderPaused) return;
    if (filteredServices.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredServices.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isMobileSliderPaused, filteredServices]);

  const currentService = SERVICES[activeService];

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsMobileSliderPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setTimeout(() => setIsMobileSliderPaused(false), 2000);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && currentSlide < filteredServices.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
    
    setTouchStart(0);
    setTouchEnd(0);
    
    setTimeout(() => setIsMobileSliderPaused(false), 2000);
  };

  // Reset slide when category changes
  useEffect(() => {
    setCurrentSlide(0);
    setIsMobileSliderPaused(false);
  }, [activeCategory]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsMobileSliderPaused(true);
    setTimeout(() => setIsMobileSliderPaused(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#ebebeb]" style={{ fontFamily: 'Georgia, serif' }}>
      
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 transition-all duration-1000"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <img
            src={currentService.image}
            alt={currentService.title}
            className="w-full h-full object-cover"
            style={{ animation: 'ken-burns 20s ease-in-out infinite alternate' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a2a2a]/95 via-[#2a2a2a]/80 sm:via-[#2a2a2a]/70 to-[#2a2a2a]/60 sm:to-transparent" style={{ animation: 'fade-in 1s ease-out' }}></div>
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
          <div className="max-w-2xl text-white w-full" style={{ animation: 'slide-up 0.8s ease-out' }}>
            <div className="mb-3 sm:mb-4" style={{ animation: 'fade-in 0.6s ease-out 0.1s both' }}>
              <span className="inline-block bg-gradient-to-r from-[#737373] to-[#5a5a5a] px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-lg" style={{ backgroundSize: '200% 200%', animation: 'shimmer 3s ease infinite' }}>
                {currentService.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4 leading-tight" style={{ animation: 'fade-in 0.6s ease-out 0.2s both' }}>
              {currentService.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light text-[#ebebeb] mb-2 sm:mb-3" style={{ animation: 'fade-in 0.6s ease-out 0.3s both' }}>
              {currentService.subtitle}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-[#ebebeb]/90 mb-6 sm:mb-8 leading-relaxed" style={{ animation: 'fade-in 0.6s ease-out 0.4s both' }}>
              {currentService.description}
            </p>
            <button
              onClick={() => handleExploreProject(currentService.title)}
              className="group bg-white text-[#2a2a2a] px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold inline-flex items-center gap-2 sm:gap-3 hover:bg-gradient-to-r hover:from-[#737373] hover:to-[#5a5a5a] hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-sm sm:text-base"
              style={{ animation: 'fade-in 0.6s ease-out 0.5s both' }}
            >
              <span>Explore Project</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2" style={{ animation: 'fade-in 1s ease-out' }}>
          {SERVICES.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveService(index)}
              className="relative h-0.5 sm:h-1 bg-white/30 rounded-full overflow-hidden transition-all duration-500 hover:bg-white/50"
              style={{ width: activeService === index ? '32px' : '16px' }}
            >
              {activeService === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-white via-[#ebebeb] to-white rounded-full" style={{ animation: 'progress 6s linear' }}></div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16" style={{ animation: 'slide-up 0.8s ease-out' }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2a2a2a] mb-3 sm:mb-4 px-4" style={{ animation: 'fade-in 1s ease-out' }}>
              Our Expertise
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-[#737373] to-[#5a5a5a] mx-auto mb-4 sm:mb-6" style={{ backgroundSize: '200% 200%', animation: 'shimmer 3s ease infinite' }}></div>
            <p className="text-base sm:text-lg md:text-xl text-[#737373] max-w-2xl mx-auto px-4" style={{ animation: 'fade-in 0.6s ease-out 0.2s both' }}>
              Comprehensive architectural and interior design services tailored to your vision
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 px-4" style={{ animation: 'fade-in 0.6s ease-out 0.3s both' }}>
            {['All', 'Architecture', 'Interiors'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[#737373] to-[#5a5a5a] text-white shadow-lg'
                    : 'bg-white text-[#737373] hover:bg-[#ebebeb] hover:shadow-md'
                }`}
                style={activeCategory === category ? { animation: 'pulse-glow 2s ease-in-out infinite' } : {}}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Mobile Swipe Slider (visible only on mobile) */}
          <div className="sm:hidden relative">
            <div 
              ref={sliderRef}
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setIsMobileSliderPaused(true)}
              onMouseLeave={() => setIsMobileSliderPaused(false)}
            >
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {filteredServices.map((service, index) => (
                  <div
                    key={service.id}
                    className="w-full flex-shrink-0 px-2"
                  >
                    <div 
                      className="group bg-[#e5e5e5] overflow-hidden shadow-lg cursor-pointer"
                      onClick={() => handleServiceClick(service.link)}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a]/80 via-transparent to-transparent"></div>
                        
                        <div className="absolute top-3 right-3">
                          <span className="bg-white/90 backdrop-blur-sm text-[#2a2a2a] px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg">
                            {service.category}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3">
                          <button
                            onClick={(e) => handleViewDetails(service.link, e)}
                            className="w-full bg-white text-[#2a2a2a] px-3 py-2.5 font-semibold flex items-center justify-center gap-2 hover:bg-gradient-to-r hover:from-[#737373] hover:to-[#5a5a5a] hover:text-white transition-all duration-300 shadow-xl text-sm"
                          >
                            <span>View Details</span>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-[#e5e5e5]">
                        <h3 className="text-xl font-bold text-[#2a2a2a] mb-1.5">
                          {service.title}
                        </h3>
                        <p className="text-xs font-semibold text-[#737373] mb-2 tracking-wide uppercase">
                          {service.subtitle}
                        </p>
                        <p className="text-sm text-[#737373] leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {filteredServices.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 relative ${
                    currentSlide === index 
                      ? 'w-8 bg-gradient-to-r from-[#737373] to-[#5a5a5a]' 
                      : 'w-2 bg-[#d0d0d0] hover:bg-[#a0a0a0]'
                  }`}
                >
                  {currentSlide === index && !isMobileSliderPaused && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#737373] to-[#5a5a5a] rounded-full" style={{ animation: 'progress-mobile 4s linear' }}></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop/Tablet Grid (hidden on mobile) */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                className="group bg-[#e5e5e5] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer"
                style={{ 
                  animation: 'fade-in 1s ease-out',
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
                onClick={() => handleServiceClick(service.link)}
              >
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <div className="absolute top-4 right-4 transform transition-all duration-300 group-hover:scale-110">
                    <span className="bg-white/90 backdrop-blur-sm text-[#2a2a2a] px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      {service.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button
                      onClick={(e) => handleViewDetails(service.link, e)}
                      className="w-full bg-white text-[#2a2a2a] px-4 py-3 font-semibold flex items-center justify-center gap-2 hover:bg-gradient-to-r hover:from-[#737373] hover:to-[#5a5a5a] hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-sm sm:text-base"
                    >
                      <span>View Details</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-5 md:p-6 bg-[#e5e5e5] transform transition-all duration-300 group-hover:bg-[#d5d5d5]">
                  <h3 className="text-2xl font-bold text-[#2a2a2a] mb-2 transition-all duration-300 group-hover:text-[#5a5a5a]">
                    {service.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#737373] mb-3 tracking-wide uppercase transition-all duration-300">
                    {service.subtitle}
                  </p>
                  <p className="text-base text-[#737373] leading-relaxed transition-all duration-300 group-hover:text-[#5a5a5a]">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animations */}
      <style jsx global>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes progress-mobile {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(115, 115, 115, 0.3); }
          50% { box-shadow: 0 0 30px rgba(115, 115, 115, 0.6); }
        }
        
        @media (max-width: 640px) {
          @keyframes ken-burns {
            0% { transform: scale(1.1); }
            100% { transform: scale(1.2); }
          }
        }
      `}</style>
    </div>
  );
}