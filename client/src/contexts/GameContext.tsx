import { createContext, useContext, useState, ReactNode } from 'react';
import { allGameElements, ElementType, GameElement, getElementById } from '@/lib/gameElements';

// Define the shape of a placed element on the game grid
export interface PlacedElement {
  id: string;
  elementId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  properties?: Record<string, any>;
}

// Define the shape of the game level
export interface GameLevel {
  id?: string;
  name: string;
  description?: string;
  authorId?: number;
  type?: string;
  difficulty?: string;
  gridData: PlacedElement[];
  width: number;
  height: number;
  thumbnailUrl?: string;
  isPublished?: boolean;
}

// Define the game context shape
interface GameContextType {
  // Current game level
  currentLevel: GameLevel;
  setCurrentLevel: (level: GameLevel) => void;
  
  // Elements on the grid
  placedElements: PlacedElement[];
  addElement: (element: PlacedElement) => void;
  removeElement: (elementId: string) => void;
  moveElement: (elementId: string, x: number, y: number) => void;
  
  // Element selection
  selectedElement: GameElement | null;
  selectElement: (elementId: string | null) => void;
  
  // Game actions
  saveLevel: () => void;
  clearGrid: () => void;
  testLevel: () => void;
  
  // Element lookup helper
  getElementDetails: (elementId: string) => GameElement | undefined;
}

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Create a provider component
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [currentLevel, setCurrentLevel] = useState<GameLevel>({
    name: 'Untitled Level',
    gridData: [],
    width: 720,
    height: 500,
  });
  
  const [placedElements, setPlacedElements] = useState<PlacedElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<GameElement | null>(null);
  
  // Select an element from the palette
  const selectElement = (elementId: string | null) => {
    if (!elementId) {
      setSelectedElement(null);
      return;
    }
    
    const element = getElementById(elementId);
    if (element) {
      setSelectedElement(element);
    }
  };
  
  // Add element to the grid
  const addElement = (element: PlacedElement) => {
    setPlacedElements(prev => [...prev, element]);
    
    // Also update the current level grid data
    setCurrentLevel(prev => ({
      ...prev,
      gridData: [...prev.gridData, element]
    }));
  };
  
  // Remove element from grid
  const removeElement = (elementId: string) => {
    setPlacedElements(prev => prev.filter(element => element.id !== elementId));
    
    // Also update the current level grid data
    setCurrentLevel(prev => ({
      ...prev,
      gridData: prev.gridData.filter(element => element.id !== elementId)
    }));
  };
  
  // Move element on the grid
  const moveElement = (elementId: string, x: number, y: number) => {
    setPlacedElements(prev => 
      prev.map(element => 
        element.id === elementId 
          ? { ...element, x, y } 
          : element
      )
    );
    
    // Also update the current level grid data
    setCurrentLevel(prev => ({
      ...prev,
      gridData: prev.gridData.map(element => 
        element.id === elementId 
          ? { ...element, x, y } 
          : element
      )
    }));
  };
  
  // Save the current level
  const saveLevel = () => {
    // Here you would typically make an API call to save the level
    console.log('Saving level:', currentLevel);
    // Example of how you might save to backend:
    // apiRequest('POST', '/api/games', currentLevel);
  };
  
  // Clear all elements from the grid
  const clearGrid = () => {
    setPlacedElements([]);
    setCurrentLevel(prev => ({
      ...prev,
      gridData: []
    }));
  };
  
  // Test the current level
  const testLevel = () => {
    // Here you would launch the level in test mode
    console.log('Testing level:', currentLevel);
    // In a real app, this might open a game engine or simulation
  };
  
  // Utility function to get element details by id
  const getElementDetails = (elementId: string) => {
    return getElementById(elementId);
  };
  
  const value = {
    currentLevel,
    setCurrentLevel,
    placedElements,
    addElement,
    removeElement,
    moveElement,
    selectedElement,
    selectElement,
    saveLevel,
    clearGrid,
    testLevel,
    getElementDetails,
  };
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Create a hook to use the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
