import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  id: string;
  text: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

interface ChatWidgetProps {
  webhookUrl?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ 
  webhookUrl = 'https://shyam.mlritcie.in/webhook/223b953b-ef97-4800-a1be-8b05890044c1/chat' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Zing😺, your AI assistant. How can I help you today?",
      type: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => `session_${Math.random().toString(36).slice(2, 9)}_${Date.now()}`);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Enhanced particle system inspired by chat.html
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      opacity: number;
      color: { r: number; g: number; b: number };
      phase: number;
      twinkle: number;
    }> = [];

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createParticles = () => {
      particles.length = 0;
      const particleCount = 80; // More flying stars
      
      // Exact colors from your image
      const starColors = [
        { r: 200, g: 168, b: 255 }, // Light purple/lavender #C8A8FF
        { r: 255, g: 105, b: 180 }, // Bright pink/magenta #FF69B4
        { r: 230, g: 230, b: 250 }  // White/pale blue #E6E6FA
      ];
      
      for (let i = 0; i < particleCount; i++) {
        const colorIndex = Math.floor(Math.random() * starColors.length);
        const color = starColors[colorIndex];
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 500,
          vx: (Math.random() - 0.5) * 2.0,
          vy: (Math.random() - 0.5) * 2.0,
          vz: (Math.random() - 0.5) * 4,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.9 + 0.5,
          color: color,
          phase: Math.random() * Math.PI * 2,
          twinkle: Math.random() * 0.3 + 0.7
        });
      }
    };

    let time = 0;
    const animate = () => {
      time += 0.03; // Faster animation
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update position with more dramatic floating motion
        particle.x += particle.vx + Math.sin(time + particle.phase) * 2.0;
        particle.y += particle.vy + Math.cos(time + particle.phase * 0.7) * 1.5;
        particle.z += particle.vz;
        
        // Wrap around edges
        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.x > canvas.width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = canvas.height + 20;
        if (particle.y > canvas.height + 20) particle.y = -20;
        if (particle.z < 0) particle.z = 500;
        if (particle.z > 500) particle.z = 0;
        
        // Calculate size and opacity with depth and twinkling
        const depth = 1 - (particle.z / 500);
        const twinkleEffect = Math.sin(time * particle.twinkle + particle.phase) * 0.5 + 0.5;
        const size = particle.size * depth * (0.8 + twinkleEffect * 0.6);
        const opacity = particle.opacity * depth * (0.6 + twinkleEffect * 0.4);
        
        // Use exact RGB colors from your image
        const { r, g, b } = particle.color;
        
        ctx.save();
        ctx.globalAlpha = opacity;
        
        // Create brighter gradient for glow effect with exact colors
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size * 4
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity * 1.2})`);
        gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${opacity * 0.9})`);
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.shadowBlur = size * 5;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw much brighter center
        ctx.globalAlpha = opacity * 1.8;
        ctx.fillStyle = `rgba(${Math.min(r + 50, 255)}, ${Math.min(g + 50, 255)}, ${Math.min(b + 50, 255)}, ${opacity * 1.2})`;
        ctx.shadowBlur = size * 2;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 0.8, 0, Math.PI * 2);
        ctx.fill();
        
        // Ultra bright core
        ctx.globalAlpha = opacity * 2.0;
        ctx.fillStyle = `rgba(${Math.min(r + 80, 255)}, ${Math.min(g + 80, 255)}, ${Math.min(b + 80, 255)}, ${opacity * 1.5})`;
        ctx.shadowBlur = size;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Initialize particles when chat opens
  useEffect(() => {
    if (isOpen) {
      const cleanup = initParticles();
      return cleanup;
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isOpen, initParticles]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const addMessage = useCallback((text: string, type: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  // Function to convert markdown to HTML
  const formatMessageToHTML = (text: string): string => {
    return text
      // Convert **bold** to <strong> tags
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert \n to <br> tags
      .replace(/\\n/g, '<br>')
      // Convert numbered lists
      .replace(/(\d+)\.\s/g, '<br>$1. ')
      // Clean up multiple line breaks
      .replace(/(<br>){3,}/g, '<br><br>')
      // Convert email addresses to clickable links
      .replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, '<a href="mailto:$1" style="color: #60a5fa; text-decoration: underline;">$1</a>')
      // Convert phone numbers to clickable links (various formats)
      .replace(/(\+?\d{1,4}[\s-]?)?(\(?\d{3,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}/g, (match) => {
        // Only convert if it looks like a phone number (has enough digits)
        const digitsOnly = match.replace(/\D/g, '');
        if (digitsOnly.length >= 10) {
          return `<a href="tel:${digitsOnly}" style="color: #60a5fa; text-decoration: underline;">${match}</a>`;
        }
        return match;
      })
      .trim();
  };

  const sendMessage = useCallback(async () => {
    const message = inputValue.trim();
    if (!message || isTyping) return;

    // Add user message
    addMessage(message, 'user');
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatInput: message,
          sessionId: sessionId
        })
      });

      if (response.ok) {
        const result = await response.text();
        let botMessage = result;

        // Try to parse JSON response
        try {
          const jsonResponse = JSON.parse(result);
          botMessage = jsonResponse.output || jsonResponse.message || jsonResponse.text || result;
        } catch {
          // Use raw text if not JSON
        }

        // Format the message to HTML
        const formattedMessage = formatMessageToHTML(botMessage || 'I received your message!');
        addMessage(formattedMessage, 'bot');
      } else {
        addMessage('Sorry, I encountered an error. Please try again.', 'bot');
      }
    } catch (error) {
      console.error('Chat error:', error);
      addMessage('Sorry, I cannot connect right now. Please try again later.', 'bot');
    } finally {
      setIsTyping(false);
    }
  }, [inputValue, isTyping, webhookUrl, sessionId, addMessage]);



  const toggleChat = useCallback(() => {
    setIsOpen(prev => {
      const newState = !prev;
      
      // Prevent body scroll on mobile when chat is open
      if (typeof window !== 'undefined' && window.innerWidth <= 640) {
        if (newState) {
          document.body.classList.add('chat-open');
          document.body.style.top = `-${window.scrollY}px`;
        } else {
          const scrollY = document.body.style.top;
          document.body.classList.remove('chat-open');
          document.body.style.top = '';
          if (scrollY) {
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
          }
        }
      }
      
      return newState;
    });
  }, []);

  return (
    <>
      {/* Notification-Style Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="group fixed bottom-4 right-4 w-14 h-14 md:w-16 md:h-16 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center z-50 hover:scale-110 backdrop-blur-xl border border-purple-400/30"
        aria-label="Chat with Zing AI"
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 25%, #a855f7 50%, #c084fc 75%, #e879f9 100%)',
          boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          animation: 'pulse-glow 3s ease-in-out infinite'
        }}
      >
        {isOpen ? (
          <svg className="w-6 h-6 md:w-7 md:h-7 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-6 h-6 md:w-7 md:h-7 text-white transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center animate-ping">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </button>

      {/* Chat Window - Compact Design */}
      {isOpen && (
        <div 
          className="chat-widget fixed bottom-20 md:bottom-24 right-4 w-[calc(100vw-2rem)] max-w-72 h-[380px] md:h-[400px] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-40"
          style={{
            background: 'linear-gradient(145deg, #0f1419 0%, #1a1f3a 25%, #252a52 50%, #1e2347 75%, #0d1117 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 15px 40px rgba(15, 20, 25, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            animation: 'slideUpScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: 'translateZ(0)',
            willChange: 'transform',
            isolation: 'isolate'
          }}
        >
          <style>{`
            @keyframes slideUpScale {
              from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-10px) rotate(180deg); }
            }
            
            @keyframes pulse {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 1; }
            }
            
            @keyframes sparkle {
              0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
              50% { transform: scale(1) rotate(180deg); opacity: 1; }
            }
            
            @keyframes glow-ring {
              0%, 100% { 
                border-color: rgba(168, 85, 247, 0.3);
                box-shadow: 0 0 5px rgba(168, 85, 247, 0.2);
              }
              50% { 
                border-color: rgba(168, 85, 247, 0.8);
                box-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
              }
            }
            
            @keyframes pulse-glow {
              0%, 100% { 
                box-shadow: 0 25px 50px rgba(139, 92, 246, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.3);
              }
              50% { 
                box-shadow: 0 30px 60px rgba(139, 92, 246, 0.8), 0 0 0 3px rgba(255, 255, 255, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.4), 0 0 20px rgba(139, 92, 246, 0.6);
              }
            }
            

          `}</style>

          {/* Particle Canvas - Transparent overlay */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none"
            style={{ zIndex: 1, background: 'transparent' }}
          />
          
          {/* Header - Glass effect */}
          <div className="relative z-10 flex items-center p-3 bg-white/5 backdrop-blur-xl border-b border-white/10">
            <div className="flex items-center space-x-2.5 w-full">
              {/* Compact Zing Logo */}
              <div className="relative">
                <div 
                  className="w-8 h-8 bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ 
                    animation: 'float 6s ease-in-out infinite',
                    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <span 
                    className="text-white text-sm font-bold"
                    style={{
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3), 0 0 4px rgba(0, 0, 0, 0.2)',
                      filter: 'drop-shadow(0 0 1px rgba(255, 255, 255, 0.3))'
                    }}
                  >
                    Z
                  </span>
                </div>
                {/* Smaller sparkle effects */}
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full" style={{ animation: 'sparkle 2s ease-in-out infinite' }}></div>
                <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-pink-400 rounded-full" style={{ animation: 'sparkle 2s ease-in-out infinite 0.5s' }}></div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-white font-bold text-base bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                  Zing
                </h3>
                <p className="text-purple-200 text-xs font-medium">AI Assistant</p>
              </div>


            </div>
          </div>

          {/* Messages Area - Compact */}
          <div 
            ref={messagesContainerRef}
            className="relative z-10 flex-1 overflow-y-auto p-3 space-y-2.5" 
            style={{ 
              scrollbarWidth: 'thin', 
              scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
              overscrollBehavior: 'contain'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Compact Avatar */}
                <div 
                  className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md ${
                    message.type === 'bot' 
                      ? 'bg-gradient-to-br from-purple-500/80 to-purple-600/80' 
                      : 'bg-gradient-to-br from-indigo-500/80 to-blue-600/80'
                  }`}
                  style={{ 
                    boxShadow: message.type === 'bot' 
                      ? '0 2px 8px rgba(139, 92, 246, 0.2)' 
                      : '0 2px 8px rgba(59, 130, 246, 0.2)'
                  }}
                >
                  {message.type === 'bot' ? (
                    <span className="text-white text-xs font-bold">Z</span>
                  ) : (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                
                {/* Glass Message Bubble */}
                <div
                  className={`max-w-[180px] px-3 py-2 rounded-xl text-xs leading-relaxed backdrop-blur-xl ${
                    message.type === 'user'
                      ? 'bg-white/15 text-white border border-white/20 rounded-br-md shadow-lg'
                      : 'bg-white/8 text-white/95 border border-white/15 rounded-bl-md shadow-lg'
                  }`}
                  style={{ backdropFilter: 'blur(15px)' }}
                  dangerouslySetInnerHTML={{ __html: message.text }}
                />
              </div>
            ))}
            
            {/* Compact Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div 
                  className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg"
                  style={{ boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)' }}
                >
                  <span className="text-white text-xs font-bold">Z</span>
                </div>
                <div 
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl rounded-bl-md px-3 py-2 shadow-md"
                >
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                    <div className="w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Glass Input Area */}
          <div className="relative z-10 p-3 bg-white/5 backdrop-blur-xl" style={{ backdropFilter: 'blur(20px)' }}>
            <div 
              className="flex items-center bg-white/8 backdrop-blur-xl rounded-2xl border border-white/15 px-3 py-2 hover:bg-white/12 transition-all duration-200 focus-within:border-white/25"
              style={{ backdropFilter: 'blur(15px)' }}
            >
              {/* Input field */}
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Send message..."
                className="flex-1 bg-transparent text-white placeholder-white/60 text-sm outline-none"
                disabled={isTyping}
              />
              
              {/* Compact Send Button */}
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isTyping}
                className={`w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center ml-2 transition-all duration-200 hover:scale-105 ${
                  inputValue.trim() ? 'opacity-100 shadow-md' : 'opacity-60'
                }`}
                style={{ boxShadow: inputValue.trim() ? '0 2px 8px rgba(139, 92, 246, 0.3)' : '0 1px 4px rgba(139, 92, 246, 0.2)' }}
              >
                {isTyping ? (
                  <div className="w-2.5 h-2.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom styles inspired by chat.html */}
      <style>{`
        /* Scrollbar styling like chat.html */
        .chat-widget div::-webkit-scrollbar {
          width: 4px;
        }
        
        .chat-widget div::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .chat-widget div::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }
        
        /* Typing animation like chat.html */
        @keyframes typing {
          0%, 80%, 100% { 
            transform: scale(0.8); 
            opacity: 0.5; 
          }
          40% { 
            transform: scale(1); 
            opacity: 1; 
          }
        }

        /* Mobile responsive adjustments */
        @media (max-width: 640px) {
          .chat-widget {
            width: calc(100vw - 2rem) !important;
            max-width: none !important;
            height: 420px !important;
            right: 1rem !important;
            bottom: 4rem !important;
            position: fixed !important;
            transform: translateZ(0) !important;
            isolation: isolate !important;
          }
          
          /* Prevent body scroll when chat is open on mobile */
          body.chat-open {
            overflow: hidden !important;
            position: fixed !important;
            width: 100% !important;
          }
        }
        
        @media (max-width: 480px) {
          .chat-widget {
            width: calc(100vw - 1rem) !important;
            height: 400px !important;
            right: 0.5rem !important;
            bottom: 3.5rem !important;
            position: fixed !important;
            transform: translateZ(0) !important;
            isolation: isolate !important;
          }
        }
      `}</style>
    </>
  );
};

export default ChatWidget;