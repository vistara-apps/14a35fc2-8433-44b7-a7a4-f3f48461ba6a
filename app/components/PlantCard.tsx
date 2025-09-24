'use client';

import { Plant } from '@/lib/types';
import { formatDate, getDaysAgo, getNextWateringDate } from '@/lib/utils';
import { Droplets, Sun, Clock, AlertTriangle } from 'lucide-react';
import { PLANT_PERSONALITIES, PLANT_SPECIES } from '@/lib/constants';

interface PlantCardProps {
  plant: Plant;
  variant?: 'compact' | 'detailed';
  onClick?: () => void;
}

export function PlantCard({ plant, variant = 'compact', onClick }: PlantCardProps) {
  const species = PLANT_SPECIES.find(s => s.id === plant.species);
  const personality = PLANT_PERSONALITIES[plant.customPersonality];
  
  const lastWateredDays = plant.lastWatered ? getDaysAgo(plant.lastWatered) : null;
  const nextWateringDate = plant.lastWatered && species 
    ? getNextWateringDate(plant.lastWatered, species.waterFrequency)
    : null;
  
  const isOverdue = nextWateringDate ? new Date() > nextWateringDate : false;

  if (variant === 'compact') {
    return (
      <div 
        className="plant-card animate-fade-in"
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">{personality.emoji}</span>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-fg truncate">{plant.nickName}</h3>
              {isOverdue && (
                <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-text-secondary truncate">
              {species?.name || 'Unknown species'}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-xs text-text-secondary">
              <Droplets className="w-3 h-3" />
              <span>{lastWateredDays ? `${lastWateredDays}d ago` : 'Never'}</span>
            </div>
            {nextWateringDate && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                isOverdue 
                  ? 'bg-accent bg-opacity-20 text-accent' 
                  : 'bg-surface text-text-secondary'
              }`}>
                {isOverdue ? 'Overdue' : formatDate(nextWateringDate)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="plant-card animate-slide-up"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-primary bg-opacity-20 rounded-xl flex items-center justify-center">
          <span className="text-3xl">{personality.emoji}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-fg">{plant.nickName}</h3>
            {isOverdue && (
              <AlertTriangle className="w-5 h-5 text-accent" />
            )}
          </div>
          
          <p className="text-text-secondary mb-3">
            {species?.name || 'Unknown species'} • {personality.name}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs text-text-secondary">Last watered</p>
                <p className="text-sm font-medium text-fg">
                  {lastWateredDays ? `${lastWateredDays} days ago` : 'Never'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-accent" />
              <div>
                <p className="text-xs text-text-secondary">Light</p>
                <p className="text-sm font-medium text-fg capitalize">
                  {plant.lightPreference}
                </p>
              </div>
            </div>
          </div>
          
          {nextWateringDate && (
            <div className="mt-3 p-3 bg-surface bg-opacity-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-text-secondary" />
                <span className="text-sm text-text-secondary">
                  Next watering: 
                </span>
                <span className={`text-sm font-medium ${
                  isOverdue ? 'text-accent' : 'text-fg'
                }`}>
                  {isOverdue ? 'Overdue!' : formatDate(nextWateringDate)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
