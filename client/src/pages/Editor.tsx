import { motion } from 'framer-motion';
import ElementPalette from '@/components/editor/ElementPalette';
import GameGrid from '@/components/editor/GameGrid';

const Editor = () => {
  return (
    <motion.section
      id="editor"
      className="py-16 px-4 bg-gray-100 dark:bg-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-['Poppins']">Level Editor</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-3">
            Create your own game level by dragging elements onto the grid
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <ElementPalette />
          <GameGrid />
        </div>
      </div>
    </motion.section>
  );
};

export default Editor;
