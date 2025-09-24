'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { PlantCard } from './components/PlantCard';
import { CareReminderNotification } from './components/CareReminderNotification';
import { Plant, CareReminder, User } from '@/lib/types';
import { Plus, MessageCircle, Bell } from 'lucide-react';
import Link from 'next/link';
import { generatePersonalityMessage } from '@/lib/utils';

// Mock data for demonstration
const mockUser: User = {
  userId: '1',
  farcasterId: 'plantlover123',
  phoneNumber: '+1234567890',
  subscriptionStatus: 'active',
};

const mockPlants: Plant[] = [
  {
    plantId: '1',
    userId: '1',
    qrCodeId: 'PP-001',
    nickName: 'Ferny',
    species: 'mint',
    customPersonality: 'sassy',
    lightPreference: 'bright',
    potSize: 'medium',
    soilType: 'regular',
    lastWatered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    plantId: '2',
    userId: '1',
    qrCodeId: 'PP-002',
    nickName: 'Sunny',
    species: 'pothos',
    customPersonality: 'cheerful',
    lightPreference: 'medium',
    potSize: 'large',
    soilType: 'regular',
    lastWatered: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockReminders: CareReminder[] = [
  {
    reminderId: '1',
    plantId: '1',
    type: 'water',
    scheduledTime: new Date(),
    sentTime: new Date(),
    status: 'sent',
    message: generatePersonalityMessage('sassy', 'Ferny', 'water'),
  },
];

export default function HomePage() {
  const [plants, setPlants] = useState<Plant[]>(mockPlants);
  const [reminders, setReminders] = useState<CareReminder[]>(mockReminders);
  const [user] = useState<User>(mockUser);

  const handleCompleteReminder = (reminderId: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.reminderId === reminderId 
          ? { ...reminder, status: 'completed' as const }
          : reminder
      )
    );
  };

  const overdueReminders = reminders.filter(r => r.status !== 'completed');
  const recentPlants = plants.slice(0, 3);

  return (
    <AppShell>
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-fg">
            Welcome back! 🌱
          </h1>
          <p className="text-text-secondary">
            Your plants are happy to see you
          </p>
        </div>

        {/* Chat Preview */}
        <div className="glass-card p-4 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-5 h-5 text-accent" />
            <h2 className="font-semibold text-fg">Recent Messages</h2>
          </div>
          
          {/* User message */}
          <div className="flex justify-end">
            <div className="chat-bubble-user">
              You have care message to loving your plant
            </div>
          </div>
          
          {/* Plant message */}
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-primary bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm">😏</span>
            </div>
            <div className="chat-bubble-plant">
              Yo bro! It's your mint. I'm thirsty and don't wanna die, let me drink.
            </div>
          </div>
        </div>

        {/* Active Reminders */}
        {overdueReminders.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-accent" />
              <h2 className="font-semibold text-fg">Care Reminders</h2>
            </div>
            
            {overdueReminders.map(reminder => (
              <CareReminderNotification
                key={reminder.reminderId}
                reminder={reminder}
                onComplete={handleCompleteReminder}
              />
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Link href="/scan" className="glass-card p-4 text-center hover:bg-opacity-90 transition-all duration-200">
            <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-fg">Add Plant</p>
          </Link>
          
          <Link href="/dashboard" className="glass-card p-4 text-center hover:bg-opacity-90 transition-all duration-200">
            <div className="w-12 h-12 bg-accent bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-sm font-medium text-fg">Dashboard</p>
          </Link>
          
          <Link href="/profile" className="glass-card p-4 text-center hover:bg-opacity-90 transition-all duration-200">
            <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">⚙️</span>
            </div>
            <p className="text-sm font-medium text-fg">Settings</p>
          </Link>
        </div>

        {/* My Plants */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-fg">My Plants</h2>
            <Link href="/dashboard" className="text-sm text-accent hover:underline">
              View All
            </Link>
          </div>
          
          {recentPlants.length > 0 ? (
            <div className="space-y-3">
              {recentPlants.map(plant => (
                <PlantCard
                  key={plant.plantId}
                  plant={plant}
                  variant="compact"
                  onClick={() => {
                    // Navigate to plant detail
                    console.log('Navigate to plant:', plant.plantId);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="font-semibold text-fg mb-2">No plants yet</h3>
              <p className="text-text-secondary mb-4">
                Scan a QR code to add your first plant
              </p>
              <Link href="/scan" className="btn-primary">
                Add Your First Plant
              </Link>
            </div>
          )}
        </div>

        {/* Subscription Status */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-fg">PlantPal Pro</h3>
              <p className="text-sm text-text-secondary capitalize">
                {user.subscriptionStatus} subscription
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-accent">$5.99/month</p>
              <p className="text-xs text-text-secondary">
                {plants.length}/10 plants
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
