export interface User {
  userId: string;
  farcasterId: string;
  phoneNumber?: string;
  subscriptionStatus: 'trial' | 'active' | 'inactive' | 'cancelled';
  paymentInfo?: {
    customerId: string;
    subscriptionId: string;
  };
}

export interface Plant {
  plantId: string;
  userId: string;
  qrCodeId: string;
  nickName: string;
  species: string;
  customPersonality: PlantPersonality;
  lightPreference: 'low' | 'medium' | 'bright' | 'direct';
  potSize: 'small' | 'medium' | 'large';
  soilType: 'regular' | 'succulent' | 'orchid' | 'acidic';
  lastWatered?: Date;
  lastFertilized?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CareReminder {
  reminderId: string;
  plantId: string;
  type: 'water' | 'fertilize' | 'repot' | 'light';
  scheduledTime: Date;
  sentTime?: Date;
  status: 'pending' | 'sent' | 'completed' | 'skipped';
  message: string;
}

export interface Sticker {
  stickerId: string;
  qrCodeData: string;
  design: string;
  purchaseInfo?: {
    userId: string;
    purchaseDate: Date;
    price: number;
  };
}

export type PlantPersonality = 
  | 'friendly' 
  | 'sassy' 
  | 'zen' 
  | 'dramatic' 
  | 'scientific' 
  | 'cheerful';

export interface PlantPersonalityConfig {
  name: string;
  description: string;
  emoji: string;
  sampleMessage: string;
}

export interface CareAction {
  type: 'water' | 'fertilize' | 'repot';
  timestamp: Date;
  plantId: string;
  notes?: string;
}
