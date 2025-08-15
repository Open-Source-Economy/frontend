import React, { useState } from 'react';
import { OnboardingState } from '../OnboardingFlow';
import ProgressBar from '../components/ProgressBar';
import { getOnboardingBackendAPI } from 'src/services';
import type { IncomeStreamType, OpenToOtherOpportunityType, CurrencyType } from 'src/api/dto/onboarding/DeveloperProfile.dto';

// Inline SVG components replacing localhost assets
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Chat icon removed - ambiguous asset

interface Step4AvailabilityRateProps {
  state: OnboardingState;
  updateState: (updates: Partial<OnboardingState>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
}

interface AvailabilityData {
  weeklyHours: string;
  largerOpportunities: 'yes' | 'maybe' | 'no' | '';
  hourlyRate: string;
  currency: string;
  comments: string;
}

interface FormErrors {
  weeklyHours?: string;
  largerOpportunities?: string;
  hourlyRate?: string;
  currency?: string;
  comments?: string;
}

export default function Step4AvailabilityRate({ state, updateState, onNext, onBack, currentStep }: Step4AvailabilityRateProps) {
  const [availability, setAvailability] = useState<AvailabilityData>(
    state.availability || {
      weeklyHours: '',
      largerOpportunities: '',
      hourlyRate: '',
      currency: 'USD',
      comments: ''
    }
  );
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: keyof AvailabilityData, value: string) => {
    const newAvailability = {
      ...availability,
      [field]: value
    };
    setAvailability(newAvailability);
    updateState({ availability: newAvailability });
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!availability.weeklyHours) {
      newErrors.weeklyHours = 'Please enter your weekly hours';
    } else if (isNaN(Number(availability.weeklyHours)) || Number(availability.weeklyHours) < 0 || Number(availability.weeklyHours) > 168) {
      newErrors.weeklyHours = 'Please enter a valid number of hours (0-168)';
    }

    if (!availability.largerOpportunities) {
      newErrors.largerOpportunities = 'Please select an option';
    }

