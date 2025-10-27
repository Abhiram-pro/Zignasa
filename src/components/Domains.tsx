import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Users } from 'lucide-react';
import { Navbar } from './ui/navbar';

const Domains: React.FC = () => {

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="main bg-black pt-20 md:pt-24 lg:pt-28">
        {/* Domains Section */}
        <section id="domains" className="py-8 sm:py-12 md:py-16 lg:py-28 bg-black border-0">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 bg-transparent border-0">
            <div className="text-center mb-12 sm:mb-16 md:mb-20 bg-transparent border-0" data-aos="fade-up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Domains For ZIGNASA - 2K25
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
                Choose your domains among the three to LIT the FIRE
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-full mx-auto bg-transparent border-0">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-300 group hover:bg-white/8 hover:border-white/20 shadow-2xl flex flex-col min-h-[350px] sm:min-h-[380px] md:min-h-[420px]" data-aos="zoom-in" data-aos-delay="100">
                <div className="text-left pb-6 sm:pb-8 flex-grow">
                  <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>
                    Web Dev
                  </h3>
                  <p className="text-white text-base sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>
                    Dive deep into the world of data analytics, machine learning, and cloud computing. Learn to extract meaningful insights from complex datasets using modern cloud platforms and cutting-edge tools.
                  </p>
                  <div className="space-y-2 sm:space-y-3 text-white">
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                      <span className="text-white text-sm sm:text-base" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>Machine Learning & AI</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                      <span className="text-white text-sm sm:text-base" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>Cloud Platforms (AWS, Azure, GCP)</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                      <span className="text-white text-sm sm:text-base" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>Data Visualization & Analytics</span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 text-white flex-wrap">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-white text-sm sm:text-base" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>Team Size: 1 - 5 persons</span>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 sm:py-4 px-4 rounded-xl sm:rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/30 text-sm sm:text-base">
                    <Link to="/webdev">Explore Domain</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-300 group hover:bg-white/8 hover:border-white/20 shadow-2xl flex flex-col min-h-[350px] sm:min-h-[380px] md:min-h-[420px]" data-aos="zoom-in" data-aos-delay="200">
                <div className="text-left pb-6 sm:pb-8 flex-grow">
                  <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>
                    Agentic AI
                  </h3>
                  <p className="text-white text-base sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>
                    Master the complete web development stack with MongoDB, Express.js, React, and Node.js. Build scalable, modern web applications from database to user interface.
                  </p>
                  <div className="space-y-2 sm:space-y-3 text-white">
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                      <span className="text-white text-sm sm:text-base" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>React & Modern Frontend</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                      <span className="text-white text-sm sm:text-base" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>Node.js & Express Backend</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                      <span className="text-white text-sm sm:text-base" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>MongoDB Database Design</span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 text-white flex-wrap">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-white text-sm sm:text-base" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>Team Size: 1 - 5 persons</span>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 sm:py-4 px-4 rounded-xl sm:rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/30 text-sm sm:text-base">
                    <Link to="/AgenticAI">Explore Domain</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-300 group hover:bg-white/8 hover:border-white/20 shadow-2xl md:col-span-1 lg:col-span-1 flex flex-col min-h-[350px] sm:min-h-[380px] md:min-h-[420px]" data-aos="zoom-in" data-aos-delay="300">
                <div className="text-left pb-6 sm:pb-8 flex-grow">
                  <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>
                    UI/UX
                  </h3>
                  <p className="text-white text-base sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>
                    Combine artificial intelligence with modern web development. Create intelligent applications that leverage AI APIs, machine learning models, and smart automation.
                  </p>
                  <div className="space-y-2 sm:space-y-3 text-white">
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                      <span className="text-white text-sm sm:text-base" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>AI Integration & APIs</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                      <span className="text-white text-sm sm:text-base" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>Intelligent User Interfaces</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 sm:mt-0 flex-shrink-0"></div>
                      <span className="text-white text-sm sm:text-base" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>Automated Web Solutions</span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 text-white flex-wrap">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-white text-sm sm:text-base" style={{color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff'}}>Team Size: 1 - 5 persons</span>
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
  );
};

export default Domains;
