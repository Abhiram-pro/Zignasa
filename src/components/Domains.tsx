import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Users } from 'lucide-react';
import { Navbar } from './ui/navbar';
import PrismaticBurst from './ui/PrismaticBurst';

const Domains: React.FC = () => {

  return (
    <>
      <style>{`
        html, body, #root {
          background: #000 !important;
        }
        
        .page-burst-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          min-height: 800px;
          z-index: 0;
          pointer-events: none;
          opacity: 0.6;
        }
        
        .page-burst-bg .prismatic-burst-container {
          width: 100% !important;
          height: 100% !important;
          min-height: 800px !important;
        }
        
        .page-burst-bg canvas {
          width: 100% !important;
          height: 100% !important;
          min-height: 800px !important;
          display: block !important;
        }
        
        .domain-card {
          position: relative;
          overflow: hidden;
          z-index: 5;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          transform: translateY(0) scale(1) !important;
          will-change: transform, box-shadow, border-color;
        }
        
        .card-burst-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          opacity: 0.6;
        }
        
        .card-burst-bg .prismatic-burst-container {
          width: 100% !important;
          height: 100% !important;
        }
        
        .card-burst-bg canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
        }
        
        .card-content {
          position: relative;
          z-index: 10;
        }
        

        
        .domain-card:hover {
          transform: translateY(-12px) scale(1.05) !important;
          box-shadow: 0 25px 50px -12px rgba(139, 92, 246, 0.4), 
                      0 0 0 1px rgba(255, 255, 255, 0.2),
                      0 10px 25px rgba(0, 0, 0, 0.3) !important;
          z-index: 10 !important;
          border-color: rgba(255, 255, 255, 0.6) !important;
        }
        
        .domain-card:hover .card-content {
          transform: translateZ(0);
        }
        
        @media (max-width: 768px) {
          .page-burst-bg {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100vw;
            height: 100vh;
            min-height: 800px;
          }
        }
      `}</style>

      {/* Page Background PrismaticBurst */}
      <div className="page-burst-bg">
        <PrismaticBurst
          intensity={3.5}
          speed={0.15}
          animationType="rotate"
          colors={['#6B21A8', '#7C3AED', '#8B5CF6', '#A78BFA']}
          distort={4}
          rayCount={6}
          mixBlendMode="screen"
        />
      </div>

      <div className="min-h-screen relative" style={{ zIndex: 10 }}>
        <Navbar />

        <main className="main pt-12 sm:pt-16 md:pt-20 lg:pt-28 relative">
          {/* Domains Section */}
          <section id="domains" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-transparent border-0">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 bg-transparent border-0">
              <div className="text-center mb-8 sm:mb-12 md:mb-16 bg-transparent border-0" data-aos="fade-up">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Domains For ZIGNASA - 2K25
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
                  Select your domain and unleash your creativity.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 sm:gap-8 md:gap-10 lg:gap-8 max-w-7xl mx-auto bg-transparent border-0">
                <div className="domain-card border border-white/30 rounded-2xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-10 group hover:border-white/50 shadow-2xl flex flex-col w-full lg:flex-1" style={{ background: 'rgba(0, 0, 0, 0.85)' }} data-aos="zoom-in" data-aos-delay="100">
                  <div className="card-burst-bg">
                    <PrismaticBurst
                      intensity={2.5}
                      speed={0.1}
                      animationType="rotate"
                      colors={['#6B21A8', '#7C3AED', '#8B5CF6']}
                      distort={2}
                      rayCount={4}
                      mixBlendMode="screen"
                    />
                  </div>
                  <div className="card-content text-left pb-6 sm:pb-8 flex-grow">
                    <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Web Dev
                    </h3>
                    <p className="text-white text-base sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Master the complete web development stack with MongoDB, Express.js, React, and Node.js. Learn to build scalable, modern web applications from the database to the user interface, following industry best practices and real world project structures.
                    </p>
                    <div className="space-y-2 sm:space-y-3 text-white">
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>React & Modern Frontend</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Node.js & Express Backend</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>MongoDB Database Design</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-content mt-auto">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 mb-4 sm:mb-6">
                      <div className="flex items-center gap-2 text-white flex-wrap">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Team Size: 3 - 5 persons</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 sm:py-4 px-4 rounded-xl sm:rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/30 text-sm sm:text-base">
                      <Link to="/webdev">Explore Domain</Link>
                    </Button>
                  </div>
                </div>

                <div className="domain-card border border-white/30 rounded-2xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-10 group hover:border-white/50 shadow-2xl flex flex-col w-full lg:flex-1" style={{ background: 'rgba(0, 0, 0, 0.85)' }} data-aos="zoom-in" data-aos-delay="200">
                  <div className="card-burst-bg">
                    <PrismaticBurst
                      intensity={2.5}
                      speed={0.12}
                      animationType="rotate"
                      colors={['#7C3AED', '#8B5CF6', '#A78BFA']}
                      distort={2}
                      rayCount={5}
                      mixBlendMode="screen"
                    />
                  </div>
                  <div className="card-content text-left pb-6 sm:pb-8 flex-grow">
                    <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Agentic AI
                    </h3>
                    <p className="text-white text-base sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Step into the future of artificial intelligence by exploring Agentic AI systems that think, reason, and act autonomously. Learn how to build intelligent, goal-driven agents capable of real-world decision making and automation using modern AI frameworks and APIs.
                    </p>
                    <div className="space-y-2 sm:space-y-3 text-white">
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Autonomous Agents</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>LLM Integration</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Real-World Applications</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-content mt-auto">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 mb-4 sm:mb-6">
                      <div className="flex items-center gap-2 text-white flex-wrap">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Team Size: 3 - 5 persons</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 sm:py-4 px-4 rounded-xl sm:rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/30 text-sm sm:text-base">
                      <Link to="/AgenticAI">Explore Domain</Link>
                    </Button>
                  </div>
                </div>

                <div className="domain-card border border-white/30 rounded-2xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-10 group hover:border-white/50 shadow-2xl flex flex-col w-full lg:flex-1" style={{ background: 'rgba(0, 0, 0, 0.85)' }} data-aos="zoom-in" data-aos-delay="300">
                  <div className="card-burst-bg">
                    <PrismaticBurst
                      intensity={2.5}
                      speed={0.08}
                      animationType="rotate"
                      colors={['#5B21B6', '#6D28D9', '#7C3AED']}
                      distort={2}
                      rayCount={6}
                      mixBlendMode="screen"
                    />
                  </div>
                  <div className="card-content text-left pb-6 sm:pb-8 flex-grow">
                    <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      UI/UX
                    </h3>
                    <p className="text-white text-base sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Master the art of designing intuitive, user-centered interfaces that blend aesthetics with functionality. Learn to craft seamless digital experiences through research, prototyping, and usability testing turning creativity into impactful design.
                    </p>
                    <div className="space-y-2 sm:space-y-3 text-white">
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>User Research & Empathy</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Wireframing & Prototyping</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Visual Design & Accessibility</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-content mt-auto">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 mb-4 sm:mb-6">
                      <div className="flex items-center gap-2 text-white flex-wrap">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Team Size: 1 - 3 persons</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 sm:py-4 px-4 rounded-xl sm:rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/30 text-sm sm:text-base">
                      <Link to="/UX">Explore Domain</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Domains;
