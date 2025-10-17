import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="registration-page">
      <div className="container">
        <div className="text">ZIGNASA-2K24 | <span>{title}</span></div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">
              <input 
                type="text" 
                name="team_name" 
                value={formData.team_name}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_name">Team Name</label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <input 
                type="text" 
                name="team_lead_name" 
                value={formData.team_lead_name}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_lead_name">Team Lead Name</label>
            </div>
            <div className="input-data">
              <input 
                type="text" 
                name="team_lead_clg" 
                value={formData.team_lead_clg}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_lead_clg">Team Lead College</label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <input 
                type="email" 
                name="team_lead_email" 
                value={formData.team_lead_email}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_lead_email">Team Lead Email Address</label>
            </div>
            <div className="input-data">
              <input 
                type="tel" 
                name="team_lead_phone" 
                value={formData.team_lead_phone}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_lead_phone">Team Lead Phone No.</label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <input 
                type="text" 
                name="team_member2_name" 
                value={formData.team_member2_name}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_member2_name">Team Member 2 Name</label>
              <p style={{fontSize: '12px', color: '#fff'}}>N/A if not present</p>
            </div>
            <div className="input-data">
              <input 
                type="text" 
                name="team_member2_clg" 
                value={formData.team_member2_clg}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_member2_clg">Team Member 2 College</label>
              <p style={{fontSize: '12px', color: '#fff'}}>N/A if not present</p>
            </div>
            <div className="input-data">
              <input 
                type="tel" 
                name="team_member2_phone" 
                value={formData.team_member2_phone}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_member2_phone">Member 2 Phone No.</label>
              <p style={{fontSize: '12px', color: '#fff'}}>N/A if not present</p>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <input 
                type="text" 
                name="team_member3_name" 
                value={formData.team_member3_name}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_member3_name">Team Member 3 Name</label>
              <p style={{fontSize: '12px', color: '#fff'}}>N/A if not present</p>
            </div>
            <div className="input-data">
              <input 
                type="text" 
                name="team_member3_clg" 
                value={formData.team_member3_clg}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_member3_clg">Team Member 3 College</label>
              <p style={{fontSize: '12px', color: '#fff'}}>N/A if not present</p>
            </div>
            <div className="input-data">
              <input 
                type="tel" 
                name="team_member3_phone" 
                value={formData.team_member3_phone}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_member3_phone">Member 3 Phone No.</label>
              <p style={{fontSize: '12px', color: '#fff'}}>N/A if not present</p>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <input 
                type="text" 
                name="team_member4_name" 
                value={formData.team_member4_name}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_member4_name">Team Member 4 Name</label>
              <p style={{fontSize: '12px', color: '#fff'}}>N/A if not present</p>
            </div>
            <div className="input-data">
              <input 
                type="text" 
                name="team_member4_clg" 
                value={formData.team_member4_clg}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_member4_clg">Team Member 4 College</label>
              <p style={{fontSize: '12px', color: '#fff'}}>N/A if not present</p>
            </div>
            <div className="input-data">
              <input 
                type="tel" 
                name="team_member4_phone" 
                value={formData.team_member4_phone}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_member4_phone">Member 4 Phone No.</label>
              <p style={{fontSize: '12px', color: '#fff'}}>N/A if not present</p>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <input 
                type="text" 
                name="team_member5_name" 
                value={formData.team_member5_name}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_member5_name">Team Member 5 Name</label>
              <p style={{fontSize: '12px', color: '#fff'}}>N/A if not present</p>
            </div>
            <div className="input-data">
              <input 
                type="text" 
                name="team_member5_clg" 
                value={formData.team_member5_clg}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_member5_clg">Team Member 5 College</label>
              <p style={{fontSize: '12px', color: '#fff'}}>N/A if not present</p>
            </div>
            <div className="input-data">
              <input 
                type="tel" 
                name="team_member5_phone" 
                value={formData.team_member5_phone}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="team_member5_phone">Member 5 Phone No.</label>
              <p style={{fontSize: '12px', color: '#fff'}}>N/A if not present</p>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data textarea">
              <div className="form-row submit-btn">
                <div className="input-data">
                  <div className="inner"></div>
                  <input 
                    type="submit" 
                    value={isSubmitting ? "Submitting..." : "submit"} 
                    name="submit"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="input-data">
                  <div className="inner"></div>
                  <input type="button" value="reset" onClick={handleReset} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
