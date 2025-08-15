import React, { useState, useEffect } from 'react';
import { OnboardingState } from '../OnboardingFlow';
import ProgressBar from '../components/ProgressBar';
import { getOnboardingBackendAPI } from 'src/services';
import type { IncomeStreamType } from 'src/api/dto/onboarding/DeveloperProfile.dto';

// Inline SVG components replacing localhost assets
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FireIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 6.5C13.5 9.5 11 10.5 10 10.5C9 10.5 6.5 9.5 6.5 6.5C6.5 4.5 8.5 2.5 10 2.5C11.5 2.5 13.5 4.5 13.5 6.5Z" fill="currentColor"/>
    <path d="M10 17.5C7.5 17.5 5.5 15.5 5.5 13C5.5 10.5 7 9.5 8.5 8.5C9 8.2 9.5 7.8 10 7.5C10.5 7.8 11 8.2 11.5 8.5C13 9.5 14.5 10.5 14.5 13C14.5 15.5 12.5 17.5 10 17.5Z" fill="currentColor"/>
  </svg>
);

// Ambiguous assets removed: imgSec2Img, imgDownload

interface FundingOptions {
  royalties: boolean;
  offerServices: boolean;
  donations: boolean;
}

interface Step3ActiveIncomeProps {
  state: OnboardingState;
  updateState: (updates: Partial<OnboardingState>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
}

interface ToggleProps {
  isEnabled: boolean;
  onChange: (enabled: boolean) => void;
}

function Toggle({ isEnabled, onChange }: ToggleProps) {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative">
      <div className="font-montserrat font-normal leading-[0] relative shrink-0 text-[14px] text-left text-nowrap"
           style={{ color: isEnabled ? 'rgba(255,255,255,0.5)' : '#ffffff' }}>
        <p className="block leading-[1.5] whitespace-pre">No</p>
      </div>
      <button
        onClick={() => onChange(!isEnabled)}
        className={`h-8 w-[52px] flex items-center px-1 py-0.5 relative rounded-[100px] transition-all ${
          isEnabled 
            ? 'bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] justify-end' 
            : 'bg-[#202f45] justify-start'
        }`}
      >
        <div className={`bg-[#ffffff] rounded-full transition-all ${
          isEnabled ? 'w-6 h-6' : 'w-6 h-6'
        }`} />
      </button>
      <div className="font-montserrat font-normal leading-[0] relative shrink-0 text-[14px] text-left text-nowrap"
           style={{ color: isEnabled ? '#ffffff' : 'rgba(255,255,255,0.5)' }}>
        <p className="block leading-[1.5] whitespace-pre">Yes</p>
      </div>
    </div>
  );
}

interface FundingCardProps {
  title: string;
  description: string;
  isEnabled: boolean;
  onChange: (enabled: boolean) => void;
  isRecommended?: boolean;
  hasLearnMore?: boolean;
  onLearnMore?: () => void;
}

