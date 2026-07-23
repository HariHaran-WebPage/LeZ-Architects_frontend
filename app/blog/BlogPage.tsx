'use client';

import React, { ReactNode, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, ArrowRight, Calendar, User, BookOpen, Mail, Tag, Clock, Eye } from 'lucide-react';

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

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  views?: number;
}

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

const imageVariants: Variants = {
  hidden: { scale: 1.1 },
  visible: { scale: 1 },
  hover: { scale: 1.15 }
};

// Animated component wrapper
interface AnimatedSectionProps {
  children: ReactNode;
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

const BlogPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Future of Sustainable Architecture",
      excerpt: "Exploring innovative materials and design approaches that are shaping the future of eco-friendly architecture and construction practices worldwide.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
      date: "March 15, 2024",
      author: "Sarah Chen",
      category: "Architecture",
      tags: ["Sustainability", "Green Building", "Innovation", "Eco-Design"],
      readTime: "5 min read",
      views: 1245
    },
    {
      id: "2",
      title: "Transforming Urban Landscapes",
      excerpt: "How modern urban planning and landscape architecture are creating more livable, sustainable cities for future generations.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
      date: "March 12, 2024",
      author: "Marcus Rodriguez",
      category: "Urban Design",
      tags: ["Urban Planning", "City Design", "Public Spaces", "Sustainability"],
      readTime: "7 min read",
      views: 987
    },
    {
      id: "3",
      title: "The Art of Luxury Interior Design",
      excerpt: "Discover the principles behind creating luxurious, personalized interior spaces that combine comfort with sophisticated aesthetics.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      date: "March 8, 2024",
      author: "Elena Petrova",
      category: "Interior Design",
      tags: ["Luxury", "Residential", "Premium Materials", "Custom Design"],
      readTime: "6 min read",
      views: 1567
    },
    {
      id: "4",
      title: "Innovative Commercial Spaces",
      excerpt: "How modern commercial design is evolving to create inspiring work environments that boost productivity and reflect brand identity.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      date: "March 5, 2024",
      author: "James Wilson",
      category: "Commercial Design",
      tags: ["Commercial", "Office Design", "Brand Identity", "Workplace"],
      readTime: "8 min read",
      views: 845
    },
    {
      id: "5",
      title: "Landscape Architecture: Blending Nature and Design",
      excerpt: "The seamless integration of natural elements with architectural design to create harmonious outdoor living spaces.",
      image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
      date: "March 1, 2024",
      author: "Lisa Thompson",
      category: "Landscape",
      tags: ["Landscape", "Outdoor Design", "Nature", "Gardens"],
      readTime: "5 min read",
      views: 1123
    },
    {
      id: "6",
      title: "3D Visualization in Modern Architecture",
      excerpt: "How advanced 3D modeling and visualization technologies are revolutionizing the way we design and present architectural projects.",
      image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&q=80",
      date: "February 26, 2024",
      author: "Alex Kumar",
      category: "Technology",
      tags: ["3D Modeling", "Visualization", "Technology", "Design Tools"],
      readTime: "6 min read",
      views: 1321
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    setEmail('');
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
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-[fadeInUp_1s_ease-out] drop-shadow-2xl relative z-10" />
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
            Design Insights & Articles
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
                <span className="relative z-10 transition-all duration-500 group-hover:text-gray-200">Latest</span>
                <div className={`absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r ${COLORS.gradients.grayLight} transform origin-left animate-[expandWidth_1.8s_ease-out] shadow-lg shadow-gray-400/50`}></div>
                <div className="absolute inset-0 blur-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </span>
              
              <span className="block md:inline-block mx-2 sm:mx-3 md:mx-4">
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300 font-normal italic animate-[shimmer_4s_ease-in-out_infinite] text-4xl sm:text-5xl md:text-6xl" style={{backgroundSize: '200% auto'}}>
                  from
                </span>
              </span>
              
              <span className="inline-block relative group mt-2 md:mt-0">
                <span className="relative z-10 transition-all duration-500 group-hover:text-gray-200">Our Blog</span>
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
            Discover trends, insights, and inspiration from the world of architecture and interior design
          </p>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="mb-12 sm:mb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className={`w-8 h-0.5 bg-gradient-to-r ${COLORS.gradients.grayMedium}`}></div>
              <BookOpen className="w-6 h-6 text-gray-600" />
              <div className={`w-8 h-0.5 bg-gradient-to-l ${COLORS.gradients.grayMedium}`}></div>
            </div>
            
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontWeight: '400',
              letterSpacing: '0.02em',
              fontSize: 'clamp(2rem, 4vw, 3.75rem)'
            }} className="mb-6 text-gray-900">
              Featured Articles
            </h2>
            
            <p style={{ 
              fontFamily: "'Source Serif Pro', Georgia, serif",
              fontWeight: '300',
              lineHeight: '1.8',
              fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
            }} className="text-gray-700 max-w-2xl mx-auto mb-8">
              Explore our collection of thoughtfully curated articles on architecture, design, and innovation
            </p>
          </div>
        </AnimatedSection>

        {/* Blog Grid */}
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200"
              >
                {/* Image Container */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    variants={imageVariants}
                    transition={{ duration: 0.8 }}
                  >
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r ${COLORS.gradients.grayCharcoal} text-white text-xs font-bold shadow-lg`}>
                    {post.category}
                  </div>
                  
                  {/* Views Count */}
                  {post.views && (
                    <div className="absolute top-4 right-4 px-2.5 py-1 bg-white/90 backdrop-blur-sm flex items-center gap-1.5 border border-gray-300">
                      <Eye className="w-3.5 h-3.5 text-gray-700" />
                      <span className="text-xs font-semibold text-gray-800">{post.views.toLocaleString()}</span>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span className="font-medium">{post.author}</span>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 style={{ 
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: '400',
                    fontSize: '1.5rem'
                  }} className="text-gray-900 leading-tight group-hover:text-gray-700 transition-colors duration-300 line-clamp-2 border-b pb-3 border-gray-100">
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p style={{ 
                    fontFamily: "'Source Serif Pro', Georgia, serif",
                    fontWeight: '300',
                    lineHeight: '1.7',
                    fontSize: 'clamp(0.875rem, 1vw, 1rem)'
                  }} className="text-gray-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 bg-gradient-to-r ${COLORS.gradients.grayMedium} text-white text-xs font-medium flex items-center gap-1.5`}
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium border border-gray-300">
                        +{post.tags.length - 2} more
                      </span>
                    )}
                  </div>
                  
                  {/* Read More Button */}
                  <motion.div 
                    className="pt-4 border-t border-gray-100"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold bg-gradient-to-r ${COLORS.gradients.grayDark} bg-clip-text text-transparent`}>
                        Read Article
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-600 transition-transform group-hover:translate-x-2" />
                    </div>
                  </motion.div>
                </div>
                
                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${COLORS.gradients.grayCharcoal} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </motion.article>
            ))}
          </div>
        </AnimatedSection>
        
        {/* Load More Button */}
        <AnimatedSection className="text-center mt-12 sm:mt-16">
          <motion.button
            className={`px-8 py-3.5 sm:px-10 sm:py-4 bg-gradient-to-r ${COLORS.gradients.grayCharcoal} text-white font-bold hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto border border-gray-700`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ 
              fontFamily: "'Poppins', sans-serif",
              fontWeight: '500',
              letterSpacing: '0.05em',
              fontSize: '0.875rem'
            }}
          >
            <span>Load More Articles</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </AnimatedSection>
      </section>

      {/* Newsletter Section */}
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
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                <div className={`w-6 h-0.5 bg-gradient-to-l ${COLORS.gradients.grayLight}`}></div>
              </div>
              
              <h2 style={{ 
                fontFamily: "'Playfair Display', serif",
                fontWeight: '400',
                letterSpacing: '0.02em',
                fontSize: 'clamp(2rem, 4vw, 3.75rem)'
              }} className="text-white mb-4">
                Stay Updated
              </h2>
              
              <p style={{ 
                fontFamily: "'Source Serif Pro', Georgia, serif",
                fontWeight: '300',
                lineHeight: '1.8',
                fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
              }} className="text-gray-300 mb-8 leading-relaxed">
                Subscribe to our newsletter and receive weekly insights on architecture, interior design, and innovative spaces
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className={`px-8 py-4 bg-gradient-to-r ${COLORS.gradients.grayCharcoal} text-white font-bold hover:shadow-xl transition-all shadow-lg flex items-center justify-center gap-2 border border-gray-700`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    fontSize: '0.875rem'
                  }}
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </form>
              
              <p className="text-gray-400 text-sm mt-6">
                Join 5,000+ architects and designers already subscribed
              </p>
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
    </div>
  );
};

export default BlogPage;