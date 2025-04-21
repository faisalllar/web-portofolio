import { motion } from 'framer-motion';
import { Game } from '@shared/schema';
import { Star } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onPlay: (gameId: number) => void;
}

const GameCard = ({ game, onPlay }: GameCardProps) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-40 bg-gray-200 dark:bg-gray-700 relative">
        {game.thumbnailUrl ? (
          <img
            src={game.thumbnailUrl}
            alt={game.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
            <span className="text-gray-500 dark:text-gray-400">No Preview</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
          {game.type || 'Game'}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold">{game.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="ml-1 text-sm">
              {game.rating ? (game.rating / 10).toFixed(1) : '0.0'}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {game.description || 'No description provided'}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* This would show the actual author avatar and name in a real app */}
            <div className="w-5 h-5 rounded-full bg-gray-400"></div>
            <span className="text-xs ml-1">Author</span>
          </div>

          <button
            className="text-primary dark:text-indigo-400 text-sm font-medium"
            onClick={() => onPlay(game.id)}
          >
            Play Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