function FundingCard({ title, description, isEnabled, onChange, isRecommended = false, hasLearnMore = false, onLearnMore }: FundingCardProps) {
  return (
    <div className="basis-0 bg-[#14233a] box-border content-stretch flex flex-col gap-[30px] grow items-start justify-start min-h-px min-w-px p-[20px] relative rounded-md self-stretch shrink-0 border border-[rgba(255,255,255,0.2)]">
      
      {/* Toggle Section */}
      <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
        {isRecommended && (
          <div className="bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-2.5 py-0.5 relative rounded-[50px] shrink-0">
            <FireIcon />
            <div className="font-montserrat font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
              <p className="block leading-[1.5] whitespace-pre">Get Paid</p>
            </div>
          </div>
        )}
        {!isRecommended && <div />}
        <Toggle isEnabled={isEnabled} onChange={onChange} />
      </div>


      {/* Content */}
      <div className="box-border content-stretch flex flex-col gap-[9px] items-start justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-left w-full">
        <div className="font-michroma not-italic relative shrink-0 text-[28px] w-full">
          <p className="block leading-[1.2]">{title}</p>
        </div>
        <div className="font-montserrat font-normal relative shrink-0 text-[16px] w-full">
          <p className="block leading-[normal]">{description}</p>
        </div>
        {hasLearnMore && onLearnMore && (
          <div className="font-montserrat font-normal relative shrink-0 text-[16px] w-full">
            <button 
              onClick={onLearnMore}
              className="underline block leading-[normal] hover:text-[#ff7e4b] transition-colors text-left">
              Learn more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Step3ActiveIncome({ state, updateState, onNext, onBack, currentStep }: Step3ActiveIncomeProps) {
  const [fundingOptions, setFundingOptions] = useState<FundingOptions>(
    state.activeIncome || {
      royalties: true,
      offerServices: false, 
      donations: true
    }
  );
  const [showServiceModel, setShowServiceModel] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Helper function to save income streams to database
  const saveIncomeStreams = async (options: FundingOptions) => {
    const api = getOnboardingBackendAPI();
    const incomeStreams: IncomeStreamType[] = [];
    
    if (options.royalties) incomeStreams.push('royalties');
    if (options.offerServices) incomeStreams.push('services');
    if (options.donations) incomeStreams.push('donations');

    try {
      console.log('Saving income streams:', incomeStreams);
      const result = await api.setIncomeStreams({ incomeStreams });
      if (result && !(result instanceof Error)) {
        console.log('Income streams saved successfully:', result);
        return true;
      } else {
        console.error('Failed to save income streams:', result);
        return false;
      }
    } catch (error) {
      console.error('Error saving income streams:', error);
      return false;
    }
  };

  // Save default selections on mount if they haven't been saved yet
  useEffect(() => {
    if (!hasInitialized && !state.activeIncome) {
      // Save the default selections to the database
      saveIncomeStreams(fundingOptions);
      setHasInitialized(true);
      updateState({ activeIncome: fundingOptions });
    }
  }, [hasInitialized, state.activeIncome, fundingOptions, updateState]);

  const handleToggleChange = async (option: keyof FundingOptions, enabled: boolean) => {
    const newOptions = {
      ...fundingOptions,
      [option]: enabled
    };
    setFundingOptions(newOptions);
    updateState({ activeIncome: newOptions });

    // Save to database using helper function
    await saveIncomeStreams(newOptions);
  };

  const handleNext = async () => {
    // Ensure at least one funding option is selected
    const hasSelection = Object.values(fundingOptions).some(option => option);
    if (hasSelection) {
      // Save current selections to database before proceeding
      await saveIncomeStreams(fundingOptions);
      onNext();
    }
  };

  const hasSelection = Object.values(fundingOptions).some(option => option);

  return (
    <div className="bg-[#0e1f35] box-border content-stretch flex flex-col gap-[50px] items-center justify-start pt-[80px] pb-0 px-0 relative size-full">
      
      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} />

      {/* Form Content */}
      <div className="box-border content-stretch flex flex-col gap-12 items-center justify-start p-0 relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-8 items-center justify-center p-0 relative shrink-0 w-[700px]">
          
          {/* Section Title */}
          <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-center w-[600px]">
            <div className="font-michroma not-italic relative shrink-0 text-[32px] w-full">
              <p className="block leading-[1.3]">Choose how you get funded</p>
            </div>
            <div className="font-montserrat font-normal leading-[1.5] relative shrink-0 text-[16px] w-full">
              <p className="block mb-0">3 ways to get paid for your open source work.</p>
              <p className="block">Designed to respect free software and community-led projects.</p>
            </div>
          </div>

          {/* Funding Options Cards */}
          <div className="box-border content-stretch flex flex-row gap-5 items-start justify-start p-0 relative shrink-0 w-[1280px]">
            
            {/* Royalties Card */}
            <FundingCard
              title="Royalties"
              description="Earn when your project is used by other funded projects—even transitively."
              isEnabled={fundingOptions.royalties}
              onChange={(enabled) => handleToggleChange('royalties', enabled)}
            />

            {/* Offer Services Card (Recommended) */}
            <FundingCard
              title="Offer Services"
              description="Define your open source offerings, your terms, your rates, and your availability."
              isEnabled={fundingOptions.offerServices}
              onChange={(enabled) => handleToggleChange('offerServices', enabled)}
              isRecommended={true}
              hasLearnMore={true}
              onLearnMore={() => setShowServiceModel(true)}
            />

            {/* Donations Card */}
            <FundingCard
              title="Donations"
              description="Let companies fund you or your project—with or without public recognition."
              isEnabled={fundingOptions.donations}
              onChange={(enabled) => handleToggleChange('donations', enabled)}
            />
          </div>

          {/* Service Model Section (Expanded when Learn More is clicked) */}
          {showServiceModel && (
            <div className="bg-[#14233a] box-border content-stretch flex flex-col gap-8 items-center justify-start px-[19px] py-5 relative rounded-md shrink-0 w-[1280px] border border-[rgba(255,255,255,0.2)]">
              
              {/* Close button */}
              <div className="absolute box-border content-stretch flex flex-row gap-2.5 items-center justify-end right-[19px] p-0 top-[21px]">
                <button 
                  onClick={() => setShowServiceModel(false)}
                  className="relative shrink-0 size-4 hover:opacity-70 transition-opacity"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Section Title */}
              <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start p-0 relative shrink-0 w-[600px]">
                <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[25px] text-center w-full">
                  <p className="block leading-[1.3]">The Service Model</p>
                </div>
              </div>

              {/* Service Model Steps */}
              <div className="box-border content-stretch flex flex-row gap-5 items-center justify-start p-0 relative shrink-0 w-full">
                
                {/* Step 1 */}
                <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                  <div className="basis-0 bg-[#202f45] box-border content-stretch flex flex-col font-montserrat font-normal gap-[9px] grow h-full items-start justify-start leading-[0] min-h-px min-w-px overflow-clip px-5 py-[30px] relative rounded-md shrink-0 text-[#ffffff] text-left">
                    <div className="relative shrink-0 text-[40px] w-full">
                      <p className="block leading-[1.2]">1.</p>
                    </div>
                    <div className="relative shrink-0 text-[20px] w-full">
                      <p className="block leading-[1.2]">You define your service offering, pricing, and terms.</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                  <div className="basis-0 bg-[#202f45] box-border content-stretch flex flex-col font-montserrat font-normal gap-[9px] grow h-full items-start justify-start leading-[0] min-h-px min-w-px overflow-clip px-5 py-[30px] relative rounded-md shrink-0 text-[#ffffff] text-left">
                    <div className="relative shrink-0 text-[40px] w-full">
                      <p className="block leading-[1.2]">2.</p>
                    </div>
                    <div className="relative shrink-0 text-[20px] w-full">
                      <p className="block leading-[1.2]">Companies subscribe to monthly hours or request one-off tasks.</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                  <div className="basis-0 bg-[#202f45] box-border content-stretch flex flex-col font-montserrat font-normal gap-[9px] grow h-full items-start justify-start leading-[0] min-h-px min-w-px overflow-clip px-5 py-[30px] relative rounded-md shrink-0 text-[#ffffff] text-left">
                    <div className="relative shrink-0 text-[40px] w-full">
                      <p className="block leading-[1.2]">3.</p>
                    </div>
                    <div className="relative shrink-0 text-[20px] w-full">
                      <p className="block leading-[1.2]">We handle sales, marketing, contracts, billing, and expectations.</p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                  <div className="basis-0 bg-[#202f45] box-border content-stretch flex flex-col font-montserrat font-normal gap-[9px] grow h-full items-start justify-start leading-[0] min-h-px min-w-px overflow-clip px-5 py-[30px] relative rounded-md shrink-0 text-[#ffffff] text-left">
                    <div className="relative shrink-0 text-[40px] w-full">
                      <p className="block leading-[1.2]">4.</p>
                    </div>
                    <div className="relative shrink-0 text-[20px] w-full">
                      <p className="block leading-[1.2]">Every payment includes a donation to your project and its ecosystem.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Button Group */}
          <div className="box-border content-stretch flex flex-row gap-4 h-12 items-end justify-end p-0 relative shrink-0 w-[700px]">
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
              disabled={!hasSelection}
              className={`bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all ${
                !hasSelection 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-105'
              }`}
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