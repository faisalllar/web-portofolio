import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { terrainElements, itemElements, characterElements } from '@/lib/gameElements';
import { Button } from '@/components/ui/button';
import { HelpCircle, PlayIcon, Trash2Icon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PlusIcon } from '@heroicons/react/24/outline'

const ElementPalette = () => {
  const { selectElement, clearGrid, testLevel } = useGame();

  // Handler drag: langsung selectElement
  const handleElementDragStart = (elementId: string) => {
    selectElement(elementId);
  };

  const elementSections = [
    { 
      title: 'Terrain', 
      elements: terrainElements,
      bgColor: 'bg-indigo-100 dark:bg-indigo-900'
    },
    { 
      title: 'Items', 
      elements: itemElements,
      bgColor: 'bg-pink-100 dark:bg-pink-900'
    },
    { 
      title: 'Characters', 
      elements: characterElements,
      bgColor: 'bg-green-100 dark:bg-green-900'
    }
  ];

  // Render element based on its type
  const renderElementVisual = (element: any) => {
    if (element.elementType === 'platform') {
      return <div className={`w-10 h-2 ${element.color} rounded-sm`}></div>;
    } else if (element.elementType === 'wall') {
      return <div className={`w-2 h-10 ${element.color} rounded-sm`}></div>;
    } else if (element.elementType === 'bounce') {
      return <div className={`w-8 h-3 ${element.color} rounded-full`}></div>;
    } else if (element.elementType === 'spike') {
      return <div className="w-0 h-0 border-left-8 border-right-8 border-b-10 border-transparent border-b-red-500"></div>;
    } else if (element.elementType === 'coin') {
      return <div className={`w-6 h-6 rounded-full ${element.color} flex items-center justify-center`}><span className="text-xs font-bold">$</span></div>;
    } else if (element.elementType === 'key') {
      return <div className={`w-6 h-6 ${element.color}`}><i className="fas fa-key"></i></div>;
    } else if (element.elementType === 'heart') {
      return <div className={`w-6 h-6 ${element.color}`}><i className="fas fa-heart"></i></div>;
    } else if (element.elementType === 'star') {
      return <div className={`w-6 h-6 ${element.color}`}><i className="fas fa-star"></i></div>;
    } else if (element.elementType === 'player') {
      return <div className={`w-6 h-6 rounded-full ${element.color} flex items-center justify-center`}><span className="text-white text-xs">P</span></div>;
    } else if (element.elementType === 'enemy') {
      return <div className={`w-6 h-6 rounded-full ${element.color} flex items-center justify-center`}><span className="text-white text-xs">E</span></div>;
    } else if (element.elementType === 'npc') {
      return <div className={`w-6 h-6 rounded-full ${element.color} flex items-center justify-center`}><span className="text-white text-xs">N</span></div>;
    } else if (element.elementType === 'flag') {
      return <div className={`w-6 h-6 ${element.color}`}><i className="fas fa-flag"></i></div>;
    }
    
    // Default fallback
    return <div className={`w-6 h-6 ${element.color || 'bg-gray-400'} rounded-md`}></div>;
  };

  return (
    <div className="w-full lg:w-64 bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Elements</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1.5 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Drag elements onto the grid to create your level</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-4">
        {elementSections.map((section, sectionIndex) => (
          <div key={section.title} className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">{section.title}</h4>
            <div className="grid grid-cols-2 gap-2">
              {section.elements.map((element, index) => (
                <motion.div
                  key={element.id}
                  className={`${section.bgColor} p-3 rounded-md text-center cursor-grab flex flex-col items-center`}
                  onPointerDown={() => handleElementDragStart(element.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-element={element.elementType}
                >
                  {renderElementVisual(element)}
                  <span className="text-xs mt-2">{element.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <Button 
          className="w-full"
          onClick={testLevel}
        >
          <PlayIcon className="mr-2 h-4 w-4" /> Test Level
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={clearGrid}
        >
          <Trash2Icon className="mr-2 h-4 w-4" /> Clear Grid
        </Button>
      </div>
    </div>
  );
};

export default ElementPalette;
