"use client"
import { useState, useEffect, useRef } from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  images: string[];
  description: string;
}

export default function HomeProject() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [projectImageIndexes, setProjectImageIndexes] = useState<{[key: number]: number}>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Dr. Sharmila Residence",
      category: "Residential",
      images: [
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop"
      ],
      description: "Elegant residential design in Chidambaram spanning 7572 sqft with sophisticated interiors"
    },
    {
      id: 2,
      title: "Selvaraj Residence",
      category: "Residential",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop"
      ],
      description: "Modern 2500 sqft home in Tiruppur featuring contemporary design elements"
    },
    {
      id: 3,
      title: "Senthil Residence",
      category: "Residential",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop"
      ],
      description: "Spacious 3500 sqft residence in Pollachi with functional and aesthetic design"
    },
    {
      id: 4,
      title: "Rajesh Residence",
      category: "Residential",
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&h=800&fit=crop"
      ],
      description: "5500 sqft premium home in Tiruppur showcasing luxury living spaces"
    },
    {
      id: 5,
      title: "Yash Mittal Residence",
      category: "Residential",
      images: [
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&h=800&fit=crop"
      ],
      description: "2500 sqft contemporary home in Vellakovil, Karur with modern amenities"
    },
    {
      id: 6,
      title: "Kumar Villa",
      category: "Residential",
      images: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1600566752229-250ed79470e6?w=1200&h=800&fit=crop"
      ],
      description: "Luxurious 4000 sqft villa with modern architectural design"
    }
  ];

  const handleViewDetails = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Navigate to project:', projectId);
    // router.push(`/projects/${projectId}`);
  };

  const handleProjectClick = (projectId: number) => {
    console.log('Navigate to project:', projectId);
    // router.push(`/projects/${projectId}`);
  };

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex: number) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex: number) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent): void => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (): void => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProjectImageIndexes(prev => {
        const newIndexes = { ...prev };
        projects.forEach(project => {
          const currentIdx = newIndexes[project.id] || 0;
          newIndexes[project.id] = (currentIdx + 1) % project.images.length;
        });
        return newIndexes;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [projects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full min-h-[80vh] bg-gray-100">
      
      {/* Header Section */}
      <div ref={sectionRef} className="w-full px-4 py-8 lg:py-12 bg-#f9fafb">
        <div className="max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-10'
          }`}>
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-900 leading-tight tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: '500' }}>
                Our Projects
              </h1>
              
              <div className="flex items-center justify-center space-x-4 w-full max-w-md">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
              </div>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl"
                 style={{ fontFamily: "'Source Serif Pro', serif", fontStyle: 'italic', fontWeight: '400' }}>
                Discover our portfolio of exquisite residential designs that blend functionality with aesthetic elegance
              </p>

              <div className="w-20 h-0.5 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 rounded-full mt-1"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Carousel */}
      <div className="w-full py-8 lg:py-12">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <div 
            className="flex overflow-x-auto pb-8 gap-6 lg:gap-8 scrollbar-hide snap-x snap-mandatory"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          > 
            {projects.map((project, index) => (
              <div 
                key={project.id}
                data-project-index={index}
                className={`group relative flex-shrink-0 w-[80vw] sm:w-[65vw] md:w-[380px] lg:w-[440px] h-[500px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] snap-center cursor-pointer animate-slide-in-stagger bg-[#e5e5e5] ${
                  index % 2 === 0 ? '' : 'lg:mt-8'
                }`}
                style={{
                  animationDelay: `${index * 0.12}s`
                }}
                onClick={() => handleProjectClick(project.id)}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Image Container - Box Frame Style */}
                <div className="relative w-full h-[70%] overflow-hidden">
                  {/* Image Carousel */}
                  <div className="relative w-full h-full">
                    {project.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`${project.title} - Image ${imgIndex + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                          (projectImageIndexes[project.id] || 0) === imgIndex
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-105'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 group-hover:from-black/20 group-hover:to-black/40 transition-all duration-700"></div>
                  
                  {/* Project Number Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 w-10 h-10 text-base font-bold border border-gray-200 shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-500">
                    0{index + 1}
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-md border border-gray-200 group-hover:bg-white group-hover:shadow-lg transition-all duration-500">
                      {project.category}
                    </div>
                  </div>

                  {/* Hover Overlay with Details - Slides from Top */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60 transition-all duration-500 ${
                    hoveredProject === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
                  }`}>
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
                      <h4 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {project.title}
                      </h4>
                      <p className="text-sm text-gray-200 leading-relaxed mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {project.description}
                      </p>
                      <button 
                        onClick={(e) => handleViewDetails(project.id, e)}
                        className="bg-white text-gray-900 px-6 py-2 text-sm font-semibold transition-all duration-300 hover:bg-gray-100 flex items-center gap-2 group/btn"
                      >
                        <span>View Details</span>
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Frame - Title and Category */}
                <div className="relative h-[30%] bg-[#e5e5e5] p-4 flex flex-col justify-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {project.title}
                  </h4>
                  <p className="text-sm text-gray-600 uppercase tracking-wider font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {project.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-stagger {
          0% { opacity: 0; transform: translateX(-50px) scale(0.9); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        
        .animate-slide-in-stagger { animation: slide-in-stagger 0.8s ease-out forwards; opacity: 0; }
        
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}