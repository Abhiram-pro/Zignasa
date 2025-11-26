import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import InfiniteMenu from './InfiniteMenu';

const ProblemStatements: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      image: `${process.env.PUBLIC_URL}/assets/infinitemenu/webdev.png`,
      link: '/problem-statements/webdev',
      title: 'WEB DEV',
      description: 'Explore web development challenges and problem statements'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/infinitemenu/uiux.png`,
      link: '/problem-statements/uiux',
      title: 'UI/UX',
      description: 'Design challenges focused on user experience'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/infinitemenu/vibecoding.png`,
      link: '/problem-statements/vibe',
      title: 'VIBE CODING',
      description: 'Creative coding and interactive experiences'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/infinitemenu/AGENTICAI.png`,
      link: '/problem-statements/ai',
      title: 'AGENTIC AI',
      description: 'AI and machine learning problem statements'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{ width: '100vw', height: '100vh' }}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 group"
        aria-label="Go back to home"
      >
        <div className="relative p-2">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-lg font-medium text-xs md:text-sm">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            Back
          </div>
        </div>
      </button>

      {/* InfiniteMenu Component */}
      <div className="fixed inset-0 z-10" style={{ width: '100%', height: '100%' }}>
        <InfiniteMenu items={menuItems} />
      </div>
    </div>
  );
};

export default ProblemStatements;
