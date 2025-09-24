'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { QRScannerFrame } from '../components/QRScannerFrame';
import { PersonalitySelector } from '../components/PersonalitySelector';
import { PlantPersonality } from '@/lib/types';
import { PLANT_SPECIES } from '@/lib/constants';
import { ArrowLeft, Camera, Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';

type ScanStep = 'scan' | 'species' | 'personality' | 'environment' | 'complete';

export default function ScanPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ScanStep>('scan');
  const [qrData, setQrData] = useState<string>('');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('');
  const [selectedPersonality, setSelectedPersonality] = useState<PlantPersonality>('friendly');
  const [plantName, setPlantName] = useState<string>('');
  const [environment, setEnvironment] = useState({
    light: 'medium' as const,
    potSize: 'medium' as const,
    soilType: 'regular' as const,
  });

  const handleQRScan = (data: string) => {
    setQrData(data);
    setCurrentStep('species');
  };

  const handleSpeciesSelect = (speciesId: string) => {
    setSelectedSpecies(speciesId);
    setCurrentStep('personality');
  };

  const handlePersonalitySelect = (personality: PlantPersonality) => {
    setSelectedPersonality(personality);
    setCurrentStep('environment');
  };

  const handleComplete = () => {
    // In a real app, this would save to database
    console.log('Plant registered:', {
      qrData,
      species: selectedSpecies,
      personality: selectedPersonality,
      name: plantName,
      environment,
    });
    
    setCurrentStep('complete');
    
    // Redirect to home after 2 seconds
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'scan':
        return (
          <QRScannerFrame 
            onScan={handleQRScan}
            variant="instructions"
          />
        );

      case 'species':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Leaf className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-fg mb-2">
                What type of plant is this?
              </h2>
              <p className="text-text-secondary">
                Select your plant species to get personalized care tips
              </p>
            </div>

            <div className="space-y-2">
              {PLANT_SPECIES.map((species) => (
                <button
                  key={species.id}
                  onClick={() => handleSpeciesSelect(species.id)}
                  className="w-full p-4 glass-card text-left hover:bg-opacity-90 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-fg">{species.name}</h3>
                      <p className="text-sm text-text-secondary">
                        Water every {species.waterFrequency} days • {species.difficulty}
                      </p>
                    </div>
                    <div className="text-2xl">🌿</div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentStep('scan')}
              className="btn-secondary w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Scanning
            </button>
          </div>
        );

      case 'personality':
        return (
          <div className="space-y-6">
            <PersonalitySelector
              selected={selectedPersonality}
              onSelect={handlePersonalitySelect}
              variant="carousel"
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep('species')}
                className="btn-secondary flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <button
                onClick={() => setCurrentStep('environment')}
                className="btn-primary flex-1"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 'environment':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-fg mb-2">
                Tell us about your plant's environment
              </h2>
              <p className="text-text-secondary">
                This helps us give better care recommendations
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-fg mb-2">
                  Plant Name
                </label>
                <input
                  type="text"
                  placeholder="Give your plant a name..."
                  value={plantName}
                  onChange={(e) => setPlantName(e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-white border-opacity-10 rounded-lg text-fg placeholder-text-secondary focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-fg mb-2">
                  Light Conditions
                </label>
                <select
                  value={environment.light}
                  onChange={(e) => setEnvironment(prev => ({ ...prev, light: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-surface border border-white border-opacity-10 rounded-lg text-fg focus:outline-none focus:border-accent"
                >
                  <option value="low">Low Light</option>
                  <option value="medium">Medium Light</option>
                  <option value="bright">Bright Indirect</option>
                  <option value="direct">Direct Sunlight</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-fg mb-2">
                  Pot Size
                </label>
                <select
                  value={environment.potSize}
                  onChange={(e) => setEnvironment(prev => ({ ...prev, potSize: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-surface border border-white border-opacity-10 rounded-lg text-fg focus:outline-none focus:border-accent"
                >
                  <option value="small">Small (4-6 inches)</option>
                  <option value="medium">Medium (6-10 inches)</option>
                  <option value="large">Large (10+ inches)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-fg mb-2">
                  Soil Type
                </label>
                <select
                  value={environment.soilType}
                  onChange={(e) => setEnvironment(prev => ({ ...prev, soilType: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-surface border border-white border-opacity-10 rounded-lg text-fg focus:outline-none focus:border-accent"
                >
                  <option value="regular">Regular Potting Mix</option>
                  <option value="succulent">Succulent/Cactus Mix</option>
                  <option value="orchid">Orchid Bark Mix</option>
                  <option value="acidic">Acidic Mix</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep('personality')}
                className="btn-secondary flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <button
                onClick={handleComplete}
                disabled={!plantName.trim()}
                className="btn-primary flex-1"
              >
                Complete Setup
              </button>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">🎉</span>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-fg mb-2">
                Welcome, {plantName}!
              </h2>
              <p className="text-text-secondary">
                Your plant is all set up and ready for personalized care reminders
              </p>
            </div>

            <div className="glass-card p-4">
              <p className="text-sm text-text-secondary mb-2">
                You'll receive your first SMS reminder soon:
              </p>
              <p className="text-fg italic">
                "Hey there! {plantName} here. Thanks for setting me up! I'm excited to grow with you! 🌱"
              </p>
            </div>

            <div className="animate-spin w-6 h-6 border-2 border-accent border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-text-secondary">
              Redirecting to home...
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppShell>
      <div className="p-6">
        {renderStep()}
      </div>
    </AppShell>
  );
}
