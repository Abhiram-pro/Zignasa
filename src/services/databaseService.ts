import { supabase } from '../lib/supabase';

// Types for Teams and Registrations
export interface Team {
  id: number;
  team_name: string;
  domain: 'Web Dev' | 'Agentic AI' | 'UI/UX';
  payment_status: 'Pending' | 'Initiated' | 'Completed' | 'Failed' | 'Refunded';
  created_at: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  amount_in_paise: number | null;
  team_size: number;
  payment_initiated_at: string | null;
  payment_verified_at: string | null;
}

export interface Registration {
  id: number;
  team_id: number | null;
  name: string;
  email: string;
  phone: string;
  college: string;
  role: 'Team Lead' | 'Member';
  created_at: string;
  roll_number: string;
}

/**
 * Teams Service
 */
export const teamsService = {
  /**
   * Create a new team
   */
  async createTeam(teamData: Omit<Team, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('teams')
        .insert([teamData])
        .select();

      if (error) throw error;
      return { data: data?.[0] as Team, error: null };
    } catch (error) {
      console.error('Error creating team:', error);
      return { data: null, error };
    }
  },

  /**
   * Get team by ID
   */
  async getTeamById(teamId: number) {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('id', teamId)
        .single();

      if (error) throw error;
      return { data: data as Team, error: null };
    } catch (error) {
      console.error('Error fetching team:', error);
      return { data: null, error };
    }
  },

  /**
   * Get team by Razorpay Order ID
   */
  async getTeamByRazorpayOrderId(orderId: string) {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('razorpay_order_id', orderId)
        .single();

      if (error) throw error;
      return { data: data as Team, error: null };
    } catch (error) {
      console.error('Error fetching team by order ID:', error);
      return { data: null, error };
    }
  },

  /**
   * Update team with Razorpay order details
   */
  async updateTeamWithRazorpayOrder(
    teamId: number,
    razorpayOrderId: string,
    amountInPaise: number
  ) {
    try {
      const { data, error } = await supabase
        .from('teams')
        .update({
          razorpay_order_id: razorpayOrderId,
          amount_in_paise: amountInPaise,
          payment_status: 'Initiated',
          payment_initiated_at: new Date().toISOString(),
        })
        .eq('id', teamId)
        .select();

      if (error) throw error;
      return { data: data?.[0] as Team, error: null };
    } catch (error) {
      console.error('Error updating team with Razorpay order:', error);
      return { data: null, error };
    }
  },

  /**
   * Update team with Razorpay payment details after successful payment
   */
  async updateTeamWithRazorpayPayment(
    teamId: number,
    razorpayPaymentId: string
  ) {
    try {
      const { data, error } = await supabase
        .from('teams')
        .update({
          razorpay_payment_id: razorpayPaymentId,
          payment_status: 'Completed',
          payment_verified_at: new Date().toISOString(),
        })
        .eq('id', teamId)
        .select();

      if (error) throw error;
      return { data: data?.[0] as Team, error: null };
    } catch (error) {
      console.error('Error updating team with Razorpay payment:', error);
      return { data: null, error };
    }
  },

  /**
   * Update team payment status
   */
  async updateTeamPaymentStatus(
    teamId: number,
    status: 'Pending' | 'Initiated' | 'Completed' | 'Failed' | 'Refunded'
  ) {
    try {
      const { data, error } = await supabase
        .from('teams')
        .update({ payment_status: status })
        .eq('id', teamId)
        .select();

      if (error) throw error;
      return { data: data?.[0] as Team, error: null };
    } catch (error) {
      console.error('Error updating team payment status:', error);
      return { data: null, error };
    }
  },

  /**
   * Get all teams with optional filtering
   */
  async getAllTeams(filters?: { domain?: string; payment_status?: string }) {
    try {
      let query = supabase.from('teams').select('*');

      if (filters?.domain) {
        query = query.eq('domain', filters.domain);
      }

      if (filters?.payment_status) {
        query = query.eq('payment_status', filters.payment_status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return { data: data as Team[], error: null };
    } catch (error) {
      console.error('Error fetching teams:', error);
      return { data: null, error };
    }
  },

  /**
   * Update team size
   */
  async updateTeamSize(teamId: number, size: number) {
    try {
      const { data, error } = await supabase
        .from('teams')
        .update({ team_size: size })
        .eq('id', teamId)
        .select();

      if (error) throw error;
      return { data: data?.[0] as Team, error: null };
    } catch (error) {
      console.error('Error updating team size:', error);
      return { data: null, error };
    }
  },

  /**
   * Delete team
   */
  async deleteTeam(teamId: number) {
    try {
      const { error } = await supabase.from('teams').delete().eq('id', teamId);
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error deleting team:', error);
      return { error };
    }
  },

  /**
   * Check if team name exists (case-insensitive)
   */
  async checkTeamNameExists(teamName: string) {
    try {
      // Trim the team name to avoid whitespace issues
      const trimmedName = teamName.trim();
      
      if (!trimmedName) {
        return { exists: false, error: null };
      }

      const { data, error } = await supabase
        .from('teams')
        .select('id, team_name')
        .ilike('team_name', trimmedName);

      if (error) {
        console.error('Supabase error checking team name:', error);
        throw error;
      }

      console.log('Team name check result:', { 
        searchedName: trimmedName, 
        foundTeams: data,
        exists: data && data.length > 0 
      });

      return { exists: data && data.length > 0, error: null };
    } catch (error) {
      console.error('Error checking team name:', error);
      return { exists: false, error };
    }
  },
};

/**
 * Registrations Service
 */
export const registrationsService = {
  /**
   * Create a new registration
   */
  async createRegistration(registrationData: Omit<Registration, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .insert([registrationData])
        .select();

      if (error) throw error;
      return { data: data?.[0] as Registration, error: null };
    } catch (error) {
      console.error('Error creating registration:', error);
      return { data: null, error };
    }
  },

  /**
   * Get registration by ID
   */
  async getRegistrationById(registrationId: number) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('id', registrationId)
        .single();

      if (error) throw error;
      return { data: data as Registration, error: null };
    } catch (error) {
      console.error('Error fetching registration:', error);
      return { data: null, error };
    }
  },

  /**
   * Get all registrations for a team
   */
  async getTeamRegistrations(teamId: number) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('team_id', teamId);

      if (error) throw error;
      return { data: data as Registration[], error: null };
    } catch (error) {
      console.error('Error fetching team registrations:', error);
      return { data: null, error };
    }
  },

  /**
   * Get registration by email
   */
  async getRegistrationByEmail(email: string) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('email', email);

      if (error) throw error;
      return { data: data as Registration[], error: null };
    } catch (error) {
      console.error('Error fetching registration by email:', error);
      return { data: null, error };
    }
  },

  /**
   * Update registration
   */
  async updateRegistration(registrationId: number, updates: Partial<Registration>) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .update(updates)
        .eq('id', registrationId)
        .select();

      if (error) throw error;
      return { data: data?.[0] as Registration, error: null };
    } catch (error) {
      console.error('Error updating registration:', error);
      return { data: null, error };
    }
  },

  /**
   * Delete registration
   */
  async deleteRegistration(registrationId: number) {
    try {
      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', registrationId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error deleting registration:', error);
      return { error };
    }
  },

  /**
   * Get all registrations with optional filtering
   */
  async getAllRegistrations(filters?: { role?: string; college?: string }) {
    try {
      let query = supabase.from('registrations').select('*');

      if (filters?.role) {
        query = query.eq('role', filters.role);
      }

      if (filters?.college) {
        query = query.ilike('college', `%${filters.college}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return { data: data as Registration[], error: null };
    } catch (error) {
      console.error('Error fetching registrations:', error);
      return { data: null, error };
    }
  },

  /**
   * Get team members count for a team
   */
  async getTeamMembersCount(teamId: number) {
    try {
      const { count, error } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('team_id', teamId);

      if (error) throw error;
      return { count: count || 0, error: null };
    } catch (error) {
      console.error('Error getting team members count:', error);
      return { count: 0, error };
    }
  },
};
