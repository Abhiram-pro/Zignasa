import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import '../assets/main.css';
import { Navbar } from './ui/navbar';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Briefcase, BarChart3, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const Home: React.FC = () => {
  const [videoRotation, setVideoRotation] = useState(30);

  useEffect(() => {
    // Scroll handler for video straightening effect
    const handleScroll = () => {
      const videoSection = document.getElementById('about');
      if (videoSection) {
        const rect = videoSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress based on section position
        // When section is below viewport: rotation = 30deg (full lean)
        // When section reaches center: rotation = 0deg (straight)
        // When section goes above viewport: rotation = 30deg (lean again)
        
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
        const maxDistance = windowHeight;
        
        // Calculate rotation: 0 at center, 30 at edges
        const scrollProgress = Math.min(1, distanceFromCenter / maxDistance);
        const newRotation = 30 * scrollProgress;
        
        setVideoRotation(newRotation);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Wait for DOM to be ready
    const initializeApp = () => {
      // Hide preloader immediately
      const preloader = document.querySelector('#preloader') as HTMLElement;
      if (preloader) {
        preloader.style.display = 'none';
      }

      // Also hide preloader after a short delay as backup
      setTimeout(() => {
        const preloaderBackup = document.querySelector('#preloader') as HTMLElement;
        if (preloaderBackup) {
          preloaderBackup.style.display = 'none';
        }
      }, 1000);

      // Initialize AOS (Animate On Scroll)
      if (typeof window.AOS !== 'undefined') {
        window.AOS.init({
          duration: 1000,
          once: true,
        });
      }

      // Initialize EmailJS
      emailjs.init("INIJKyGM6q2Y3kSF4");

      // Initialize Swiper
      const initSwiper = () => {
        const swiperElements = document.querySelectorAll('.init-swiper');
        swiperElements.forEach((element) => {
          const configScript = element.querySelector('.swiper-config');
          if (configScript) {
            const config = JSON.parse(configScript.textContent || '{}');
            // Swiper is loaded via CDN in the HTML file
            if (typeof window.Swiper !== 'undefined') {
              new window.Swiper(element, config);
            }
          }
        });
      };

      // Initialize GLightbox (will be handled by the script in index.html)
      // GLightbox is loaded via CDN in the HTML file

      initSwiper();

    // Mobile nav toggle functionality
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggleBtn) {
      const mobileNavToggle = () => {
        document.querySelector('body')?.classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
      };
      mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
    }

    // Hide mobile nav on same-page/hash links
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
          if (mobileNavToggleBtn) {
            mobileNavToggleBtn.classList.toggle('bi-list');
            mobileNavToggleBtn.classList.toggle('bi-x');
          }
          document.querySelector('body')?.classList.remove('mobile-nav-active');
        }
      });
    });

    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const toggle = item.querySelector('.faq-toggle') as HTMLElement;
      const content = item.querySelector('.faq-content');
      
      if (toggle && content) {
        toggle.addEventListener('click', () => {
          const isActive = item.classList.contains('faq-active');
          
          // Close all FAQ items
          faqItems.forEach(otherItem => {
            otherItem.classList.remove('faq-active');
            const otherToggle = otherItem.querySelector('.faq-toggle') as HTMLElement;
            if (otherToggle) {
              otherToggle.style.transform = 'rotate(0deg)';
            }
          });
          
          // Open clicked item if it wasn't active
          if (!isActive) {
            item.classList.add('faq-active');
            toggle.style.transform = 'rotate(90deg)';
          }
        });
      }
    });

    // Scroll functionality
    const toggleScrolled = () => {
      const selectBody = document.querySelector('body');
      const selectHeader = document.querySelector('#header');
      
      if (!selectHeader) return;
      
      if (!selectHeader.classList.contains('scroll-up-sticky') && 
          !selectHeader.classList.contains('sticky-top') && 
          !selectHeader.classList.contains('fixed-top')) return;
      
      if (window.scrollY > 100) {
        selectBody?.classList.add('scrolled');
      } else {
        selectBody?.classList.remove('scrolled');
      }
    };

      window.addEventListener('scroll', toggleScrolled);
      window.addEventListener('load', toggleScrolled);
    };

    // Initialize the app
    initializeApp();

    return () => {
      // Cleanup will be handled by the browser when component unmounts
    };
  }, []);

  const sendEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    const params = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    emailjs.send("service_hyley4e", "template_lktf7ef", params)
      .then(function(response) {
        alert("Email sent successfully!");
        form.reset();
      })
      .catch(function(error) {
        alert("There was an error sending your message. Please try again.");
        console.error("Failed to send email:", error);
      });
  };

  // Enhanced 3D logo animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.min(scrolled / windowHeight, 1);
      
      const bgElement = document.querySelector('#hero-bg') as HTMLElement;
      if (bgElement) {
        // 3D parallax movement with multiple axes
        const translateY = -scrolled * 0.4;
        const translateX = Math.sin(scrollProgress * Math.PI) * 20;
        
        // Dynamic opacity with breathing effect
        const baseOpacity = 0.25 + (scrollProgress * 0.3);
        const breathingEffect = Math.sin(Date.now() * 0.002) * 0.05;
        const opacity = baseOpacity + breathingEffect;
        
        // 3D scaling and rotation effects
        const scale = 1 + (scrollProgress * 0.15);
        const rotateX = scrollProgress * 15;
        const rotateY = Math.sin(scrollProgress * Math.PI * 2) * 10;
        const rotateZ = scrollProgress * 5;
        
        // Apply 3D transforms
        bgElement.style.transform = `
          translateY(${translateY}px) 
          translateX(${translateX}px) 
          scale(${scale}) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          rotateZ(${rotateZ}deg)
          translateZ(0)
        `;
        bgElement.style.opacity = Math.max(0.2, Math.min(0.6, opacity)).toString();
      }
    };

    // Add breathing animation
    const breathingInterval = setInterval(() => {
      if (window.pageYOffset < window.innerHeight) {
        handleScroll();
      }
    }, 50);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(breathingInterval);
    };
  }, []);

  return (
    <div className="index-page bg-black min-h-screen">
      <Navbar />

      <main className="main bg-black">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden" style={{ perspective: '1000px' }}>
          {/* 3D Animated Logo Background */}
          <div 
            id="hero-bg"
            className="absolute inset-0 z-0 opacity-25"
            style={{
              backgroundImage: 'url(/assets/img/logo.png)',
              backgroundSize: '55%',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              transform: 'translateZ(0)',
              willChange: 'transform, opacity',
              filter: 'brightness(1.1) contrast(1.5) drop-shadow(0 0 50px rgba(0, 255, 255, 0.4))',
              transformStyle: 'preserve-3d'
            }}
          ></div>
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 z-5 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="300">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 bg-clip-text text-transparent">
              ZIGNASA 2K25
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed bg-gradient-to-r from-gray-300 via-cyan-200 to-teal-200 bg-clip-text text-transparent">
              A 24HR NATIONAL-LEVEL HACKATHON WITH BOOTCAMP
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Calendar className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                November <span style={{color: '#ffffff', fontWeight: 'bold', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>28th & 29th</span>
              </h2>
            </div>
            <Button 
              size="lg" 
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link to="/domains">Register Now</Link>
            </Button>
          </div>
        </section>

        {/* Featured Section */}
        <section id="featured-gallery" className="py-12 md:py-16 bg-black">
          <div className="container mx-auto px-4 md:px-6 h-auto overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 group hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 shadow-2xl" data-aos="fade-up" data-aos-delay="100">
                <div className="pb-4 md:pb-6">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="p-3 md:p-4 bg-cyan-500/20 backdrop-blur-sm rounded-xl md:rounded-2xl group-hover:bg-cyan-500/30 transition-colors duration-300">
                      <Briefcase className="w-6 h-6 md:w-7 md:h-7 text-cyan-400" />
                    </div>
                    <h3 className="text-white text-xl md:text-2xl font-bold">
                      24Hr National Level Hackathon
                    </h3>
                  </div>
                </div>
                <div className="px-1 md:px-2">
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                   Participants from any college or state are welcome to join this hackathon.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 group hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 shadow-2xl" data-aos="fade-up" data-aos-delay="300">
                <div className="pb-4 md:pb-6">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="p-3 md:p-4 bg-cyan-500/20 backdrop-blur-sm rounded-xl md:rounded-2xl group-hover:bg-cyan-500/30 transition-colors duration-300">
                      <BarChart3 className="w-6 h-6 md:w-7 md:h-7 text-cyan-400" />
                    </div>
                    <h3 className="text-white text-xl md:text-2xl font-bold">
                      5-Day Online Bootcamp
                    </h3>
                  </div>
                </div>
                <div className="px-1 md:px-2">
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    Participants will be introduced to the fundamental concepts and basics of each domain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section - Video */}
        <section id="about" className="relative w-full h-screen bg-black border-0 overflow-hidden flex items-center justify-center">
          <div 
            className="framer-w5j4lp-container relative w-[90%] h-[80%] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-white/5"
            data-aos="fade-up"
            data-aos-duration="1500"
            style={{ 
              transform: `perspective(1500px) rotateX(${videoRotation}deg) scale(0.95)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <video 
              src="https://dj2sofb25vegx.cloudfront.net/feature_modal/LandingPageVideo+(1).mp4" 
              loop 
              autoPlay
              muted
              playsInline
              className="w-full h-full"
              style={{ 
                cursor: 'auto', 
                width: '100%', 
                height: '100%', 
                borderRadius: '24px', 
                display: 'block', 
                objectFit: 'cover', 
                backgroundColor: 'rgba(0, 0, 0, 0)', 
                objectPosition: '50% 50%' 
              }}
            />
          </div>
        </section>

        {/* Clients Section */}
        <section id="clients" className="py-12 md:py-16 bg-black overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 h-auto">
            <div className="text-center mb-8 md:mb-12" data-aos="fade-up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                Our Partners
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-300">
                Trusted organizations supporting ZIGNASA 2K25
              </p>
            </div>
            
            <div className="relative w-full overflow-hidden h-auto">
              <style>{`
                @keyframes scroll-left {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(calc(-100% / 3)); }
                }
                .animate-scroll-left {
                  animation: scroll-left 20s linear infinite;
                }
                .animate-scroll-left:hover {
                  animation-play-state: paused;
                }
              `}</style>
              
              {/* Fade overlays on corners */}
              <div className="absolute left-0 top-0 h-full w-24 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 h-full w-24 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex animate-scroll-left py-4">
                {/* First set of logos */}
                <div className="flex gap-4 md:gap-6 lg:gap-8 min-w-max pr-4 md:pr-6 lg:pr-8">
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 w-36 md:w-44 lg:w-48 h-24 md:h-28 lg:h-32 flex items-center justify-center shadow-2xl">
                    <img src="/assets/img/clients/mlrit.webp" className="w-full h-12 md:h-14 lg:h-16 object-contain filter brightness-90" alt="MLR Institute of Technology" />
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 w-36 md:w-44 lg:w-48 h-24 md:h-28 lg:h-32 flex items-center justify-center shadow-2xl">
                    <img src="/assets/img/clients/csi.png" className="w-full h-12 md:h-14 lg:h-16 object-contain filter brightness-90" alt="Computer Society of India" />
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 w-36 md:w-44 lg:w-48 h-24 md:h-28 lg:h-32 flex items-center justify-center shadow-2xl">
                    <img src="/assets/img/clients/iic.png" className="w-full h-12 md:h-14 lg:h-16 object-contain filter brightness-90" alt="Institution's Innovation Council" />
                  </div>
                </div>
                
                {/* Second set for seamless loop */}
                <div className="flex gap-4 md:gap-6 lg:gap-8 min-w-max pr-4 md:pr-6 lg:pr-8">
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 w-36 md:w-44 lg:w-48 h-24 md:h-28 lg:h-32 flex items-center justify-center shadow-2xl">
                    <img src="/assets/img/clients/mlrit.webp" className="w-full h-12 md:h-14 lg:h-16 object-contain filter brightness-90" alt="MLR Institute of Technology" />
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 w-36 md:w-44 lg:w-48 h-24 md:h-28 lg:h-32 flex items-center justify-center shadow-2xl">
                    <img src="/assets/img/clients/csi.png" className="w-full h-12 md:h-14 lg:h-16 object-contain filter brightness-90" alt="Computer Society of India" />
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 w-36 md:w-44 lg:w-48 h-24 md:h-28 lg:h-32 flex items-center justify-center shadow-2xl">
                    <img src="/assets/img/clients/iic.png" className="w-full h-12 md:h-14 lg:h-16 object-contain filter brightness-90" alt="Institution's Innovation Council" />
                  </div>
                </div>
                
                {/* Third set for seamless loop */}
                <div className="flex gap-4 md:gap-6 lg:gap-8 min-w-max pr-4 md:pr-6 lg:pr-8">
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 w-36 md:w-44 lg:w-48 h-24 md:h-28 lg:h-32 flex items-center justify-center shadow-2xl">
                    <img src="/assets/img/clients/mlrit.webp" className="w-full h-12 md:h-14 lg:h-16 object-contain filter brightness-90" alt="MLR Institute of Technology" />
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 w-36 md:w-44 lg:w-48 h-24 md:h-28 lg:h-32 flex items-center justify-center shadow-2xl">
                    <img src="/assets/img/clients/csi.png" className="w-full h-12 md:h-14 lg:h-16 object-contain filter brightness-90" alt="Computer Society of India" />
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 w-36 md:w-44 lg:w-48 h-24 md:h-28 lg:h-32 flex items-center justify-center shadow-2xl">
                    <img src="/assets/img/clients/iic.png" className="w-full h-12 md:h-14 lg:h-16 object-contain filter brightness-90" alt="Institution's Innovation Council" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="pt-12 pb-6 md:pt-16 md:pb-12 bg-black relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-black to-black pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-6 md:mb-10" data-aos="fade-up">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-5 tracking-tight">
                Gallery
              </h2>
              <p className="text-base md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-3 md:mb-5 px-4">
                Capturing moments of innovation, creativity, and excellence from our journey
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-cyan-400"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                <div className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-cyan-400"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-0">
              <div className="group cursor-pointer" data-aos="fade-up" data-aos-delay="100">
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src="/assets/img/pic4.jpg" alt="Innovation Workshop" loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating Action Button */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>

                    {/* Bottom Info Panel */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium text-sm">Innovation Workshop</h4>
                            <p className="text-white/70 text-xs">Tech Excellence</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-cyan-400/20 px-2 py-1 text-xs font-medium text-cyan-400 border border-cyan-400/30">
                            2024
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group cursor-pointer" data-aos="fade-up" data-aos-delay="200">
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src="/assets/img/pic1.jpg" alt="Team Collaboration" loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium text-sm">Team Collaboration</h4>
                            <p className="text-white/70 text-xs">Project Development</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-cyan-400/20 px-2 py-1 text-xs font-medium text-cyan-400 border border-cyan-400/30">
                            2024
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group cursor-pointer" data-aos="fade-up" data-aos-delay="300">
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src="/assets/img/pic8.jpg" alt="Creative Session" loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium text-sm">Creative Session</h4>
                            <p className="text-white/70 text-xs">Design Thinking</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-cyan-400/20 px-2 py-1 text-xs font-medium text-cyan-400 border border-cyan-400/30">
                            2024
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group cursor-pointer" data-aos="fade-up" data-aos-delay="400">
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src="/assets/img/pic2.jpg" alt="Tech Showcase" loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium text-sm">Tech Showcase</h4>
                            <p className="text-white/70 text-xs">Product Demo</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-cyan-400/20 px-2 py-1 text-xs font-medium text-cyan-400 border border-cyan-400/30">
                            2024
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group cursor-pointer" data-aos="fade-up" data-aos-delay="500">
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src="/assets/img/pic3.jpg" alt="Learning Hub" loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium text-sm">Learning Hub</h4>
                            <p className="text-white/70 text-xs">Knowledge Sharing</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-cyan-400/20 px-2 py-1 text-xs font-medium text-cyan-400 border border-cyan-400/30">
                            2024
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group cursor-pointer" data-aos="fade-up" data-aos-delay="600">
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src="/assets/img/pic6.jpg" alt="Event Highlights" loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium text-sm">Event Highlights</h4>
                            <p className="text-white/70 text-xs">Community Gathering</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-cyan-400/20 px-2 py-1 text-xs font-medium text-cyan-400 border border-cyan-400/30">
                            2024
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group cursor-pointer" data-aos="fade-up" data-aos-delay="700">
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src="/assets/img/pic5.jpg" alt="Achievement Moments" loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium text-sm">Achievement Moments</h4>
                            <p className="text-white/70 text-xs">Success Stories</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-cyan-400/20 px-2 py-1 text-xs font-medium text-cyan-400 border border-cyan-400/30">
                            2024
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group cursor-pointer" data-aos="fade-up" data-aos-delay="800">
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src="/assets/img/pic7.jpg" alt="Future Vision" loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium text-sm">Future Vision</h4>
                            <p className="text-white/70 text-xs">Next Generation</p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-cyan-400/20 px-2 py-1 text-xs font-medium text-cyan-400 border border-cyan-400/30">
                            2024
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* FAQ Section */}
        <section id="faq" className="py-28 bg-black border-0">
          <div className="container mx-auto px-6 bg-black border-0">
            <div className="text-center mb-20 bg-black border-0" data-aos="fade-up">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="max-w-6xl mx-auto bg-black border-0" data-aos="fade-up" data-aos-delay="100">
              <Accordion type="single" collapsible className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-black border-0">
                <AccordionItem value="item-1" className="group relative w-full min-h-[160px] py-5 px-4 overflow-hidden rounded-lg shadow-lg cursor-pointer flex flex-col items-start bg-gradient-to-br from-[#6BA3D8]/20 via-[#7FB5E5]/15 to-[#9bc8ff]/20 backdrop-blur-xl border-0 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3 w-full">
                    <div className="rounded-full w-[60px] h-[60px] p-[15px] bg-gradient-to-br from-cyan-500/30 to-blue-600/30 backdrop-blur-sm flex justify-center items-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-300">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    </div>
                    <AccordionTrigger className="text-[18px] font-semibold text-white hover:text-cyan-300 transition-colors duration-200 flex-1 leading-tight text-left">
                      How is Zignasa different from other hackathons?
                    </AccordionTrigger>
                  </div>
                  <AccordionContent className="text-[14px] text-gray-300 leading-relaxed w-full">
                    Zignasa differed from other hackathons by combining in-depth technical tracks with social activities and industry-backed certification, creating a balanced experience of learning, networking, and career enhancement.
                  </AccordionContent>
                  <div className="absolute bottom-0 right-0 w-[170px] opacity-20">
                    <div className="w-full h-full bg-gradient-to-tl from-white/30 to-transparent rounded-tl-[100px]"></div>
                  </div>
                </AccordionItem>

                <AccordionItem value="item-2" className="group relative w-full min-h-[160px] py-5 px-4 overflow-hidden rounded-lg shadow-lg cursor-pointer flex flex-col items-start bg-gradient-to-br from-[#C8A8E9]/20 via-[#D4B5F0]/15 to-[#E0C3F7]/20 backdrop-blur-xl border-0 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3 w-full">
                    <div className="rounded-full w-[60px] h-[60px] p-[15px] bg-gradient-to-br from-purple-500/30 to-pink-600/30 backdrop-blur-sm flex justify-center items-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
                        <path d="M12 2v20M2 12h20"></path>
                        <circle cx="12" cy="12" r="4"></circle>
                      </svg>
                    </div>
                    <AccordionTrigger className="text-[18px] font-semibold text-white hover:text-purple-300 transition-colors duration-200 flex-1 leading-tight text-left">
                      Will there be any fun activities during the hackathon?
                    </AccordionTrigger>
                  </div>
                  <AccordionContent className="text-[14px] text-gray-300 leading-relaxed w-full">
                    Yes, Zignasa 2K23 featured exciting activities like Tug-Of-War and a midnight campfire. The fun activities planned for Zignasa 2K25, however, remain a mystery.
                  </AccordionContent>
                  <div className="absolute bottom-0 right-0 w-[170px] opacity-20">
                    <div className="w-full h-full bg-gradient-to-tl from-white/30 to-transparent rounded-tl-[100px]"></div>
                  </div>
                </AccordionItem>

                <AccordionItem value="item-3" className="group relative w-full min-h-[160px] py-5 px-4 overflow-hidden rounded-lg shadow-lg cursor-pointer flex flex-col items-start bg-gradient-to-br from-[#FFD89B]/20 via-[#FFE4B5]/15 to-[#FFF0D1]/20 backdrop-blur-xl border-0 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3 w-full">
                    <div className="rounded-full w-[60px] h-[60px] p-[15px] bg-gradient-to-br from-yellow-500/30 to-orange-600/30 backdrop-blur-sm flex justify-center items-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-300">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </div>
                    <AccordionTrigger className="text-[18px] font-semibold text-white hover:text-yellow-300 transition-colors duration-200 flex-1 leading-tight text-left">
                      What are we going to learn?
                    </AccordionTrigger>
                  </div>
                  <AccordionContent className="text-[14px] text-gray-300 leading-relaxed w-full">
                    AWS cloud services, UI/UX design principles, and Web Development using modern frameworks.
                  </AccordionContent>
                  <div className="absolute bottom-0 right-0 w-[170px] opacity-20">
                    <div className="w-full h-full bg-gradient-to-tl from-white/30 to-transparent rounded-tl-[100px]"></div>
                  </div>
                </AccordionItem>

                <AccordionItem value="item-4" className="group relative w-full min-h-[160px] py-5 px-4 overflow-hidden rounded-lg shadow-lg cursor-pointer flex flex-col items-start bg-gradient-to-br from-[#A8E6CF]/20 via-[#B8F0D8]/15 to-[#C8FAE1]/20 backdrop-blur-xl border-0 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3 w-full">
                    <div className="rounded-full w-[60px] h-[60px] p-[15px] bg-gradient-to-br from-green-500/30 to-emerald-600/30 backdrop-blur-sm flex justify-center items-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <AccordionTrigger className="text-[18px] font-semibold text-white hover:text-green-300 transition-colors duration-200 flex-1 leading-tight text-left">
                      How do I attend online workshops?
                    </AccordionTrigger>
                  </div>
                  <AccordionContent className="text-[14px] text-gray-300 leading-relaxed w-full">
                    Meeting links and access credentials will be shared to your registered email 24 hours before each session.
                  </AccordionContent>
                  <div className="absolute bottom-0 right-0 w-[170px] opacity-20">
                    <div className="w-full h-full bg-gradient-to-tl from-white/30 to-transparent rounded-tl-[100px]"></div>
                  </div>
                </AccordionItem>

                <AccordionItem value="item-5" className="group relative w-full min-h-[160px] py-5 px-4 overflow-hidden rounded-lg shadow-lg cursor-pointer flex flex-col items-start bg-gradient-to-br from-[#B8B8FF]/20 via-[#C8C8FF]/15 to-[#D8D8FF]/20 backdrop-blur-xl border-0 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3 w-full">
                    <div className="rounded-full w-[60px] h-[60px] p-[15px] bg-gradient-to-br from-indigo-500/30 to-blue-600/30 backdrop-blur-sm flex justify-center items-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <AccordionTrigger className="text-[18px] font-semibold text-white hover:text-indigo-300 transition-colors duration-200 flex-1 leading-tight text-left">
                      Will there be anyone to guide the participants?
                    </AccordionTrigger>
                  </div>
                  <AccordionContent className="text-[14px] text-gray-300 leading-relaxed w-full">
                    Yes, dedicated mentors with expertise in AWS, UI/UX, and Web Development will provide hands-on guidance throughout.
                  </AccordionContent>
                  <div className="absolute bottom-0 right-0 w-[170px] opacity-20">
                    <div className="w-full h-full bg-gradient-to-tl from-white/30 to-transparent rounded-tl-[100px]"></div>
                  </div>
                </AccordionItem>

                <AccordionItem value="item-6" className="group relative w-full min-h-[160px] py-5 px-4 overflow-hidden rounded-lg shadow-lg cursor-pointer flex flex-col items-start bg-gradient-to-br from-[#FFB3BA]/20 via-[#FFC3C8]/15 to-[#FFD3D6]/20 backdrop-blur-xl border-0 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3 w-full">
                    <div className="rounded-full w-[60px] h-[60px] p-[15px] bg-gradient-to-br from-rose-500/30 to-pink-600/30 backdrop-blur-sm flex justify-center items-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-300">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg>
                    </div>
                    <AccordionTrigger className="text-[18px] font-semibold text-white hover:text-rose-300 transition-colors duration-200 flex-1 leading-tight text-left">
                      Why do we have to join this hackathon?
                    </AccordionTrigger>
                  </div>
                  <AccordionContent className="text-[14px] text-gray-300 leading-relaxed w-full">
                    It offers real-world experience in trending technologies (AWS, UI/UX, Web Dev), with industry certifications and networking opportunities.
                  </AccordionContent>
                  <div className="absolute bottom-0 right-0 w-[170px] opacity-20">
                    <div className="w-full h-full bg-gradient-to-tl from-white/30 to-transparent rounded-tl-[100px]"></div>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Coordinators Section */}
        <section id="coordinators" className="py-28 bg-black border-0">
          <div className="container mx-auto px-6 bg-black border-0" data-aos="fade-up">
            <div className="text-center mb-20 bg-black border-0">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Faculty Coordinators</h2>
              <p className="text-xl text-gray-300">Pillars of the EVENT</p>
            </div>
          </div>

          <div className="container mx-auto px-6 bg-black border-0" data-aos="fade-up" data-aos-delay="100">
            <div className="swiper init-swiper bg-black border-0">
              <script type="application/json" className="swiper-config">
                {JSON.stringify({
                  loop: true,
                  speed: 800,
                  autoplay: {
                    delay: 4000,
                    disableOnInteraction: false
                  },
                  slidesPerView: 3,
                  centeredSlides: true,
                  spaceBetween: 30,
                  grabCursor: true,
                  pagination: {
                    el: ".swiper-pagination",
                    type: "bullets",
                    clickable: true
                  },
                  navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                  },
                  breakpoints: {
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                      centeredSlides: true
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 25,
                      centeredSlides: true
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                      centeredSlides: true
                    }
                  }
                })}
              </script>
              
              <div className="swiper-wrapper bg-black border-0">
                <div className="swiper-slide bg-black border-0 w-80">
                  <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-8 text-center hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl h-full flex flex-col">
                    <div className="flex flex-col items-center space-y-6 flex-grow justify-center">
                      <div className="relative">
                        <img src="/assets/img/balaram.jpg" className="w-32 h-32 object-cover rounded-full border-4 border-cyan-400/30" alt="Dr. Allam Balaram" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-white mb-2">Dr. Allam Balaram</h3>
                        <h4 className="text-cyan-400 font-semibold">Convenor, HOD CSE</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide bg-black border-0 w-80">
                  <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-8 text-center hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl h-full flex flex-col">
                    <div className="flex flex-col items-center space-y-6 flex-grow justify-center">
                      <div className="relative">
                        <img src="/assets/img/coordinators/muralikrishna.jpg" className="w-32 h-32 object-cover rounded-full border-4 border-cyan-400/30" alt="Mr. B Murali Krishna" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-white mb-2">Mr. B Murali Krishna</h3>
                        <h4 className="text-cyan-400 font-semibold">Assistant Professor</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide bg-black border-0 w-80">
                  <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-8 text-center hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl h-full flex flex-col">
                    <div className="flex flex-col items-center space-y-6 flex-grow justify-center">
                      <div className="relative">
                        <img src="/assets/img/coordinators/sapthami.jpg" className="w-32 h-32 object-cover rounded-full border-4 border-cyan-400/30" alt="Mrs. I Sapthami" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-white mb-2">Mrs. I Sapthami</h3>
                        <h4 className="text-cyan-400 font-semibold">Assistant Professor</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide bg-black border-0 w-80">
                  <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-8 text-center hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl h-full flex flex-col">
                    <div className="flex flex-col items-center space-y-6 flex-grow justify-center">
                      <div className="relative">
                        <img src="/assets/img/coordinators/vedaVidhya.jpg" className="w-32 h-32 object-cover rounded-full border-4 border-cyan-400/30" alt="Mrs. B Veda Vidhya" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-white mb-2">Mrs. B Veda Vidhya</h3>
                        <h4 className="text-cyan-400 font-semibold">Assistant Professor</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination mt-8"></div>
              <div className="swiper-button-next text-cyan-400"></div>
              <div className="swiper-button-prev text-cyan-400"></div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-28 bg-black border-0">
          <div className="container mx-auto px-6 bg-black border-0">
            <div className="text-center mb-20 bg-black border-0" data-aos="fade-up">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Contact
              </h2>
              <p className="text-xl text-gray-300">
                Any Doubt/Suggestion/Feedback ???
              </p>
            </div>

            <div className="max-w-7xl mx-auto bg-black border-0" data-aos="fade-up" data-aos-delay="100">
              <div className="grid md:grid-cols-3 gap-10 mb-20 bg-black border-0">
                <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-8 text-center hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl" data-aos="fade-up" data-aos-delay="200">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 bg-cyan-500/20 backdrop-blur-sm rounded-2xl border-0">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Address</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Dundigal Police Station Road, Hyderabad, Telangana 500043
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-8 text-center hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl" data-aos="fade-up" data-aos-delay="300">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 bg-cyan-500/20 backdrop-blur-sm rounded-2xl border-0">
                      <Phone className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Call Us</h3>
                    <div className="text-gray-300 space-y-1">
                      <p>M Prajith Balaji - +91 9121827709</p>
                      <p>Yashwanth Reddy - +91 7816005757</p>
                      <p>G Vignesh - +91 7993334426</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-8 text-center hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl" data-aos="fade-up" data-aos-delay="400">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 bg-cyan-500/20 backdrop-blur-sm rounded-2xl border-0">
                      <Mail className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Email Us</h3>
                    <p className="text-gray-300">
                      zignasa2k25@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 bg-black border-0">
                <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-4 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl" data-aos="fade-up" data-aos-delay="300">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3803.1744261147496!2d78.43861427468744!3d17.594450196808015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9b8eae5cd739%3A0x2aa927e931d97eee!2sMLR%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1730730947518!5m2!1sen!2sin" 
                    className="w-full h-96 rounded-2xl" 
                    style={{border: 0}} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MLR Institute of Technology Location Map"
                  ></iframe>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-8 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl" data-aos="fade-up" data-aos-delay="400">
                  <div className="mb-6">
                    <h3 className="text-white text-2xl font-semibold">Send Message</h3>
                  </div>
                  <div>
                    <form onSubmit={sendEmail} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Your Name" 
                            required 
                            className="bg-white/5 backdrop-blur-sm border-0 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 rounded-2xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Your Email" 
                            required 
                            className="bg-white/5 backdrop-blur-sm border-0 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 rounded-2xl transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Input 
                          type="text" 
                          name="subject" 
                          id="subject" 
                          placeholder="Subject" 
                          required 
                          className="bg-white/5 backdrop-blur-sm border-0 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 rounded-2xl transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Textarea 
                          name="message" 
                          id="message" 
                          rows={6} 
                          placeholder="Message" 
                          required 
                          className="bg-white/5 backdrop-blur-sm border-0 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 rounded-2xl transition-all duration-300 resize-none"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-cyan-500/80 backdrop-blur-sm hover:bg-cyan-600/80 text-white font-semibold py-3 rounded-2xl transition-all duration-300 border-0"
                      >
                        Send Message
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-black border-0">
        <div className="container mx-auto px-4 text-center bg-black border-0">
          <p className="text-gray-300">
            © <span className="font-semibold" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>ZIGNASA - 2K25</span> All Rights Reserved
          </p>
        </div>
      </footer>

      {/* Preloader */}
      <div id="preloader" className="bg-black"></div>
    </div>
  );
};

export default Home;
