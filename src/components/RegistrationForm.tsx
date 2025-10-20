import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

interface RegistrationFormProps {
  title: string;
  domain: string;
  endpoint: string;
}

interface FormData {
  team_name: string;
  team_lead_name: string;
  team_lead_clg: string;
  team_lead_email: string;
  team_lead_phone: string;
  team_member2_name: string;
  team_member2_clg: string;
  team_member2_phone: string;
  team_member3_name: string;
  team_member3_clg: string;
  team_member3_phone: string;
  team_member4_name: string;
  team_member4_clg: string;
  team_member4_phone: string;
  team_member5_name: string;
  team_member5_clg: string;
  team_member5_phone: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ title, domain, endpoint }) => {
  const [formData, setFormData] = useState<FormData>({
    team_name: '',
    team_lead_name: '',
    team_lead_clg: '',
    team_lead_email: '',
    team_lead_phone: '',
    team_member2_name: '',
    team_member2_clg: '',
    team_member2_phone: '',
    team_member3_name: '',
    team_member3_clg: '',
    team_member3_phone: '',
    team_member4_name: '',
    team_member4_clg: '',
    team_member4_phone: '',
    team_member5_name: '',
    team_member5_clg: '',
    team_member5_phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`http://localhost:5000/api/${endpoint}`, formData);
      
      if (response.data.success) {
        alert('Registration successful! Redirecting to payment...');
        window.location.href = response.data.paymentUrl;
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('There was an error processing your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      team_name: '',
      team_lead_name: '',
      team_lead_clg: '',
      team_lead_email: '',
      team_lead_phone: '',
      team_member2_name: '',
      team_member2_clg: '',
      team_member2_phone: '',
      team_member3_name: '',
      team_member3_clg: '',
      team_member3_phone: '',
      team_member4_name: '',
      team_member4_clg: '',
      team_member4_phone: '',
      team_member5_name: '',
      team_member5_clg: '',
      team_member5_phone: '',
    });
  };

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/5 backdrop-blur-xl border-0 rounded-3xl p-8 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 shadow-2xl">
          <CardHeader className="mb-8">
            <CardTitle className="text-3xl font-bold text-white text-center">
              ZIGNASA <span className="text-cyan-400">2K25</span> | {title}
            </CardTitle>
            <CardDescription className="text-gray-400 text-center text-lg">
              Register your team for <span className="text-cyan-400">{domain}</span> domain
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Team Information */}
              <div className="bg-white/5 backdrop-blur-sm border-0 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-6 text-xl flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  Team Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block font-medium">Team Name *</Label>
                    <Input
                      type="text"
                      name="team_name"
                      value={formData.team_name}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                      placeholder="Enter your team name"
                    />
                  </div>
                </div>
              </div>
              
              {/* Team Lead */}
              <div className="bg-white/5 backdrop-blur-sm border-0 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-6 text-xl flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  Team Lead Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300 mb-2 block font-medium">Full Name *</Label>
                    <Input
                      type="text"
                      name="team_lead_name"
                      value={formData.team_lead_name}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                      placeholder="Team lead's full name"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block font-medium">College *</Label>
                    <Input
                      type="text"
                      name="team_lead_clg"
                      value={formData.team_lead_clg}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                      placeholder="College name"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block font-medium">Email Address *</Label>
                    <Input
                      type="email"
                      name="team_lead_email"
                      value={formData.team_lead_email}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                      placeholder="team.lead@example.com"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block font-medium">Phone Number *</Label>
                    <Input
                      type="tel"
                      name="team_lead_phone"
                      value={formData.team_lead_phone}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>
              </div>
              
              {/* Team Members */}
              {[2, 3, 4, 5].map(memberNum => (
                <div key={memberNum} className="bg-white/5 backdrop-blur-sm border-0 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-6 text-xl flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    Team Member {memberNum}
                    <span className="text-sm text-gray-400 font-normal ml-2">(Optional - Enter "N/A" if not present)</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-gray-300 mb-2 block font-medium">Full Name</Label>
                      <Input
                        type="text"
                        name={`team_member${memberNum}_name`}
                        value={formData[`team_member${memberNum}_name` as keyof FormData] as string}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                        placeholder="Member's full name or N/A"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 mb-2 block font-medium">College</Label>
                      <Input
                        type="text"
                        name={`team_member${memberNum}_clg`}
                        value={formData[`team_member${memberNum}_clg` as keyof FormData] as string}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                        placeholder="College name or N/A"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 mb-2 block font-medium">Phone Number</Label>
                      <Input
                        type="tel"
                        name={`team_member${memberNum}_phone`}
                        value={formData[`team_member${memberNum}_phone` as keyof FormData] as string}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                        placeholder="+91 1234567890 or N/A"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-8 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Register Team"}
                </Button>
                <Button 
                  type="button" 
                  onClick={handleReset}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 py-3 px-8 rounded-full transition-all duration-300"
                >
                  Reset Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationForm;