    if (!availability.hourlyRate) {
      newErrors.hourlyRate = 'Please enter your hourly rate';
    } else if (isNaN(Number(availability.hourlyRate)) || Number(availability.hourlyRate) < 0) {
      newErrors.hourlyRate = 'Please enter a valid rate';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateForm()) {
      await saveSettingsToDatabase();
      onNext();
    }
  };

  const saveSettingsToDatabase = async () => {
    const api = getOnboardingBackendAPI();
    
    try {
      // Get income streams from Step 3 state
      const incomeStreams: IncomeStreamType[] = [];
      if (state.activeIncome?.royalties) incomeStreams.push('royalties');
      if (state.activeIncome?.offerServices) incomeStreams.push('services');
      if (state.activeIncome?.donations) incomeStreams.push('donations');

      // If no income streams selected, default to at least one to pass validation
      if (incomeStreams.length === 0) {
        incomeStreams.push('services'); // Default fallback
      }

      const settingsData = {
        incomeStreams,
        hourlyWeeklyCommitment: parseInt(availability.weeklyHours),
        openToOtherOpportunity: availability.largerOpportunities as OpenToOtherOpportunityType,
        hourlyRate: parseFloat(availability.hourlyRate),
        currency: availability.currency as CurrencyType,
      };

      console.log('Saving developer settings:', settingsData);
      const result = await api.setDeveloperSettings(settingsData);
      
      if (result && !(result instanceof Error)) {
        console.log('Settings saved successfully:', result);
      } else {
        console.error('Failed to save settings:', result);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="bg-[#0e1f35] box-border content-stretch flex flex-col gap-[50px] items-center justify-start pt-[80px] pb-0 px-0 relative size-full">
      
      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} />

      {/* Form Content */}
      <div className="box-border content-stretch flex flex-col gap-12 items-center justify-start p-0 relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-8 items-center justify-center p-0 relative shrink-0 w-[900px]">
          
          {/* Section Title */}
          <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-center w-[700px]">
            <div className="font-michroma not-italic relative shrink-0 text-[32px] w-full">
              <p className="block leading-[1.3]">Availability & Rate</p>
            </div>
            <div className="font-montserrat font-normal leading-[1.5] relative shrink-0 text-[16px] w-full">
              <p className="block">Let us know your availability and pricing preferences</p>
            </div>
          </div>

          {/* Form Fields Container */}
          <div className="box-border content-stretch flex flex-col gap-8 items-start justify-start p-0 relative shrink-0 w-full">
            
            {/* Weekly Commitment Section */}
            <div className="bg-[#14233a] box-border content-stretch flex flex-col gap-6 items-start justify-start px-8 py-6 relative rounded-md shrink-0 w-full border border-[rgba(255,255,255,0.2)]">
              <div className="box-border content-stretch flex flex-row gap-4 items-center justify-between p-0 relative shrink-0 w-full">
                <div className="flex-1">
                  <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[20px] text-left mb-2">
                    <p className="block leading-[1.3]">Your Weekly Commitment</p>
                  </div>
                  <div className="font-montserrat font-normal relative shrink-0 text-[#ffffff] text-[14px] text-left opacity-70">
                    <p className="block leading-[1.5]">How many hours per week can you dedicate to open source work?</p>
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <div className="bg-[#202f45] box-border flex flex-row gap-2 items-center justify-between px-4 py-3 relative rounded-md w-[120px]">
                    <input
                      type="text"
                      value={availability.weeklyHours}
                      onChange={(e) => handleInputChange('weeklyHours', e.target.value)}
                      placeholder="0"
                      className="w-full bg-transparent font-montserrat font-normal text-[#ffffff] text-[16px] text-center outline-none placeholder:opacity-60"
                    />
                    <span className="font-montserrat font-normal text-[#ffffff] text-[14px] opacity-60">hrs</span>
                  </div>
                  <button
                    onClick={() => setShowCommentInput(!showCommentInput)}
                    className="bg-[#202f45] p-3 rounded-md hover:bg-[#2a3f56] transition-colors"
                    title="Add comment"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 9.5C18.0034 10.8199 17.6951 12.1219 17.1 13.3C16.3944 14.7117 15.3098 15.8992 13.9674 16.7293C12.6251 17.5594 11.0782 17.9994 9.49999 18C8.18013 18.0034 6.87812 17.6951 5.69999 17.1L1.99999 18L2.89999 14.3C2.30493 13.1219 1.99656 11.8199 1.99999 10.5C2.00061 8.92176 2.44061 7.37485 3.27072 6.03255C4.10083 4.69025 5.28825 3.60557 6.69999 2.9C7.87812 2.30493 9.18013 1.99656 10.5 2H11C13.0843 2.11502 15.053 2.99479 16.5291 4.47089C18.0052 5.94699 18.885 7.91568 19 10V10.5H18Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 3V13M5 8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              {errors.weeklyHours && (
                <div className="text-red-400 text-sm">{errors.weeklyHours}</div>
              )}
              
              {/* Expandable Comment Section */}
              {showCommentInput && (
                <div className="bg-[#202f45] box-border content-stretch flex flex-col gap-3 items-start justify-start p-4 relative rounded-md shrink-0 w-full">
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="font-montserrat font-normal text-[#ffffff] text-[14px]">
                      <p>Additional comments about your availability:</p>
                    </div>
                    <button
                      onClick={() => setShowCommentInput(false)}
                      className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <textarea
                    value={availability.comments}
                    onChange={(e) => handleInputChange('comments', e.target.value)}
                    placeholder="e.g., I'm available on weekends, prefer morning hours, etc."
                    className="w-full h-24 bg-[#14233a] px-3 py-2 font-montserrat font-normal text-[#ffffff] text-[14px] rounded-md outline-none placeholder:opacity-60 resize-none"
                  />
                </div>
              )}
            </div>

            {/* Larger Opportunities Section */}
            <div className="bg-[#14233a] box-border content-stretch flex flex-col gap-6 items-start justify-start px-8 py-6 relative rounded-md shrink-0 w-full border border-[rgba(255,255,255,0.2)]">
              <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[20px] text-left">
                <p className="block leading-[1.3]">Larger Opportunities</p>
              </div>
              <div className="font-montserrat font-normal relative shrink-0 text-[#ffffff] text-[14px] text-left opacity-70">
                <p className="block leading-[1.5]">Are you interested in taking on larger projects or full-time opportunities?</p>
              </div>
              <div className="box-border content-stretch flex flex-row gap-6 items-center justify-start p-0 relative shrink-0 w-full">
                <button
                  onClick={() => handleInputChange('largerOpportunities', 'yes')}
                  className={`px-6 py-3 rounded-md font-montserrat font-normal text-[16px] transition-all ${
                    availability.largerOpportunities === 'yes'
                      ? 'bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] text-[#ffffff]'
                      : 'bg-[#202f45] text-[#ffffff] hover:bg-[#2a3f56]'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleInputChange('largerOpportunities', 'maybe')}
                  className={`px-6 py-3 rounded-md font-montserrat font-normal text-[16px] transition-all ${
                    availability.largerOpportunities === 'maybe'
                      ? 'bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] text-[#ffffff]'
                      : 'bg-[#202f45] text-[#ffffff] hover:bg-[#2a3f56]'
                  }`}
                >
                  Maybe
                </button>
                <button
                  onClick={() => handleInputChange('largerOpportunities', 'no')}
                  className={`px-6 py-3 rounded-md font-montserrat font-normal text-[16px] transition-all ${
                    availability.largerOpportunities === 'no'
                      ? 'bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] text-[#ffffff]'
                      : 'bg-[#202f45] text-[#ffffff] hover:bg-[#2a3f56]'
                  }`}
                >
                  No
                </button>
              </div>
              {errors.largerOpportunities && (
                <div className="text-red-400 text-sm">{errors.largerOpportunities}</div>
              )}
            </div>

            {/* Indicative Rate Section */}
            <div className="bg-[#14233a] box-border content-stretch flex flex-col gap-6 items-start justify-start px-8 py-6 relative rounded-md shrink-0 w-full border border-[rgba(255,255,255,0.2)]">
              <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[20px] text-left">
                <p className="block leading-[1.3]">Your Indicative Rate</p>
              </div>
              <div className="font-montserrat font-normal relative shrink-0 text-[#ffffff] text-[14px] text-left opacity-70">
                <p className="block leading-[1.5]">What's your preferred hourly rate for open source work?</p>
              </div>
              <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
                <select
                  value={availability.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="bg-[#202f45] px-4 py-3 rounded-md font-montserrat font-normal text-[#ffffff] text-[16px] outline-none cursor-pointer hover:bg-[#2a3f56] transition-colors"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CHF">CHF</option>
                </select>
                <div className="bg-[#202f45] box-border flex flex-row gap-2 items-center justify-between px-4 py-3 relative rounded-md w-[150px]">
                  <span className="font-montserrat font-normal text-[#ffffff] text-[16px] opacity-60">$</span>
                  <input
                    type="text"
                    value={availability.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    placeholder="0"
                    className="w-full bg-transparent font-montserrat font-normal text-[#ffffff] text-[16px] text-center outline-none placeholder:opacity-60"
                  />
                  <span className="font-montserrat font-normal text-[#ffffff] text-[14px] opacity-60">/hr</span>
                </div>
              </div>
              {errors.hourlyRate && (
                <div className="text-red-400 text-sm">{errors.hourlyRate}</div>
              )}
            </div>
          </div>

          {/* Button Group */}
          <div className="box-border content-stretch flex flex-row gap-4 h-12 items-end justify-end p-0 relative shrink-0 w-[900px]">
            <button
              onClick={onBack}
              className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 border border-[#ffffff] transition-all hover:bg-[rgba(255,255,255,0.1)]"
            >
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">Back</p>
              </div>
            </button>

            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all hover:scale-105"
            >
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">Next</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}