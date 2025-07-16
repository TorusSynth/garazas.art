import { OpenCallSubmission } from '@/lib/types/models';

export interface RegistrationData {
  name: string;
  email: string;
  website?: string;
  artist_statement: string;
  work_sample_urls: string[];
}

// Mock submission function - in real implementation this would call the backend API
export async function submitRegistration(data: RegistrationData): Promise<{ success: boolean; message: string }> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Transform the data to match OpenCallSubmission format
    const submission: Partial<OpenCallSubmission> = {
      artist_name: data.name,
      email: data.email,
      artist_statement: data.artist_statement,
      artwork_title: 'Portfolio Submission', // Default value
      artwork_description: 'Portfolio submission via open call',
      artwork_medium: 'Mixed Media', // Default value
      artwork_year: new Date().getFullYear(),
      submission_date: new Date().toISOString(),
      status: 'pending'
    };
    
    // Log the submission (in real implementation, this would be sent to backend)
    console.log('Registration submitted:', submission);
    
    // Simulate random success/failure for demo purposes
    const success = Math.random() > 0.1; // 90% success rate
    
    if (success) {
      return {
        success: true,
        message: 'Your registration has been submitted successfully! We will review your application and get back to you within 2-3 business days.'
      };
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    return {
      success: false,
      message: 'There was an error submitting your registration. Please try again later or contact us directly.'
    };
  }
}

// Export everything from apiService as well
export * from './apiService'; 