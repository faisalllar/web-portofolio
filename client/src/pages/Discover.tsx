import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import GameCard from '@/components/discover/GameCard';
import FilterSidebar from '@/components/discover/FilterSidebar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Search, PlusIcon } from 'lucide-react';
import { Link } from 'wouter';
import { Game } from '@shared/schema';

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [currentPage, setCurrentPage] = useState(1);

  // This would come from an API in a real app
  const { data: games, isLoading } = useQuery<Game[]>({
    queryKey: ['/api/games'],
    initialData: [],
  });

  const handleFilterApply = (filters: any) => {
    // Apply filters to the game list
    console.log('Applying filters:', filters);
  };

  const handlePlayGame = (gameId: number) => {
    // Navigate to the game or open it in a modal
    console.log('Playing game:', gameId);
  };

  return (
    <motion.section
      id="discover"
      className="py-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-['Poppins']">Discover Games</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-3">
            Explore and play game levels created by your coworkers
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-4 mb-8">
          <FilterSidebar onApplyFilters={handleFilterApply} />

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <div className="relative w-full max-w-md">
                <Input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              <div className="flex items-center ml-4">
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                  Sort:
                </span>
                <Select
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Most Popular">Most Popular</SelectItem>
                    <SelectItem value="Newest">Newest</SelectItem>
                    <SelectItem value="Highest Rated">Highest Rated</SelectItem>
                    <SelectItem value="Most Played">Most Played</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                // Skeleton loading state
                Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
                    >
                      <div className="h-40 bg-gray-300 dark:bg-gray-700"></div>
                      <div className="p-4">
                        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full mb-3"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))
              ) : (
                <>
                  {games.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onPlay={handlePlayGame}
                    />
                  ))}
                  <Link href="/editor">
                    <a className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <div className="text-center px-4">
                          <PlusIcon className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-2 mx-auto" />
                          <p className="text-gray-500 dark:text-gray-400">
                            Create New Game
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <Button className="w-full">Start Creating</Button>
                      </div>
                    </a>
                  </Link>
                </>
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow-sm">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="rounded-l-md"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {[1, 2, 3].map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className="rounded-none"
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === 3}
                  className="rounded-r-md"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Discover;
