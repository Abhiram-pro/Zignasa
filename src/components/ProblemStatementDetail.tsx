import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GridScan } from './GridScan';
import { AnimatedBentoGrid } from './AnimatedBentoGrid';

const domainNames: Record<string, string> = {
  'webdev': 'Web Development',
  'uiux': 'UI/UX Design',
  'vibe': 'Vibe Coding',
  'ai': 'Agentic AI'
};

const ProblemStatementDetail: React.FC = () => {
  const navigate = useNavigate();
  const { domain } = useParams<{ domain: string }>();
  
  const domainName = domain ? domainNames[domain] : null;

  if (!domainName) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Domain not found</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* GridScan Background */}
        <div className="fixed inset-0 z-0">
          <GridScan
            enableWebcam={false}
            showPreview={false}
            lineThickness={1.5}
            linesColor="#9D6FEE"
            scanColor="#C084FC"
            scanOpacity={0.7}
            gridScale={0.12}
            lineStyle="solid"
            lineJitter={0.08}
            scanDirection="pingpong"
            enablePost={true}
            bloomIntensity={0.5}
            bloomThreshold={0.7}
            bloomSmoothing={0.6}
            chromaticAberration={0.002}
            noiseIntensity={0.015}
            scanGlow={1.0}
            scanSoftness={2.8}
            scanPhaseTaper={0.9}
            scanDuration={3.5}
            scanDelay={1.2}
            enableGyro={false}
            scanOnClick={false}
            sensitivity={0.4}
          />
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/problem-statements')}
          className="fixed top-6 left-6 md:top-8 md:left-8 z-50 group"
          aria-label="Go back"
        >
          <div className="relative p-2">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-lg text-white font-medium text-xs md:text-sm group-hover:text-purple-300">
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              Back
            </div>
          </div>
        </button>

        {/* Content */}
        <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h1 
                className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >
                {domainName}
              </h1>
              <p className="text-white/60 text-base sm:text-lg md:text-xl">
                Problem Statements & Challenges
              </p>
            </div>

            {/* Animated Bento Grid */}
            <AnimatedBentoGrid />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemStatementDetail;
