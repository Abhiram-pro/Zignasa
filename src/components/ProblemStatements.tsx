import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import InfiniteMenu from './InfiniteMenu';

const ProblemStatements: React.FC = () => {
  const navigate = useNavigate();

  const items = [
    {
      image: '/assets/infinitemenu/webdev.png',
      link: '/problem-statements/webdev',
      title: 'WEB DEV',
      description: 'Web development problem statements'
    },
    {
      image: '/assets/infinitemenu/uiux.png',
      link: '/problem-statements/uiux',
      title: 'UI/UX',
      description: 'UI/UX design problem statements'
    },
    {
      image: '/assets/infinitemenu/vibecoding.png',
      link: '/problem-statements/vibe',
      title: 'VIBE CODING',
      description: 'Vibe coding problem statements'
    },
    {
      image: '/assets/infinitemenu/AGENTICAI.png',
      link: '/problem-statements/ai',
      title: 'AGENTIC AI',
      description: 'Agentic AI problem statements'
    }
  ];

  return (
    <div className="relative overflow-hidden" style={{ width: '100vw', height: '100vh' }}>
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 group"
        aria-label="Go back to home"
      >
        <div className="relative flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 text-white">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          Back
        </div>
      </button>

      <img
        src="/assets/infinitemenu/Group 1321320050.png"
        alt="Top Right"
        className="fixed top-6 right-6 md:top-8 md:right-8 z-50"
        style={{ maxWidth: '150px', height: 'auto' }}
      />

      <img
        src="/assets/infinitemenu/DEPARTMENT OF CSE.png"
        alt="Bottom Left"
        className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-50 max-w-[150px] md:max-w-[300px]"
        style={{ height: 'auto' }}
      />

      <div className="fixed inset-0 z-10" style={{ width: '100%', height: '100%' }}>
        <InfiniteMenu items={items} />
      </div>
    </div>
  );
};

export default ProblemStatements;
