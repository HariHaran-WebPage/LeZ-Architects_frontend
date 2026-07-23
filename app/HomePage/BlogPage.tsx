'use client';

import React, { ReactNode, useRef, useEffect, useState } from 'react';

const COLORS = {
  primary: {
    gray: {
      light: '#949494',
      medium: '#737373',
      dark: '#525252',
    },
  },
  gradients: {
    grayLight: 'from-[#949494] to-[#737373]',
    grayMedium: 'from-[#737373] to-[#525252]',
    grayDark: 'from-[#525252] to-[#737373]',
  }
} as const;

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
}

const HomeBlogPage: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Future of Sustainable Architecture",
      excerpt: "Exploring innovative materials and design approaches that are shaping the future of eco-friendly architecture and construction practices worldwide.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
      date: "March 15, 2024",
      author: "Sarah Chen",
      category: "Architecture",
      tags: ["sustainability", "green building", "innovation", "eco-design"]
    },
    {
      id: "2",
      title: "Transforming Urban Landscapes",
      excerpt: "How modern urban planning and landscape architecture are creating more livable, sustainable cities for future generations.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
      date: "March 12, 2024",
      author: "Marcus Rodriguez",
      category: "Urban Design",
      tags: ["urban planning", "city design", "public spaces", "sustainability"]
    },
    {
      id: "3",
      title: "The Art of Luxury Interior Design",
      excerpt: "Discover the principles behind creating luxurious, personalized interior spaces that combine comfort with sophisticated aesthetics.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      date: "March 8, 2024",
      author: "Elena Petrova",
      category: "Interior Design",
      tags: ["luxury", "residential", "premium materials", "custom design"]
    },
    {
      id: "4",
      title: "Innovative Commercial Spaces",
      excerpt: "How modern commercial design is evolving to create inspiring work environments that boost productivity and reflect brand identity.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      date: "March 5, 2024",
      author: "James Wilson",
      category: "Commercial Design",
      tags: ["commercial", "office design", "brand identity", "workplace"]
    },
    {
      id: "5",
      title: "Landscape Architecture: Blending Nature and Design",
      excerpt: "The seamless integration of natural elements with architectural design to create harmonious outdoor living spaces.",
      image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
      date: "March 1, 2024",
      author: "Lisa Thompson",
      category: "Landscape",
      tags: ["landscape", "outdoor design", "nature", "gardens"]
    },
    {
      id: "6",
      title: "3D Visualization in Modern Architecture",
      excerpt: "How advanced 3D modeling and visualization technologies are revolutionizing the way we design and present architectural projects.",
      image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&q=80",
      date: "February 26, 2024",
      author: "Alex Kumar",
      category: "Technology",
      tags: ["3D modeling", "visualization", "technology", "design tools"]
    }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll for indicators
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = isMobile ? 320 : 380;
      const gap = 24;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(index);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = isMobile ? 320 : 380;
    const gap = 24;
    const scrollPosition = index * (cardWidth + gap);
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  const handleReadArticleClick = () => {
    console.log('Navigate to /blog');
    // router.push('/blog');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 lg:px-8">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&family=Source+Serif+Pro:ital,wght@1,400&display=swap" rel="stylesheet" />
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-4 sm:space-y-6 md:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight tracking-tight px-2"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: '600' }}
            >
              Design Insights & Inspiration
            </h1>
            
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 w-full max-w-xs sm:max-w-lg mx-auto px-4">
              <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full rotate-45"></div>
              <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-gray-300 to-transparent"></div>
            </div>
          </div>

          <p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6"
            style={{ fontFamily: "'Source Serif Pro', serif", fontStyle: 'italic', fontWeight: '400' }}
          >
            Explore the latest trends, insights, and inspirations in architecture and interior design
          </p>
        </div>

        {/* Blog Posts Horizontal Scroll */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 sm:pb-8 scrollbar-hide snap-x snap-mandatory px-2 sm:px-0"
          >
            {filteredPosts.map((post, index) => (
              <article
                key={post.id}
                className="group relative bg-[#e5e5e5] shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] overflow-hidden min-w-[320px] sm:min-w-[380px] max-w-[320px] sm:max-w-[380px] snap-center flex-shrink-0 cursor-pointer"
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                {/* Image Section - 70% height */}
                <div className="relative h-[350px] sm:h-[400px] overflow-hidden">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                    <div className={`px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r ${COLORS.gradients.grayMedium} text-white text-xs font-bold shadow-xl backdrop-blur-sm border border-white/20`}
                      style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em' }}
                    >
                      {post.category.toUpperCase()}
                    </div>
                  </div>
                  
                  {/* Date Badge */}
                  <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/95 backdrop-blur-md text-gray-800 text-xs font-semibold shadow-lg"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {post.date}
                  </div>

                  {/* Hover Overlay - Slides from Top */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/70 transition-all duration-500 ${
                    hoveredPost === post.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
                  }`}>
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
                      <h3 
                        className="text-xl sm:text-2xl font-bold mb-3"
                        style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.02em' }}
                      >
                        {post.title}
                      </h3>
                      
                      <p 
                        className="text-gray-200 text-sm leading-relaxed mb-4"
                        style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.7' }}
                      >
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-white/20 text-white text-xs font-semibold backdrop-blur-sm"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <button 
                        onClick={handleReadArticleClick}
                        className="bg-white text-gray-900 px-6 py-2.5 text-sm font-bold transition-all duration-300 hover:bg-gray-100 flex items-center gap-2"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        <span>Read Article</span>
                        <svg 
                          className="w-4 h-4"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Frame - Title and Author - 30% height */}
                <div className="relative h-[150px] sm:h-[170px] bg-[#e5e5e5] p-5 sm:p-6 flex flex-col justify-center">
                  {/* Author Info */}
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white text-sm sm:text-base font-bold shadow-md" 
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {post.author}
                      </p>
                      <p className="text-xs text-gray-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Author
                      </p>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-lg sm:text-xl font-bold text-gray-900 leading-tight line-clamp-2"
                    style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.02em' }}
                  >
                    {post.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
          
          {/* Scroll Indicators */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
            {filteredPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 transition-all duration-300 ${
                  currentIndex === index ? 'bg-gray-700 w-6 sm:w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBlogPage;