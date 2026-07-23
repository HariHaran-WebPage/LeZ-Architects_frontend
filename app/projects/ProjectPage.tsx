"use client"
import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  MapPin, 
  Ruler, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Book,
  Layers,
  Star,
  Zap,
  Clock,
  Award,
  Calendar,
  Home
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  clientName?: string;
  location: string;
  area: string;
  images: string[];
  year: string;
  category: string;
}

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

const generateImages = (projectId: string) => {
  const imageIds = [
    '1545324418-cc1a3fa10c00',
    '1486406146926-c627a92ad1ab',
    '1582719508461-905c673771fd',
    '1518998053901-5348d3961a04',
    '1562774053-701939374585',
    '1600607687939-ce8a6c25118c',
    '1480714378408-67cf0d13bc1b',
    '1517248135467-4c7edcad34c4',
  ];
  
  return imageIds.map((id, index) => 
    `https://images.unsplash.com/photo-${id}?w=1200&q=80&fit=crop&crop=entropy&auto=format&id=${projectId}-${index}`
  );
};

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev'>('next');
  const [leftPageTurning, setLeftPageTurning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const bookViewerRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: "1",
      title: "RR Residence",
      clientName: "Dr. Sharmila",
      location: "Chindabaram",
      area: "7572 Sqft",
      year: "2023",
      category: "Luxury Villa",
      images: generateImages("1"),
    },
    {
      id: "2",
      title: "Selavraj Villa",
      clientName: "Selvaraj",
      location: "Tiruppur",
      area: "2500 Sqft",
      year: "2022",
      category: "Modern Residence",
      images: generateImages("2"),
    },
    {
      id: "3",
      title: "Senthil Residence",
      location: "Pollachi",
      area: "3500 Sqft",
      year: "2023",
      category: "Contemporary House",
      images: generateImages("3"),
    },
    {
      id: "4",
      title: "Rajesh House",
      clientName: "Rajesh",
      location: "Tiruppur",
      area: "5500 Sqft",
      year: "2021",
      category: "Traditional Villa",
      images: generateImages("4"),
    },
    {
      id: "5",
      title: "Yash Mittal Residence",
      clientName: "Yash Mittal",
      location: "Vellakovil, Karur",
      area: "2500 Sqft",
      year: "2023",
      category: "Modern Bungalow",
      images: generateImages("5"),
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentPage(0);
    setIsBookOpen(true);
  };

  const closeProject = () => {
    setIsBookOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
      setCurrentPage(0);
    }, 400);
  };

  const nextPage = () => {
    if (!selectedProject || isTurning) return;
    
    const totalPages = selectedProject.images.length;
    if (currentPage < totalPages - 1) {
      setTurnDirection('next');
      setIsTurning(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setTimeout(() => setIsTurning(false), 100);
      }, 600);
    }
  };

  const prevPage = () => {
    if (!selectedProject || isTurning || currentPage === 0) return;
    
    setTurnDirection('prev');
    setIsTurning(true);
    setTimeout(() => {
      setCurrentPage(prev => prev - 1);
      setTimeout(() => setIsTurning(false), 100);
    }, 600);
  };

  // Enhanced touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !touchStart) return;
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
  };

  const handleTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance) {
      // Left swipe - next page
      nextPage();
    } else if (distance < -minSwipeDistance) {
      // Right swipe - previous page
      prevPage();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      
      switch(e.key) {
        case 'ArrowRight':
          nextPage();
          break;
        case 'ArrowLeft':
          prevPage();
          break;
        case 'Escape':
          closeProject();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, currentPage, isTurning]);

  // Desktop Book Viewer (Two Pages)
  const DesktopBookViewer = () => (
    <div className="relative w-full h-full flex max-w-6xl mx-auto" style={{ transformStyle: 'preserve-3d' }}>
      {/* Left Page with Turn Effect */}
      <div className="relative w-1/2 h-full">
        <div className={`absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-l-2xl md:rounded-l-3xl shadow-2xl overflow-hidden transition-all duration-600 ${
          leftPageTurning ? 'page-turn-left' : ''
        }`} style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}>
          {/* Paper Texture */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E"),
                radial-gradient(ellipse at 15% 25%, rgba(100,100,100,0.1) 0%, transparent 50%),
                repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(100,100,100,0.03) 40px, rgba(100,100,100,0.03) 41px)
              `
            }}></div>
          </div>

          {currentPage > 0 ? (
            <div className="relative h-full p-4 sm:p-6 md:p-8 lg:p-10 flex items-center justify-center">
              <div className="relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh] rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl border border-gray-400/30 bg-gray-50/10">
                <img
                  src={selectedProject!.images[currentPage - 1]}
                  alt={`Previous page`}
                  className="w-full h-full object-contain"
                />
                
                {/* Corner Decorations */}
                <div className="absolute inset-2 pointer-events-none">
                  <div className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-t border-l border-gray-400/20"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-t border-r border-gray-400/20"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-b border-l border-gray-400/20"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-b border-r border-gray-400/20"></div>
                </div>
              </div>
              
              {/* Page Number */}
              <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 text-gray-600 text-xs sm:text-sm font-serif bg-gray-50/80 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-400/30 shadow-lg">
                Page {currentPage}
              </div>
            </div>
          ) : (
            <div className="relative h-full p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center">
              {/* Cover Page Content */}
              <div className="text-center space-y-4 sm:space-y-6 max-w-2xl">
                {/* Title Section */}
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-700 mb-2 sm:mb-3 leading-tight">
                    {selectedProject!.title}
                  </h2>
                  
                  <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                    <div className="w-8 h-px sm:w-12 sm:h-px bg-gradient-to-r from-transparent to-gray-400/30"></div>
                    <span className="text-gray-500 text-sm sm:text-base font-serif italic">{selectedProject!.category}</span>
                    <div className="w-8 h-px sm:w-12 sm:h-px bg-gradient-to-l from-transparent to-gray-400/30"></div>
                  </div>
                </div>
                
                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-lg sm:rounded-xl border border-gray-400/30 shadow-lg">
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      <span className="font-serif font-semibold text-gray-600 text-xs sm:text-sm">Location</span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-gray-700">{selectedProject!.location}</div>
                  </div>
                  
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-lg sm:rounded-xl border border-gray-400/30 shadow-lg">
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <Ruler className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      <span className="font-serif font-semibold text-gray-600 text-xs sm:text-sm">Area</span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-gray-700">{selectedProject!.area}</div>
                  </div>
                  
                  {/* Client or Category */}
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-lg sm:rounded-xl border border-gray-400/30 shadow-lg">
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      {selectedProject!.clientName ? (
                        <>
                          <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          <span className="font-serif font-semibold text-gray-600 text-xs sm:text-sm">Client</span>
                        </>
                      ) : (
                        <>
                          <Home className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          <span className="font-serif font-semibold text-gray-600 text-xs sm:text-sm">Type</span>
                        </>
                      )}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-gray-700">
                      {selectedProject!.clientName || selectedProject!.category}
                    </div>
                  </div>
                  
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-lg sm:rounded-xl border border-gray-400/30 shadow-lg">
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      <span className="font-serif font-semibold text-gray-600 text-xs sm:text-sm">Year</span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-gray-700">{selectedProject!.year}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center Spine */}
      <div className="relative w-4 sm:w-6 md:w-8 lg:w-12 xl:w-16 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-700 shadow-2xl z-10 border-y-2 border-gray-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.4) 4px, rgba(0,0,0,0.4) 5px),
              radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.05) 0%, transparent 70%)
            `
          }}></div>
          
          {/* Center Line */}
          <div className="absolute left-1/2 top-12 bottom-12 w-px bg-gradient-to-b from-gray-400/60 via-gray-400 to-gray-400/60 shadow-lg"></div>
          
          {/* Decorative Bands */}
          <div className="absolute top-1/4 left-1 sm:left-2 right-1 sm:right-2 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          <div className="absolute bottom-1/4 left-1 sm:left-2 right-1 sm:right-2 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
        </div>
      </div>

      {/* Right Page with Turn Effect */}
      <div className="relative w-1/2 h-full">
        <div className={`absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-r-2xl md:rounded-r-3xl shadow-2xl overflow-hidden transition-all duration-600 ${
          isTurning ? 'page-turn-right' : ''
        }`} style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}>
          {/* Paper Texture */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E"),
                radial-gradient(ellipse at 85% 25%, rgba(100,100,100,0.1) 0%, transparent 50%),
                repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(100,100,100,0.03) 40px, rgba(100,100,100,0.03) 41px)
              `
            }}></div>
          </div>

          {/* Current Page Content */}
          <div className="relative h-full p-4 sm:p-6 md:p-8 lg:p-10 flex items-center justify-center">
            <div className="relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh] rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl border border-gray-400/30 bg-gray-50/10">
              <img
                src={selectedProject!.images[currentPage]}
                alt={`Page ${currentPage + 1}`}
                className="w-full h-full object-contain"
              />
              
              {/* Corner Decorations */}
              <div className="absolute inset-2 pointer-events-none">
                <div className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-t border-l border-gray-400/20"></div>
                <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-t border-r border-gray-400/20"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-b border-l border-gray-400/20"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-b border-r border-gray-400/20"></div>
              </div>
            </div>
            
            {/* Page Number */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 text-gray-600 text-xs sm:text-sm font-serif bg-gray-50/80 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-400/30 shadow-lg">
              Page {currentPage + 1}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Mobile Book Viewer with Realistic Page Flip
  const MobileBookViewer = () => (
    <div 
      ref={bookViewerRef}
      className="relative w-full h-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Page Flip Container */}
      <div className="relative w-full h-full perspective-1000">
        {/* Page Shadow Effect */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${
          isTurning ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 via-transparent to-gray-900/40"></div>
        </div>

        {/* Book Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
          {/* Book Texture */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.05) 2px,
                rgba(255,255,255,0.05) 4px
              )`
            }}></div>
          </div>
          
          {/* Current Page - Always visible */}
          <div className={`absolute inset-0 transition-all duration-300 ${
            isTurning && turnDirection === 'next' ? 'z-0' : 'z-10'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-2xl overflow-hidden">
              {/* Paper Texture */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`
              }}></div>
              
              {/* Page Content */}
              <div className="relative h-full p-4 sm:p-6">
                {currentPage === 0 ? (
                  // Cover Page Content
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
                    {/* Emblem */}
                    <div className="relative mb-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gray-600 via-gray-500 to-gray-700 flex items-center justify-center shadow-xl border-2 border-gray-400/50">
                        <Book className="w-8 h-8 sm:w-10 sm:h-10 text-gray-100" />
                      </div>
                      <div className="absolute -inset-2 border border-gray-400/20 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Title */}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-700 mb-2 leading-tight">
                        {selectedProject!.title}
                      </h2>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-6 h-px bg-gradient-to-r from-transparent to-gray-400/30"></div>
                        <span className="text-gray-500 text-sm font-serif italic">{selectedProject!.category}</span>
                        <div className="w-6 h-px bg-gradient-to-l from-transparent to-gray-400/30"></div>
                      </div>
                    </div>
                    
                    {/* Preview Image */}
                    <div className="relative w-full max-w-xs h-48 rounded-lg overflow-hidden shadow-lg border border-gray-400/30 mb-4">
                      <img
                        src={selectedProject!.images[0]}
                        alt={selectedProject!.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
                    </div>
                    
                    {/* Info Cards */}
                    <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                      {[
                        { icon: MapPin, label: 'Location', value: selectedProject!.location },
                        { icon: Ruler, label: 'Area', value: selectedProject!.area },
                        { icon: Calendar, label: 'Year', value: selectedProject!.year },
                        { 
                          icon: selectedProject!.clientName ? User : Home, 
                          label: selectedProject!.clientName ? 'Client' : 'Category', 
                          value: selectedProject!.clientName || selectedProject!.category 
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="p-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-400/20 shadow-sm">
                          <div className="flex items-center gap-1 mb-1">
                            <item.icon className="w-3 h-3 text-gray-600" />
                            <span className="text-xs font-semibold text-gray-600">{item.label}</span>
                          </div>
                          <div className="text-xs font-bold text-gray-700 truncate">{item.value}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Swipe Hint */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-4 animate-pulse">
                      <ChevronLeft className="w-4 h-4" />
                      <span>Swipe to turn page</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ) : (
                  // Image Page Content
                  <div className="h-full flex flex-col">
                    {/* Page Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                          <Book className="w-4 h-4 text-gray-100" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-700">{selectedProject!.title}</h3>
                          <p className="text-xs text-gray-500">Page {currentPage + 1}</p>
                        </div>
                      </div>
                      <div className="px-2 py-1 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full">
                        <span className="text-xs text-gray-100 font-bold">
                          {currentPage + 1}/{selectedProject!.images.length}
                        </span>
                      </div>
                    </div>
                    
                    {/* Image Container */}
                    <div className="flex-1 relative overflow-hidden rounded-xl border border-gray-400/30 bg-gray-50/50">
                      <img
                        src={selectedProject!.images[currentPage]}
                        alt={`Page ${currentPage + 1}`}
                        className="w-full h-full object-contain"
                      />
                      
                      {/* Corner Decorations */}
                      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gray-400/30"></div>
                      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gray-400/30"></div>
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gray-400/30"></div>
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gray-400/30"></div>
                    </div>
                    
                    {/* Page Footer */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-gray-600">
                        <span className="font-semibold">Project:</span> {selectedProject!.title}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs text-gray-600">Completed</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Next/Previous Page - Visible during flip */}
          <div className={`absolute inset-0 transition-all duration-300 ${
            isTurning ? 'z-20' : 'z-0 opacity-0'
          }`}>
            <div className={`absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-2xl overflow-hidden transform-gpu ${
              isTurning && turnDirection === 'next' 
                ? 'animate-page-flip-next' 
                : isTurning && turnDirection === 'prev'
                ? 'animate-page-flip-prev'
                : ''
            }`}>
              {/* Paper Texture for flipping page */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`
              }}></div>
              
              {/* Flipping Page Content */}
              <div className="relative h-full p-4 sm:p-6">
                {turnDirection === 'next' && currentPage < selectedProject!.images.length - 1 ? (
                  // Next Page Preview
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                          <Book className="w-4 h-4 text-gray-100" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-700">{selectedProject!.title}</h3>
                          <p className="text-xs text-gray-500">Page {currentPage + 2}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 relative overflow-hidden rounded-xl border border-gray-400/30 bg-gray-50/50">
                      <img
                        src={selectedProject!.images[currentPage + 1]}
                        alt={`Page ${currentPage + 2}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                ) : turnDirection === 'prev' && currentPage > 0 ? (
                  // Previous Page Preview
                  currentPage === 1 ? (
                    // Back to cover
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                      <div className="relative mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 via-gray-500 to-gray-700 flex items-center justify-center">
                          <Book className="w-6 h-6 text-gray-100" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-700">Returning to Cover</h3>
                      <p className="text-sm text-gray-500">Swipe right to continue</p>
                    </div>
                  ) : (
                    // Previous image page
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                            <Book className="w-4 h-4 text-gray-100" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-gray-700">{selectedProject!.title}</h3>
                            <p className="text-xs text-gray-500">Page {currentPage}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 relative overflow-hidden rounded-xl border border-gray-400/30 bg-gray-50/50">
                        <img
                          src={selectedProject!.images[currentPage - 1]}
                          alt={`Page ${currentPage}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  )
                ) : (
                  // Empty state
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">No more pages</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Page Curl Effect */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isTurning ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className={`absolute top-0 bottom-0 w-32 ${
            turnDirection === 'next' ? 'right-0' : 'left-0'
          }`}>
            <div className={`absolute top-0 bottom-0 w-full ${
              turnDirection === 'next' 
                ? 'bg-gradient-to-l from-gray-900/30 to-transparent animate-page-curl-next'
                : 'bg-gradient-to-r from-gray-900/30 to-transparent animate-page-curl-prev'
            }`}></div>
          </div>
        </div>
        
        {/* Touch Navigation Hints */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 0 || isTurning}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              currentPage === 0 || isTurning
                ? 'opacity-30 cursor-not-allowed bg-gray-700/30 border-gray-600/20'
                : 'bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-300 hover:to-gray-400 border border-gray-300/40 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          
          <div className="px-4 py-2 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-full border border-gray-700/50">
            <span className="text-sm text-gray-100 font-semibold">
              {currentPage + 1} / {selectedProject!.images.length}
            </span>
          </div>
          
          <button
            onClick={nextPage}
            disabled={currentPage >= selectedProject!.images.length - 1 || isTurning}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              currentPage >= selectedProject!.images.length - 1 || isTurning
                ? 'opacity-30 cursor-not-allowed bg-gray-700/30 border-gray-600/20'
                : 'bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-300 hover:to-gray-400 border border-gray-300/40 active:scale-95'
            }`}
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>
    </div>
  );

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
        
        @keyframes pageTurnRight {
          0% {
            transform: rotateY(0deg);
            filter: brightness(1) blur(0px);
          }
          20% {
            transform: rotateY(-20deg);
            filter: brightness(0.95) blur(1px);
          }
          40% {
            transform: rotateY(-40deg);
            filter: brightness(0.9) blur(2px);
          }
          60% {
            transform: rotateY(-60deg);
            filter: brightness(0.85) blur(3px);
          }
          80% {
            transform: rotateY(-80deg);
            filter: brightness(0.8) blur(4px);
          }
          100% {
            transform: rotateY(-100deg);
            filter: brightness(0.75) blur(5px);
          }
        }
        
        @keyframes pageTurnLeft {
          0% {
            transform: rotateY(0deg);
            filter: brightness(1) blur(0px);
          }
          20% {
            transform: rotateY(20deg);
            filter: brightness(0.95) blur(1px);
          }
          40% {
            transform: rotateY(40deg);
            filter: brightness(0.9) blur(2px);
          }
          60% {
            transform: rotateY(60deg);
            filter: brightness(0.85) blur(3px);
          }
          80% {
            transform: rotateY(80deg);
            filter: brightness(0.8) blur(4px);
          }
          100% {
            transform: rotateY(100deg);
            filter: brightness(0.75) blur(5px);
          }
        }
        
        @keyframes page-flip-next {
          0% {
            transform: rotateY(0deg) translateX(0);
            opacity: 0;
            z-index: 0;
          }
          10% {
            opacity: 1;
            z-index: 20;
          }
          50% {
            transform: rotateY(-90deg) translateX(-50%);
            box-shadow: -20px 0 30px rgba(0,0,0,0.2);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: rotateY(0deg) translateX(0);
            opacity: 1;
            z-index: 10;
            box-shadow: none;
          }
        }
        
        @keyframes page-flip-prev {
          0% {
            transform: rotateY(0deg) translateX(0);
            opacity: 0;
            z-index: 0;
          }
          10% {
            opacity: 1;
            z-index: 20;
          }
          50% {
            transform: rotateY(90deg) translateX(50%);
            box-shadow: 20px 0 30px rgba(0,0,0,0.2);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: rotateY(0deg) translateX(0);
            opacity: 1;
            z-index: 10;
            box-shadow: none;
          }
        }
        
        @keyframes page-curl-next {
          0% {
            transform: translateX(100%) skewX(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          50% {
            transform: translateX(0) skewX(-10deg);
            opacity: 0.8;
          }
          80% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(-100%) skewX(0deg);
            opacity: 0;
          }
        }
        
        @keyframes page-curl-prev {
          0% {
            transform: translateX(-100%) skewX(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          50% {
            transform: translateX(0) skewX(10deg);
            opacity: 0.8;
          }
          80% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(100%) skewX(0deg);
            opacity: 0;
          }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .book-3d {
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .book-3d:hover {
          transform: 
            rotateY(-5deg) 
            rotateX(2deg) 
            translateZ(20px) 
            scale(1.02);
          box-shadow: 
            0 25px 50px -15px rgba(0, 0, 0, 0.6),
            0 0 40px rgba(100,100,100,0.2),
            inset 0 0 30px rgba(255, 255,255, 0.05);
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        
        .page-turn-right {
          animation: pageTurnRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .page-turn-left {
          animation: pageTurnLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-page-flip-next {
          animation: page-flip-next 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-page-flip-prev {
          animation: page-flip-prev 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-page-curl-next {
          animation: page-curl-next 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-page-curl-prev {
          animation: page-curl-prev 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Enhanced touch feedback */
        .active\:scale-95:active {
          transform: scale(0.95);
        }

        @media (max-width: 768px) {
          .book-3d:hover {
            transform: 
              rotateY(-3deg) 
              rotateX(1deg) 
              translateZ(10px) 
              scale(1.01);
          }
        }
      `}</style>

      {/* Hero Section - Same as Services page */}
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
                <Book className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-[fadeInUp_1s_ease-out] drop-shadow-2xl relative z-10" />
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
            Our Portfolio
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
                <span className="relative z-10 transition-all duration-500 group-hover:text-gray-200">Architectural</span>
                <div className={`absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r ${COLORS.gradients.grayLight} transform origin-left animate-[expandWidth_1.8s_ease-out] shadow-lg shadow-gray-400/50`}></div>
                <div className="absolute inset-0 blur-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </span>
              
              <span className="block md:inline-block mx-2 sm:mx-3 md:mx-4">
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300 font-normal italic animate-[shimmer_4s_ease-in-out_infinite] text-4xl sm:text-5xl md:text-6xl" style={{backgroundSize: '200% auto'}}>
                  &
                </span>
              </span>
              
              <span className="inline-block relative group mt-2 md:mt-0">
                <span className="relative z-10 transition-all duration-500 group-hover:text-gray-200">Interior Projects</span>
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
            Explore our curated collection of architectural masterpieces
          </p>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-8 sm:py-12 md:py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            <h2 style={{ 
              fontFamily: "'Playfair Display', 'Times New Roman', serif", 
              color: COLORS.primary.gray.rich 
            }} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-snug tracking-tight">
              Project Collection
            </h2>
            <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          </div>
          <p style={{ 
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", 
            color: COLORS.primary.gray.charcoal
          }} className="text-gray-600 text-sm sm:text-base md:text-lg font-serif">
            Select a book to explore the complete project journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => openProject(project)}
              className="relative cursor-pointer group perspective-1000 w-full max-w-sm h-[400px] sm:h-[450px] md:h-[500px] lg:h-[520px]"
              style={{ perspective: '1000px' }}
            >
              {/* Book Container */}
              <div className="relative h-full w-full transition-all duration-700 group-hover:scale-[1.02] group-hover:-translate-y-2 sm:group-hover:-translate-y-4" 
                   style={{ transformStyle: 'preserve-3d' }}>
                
                {/* Enhanced Book Shadow */}
                <div className="absolute -bottom-4 sm:-bottom-6 left-6 sm:left-8 right-6 sm:right-8 h-8 sm:h-12 bg-gradient-radial from-gray-700/60 via-gray-700/30 to-transparent rounded-full blur-xl group-hover:from-gray-700/80 transition-all duration-500"></div>
                
                {/* Main Book Body - Gray Theme */}
                <div className="relative h-full w-full bg-gradient-to-br from-[#525252] via-[#737373] to-[#525252] rounded-r-xl shadow-2xl overflow-hidden border-2 border-gray-800 book-3d">
                  {/* Gray Texture */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 70%, rgba(0,0,0,0.4) 0%, transparent 50%),
                      repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px),
                      repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 6px),
                      linear-gradient(45deg, rgba(255,255,255,0.05), transparent 50%)
                    `
                  }}></div>
                  
                  {/* Worn edges effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-2 sm:h-3 bg-gradient-to-b from-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-3 sm:h-4 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-0 bottom-0 right-0 w-2 sm:w-3 bg-gradient-to-l from-black/40 to-transparent"></div>
                  </div>
                  
                  {/* Enhanced Book Spine */}
                  <div className="absolute left-0 top-3 sm:top-4 bottom-3 sm:bottom-4 w-12 sm:w-16 bg-gradient-to-b from-[#525252] via-[#404040] to-[#525252] shadow-2xl rounded-l-lg border-r-2 border-gray-800">
                    {/* Spine Texture */}
                    <div className="absolute inset-0" style={{
                      backgroundImage: `
                        repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px),
                        radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.05) 0%, transparent 70%),
                        linear-gradient(90deg, rgba(0,0,0,0.1), transparent 30%)
                      `
                    }}></div>
                    
                    {/* Spine Stitching */}
                    <div className="absolute top-1/4 left-1 sm:left-2 right-1 sm:right-2 h-[1px] sm:h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent shadow-lg"></div>
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3">
                      <div className="w-full h-full bg-gray-400/30 rounded-full border border-gray-400/50"></div>
                    </div>
                    
                    <div className="absolute top-1/2 left-1 sm:left-2 right-1 sm:right-2 h-[1px] sm:h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent shadow-lg"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3">
                      <div className="w-full h-full bg-gray-400/30 rounded-full border border-gray-400/50"></div>
                    </div>
                    
                    <div className="absolute bottom-1/4 left-1 sm:left-2 right-1 sm:right-2 h-[1px] sm:h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent shadow-lg"></div>
                    <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3">
                      <div className="w-full h-full bg-gray-400/30 rounded-full border border-gray-400/50"></div>
                    </div>
                    
                    {/* Spine Title with Embossed Effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap">
                      <div className="relative">
                        <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-b from-gray-300/10 to-transparent blur-sm"></div>
                        <span className="relative text-[10px] sm:text-xs font-serif font-bold text-gray-300 tracking-[0.2em] sm:tracking-[0.3em] uppercase px-2 sm:px-3 truncate max-w-[60px] sm:max-w-[80px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{
                          textShadow: '0 0 10px rgba(255,255,255,0.3), 0 1px 3px rgba(0,0,0,0.8)',
                          letterSpacing: '0.2em'
                        }}>
                          {project.title}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Book Cover - Light Gray Theme */}
                  <div className="relative h-full ml-12 sm:ml-16 p-3 sm:p-4 flex flex-col bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
                    {/* Paper Texture */}
                    <div className="absolute inset-0" style={{
                      backgroundImage: `
                        url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0' width='100' height='100'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E"),
                        radial-gradient(ellipse at 10% 20%, rgba(100,100,100,0.15) 0%, transparent 50%),
                        radial-gradient(ellipse at 90% 80%, rgba(100,100,100,0.12) 0%, transparent 50%),
                        repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(100,100,100,0.03) 40px, rgba(100,100,100,0.03) 41px),
                        repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(100,100,100,0.02) 60px, rgba(100,100,100,0.02) 61px)
                      `
                    }}></div>
                    
                    {/* Age Spots */}
                    <div className="absolute top-8 sm:top-10 right-10 sm:right-14 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-400/10 blur-sm"></div>
                    <div className="absolute bottom-16 sm:bottom-20 left-8 sm:left-10 w-8 h-4 sm:w-10 sm:h-5 rounded-full bg-gray-500/10 blur-sm"></div>
                    
                    {/* Corner Frames */}
                    {[
                      { top: 1, left: 1 },
                      { top: 1, right: 1 },
                      { bottom: 1, left: 1 },
                      { bottom: 1, right: 1 }
                    ].map((pos, idx) => (
                      <div key={idx} className={`absolute w-8 h-8 sm:w-12 sm:h-12 ${Object.entries(pos).map(([key, val]) => `${key}-${val}`).join(' ')}`}>
                        <div className="absolute inset-0 border border-gray-400/20 rounded">
                          {/* Corner Accents */}
                          <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t border-l border-gray-500"></div>
                          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t border-r border-gray-500"></div>
                          <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 border-b border-l border-gray-500"></div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 border-b border-r border-gray-500"></div>
                        </div>
                      </div>
                    ))}

                    {/* Book Content */}
                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-1 sm:py-2">
                      {/* Emblem */}
                      <div className="mb-2 sm:mb-4">
                        <div className="relative">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gray-500 via-gray-400 to-gray-600 flex items-center justify-center shadow-xl border-2 border-gray-400/50">
                            <Layers className="w-4 h-4 sm:w-6 sm:h-6 text-gray-100" />
                          </div>
                          <div className="absolute -inset-2 sm:-inset-3 border border-gray-400/20 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Title Section */}
                      <div className="text-center mb-2 sm:mb-4 w-full px-2 sm:px-3">
                        <div className="mb-1 sm:mb-3">
                          <h3 className="text-sm sm:text-lg md:text-xl font-serif font-bold text-gray-700 mb-0.5 sm:mb-1 leading-tight tracking-tight line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center">
                            {project.title}
                          </h3>
                          <div className="flex items-center justify-center gap-2 sm:gap-3">
                            <div className="w-4 h-px sm:w-6 sm:h-px bg-gradient-to-r from-transparent to-gray-400/30"></div>
                            <span className="text-[10px] sm:text-xs text-gray-500 italic font-serif">Vol. {project.id}</span>
                            <div className="w-4 h-px sm:w-6 sm:h-px bg-gradient-to-l from-transparent to-gray-400/30"></div>
                          </div>
                        </div>
                        
                        {/* Divider */}
                        <div className="relative my-2 sm:my-3 w-full">
                          <div className="h-px bg-gradient-to-r from-transparent via-gray-400/50 to-transparent"></div>
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400/30 rotate-45 border border-gray-500/20"></div>
                        </div>
                      </div>
                      
                      {/* Project Info Grid - Fixed height container */}
                      <div className="space-y-1.5 sm:space-y-2 md:space-y-3 w-full max-w-xs mb-2 sm:mb-4 min-h-[100px] sm:min-h-[120px] md:min-h-[140px]">
                        {/* Location Card */}
                        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded border border-gray-300/30 shadow-sm hover:shadow-md transition-shadow duration-300">
                          <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/10 flex items-center justify-center border border-gray-400/30">
                              <MapPin className="w-2 h-2 sm:w-3 sm:h-3 text-gray-600" />
                            </div>
                            <span className="text-[10px] sm:text-xs font-semibold text-gray-600 font-serif">Location</span>
                          </div>
                          <div className="text-[10px] sm:text-xs font-bold text-gray-700 bg-gray-50/60 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded border border-gray-400/20 truncate">
                            {project.location}
                          </div>
                        </div>
                        
                        {/* Area Card */}
                        <div className="flex items-center justify-between p-1.5 sm:p-2 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded border border-gray-300/30 shadow-sm hover:shadow-md transition-shadow duration-300">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/10 flex items-center justify-center border border-gray-400/30">
                              <Ruler className="w-2 h-2 sm:w-3 sm:h-3 text-gray-600" />
                            </div>
                            <span className="text-[10px] sm:text-xs font-semibold text-gray-600 font-serif">Area</span>
                          </div>
                          <div className="text-[10px] sm:text-xs font-bold text-gray-700 bg-gray-50/60 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded border border-gray-400/20">
                            {project.area}
                          </div>
                        </div>
                        
                        {/* Client Card - Conditionally rendered */}
                        {project.clientName ? (
                          <div className="flex items-center justify-between p-1.5 sm:p-2 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded border border-gray-300/30 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/10 flex items-center justify-center border border-gray-400/30">
                                <User className="w-2 h-2 sm:w-3 sm:h-3 text-gray-600" />
                              </div>
                              <span className="text-[10px] sm:text-xs font-semibold text-gray-600 font-serif">Client</span>
                            </div>
                            <div className="text-[10px] sm:text-xs font-bold text-gray-700 bg-gray-50/60 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded border border-gray-400/20 truncate max-w-[60px] sm:max-w-[80px] md:max-w-[100px]">
                              {project.clientName}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between p-1.5 sm:p-2 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded border border-gray-300/30 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/10 flex items-center justify-center border border-gray-400/30">
                                <Home className="w-2 h-2 sm:w-3 sm:h-3 text-gray-600" />
                              </div>
                              <span className="text-[10px] sm:text-xs font-semibold text-gray-600 font-serif">Category</span>
                            </div>
                            <div className="text-[10px] sm:text-xs font-bold text-gray-700 bg-gray-50/60 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded border border-gray-400/20 truncate max-w-[60px] sm:max-w-[80px] md:max-w-[100px]">
                              {project.category}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Status Badge */}
                      <div className="flex items-center gap-1 sm:gap-2 px-2 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-gray-400/10 via-gray-400/15 to-gray-400/10 rounded border border-gray-400/30">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" style={{
                            boxShadow: '0 0 6px rgba(74,222,128,0.7)'
                          }}></div>
                          <span className="text-[10px] sm:text-xs text-gray-600 font-semibold tracking-wide font-serif">Completed</span>
                        </div>
                        <Calendar className="w-2 h-2 sm:w-3 sm:h-3 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Right Side Page Edges */}
                  <div className="absolute right-0 top-3 sm:top-4 bottom-3 sm:bottom-4 w-6 sm:w-8 pointer-events-none">
                    {[...Array(8)].map((_, i) => {
                      const depth = i * 0.6;
                      const shadowOpacity = 0.25 - (i * 0.02);
                      const lightOpacity = 0.1 - (i * 0.008);
                      
                      return (
                        <div
                          key={i}
                          className="absolute top-2 bottom-2"
                          style={{
                            right: `${depth}px`,
                            width: `${0.8 + i * 0.08}px`,
                            background: `linear-gradient(to bottom, 
                              transparent 0%, 
                              rgba(100,100,100,${shadowOpacity}) 20%,
                              rgba(100,100,100,${shadowOpacity + 0.05}) 50%,
                              rgba(100,100,100,${shadowOpacity}) 80%,
                              transparent 100%
                            )`,
                            transform: `translateX(${i * 0.3}px)`,
                            borderRadius: '0 1px 1px 0',
                            boxShadow: `
                              inset 0 0 1px rgba(255,255,255,${lightOpacity}),
                              1px 0 2px rgba(0,0,0,0.1)
                            `
                          }}
                        />
                      );
                    })}
                    
                    {/* Main page edge shadow */}
                    <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-l from-gray-700/50 via-gray-600/25 to-transparent rounded-r-xl"></div>
                    
                    {/* Edge highlight */}
                    <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-400 to-transparent shadow-[0_0_8px_rgba(255,255,255,0.3)]"></div>
                  </div>

                  {/* Book depth shadow */}
                  <div className="absolute top-4 sm:top-6 -right-2 sm:-right-3 bottom-4 sm:bottom-6 w-3 sm:w-4 bg-gradient-to-l from-gray-700/50 via-gray-600/30 to-transparent rounded-r-lg"></div>
                </div>
              </div>

              {/* Floating Shadow */}
              <div className="absolute -bottom-2 sm:-bottom-3 left-2 sm:left-3 right-2 sm:right-3 h-4 sm:h-6 bg-gradient-radial from-gray-700/40 via-gray-700/20 to-transparent rounded-full blur-lg group-hover:from-gray-700/50 transition-all duration-500"></div>

              {/* Book Preview Info */}
              <div className="absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 bg-gradient-to-br from-gray-700/95 via-gray-800/90 to-gray-700/95 backdrop-blur-sm text-gray-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none whitespace-nowrap border border-gray-400/40 transform group-hover:-translate-y-1 sm:group-hover:-translate-y-2">
                <div className="text-center">
                  <p className="text-[10px] sm:text-xs font-semibold tracking-wide font-serif mb-0.5 sm:mb-1">
                    Explore {project.title}
                  </p>
                  <div className="flex items-center justify-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-300">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <Book className="w-2 h-2 sm:w-3 sm:h-3" />
                      <span>{project.images.length} Pages</span>
                    </div>
                    <div className="w-px h-2 sm:h-3 bg-gray-400/30"></div>
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <Award className="w-2 h-2 sm:w-3 sm:h-3" />
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Book Viewer Modal */}
      {isBookOpen && selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-gray-900/98 via-gray-800/99 to-gray-900/98 backdrop-blur-3xl"
          onClick={closeProject}
        >
          <div
            ref={bookViewerRef}
            className={`relative w-full h-full sm:max-w-5xl lg:max-w-6xl xl:max-w-7xl transition-all duration-700 ${
              isBookOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{ perspective: '2000px' }}
          >
            {/* Close Button */}
            <button
              onClick={closeProject}
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 z-50 p-2 sm:p-3 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full hover:from-gray-300 hover:to-gray-400 transition-all duration-300 shadow-2xl hover:scale-110 hover:rotate-90 group border-2 border-gray-300/50"
            >
              <X className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800 group-hover:rotate-180 transition-transform duration-300" />
            </button>

            {/* Open Book Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Navigation Buttons - Desktop */}
              {!isMobile && (
                <>
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 0 || isTurning || leftPageTurning}
                    className={`absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border-2 ${
                      currentPage === 0 || isTurning || leftPageTurning
                        ? 'opacity-30 cursor-not-allowed bg-gray-700/30 border-gray-600/20'
                        : 'bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-300 hover:to-gray-400 border-gray-300/40 hover:scale-110 hover:shadow-2xl'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-gray-800" />
                  </button>

                  <button
                    onClick={nextPage}
                    disabled={currentPage >= selectedProject.images.length - 1 || isTurning || leftPageTurning}
                    className={`absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border-2 ${
                      currentPage >= selectedProject.images.length - 1 || isTurning || leftPageTurning
                        ? 'opacity-30 cursor-not-allowed bg-gray-700/30 border-gray-600/20'
                        : 'bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-300 hover:to-gray-400 border-gray-300/40 hover:scale-110 hover:shadow-2xl'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-gray-800" />
                  </button>
                </>
              )}

              {/* Book Container - Conditionally render based on screen size */}
              {isMobile ? <MobileBookViewer /> : <DesktopBookViewer />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;