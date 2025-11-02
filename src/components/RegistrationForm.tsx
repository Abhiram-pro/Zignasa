import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Users, User, Building, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { teamsService, registrationsService } from '../services/databaseService';

interface RegistrationFormProps {
  title: string;
  domain: string;
  endpoint: string;
  minTeamSize?: number; // Optional prop to set minimum team size (defaults to 1)
  maxTeamSize?: number; // Optional prop to limit team size (defaults to 5)
}

interface MemberData {
  name: string;
  email: string;
  phone: string;
  college: string;
  rollNumber: string;
  role: 'Team Lead' | 'Member';
}

interface FormData {
  teamName: string;
  domain: string;
  members: MemberData[];
  team_size: string; // Keeping this for form state management
}

interface PaymentDetails {
  orderId: string;
  amount: number;
  amountInPaise: number;
  currency: string;
  chargePerMember: number;
}

interface RegistrationResponse {
  success: boolean;
  message: string;
  data: {
    teamId: number;
    teamName: string;
    domain: string;
    memberCount: number;
    paymentDetails: PaymentDetails;
  };
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ title, domain, endpoint, minTeamSize = 1, maxTeamSize = 5 }) => {
  // Generate team size options based on minTeamSize and maxTeamSize
  const teamSizeOptions = Array.from({ length: maxTeamSize - minTeamSize + 1 }, (_, i) => {
    const size = minTeamSize + i;
    return {
      value: size.toString(),
      label: size === 1 ? '1 Member (Solo)' : size === minTeamSize ? `${size} Members (Min)` : size === maxTeamSize ? `${size} Members (Max)` : `${size} Members`
    };
  });
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    domain: domain,
    members: [
      { name: '', email: '', phone: '', college: '', rollNumber: '', role: 'Team Lead' },
      { name: '', email: '', phone: '', college: '', rollNumber: '', role: 'Member' },
      { name: '', email: '', phone: '', college: '', rollNumber: '', role: 'Member' },
      { name: '', email: '', phone: '', college: '', rollNumber: '', role: 'Member' },
      { name: '', email: '', phone: '', college: '', rollNumber: '', role: 'Member' },
    ],
    team_size: minTeamSize.toString(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' | 'warning' } | null>(null);
  const [isCheckingTeamName, setIsCheckingTeamName] = useState(false);
  const [teamNameError, setTeamNameError] = useState<string | null>(null);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const showToast = (message: string, type: 'error' | 'success' | 'warning' = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Lazy load Razorpay script only when needed (on payment)
  const loadRazorpayScript = useCallback(async () => {
    if (window.Razorpay) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.defer = true; // Only use defer, not async
      script.onload = () => {
        console.log('Razorpay script loaded');
        resolve(null);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        reject(new Error('Razorpay script failed to load'));
      };
      document.body.appendChild(script);
    });
  }, []);

  const handlePaymentSuccess = async (response: any, paymentDetails: PaymentDetails, teamId: number, members: MemberData[], registrationData?: any) => {
    console.log('Payment successful:', response);

    // Store members in sessionStorage for verification
    sessionStorage.setItem('registrationMembers', JSON.stringify(members));

    // Store registration data (teamName, domain, amount, memberCount) for display on confirmation page
    if (registrationData) {
      sessionStorage.setItem('registrationData', JSON.stringify({
        teamName: registrationData.teamName,
        domain: registrationData.domain,
        memberCount: registrationData.memberCount,
        amount: paymentDetails.amount
      }));
    }

    // Redirect to confirmation page with payment details
    const confirmationURL = new URLSearchParams({
      order_id: paymentDetails.orderId,
      payment_id: response.razorpay_payment_id,
      signature: response.razorpay_signature,
      team_id: teamId.toString(),
    }).toString();

    window.location.href = `/confirmation?${confirmationURL}`;
  };

  const handlePaymentFailure = (error: any) => {
    console.error('Payment failed:', error);
    if (error.error && error.error.description) {
      alert('Payment failed: ' + error.error.description);
    } else {
      alert('Payment cancelled or failed. Please try again.');
    }
  };

  const checkTeamNameUniqueness = async (teamName: string) => {
    const trimmedName = teamName.trim();
    
    if (!trimmedName) {
      setTeamNameError(null);
      return;
    }

    setIsCheckingTeamName(true);
    setTeamNameError(null);

    try {
      console.log('Checking team name uniqueness for:', trimmedName);
      const { exists, error } = await teamsService.checkTeamNameExists(trimmedName);
      
      if (error) {
        console.error('Error checking team name:', error);
        setTeamNameError('Unable to verify team name. Please try again.');
        return;
      }

      console.log('Team name exists?', exists);

      if (exists) {
        setTeamNameError('This team name is already taken. Please choose a different name.');
      } else {
        setTeamNameError(null);
      }
    } catch (error) {
      console.error('Error checking team name:', error);
      setTeamNameError('Unable to verify team name. Please try again.');
    } finally {
      setIsCheckingTeamName(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle team name with debounced uniqueness check
    if (name === 'teamName') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Clear any existing timeout
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      
      // Set new timeout
      const timeoutId = setTimeout(() => {
        checkTeamNameUniqueness(value);
      }, 500);
      
      setDebounceTimeout(timeoutId);
      return;
    }

    // Handle member fields (member_0_name, member_1_email, etc.)
    if (name.startsWith('member_')) {
      const [, index, field] = name.split('_');
      const memberIndex = parseInt(index);

      // Apply field-specific validation
      let sanitizedValue = value;

      if (field === 'phone') {
        // Only allow digits and limit to 10 characters
        sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
      } else if (field === 'name') {
        // Only allow letters and spaces
        sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '');
      } else if (field === 'rollNumber') {
        // Allow alphanumeric characters, hyphens, and underscores
        sanitizedValue = value.replace(/[^a-zA-Z0-9\-_]/g, '').toUpperCase();
      }

      setFormData(prev => {
        const updatedMembers = [...prev.members];
        updatedMembers[memberIndex] = {
          ...updatedMembers[memberIndex],
          [field]: sanitizedValue
        };
        return { ...prev, members: updatedMembers };
      });
    } else {
      // Handle team name and other non-member fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if team name is unique before proceeding
      if (teamNameError) {
        showToast('Please choose a different team name.', 'error');
        setIsSubmitting(false);
        return;
      }

      // Double-check team name uniqueness
      const trimmedTeamName = formData.teamName.trim();
      console.log('Final team name check before submission:', trimmedTeamName);
      
      const { exists, error: checkError } = await teamsService.checkTeamNameExists(trimmedTeamName);
      if (checkError) {
        console.error('Team name check error:', checkError);
        showToast('Unable to verify team name. Please try again.', 'error');
        setIsSubmitting(false);
        return;
      }

      console.log('Final check - team name exists?', exists);

      if (exists) {
        showToast('This team name is already taken. Please choose a different name.', 'error');
        setTeamNameError('This team name is already taken. Please choose a different name.');
        setIsSubmitting(false);
        return;
      }

      const teamSize = parseInt(formData.team_size);
      
      // Validate all required members have all fields filled
      for (let i = 0; i < teamSize; i++) {
        const member = formData.members[i];
        const memberLabel = i === 0 ? 'Team Lead' : `Team Member ${i}`;
        
        if (!member.name.trim()) {
          showToast(`Please fill in the name for ${memberLabel}`, 'warning');
          setIsSubmitting(false);
          return;
        }
        
        if (!member.email.trim()) {
          showToast(`Please fill in the email for ${memberLabel}`, 'warning');
          setIsSubmitting(false);
          return;
        }
        
        if (!member.phone.trim() || member.phone.length !== 10) {
          showToast(`Please fill in a valid 10-digit phone number for ${memberLabel}`, 'warning');
          setIsSubmitting(false);
          return;
        }
        
        if (!member.college.trim()) {
          showToast(`Please fill in the college for ${memberLabel}`, 'warning');
          setIsSubmitting(false);
          return;
        }
        
        if (!member.rollNumber.trim()) {
          showToast(`Please fill in the roll number for ${memberLabel}`, 'warning');
          setIsSubmitting(false);
          return;
        }
      }

      // Prepare the members data
      const teamMembers = formData.members
        .slice(0, teamSize)
        .map((member, index) => ({
          ...member,
          role: index === 0 ? 'Team Lead' as const : 'Member' as const
        }));

      console.log('Creating team with data:', { teamName: formData.teamName, domain: formData.domain });

      // Step 1: Create team in Supabase
      const { data: createdTeam, error: teamError } = await teamsService.createTeam({
        team_name: formData.teamName,
        domain: formData.domain as 'Web Dev' | 'Agentic AI' | 'UI/UX',
        payment_status: 'Pending',
        team_size: teamMembers.length,
        amount_in_paise: null,
        razorpay_order_id: null,
        razorpay_payment_id: null,
        payment_initiated_at: null,
        payment_verified_at: null
      });

      if (teamError || !createdTeam) {
        console.error('Team creation error:', teamError);
        showToast('Failed to create team. Please try again.', 'error');
        setIsSubmitting(false);
        return;
      }

      console.log('Team created successfully:', createdTeam);

      // Step 2: Create registrations for all team members
      const registrationPromises = teamMembers.map(member =>
        registrationsService.createRegistration({
          team_id: createdTeam.id,
          name: member.name,
          email: member.email,
          phone: member.phone,
          college: member.college,
          role: member.role,
          roll_number: member.rollNumber
        })
      );

      const registrationResults = await Promise.all(registrationPromises);
      const hasRegistrationError = registrationResults.some(result => result.error);

      if (hasRegistrationError) {
        console.error('Some registrations failed');
        showToast('Failed to create some registrations. Please try again.', 'error');
        setIsSubmitting(false);
        return;
      }

      console.log('All registrations created successfully');

      // Step 3: Store team info in session storage
      sessionStorage.setItem('registrationTeamId', createdTeam.id.toString());
      sessionStorage.setItem('registrationTeamName', formData.teamName);
      sessionStorage.setItem('registrationDomain', formData.domain);
      sessionStorage.setItem('registrationMembers', JSON.stringify(teamMembers));

      // Step 4: Redirect to appropriate Razorpay payment link based on domain
      const razorpayLinks: { [key: string]: string } = {
        'Web Dev': 'https://rzp.io/rzp/32GCe1a',
        'Agentic AI': 'https://rzp.io/rzp/YsvYiO1',
        'UI/UX': 'https://rzp.io/rzp/9mvbA0V'
      };

      const paymentLink = razorpayLinks[formData.domain];

      if (!paymentLink) {
        showToast('Payment link not configured for this domain', 'error');
        setIsSubmitting(false);
        return;
      }

      console.log('Redirecting to payment link:', paymentLink);
      window.location.href = paymentLink;

    } catch (error) {
      console.error('Registration error:', error);
      showToast('An unexpected error occurred. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      teamName: '',
      domain: domain,
      members: [
        { name: '', email: '', phone: '', college: '', rollNumber: '', role: 'Team Lead' },
        { name: '', email: '', phone: '', college: '', rollNumber: '', role: 'Member' },
        { name: '', email: '', phone: '', college: '', rollNumber: '', role: 'Member' },
        { name: '', email: '', phone: '', college: '', rollNumber: '', role: 'Member' },
        { name: '', email: '', phone: '', college: '', rollNumber: '', role: 'Member' },
      ],
      team_size: minTeamSize.toString(),
    });
    setTermsAccepted(false);
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-transparent py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Toast Notification */}
      {toast && (
        <div 
          className="fixed top-4 right-4 left-4 sm:left-auto z-[9999] pointer-events-auto"
          style={{ 
            animation: 'slideInFromTop 0.3s ease-out'
          }}
        >
          <div 
            className="backdrop-blur-xl border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-2xl w-full sm:min-w-[350px] sm:max-w-md"
            style={{ 
              background: toast.type === 'error' 
                ? 'rgba(239, 68, 68, 0.2)' 
                : toast.type === 'warning'
                ? 'rgba(234, 179, 8, 0.2)'
                : 'rgba(34, 197, 94, 0.2)',
              borderColor: toast.type === 'error'
                ? 'rgba(239, 68, 68, 0.5)'
                : toast.type === 'warning'
                ? 'rgba(234, 179, 8, 0.5)'
                : 'rgba(34, 197, 94, 0.5)',
              boxShadow: toast.type === 'error'
                ? '0 20px 25px -5px rgba(239, 68, 68, 0.3), 0 10px 10px -5px rgba(239, 68, 68, 0.2)'
                : toast.type === 'warning'
                ? '0 20px 25px -5px rgba(234, 179, 8, 0.3), 0 10px 10px -5px rgba(234, 179, 8, 0.2)'
                : '0 20px 25px -5px rgba(34, 197, 94, 0.3), 0 10px 10px -5px rgba(34, 197, 94, 0.2)'
            }}
          >
            <div className="flex items-start gap-3">
              <div 
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  background: toast.type === 'error'
                    ? 'rgba(239, 68, 68, 0.3)'
                    : toast.type === 'warning'
                    ? 'rgba(234, 179, 8, 0.3)'
                    : 'rgba(34, 197, 94, 0.3)'
                }}
              >
                {toast.type === 'error' && (
                  <span className="text-red-300 text-base font-bold">✕</span>
                )}
                {toast.type === 'warning' && (
                  <span className="text-yellow-300 text-base font-bold">!</span>
                )}
                {toast.type === 'success' && (
                  <span className="text-green-300 text-base font-bold">✓</span>
                )}
              </div>
              <p 
                className="text-sm sm:text-base font-medium flex-1"
                style={{
                  color: toast.type === 'error'
                    ? '#fecaca'
                    : toast.type === 'warning'
                    ? '#fef08a'
                    : '#bbf7d0'
                }}
              >
                {toast.message}
              </p>
              <button
                onClick={() => setToast(null)}
                className="flex-shrink-0 text-white/70 hover:text-white transition-colors ml-2"
                style={{ fontSize: '24px', lineHeight: '1' }}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Optimized Background Effects - Reduced for performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent pointer-events-none"></div>
      {/* Hide blur effects on mobile/tablet, only show on lg screens */}
      <div className="hidden lg:block absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-lg pointer-events-none"></div>
      <div className="hidden 2xl:block absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-lg pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Card className="backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 transition-all duration-500 hover:border-white/15 hover:shadow-2xl hover:shadow-white/5 shadow-2xl relative overflow-hidden" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
          {/* Liquid Glass Overlay - Optimized */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.03] pointer-events-none rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          <CardHeader className="mb-10 sm:mb-12 md:mb-16 relative z-10">
            {/* Back Button */}
            <div className="mb-6 sm:mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 text-xs sm:text-sm"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-medium !text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white]">
                  Back
                </span>

              </Link>
            </div>

            <div className="text-center">
              <div className="mb-6 sm:mb-10">
                <span className="!text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white] text-xs sm:text-sm font-semibold tracking-wider uppercase bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 backdrop-blur-sm inline-block">
                  Registration Portal
                </span>
              </div>
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                ZIGNASA
              </CardTitle>
              <CardDescription className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 line-clamp-2">
                {title} | <span className="!text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white] font-semibold">{domain}</span> Domain
              </CardDescription>
              <div className="flex items-center justify-center gap-2">
                <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-white/40"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-white/40"></div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10 md:space-y-12">
              {/* Team Information */}
              <div className="backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-10 hover:border-white/12 transition-all duration-300" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                <h3 className="text-white font-semibold mb-8 sm:mb-10 text-lg sm:text-2xl flex items-center gap-3">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white/70 flex-shrink-0" />
                  <span className="!text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white]">
                    Team Information
                  </span>

                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <Label className="text-gray-300 mb-3 sm:mb-4 block font-medium text-xs sm:text-sm">Team Name *</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        required
                        className={`bg-white/[0.05] backdrop-blur-sm border ${teamNameError ? 'border-red-500/50' : 'border-white/20'} text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm pr-10`}
                        placeholder="Enter your team name"
                      />
                      {isCheckingTeamName && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                    {teamNameError && (
                      <p className="text-red-400 text-xs mt-2">{teamNameError}</p>
                    )}
                    {!teamNameError && formData.teamName && !isCheckingTeamName && (
                      <p className="text-green-400 text-xs mt-2">✓ Team name is available</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-3 sm:mb-4 block font-medium text-xs sm:text-sm">Team Size *</Label>
                    <select
                      name="team_size"
                      value={formData.team_size}
                      onChange={(e) => handleSelectChange('team_size', e.target.value)}
                      required
                      className="w-full bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white rounded-lg sm:rounded-xl h-10 sm:h-12 px-3 sm:px-4 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 text-sm"
                    >
                      <option value="" className="bg-gray-900 text-gray-300">Select team size</option>
                      {teamSizeOptions.map(option => (
                        <option key={option.value} value={option.value} className="bg-gray-900 text-white">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Team Lead */}
              <div className="backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-10 hover:border-white/12 transition-all duration-300" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                <h3 className="text-white font-semibold mb-8 sm:mb-10 text-lg sm:text-2xl flex items-center gap-3">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white/70 flex-shrink-0" />
                  <span className="!text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white]">
                    Team Lead Information
                  </span>

                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <Label className="text-gray-300 mb-3 sm:mb-4 block font-medium text-xs sm:text-sm">Full Name *</Label>
                    <Input
                      type="text"
                      name="member_0_name"
                      value={formData.members[0].name}
                      onChange={handleInputChange}
                      required
                      pattern="[a-zA-Z\s]+"
                      minLength={2}
                      title="Please enter a valid name (letters and spaces only)"
                      className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                      placeholder="Team lead's full name"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-3 sm:mb-4 block font-medium text-xs sm:text-sm">College *</Label>
                    <Input
                      type="text"
                      name="member_0_college"
                      value={formData.members[0].college}
                      onChange={handleInputChange}
                      required
                      minLength={3}
                      title="Please enter your college name"
                      className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                      placeholder="Enter your college name"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-3 sm:mb-4 block font-medium text-xs sm:text-sm">Email Address *</Label>
                    <Input
                      type="email"
                      name="member_0_email"
                      value={formData.members[0].email}
                      onChange={handleInputChange}
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      title="Please enter a valid email address"
                      className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                      placeholder="team.lead@example.com"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-3 sm:mb-4 block font-medium text-xs sm:text-sm">Phone Number *</Label>
                    <Input
                      type="tel"
                      name="member_0_phone"
                      value={formData.members[0].phone}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      minLength={10}
                      title="Please enter a valid 10-digit phone number"
                      className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                      placeholder="1234567890"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-3 sm:mb-4 block font-medium text-xs sm:text-sm">Roll Number *</Label>
                    <Input
                      type="text"
                      name="member_0_rollNumber"
                      value={formData.members[0].rollNumber}
                      onChange={handleInputChange}
                      required
                      pattern="[A-Z0-9\-_]+"
                      minLength={3}
                      title="Please enter a valid roll number (alphanumeric, hyphens, underscores)"
                      className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                      placeholder="Enter your roll number"
                    />
                  </div>
                </div>
              </div>

              {/* Team Members - Dynamic based on team size */}
              {formData.team_size && parseInt(formData.team_size) > 1 &&
                formData.members.slice(1, parseInt(formData.team_size)).map((member, index) => {
                  const memberIndex = index + 1;
                  return (
                    <div key={memberIndex} className="backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-10 hover:border-white/12 transition-all duration-300" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                      <h3 className="text-white font-semibold mb-8 sm:mb-10 text-lg sm:text-2xl flex items-center gap-3 flex-wrap">
                        <Building className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0" />
                        <span className="!text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white]">
                          Team Member {memberIndex}
                        </span>

                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                        <div>
                          <Label className="text-gray-300 mb-3 sm:mb-4 block font-medium text-xs sm:text-sm">Full Name *</Label>
                          <Input
                            type="text"
                            name={`member_${memberIndex}_name`}
                            value={formData.members[memberIndex].name}
                            onChange={handleInputChange}
                            required
                            pattern="[a-zA-Z\s]+"
                            minLength={2}
                            title="Please enter a valid name (letters and spaces only)"
                            className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                            placeholder={`Member ${memberIndex} full name`}
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300 mb-3 sm:mb-4 block font-medium text-xs sm:text-sm">College *</Label>
                          <Input
                            type="text"
                            name={`member_${memberIndex}_college`}
                            value={formData.members[memberIndex].college}
                            onChange={handleInputChange}
                            required
                            minLength={3}
                            title="Please enter college name"
                            className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                            placeholder={`Member ${memberIndex} college`}
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300 mb-3 sm:mb-4 block font-medium text-xs sm:text-sm">Email Address *</Label>
                          <Input
                            type="email"
                            name={`member_${memberIndex}_email`}
                            value={formData.members[memberIndex].email}
                            onChange={handleInputChange}
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            title="Please enter a valid email address"
                            className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                            placeholder={`member${memberIndex}@example.com`}
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300 mb-3 sm:mb-4 block font-medium text-xs sm:text-sm">Phone Number *</Label>
                          <Input
                            type="tel"
                            name={`member_${memberIndex}_phone`}
                            value={formData.members[memberIndex].phone}
                            onChange={handleInputChange}
                            required
                            pattern="[0-9]{10}"
                            maxLength={10}
                            minLength={10}
                            title="Please enter a valid 10-digit phone number"
                            className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                            placeholder="1234567890"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300 mb-3 sm:mb-4 block font-medium text-xs sm:text-sm">Roll Number *</Label>
                          <Input
                            type="text"
                            name={`member_${memberIndex}_rollNumber`}
                            value={formData.members[memberIndex].rollNumber}
                            onChange={handleInputChange}
                            required
                            pattern="[A-Z0-9\-_]+"
                            minLength={3}
                            title="Please enter a valid roll number (alphanumeric, hyphens, underscores)"
                            className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                            placeholder={`Member ${memberIndex} roll number`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

              {/* Terms & Conditions */}
              <div className="backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-10 hover:border-white/12 transition-all duration-300" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                <h3 className="text-white font-semibold mb-6 sm:mb-8 text-lg sm:text-2xl">
                  <span className="!text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white]">
                    Terms & Conditions
                  </span>
                </h3>
                <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 mb-6 sm:mb-8 max-h-72 overflow-y-auto">
                  <ol className="text-gray-300 text-xs sm:text-sm space-y-4 sm:space-y-5 list-decimal list-inside">
                    <li>
                      <span className="font-semibold text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white]">No Refund Policy:</span>
                      <p className="ml-5 mt-1">The registration fee once paid is non-refundable under any circumstances. We appreciate your understanding, as the collected amount directly supports the event's logistics and arrangements.</p>
                    </li>
                    <li>
                      <span className="font-semibold text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white]">
                        Organizer's Discretion:
                      </span>

                      <p className="ml-5 mt-1">In exceptional or unavoidable cases, any refund or compensation will be considered solely at the discretion of the organizers. The decision made by the organizing team shall be final and binding.</p>
                    </li>
                    <li>
                      <span className="font-semibold text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white]">
                        Professional Conduct:
                      </span>

                      <p className="ml-5 mt-1">All participants are expected to maintain a professional and respectful decorum throughout the event. Any misconduct may lead to disqualification or removal from participation without refund.</p>
                    </li>
                    <li>
                      <span className="font-semibold text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white]">
                        Accuracy of Information:
                      </span>

                      <p className="ml-5 mt-1">Participants confirm that all details provided during registration are true and accurate to the best of their knowledge.</p>
                    </li>
                    <li>
                      <span className="font-semibold text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white]">
                        General Compliance:
                      </span>

                      <p className="ml-5 mt-1">The event and its participants shall adhere to all standard rules and regulations as communicated by the organizing team before and during the event.</p>
                    </li>
                  </ol>
                </div>
                <div className="flex items-start gap-4 mb-6">
                  <input
                    type="checkbox"
                    id="termsCheckbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-white/30 cursor-pointer flex-shrink-0"
                  />
                  <label htmlFor="termsCheckbox" className="text-gray-300 text-xs sm:text-sm cursor-pointer select-none">
                    I have read and agree to the Terms & Conditions stated above. I understand that the registration fee is non-refundable and I will maintain professional conduct throughout the event.
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-10 hover:border-white/12 transition-all duration-300" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 justify-center items-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !termsAccepted}
                    className="bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-semibold py-3 sm:py-4 px-8 sm:px-12 rounded-lg sm:rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto h-10 sm:h-14 backdrop-blur-lg border border-white/20 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="hidden sm:inline text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white]">
                          Submitting...
                        </span>
                        <span className="sm:hidden text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white]">
                          Submitting
                        </span>

                      </div>
                    ) : (
                      "Register Team"
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleReset}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 py-3 sm:py-4 px-8 sm:px-12 rounded-lg sm:rounded-2xl transition-all duration-300 backdrop-blur-sm w-full sm:w-auto h-10 sm:h-14 text-sm sm:text-base"
                  >
                    Reset Form
                  </Button>
                </div>
                {!termsAccepted && (
                  <div className="text-center mt-6">
                    <p className="text-yellow-400/80 text-xs sm:text-sm px-2">
                      Please accept the Terms & Conditions to proceed with registration
                    </p>
                  </div>
                )}
                <div className="text-center mt-6 sm:mt-8">
                  <p className="text-gray-400 text-xs sm:text-sm px-2">
                    By registering, you agree to participate in ZIGNASA 2K25 competition
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationForm;
