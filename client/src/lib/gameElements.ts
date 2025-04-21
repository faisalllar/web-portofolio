export type ElementType = 'platform' | 'wall' | 'bounce' | 'spike' | 'coin' | 'key' | 'heart' | 'star' | 'player' | 'enemy' | 'npc' | 'flag';

export interface GameElement {
  id: string;
  type: 'terrain' | 'item' | 'character';
  name: string;
  elementType: ElementType;
  icon?: React.ReactNode;
  width?: number;
  height?: number;
  color?: string;
  properties?: Record<string, any>;
}

// Terrain elements
export const terrainElements: GameElement[] = [
  {
    id: 'platform',
    type: 'terrain',
    name: 'Platform',
    elementType: 'platform',
    width: 100,
    height: 10,
    color: 'bg-gray-800 dark:bg-gray-300',
    properties: {
      solid: true,
      movable: false,
    },
  },
  {
    id: 'wall',
    type: 'terrain',
    name: 'Wall',
    elementType: 'wall',
    width: 10,
    height: 100,
    color: 'bg-gray-800 dark:bg-gray-300',
    properties: {
      solid: true,
      movable: false,
    },
  },
  {
    id: 'bounce',
    type: 'terrain',
    name: 'Bouncer',
    elementType: 'bounce',
    width: 80,
    height: 10,
    color: 'bg-green-500 dark:bg-green-400',
    properties: {
      bounceForce: 800,
      solid: true,
    },
  },
  {
    id: 'spike',
    type: 'terrain',
    name: 'Spike',
    elementType: 'spike',
    width: 20,
    height: 20,
    color: 'border-transparent border-b-red-500',
    properties: {
      damage: 1,
      solid: false,
    },
  },
];

// Item elements
export const itemElements: GameElement[] = [
  {
    id: 'coin',
    type: 'item',
    name: 'Coin',
    elementType: 'coin',
    width: 24,
    height: 24,
    color: 'bg-yellow-400 border-2 border-yellow-500',
    properties: {
      value: 10,
      collectable: true,
    },
  },
  {
    id: 'key',
    type: 'item',
    name: 'Key',
    elementType: 'key',
    width: 24,
    height: 24,
    color: 'text-blue-500',
    properties: {
      collectable: true,
      unlocks: 'door',
    },
  },
  {
    id: 'heart',
    type: 'item',
    name: 'Heart',
    elementType: 'heart',
    width: 24,
    height: 24,
    color: 'text-red-500',
    properties: {
      collectable: true,
      healthBoost: 1,
    },
  },
  {
    id: 'star',
    type: 'item',
    name: 'Star',
    elementType: 'star',
    width: 24,
    height: 24,
    color: 'text-yellow-400',
    properties: {
      collectable: true,
      invincibility: true,
      duration: 5000,
    },
  },
];

// Character elements
export const characterElements: GameElement[] = [
  {
    id: 'player',
    type: 'character',
    name: 'Player',
    elementType: 'player',
    width: 24,
    height: 24,
    color: 'bg-blue-500',
    properties: {
      movable: true,
      speed: 200,
      jumpHeight: 400,
    },
  },
  {
    id: 'enemy',
    type: 'character',
    name: 'Enemy',
    elementType: 'enemy',
    width: 24,
    height: 24,
    color: 'bg-red-500',
    properties: {
      movable: true,
      hostile: true,
      damage: 1,
      speed: 100,
    },
  },
  {
    id: 'npc',
    type: 'character',
    name: 'NPC',
    elementType: 'npc',
    width: 24,
    height: 24,
    color: 'bg-purple-500',
    properties: {
      movable: false,
      interactable: true,
      dialogue: 'Hello there!',
    },
  },
  {
    id: 'flag',
    type: 'character',
    name: 'Flag',
    elementType: 'flag',
    width: 24,
    height: 24,
    color: 'text-green-600',
    properties: {
      finishPoint: true,
      nextLevel: '',
    },
  },
];

// All elements combined
export const allGameElements = [
  ...terrainElements,
  ...itemElements,
  ...characterElements,
];

// Helper function to find element by ID
export const getElementById = (id: string): GameElement | undefined => {
  return allGameElements.find(element => element.id === id);
};
