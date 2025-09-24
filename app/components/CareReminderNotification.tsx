'use client';

import { CareReminder } from '@/lib/types';
import { Droplets, Zap, Home, Sun, Clock, Check } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface CareReminderNotificationProps {
  reminder: CareReminder;
  variant?: 'water' | 'fertilize' | 'repot';
  onComplete?: (reminderId: string) => void;
}

export function CareReminderNotification({ 
  reminder, 
  variant = 'water',
  onComplete 
}: CareReminderNotificationProps) {
  const icons = {
    water: Droplets,
    fertilize: Zap,
    repot: Home,
    light: Sun
  };

  const colors = {
    water: 'text-blue-400',
    fertilize: 'text-green-400',
    repot: 'text-orange-400',
    light: 'text-yellow-400'
  };

  const Icon = icons[reminder.type] || Droplets;
  const iconColor = colors[reminder.type] || 'text-blue-400';

  return (
    <div className="glass-card p-4 animate-slide-up">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 bg-surface rounded-full flex items-center justify-center ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-fg capitalize">
              {reminder.type} Reminder
            </h4>
            {reminder.status === 'completed' && (
              <Check className="w-4 h-4 text-green-400" />
            )}
          </div>
          
          <p className="text-sm text-text-secondary mb-2">
            {reminder.message}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-text-secondary">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>
                {reminder.sentTime 
                  ? formatDate(reminder.sentTime)
                  : formatDate(reminder.scheduledTime)
                }
              </span>
            </div>
            
            <span className={`px-2 py-1 rounded-full text-xs ${
              reminder.status === 'completed' 
                ? 'bg-green-400 bg-opacity-20 text-green-400'
                : reminder.status === 'sent'
                ? 'bg-blue-400 bg-opacity-20 text-blue-400'
                : 'bg-orange-400 bg-opacity-20 text-orange-400'
            }`}>
              {reminder.status}
            </span>
          </div>
        </div>
        
        {reminder.status !== 'completed' && onComplete && (
          <button
            onClick={() => onComplete(reminder.reminderId)}
            className="btn-primary px-3 py-1 text-sm"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
}
