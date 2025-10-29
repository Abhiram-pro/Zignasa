import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import '../assets/main.css';
import { Navbar } from './ui/navbar';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import EmblaCarousel from './ui/EmblaCarousel';
import { Briefcase, BarChart3, Calendar, MapPin, Phone, Mail, ExternalLink, Copy, Check } from 'lucide-react';

const Home: React.FC = () => {
  const [videoRotation, setVideoRotation] = useState(30);
  const [copiedText, setCopiedText] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(label);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setCopiedText('');
      }, 2000);
    });
  };

  const handleCardClick = (cardIndex: number) => {
    setActiveCard(cardIndex);
    setTimeout(() => {
      setActiveCard(null);
    }, 800);
  };

  useEffect(() => {
    const isMobile = () => (typeof window !== 'undefined') && (window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window));

    // Scroll handler for video straightening effect (soft on mobile)
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

        // Calculate rotation: 0 at center, subtle on mobile
        const scrollProgress = Math.min(1, distanceFromCenter / maxDistance);
        const maxRotation = isMobile() ? 5 : 30;
        const newRotation = maxRotation * scrollProgress;

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

      // Initialize AOS (Animate On Scroll) - subtle on mobile
      if (typeof window.AOS !== 'undefined') {
        const isMobile = () => (typeof window !== 'undefined') && (window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window));
        window.AOS.init({
          duration: isMobile() ? 400 : 800,
          once: true,
          easing: 'ease-out-quart',
          offset: isMobile() ? 40 : 120,
        } as any);
      }

      // Initialize EmailJS
      emailjs.init("INIJKyGM6q2Y3kSF4");

      // Initialize Omnidimension Chatbot
      const chatbotScript = document.createElement('script');
      chatbotScript.id = 'omnidimension-web-widget';
      chatbotScript.async = true;
      chatbotScript.src = 'https://backend.omnidim.io/web_widget.js?secret_key=5dc90f228732b9aaf773c4704a4c3036';
      document.body.appendChild(chatbotScript);

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

      // Soften marquee-like client logo animation on small screens
      const isMobile = () => (typeof window !== 'undefined') && (window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window));
      if (isMobile()) {
        document.querySelectorAll('.animate-scroll-left').forEach(el => {
          const elem = el as HTMLElement;
          // Keep same animation but slower for subtle effect
          elem.style.animationDuration = '35s';
        });
      }

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
      // Cleanup chatbot script when component unmounts
      const chatbotScript = document.getElementById('omnidimension-web-widget');
      if (chatbotScript) {
        chatbotScript.remove();
      }
    };
  }, []);


  // Enhanced 3D logo animation on scroll
  useEffect(() => {
    const isMobile = () => (typeof window !== 'undefined') && (window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window));

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.min(scrolled / windowHeight, 1);

      const bgElement = document.querySelector('#hero-bg') as HTMLElement;
      if (bgElement) {
        // 3D parallax movement with multiple axes (subtle on mobile)
        const translateY = -(scrolled * (isMobile() ? 0.12 : 0.4));
        const translateX = Math.sin(scrollProgress * Math.PI) * (isMobile() ? 6 : 20);

        // Dynamic opacity with gentle breathing effect on mobile
        const baseOpacity = 0.25 + (scrollProgress * (isMobile() ? 0.15 : 0.3));
        const breathingEffect = Math.sin(Date.now() * 0.002) * (isMobile() ? 0.02 : 0.05);
        const opacity = baseOpacity + breathingEffect;

        // 3D scaling and rotation effects (reduced on mobile)
        const scale = 1 + (scrollProgress * (isMobile() ? 0.05 : 0.15));
        const rotateX = scrollProgress * (isMobile() ? 5 : 15);
        const rotateY = Math.sin(scrollProgress * Math.PI * 2) * (isMobile() ? 4 : 10);
        const rotateZ = scrollProgress * (isMobile() ? 2 : 5);

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
        bgElement.style.opacity = Math.max(0.2, Math.min(isMobile() ? 0.45 : 0.6, opacity)).toString();
      }
    };

    // Add breathing animation (slower on mobile)
    const breathingInterval = setInterval(() => {
      if (window.pageYOffset < window.innerHeight) {
        handleScroll();
      }
    }, isMobile() ? 120 : 50);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(breathingInterval);
    };
  }, []);

  return (
    <div className="index-page bg-gradient-to-b bg-black min-h-screen">
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
          <div className="absolute inset-0 z-5 bg-gradient-to-b from-black/30 via-transparent to-black/50 "></div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="300">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 bg-clip-text text-transparent">
              ZIGNASA 2K25
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed bg-gradient-to-r from-gray-300 via-cyan-200 to-teal-200 bg-clip-text text-transparent">
              Code. Learn. Compete. A 24-Hour National Hackathon & Bootcamp
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Calendar className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                November <span style={{ color: '#ffffff', fontWeight: 'bold', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>28th & 29th</span>
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
                      24HR National Level Hackathon
                    </h3>
                  </div>
                </div>
                <div className="px-1 md:px-2">
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    Open to innovators from every college and state everyone’s welcome to join the hackathon!
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
                    Participants will be guided through the key concepts and foundational principles of each domain.
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
              src="/assets/Zignasa2k24.mp4"
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
        <section id="gallery" className="py-8 md:py-24 bg-black relative overflow-hidden ">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-black to-black pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 relative z-10 h-[482px] md:h-[800px]">
            <div className="text-center mb-6 md:mb-16" data-aos="fade-up">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-6 tracking-tight">
                Gallery
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-3 md:mb-6 px-4 ">
                Showcasing the spirit of innovation, creativity, and excellence that defines our journey.
              </p>
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="h-px w-10 sm:w-12 md:w-16 bg-gradient-to-r from-transparent to-cyan-400"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                <div className="h-px w-10 sm:w-12 md:w-16 bg-gradient-to-l from-transparent to-cyan-400"></div>
              </div>
            </div>

            {/* Stacked Cards Layout */}
            <div className="relative flex items-center justify-center min-h-[350px] sm:min-h-[400px] md:min-h-[650px] max-h-[450px] sm:max-h-[500px] md:max-h-none" data-aos="fade-up" data-aos-delay="200">
              {/* Card 1 - Far Left Back */}
              <div
                onClick={() => handleCardClick(1)}
                className="absolute w-[120px] sm:w-[180px] md:w-[280px] lg:w-[320px] aspect-[3/4] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                style={{
                  transform: activeCard === 1
                    ? 'translate(calc(-10rem - (100vw - 768px) * 0.05), calc(5rem + (100vw - 768px) * 0.012)) rotate(-21deg) scale(0.95)'
                    : activeCard !== null
                      ? 'translate(calc(-11rem - (100vw - 768px) * 0.06), calc(5.5rem + (100vw - 768px) * 0.014)) rotate(-24deg) scale(0.72)'
                      : 'translate(calc(-10rem - (100vw - 768px) * 0.05), calc(5rem + (100vw - 768px) * 0.012)) rotate(-21deg) scale(0.78)',
                  zIndex: activeCard === 1 ? 50 : 1,
                  transition: activeCard === 1
                    ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    : 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <img
                  src="/assets/img/pic4.jpg"
                  alt="Innovation Workshop"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card 2 - Left Back */}
              <div
                onClick={() => handleCardClick(2)}
                className="absolute w-[120px] sm:w-[180px] md:w-[280px] lg:w-[320px] aspect-[3/4] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                style={{
                  transform: activeCard === 2
                    ? 'translate(calc(-7.5rem - (100vw - 768px) * 0.035), calc(2.8rem + (100vw - 768px) * 0.008)) rotate(-14deg) scale(1.05)'
                    : activeCard !== null
                      ? 'translate(calc(-8.5rem - (100vw - 768px) * 0.042), calc(3.5rem + (100vw - 768px) * 0.010)) rotate(-17deg) scale(0.80)'
                      : 'translate(calc(-7.5rem - (100vw - 768px) * 0.035), calc(2.8rem + (100vw - 768px) * 0.008)) rotate(-14deg) scale(0.85)',
                  zIndex: activeCard === 2 ? 50 : 2,
                  transition: activeCard === 2
                    ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    : 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <img
                  src="/assets/img/pic1.jpg"
                  alt="Team Collaboration"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card 3 - Left Front */}
              <div
                onClick={() => handleCardClick(3)}
                className="absolute w-[120px] sm:w-[180px] md:w-[280px] lg:w-[320px] aspect-[3/4] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                style={{
                  transform: activeCard === 3
                    ? 'translate(calc(-4rem - (100vw - 768px) * 0.020), calc(0.9rem + (100vw - 768px) * 0.004)) rotate(-7deg) scale(1.1)'
                    : activeCard !== null
                      ? 'translate(calc(-5rem - (100vw - 768px) * 0.025), calc(1.4rem + (100vw - 768px) * 0.005)) rotate(-10deg) scale(0.88)'
                      : 'translate(calc(-4rem - (100vw - 768px) * 0.020), calc(0.9rem + (100vw - 768px) * 0.004)) rotate(-7deg) scale(0.93)',
                  zIndex: activeCard === 3 ? 50 : 3,
                  transition: activeCard === 3
                    ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    : 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <img
                  src="/assets/img/pic8.jpg"
                  alt="Creative Session"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card 4 - Center (Main) */}
              <div
                onClick={() => handleCardClick(4)}
                className="absolute w-[120px] sm:w-[180px] md:w-[280px] lg:w-[320px] aspect-[3/4] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                style={{
                  transform: activeCard === 4
                    ? 'translate(0rem, -0.7rem) rotate(0deg) scale(1.15)'
                    : activeCard !== null
                      ? 'translate(0rem, 0.7rem) rotate(0deg) scale(0.95)'
                      : 'translate(0rem, 0rem) rotate(0deg) scale(1)',
                  zIndex: activeCard === 4 ? 50 : 10,
                  transition: activeCard === 4
                    ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    : 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <img
                  src="/assets/img/pic2.jpg"
                  alt="Tech Showcase"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card 5 - Right Front */}
              <div
                onClick={() => handleCardClick(5)}
                className="absolute w-[120px] sm:w-[180px] md:w-[280px] lg:w-[320px] aspect-[3/4] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                style={{
                  transform: activeCard === 5
                    ? 'translate(calc(4rem + (100vw - 768px) * 0.020), calc(0.9rem + (100vw - 768px) * 0.004)) rotate(7deg) scale(1.1)'
                    : activeCard !== null
                      ? 'translate(calc(5rem + (100vw - 768px) * 0.025), calc(1.4rem + (100vw - 768px) * 0.005)) rotate(10deg) scale(0.88)'
                      : 'translate(calc(4rem + (100vw - 768px) * 0.020), calc(0.9rem + (100vw - 768px) * 0.004)) rotate(7deg) scale(0.93)',
                  zIndex: activeCard === 5 ? 50 : 3,
                  transition: activeCard === 5
                    ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    : 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <img
                  src="/assets/img/rep3.png"
                  alt="Learning Hub"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card 6 - Right Back */}
              <div
                onClick={() => handleCardClick(6)}
                className="absolute w-[120px] sm:w-[180px] md:w-[280px] lg:w-[320px] aspect-[3/4] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                style={{
                  transform: activeCard === 6
                    ? 'translate(calc(7.5rem + (100vw - 768px) * 0.035), calc(2.8rem + (100vw - 768px) * 0.008)) rotate(14deg) scale(1.05)'
                    : activeCard !== null
                      ? 'translate(calc(8.5rem + (100vw - 768px) * 0.042), calc(3.5rem + (100vw - 768px) * 0.010)) rotate(17deg) scale(0.80)'
                      : 'translate(calc(7.5rem + (100vw - 768px) * 0.035), calc(2.8rem + (100vw - 768px) * 0.008)) rotate(14deg) scale(0.85)',
                  zIndex: activeCard === 6 ? 50 : 2,
                  transition: activeCard === 6
                    ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    : 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <img
                  src="/assets/img/rep1.JPG"
                  alt="Event Highlights"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card 7 - Far Right Back */}
              <div
                onClick={() => handleCardClick(7)}
                className="absolute w-[120px] sm:w-[180px] md:w-[280px] lg:w-[320px] aspect-[3/4] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                style={{
                  transform: activeCard === 7
                    ? 'translate(calc(10rem + (100vw - 768px) * 0.05), calc(5rem + (100vw - 768px) * 0.012)) rotate(21deg) scale(0.95)'
                    : activeCard !== null
                      ? 'translate(calc(11rem + (100vw - 768px) * 0.06), calc(5.5rem + (100vw - 768px) * 0.014)) rotate(24deg) scale(0.72)'
                      : 'translate(calc(10rem + (100vw - 768px) * 0.05), calc(5rem + (100vw - 768px) * 0.012)) rotate(21deg) scale(0.78)',
                  zIndex: activeCard === 7 ? 50 : 1,
                  transition: activeCard === 7
                    ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    : 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <img
                  src="/assets/img/pic5.jpg"
                  alt="Achievement Moments"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Old Gallery Grid - Hidden */}
        <section className="hidden ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-0">
          </div>
        </section>



        {/* FAQ Section */}
        <section id="faq" className="py-28 bg-black border-0 max-h-[1150px]">
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
                    Zignasa 2k25 stands out by combining innovation, collaboration, and creativity in one place. Unlike regular hackathons, it focuses equally on technical excellence and real-world impact while also keeping participants energized with fun activities, networking sessions, and workshops led by experts </AccordionContent>

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
                    Yes. Along with coding challenges, Zignasa features exciting mini-games, a tug of war, interactive sessions, and a live music band to make sure participants enjoy every moment while creating innovative solutions.
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
                    Participants will gain hands-on experience in developing real-world projects, enhance their teamwork, time management, and presentation skills, and explore domains like Web Development, Agentic AI, and UI/UX Design through expert mentorship and workshops.
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
                    All registered participants will receive workshop details via email. The sessions will be conducted online through shared links before the hackathon, helping you gain the right skills and insights to perform your best during the event.
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
                      How do I attend online workshops?
                    </AccordionTrigger>
                  </div>
                  <AccordionContent className="text-[14px] text-gray-300 leading-relaxed w-full">
                    Workshop links and schedules will be shared via email with all registered participants. Just join through the provided link and get insights from industry mentors to prepare yourself before the main hackathon.
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
                      Will there be anyone to guide the participants?
                    </AccordionTrigger>
                  </div>
                  <AccordionContent className="text-[14px] text-gray-300 leading-relaxed w-full">
                    Industry mentors from organizations such as Student Tribe will be available throughout the event to guide teams, provide insights, and support participants with technical and strategic feedback.
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
        <section id="coordinators" className="py-16 md:py-24 lg:py-28 bg-black border-0 max-h-[600px]">
          <div className="container mx-auto px-4 sm:px-6 bg-black border-0" data-aos="fade-up">
            <div className="text-center mb-12 md:mb-16 lg:mb-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">Faculty Coordinators</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300">Pillars of the EVENT</p>
            </div>

            <EmblaCarousel
              className="bg-black border-0"
              autoplayDelayMs={4500}
              options={{ align: 'center', loop: true, containScroll: 'trimSnaps', dragFree: false, skipSnaps: false }}
              slides={[
                (
                  <div className="bg-white/5 backdrop-blur-xl border-0 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl h-full flex flex-col max-w-sm mx-auto">
                    <div className="flex flex-col items-center space-y-4 sm:space-y-6 flex-grow justify-center">
                      <div className="relative">
                        <img src="/assets/img/coordinators/kiran.jpg" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full border-3 sm:border-4 border-cyan-400/30" alt="Dr. Ajmeera Kiran" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Dr. Ajmeera Kiran</h3>
                        <h4 className="text-sm sm:text-base text-cyan-400 font-semibold">Convenor, HOD CSE</h4>
                      </div>
                    </div>
                  </div>
                ),
                (
                  <div className="bg-white/5 backdrop-blur-xl border-0 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl h-full flex flex-col max-w-sm mx-auto">
                    <div className="flex flex-col items-center space-y-4 sm:space-y-6 flex-grow justify-center">
                      <div className="relative">
                        <img src="/assets/img/coordinators/muralikrishna.jpg" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full border-3 sm:border-4 border-cyan-400/30" alt="Mr. B Murali Krishna" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Mr. B Murali Krishna</h3>
                        <h4 className="text-sm sm:text-base text-cyan-400 font-semibold">Assistant Professor</h4>
                      </div>
                    </div>
                  </div>
                ),
                (
                  <div className="bg-white/5 backdrop-blur-xl border-0 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl h-full flex flex-col max-w-sm mx-auto">
                    <div className="flex flex-col items-center space-y-4 sm:space-y-6 flex-grow justify-center">
                      <div className="relative">
                        <img src="/assets/img/coordinators/sapthami.jpg" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full border-3 sm:border-4 border-cyan-400/30" alt="Mrs. I Sapthami" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Mrs. I Sapthami</h3>
                        <h4 className="text-sm sm:text-base text-cyan-400 font-semibold">Assistant Professor</h4>
                      </div>
                    </div>
                  </div>
                ),
                (
                  <div className="bg-white/5 backdrop-blur-xl border-0 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 shadow-2xl h-full flex flex-col max-w-sm mx-auto">
                    <div className="flex flex-col items-center space-y-4 sm:space-y-6 flex-grow justify-center">
                      <div className="relative">
                        <img src="/assets/img/coordinators/vedaVidhya.jpg" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full border-3 sm:border-4 border-cyan-400/30" alt="Mrs. B Veda Vidhya" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Mrs. B Veda Vidhya</h3>
                        <h4 className="text-sm sm:text-base text-cyan-400 font-semibold">Assistant Professor</h4>
                      </div>
                    </div>
                  </div>
                )
              ]}
            />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-28 bg-black border-0 max-h-[1150px] relative">
          {/* Toast Notification */}
          {showToast && (
            <div className="fixed top-8 right-8 z-50 animate-in slide-in-from-top-5 fade-in duration-300">
              <div className="bg-cyan-500/20 backdrop-blur-xl border border-cyan-500/30 rounded-2xl px-6 py-4 flex items-center gap-3 shadow-2xl">
                <Check className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-medium !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white]">
                  Copied {copiedText}!
                </span>

              </div>
            </div>
          )}

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
              <div className="grid md:grid-cols-3 gap-10 mb-32 bg-black border-0">
                {/* Address Card */}
                <div
                  className="group relative bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-8 text-center hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 shadow-2xl hover:scale-105 cursor-pointer overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-cyan-500/10 group-hover:to-cyan-500/5 transition-all duration-500 rounded-3xl"></div>

                  <div className="relative flex flex-col items-center space-y-4">
                    <div className="p-4 bg-cyan-500/20 backdrop-blur-sm rounded-2xl border-0 group-hover:bg-cyan-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <MapPin className="w-6 h-6 text-cyan-400 group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">Address</h3>
                    <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                      Dundigal Police Station Road, Hyderabad, Telangana 500043
                    </p>
                    <Button
                      onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=MLR+Institute+of+Technology+Dundigal+Police+Station+Road+Hyderabad+Telangana+500043', '_blank')}
                      className="mt-4 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 rounded-2xl transition-all duration-300 flex items-center gap-2 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/30"
                    >
                      Open in Maps
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>

                {/* Phone Card */}
                <div
                  className="group relative bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-8 text-center hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 shadow-2xl hover:scale-105 overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-cyan-500/10 group-hover:to-cyan-500/5 transition-all duration-500 rounded-3xl"></div>

                  <div className="relative flex flex-col items-center space-y-4">
                    <div className="p-4 bg-cyan-500/20 backdrop-blur-sm rounded-2xl border-0 group-hover:bg-cyan-500/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Phone className="w-6 h-6 text-cyan-400 group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">Call Us</h3>
                    <div className="text-gray-300 space-y-3 w-full">
                      <div
                        onClick={() => copyToClipboard('7816005757', 'phone number')}
                        className="group/item flex items-center gap-2 p-3 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 cursor-pointer hover:scale-105"
                      >
                        {/*<p className="group-hover/item:text-cyan-300 transition-colors duration-300"> Yashwanth Reddy - +91 7816005757 </p> */}
                        <p className="group-hover/item:text-cyan-300 transition-colors duration-300">Yashwanth - +91 7816005757</p>
                        <Copy className="w-4 h-4 opacity-0 group-hover/item:opacity-100 text-cyan-400 transition-all duration-300 flex-shrink-0" />
                      </div>
                      <div
                        onClick={() => copyToClipboard('9121827709', 'phone number')}
                        className="group/item flex items-center gap-2 p-3 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 cursor-pointer hover:scale-105"
                      >
                        <p className="group-hover/item:text-cyan-300 transition-colors duration-300">M Prajith  - +91 9121827709</p>
                        <Copy className="w-4 h-4 opacity-0 group-hover/item:opacity-100 text-cyan-400 transition-all duration-300 flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div
                  className="group relative bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-8 text-center hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 shadow-2xl hover:scale-105 cursor-pointer overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay="400"
                  onClick={() => copyToClipboard('zignasa2k25@gmail.com', 'email')}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-cyan-500/10 group-hover:to-cyan-500/5 transition-all duration-500 rounded-3xl"></div>

                  <div className="relative flex flex-col items-center space-y-4">
                    <div className="p-4 bg-cyan-500/20 backdrop-blur-sm rounded-2xl border-0 group-hover:bg-cyan-500/30 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                      <Mail className="w-6 h-6 text-cyan-400 group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">Email Us</h3>
                    <div className="flex items-center gap-2 p-3 rounded-xl hover:bg-cyan-500/10 transition-all duration-300">
                      <p className="text-gray-300 group-hover:text-cyan-300 transition-colors duration-300">
                        zignasa2k25@gmail.com
                      </p>
                      <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 text-cyan-400 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-black border-0 ">
        <div className="container mx-auto px-4 text-center bg-black border-0 max-h-[100px]">
          <p className="text-gray-300">
            © <span className="font-semibold" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>ZIGNASA - 2K25</span> All Rights Reserved
          </p>
        </div>
      </footer>

      {/* Preloader */}
      <div id="preloader" className="bg-black"></div>
    </div>
  );
};

export default Home;
