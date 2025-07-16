import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trophy, GamepadIcon, Heart, Activity } from 'lucide-react';
import { PlusIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('my-games');

  // Mock user data - in a real app this would come from an API
  const user = {
    id: 1,
    username: 'sarah_p',
    displayName: 'Sarah P.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&q=80',
    bio: 'Game designer & coffee enthusiast. I love creating challenging puzzles and racing games for my team.',
    stats: {
      gamesCreated: 12,
      gamesPlayed: 47,
      highScores: 8,
    },
    badges: [
      { name: 'Creator', color: 'bg-indigo-500' },
      { name: 'Top Player', color: 'bg-green-500' },
      { name: 'Level 10', color: 'bg-yellow-500' },
    ]
  };

  // Mock games data
  const userGames = [
    {
      id: 1,
      name: 'Coffee Run',
      type: 'Racing',
      plays: 24,
      rating: 4.7,
      thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      name: 'Office Maze',
      type: 'Adventure',
      plays: 18,
      rating: 4.5,
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      name: 'Puzzle Master',
      type: 'Puzzle',
      plays: 31,
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    }
  ];

  const favoriteGames = [
    {
      id: 4,
      name: 'Platform Panic',
      creator: 'Mike T.',
      type: 'Platformer',
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      name: 'Pixel Dungeon',
      creator: 'Alex J.',
      type: 'RPG',
      rating: 4.5,
      thumbnail: 'https://images.unsplash.com/photo-1634029859957-d41deb4721cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    }
  ];

  const achievements = [
    { name: 'Game Master', description: 'Created 10+ games', icon: <GamepadIcon className="h-6 w-6" />, date: '2023-06-15' },
    { name: 'Popular Designer', description: 'Reached 100+ total plays', icon: <Trophy className="h-6 w-6" />, date: '2023-07-22' },
    { name: 'Crowd Favorite', description: 'Received 50+ favorites', icon: <Heart className="h-6 w-6" />, date: '2023-08-10' }
  ];

  return (
    <motion.section 
      className="py-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatar} alt={user.displayName} />
                <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{user.displayName}</CardTitle>
              <CardDescription className="text-sm">@{user.username}</CardDescription>
              
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {user.badges.map((badge, index) => (
                  <Badge key={index} className={`${badge.color} hover:${badge.color}`}>
                    {badge.name}
                  </Badge>
                ))}
              </div>
              
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
              
              <Button variant="outline" className="mt-4 w-full" size="sm">
                <Pencil className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2">
                  <p className="text-2xl font-bold">{user.stats.gamesCreated}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Created</p>
                </div>
                <div className="p-2">
                  <p className="text-2xl font-bold">{user.stats.gamesPlayed}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Played</p>
                </div>
                <div className="p-2">
                  <p className="text-2xl font-bold">{user.stats.highScores}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">High Scores</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Content Tabs */}
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="my-games" className="flex-1">My Games</TabsTrigger>
                <TabsTrigger value="favorites" className="flex-1">Favorites</TabsTrigger>
                <TabsTrigger value="achievements" className="flex-1">Achievements</TabsTrigger>
                <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="my-games">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userGames.map(game => (
                    <Card key={game.id} className="overflow-hidden">
                      <div className="h-32 bg-gray-200 dark:bg-gray-700 relative">
                        <img 
                          src={game.thumbnail} 
                          alt={game.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
                          {game.type}
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold">{game.name}</h3>
                          <div className="flex items-center">
                            <Trophy className="h-3 w-3 text-yellow-400 mr-1" />
                            <span className="text-xs">{game.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {game.plays} plays
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              Edit
                            </Button>
                            <Button size="sm" className="h-8 px-2">
                              Play
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Card className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 border-dashed border-2 border-gray-300 dark:border-gray-700 p-4 h-[160px]">
                    <div className="text-center">
                      <PlusIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Create New Game</p>
                      <Button variant="link" className="mt-2">Start Creating</Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="favorites">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favoriteGames.map(game => (
                    <Card key={game.id} className="overflow-hidden">
                      <div className="flex h-24">
                        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700">
                          <img 
                            src={game.thumbnail} 
                            alt={game.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <CardContent className="p-3 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-sm">{game.name}</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">by {game.creator}</p>
                            </div>
                            <Badge className="bg-indigo-500">{game.type}</Badge>
                          </div>
                          
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center">
                              <Trophy className="h-3 w-3 text-yellow-400 mr-1" />
                              <span className="text-xs">{game.rating}</span>
                            </div>
                            <Button size="sm" className="h-7 px-2 text-xs">
                              Play
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="achievements">
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 flex items-center">
                        <div className="bg-primary/10 p-3 rounded-full mr-4">
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold">{achievement.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{new Date(achievement.date).toLocaleDateString()}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Activity className="h-5 w-5 text-gray-400" />
                      <p className="text-gray-500 dark:text-gray-400">Recent activity will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Profile;
