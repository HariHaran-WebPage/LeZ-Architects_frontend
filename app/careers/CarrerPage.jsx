"use client"

import React, { useEffect, useRef } from 'react';
import { Building2, Users, Briefcase, Award, HeartHandshake, ArrowRight, Sparkles, CheckCircle2, Target, Zap, Globe, Mail, Phone } from 'lucide-react';

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
};

const CareerPage = () => {
  const contentRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in-view');
          }
        });
      },
      { threshold: 0.15 }
    );
    
    contentRefs.current.forEach((ref) => { 
      if (ref) observer.observe(ref); 
    });
    
    return () => observer.disconnect();
  }, []);

  const addToRefs = (el, idx) => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current[idx] = el;
    }
  };

  const benefits = [
    {
      icon: <Zap className="w-8 h-8" style={{ color: COLORS.primary.gray.rich }} />,
      title: "Professional Growth",
      description: "Continuous learning opportunities and career advancement paths"
    },
    {
      icon: <HeartHandshake className="w-8 h-8" style={{ color: COLORS.primary.gray.rich }} />,
      title: "Collaborative Culture",
      description: "Work in a supportive, team-oriented environment"
    },
    {
      icon: <Target className="w-8 h-8" style={{ color: COLORS.primary.gray.rich }} />,
      title: "Challenging Projects",
      description: "Work on diverse and innovative architectural projects"
    },
    {
      icon: <Globe className="w-8 h-8" style={{ color: COLORS.primary.gray.rich }} />,
      title: "Work-Life Balance",
      description: "Flexible working arrangements and supportive policies"
    },
    {
      icon: <Award className="w-8 h-8" style={{ color: COLORS.primary.gray.rich }} />,
      title: "Recognition & Rewards",
      description: "Performance-based recognition and competitive compensation"
    },
    {
      icon: <Sparkles className="w-8 h-8" style={{ color: COLORS.primary.gray.rich }} />,
      title: "Creative Freedom",
      description: "Opportunity to express and implement your creative ideas"
    }
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
                <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-[fadeInUp_1s_ease-out] drop-shadow-2xl relative z-10" />
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
            Join Our Team
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
                <span className="relative z-10 transition-all duration-500 group-hover:text-gray-200">Career</span>
                <div className={`absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r ${COLORS.gradients.grayLight} transform origin-left animate-[expandWidth_1.8s_ease-out] shadow-lg shadow-gray-400/50`}></div>
                <div className="absolute inset-0 blur-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </span>
              
              <span className="block md:inline-block mx-2 sm:mx-3 md:mx-4">
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300 font-normal italic animate-[shimmer_4s_ease-in-out_infinite] text-4xl sm:text-5xl md:text-6xl" style={{backgroundSize: '200% auto'}}>
                  at
                </span>
              </span>
              
              <span className="inline-block relative group mt-2 md:mt-0">
                <span className="relative z-10 transition-all duration-500 group-hover:text-gray-200">LeZ</span>
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
            Build Your Future with Our Creative Family
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className={`w-16 h-0.5 bg-gradient-to-r ${COLORS.gradients.grayMedium}`}></div>
            <HeartHandshake className="w-6 h-6 text-gray-600" />
            <div className={`w-16 h-0.5 bg-gradient-to-l ${COLORS.gradients.grayMedium}`}></div>
          </div>
          
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontWeight: '400',
            letterSpacing: '0.02em',
            fontSize: 'clamp(2rem, 4vw, 3.75rem)'
          }} className="text-gray-900 mb-8">
            Build Your Future With Us
          </h2>
          
          <p style={{ 
            fontFamily: "'Source Serif Pro', Georgia, serif",
            fontWeight: '300',
            lineHeight: '1.8',
            fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
          }} className="text-gray-700 max-w-4xl mx-auto mb-8">
            Join a team that values creativity, innovation, and excellence
          </p>
        </div>

        <div className="space-y-8">
          {/* Our Philosophy */}
          <div ref={(el) => addToRefs(el, 0)} className="content-item">
            <div className="group relative bg-white p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200 overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-start gap-6 mb-6">
                  <div className={`w-16 h-16 flex items-center justify-center bg-gradient-to-br ${COLORS.gradients.grayLight}`}>
                    <Building2 className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 style={{ 
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: '400',
                    fontSize: '1.875rem'
                  }} className="text-gray-900 pt-2">
                    Our Philosophy
                  </h3>
                </div>
                
                <p style={{ 
                  fontFamily: "'Source Serif Pro', Georgia, serif",
                  fontWeight: '300',
                  lineHeight: '1.8',
                  fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
                }} className="text-gray-700 leading-relaxed">
                  At LeZ Architects and Interiors, we believe that the right environment and opportunities empower talented individuals to achieve exceptional results. Our team members are encouraged to learn, grow, and perform to their fullest potential while contributing their ideas in a collaborative, safe, and inspiring workplace. We value creativity, teamwork, and a commitment to excellence, always delivered in a respectful and client-focused manner.
                </p>
              </div>
            </div>
          </div>

          {/* Our Greatest Asset */}
          <div ref={(el) => addToRefs(el, 1)} className="content-item">
            <div className="group relative bg-white p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200 overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-start gap-6 mb-6">
                  <div className={`w-16 h-16 flex items-center justify-center bg-gradient-to-br ${COLORS.gradients.grayLight}`}>
                    <Users className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 style={{ 
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: '400',
                    fontSize: '1.875rem'
                  }} className="text-gray-900 pt-2">
                    Our Greatest Asset
                  </h3>
                </div>
                
                <p style={{ 
                  fontFamily: "'Source Serif Pro', Georgia, serif",
                  fontWeight: '300',
                  lineHeight: '1.8',
                  fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
                }} className="text-gray-700 leading-relaxed mb-8">
                  Our continued success is driven by our greatest asset – our people. That's why we are always seeking passionate and innovative professionals who are ready to take on challenges, explore new ideas, and thrive in a culture that fosters professional development.
                </p>
                
                {/* Quote Box */}
                <div className={`bg-gradient-to-br ${COLORS.gradients.grayCharcoal} p-6 md:p-8 border border-gray-700 shadow-lg`}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                    <Sparkles className="w-5 h-5 text-gray-300" />
                    <div className="w-8 h-px bg-gradient-to-l from-transparent via-gray-400 to-transparent"></div>
                  </div>
                  
                  <p style={{ 
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: '300',
                    fontSize: '1.125rem',
                    lineHeight: '1.6'
                  }} className="text-white italic text-center">
                    "If you're ready to build a rewarding career with us, send your CV to info@lezarchitects.in. We look forward to welcoming you to our creative family."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 max-w-7xl mx-auto bg-gradient-to-b from-[#F1F3F5] to-[#E9ECEF]">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className={`w-16 h-0.5 bg-gradient-to-r ${COLORS.gradients.grayMedium}`}></div>
            <Award className="w-6 h-6 text-gray-600" />
            <div className={`w-16 h-0.5 bg-gradient-to-l ${COLORS.gradients.grayMedium}`}></div>
          </div>
          
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontWeight: '400',
            letterSpacing: '0.02em',
            fontSize: 'clamp(2rem, 4vw, 3.75rem)'
          }} className="text-gray-900 mb-8">
            Why Work With Us
          </h2>
          
          <p style={{ 
            fontFamily: "'Source Serif Pro', Georgia, serif",
            fontWeight: '300',
            lineHeight: '1.8',
            fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
          }} className="text-gray-700 max-w-4xl mx-auto mb-8">
            We offer more than just a job – we offer a career with purpose and growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} ref={(el) => addToRefs(el, 2 + idx)} className="content-item">
              <div className="group relative bg-white p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 h-full">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ 
                  background: `linear-gradient(135deg, ${COLORS.primary.gray.light}, ${COLORS.primary.gray.medium})` 
                }}>
                  {benefit.icon}
                </div>
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: '400',
                  fontSize: '1.5rem'
                }} className="text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p style={{ 
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '300',
                  lineHeight: '1.7',
                  fontSize: 'clamp(0.875rem, 1vw, 1rem)'
                }} className="text-gray-700 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className={`w-16 h-0.5 bg-gradient-to-r ${COLORS.gradients.grayMedium}`}></div>
            <CheckCircle2 className="w-6 h-6 text-gray-600" />
            <div className={`w-16 h-0.5 bg-gradient-to-l ${COLORS.gradients.grayMedium}`}></div>
          </div>
          
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontWeight: '400',
            letterSpacing: '0.02em',
            fontSize: 'clamp(2rem, 4vw, 3.75rem)'
          }} className="text-gray-900 mb-8">
            How to Apply
          </h2>
          
          <p style={{ 
            fontFamily: "'Source Serif Pro', Georgia, serif",
            fontWeight: '300',
            lineHeight: '1.8',
            fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
          }} className="text-gray-700 max-w-4xl mx-auto mb-8">
            Simple steps to join our creative team
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            { step: "01", title: "Prepare Your CV", description: "Update your resume with relevant experience and skills" },
            { step: "02", title: "Email Application", description: "Send your CV to info@lezarchitects.in" },
            { step: "03", title: "Interview Process", description: "We'll review and schedule interviews with qualified candidates" },
            { step: "04", title: "Join Our Team", description: "Welcome to the LeZ Architects family!" }
          ].map((item, idx) => (
            <div key={idx} className="group text-center relative">
              <div className="relative z-10">
                <div className={`w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-all duration-300 ${COLORS.gradients.grayCharcoal}`}>
                  <span style={{ 
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: '300',
                    fontSize: '1.5rem'
                  }} className="text-black">{item.step}</span>
                </div>
                
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: '400',
                  fontSize: '1.25rem'
                }} className="text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p style={{ 
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '300',
                  lineHeight: '1.7',
                  fontSize: 'clamp(0.875rem, 1vw, 1rem)'
                }} className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.1) 55%, transparent 55%)`, 
            backgroundSize: '50px 50px' 
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className={`w-8 h-0.5 bg-gradient-to-r ${COLORS.gradients.grayLight}`}></div>
            <Users className="w-8 h-8 text-white" />
            <div className={`w-8 h-0.5 bg-gradient-to-l ${COLORS.gradients.grayLight}`}></div>
          </div>
          
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontWeight: '400',
            letterSpacing: '0.02em',
            fontSize: 'clamp(2rem, 4vw, 3.75rem)'
          }} className="text-white mb-4">
            Ready to Join Our Team?
          </h2>
          
          <p style={{ 
            fontFamily: "'Source Serif Pro', Georgia, serif",
            fontWeight: '300',
            lineHeight: '1.8',
            fontSize: 'clamp(1rem, 1.1vw, 1.25rem)'
          }} className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Send your resume to info@lezarchitects.in and take the first step towards an exciting career.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:info@lezarchitects.in" 
              className={`group px-8 py-4 bg-gradient-to-r ${COLORS.gradients.grayCharcoal} text-white flex items-center gap-2 hover:from-gray-700 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl`}
              style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '500',
                letterSpacing: '0.05em',
                fontSize: '0.875rem'
              }}
            >
              <Mail className="w-5 h-5" />
              Email Your CV
            </a>
            
            <a 
              href="tel:+912266666666" 
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
              style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '500',
                letterSpacing: '0.05em',
                fontSize: '0.875rem'
              }}
            >
              <Phone className="w-5 h-5 inline-block mr-2" />
              Contact HR
            </a>
          </div>
          
          <p className="text-gray-400 text-sm mt-8">
            LeZ Architects and Interiors • info@lezarchitects.in
          </p>
        </div>
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
        
        .content-item {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .content-item.animate-in-view {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default CareerPage;