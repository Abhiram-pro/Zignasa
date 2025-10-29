import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Users, User, Building, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RegistrationFormProps {
  title: string;
  domain: string;
  endpoint: string;
  maxTeamSize?: number; // Optional prop to limit team size (defaults to 5)
}

interface MemberData {
  name: string;
  email: string;
  phone: string;
  college: string;
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

const RegistrationForm: React.FC<RegistrationFormProps> = ({ title, domain, endpoint, maxTeamSize = 5 }) => {
  // Generate team size options based on maxTeamSize
  const teamSizeOptions = Array.from({ length: maxTeamSize }, (_, i) => {
    const size = i + 1;
    return {
      value: size.toString(),
      label: size === 1 ? '1 Member (Solo)' : size === maxTeamSize ? `${size} Members (Max)` : `${size} Members`
    };
  });
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    domain: domain,
    members: [
      { name: '', email: '', phone: '', college: '', role: 'Team Lead' },
      { name: '', email: '', phone: '', college: '', role: 'Member' },
      { name: '', email: '', phone: '', college: '', role: 'Member' },
      { name: '', email: '', phone: '', college: '', role: 'Member' },
      { name: '', email: '', phone: '', college: '', role: 'Member' },
    ],
    team_size: '1',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const initiatePayment = async (paymentDetails: PaymentDetails, teamName: string, teamId: number, members: MemberData[], registrationData?: any) => {
    try {
      // Load Razorpay script only when payment is initiated
      await loadRazorpayScript();
      
      if (!window.Razorpay) {
        alert('Payment gateway is not loaded. Please refresh the page and try again.');
        return;
      }

      const options = {
        key: 'rzp_test_RYQHuUpnWD0cOK', // Replace with your actual Razorpay key
        amount: paymentDetails.amountInPaise,
        currency: paymentDetails.currency,
        name: 'ZIGNASA 2K25',
        description: `Registration for ${teamName}`,
        order_id: paymentDetails.orderId,
        handler: (response: any) => handlePaymentSuccess(response, paymentDetails, teamId, members, registrationData),
        prefill: {
          name: formData.members[0].name,
          email: formData.members[0].email,
          contact: formData.members[0].phone,
        },
        theme: {
          color: '#000000'
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal closed');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', handlePaymentFailure);
      razorpay.open();
    } catch (error) {
      console.error('Failed to load payment gateway:', error);
      alert('Failed to load payment gateway. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle member fields (member_0_name, member_1_email, etc.)
    if (name.startsWith('member_')) {
      const [, index, field] = name.split('_');
      const memberIndex = parseInt(index);
      
      setFormData(prev => {
        const updatedMembers = [...prev.members];
        updatedMembers[memberIndex] = {
          ...updatedMembers[memberIndex],
          [field]: value
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
      // Prepare the data in the required format
      const submissionData = {
        teamName: formData.teamName,
        domain: formData.domain,
        members: formData.members
          .slice(0, parseInt(formData.team_size)) // Only include members up to team size
          .filter(member => member.name.trim() !== '') // Only include members with names
          .map((member, index) => ({
            ...member,
            role: index === 0 ? 'Team Lead' : 'Member' // First member is always team lead
          }))
      };

      console.log('Sending request to server with data:', JSON.stringify(submissionData, null, 2));
      
      const response = await axios.post(
        `https://zignasa-backend.onrender.com/registration`, 
        submissionData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 second timeout
        }
      );
      
      console.log('Server response:', response);
      
      if (response.data && response.data.success) {
        const registrationData = response.data as RegistrationResponse;
        console.log('Registration successful! Opening payment gateway...');
        
        // Initiate Razorpay payment with the members data and registration data
        initiatePayment(
          registrationData.data.paymentDetails, 
          registrationData.data.teamName, 
          registrationData.data.teamId,
          submissionData.members as MemberData[],
          registrationData.data
        );
      } else {
        console.error('Registration failed:', response.data);
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            data: error.config?.data,
            headers: error.config?.headers,
          },
        });
        
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert(`Error: ${error.response.status} - ${error.response.data?.message || 'Server error'}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
          alert('No response from server. Please check your connection and try again.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Request setup error:', error.message);
          alert(`Request error: ${error.message}`);
        }
      } else {
        console.error('Non-Axios error:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      teamName: '',
      domain: domain,
      members: [
        { name: '', email: '', phone: '', college: '', role: 'Team Lead' },
        { name: '', email: '', phone: '', college: '', role: 'Member' },
        { name: '', email: '', phone: '', college: '', role: 'Member' },
        { name: '', email: '', phone: '', college: '', role: 'Member' },
        { name: '', email: '', phone: '', college: '', role: 'Member' },
      ],
      team_size: '1',
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-transparent py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Optimized Background Effects - Reduced for performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent pointer-events-none"></div>
      {/* Hide blur effects on mobile/tablet, only show on lg screens */}
      <div className="hidden lg:block absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-lg pointer-events-none"></div>
      <div className="hidden 2xl:block absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-lg pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Card className="bg-white/[0.02] backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20 hover:shadow-2xl hover:shadow-white/10 shadow-2xl relative overflow-hidden">
          {/* Liquid Glass Overlay - Optimized */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.03] pointer-events-none rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          <CardHeader className="mb-8 sm:mb-10 md:mb-12 relative z-10">
            {/* Back Button */}
            <div className="mb-4 sm:mb-0">
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
              <div className="mb-4 sm:mb-8">
                <span className="!text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white] text-xs sm:text-sm font-semibold tracking-wider uppercase bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 backdrop-blur-sm inline-block">
                  Registration Portal
                </span>
              </div>
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4 leading-tight">
                ZIGNASA 
              </CardTitle>
              <CardDescription className="text-gray-300 text-base sm:text-lg md:text-xl mb-4 sm:mb-6 line-clamp-2">
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
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 md:space-y-10">
              {/* Team Information */}
              <div className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300">
                <h3 className="text-white font-semibold mb-6 sm:mb-8 text-lg sm:text-2xl flex items-center gap-3">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white/70 flex-shrink-0" />
                 <span className="!text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white]">
                      Team Information
                </span>

                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label className="text-gray-300 mb-2 sm:mb-3 block font-medium text-xs sm:text-sm">Team Name *</Label>
                    <Input
                      type="text"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      required
                      className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                      placeholder="Enter your team name"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 sm:mb-3 block font-medium text-xs sm:text-sm">Team Size *</Label>
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
              <div className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300">
                <h3 className="text-white font-semibold mb-6 sm:mb-8 text-lg sm:text-2xl flex items-center gap-3">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white/70 flex-shrink-0" />
                 <span className="!text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white]">
  Team Lead Information
</span>

                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label className="text-gray-300 mb-2 sm:mb-3 block font-medium text-xs sm:text-sm">Full Name *</Label>
                    <Input
                      type="text"
                      name="member_0_name"
                      value={formData.members[0].name}
                      onChange={handleInputChange}
                      required
                      className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                      placeholder="Team lead's full name"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 sm:mb-3 block font-medium text-xs sm:text-sm">College *</Label>
                    <Input
                      type="text"
                      name="member_0_college"
                      value={formData.members[0].college}
                      onChange={handleInputChange}
                      required
                      className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                      placeholder="Enter your college name"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 sm:mb-3 block font-medium text-xs sm:text-sm">Email Address *</Label>
                    <Input
                      type="email"
                      name="member_0_email"
                      value={formData.members[0].email}
                      onChange={handleInputChange}
                      required
                      className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                      placeholder="team.lead@example.com"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 sm:mb-3 block font-medium text-xs sm:text-sm">Phone Number *</Label>
                    <Input
                      type="tel"
                      name="member_0_phone"
                      value={formData.members[0].phone}
                      onChange={handleInputChange}
                      required
                      className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>
              </div>
              
              {/* Team Members - Dynamic based on team size */}
              {formData.team_size && parseInt(formData.team_size) > 1 && 
                formData.members.slice(1, parseInt(formData.team_size)).map((member, index) => {
                  const memberIndex = index + 1;
                  return (
                    <div key={memberIndex} className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300">
                      <h3 className="text-white font-semibold mb-6 sm:mb-8 text-lg sm:text-2xl flex items-center gap-3 flex-wrap">
                        <Building className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0" />
                        <span className="!text-white !bg-none !bg-transparent !bg-clip-border ![background-clip:unset] ![-webkit-text-fill-color:white]">
  Team Member {memberIndex}
</span>

                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <Label className="text-gray-300 mb-2 sm:mb-3 block font-medium text-xs sm:text-sm">Full Name</Label>
                          <Input
                            type="text"
                            name={`member_${memberIndex}_name`}
                            value={formData.members[memberIndex].name}
                            onChange={handleInputChange}
                            className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                            placeholder={`Member ${memberIndex} full name`}
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300 mb-2 sm:mb-3 block font-medium text-xs sm:text-sm">College</Label>
                          <Input
                            type="text"
                            name={`member_${memberIndex}_college`}
                            value={formData.members[memberIndex].college}
                            onChange={handleInputChange}
                            className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                            placeholder={`Member ${memberIndex} college`}
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300 mb-2 sm:mb-3 block font-medium text-xs sm:text-sm">Email Address</Label>
                          <Input
                            type="email"
                            name={`member_${memberIndex}_email`}
                            value={formData.members[memberIndex].email}
                            onChange={handleInputChange}
                            className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                            placeholder={`member${memberIndex}@example.com`}
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300 mb-2 sm:mb-3 block font-medium text-xs sm:text-sm">Phone Number</Label>
                          <Input
                            type="tel"
                            name={`member_${memberIndex}_phone`}
                            value={formData.members[memberIndex].phone}
                            onChange={handleInputChange}
                            className="bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm"
                            placeholder="+91 1234567890"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              
              {/* Submit Buttons */}
              <div className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-semibold py-3 sm:py-4 px-8 sm:px-12 rounded-lg sm:rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto h-10 sm:h-14 backdrop-blur-lg border border-white/20 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="hidden sm:inline">Submitting...</span>
                        <span className="sm:hidden">Submitting</span>
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
                <div className="text-center mt-4 sm:mt-6">
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
