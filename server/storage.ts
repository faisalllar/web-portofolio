import { 
  users, 
  type User, 
  type InsertUser,
  games,
  type Game,
  type InsertGame,
  gameElements,
  type GameElement,
  type InsertGameElement,
  gameRatings,
  type GameRating,
  type InsertGameRating
} from "@shared/schema";

// Define the storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Game methods
  getGames(): Promise<Game[]>;
  getGame(id: number): Promise<Game | undefined>;
  getGamesByAuthor(authorId: number): Promise<Game[]>;
  createGame(game: InsertGame): Promise<Game>;
  updateGame(id: number, game: Partial<InsertGame>): Promise<Game | undefined>;
  deleteGame(id: number): Promise<boolean>;
  incrementPlayCount(id: number): Promise<Game | undefined>;
  
  // Game elements methods
  getGameElements(): Promise<GameElement[]>;
  getGameElement(id: number): Promise<GameElement | undefined>;
  createGameElement(element: InsertGameElement): Promise<GameElement>;
  
  // Rating methods
  getRatingsByGame(gameId: number): Promise<GameRating[]>;
  createRating(rating: InsertGameRating): Promise<GameRating>;
  updateGameRating(gameId: number): Promise<Game | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private games: Map<number, Game>;
  private gameElements: Map<number, GameElement>;
  private gameRatings: Map<number, GameRating>;
  
  private userCounter: number;
  private gameCounter: number;
  private elementCounter: number;
  private ratingCounter: number;

  constructor() {
    this.users = new Map();
    this.games = new Map();
    this.gameElements = new Map();
    this.gameRatings = new Map();
    
    this.userCounter = 1;
    this.gameCounter = 1;
    this.elementCounter = 1;
    this.ratingCounter = 1;
    
    // Add some initial data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCounter++;
    const user: User = {
      ...insertUser,
      id,
      displayName: insertUser.displayName ?? null,
      avatarUrl: insertUser.avatarUrl ?? null,
    };
    this.users.set(id, user);
    return user;
  }
  
  // Game methods
  async getGames(): Promise<Game[]> {
    return Array.from(this.games.values());
  }
  
  async getGame(id: number): Promise<Game | undefined> {
    return this.games.get(id);
  }
  
  async getGamesByAuthor(authorId: number): Promise<Game[]> {
    return Array.from(this.games.values()).filter(
      (game) => game.authorId === authorId,
    );
  }
  
  async createGame(insertGame: InsertGame): Promise<Game> {
    const id = this.gameCounter++;
    const now = new Date();
    const game: Game = {
      ...insertGame,
      id,
      playCount: 0,
      rating: 0,
      ratingCount: 0,
      createdAt: now,
      description: insertGame.description ?? null,
      difficulty: insertGame.difficulty ?? null,
      authorId: insertGame.authorId ?? null,
      thumbnailUrl: insertGame.thumbnailUrl ?? null,
      isPublished: insertGame.isPublished ?? null,
    };
    this.games.set(id, game);
    return game;
  }
  
  async updateGame(id: number, gameUpdate: Partial<InsertGame>): Promise<Game | undefined> {
    const game = this.games.get(id);
    if (!game) return undefined;
    
    const updatedGame = { ...game, ...gameUpdate };
    this.games.set(id, updatedGame);
    return updatedGame;
  }
  
  async deleteGame(id: number): Promise<boolean> {
    return this.games.delete(id);
  }
  
  async incrementPlayCount(id: number): Promise<Game | undefined> {
    const game = this.games.get(id);
    if (!game) return undefined;
    const updatedGame = { ...game, playCount: (game.playCount ?? 0) + 1 };
    this.games.set(id, updatedGame);
    return updatedGame;
  }
  
  // Game elements methods
  async getGameElements(): Promise<GameElement[]> {
    return Array.from(this.gameElements.values());
  }
  
  async getGameElement(id: number): Promise<GameElement | undefined> {
    return this.gameElements.get(id);
  }
  
  async createGameElement(element: InsertGameElement): Promise<GameElement> {
    const id = this.elementCounter++;
    const gameElement: GameElement = {
      ...element,
      id,
      icon: element.icon ?? null,
      properties: element.properties ?? null,
    };
    this.gameElements.set(id, gameElement);
    return gameElement;
  }
  
  // Rating methods
  async getRatingsByGame(gameId: number): Promise<GameRating[]> {
    return Array.from(this.gameRatings.values()).filter(
      (rating) => rating.gameId === gameId,
    );
  }
  
  async createRating(insertRating: InsertGameRating): Promise<GameRating> {
    const id = this.ratingCounter++;
    const now = new Date();
    const rating: GameRating = {
      ...insertRating,
      id,
      createdAt: now,
      comment: insertRating.comment ?? null,
    };
    this.gameRatings.set(id, rating);
    // Update the game's rating
    await this.updateGameRating(insertRating.gameId);
    return rating;
  }
  
  async updateGameRating(gameId: number): Promise<Game | undefined> {
    const game = this.games.get(gameId);
    if (!game) return undefined;
    
    const ratings = await this.getRatingsByGame(gameId);
    const ratingCount = ratings.length;
    
    if (ratingCount === 0) {
      return game;
    }
    
    // Calculate average rating (stored as integer, multiply by 10)
    const totalRating = ratings.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = Math.round((totalRating / ratingCount) * 10);
    
    const updatedGame = { 
      ...game, 
      rating: avgRating, 
      ratingCount 
    };
    
    this.games.set(gameId, updatedGame);
    return updatedGame;
  }
  
  // Initialize with some sample data
  private initializeData() {
    // Add a sample user
    const user: InsertUser = {
      username: 'sarah',
      password: 'password123', // In real app, this would be hashed
      displayName: 'Sarah P.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&q=80'
    };
    this.createUser(user);
    
    // Add some sample games
    const sampleGames = [
      {
        name: 'Platform Panic',
        description: 'A challenging platform game with moving obstacles and collectible coins.',
        authorId: 1,
        type: 'Platformer',
        difficulty: 'Medium',
        gridData: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        isPublished: true
      },
      {
        name: 'Puzzle Master',
        description: 'Brain-teasing puzzles that will challenge your problem-solving skills.',
        authorId: 1,
        type: 'Puzzle',
        difficulty: 'Hard',
        gridData: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        isPublished: true
      },
      {
        name: 'Office Escape',
        description: 'Find your way through a maze of cubicles to escape the office before 5 PM!',
        authorId: 1,
        type: 'Adventure',
        difficulty: 'Easy',
        gridData: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        isPublished: true
      },
      {
        name: 'Coffee Run',
        description: 'Race against the clock to deliver coffee to all your coworkers before it gets cold!',
        authorId: 1,
        type: 'Racing',
        difficulty: 'Medium',
        gridData: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        isPublished: true
      }
    ];
    
    sampleGames.forEach(game => this.createGame(game));
    
    // Add some ratings
    this.createRating({ gameId: 1, userId: 1, rating: 5, comment: 'Great game!' });
    this.createRating({ gameId: 2, userId: 1, rating: 4, comment: 'Challenging puzzles!' });
    this.createRating({ gameId: 3, userId: 1, rating: 5, comment: 'Very creative!' });
    this.createRating({ gameId: 4, userId: 1, rating: 4, comment: 'Fun racing game!' });
  }
}

export const storage = new MemStorage();
