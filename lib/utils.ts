import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PlantPersonality } from './types';
import { PLANT_PERSONALITIES } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function getDaysAgo(date: Date): number {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function generatePersonalityMessage(
  personality: PlantPersonality,
  plantName: string,
  careType: 'water' | 'fertilize' | 'repot',
  daysOverdue: number = 0
): string {
  const config = PLANT_PERSONALITIES[personality];
  
  const messages = {
    water: {
      friendly: [
        `Hey there! ${plantName} here. I'm feeling a bit thirsty. Could you water me soon? Thanks, friend!`,
        `Hi! It's ${plantName}. My soil is getting pretty dry. A drink would be wonderful!`,
        `Hello! ${plantName} checking in. I could really use some water when you get a chance.`
      ],
      sassy: [
        `Yo! It's your ${plantName}. I'm thirsty and don't wanna die, let me drink.`,
        `Um, hello? ${plantName} here. Water. Now. Please and thank you.`,
        `Hey you! ${plantName} speaking. I'm parched over here. Help a plant out?`
      ],
      zen: [
        `In stillness, I seek water. ${plantName} here, mindfully requesting hydration.`,
        `Peace be with you. ${plantName} gently asks for water to nourish my being.`,
        `Breathe in, breathe out. ${plantName} needs water to maintain inner balance.`
      ],
      dramatic: [
        `DARLING! ${plantName} here, and I'm simply PARCHED! Without water soon, I shall surely perish!`,
        `OH THE DRAMA! ${plantName} is withering away! Save me with your life-giving water!`,
        `*Dramatic gasp* ${plantName} here, dying of thirst! This is my final plea!`
      ],
      scientific: [
        `${plantName} reporting: Soil moisture levels suboptimal. H2O required within 24 hours.`,
        `Data analysis complete. ${plantName} requires immediate hydration for cellular function.`,
        `${plantName} status: Dehydrated. Recommend water application to restore homeostasis.`
      ],
      cheerful: [
        `Good morning sunshine! ${plantName} here, ready for my daily drink! Let's grow together! 🌱`,
        `Hey there, plant parent! ${plantName} is excited for some refreshing water! 💧`,
        `Woohoo! ${plantName} here, and I'm ready to drink up and shine bright! ✨`
      ]
    },
    fertilize: {
      friendly: `Hi! ${plantName} here. I'm ready for some nutrients to help me grow strong!`,
      sassy: `${plantName} here. Time for my vitamins, human. I've got growing to do!`,
      zen: `${plantName} seeks nourishment for the soul... and roots. Fertilizer, please.`,
      dramatic: `${plantName} DEMANDS nutrients! Feed me so I may flourish magnificently!`,
      scientific: `${plantName} requires macro and micronutrients for optimal photosynthesis.`,
      cheerful: `Yay! ${plantName} is ready for some plant food! Let's get growing! 🌿`
    },
    repot: {
      friendly: `${plantName} here! I think I'm getting too big for my pot. New home time?`,
      sassy: `${plantName} speaking. This pot is cramped. I need an upgrade, stat!`,
      zen: `${plantName} has outgrown this vessel. Time for a new beginning.`,
      dramatic: `${plantName} is TRAPPED! Free me from this tiny prison with a bigger pot!`,
      scientific: `${plantName} root system has exceeded container capacity. Repotting required.`,
      cheerful: `${plantName} is ready for a bigger home! New pot, new adventures! 🏠`
    }
  };

  const personalityMessages = messages[careType][personality];
  
  if (Array.isArray(personalityMessages)) {
    const randomIndex = Math.floor(Math.random() * personalityMessages.length);
    return personalityMessages[randomIndex];
  }
  
  return personalityMessages;
}

export function getNextWateringDate(lastWatered: Date, waterFrequency: number): Date {
  const nextDate = new Date(lastWatered);
  nextDate.setDate(nextDate.getDate() + waterFrequency);
  return nextDate;
}

export function isOverdue(scheduledDate: Date): boolean {
  return new Date() > scheduledDate;
}

export function generateQRCode(): string {
  return `PP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
