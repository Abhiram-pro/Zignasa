import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import Hyperspeed from './Hyperspeed';

interface ParticipantData {
  name: string;
  mobile: string;
  email: string;
  institution: string;
  clubs: string;
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
      institution: '',
      clubs: '',
      skills: '',
      linkedin: '',
      github: '',
      hackathons: ''
    }))
  );

  // Scroll animation observer
  React.useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in-view');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [teamSize]); // Re-run when team size changes to observe new participant cards

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
            institution: '',
            clubs: '',
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
  const [isCheckingTeamName, setIsCheckingTeamName] = useState(false);
  const [teamNameError, setTeamNameError] = useState<string>('');
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [currentValidationMessage, setCurrentValidationMessage] = useState<string>('');

  const getValidationMessage = useCallback(() => {
    if (!teamName.trim()) return 'Team Name is required';
    if (teamNameError) return 'Please choose a unique team name';
    if (isCheckingTeamName) return 'Checking team name availability...';
    
    for (let i = 0; i < teamSize; i++) {
      const p = participants[i];
      if (!p?.name.trim()) return `Participant ${i + 1}: Full Name is required`;
      if (!p?.mobile.trim()) return `Participant ${i + 1}: Mobile Number is required`;
      if (p?.mobile.trim() && !/^[0-9]{10}$/.test(p.mobile.trim())) return `Participant ${i + 1}: Mobile Number must be 10 digits`;
      if (!p?.email.trim()) return `Participant ${i + 1}: Email Address is required`;
      if (p?.email.trim() && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(p.email.trim())) return `Participant ${i + 1}: Invalid email format`;
      if (!p?.institution.trim()) return `Participant ${i + 1}: Institution is required`;
      if (!p?.skills.trim()) return `Participant ${i + 1}: Skills field is required`;
      if (p?.linkedin.trim() && !/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/.test(p.linkedin.trim())) return `Participant ${i + 1}: Invalid LinkedIn URL format`;
      if (p?.github.trim() && !/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/.test(p.github.trim())) return `Participant ${i + 1}: Invalid GitHub URL format`;
    }
    return '';
  }, [teamName, teamNameError, isCheckingTeamName, teamSize, participants]);

  const isFormValid = useMemo(() => {
    if (!teamName.trim() || teamNameError || isCheckingTeamName) return false;
    
    // Stricter email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^[0-9]{10}$/;
    const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
    
    for (let i = 0; i < teamSize; i++) {
      const p = participants[i];
      
      // Check required fields
      if (!p?.name.trim() || !p?.mobile.trim() || !p?.email.trim() || !p?.institution.trim() || !p?.skills.trim()) {
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

  const checkTeamNameUniqueness = useCallback(async (name: string) => {
    if (!name.trim()) {
      setTeamNameError('');
      return;
    }
    
    setIsCheckingTeamName(true);
    try {
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxv23zVZmS1SwPJU5ahu1qgw0GOma4_LW4ka5XnyHZCtozGkvmxQJiXf0y65H-kp3Ex8Q/exec';
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=checkTeamName&teamName=${encodeURIComponent(name.trim())}`);
      const data = await response.json();
      
      if (data.exists) {
        setTeamNameError('This team name is already taken. Please choose a different name.');
      } else {
        setTeamNameError('');
      }
    } catch (error) {
      console.error('Error checking team name:', error);
      // Don't block submission if check fails
      setTeamNameError('');
    } finally {
      setIsCheckingTeamName(false);
    }
  }, []);

  const handleTeamNameChange = useCallback((value: string) => {
    setTeamName(value);
    // Debounce the uniqueness check
    const timeoutId = setTimeout(() => {
      checkTeamNameUniqueness(value);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [checkTeamNameUniqueness]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) {
      alert('Please enter a team name');
      return;
    }
    if (teamNameError) {
      alert('Please choose a unique team name');
      return;
    }
    for (let i = 0; i < participants.length; i++) {
      const p = participants[i];
      if (!p.name.trim() || !p.mobile.trim() || !p.email.trim() || !p.institution.trim() || !p.skills.trim()) {
        alert(`Please fill all required fields for Participant ${i + 1}`);
        return;
      }
    }
    setIsSubmitting(true);
    try {
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbybEh8BbYW8SRyKs5Wf77AgT4DzZInw24aivM00aqXGUDw9pFsF5gFVpyUEmMW88Yochw/exec';

      // Prepare data for Google Sheets - each participant as a separate row
      const formData = participants.slice(0, teamSize).map(participant => ({
        teamName: teamName,
        fullName: participant.name,
        mobileNumber: participant.mobile,
        emailAddress: participant.email,
        institution: participant.institution,
        clubs: participant.clubs || '',
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
        institution: '',
        clubs: '',
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
    <div className="min-h-screen bg-black relative overflow-x-hidden smooth-scroll" style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
      {/* Liquid Glass Back Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 md:top-8 md:left-8 z-[60] group"
        aria-label="Go back to home"
        style={{ margin: '0', padding: '0' }}
      >
        <div className="relative p-2">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-lg text-white font-medium text-xs md:text-sm group-hover:text-purple-300">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            Back
          </div>
        </div>
      </button>
      
      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="fixed top-4 right-4 md:top-8 md:right-8 z-50 animate-slide-in max-w-[calc(100vw-2rem)]">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl shadow-2xl flex items-center gap-2 md:gap-3 border border-green-400/30">
            <svg className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-bold text-sm md:text-base">Registration Successful!</p>
              <p className="text-xs md:text-sm text-green-100">Redirecting to home...</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Background Layer - Aurora */}
      <div className="fixed inset-0 z-0 bg-black pointer-events-none">
        <Hyperspeed
         effectOptions={{
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 4,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0xFFFFFF,
      brokenLines: 0xFFFFFF,
      leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
      rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
      sticks: 0x03B3C3,
    }
  }}
        />
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="text-center mb-12 md:mb-16 lg:mb-20 max-w-6xl mx-auto py-4 md:py-8 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight mb-3 md:mb-4 animate-bounce-in">
            <span className="hero-title-animated">Open Challenge</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 lg:mb-8 tracking-wide hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            ZIGNASA 2K25
          </h2>
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6 lg:mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="h-px w-12 md:w-20 hero-line"></div>
            <div className="w-2 h-2 rounded-full hero-dot animate-pulse-smooth"></div>
            <div className="h-px w-12 md:w-20 hero-line"></div>
          </div>
          <p className="text-base md:text-lg lg:text-xl mb-4 md:mb-6 font-light hero-paragraph animate-fade-in-up px-4" style={{ animationDelay: '0.3s' }}>
            Register your team for the <span className="hero-highlight font-semibold">ultimate challenge</span>
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 backdrop-blur-sm rounded-full animate-fade-in-up transition-transform duration-500 ease-out" style={{ background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)', animationDelay: '0.4s', willChange: 'transform', transform: 'translateZ(0)' }}>
            <div className="w-2 h-2 rounded-full hero-dot animate-pulse-smooth flex-shrink-0"></div>
            <span className="text-xs md:text-sm lg:text-base font-medium hero-registration-text whitespace-nowrap">Registration Open</span>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
            <div className="backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 hover:border-white/30 hover-scale transition-all duration-500 ease-out scroll-animate" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 pb-3 border-b border-white/10 flex items-center gap-3">
                <span className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full shadow-lg"></span>
                Team Details
              </h2>
              <div className="mb-6">
                <Label className="text-gray-300 mb-2 block font-medium text-sm">Team Name *</Label>
                <div className="relative">
                  <input
                    type="text"
                    name="team-name"
                    id="team-name"
                    autoComplete="off"
                    value={teamName}
                    onChange={(e) => handleTeamNameChange(e.target.value)}
                    required
                    className={`${inputClass} ${teamNameError ? 'border-red-400' : ''}`}
                    placeholder="Enter your unique team name"
                  />
                  {isCheckingTeamName && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                {teamNameError && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <span>⚠️</span>
                    {teamNameError}
                  </p>
                )}
                {teamName.trim() && !teamNameError && !isCheckingTeamName && (
                  <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                    <span>✓</span>
                    Team name is available
                  </p>
                )}
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block font-medium text-sm">Select Team Size *</Label>
                <select
                  name="team-size"
                  id="team-size"
                  autoComplete="off"
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
                className="backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 hover:border-white/30 hover-scale transition-all duration-500 ease-out scroll-animate"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', transitionDelay: `${index * 0.1}s` }}
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
                      name={`participant-${index}-name`}
                      id={`participant-${index}-name`}
                      autoComplete="name"
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
                      name={`participant-${index}-mobile`}
                      id={`participant-${index}-mobile`}
                      autoComplete="tel-national"
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
                      name={`participant-${index}-email`}
                      id={`participant-${index}-email`}
                      autoComplete="email"
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
                    <Label className="text-gray-300 mb-2 block font-medium text-sm">Institution *</Label>
                    <input
                      type="text"
                      name={`participant-${index}-institution`}
                      id={`participant-${index}-institution`}
                      autoComplete="organization"
                      value={participant.institution}
                      onChange={(e) => handleParticipantChange(index, 'institution', e.target.value)}
                      required
                      className={inputClass}
                      placeholder="Enter your institution name"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block font-medium text-sm">Clubs</Label>
                    <input
                      type="text"
                      name={`participant-${index}-clubs`}
                      id={`participant-${index}-clubs`}
                      autoComplete="off"
                      value={participant.clubs}
                      onChange={(e) => handleParticipantChange(index, 'clubs', e.target.value)}
                      className={inputClass}
                      placeholder="e.g., Coding Club, Robotics Club..."
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block font-medium text-sm">Mention Your Skills *</Label>
                    <textarea
                      name={`participant-${index}-skills`}
                      id={`participant-${index}-skills`}
                      autoComplete="off"
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
                      name={`participant-${index}-linkedin`}
                      id={`participant-${index}-linkedin`}
                      autoComplete="url"
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
                      name={`participant-${index}-github`}
                      id={`participant-${index}-github`}
                      autoComplete="url"
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
                      name={`participant-${index}-hackathons`}
                      id={`participant-${index}-hackathons`}
                      autoComplete="off"
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
            <div className="flex justify-center pt-6 pb-8 scroll-animate">
              <div className="relative">
                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  onClick={(e) => {
                    if (!isFormValid && !isSubmitting) {
                      e.preventDefault();
                      const message = getValidationMessage();
                      if (message) {
                        setCurrentValidationMessage(message);
                        setShowValidationMessage(true);
                        setTimeout(() => setShowValidationMessage(false), 5000);
                      }
                    }
                  }}
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-bold py-4 px-16 rounded-xl text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 ease-out hover:scale-110 active:scale-95 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
                  style={{ willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </Button>
                {showValidationMessage && currentValidationMessage && (
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-max max-w-sm animate-fade-in z-10">
                    <div className="bg-red-500/95 backdrop-blur-md text-white px-5 py-3 rounded-lg shadow-2xl text-sm font-medium border border-red-400/40 flex items-start gap-2">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>{currentValidationMessage}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <style>{`
        /* Performance optimizations */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        html {
          scroll-behavior: smooth;
          overflow-y: scroll;
          scroll-padding-top: 2rem;
        }
        
        /* Smooth scrolling with momentum */
        .smooth-scroll {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          overflow-y: auto;
          overscroll-behavior-y: contain;
        }
        
        /* Custom scrollbar styling */
        .smooth-scroll::-webkit-scrollbar {
          width: 8px;
        }
        
        .smooth-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        
        .smooth-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #a855f7, #ec4899);
          border-radius: 4px;
        }
        
        .smooth-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #9333ea, #db2777);
        }
        
        /* Firefox scrollbar */
        .smooth-scroll {
          scrollbar-width: thin;
          scrollbar-color: #a855f7 rgba(0, 0, 0, 0.3);
        }
        
        /* GPU acceleration for smooth animations */
        .animate-bounce-in,
        .animate-fade-in-up,
        .animate-slide-in-up,
        .animate-pulse-smooth {
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        /* Bouncy entrance animations */
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-50px) translateZ(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateZ(0);
          }
          70% {
            transform: scale(0.95) translateZ(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateZ(0);
          }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px) translateZ(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }
        
        @keyframes slide-in-up {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.95) translateZ(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) translateZ(0);
          }
        }
        
        @keyframes pulse-smooth {
          0%, 100% {
            transform: scale(1) translateZ(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.3) translateZ(0);
            opacity: 0.8;
          }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        
        .animate-pulse-smooth {
          animation: pulse-smooth 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Smooth hover transitions with GPU acceleration */
        .hover-scale {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
          transform: translateZ(0);
        }
        
        .hover-scale:hover {
          transform: scale(1.01) translateZ(0);
        }
        
        /* Scroll-triggered animations */
        .scroll-animate {
          opacity: 0;
          transform: translateY(40px) scale(0.95) translateZ(0);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .scroll-animate.animate-in-view {
          opacity: 1;
          transform: translateY(0) scale(1) translateZ(0);
        }
        
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
        
        /* Fade in animation for validation message */
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

      `}</style>
    </div>
  );
};

export default OpenChallenge;
