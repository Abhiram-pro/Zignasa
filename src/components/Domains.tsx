import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Users } from 'lucide-react';
import { Navbar } from './ui/navbar';
import Dither from './Dither';

const Domains: React.FC = () => {

  return (
    <>
      <style>{`
        html, body, #root {
          background: #000 !important;
        }
        
        .dither-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        
        .dither-wrapper canvas {
          width: 100% !important;
          height: 100% !important;
          display: block;
        }
        
        @media (max-width: 768px) {
          .dither-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100vw;
            height: 100vh;
            min-height: -webkit-fill-available;
          }
        }
      `}</style>

      {/* Dither Background - Fixed full screen */}
      <div className="dither-wrapper" style={{ opacity: 0.5 }}>
        <Dither
          waveColor={[0.4, 0.2, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={false}
          mouseRadius={0.3}
          colorNum={3}
          waveAmplitude={0.28}
          waveFrequency={2}
          waveSpeed={0.04}
        />
      </div>

      <div className="min-h-screen relative" style={{ zIndex: 1, background: 'transparent', position: 'relative' }}>
        <Navbar />

        <main className="main pt-12 sm:pt-16 md:pt-20 lg:pt-28 relative">
          {/* Domains Section */}
          <section id="domains" className="py-8 sm:py-12 md:py-16 lg:py-28 bg-transparent border-0" style={{ height: '1830px' }}>
            <div className="container mx-auto px-4 sm:px-6 md:px-8 bg-transparent border-0">
              <div className="text-center mb-12 sm:mb-16 md:mb-20 bg-transparent border-0" data-aos="fade-up">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Domains For ZIGNASA - 2K25
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
                  Select your domain and unleash your creativity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-full mx-auto bg-transparent border-0">
                <div className="border border-white/30 rounded-2xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-300 group hover:border-white/50 shadow-2xl flex flex-col" style={{ background: 'rgba(0, 0, 0, 0.3)' }} data-aos="zoom-in" data-aos-delay="100">
                  <div className="text-left pb-6 sm:pb-8 flex-grow">
                    <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Web Dev
                    </h3>
                    <p className="text-white text-base sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Master the complete web development stack with MongoDB, Express.js, React, and Node.js. Learn to build scalable, modern web applications from the database to the user interface, following industry best practices and real world project structures.
                    </p>
                    <div className="space-y-2 sm:space-y-3 text-white">
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>React & Modern Frontend</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Node.js & Express Backend</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>MongoDB Database Design</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 mb-4 sm:mb-6">
                      <div className="flex items-center gap-2 text-white flex-wrap">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Team Size: 1 - 5 persons</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 sm:py-4 px-4 rounded-xl sm:rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/30 text-sm sm:text-base">
                      <Link to="/webdev">Explore Domain</Link>
                    </Button>
                  </div>
                </div>

                <div className="border border-white/30 rounded-2xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-300 group hover:border-white/50 shadow-2xl flex flex-col" style={{ background: 'rgba(0, 0, 0, 0.3)' }} data-aos="zoom-in" data-aos-delay="200">
                  <div className="text-left pb-6 sm:pb-8 flex-grow">
                    <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Agentic AI
                    </h3>
                    <p className="text-white text-base sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Step into the future of artificial intelligence by exploring Agentic AI systems that think, reason, and act autonomously. Learn how to build intelligent, goal-driven agents capable of real-world decision making and automation using modern AI frameworks and APIs.
                    </p>
                    <div className="space-y-2 sm:space-y-3 text-white">
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Autonomous Agents</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>LLM Integration</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Real-World Applications</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 mb-4 sm:mb-6">
                      <div className="flex items-center gap-2 text-white flex-wrap">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Team Size: 1 - 5 persons</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 sm:py-4 px-4 rounded-xl sm:rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/30 text-sm sm:text-base">
                      <Link to="/AgenticAI">Explore Domain</Link>
                    </Button>
                  </div>
                </div>

                <div className="border border-white/30 rounded-2xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-300 group hover:border-white/50 shadow-2xl md:col-span-1 lg:col-span-1 flex flex-col" style={{ background: 'rgba(0, 0, 0, 0.3)' }} data-aos="zoom-in" data-aos-delay="300">
                  <div className="text-left pb-6 sm:pb-8 flex-grow">
                    <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      UI/UX
                    </h3>
                    <p className="text-white text-base sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Master the art of designing intuitive, user-centered interfaces that blend aesthetics with functionality. Learn to craft seamless digital experiences through research, prototyping, and usability testing turning creativity into impactful design.
                    </p>
                    <div className="space-y-2 sm:space-y-3 text-white">
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>User Research & Empathy</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Wireframing & Prototyping</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Visual Design & Accessibility</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 mb-4 sm:mb-6">
                      <div className="flex items-center gap-2 text-white flex-wrap">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
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
