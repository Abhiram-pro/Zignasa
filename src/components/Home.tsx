import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import '../assets/main.css';
import { Navbar } from './ui/navbar';
import { Card, CardContent, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Briefcase, BarChart3, CheckCircle, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const Home: React.FC = () => {
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
        const baseOpacity = 0.15 + (scrollProgress * 0.3);
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
        bgElement.style.opacity = Math.max(0.1, Math.min(0.5, opacity)).toString();
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
            className="absolute inset-0 z-0 opacity-15"
            style={{
              backgroundImage: 'url(/assets/img/logo.png)',
              backgroundSize: '65%',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              transform: 'translateZ(0)',
              willChange: 'transform, opacity',
              filter: 'brightness(0.9) contrast(1.3) drop-shadow(0 0 50px rgba(0, 255, 255, 0.3))',
              transformStyle: 'preserve-3d'
            }}
          ></div>
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 z-5 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="300">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
              ZIGNASA<span style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}> 2K25</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              A 24HR NATIONAL-LEVEL HACKATHON WITH BOOTCAMP
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Calendar className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                December <span style={{color: '#ffffff', fontWeight: 'bold', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>5th & 6th</span>
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
        <section id="featured-gallery" className="py-24 bg-black border-0">
          <div className="container mx-auto px-6 bg-black border-0">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto bg-black border-0">
              <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-8 transition-all duration-300 group hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 shadow-2xl" data-aos="fade-up" data-aos-delay="100">
                <div className="pb-6">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-cyan-500/20 backdrop-blur-sm rounded-2xl group-hover:bg-cyan-500/30 transition-colors duration-300 border-0">
                      <Briefcase className="w-7 h-7 text-cyan-400" />
                    </div>
                    <h3 className="text-white text-2xl font-bold">
                      24Hr. National Level Hackathon
                    </h3>
                  </div>
                </div>
                <div className="px-2">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Anybody, from any college or state can join this hackathon
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-8 transition-all duration-300 group hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 shadow-2xl" data-aos="fade-up" data-aos-delay="300">
                <div className="pb-6">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-cyan-500/20 backdrop-blur-sm rounded-2xl group-hover:bg-cyan-500/30 transition-colors duration-300 border-0">
                      <BarChart3 className="w-7 h-7 text-cyan-400" />
                    </div>
                    <h3 className="text-white text-2xl font-bold">
                      5-Day Online Bootcamp
                    </h3>
                  </div>
                </div>
                <div className="px-2">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Will be taught about the basic fundamentals of the domains
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-28 bg-black border-0">
          <div className="container mx-auto px-6 bg-black border-0">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto bg-black border-0">
              <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-8 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 shadow-2xl" data-aos="fade-up" data-aos-delay="100">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <p className="font-semibold text-sm uppercase tracking-wider" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>Who Are We</p>
                    <h3 className="text-4xl font-bold text-white">ZIGNASA</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      A technical event conducted by the CSE department of MLR Institute of Technology
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      '24-hour intensive hackathon',
                      'Pre-event bootcamp for preparation',
                      'Mentorship throughout the event',
                      'Exciting prizes and recognition',
                      'Industry expert sessions',
                      'Networking opportunities'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                        <span style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 shadow-2xl" data-aos="fade-up" data-aos-delay="200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white/10 backdrop-blur-sm border-0 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 shadow-lg">
                    <CardContent className="p-0">
                      <img 
                        src="/assets/img/UPIMG/IMG_5453.JPG" 
                        className="w-full h-[28rem] object-cover" 
                        alt="Zignasa Event - Main Venue" 
                      />
                      <div className="px-2 py-0.5">
                        <CardDescription className="text-gray-400 text-[11px] font-normal text-center leading-tight">
                          Main Event Venue
                        </CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-rows-2 gap-4">
                    <Card className="bg-white/10 backdrop-blur-sm border-0 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 shadow-lg">
                      <CardContent className="p-0">
                        <img 
                          src="/assets/img/about-company-2.jpg" 
                          className="w-full h-30 object-cover" 
                          alt="Zignasa Event - Team Collaboration" 
                        />
                        <div className="p-3">
                          <CardDescription className="text-gray-400 text-xs font-normal">
                            Team Collaboration
                          </CardDescription>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/10 backdrop-blur-sm border-0 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 shadow-lg">
                      <CardContent className="p-0">
                        <img 
                          src="/assets/img/about-company-3.jpg" 
                          className="w-full h-30 object-cover" 
                          alt="Zignasa Event - Innovation Hub" 
                        />
                        <div className="p-3">
                          <CardDescription className="text-gray-400 text-xs font-normal">
                            Innovation Hub
                          </CardDescription>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section id="clients" className="py-28 bg-black border-0">
          <div className="container mx-auto px-6 bg-black border-0">
            <div className="text-center mb-20 bg-black border-0" data-aos="fade-up">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Our Partners
              </h2>
              <p className="text-xl text-gray-300">
                Trusted organizations supporting ZIGNASA 2K25
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto bg-black border-0" data-aos="fade-up" data-aos-delay="100">
              <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 shadow-2xl flex items-center justify-center">
                <img src="/assets/img/clients/mlrit.webp" className="w-full h-16 object-contain filter brightness-90 hover:brightness-100 transition-all duration-300" alt="MLR Institute of Technology" />
              </div>
              <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 shadow-2xl flex items-center justify-center">
                <img src="" className="w-full h-16 object-contain filter brightness-90 hover:brightness-100 transition-all duration-300" alt="" />
              </div>
              <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 shadow-2xl flex items-center justify-center">
                <img src="/assets/img/clients/csi.png" className="w-full h-16 object-contain filter brightness-90 hover:brightness-100 transition-all duration-300" alt="Computer Society of India" />
              </div>
              <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 shadow-2xl flex items-center justify-center">
                <img src="" className="w-full h-16 object-contain filter brightness-90 hover:brightness-100 transition-all duration-300" alt="" />
              </div>
              <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 shadow-2xl flex items-center justify-center">
                <img src="/assets/img/clients/iic.png" className="w-full h-16 object-contain filter brightness-90 hover:brightness-100 transition-all duration-300" alt="Institution's Innovation Council" />
              </div>
              <div className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 shadow-2xl flex items-center justify-center">
                <img src="" className="w-full h-16 object-contain filter brightness-90 hover:brightness-100 transition-all duration-300" alt="" />
              </div>
            </div>
          </div>
        </section>

        {/* Zignasa2K23 Section */}
        <section id="zignasa2k23" className="zignasa2k23 section">
          <div className="container section-title bg-black border-0" data-aos="fade-up">
            <h2>ZIGNASA - 2K23</h2>
          </div>

          <div className="container bg-black border-0">
            <div className="row justify-content-between">
              <div className="col-lg-5 d-flex align-items-center">
                <div className="flex flex-col space-y-8" data-aos="fade-up" data-aos-delay="100">
                  <div className="bg-white/5 backdrop-blur-xl border-0 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <i className="bi bi-binoculars text-cyan-400 text-xl mt-1"></i>
                      <div>
                        <p className="text-white leading-relaxed">
                          Zignasa 2K23 was a transformative three-day tech event (December 27-29, 2023) that offered specialized tracks in Python Full Stack, Data Science, and Machine Learning, providing participants with in-depth technical knowledge and practical skills.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-xl border-0 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <i className="bi bi-people text-cyan-400 text-xl mt-1"></i>
                      <div>
                        <p className="text-white leading-relaxed">
                          Beyond the technical learning, the event featured engaging activities like campfire sessions, live music performances, and refreshments, creating a perfect balance between intensive learning and enjoyable networking opportunities.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-xl border-0 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <i className="bi bi-award text-cyan-400 text-xl mt-1"></i>
                      <div>
                        <p className="text-white leading-relaxed">
                          The event was strengthened by collaboration with industry leaders like CSI, AICTE, and Brainovision, ensuring participants received valuable certificates that would enhance their resumes and career prospects.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 flex justify-center items-center">
                <div className="bg-white/5 backdrop-blur-xl border-0 rounded-2xl p-6 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl w-full" data-aos="fade-up" data-aos-delay="200">
                  <div className="flex justify-center">
                    <iframe 
                      className="w-full rounded-xl" 
                      height="350" 
                      src="https://www.youtube.com/embed/67z94dRglkQ?si=FEdnznrjViFSMrvpn"
                      title="Zignasa 2K23 Video"
                      style={{border: 0}}
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-32 bg-black border-0 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="container mx-auto px-6 bg-black border-0 relative z-10" data-aos="fade-up">
            <div className="text-center mb-24 bg-black border-0">
              <h2 className="text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                Gallery
              </h2>
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Capturing moments of innovation, creativity, and excellence from our journey
              </p>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400"></div>
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400"></div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-6 bg-black border-0 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-black border-0">
              <div className="bg-black border-0 group cursor-pointer" data-aos="fade-up" data-aos-delay="100">
                <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src="/assets/img/pic4.jpg" alt="Innovation Workshop" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
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
              <div className="bg-black border-0 group cursor-pointer" data-aos="fade-up" data-aos-delay="200">
                <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src="/assets/img/pic1.jpg" alt="Team Collaboration" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
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
              <div className="bg-black border-0 group cursor-pointer" data-aos="fade-up" data-aos-delay="300">
                <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src="/assets/img/pic8.jpg" alt="Creative Session" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
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
              <div className="bg-black border-0 group cursor-pointer" data-aos="fade-up" data-aos-delay="400">
                <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src="/assets/img/pic2.jpg" alt="Tech Showcase" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
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
              <div className="bg-black border-0 group cursor-pointer" data-aos="fade-up" data-aos-delay="500">
                <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src="/assets/img/pic3.jpg" alt="Learning Hub" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
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
              <div className="bg-black border-0 group cursor-pointer" data-aos="fade-up" data-aos-delay="600">
                <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src="/assets/img/pic6.jpg" alt="Event Highlights" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
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
              <div className="bg-black border-0 group cursor-pointer" data-aos="fade-up" data-aos-delay="700">
                <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src="/assets/img/pic5.jpg" alt="Achievement Moments" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
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
              <div className="bg-black border-0 group cursor-pointer" data-aos="fade-up" data-aos-delay="800">
                <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src="/assets/img/pic7.jpg" alt="Future Vision" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
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

            <div className="max-w-5xl mx-auto bg-black border-0" data-aos="fade-up" data-aos-delay="100">
              <Accordion type="single" collapsible className="space-y-6 bg-black border-0">
                <AccordionItem value="item-1" className="bg-white/5 backdrop-blur-xl border-0 rounded-2xl px-8 py-4 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl">
                  <AccordionTrigger className="text-white hover:text-cyan-400 text-left font-semibold">
                    How is Zignasa different from other hackathons?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 leading-relaxed">
                    Zignasa differed from other hackathons by combining in-depth technical tracks with social activities and industry-backed certification, creating a balanced experience of learning, networking, and career enhancement.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-white/5 backdrop-blur-xl border-0 rounded-2xl px-8 py-4 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl">
                  <AccordionTrigger className="text-white hover:text-cyan-400 text-left font-semibold">
                    Will there be any fun activities during the hackathon?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 leading-relaxed">
                    Yes, Zignasa 2K23 featured exciting activities like Tug-Of-War and a midnight campfire. The fun activities planned for Zignasa 2K25, however, remain a mystery.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-white/5 backdrop-blur-xl border-0 rounded-2xl px-8 py-4 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl">
                  <AccordionTrigger className="text-white hover:text-cyan-400 text-left font-semibold">
                    What are we going to learn?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 leading-relaxed">
                    AWS cloud services, UI/UX design principles, and Web Development using modern frameworks.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-white/5 backdrop-blur-xl border-0 rounded-2xl px-8 py-4 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl">
                  <AccordionTrigger className="text-white hover:text-cyan-400 text-left font-semibold">
                    How do I attend online workshops?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 leading-relaxed">
                    Meeting links and access credentials will be shared to your registered email 24 hours before each session.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-white/5 backdrop-blur-xl border-0 rounded-2xl px-8 py-4 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl">
                  <AccordionTrigger className="text-white hover:text-cyan-400 text-left font-semibold">
                    Will there be anyone to guide the participants?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 leading-relaxed">
                    Yes, dedicated mentors with expertise in AWS, UI/UX, and Web Development will provide hands-on guidance throughout.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="bg-white/5 backdrop-blur-xl border-0 rounded-2xl px-8 py-4 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl">
                  <AccordionTrigger className="text-white hover:text-cyan-400 text-left font-semibold">
                    Why do we have to join this hackathon?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 leading-relaxed">
                    It offers real-world experience in trending technologies (AWS, UI/UX, Web Dev), with industry certifications and networking opportunities.
                  </AccordionContent>
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
