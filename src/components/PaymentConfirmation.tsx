import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle, AlertCircle, Clock, Home, ArrowLeft } from 'lucide-react';

interface VerificationResponse {
  success: boolean;
  message: string;
  data?: {
    teamId: number;
    teamName?: string;
    domain?: string;
    memberCount: number;
    paymentId: string;
    amount?: number;
    status?: 'success' | 'pending' | 'failed';
    registrationDate?: string;
    paymentStatus?: string;
    orderId?: string;
  };
  error?: string;
}

interface PaymentDetails {
  orderId: string;
  paymentId: string;
  signature: string;
}

const PaymentConfirmation: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'verified' | 'failed' | 'pending'>('loading');
  const [verificationData, setVerificationData] = useState<VerificationResponse['data'] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [registrationDetails, setRegistrationDetails] = useState<any | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get payment details from URL params
        const orderId = searchParams.get('order_id');
        const paymentId = searchParams.get('payment_id');
        const signature = searchParams.get('signature');
        const teamId = searchParams.get('team_id');

        // Get registration details from sessionStorage
        const regDetailsJson = sessionStorage.getItem('registrationData');
        const regDetails = regDetailsJson ? JSON.parse(regDetailsJson) : null;
        setRegistrationDetails(regDetails);

        if (!orderId || !paymentId || !signature) {
          setVerificationStatus('failed');
          setErrorMessage('Missing payment verification parameters. Please contact support.');
          return;
        }

        setPaymentDetails({ orderId, paymentId, signature });

        console.log('Verifying payment with:', { orderId, paymentId, signature, teamId });

        // Get members from sessionStorage
        const membersJson = sessionStorage.getItem('registrationMembers');
        const members = membersJson ? JSON.parse(membersJson) : [];

        // Call the verify-payment endpoint with camelCase keys and required fields
        const response = await axios.post(
          'https://zignasa-backend.vercel.app/razorpay/verify-payment',
          {
            teamId: teamId || 0,
            razorpayOrderId: orderId,
            razorpayPaymentId: paymentId,
            razorpaySignature: signature,
            members: members,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 10000,
          }
        );

        console.log('Verification response:', response.data);

        if (response.data.success) {
          setVerificationStatus('verified');
          setVerificationData(response.data.data);
          // Clear sessionStorage after successful verification
          sessionStorage.removeItem('registrationMembers');
          sessionStorage.removeItem('registrationData');
        } else {
          setVerificationStatus('failed');
          setErrorMessage(response.data.message || 'Payment verification failed');
        }
      } catch (error) {
        console.error('Verification error:', error);

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            // Payment already verified
            setVerificationStatus('verified');
            setErrorMessage('');
            if (error.response.data?.data) {
              setVerificationData(error.response.data.data);
            }
          } else {
            setVerificationStatus('failed');
            setErrorMessage(
              error.response?.data?.message ||
              error.message ||
              'Failed to verify payment. Please contact support.'
            );
          }
        } else {
          setVerificationStatus('failed');
          setErrorMessage('An unexpected error occurred during verification.');
        }
      }
    };

    verifyPayment();
  }, [searchParams]);

  // Success state
  if (verificationStatus === 'verified' && verificationData) {
    return (
      <div className="min-h-screen bg-black py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/20 to-black pointer-events-none"></div>
        <div className="hidden lg:block absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-lg pointer-events-none"></div>
        <div className="hidden 2xl:block absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-lg pointer-events-none"></div>

        <div className="max-w-2xl mx-auto relative z-10">
          {/* Back Button */}
          <div className="mb-6 sm:mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 text-xs sm:text-sm"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>

          <Card className="bg-white/[0.02] backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20 hover:shadow-2xl hover:shadow-white/10 shadow-2xl relative overflow-hidden">
            {/* Liquid Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.03] pointer-events-none rounded-3xl"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <CardHeader className="text-center mb-8 sm:mb-12 relative z-10">
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="p-4 sm:p-6 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-full border border-green-500/30 backdrop-blur-sm">
                  <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-400" />
                </div>
              </div>
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
                Registration Confirmed!
              </CardTitle>
              <CardDescription className="text-gray-300 text-base sm:text-lg">
                Your payment has been successfully verified
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 space-y-8">
              {/* Success Message */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
                <p className="text-green-200 text-sm sm:text-base font-medium">
                  ✓ Your team has been successfully registered for ZIGNASA 2K25. A confirmation email will be sent shortly.
                </p>
              </div>

              {/* Registration Details */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-white font-semibold text-lg sm:text-xl mb-4 sm:mb-6">Registration Details</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300">
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mb-2">Team Name</p>
                    <p className="text-white text-sm sm:text-base font-semibold break-words">
                      {verificationData?.teamName || registrationDetails?.teamName || 'N/A'}
                    </p>
                  </div>

                  <div className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300">
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mb-2">Domain</p>
                    <p className="text-white text-sm sm:text-base font-semibold break-words">
                      {verificationData?.domain || registrationDetails?.domain || 'N/A'}
                    </p>
                  </div>

                  <div className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300">
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mb-2">Team Members</p>
                    <p className="text-white text-sm sm:text-base font-semibold">
                      {verificationData?.memberCount || registrationDetails?.memberCount || 'N/A'}
                    </p>
                  </div>

                  <div className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300">
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mb-2">Payment Amount</p>
                    <p className="text-white text-sm sm:text-base font-semibold">
                      ₹{verificationData?.amount || registrationDetails?.amount || 'N/A'}
                    </p>
                  </div>

                  <div className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300">
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mb-2">Registration ID</p>
                    <p className="text-white text-sm sm:text-base font-semibold font-mono break-words">
                      {verificationData?.teamId || 'N/A'}
                    </p>
                  </div>

                  <div className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300">
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mb-2">Payment ID</p>
                    <p className="text-white text-sm sm:text-base font-semibold font-mono break-words">
                      {verificationData?.paymentId ? verificationData.paymentId.slice(0, 12) + '...' : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
                <p className="text-blue-200 text-xs sm:text-sm">
                  <span className="font-semibold">Note:</span> Please keep your Team ID and Payment ID safe. You'll need them for future reference and inquiries regarding your registration.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 sm:pt-6">
                <Link
                  to="/"
                  className="flex-1"
                >
                  <Button className="w-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-semibold py-3 sm:py-4 px-8 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-white/20 backdrop-blur-lg border border-white/20 text-sm sm:text-base h-10 sm:h-12">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Pending/Loading state
  if (verificationStatus === 'loading' || verificationStatus === 'pending') {
    return (
      <div className="min-h-screen bg-black py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/20 to-black pointer-events-none"></div>

        <div className="max-w-2xl mx-auto relative z-10">
          <Card className="bg-white/[0.02] backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-500 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.03] pointer-events-none rounded-3xl"></div>

            <CardHeader className="text-center mb-8 sm:mb-12 relative z-10">
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="p-4 sm:p-6 bg-gradient-to-br from-yellow-500/20 to-amber-600/10 rounded-full border border-yellow-500/30 backdrop-blur-sm">
                  <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 animate-spin" />
                </div>
              </div>
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
                Verifying Payment...
              </CardTitle>
              <CardDescription className="text-gray-300 text-base sm:text-lg">
                Please wait while we verify your payment
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 text-center">
              <p className="text-gray-400 text-sm sm:text-base">
                This usually takes a few seconds. Do not refresh the page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Failed state
  if (verificationStatus === 'failed') {
    return (
      <div className="min-h-screen bg-black py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/20 to-black pointer-events-none"></div>

        <div className="max-w-2xl mx-auto relative z-10">
          <Card className="bg-white/[0.02] backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-500 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.03] pointer-events-none rounded-3xl"></div>

            <CardHeader className="text-center mb-8 sm:mb-12 relative z-10">
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="p-4 sm:p-6 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-full border border-red-500/30 backdrop-blur-sm">
                  <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-400" />
                </div>
              </div>
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
                Verification Failed
              </CardTitle>
              <CardDescription className="text-gray-300 text-base sm:text-lg">
                We couldn't verify your payment
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 space-y-6 sm:space-y-8">
              {/* Error Message */}
              <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
                <p className="text-red-200 text-sm sm:text-base">
                  {errorMessage}
                </p>
              </div>

              {/* Payment Details (if available) */}
              {paymentDetails && (
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-white font-semibold text-lg sm:text-xl">Payment Information</h3>

                  <div className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-4">
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm font-medium mb-2">Payment ID</p>
                      <p className="text-white text-sm sm:text-base font-mono break-all">
                        {paymentDetails.paymentId}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm font-medium mb-2">Order ID</p>
                      <p className="text-white text-sm sm:text-base font-mono break-all">
                        {paymentDetails.orderId}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Support Instructions */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
                <h4 className="text-purple-200 font-semibold text-sm sm:text-base mb-2">What to do next?</h4>
                <ul className="text-purple-200 text-xs sm:text-sm space-y-2 list-disc list-inside">
                  <li>If you were charged, your payment will be refunded within 3-5 business days</li>
                  <li>Contact support with your Payment ID for assistance</li>
                  <li>Try registering again with a different payment method</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 sm:pt-6">
                <Link
                  to="/"
                  className="flex-1"
                >
                  <Button className="w-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-semibold py-3 sm:py-4 px-8 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-white/20 backdrop-blur-lg border border-white/20 text-sm sm:text-base h-10 sm:h-12">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentConfirmation;
