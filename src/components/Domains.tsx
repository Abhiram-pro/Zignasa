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
        
        /* Ensure proper scrolling on all devices */
        html {
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
          overflow-y: auto;
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
          transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
          transform: translateY(0) scale(1);
          will-change: transform, background;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 119, 255, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, 
              rgba(88, 28, 135, 0.4) 0%,
              rgba(124, 58, 237, 0.3) 25%, 
              rgba(67, 56, 202, 0.25) 50%, 
              rgba(30, 58, 138, 0.2) 75%, 
              rgba(15, 23, 42, 0.8) 100%);
          background-size: 400% 400%, 350% 350%, 300% 300%, 200% 200%;
          animation: galaxyFlow 6s ease-in-out infinite;
        }
        
        .domain-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #fff, transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 160px 30px, #fff, transparent),
            radial-gradient(1px 1px at 200px 60px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 50px 100px, #fff, transparent),
            radial-gradient(2px 2px at 100px 120px, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 180px 100px, #fff, transparent),
            radial-gradient(1px 1px at 220px 40px, rgba(255,255,255,0.8), transparent);
          background-repeat: repeat;
          background-size: 250px 150px;
          animation: starsMove 20s linear infinite;
          opacity: 0.8;
          pointer-events: none;
        }
        
        @keyframes galaxyFlow {
          0% {
            background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%;
            filter: brightness(1) saturate(1) hue-rotate(0deg);
          }
          25% {
            background-position: 30% 20%, 70% 80%, 80% 30%, 25% 25%;
            filter: brightness(1.1) saturate(1.2) hue-rotate(5deg);
          }
          50% {
            background-position: 60% 40%, 40% 60%, 100% 50%, 50% 50%;
            filter: brightness(1.2) saturate(1.4) hue-rotate(10deg);
          }
          75% {
            background-position: 80% 70%, 20% 30%, 70% 80%, 75% 75%;
            filter: brightness(1.1) saturate(1.2) hue-rotate(5deg);
          }
          100% {
            background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%;
            filter: brightness(1) saturate(1) hue-rotate(0deg);
          }
        }
        
        @keyframes starsMove {
          0% {
            transform: translateX(0) translateY(0);
          }
          100% {
            transform: translateX(-250px) translateY(-150px);
          }
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
          transform: translateY(-12px) scale(1.03);
          box-shadow: 0 25px 50px -12px rgba(124, 58, 237, 0.5), 
                      0 0 0 1px rgba(255, 255, 255, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
          z-index: 10;
          border-color: rgba(124, 58, 237, 0.7);
          background: 
            radial-gradient(circle at 30% 70%, rgba(120, 119, 198, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(120, 119, 255, 0.25) 0%, transparent 50%),
            linear-gradient(135deg, 
              rgba(88, 28, 135, 0.5) 0%,
              rgba(124, 58, 237, 0.4) 25%, 
              rgba(67, 56, 202, 0.35) 50%, 
              rgba(30, 58, 138, 0.3) 75%, 
              rgba(15, 23, 42, 0.9) 100%);
          background-size: 300% 300%, 280% 280%, 260% 260%, 150% 150%;
          animation: galaxyFlowHover 4s ease-in-out infinite;
        }
        
        .domain-card:hover::before {
          animation: starsMove 15s linear infinite;
          opacity: 1;
        }
        
        @keyframes galaxyFlowHover {
          0% {
            background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%;
            filter: brightness(1.2) saturate(1.3) hue-rotate(0deg);
          }
          20% {
            background-position: 40% 30%, 60% 70%, 70% 40%, 30% 30%;
            filter: brightness(1.3) saturate(1.5) hue-rotate(8deg);
          }
          40% {
            background-position: 70% 60%, 30% 40%, 90% 70%, 60% 60%;
            filter: brightness(1.4) saturate(1.7) hue-rotate(15deg);
          }
          60% {
            background-position: 90% 80%, 10% 20%, 80% 90%, 80% 80%;
            filter: brightness(1.3) saturate(1.5) hue-rotate(12deg);
          }
          80% {
            background-position: 60% 90%, 40% 10%, 60% 80%, 50% 90%;
            filter: brightness(1.25) saturate(1.4) hue-rotate(6deg);
          }
          100% {
            background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%;
            filter: brightness(1.2) saturate(1.3) hue-rotate(0deg);
          }
        }
        
        /* Desktop-specific galaxy animations */
        @media (min-width: 769px) {
          .webdev-card, .ai-card, .ux-card {
            background: 
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 119, 255, 0.15) 0%, transparent 50%),
              linear-gradient(135deg, 
                rgba(88, 28, 135, 0.4) 0%,
                rgba(124, 58, 237, 0.3) 25%, 
                rgba(67, 56, 202, 0.25) 50%, 
                rgba(30, 58, 138, 0.2) 75%, 
                rgba(15, 23, 42, 0.8) 100%) !important;
            background-size: 400% 400%, 350% 350%, 300% 300%, 200% 200% !important;
            animation: galaxyFlowDesktop 6s ease-in-out infinite !important;
          }
          
          .webdev-card::before, .ai-card::before, .ux-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              radial-gradient(2px 2px at 20px 30px, #fff, transparent),
              radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 90px 40px, #fff, transparent),
              radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
              radial-gradient(2px 2px at 160px 30px, #fff, transparent),
              radial-gradient(1px 1px at 200px 60px, rgba(255,255,255,0.7), transparent);
            background-repeat: repeat;
            background-size: 250px 150px;
            animation: starsMove 20s linear infinite;
            opacity: 0.8;
            pointer-events: none;
          }
          
          @keyframes galaxyFlowDesktop {
            0% {
              background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%;
              filter: brightness(1) saturate(1) hue-rotate(0deg);
            }
            25% {
              background-position: 30% 20%, 70% 80%, 80% 30%, 25% 25%;
              filter: brightness(1.1) saturate(1.2) hue-rotate(5deg);
            }
            50% {
              background-position: 60% 40%, 40% 60%, 100% 50%, 50% 50%;
              filter: brightness(1.2) saturate(1.4) hue-rotate(10deg);
            }
            75% {
              background-position: 80% 70%, 20% 30%, 70% 80%, 75% 75%;
              filter: brightness(1.1) saturate(1.2) hue-rotate(5deg);
            }
            100% {
              background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%;
              filter: brightness(1) saturate(1) hue-rotate(0deg);
            }
          }
        }
        
        .domain-card:hover .card-content {
          transform: translateZ(0);
        }
        
        @media (max-width: 768px) {
          .page-burst-bg {
            display: none !important;
          }
          
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
          
          /* Replace heavy PrismaticBurst with lightweight CSS plasma effect on mobile */
          .card-burst-bg {
            display: none !important;
          }
          
          /* DISABLE ALL PSEUDO-ELEMENTS - Use direct background instead */
          .domain-card::before,
          .domain-card::after {
            display: none !important;
            content: none !important;
          }
          
          /* Galaxy mobile animations for all cards - Override all other mobile styles */
          .flex.flex-col .domain-card:nth-child(1), 
          .flex.flex-col .domain-card:nth-child(2), 
          .flex.flex-col .domain-card:nth-child(3),
          .domain-card:nth-child(1), 
          .domain-card:nth-child(2), 
          .domain-card:nth-child(3) {
            background: 
              radial-gradient(circle at 25% 75%, rgba(120, 119, 198, 0.4) 0%, transparent 60%),
              radial-gradient(circle at 75% 25%, rgba(255, 119, 198, 0.3) 0%, transparent 60%),
              radial-gradient(circle at 50% 50%, rgba(120, 119, 255, 0.2) 0%, transparent 60%),
              linear-gradient(135deg, 
                rgba(88, 28, 135, 0.5) 0%,
                rgba(124, 58, 237, 0.4) 25%, 
                rgba(67, 56, 202, 0.3) 50%, 
                rgba(30, 58, 138, 0.25) 75%, 
                rgba(15, 23, 42, 0.9) 100%),
              rgba(0, 0, 0, 0.85) !important;
            background-size: 300% 300%, 280% 280%, 260% 260%, 150% 150%, 100% 100% !important;
            background-repeat: no-repeat !important;
            animation: galaxyFlowMobile 6s ease-in-out infinite !important;
            position: relative !important;
            overflow: hidden !important;
            border-radius: 0.75rem !important;
            isolation: isolate !important;
            contain: layout style paint !important;
          }
          
          .flex.flex-col .domain-card:nth-child(1)::before, 
          .flex.flex-col .domain-card:nth-child(2)::before, 
          .flex.flex-col .domain-card:nth-child(3)::before,
          .domain-card:nth-child(1)::before, 
          .domain-card:nth-child(2)::before, 
          .domain-card:nth-child(3)::before {
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 150% !important;
            height: 150% !important;
            background-image: 
              /* Very large bright stars */
              radial-gradient(6px 6px at 80px 120px, #fff, transparent),
              radial-gradient(5px 5px at 320px 280px, rgba(255,255,255,0.98), transparent),
              radial-gradient(6px 6px at 360px 240px, #fff, transparent),
              
              /* Large bright stars */
              radial-gradient(4px 4px at 280px 80px, rgba(255,255,255,0.95), transparent),
              radial-gradient(4px 4px at 240px 60px, rgba(255,255,255,0.9), transparent),
              radial-gradient(4px 4px at 60px 320px, rgba(255,255,255,0.85), transparent),
              radial-gradient(5px 5px at 200px 160px, rgba(255,255,255,0.92), transparent),
              radial-gradient(4px 4px at 120px 300px, rgba(255,255,255,0.88), transparent),
              radial-gradient(5px 5px at 340px 120px, #fff, transparent),
              
              /* Medium-large stars */
              radial-gradient(3.5px 3.5px at 160px 200px, rgba(255,255,255,0.82), transparent),
              radial-gradient(3.5px 3.5px at 340px 140px, rgba(255,255,255,0.78), transparent),
              radial-gradient(3.5px 3.5px at 48px 240px, rgba(255,255,255,0.84), transparent),
              radial-gradient(3.5px 3.5px at 300px 40px, rgba(255,255,255,0.76), transparent),
              radial-gradient(3.5px 3.5px at 380px 180px, rgba(255,255,255,0.8), transparent),
              radial-gradient(3.5px 3.5px at 140px 80px, rgba(255,255,255,0.83), transparent),
              
              /* Medium stars */
              radial-gradient(3px 3px at 180px 340px, rgba(255,255,255,0.7), transparent),
              radial-gradient(3px 3px at 120px 40px, rgba(255,255,255,0.75), transparent),
              radial-gradient(3px 3px at 32px 160px, rgba(255,255,255,0.72), transparent),
              radial-gradient(3px 3px at 260px 300px, rgba(255,255,255,0.74), transparent),
              radial-gradient(3px 3px at 90px 180px, rgba(255,255,255,0.71), transparent),
              radial-gradient(3px 3px at 310px 200px, rgba(255,255,255,0.73), transparent),
              radial-gradient(3px 3px at 180px 100px, rgba(255,255,255,0.76), transparent),
              radial-gradient(3px 3px at 40px 80px, rgba(255,255,255,0.69), transparent),
              
              /* Small-medium stars */
              radial-gradient(2.5px 2.5px at 100px 260px, rgba(255,255,255,0.64), transparent),
              radial-gradient(2.5px 2.5px at 220px 180px, rgba(255,255,255,0.67), transparent),
              radial-gradient(2.5px 2.5px at 140px 100px, rgba(255,255,255,0.66), transparent),
              radial-gradient(2.5px 2.5px at 352px 60px, rgba(255,255,255,0.63), transparent),
              radial-gradient(2.5px 2.5px at 80px 340px, rgba(255,255,255,0.65), transparent),
              radial-gradient(2.5px 2.5px at 290px 140px, rgba(255,255,255,0.68), transparent),
              
              /* Small stars */
              radial-gradient(2px 2px at 260px 220px, rgba(255,255,255,0.6), transparent),
              radial-gradient(2px 2px at 312px 100px, rgba(255,255,255,0.58), transparent),
              radial-gradient(2px 2px at 40px 300px, rgba(255,255,255,0.62), transparent),
              radial-gradient(2px 2px at 200px 300px, rgba(255,255,255,0.59), transparent),
              radial-gradient(2px 2px at 160px 60px, rgba(255,255,255,0.61), transparent),
              radial-gradient(2px 2px at 320px 160px, rgba(255,255,255,0.57), transparent),
              radial-gradient(2px 2px at 70px 200px, rgba(255,255,255,0.63), transparent),
              radial-gradient(2px 2px at 250px 40px, rgba(255,255,255,0.56), transparent),
              radial-gradient(2px 2px at 120px 220px, rgba(255,255,255,0.6), transparent),
              radial-gradient(2px 2px at 370px 280px, rgba(255,255,255,0.58), transparent),
              
              /* Small-tiny stars */
              radial-gradient(1.5px 1.5px at 88px 160px, rgba(255,255,255,0.52), transparent),
              radial-gradient(1.5px 1.5px at 232px 128px, rgba(255,255,255,0.54), transparent),
              radial-gradient(1.5px 1.5px at 152px 248px, rgba(255,255,255,0.53), transparent),
              radial-gradient(1.5px 1.5px at 72px 112px, rgba(255,255,255,0.51), transparent),
              radial-gradient(1.5px 1.5px at 168px 32px, rgba(255,255,255,0.55), transparent),
              radial-gradient(1.5px 1.5px at 20px 208px, rgba(255,255,255,0.52), transparent),
              radial-gradient(1.5px 1.5px at 340px 48px, rgba(255,255,255,0.54), transparent),
              radial-gradient(1.5px 1.5px at 190px 280px, rgba(255,255,255,0.53), transparent),
              
              /* Tiny stars */
              radial-gradient(1px 1px at 288px 192px, rgba(255,255,255,0.44), transparent),
              radial-gradient(1px 1px at 328px 220px, rgba(255,255,255,0.42), transparent),
              radial-gradient(1px 1px at 272px 312px, rgba(255,255,255,0.46), transparent),
              radial-gradient(1px 1px at 368px 328px, rgba(255,255,255,0.43), transparent),
              radial-gradient(1px 1px at 208px 112px, rgba(255,255,255,0.45), transparent),
              radial-gradient(1px 1px at 112px 168px, rgba(255,255,255,0.47), transparent),
              radial-gradient(1px 1px at 248px 352px, rgba(255,255,255,0.41), transparent),
              radial-gradient(1px 1px at 128px 20px, rgba(255,255,255,0.44), transparent),
              radial-gradient(1px 1px at 50px 140px, rgba(255,255,255,0.43), transparent),
              radial-gradient(1px 1px at 300px 260px, rgba(255,255,255,0.46), transparent),
              radial-gradient(1px 1px at 150px 320px, rgba(255,255,255,0.42), transparent),
              radial-gradient(1px 1px at 380px 100px, rgba(255,255,255,0.45), transparent),
              radial-gradient(1px 1px at 30px 60px, rgba(255,255,255,0.44), transparent),
              radial-gradient(1px 1px at 220px 240px, rgba(255,255,255,0.43), transparent),
              radial-gradient(1px 1px at 100px 360px, rgba(255,255,255,0.47), transparent),
              radial-gradient(1px 1px at 350px 20px, rgba(255,255,255,0.41), transparent),
              radial-gradient(1px 1px at 180px 140px, rgba(255,255,255,0.46), transparent),
              radial-gradient(1px 1px at 270px 180px, rgba(255,255,255,0.42), transparent),
              radial-gradient(1px 1px at 60px 280px, rgba(255,255,255,0.45), transparent),
              radial-gradient(1px 1px at 330px 340px, rgba(255,255,255,0.44), transparent) !important;
            background-repeat: no-repeat !important;
            background-size: 400px 400px !important;
            animation: starsMoveMobileFlow 20s linear infinite !important;
            opacity: 0.9 !important;
            pointer-events: none !important;
            z-index: 1 !important;
            display: block !important;
            border-radius: inherit !important;
          }
          
          @keyframes plasma-mobile {
            0% { 
              opacity: 0.6;
              transform: scale(1) rotate(0deg);
              filter: brightness(1) saturate(1);
            }
            50% { 
              opacity: 0.9;
              transform: scale(1.08) rotate(3deg);
              filter: brightness(1.2) saturate(1.3);
            }
            100% { 
              opacity: 0.7;
              transform: scale(1.04) rotate(-2deg);
              filter: brightness(1.1) saturate(1.1);
            }
          }
          
          @keyframes plasma-mobile-sync {
            0% { 
              opacity: 0.7;
              transform: scale(1) rotate(0deg);
              filter: brightness(1) saturate(1) hue-rotate(0deg);
            }
            25% {
              opacity: 0.8;
              transform: scale(1.03) rotate(1deg);
              filter: brightness(1.1) saturate(1.1) hue-rotate(3deg);
            }
            50% { 
              opacity: 0.9;
              transform: scale(1.06) rotate(2deg);
              filter: brightness(1.3) saturate(1.4) hue-rotate(5deg);
            }
            75% {
              opacity: 0.8;
              transform: scale(1.04) rotate(1deg);
              filter: brightness(1.2) saturate(1.2) hue-rotate(3deg);
            }
            100% { 
              opacity: 0.7;
              transform: scale(1.02) rotate(-1deg);
              filter: brightness(1.1) saturate(1.1) hue-rotate(0deg);
            }
          }
          
          /* Enable galaxy animations on mobile */
          .domain-card {
            transform: translateY(0) scale(1) !important;
            transition: all 0.3s ease !important;
            will-change: transform, background !important;
          }
          
          /* Disable hover effects on mobile but keep base animations */
          .domain-card:hover {
            transform: translateY(0) scale(1) !important;
            transition: none !important;
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
          
          /* Galaxy mobile animation */
          @keyframes galaxyFlowMobile {
            0% {
              background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%, 0% 0%;
              filter: brightness(1) saturate(1) hue-rotate(0deg);
            }
            25% {
              background-position: 25% 25%, 75% 75%, 75% 25%, 25% 25%, 0% 0%;
              filter: brightness(1.1) saturate(1.2) hue-rotate(5deg);
            }
            50% {
              background-position: 50% 50%, 50% 50%, 100% 50%, 50% 50%, 0% 0%;
              filter: brightness(1.2) saturate(1.4) hue-rotate(10deg);
            }
            75% {
              background-position: 75% 75%, 25% 25%, 75% 75%, 75% 75%, 0% 0%;
              filter: brightness(1.1) saturate(1.2) hue-rotate(5deg);
            }
            100% {
              background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%, 0% 0%;
              filter: brightness(1) saturate(1) hue-rotate(0deg);
            }
          }
          
          /* Mobile stars animation - flowing movement contained within tile */
          @keyframes starsMoveMobileFlow {
            0% {
              transform: translateX(0) translateY(0);
            }
            100% {
              transform: translateX(-100px) translateY(-100px);
            }
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

      {/* Page Background PrismaticBurst - Hidden on mobile */}
      <div className="page-burst-bg hidden sm:block">
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

      <div className="min-h-screen sm:min-h-screen relative" style={{ zIndex: 10 }}>
        <Navbar />

        <main className="main pt-16 sm:pt-16 md:pt-20 lg:pt-28 relative pb-4">
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
                <div className="domain-card border border-white/30 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 group hover:border-white/50 shadow-2xl flex flex-col w-full lg:flex-1 webdev-card" style={{ background: 'rgba(0, 0, 0, 0.85)' }} data-aos="zoom-in" data-aos-delay="100">
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
                  <div className="card-content text-left pb-4 sm:pb-6 flex-grow">
                    <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Web Dev
                    </h3>
                    <p className="text-white text-base sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>
                      Master the complete web development stack with MongoDB, Express.js, React, and Node.js. Learn to build scalable, modern web applications from the database to the user interface, following industry best practices and real world project structures.
                    </p>
                    <div className="space-y-1.5 sm:space-y-2 text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-sm" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>React & Modern Frontend</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-sm" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Node.js & Express Backend</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                        <span className="text-white text-sm sm:text-sm" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>MongoDB Database Design</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-content mt-auto">
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-white/10 mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 text-white">
                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
                        <span className="text-white text-sm sm:text-sm" style={{ color: '#ffffff', background: 'none', backgroundImage: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#ffffff' }}>Team Size: 3 - 5 persons</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 sm:py-3 px-4 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30 text-sm sm:text-sm">
                      <Link to="/webdev">Explore Domain</Link>
                    </Button>
                  </div>
                </div>

                <div className="domain-card border border-white/30 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 group hover:border-white/50 shadow-2xl flex flex-col w-full lg:flex-1 ai-card" style={{ background: 'rgba(0, 0, 0, 0.85)' }} data-aos="zoom-in" data-aos-delay="200">
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

                <div className="domain-card border border-white/30 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 group hover:border-white/50 shadow-2xl flex flex-col w-full lg:flex-1 ux-card" style={{ background: 'rgba(0, 0, 0, 0.85)' }} data-aos="zoom-in" data-aos-delay="300">
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
