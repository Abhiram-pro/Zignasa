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
        
        /* Ensure proper scrolling on all devices */
        html {
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
          overflow-y: auto;
        }
        
        .page-dither-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          opacity: 0.5;
        }
        
        .page-dither-bg canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
        }
        

        
        .domain-card {
          position: relative;
          overflow: hidden;
          z-index: 5;
          transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
          transform: translateY(0) scale(1);
          will-change: transform;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .card-dither-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          opacity: 0.45;
          border-radius: inherit;
          overflow: hidden;
        }
        
        .card-dither-bg canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
        }
        

        

        

        

        
        .card-content {
          position: relative;
          z-index: 2;
        }
        

        
        .domain-card:hover {
          transform: translateY(-12px) scale(1.03);
          box-shadow: 0 25px 50px -12px rgba(124, 58, 237, 0.5), 
                      0 0 0 1px rgba(255, 255, 255, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
          z-index: 10;
          border-color: rgba(124, 58, 237, 0.7);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        .domain-card:hover .card-dither-bg {
          opacity: 0.6;
        }
        

        

        

        
        .domain-card:hover .card-content {
          transform: translateZ(0);
        }
        
        @media (max-width: 768px) {
          
          html, body {
            overflow-x: hidden;
            overflow-y: auto !important;
            height: auto !important;
            min-height: 100vh;
          }
          
          #root {
            min-height: 100vh;
            height: auto !important;
            overflow-y: auto !important;
            overflow: visible !important;
          }
          
          .min-h-screen {
            min-height: auto !important;
            height: auto !important;
            overflow: visible !important;
          }
          
          /* Remove any height constraints */
          main, section, .container {
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
          }
          
          /* Minimal card spacing */
          .domain-card {
            margin-bottom: 1rem;
            overflow: hidden !important;
            position: relative;
            isolation: isolate;
          }
          

          
          /* Minimal spacing */
          .domain-card:last-child {
            margin-bottom: 0.5rem !important;
          }
          
          /* Minimal bottom padding */
          main {
            padding-bottom: 0.5rem !important;
            min-height: auto !important;
          }
          
          /* Ensure buttons are visible and content is above background */
          .domain-card .card-content {
            overflow: visible !important;
            position: relative;
            z-index: 1;
          }
          
          /* Liquid glass for mobile */
          .domain-card {
            background: rgba(255, 255, 255, 0.05) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
          }
          
          .card-dither-bg {
            opacity: 0.35 !important;
          }
          
          /* Constrain card heights and ensure proper flex behavior */
          .domain-card {
            max-height: 580px;
            min-height: 480px;
            justify-content: space-between;
          }
          
          /* Ensure card content doesn't stretch */
          .card-content {
            flex-shrink: 0;
          }
          
          /* Limit description text height with better readability */
          .domain-card p {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 1.5;
            font-size: 1rem !important;
          }
          
          /* Disable hover effects on mobile */
          .domain-card:hover {
            transform: translateY(0) scale(1) !important;
            transition: none !important;
          }
          
          /* Performance optimizations for mobile */
          * {
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            -webkit-perspective: 1000;
            perspective: 1000;
          }
          
          /* Optimize rendering layers */
          .domain-card, .card-content {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>



      <div className="min-h-screen sm:min-h-screen relative" style={{ zIndex: 10 }}>
        <Navbar />

        <main className="main pt-28 sm:pt-32 md:pt-36 lg:pt-40 relative pb-4">
          {/* Domains Section */}
          <section id="domains" className="py-6 sm:py-8 md:py-12 lg:py-16 bg-transparent border-0">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 bg-transparent border-0">
              <div className="text-center mb-6 sm:mb-12 md:mb-16 bg-transparent border-0" data-aos="fade-up">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-6 leading-tight px-4">
                  Domains For ZIGNASA - 2K25
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 sm:px-4">
                  Select your domain and unleash your creativity.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row justify-center items-stretch gap-4 sm:gap-6 md:gap-8 lg:gap-8 max-w-7xl mx-auto bg-transparent border-0 px-2 sm:px-0">
                <div className="domain-card border border-white/30 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 group hover:border-white/50 shadow-2xl flex flex-col w-full lg:flex-1 webdev-card" data-aos="zoom-in" data-aos-delay="100">
                  <div className="card-dither-bg">
                    <Dither
                      waveSpeed={0.04}
                      waveFrequency={2}
                      waveAmplitude={0.28}
                      waveColor={[0.4, 0.2, 0.5]}
                      colorNum={3}
                      pixelSize={3}
                      disableAnimation={false}
                      enableMouseInteraction={false}
                      mouseRadius={0.3}
                    />
                  </div>
                  <div className="card-content text-left pb-4 sm:pb-6 flex-grow">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Web Dev
                    </h3>
                    <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Master the complete web development stack with MongoDB, Express.js, React, and Node.js. Learn to build scalable, modern web applications from the database to the user interface, following industry best practices and real world project structures.
                    </p>
                    <div className="space-y-1.5 sm:space-y-2 text-white">
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
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base font-semibold" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Registration Fee: ₹399 Per Person</span>
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
                      <Link to="https://konfhub.com/zignasa2k25">Explore Domain</Link>
                    </Button>
                  </div>
                </div>

                <div className="domain-card border border-white/30 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 group hover:border-white/50 shadow-2xl flex flex-col w-full lg:flex-1 ai-card" data-aos="zoom-in" data-aos-delay="200">
                  <div className="card-dither-bg">
                    <Dither
                      waveSpeed={0.04}
                      waveFrequency={2}
                      waveAmplitude={0.28}
                      waveColor={[0.4, 0.2, 0.5]}
                      colorNum={3}
                      pixelSize={3}
                      disableAnimation={false}
                      enableMouseInteraction={false}
                      mouseRadius={0.3}
                    />
                  </div>
                  <div className="card-content text-left pb-4 sm:pb-6 flex-grow">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Agentic AI
                    </h3>
                    <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Step into the future of artificial intelligence by exploring Agentic AI systems that think, reason, and act autonomously. Learn how to build intelligent, goal-driven agents capable of real-world decision making and automation using modern AI frameworks and APIs.
                    </p>
                    <div className="space-y-1.5 sm:space-y-2 text-white">
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
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base font-semibold" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Registration Fee: ₹399 Per Person</span>
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
                      <Link to="https://konfhub.com/zignasa2k25">Explore Domain</Link>
                    </Button>
                  </div>
                </div>

                <div className="domain-card border border-white/30 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 group hover:border-white/50 shadow-2xl flex flex-col w-full lg:flex-1 ux-card" data-aos="zoom-in" data-aos-delay="300">
                  <div className="card-dither-bg">
                    <Dither
                      waveSpeed={0.04}
                      waveFrequency={2}
                      waveAmplitude={0.28}
                      waveColor={[0.4, 0.2, 0.5]}
                      colorNum={3}
                      pixelSize={3}
                      disableAnimation={false}
                      enableMouseInteraction={false}
                      mouseRadius={0.3}
                    />
                  </div>
                  <div className="card-content text-left pb-4 sm:pb-6 flex-grow">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      UI/UX
                    </h3>
                    <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Master the art of designing intuitive, user-centered interfaces that blend aesthetics with functionality. Learn to craft seamless digital experiences through research, prototyping, and usability testing turning creativity into impactful design.
                    </p>
                    <div className="space-y-1.5 sm:space-y-2 text-white">
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
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base font-semibold" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Registration Fee: ₹399 Per Person</span>
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
                      <Link to="https://konfhub.com/zignasa2k25">Explore Domain</Link>
                    </Button>
                  </div>
                </div>

                <div className="domain-card border border-white/30 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 group hover:border-white/50 shadow-2xl flex flex-col w-full lg:flex-1 app-card" data-aos="zoom-in" data-aos-delay="400">
                  <div className="card-dither-bg">
                    <Dither
                      waveSpeed={0.04}
                      waveFrequency={2}
                      waveAmplitude={0.28}
                      waveColor={[0.4, 0.2, 0.5]}
                      colorNum={3}
                      pixelSize={3}
                      disableAnimation={false}
                      enableMouseInteraction={false}
                      mouseRadius={0.3}
                    />
                  </div>
                  <div className="card-content text-left pb-4 sm:pb-6 flex-grow">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Vibe Coding
                    </h3>
                    <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Step into the future of development with Vibe Coding a fusion of creativity, logic, and interactivity. Participants will reimagine problem-solving through modern coding practices that emphasize innovation, design thinking, and real-time adaptability.

                    </p>
                    <div className="space-y-1.5 sm:space-y-2 text-white">
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Interactive and creative coding experiences </span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Rapid prototyping and real-world solutioning</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Cross-disciplinary innovation blending tech and design </span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-base font-semibold" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Registration Fee: ₹399 Per Person</span>
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
                      <Link to="https://konfhub.com/zignasa2k25">Explore Domain</Link>
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
