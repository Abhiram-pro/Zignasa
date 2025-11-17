import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from './ui/label';
import { Button } from './ui/button';
import FloatingLines from './FloatingLines';

interface ParticipantData {
  name: string;
  mobile: string;
  email: string;
  skills: string;
  linkedin: string;
  github: string;
  hackathons: string;
}

const inputClass = "w-full bg-transparent border border-white/30 text-white rounded-xl h-12 px-4 focus:ring-2 focus:ring-pink-400/60 focus:border-pink-400/60 transition-colors duration-200 placeholder:text-gray-400 hover:border-white/40 invalid:border-red-400/50";
const textareaClass = "w-full bg-transparent border border-white/30 text-white rounded-xl p-4 focus:ring-2 focus:ring-pink-400/60 focus:border-pink-400/60 transition-colors duration-200 resize-none placeholder:text-gray-400 hover:border-white/40 invalid:border-red-400/50";

const OpenChallenge: React.FC = () => {
  const navigate = useNavigate();
  const [teamSize, setTeamSize] = useState<number>(3);
  const [teamName, setTeamName] = useState<string>('');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [participants, setParticipants] = useState<ParticipantData[]>(
    Array(3).fill(null).map(() => ({
      name: '',
      mobile: '',
      email: '',
      skills: '',
      linkedin: '',
      github: '',
      hackathons: ''
    }))
  );

  const handleTeamSizeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    setTeamSize(newSize);
    setParticipants(prev => {
      if (newSize > prev.length) {
        const newParticipants = [...prev];
        for (let i = prev.length; i < newSize; i++) {
          newParticipants.push({
            name: '',
            mobile: '',
            email: '',
            skills: '',
            linkedin: '',
            github: '',
            hackathons: ''
          });
        }
        return newParticipants;
      }
      return prev.slice(0, newSize);
    });
  }, []);

  const handleParticipantChange = useCallback((index: number, field: keyof ParticipantData, value: string) => {
    setParticipants(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    
    // Real-time email validation
    if (field === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const errorKey = `${index}-email`;
      
      if (value.trim() && !emailRegex.test(value.trim())) {
        setValidationErrors(prev => ({ 
          ...prev, 
          [errorKey]: 'Invalid email format. Must include @ and domain (e.g., user@gmail.com)' 
        }));
      } else {
        setValidationErrors(prev => {
          const { [errorKey]: _, ...rest } = prev;
          return rest;
        });
      }
    }
    
    // Real-time URL validation for LinkedIn and GitHub
    if (field === 'linkedin' || field === 'github') {
      const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
      const errorKey = `${index}-${field}`;
      
      if (value.trim() && !urlRegex.test(value.trim())) {
        setValidationErrors(prev => ({ 
          ...prev, 
          [errorKey]: 'Invalid URL. Must start with http:// or https://' 
        }));
      } else {
        setValidationErrors(prev => {
          const { [errorKey]: _, ...rest } = prev;
          return rest;
        });
      }
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const isFormValid = useMemo(() => {
    if (!teamName.trim()) return false;
    
    // Stricter email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^[0-9]{10}$/;
    const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
    
    for (let i = 0; i < teamSize; i++) {
      const p = participants[i];
      
      // Check required fields
      if (!p?.name.trim() || !p?.mobile.trim() || !p?.email.trim() || !p?.skills.trim()) {
        return false;
      }
      
      // Validate email format
      if (!emailRegex.test(p.email.trim())) {
        return false;
      }
      
      // Validate mobile number
      if (!mobileRegex.test(p.mobile.trim())) {
        return false;
      }
      
      // Validate LinkedIn URL if provided
      if (p.linkedin.trim() && !urlRegex.test(p.linkedin.trim())) {
        return false;
      }
      
      // Validate GitHub URL if provided
      if (p.github.trim() && !urlRegex.test(p.github.trim())) {
        return false;
      }
    }
    return true;
  }, [teamName, teamSize, participants]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) {
      alert('Please enter a team name');
      return;
    }
    for (let i = 0; i < participants.length; i++) {
      const p = participants[i];
      if (!p.name.trim() || !p.mobile.trim() || !p.email.trim() || !p.skills.trim()) {
        alert(`Please fill all required fields for Participant ${i + 1}`);
        return;
      }
    }
    setIsSubmitting(true);
    try {
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyGlhve3s5X3Dxt-Mg6p5bwbtdFAf5-gmbpRV3Eg3upHI4C-oC3by-Zxu7gzcHFtrzf5Q/exec';

      // Prepare data for Google Sheets - each participant as a separate row
      const formData = participants.slice(0, teamSize).map(participant => ({
        teamName: teamName,
        fullName: participant.name,
        mobileNumber: participant.mobile,
        emailAddress: participant.email,
        skills: participant.skills,
        linkedinProfile: participant.linkedin || '',
        githubProfile: participant.github || '',
        hackathonsExperience: participant.hackathons || '',
        timestamp: new Date().toLocaleString()
      }));

      console.log('Submitting to:', GOOGLE_SCRIPT_URL);
      console.log('Data:', formData);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);

      // Show success notification
      setShowSuccessNotification(true);
      
      // Reset form
      setTeamName('');
      setTeamSize(3);
      setParticipants(Array(3).fill(null).map(() => ({
        name: '',
        mobile: '',
        email: '',
        skills: '',
        linkedin: '',
        github: '',
        hackathons: ''
      })));

      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert('Failed to submit registration. Please try again. Error: ' + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'transparent' }}>
      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="fixed top-8 right-8 z-50 animate-slide-in">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-green-400/30">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-bold">Registration Successful!</p>
              <p className="text-sm text-green-100">Redirecting to home...</p>
            </div>
          </div>
        </div>
      )}
      <div className="fixed inset-0 z-0" style={{ opacity: 0.53 }}>
        <FloatingLines
          linesGradient={['#3b82f6', '#8b5cf6', '#a855f7', '#ec4899']}
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[8, 10, 8]}
          lineDistance={[6, 7, 6]}
          topWavePosition={{ x: -15.0, y: 1.2, rotate: -0.15 }}
          middleWavePosition={{ x: -8.0, y: 0.0, rotate: 0.0 }}
          bottomWavePosition={{ x: -2.0, y: -1.2, rotate: 0.15 }}
          animationSpeed={0.5}
          interactive={true}
          parallax={true}
          parallaxStrength={0.15}
          bendRadius={8.0}
          bendStrength={-0.3}
          mouseDamping={0.1}
          mixBlendMode="screen"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16" style={{ background: 'transparent' }}>
        <div className="text-center mb-16 md:mb-20 max-w-6xl mx-auto py-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight mb-4">
            <span className="hero-title-animated">Open Challenge</span>
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wide hero-subtitle">
            ZIGNASA 2K25
          </h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-20 hero-line"></div>
            <div className="w-2 h-2 rounded-full hero-dot"></div>
            <div className="h-px w-20 hero-line"></div>
          </div>
          <p className="text-lg md:text-xl mb-6 font-light hero-paragraph">
            Register your team for the <span className="hero-highlight font-semibold">ultimate challenge</span>
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 backdrop-blur-sm rounded-full" style={{ background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
            <div className="w-2 h-2 rounded-full hero-dot"></div>
            <span className="text-sm md:text-base font-medium hero-registration-text">Registration Open</span>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 hover:border-white/30 transition-all duration-300" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 pb-3 border-b border-white/10 flex items-center gap-3">
                <span className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full shadow-lg"></span>
                Team Details
              </h2>
              <div className="mb-6">
                <Label className="text-gray-300 mb-2 block font-medium text-sm">Team Name *</Label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="Enter your team name"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block font-medium text-sm">Select Team Size *</Label>
                <select
                  value={teamSize}
                  onChange={handleTeamSizeChange}
                  className={inputClass}
                >
                  <option value={3} className="bg-black/80 text-white">3 Participants</option>
                  <option value={4} className="bg-black/80 text-white">4 Participants</option>
                  <option value={5} className="bg-black/80 text-white">5 Participants</option>
                </select>
              </div>
            </div>
            {participants.slice(0, teamSize).map((participant, index) => (
              <div
                key={`participant-${index}`}
                className="backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 hover:border-white/30 transition-all duration-300"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-6 pb-3 border-b border-white/10 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-bold shadow-lg">
                    {index + 1}
                  </span>
                  Participant {index + 1} of {teamSize}
                </h3>
                <div className="space-y-5">
                  <div>
                    <Label className="text-gray-300 mb-2 block font-medium text-sm">Full Name *</Label>
                    <input
                      type="text"
                      value={participant.name}
                      onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                      required
                      className={inputClass}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block font-medium text-sm">Mobile Number *</Label>
                    <input
                      type="tel"
                      value={participant.mobile}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        handleParticipantChange(index, 'mobile', value);
                      }}
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      className={inputClass}
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block font-medium text-sm">Email Address *</Label>
                    <input
                      type="email"
                      value={participant.email}
                      onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                      required
                      className={`${inputClass} ${validationErrors[`${index}-email`] ? 'border-red-400' : ''}`}
                      placeholder="your.email@example.com"
                    />
                    {validationErrors[`${index}-email`] && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <span>⚠️</span>
                        {validationErrors[`${index}-email`]}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block font-medium text-sm">Mention Your Skills *</Label>
                    <textarea
                      value={participant.skills}
                      onChange={(e) => handleParticipantChange(index, 'skills', e.target.value)}
                      required
                      rows={3}
                      className={textareaClass}
                      placeholder="e.g., React, Node.js, Python, Machine Learning..."
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block font-medium text-sm">LinkedIn Profile</Label>
                    <input
                      type="url"
                      value={participant.linkedin}
                      onChange={(e) => handleParticipantChange(index, 'linkedin', e.target.value)}
                      className={`${inputClass} ${validationErrors[`${index}-linkedin`] ? 'border-red-400' : ''}`}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                    {validationErrors[`${index}-linkedin`] && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <span>⚠️</span>
                        {validationErrors[`${index}-linkedin`]}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block font-medium text-sm">GitHub Profile</Label>
                    <input
                      type="url"
                      value={participant.github}
                      onChange={(e) => handleParticipantChange(index, 'github', e.target.value)}
                      className={`${inputClass} ${validationErrors[`${index}-github`] ? 'border-red-400' : ''}`}
                      placeholder="https://github.com/yourusername"
                    />
                    {validationErrors[`${index}-github`] && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <span>⚠️</span>
                        {validationErrors[`${index}-github`]}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block font-medium text-sm">Participated in any Hackathons? (If yes, mention details or share links)</Label>
                    <textarea
                      value={participant.hackathons}
                      onChange={(e) => handleParticipantChange(index, 'hackathons', e.target.value)}
                      rows={3}
                      className={textareaClass}
                      placeholder="Share your hackathon experience, achievements, or project links..."
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center pt-6 pb-8">
              <Button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-bold py-4 px-16 rounded-xl text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 will-change-transform"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        /* Override global black background for this page */
        html {
          background: #000 !important;
        }
        
        body {
          background: transparent !important;
          background-color: transparent !important;
        }
        
        #root {
          background: transparent !important;
          background-color: transparent !important;
        }
        
        .container {
          background: transparent !important;
          background-color: transparent !important;
        }
        

        
        /* Unified color animation for all hero elements */
        @keyframes smoothColorShift {
          0% {
            color: #3b82f6 !important;
          }
          33% {
            color: #a855f7 !important;
          }
          66% {
            color: #ec4899 !important;
          }
          100% {
            color: #3b82f6 !important;
          }
        }
        
        @-webkit-keyframes smoothColorShift {
          0% {
            color: #3b82f6 !important;
          }
          33% {
            color: #a855f7 !important;
          }
          66% {
            color: #ec4899 !important;
          }
          100% {
            color: #3b82f6 !important;
          }
        }
        
        @keyframes smoothGradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        

        
        .hero-title-animated {
          background: linear-gradient(
            120deg,
            #3b82f6 0%,
            #8b5cf6 20%,
            #a855f7 40%,
            #ec4899 60%,
            #f472b6 80%,
            #3b82f6 100%
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: smoothGradientFlow 6s ease-in-out infinite;
          font-weight: 900;
          text-transform: capitalize;
          letter-spacing: 0.05em;
          filter: drop-shadow(0 0 25px rgba(168, 85, 247, 0.5));
        }
        
        .hero-subtitle {
          animation: smoothColorShift 6s ease-in-out infinite;
          opacity: 0.95;
          font-weight: 700;
        }
        
        .hero-line {
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          animation: smoothColorShift 6s ease-in-out infinite;
        }
        
        .hero-dot {
          animation: smoothColorShift 6s ease-in-out infinite;
          background-color: currentColor;
          box-shadow: 0 0 10px currentColor;
        }
        
        .hero-paragraph {
          color: #d1d5db;
        }
        
        .hero-paragraph .hero-highlight {
          background: linear-gradient(
            120deg,
            #3b82f6 0%,
            #8b5cf6 20%,
            #a855f7 40%,
            #ec4899 60%,
            #f472b6 80%,
            #3b82f6 100%
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: smoothGradientFlow 6s ease-in-out infinite;
          font-weight: 700;
        }
        
        .hero-registration-text {
          background: linear-gradient(
            120deg,
            #3b82f6 0%,
            #8b5cf6 20%,
            #a855f7 40%,
            #ec4899 60%,
            #f472b6 80%,
            #3b82f6 100%
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: smoothGradientFlow 6s ease-in-out infinite;
          font-weight: 600;
        }
        
        /* Fix dropdown arrow alignment */
        select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1.25rem;
          padding-right: 3rem;
        }
        
        /* Success notification animation */
        @keyframes slide-in {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }

      `}</style>
    </div>
  );
};

export default OpenChallenge;
