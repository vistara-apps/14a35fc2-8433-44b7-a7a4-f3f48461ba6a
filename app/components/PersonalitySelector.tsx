'use client';

import { useState } from 'react';
import { PlantPersonality } from '@/lib/types';
import { PLANT_PERSONALITIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface PersonalitySelectorProps {
  selected?: PlantPersonality;
  onSelect: (personality: PlantPersonality) => void;
  variant?: 'carousel' | 'list';
}

export function PersonalitySelector({ 
  selected, 
  onSelect, 
  variant = 'list' 
}: PersonalitySelectorProps) {
  const personalities = Object.entries(PLANT_PERSONALITIES);

  if (variant === 'carousel') {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-fg">Choose a Personality</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {personalities.map(([key, config]) => (
            <button
              key={key}
              onClick={() => onSelect(key as PlantPersonality)}
              className={cn(
                'flex-shrink-0 p-4 rounded-xl border-2 transition-all duration-200 min-w-[120px]',
                selected === key
                  ? 'border-accent bg-accent bg-opacity-10'
                  : 'border-white border-opacity-10 bg-surface hover:border-opacity-20'
              )}
            >
              <div className="text-3xl mb-2">{config.emoji}</div>
              <div className="text-sm font-medium text-fg">{config.name}</div>
              <div className="text-xs text-text-secondary mt-1">
                {config.description}
              </div>
            </button>
          ))}
        </div>
        
        {selected && (
          <div className="glass-card p-4 animate-fade-in">
            <h4 className="font-medium text-fg mb-2">Sample Message:</h4>
            <p className="text-sm text-text-secondary italic">
              "{PLANT_PERSONALITIES[selected].sampleMessage}"
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-fg">Choose a Personality</h3>
      <div className="space-y-2">
        {personalities.map(([key, config]) => (
          <button
            key={key}
            onClick={() => onSelect(key as PlantPersonality)}
            className={cn(
              'w-full p-4 rounded-lg border-2 transition-all duration-200 text-left',
              selected === key
                ? 'border-accent bg-accent bg-opacity-10'
                : 'border-white border-opacity-10 bg-surface hover:border-opacity-20'
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{config.emoji}</span>
              <div className="flex-1">
                <div className="font-medium text-fg">{config.name}</div>
                <div className="text-sm text-text-secondary">
                  {config.description}
                </div>
              </div>
            </div>
            
            {selected === key && (
              <div className="mt-3 pt-3 border-t border-white border-opacity-10">
                <p className="text-sm text-text-secondary italic">
                  "{config.sampleMessage}"
                </p>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
