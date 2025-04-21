import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Undo2, Redo2, Save, Dices, Cog } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const GameGrid = () => {
  const { 
    currentLevel, 
    setCurrentLevel, 
    placedElements, 
    addElement, 
    selectedElement,
    getElementDetails,
    saveLevel
  } = useGame();
  
  const gridRef = useRef<HTMLDivElement>(null);
  const [levelName, setLevelName] = useState(currentLevel.name || 'Untitled Level');
  const [history, setHistory] = useState<Array<any>>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Update level name when it changes
  useEffect(() => {
    setCurrentLevel({
      ...currentLevel,
      name: levelName
    });
  }, [levelName]);
  
  // Handle dropping elements onto the grid
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const elementId = e.dataTransfer.getData('text/plain');
    const element = getElementDetails(elementId);
    
    if (!element || !gridRef.current) return;
    
    const gridRect = gridRef.current.getBoundingClientRect();
    
    // Calculate position relative to the grid
    const x = e.clientX - gridRect.left;
    const y = e.clientY - gridRect.top;
    
    // Create new placed element
    const newElement = {
      id: uuidv4(),
      elementId: element.id,
      x,
      y,
      width: element.width || 24,
      height: element.height || 24,
      properties: { ...element.properties }
    };
    
    // Add to placed elements
    addElement(newElement);
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, { type: 'add', element: newElement }]);
    setHistoryIndex(historyIndex + 1);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleUndo = () => {
    if (historyIndex >= 0) {
      // Implement undo logic here
      setHistoryIndex(historyIndex - 1);
    }
  };
  
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      // Implement redo logic here
      setHistoryIndex(historyIndex + 1);
    }
  };
  
  const handleSave = () => {
    saveLevel();
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing level:', currentLevel);
  };
  
  // Render placed elements on the grid
  const renderPlacedElements = () => {
    return placedElements.map((element) => {
      const details = getElementDetails(element.elementId);
      if (!details) return null;
      
      // Determine element style based on element type
      let elementStyle: React.CSSProperties = {
        position: 'absolute',
        left: `${element.x}px`,
        top: `${element.y}px`,
        width: `${element.width}px`,
        height: `${element.height}px`,
      };
      
      // Render based on element type
      if (details.elementType === 'platform') {
        return (
          <motion.div
            key={element.id}
            className={details.color || 'bg-gray-800 dark:bg-gray-300'}
            style={elementStyle}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            whileHover={{ boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.6)' }}
            data-element-id={element.id}
          />
        );
      } else if (details.elementType === 'wall') {
        return (
          <motion.div
            key={element.id}
            className={details.color || 'bg-gray-800 dark:bg-gray-300'}
            style={elementStyle}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            whileHover={{ boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.6)' }}
            data-element-id={element.id}
          />
        );
      } else if (details.elementType === 'coin') {
        return (
          <motion.div
            key={element.id}
            className="rounded-full bg-yellow-400 border-2 border-yellow-500 flex items-center justify-center"
            style={elementStyle}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            whileHover={{ boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.6)' }}
            data-element-id={element.id}
          >
            <span className="text-xs font-bold">$</span>
          </motion.div>
        );
      } else if (details.elementType === 'player') {
        return (
          <motion.div
            key={element.id}
            className="rounded-full bg-blue-500 flex items-center justify-center"
            style={elementStyle}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            whileHover={{ boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.6)' }}
            data-element-id={element.id}
          >
            <span className="text-white text-xs">P</span>
          </motion.div>
        );
      } else if (details.elementType === 'flag') {
        return (
          <motion.div
            key={element.id}
            className="text-green-600 flex items-center justify-center"
            style={elementStyle}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            whileHover={{ boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.6)' }}
            data-element-id={element.id}
          >
            <i className="fas fa-flag"></i>
          </motion.div>
        );
      }
      
      // Default fallback
      return (
        <motion.div
          key={element.id}
          className="bg-gray-400 rounded"
          style={elementStyle}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          whileHover={{ boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.6)' }}
          data-element-id={element.id}
        />
      );
    });
  };
  
  return (
    <div className="flex-1">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Input
              type="text"
              value={levelName}
              onChange={(e) => setLevelName(e.target.value)}
              placeholder="Untitled Level"
              className="bg-transparent border-b border-gray-300 dark:border-gray-500 focus:border-primary dark:focus:border-indigo-400 px-2 py-1 focus:outline-none text-lg font-semibold"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleUndo}
              disabled={historyIndex < 0}
              className="p-2 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500"
            >
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500"
            >
              <Redo2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleSave}
              className="p-2 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500"
            >
              <Save className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 overflow-auto">
          <div
            ref={gridRef}
            className="relative h-[400px] md:h-[500px] w-[720px] game-grid"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {renderPlacedElements()}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900 text-primary dark:text-indigo-300">
              <Dices className="mr-2 h-4 w-4" /> Game Options
            </Button>
            <Button variant="outline" size="sm" className="px-3 py-1.5 bg-pink-100 dark:bg-pink-900 text-secondary dark:text-pink-300">
              <Cog className="mr-2 h-4 w-4" /> Physics
            </Button>
          </div>
          
          <Button onClick={handleShare}>Share Level</Button>
        </div>
      </div>
    </div>
  );
};

export default GameGrid;
