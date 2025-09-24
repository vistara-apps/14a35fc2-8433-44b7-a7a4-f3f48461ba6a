import { PlantPersonalityConfig } from './types';

export const PLANT_PERSONALITIES: Record<string, PlantPersonalityConfig> = {
  friendly: {
    name: 'Friendly',
    description: 'Warm and encouraging',
    emoji: '😊',
    sampleMessage: "Hey there! I'm feeling a bit thirsty. Could you water me soon? Thanks, friend!"
  },
  sassy: {
    name: 'Sassy',
    description: 'Playful and cheeky',
    emoji: '😏',
    sampleMessage: "Yo bro! It's your mint. I'm thirsty and don't wanna die, let me drink."
  },
  zen: {
    name: 'Zen',
    description: 'Calm and mindful',
    emoji: '🧘',
    sampleMessage: "In stillness, I seek water. When you have a moment, please nourish my roots."
  },
  dramatic: {
    name: 'Dramatic',
    description: 'Theatrical and expressive',
    emoji: '🎭',
    sampleMessage: "DARLING! I'm simply PARCHED! Without water soon, I shall surely perish!"
  },
  scientific: {
    name: 'Scientific',
    description: 'Factual and precise',
    emoji: '🔬',
    sampleMessage: "Soil moisture levels are suboptimal. H2O required within 24 hours for cellular function."
  },
  cheerful: {
    name: 'Cheerful',
    description: 'Upbeat and positive',
    emoji: '🌟',
    sampleMessage: "Good morning sunshine! I'm ready for my daily drink! Let's grow together! 🌱"
  }
};

export const PLANT_SPECIES = [
  { id: 'pothos', name: 'Pothos', waterFrequency: 7, difficulty: 'easy' },
  { id: 'snake-plant', name: 'Snake Plant', waterFrequency: 14, difficulty: 'easy' },
  { id: 'monstera', name: 'Monstera', waterFrequency: 7, difficulty: 'medium' },
  { id: 'fiddle-leaf', name: 'Fiddle Leaf Fig', waterFrequency: 7, difficulty: 'hard' },
  { id: 'succulent', name: 'Succulent', waterFrequency: 14, difficulty: 'easy' },
  { id: 'peace-lily', name: 'Peace Lily', waterFrequency: 5, difficulty: 'medium' },
  { id: 'rubber-tree', name: 'Rubber Tree', waterFrequency: 7, difficulty: 'medium' },
  { id: 'mint', name: 'Mint', waterFrequency: 3, difficulty: 'easy' },
];

export const CARE_TIPS = {
  water: [
    "Check soil moisture with your finger first",
    "Water thoroughly until it drains from the bottom",
    "Use room temperature water",
    "Water in the morning when possible"
  ],
  fertilize: [
    "Use diluted liquid fertilizer",
    "Fertilize during growing season (spring/summer)",
    "Don't fertilize dry soil",
    "Less is more with fertilizer"
  ],
  light: [
    "Rotate your plant weekly for even growth",
    "Watch for signs of too much/little light",
    "Consider seasonal light changes",
    "Use sheer curtains to filter harsh light"
  ]
};
