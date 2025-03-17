'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { submitRegistration, RegistrationData } from '@/lib/api';

// Define schema for form validation
const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
  artist_statement: z.string().min(50, "Artist statement must be at least 50 characters long"),
  work_sample_urls: z.array(z.string().url("Please enter a valid URL")).min(1, "At least one work sample is required")
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function ArtistRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [workSampleInputs, setWorkSampleInputs] = useState<string[]>(['']);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      website: '',
      artist_statement: '',
      work_sample_urls: ['']
    }
  });
  
  // Add another work sample input field
  const addWorkSampleInput = () => {
    setWorkSampleInputs([...workSampleInputs, '']);
  };
  
  // Handle form submission
  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Filter out empty work sample URLs
      const filteredData: RegistrationData = {
        ...data,
        work_sample_urls: data.work_sample_urls.filter(url => url.trim() !== '')
      };
      
      await submitRegistration(filteredData);
      setSubmitSuccess(true);
      reset();
      setWorkSampleInputs(['']);
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitError('There was an error submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (submitSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-2xl font-bold text-green-800 mt-4 mb-2">Registration Successful!</h3>
        <p className="text-green-700 mb-6">
          Thank you for your submission. We will review your application and contact you soon.
        </p>
        <button 
          onClick={() => setSubmitSuccess(false)}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Submit Another Registration
        </button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700 mb-4">
          {submitError}
        </div>
      )}
      
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="form-label">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="form-input"
        />
        {errors.name && <p className="form-error">{errors.name.message}</p>}
      </div>
      
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="form-label">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="form-input"
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>
      
      {/* Website Field */}
      <div>
        <label htmlFor="website" className="form-label">
          Website (optional)
        </label>
        <input
          id="website"
          type="url"
          {...register('website')}
          placeholder="https://yourwebsite.com"
          className="form-input"
        />
        {errors.website && <p className="form-error">{errors.website.message}</p>}
      </div>
      
      {/* Artist Statement Field */}
      <div>
        <label htmlFor="artist_statement" className="form-label">
          Artist Statement <span className="text-red-500">*</span>
        </label>
        <textarea
          id="artist_statement"
          rows={5}
          {...register('artist_statement')}
          className="form-input"
          placeholder="Tell us about your artistic practice and vision..."
        ></textarea>
        {errors.artist_statement && <p className="form-error">{errors.artist_statement.message}</p>}
      </div>
      
      {/* Work Samples */}
      <div>
        <label className="form-label">
          Work Samples <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-2">
          Provide URLs to your work samples (images, videos, etc.)
        </p>
        
        {workSampleInputs.map((_, index) => (
          <div key={index} className="mb-2">
            <input
              type="url"
              {...register(`work_sample_urls.${index}`)}
              placeholder="https://example.com/your-artwork.jpg"
              className="form-input"
            />
            {errors.work_sample_urls?.[index] && (
              <p className="form-error">{errors.work_sample_urls?.[index]?.message}</p>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addWorkSampleInput}
          className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          + Add Another Work Sample
        </button>
      </div>
      
      {errors.work_sample_urls && errors.work_sample_urls.message && (
        <p className="form-error">{errors.work_sample_urls.message}</p>
      )}
      
      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary"
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </button>
      </div>
    </form>
  );
} 