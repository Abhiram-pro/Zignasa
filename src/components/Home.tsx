import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

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

  const scrollToId = (id: string) => {
    const el = document.querySelector(id) as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // fallback: update hash so browser attempts to jump
      window.location.hash = id;
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id) as HTMLElement | null;
    if (!target) return;
    const header = document.querySelector('#header') as HTMLElement | null;
    const offset = (header?.offsetHeight ?? 80) + 8;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    window.location.hash = id;
  };

  return (
    <div className="index-page">
      {/* Glassmorphic floating navbar */}
      <nav
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          padding: '0.75rem 1.25rem',
          background: 'linear-gradient(135deg, rgba(17,25,40,0.55), rgba(17,25,40,0.35))',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.20)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.35)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)'
        }}
      >
        {[
          { to: '/#hero', label: 'Home' },
          { to: '/#about', label: 'About' },
          { to: '/#zignasa2k23', label: 'Zignasa2K23' },
          { to: '/#gallery', label: 'Gallery' },
          { to: '/#acheivements', label: 'Achievements' },
          { to: '/#contact', label: 'Contact' },
          { to: '/#domains', label: 'Register Now' }
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              padding: '0.6rem 1rem',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              textShadow: '0 1px 1px rgba(0,0,0,0.35)',
              letterSpacing: '0.02em',
              borderRadius: '999px',
              transition: 'all 200ms ease'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.18)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 16px rgba(0,0,0,0.10)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <main className="main">
        {/* Hero Section */}
        <section id="hero" className="hero section">
          <div className="hero-bg" data-aos="fade-up" data-aos-delay="100">
            <img src="/assets/img/hero-bg-light.png" alt="" />
          </div>
          <div className="container text-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              {/* Animated floating brand logo */}
              <img src="/assets/img/hero-bg-light.png" alt="Brand" className="hero-logo-float mb-3" />
              <h1 data-aos="fade-up" data-aos-delay="500">ZIGNASA<span> 2K24</span></h1>
              <p data-aos="fade-up" data-aos-delay="900">A 24HR NATIONAL - LEVEL HACKATHON WITH BOOTCAMP</p>
              <h2 data-aos="fade-up" data-aos-delay="900">December <span style={{color: '#51bbc9'}}><b>5th & 6th</b></span></h2>
              <div className="d-flex" data-aos="fade-up" data-aos-delay="900">
                {/* Video link can be added here if needed */}
              </div>
            </div>
          </div>
        </section>

        {/* Featured gallery Section */}
        <section id="featured-gallery" className="featured-gallery section light-background">
          <div className="container">
            <div className="row gy-4">
              <div className="col-xl-6 col-lg-6" data-aos="fade-up" data-aos-delay="100">
                <div className="service-item d-flex">
                  <div className="icon flex-shrink-0"><i className="bi bi-briefcase" style={{color: '#fff'}}></i></div>
                  <div>
                    <h4 className="title"><a href="#domains" className="stretched-link">24Hr. National Level Hackathon</a></h4>
                    <p className="description">Anybody, from any college or state can join this hackathon</p>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6" data-aos="fade-up" data-aos-delay="300">
                <div className="service-item d-flex">
                  <div className="icon flex-shrink-0"><i className="bi bi-bar-chart" style={{color: '#fff'}}></i></div>
                  <div>
                    <h4 className="title"><a href="#domains" className="stretched-link">5 - Day Online Bootcamp</a></h4>
                    <p className="description">Will be taught about the basic fundamentals of the domains</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about section">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="100">
                <p className="who-we-are">Who Are We</p>
                <h3>ZIGNASA</h3>
                <p className="fst-italic">
                  A technical event conducted by the CSE department of MLR Institute of Technology
                </p>
                <ul>
                  <li><i className="bi bi-check-circle"></i> <span style={{color: '#fff'}}>24-hour intensive hackathon</span></li>
                  <li><i className="bi bi-check-circle"></i> <span style={{color: '#fff'}}>Pre-event bootcamp for preparation</span></li>
                  <li><i className="bi bi-check-circle"></i> <span style={{color: '#fff'}}>Mentorship throughout the event</span></li>
                  <li><i className="bi bi-check-circle"></i> <span style={{color: '#fff'}}>Exciting prizes and recognition</span></li>
                  <li><i className="bi bi-check-circle"></i> <span style={{color: '#fff'}}>Industry expert sessions</span></li>
                  <li><i className="bi bi-check-circle"></i> <span style={{color: '#fff'}}>Networking opportunities</span></li>
                </ul>
              </div>

              <div className="col-lg-6 about-images" data-aos="fade-up" data-aos-delay="200">
                <div className="row gy-4">
                  <div className="col-lg-6">
                    <img src="/assets/img/about-company-1.jpg" className="img-fluid" alt="" />
                  </div>
                  <div className="col-lg-6">
                    <div className="row gy-4">
                      <div className="col-lg-12">
                        <img src="/assets/img/about-company-2.jpg" className="img-fluid" alt="" />
                      </div>
                      <div className="col-lg-12">
                        <img src="/assets/img/about-company-3.jpg" className="img-fluid" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section id="clients" className="clients section">
          <div className="container" data-aos="fade-up">
            <div className="row gy-4">
              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="/assets/img/clients/mlrit.webp" className="img-fluid" alt="" style={{height: '72%', width: '550%'}} id="mlrit" />
              </div>
              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="/assets/img/clients/aicte.png" className="img-fluid" alt="" id="aicte" />
              </div>
              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="/assets/img/clients/csi.png" className="img-fluid" alt="" id="csi" />
              </div>
              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="/assets/img/clients/brainovision.png" className="img-fluid" alt="" />
              </div>
              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="/assets/img/clients/iic.png" className="img-fluid" alt="" />
              </div>
              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="/assets/img/clients/CSE.png" className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </section>

        {/* Zignasa2K23 Section */}
        <section id="zignasa2k23" className="zignasa2k23 section">
          <div className="container section-title" data-aos="fade-up">
            <h2>ZIGNASA - 2K23</h2>
          </div>

          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5 d-flex align-items-center">
                <ul className="nav nav-tabs" data-aos="fade-up" data-aos-delay="100">
                  <li className="nav-item">
                    <a href="#zignasa2k23-tab-1" className="nav-link active show" data-bs-toggle="tab" data-bs-target="#zignasa2k23-tab-1">
                      <i className="bi bi-binoculars"></i>
                      <div>
                        <p style={{color: '#fff'}}>
                          Zignasa 2K23 was a transformative three-day tech event (December 27-29, 2023) that offered specialized tracks in Python Full Stack, Data Science, and Machine Learning, providing participants with in-depth technical knowledge and practical skills.
                        </p>
                      </div>
                    </a>
                    <a href="#zignasa2k23-tab-1" className="nav-link active show" data-bs-toggle="tab" data-bs-target="#zignasa2k23-tab-1">
                      <i className="bi bi-binoculars"></i>
                      <div>
                        <p style={{color: '#fff'}}>
                          Beyond the technical learning, the event featured engaging activities like campfire sessions, live music performances, and refreshments, creating a perfect balance between intensive learning and enjoyable networking opportunities.
                        </p>
                      </div>
                    </a>
                    <a href="#zignasa2k23-tab-1" className="nav-link active show" data-bs-toggle="tab" data-bs-target="#zignasa2k23-tab-1">
                      <i className="bi bi-binoculars"></i>
                      <div>
                        <p style={{color: '#fff'}}>
                          The event was strengthened by collaboration with industry leaders like CSI, AICTE, and Brainovision, ensuring participants received valuable certificates that would enhance their resumes and career prospects.
                        </p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-6">
                <div className="tab-content" data-aos="fade-up" data-aos-delay="200">
                  <div className="tab-pane fade active show" id="zignasa2k23-tab-1">
                    <iframe 
                      className="col-xl-12 col-md-12 col-12" 
                      height="350" 
                      src="https://www.youtube.com/embed/67z94dRglkQ?si=FEdnznrjViFSMrvpn"
                      title="Zignasa 2K23 Video"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="gallery section light-background">
          <div className="container section-title" data-aos="fade-up">
            <h2>Gallery</h2>
            <p>Finest Art Pieces...</p>
          </div>

          <div className="container">
            <div className="row g-5">
              <div className="col-lg-3" data-aos="fade-up" data-aos-delay="100">
                <div className="service-item item-cyan position-relative">
                  <div>
                    <img src="/assets/img/pic4.jpg" alt="" width="100%" height="100%" style={{borderRadius: '5px'}} />
                  </div>
                </div>
              </div>
              <div className="col-lg-3" data-aos="fade-up" data-aos-delay="200">
                <div className="service-item item-orange position-relative">
                  <div>
                    <img src="/assets/img/pic1.jpg" alt="" width="100%" height="100%" style={{borderRadius: '5px'}} />
                  </div>
                </div>
              </div>
              <div className="col-lg-3" data-aos="fade-up" data-aos-delay="300">
                <div className="service-item item-teal position-relative">
                  <div>
                    <img src="/assets/img/pic8.jpg" alt="" width="100%" height="100%" style={{borderRadius: '5px'}} />
                  </div>
                </div>
              </div>
              <div className="col-lg-3" data-aos="fade-up" data-aos-delay="400">
                <div className="service-item item-red position-relative">
                  <div>
                    <img src="/assets/img/pic2.jpg" alt="" width="100%" height="100%" style={{borderRadius: '5px'}} />
                  </div>
                </div>
              </div>
              <div className="col-lg-3" data-aos="fade-up" data-aos-delay="500">
                <div className="service-item item-indigo position-relative">
                  <div>
                    <img src="/assets/img/pic3.jpg" alt="" width="100%" height="100%" style={{borderRadius: '5px'}} />
                  </div>
                </div>
              </div>
              <div className="col-lg-3" data-aos="fade-up" data-aos-delay="600">
                <div className="service-item item-pink position-relative">
                  <div>
                    <img src="/assets/img/pic6.jpg" alt="" width="100%" height="100%" style={{borderRadius: '5px'}} />
                  </div>
                </div>
              </div>
              <div className="col-lg-3" data-aos="fade-up" data-aos-delay="600">
                <div className="service-item item-pink position-relative">
                  <div>
                    <img src="/assets/img/pic5.jpg" alt="" width="100%" height="100%" style={{borderRadius: '5px'}} />
                  </div>
                </div>
              </div>
              <div className="col-lg-3" data-aos="fade-up" data-aos-delay="600">
                <div className="service-item item-pink position-relative">
                  <div>
                    <img src="/assets/img/pic7.jpg" alt="" width="100%" height="100%" style={{borderRadius: '5px'}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="acheivements" className="acheivements section light-background">
          <div className="container section-title" data-aos="fade-up">
            <h2>Acheivements</h2>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="swiper init-swiper">
              <script type="application/json" className="swiper-config">
                {JSON.stringify({
                  loop: true,
                  speed: 600,
                  autoplay: {
                    delay: 5000
                  },
                  slidesPerView: "auto",
                  pagination: {
                    el: ".swiper-pagination",
                    type: "bullets",
                    clickable: true
                  },
                  breakpoints: {
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 40
                    },
                    1200: {
                      slidesPerView: 3,
                      spaceBetween: 1
                    }
                  }
                })}
              </script>
              
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="profile mt-auto">
                      <img src="/assets/img/award-1.jpg" className="testimonial-img" alt="" />
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="profile mt-auto">
                      <img src="/assets/img/award-2.jpg" className="testimonial-img" alt="" />
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="profile mt-auto">
                      <img src="/assets/img/award-3.jpg" className="testimonial-img" alt="" />
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="profile mt-auto">
                      <img src="/assets/img/award-4.jpg" className="testimonial-img" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </section>

        {/* Domains Section */}
        <section id="domains" className="domains section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Domains For ZIGNASA - 2K24</h2>
            <p>Choose your domains among the three to LIT the FIRE</p>
          </div>

          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-4" data-aos="zoom-in" data-aos-delay="100">
                <div className="domains-item">
                  <h1>Data Science With Cloud</h1>
                  <p className="description">"Unlock the potential of Data Science with Cloud technology!"</p>
                  <h4 style={{color: '#fff'}}><sup>₹</sup>499<span> / head</span></h4>
                  <Link to="/ds" className="cta-btn">REGISTER NOW</Link>
                  <ul>
                    <li><span style={{color: '#fff'}}>Team Size: 1 - 5 persons</span></li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4" data-aos="zoom-in" data-aos-delay="200">
                <div className="domains-item">
                  <h1>Full Stack Using MERN</h1>
                  <p className="description">"Create intelligent websites by bringing your wildest ideas to life in ways you never thought possible."</p>
                  <h4 style={{color: '#fff'}}><sup>₹</sup>499<span> / head</span></h4>
                  <Link to="/mern" className="cta-btn">REGISTER NOW</Link>
                  <ul>
                    <li><span style={{color: '#fff'}}>Team Size: 1 - 5 persons</span></li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4" data-aos="zoom-in" data-aos-delay="300">
                <div className="domains-item">
                  <h1>AI-Driven Web Development</h1>
                  <p className="description">"Build dynamic web applications using MongoDB, Express.js, React, and Node.js."</p>
                  <h4 style={{color: '#fff'}}><sup>₹</sup>499<span> / head</span></h4>
                  <Link to="/webdev" className="cta-btn">REGISTER NOW</Link>
                  <ul>
                    <li><span style={{color: '#fff'}}>Team Size: 1 - 5 persons</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="faq section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10" data-aos="fade-up" data-aos-delay="100">
                <div className="faq-container">
                  <div className="faq-item faq-active">
                    <h3>How is Zignasa different from other hackathons?</h3>
                    <div className="faq-content">
                      <p>Zignasa differed from other hackathons by combining in-depth technical tracks with social activities and industry-backed certification, creating a balanced experience of learning, networking, and career enhancement.</p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right"></i>
                  </div>

                  <div className="faq-item">
                    <h3>Will there be any fun activities during the hackathon?</h3>
                    <div className="faq-content">
                      <p>Yes, Zignasa 2K23 featured exciting activities like Tug-Of-War and a midnight campfire. The fun activities planned for Zignasa 2K24, however, remain a mystery.</p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right"></i>
                  </div>

                  <div className="faq-item">
                    <h3>What are we going to learn?</h3>
                    <div className="faq-content">
                      <p>AWS cloud services, UI/UX design principles, and Web Development using modern frameworks.</p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right"></i>
                  </div>

                  <div className="faq-item">
                    <h3>How do I attend online workshops?</h3>
                    <div className="faq-content">
                      <p>Meeting links and access credentials will be shared to your registered email 24 hours before each session.</p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right"></i>
                  </div>

                  <div className="faq-item">
                    <h3>Will there be anyone to guide the participants?</h3>
                    <div className="faq-content">
                      <p>Yes, dedicated mentors with expertise in AWS, UI/UX, and Web Development will provide hands-on guidance throughout.</p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right"></i>
                  </div>

                  <div className="faq-item">
                    <h3>Why do we have to join this hackathon?</h3>
                    <div className="faq-content">
                      <p>It offers real-world experience in trending technologies (AWS, UI/UX, Web Dev), with industry certifications and networking opportunities.</p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coordinators Section */}
        <section id="coordinators" className="coordinators section light-background">
          <div className="container section-title" data-aos="fade-up">
            <h2>Faculty Coordinators</h2>
            <p>Pillars of the EVENT</p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="swiper init-swiper">
              <script type="application/json" className="swiper-config">
                {JSON.stringify({
                  loop: true,
                  speed: 600,
                  autoplay: {
                    delay: 5000
                  },
                  slidesPerView: "auto",
                  pagination: {
                    el: ".swiper-pagination",
                    type: "bullets",
                    clickable: true
                  },
                  breakpoints: {
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 40
                    },
                    1200: {
                      slidesPerView: 3,
                      spaceBetween: 1
                    }
                  }
                })}
              </script>
              
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="profile mt-auto">
                      <img src="/assets/img/balaram.jpg" className="testimonial-img" alt="" />
                      <h3>Dr. Allam Balaram</h3>
                      <h4>Convenor, HOD CSE</h4>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="profile mt-auto">
                      <img src="/assets/img/coordinators/muralikrishna.jpg" className="testimonial-img" alt="" />
                      <h3>Mr. B Murali Krishna</h3>
                      <h4>Assistant Professor</h4>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="profile mt-auto">
                      <img src="/assets/img/coordinators/sapthami.jpg" className="testimonial-img" alt="" />
                      <h3>Mrs. I Sapthami</h3>
                      <h4>Assistant Professor</h4>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="profile mt-auto">
                      <img src="/assets/img/coordinators/vedaVidhya.jpg" className="testimonial-img" alt="" />
                      <h3>Mrs. B Veda Vidhya</h3>
                      <h4>Assistant Professor</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Contact</h2>
            <p>Any Doubt/Suggestion/Feedback ???</p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              <div className="col-lg-6">
                <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="200">
                  <i className="bi bi-geo-alt" style={{color: '#fff'}}></i>
                  <h3>Address</h3>
                  <p>Dundigal Police Station Road, Hyderabad, Telangana 500043</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
                  <i className="bi bi-telephone" style={{color: '#fff'}}></i>
                  <h3>Call Us</h3>
                  <p>M Prajith Balaji - +91 9121827709</p>
                  <p>Yashwanth Reddy - +91 7816005757</p>
                  <p>G Vignesh - +91 7993334426</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
                  <i className="bi bi-envelope" style={{color: '#fff'}}></i>
                  <h3>Email Us</h3>
                  <p>zignasa2k24@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="row gy-4 mt-1">
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3803.1744261147496!2d78.43861427468744!3d17.594450196808015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9b8eae5cd739%3A0x2aa927e931d97eee!2sMLR%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1730730947518!5m2!1sen!2sin" 
                  frameBorder="0" 
                  style={{border: 0, width: '100%', height: '400px'}} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MLR Institute of Technology Location Map"
                ></iframe>
              </div>

              <div className="col-lg-6">
                <form onSubmit={sendEmail} className="php-email-form" data-aos="fade-up" data-aos-delay="400">
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <input type="text" name="name" id="name" className="form-control" placeholder="Your Name" required />
                    </div>
                    <div className="col-md-6">
                      <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                    </div>
                    <div className="col-md-12">
                      <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                    </div>
                    <div className="col-md-12">
                      <textarea className="form-control" name="message" id="message" rows={6} placeholder="Message" required></textarea>
                    </div>
                    <div className="col-md-12 text-center">
                      <div className="error-message"></div>
                      <button type="submit" name="submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="footer position-relative light-background">
        <div className="container copyright text-center mt-4">
          <p>© <span>Copyright</span> <strong className="px-1 sitename">ZIGNASA - 2K24</strong><span>All Rights Reserved</span></p>
        </div>
      </footer>

      {/* Scroll Top */}
      <a href="#hero" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

      {/* Preloader */}
      <div id="preloader"></div>
    </div>
  );
};

export default Home;
