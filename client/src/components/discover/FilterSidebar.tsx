import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterOptions {
  gameType: string;
  difficulty: string[];
  createdBy: string;
  timeToComplete: string;
}

interface FilterSidebarProps {
  onApplyFilters: (filters: FilterOptions) => void;
}

const FilterSidebar = ({ onApplyFilters }: FilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    gameType: 'All Types',
    difficulty: [],
    createdBy: 'Everyone',
    timeToComplete: 'Any Duration',
  });

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    setFilters((prev) => {
      if (checked) {
        return { ...prev, difficulty: [...prev.difficulty, difficulty] };
      } else {
        return { ...prev, difficulty: prev.difficulty.filter(d => d !== difficulty) };
      }
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="w-full md:w-64 flex-shrink-0 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="font-bold text-lg mb-4">Filters</h3>

      <div className="space-y-4">
        <div>
          <Label className="block text-sm font-medium mb-2">Game Type</Label>
          <Select 
            value={filters.gameType} 
            onValueChange={(value) => setFilters({...filters, gameType: value})}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select game type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Types">All Types</SelectItem>
              <SelectItem value="Platformer">Platformer</SelectItem>
              <SelectItem value="Puzzle">Puzzle</SelectItem>
              <SelectItem value="Adventure">Adventure</SelectItem>
              <SelectItem value="Racing">Racing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="block text-sm font-medium mb-2">Difficulty</Label>
          <div className="space-y-1">
            {['Easy', 'Medium', 'Hard', 'Expert'].map((difficulty) => (
              <div key={difficulty} className="flex items-center">
                <Checkbox 
                  id={`difficulty-${difficulty}`} 
                  checked={filters.difficulty.includes(difficulty)}
                  onCheckedChange={(checked) => 
                    handleDifficultyChange(difficulty, checked as boolean)
                  }
                  className="mr-2"
                />
                <Label htmlFor={`difficulty-${difficulty}`} className="text-sm">
                  {difficulty}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="block text-sm font-medium mb-2">Created By</Label>
          <Select 
            value={filters.createdBy} 
            onValueChange={(value) => setFilters({...filters, createdBy: value})}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select creator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Everyone">Everyone</SelectItem>
              <SelectItem value="My Team">My Team</SelectItem>
              <SelectItem value="My Department">My Department</SelectItem>
              <SelectItem value="Featured Creators">Featured Creators</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="block text-sm font-medium mb-2">Time to Complete</Label>
          <Select 
            value={filters.timeToComplete} 
            onValueChange={(value) => setFilters({...filters, timeToComplete: value})}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any Duration">Any Duration</SelectItem>
              <SelectItem value="Under 5 minutes">Under 5 minutes</SelectItem>
              <SelectItem value="5-15 minutes">5-15 minutes</SelectItem>
              <SelectItem value="15-30 minutes">15-30 minutes</SelectItem>
              <SelectItem value="Over 30 minutes">Over 30 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
