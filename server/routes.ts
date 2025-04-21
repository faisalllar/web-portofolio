import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertGameSchema, insertGameRatingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all games
  app.get("/api/games", async (req, res) => {
    try {
      const games = await storage.getGames();
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch games" });
    }
  });

  // Get a specific game
  app.get("/api/games/:id", async (req, res) => {
    try {
      const gameId = parseInt(req.params.id);
      const game = await storage.getGame(gameId);
      
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      res.json(game);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch game" });
    }
  });

  // Create a new game
  app.post("/api/games", async (req, res) => {
    try {
      const validatedData = insertGameSchema.parse(req.body);
      const newGame = await storage.createGame(validatedData);
      res.status(201).json(newGame);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid game data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create game" });
    }
  });

  // Update a game
  app.patch("/api/games/:id", async (req, res) => {
    try {
      const gameId = parseInt(req.params.id);
      const gameExists = await storage.getGame(gameId);
      
      if (!gameExists) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      // Validate the update data (partial schema)
      const validatedData = insertGameSchema.partial().parse(req.body);
      const updatedGame = await storage.updateGame(gameId, validatedData);
      
      res.json(updatedGame);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid game data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update game" });
    }
  });

  // Delete a game
  app.delete("/api/games/:id", async (req, res) => {
    try {
      const gameId = parseInt(req.params.id);
      const result = await storage.deleteGame(gameId);
      
      if (!result) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      res.json({ message: "Game deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete game" });
    }
  });

  // Increment play count for a game
  app.post("/api/games/:id/play", async (req, res) => {
    try {
      const gameId = parseInt(req.params.id);
      const game = await storage.incrementPlayCount(gameId);
      
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      res.json(game);
    } catch (error) {
      res.status(500).json({ message: "Failed to update play count" });
    }
  });

  // Add a rating to a game
  app.post("/api/games/:id/rate", async (req, res) => {
    try {
      const gameId = parseInt(req.params.id);
      const gameExists = await storage.getGame(gameId);
      
      if (!gameExists) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      // Validate the rating data
      const ratingData = { ...req.body, gameId };
      const validatedData = insertGameRatingSchema.parse(ratingData);
      
      const newRating = await storage.createRating(validatedData);
      res.status(201).json(newRating);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid rating data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add rating" });
    }
  });

  // Get all game elements
  app.get("/api/game-elements", async (req, res) => {
    try {
      const elements = await storage.getGameElements();
      res.json(elements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch game elements" });
    }
  });

  // Get games by author
  app.get("/api/users/:id/games", async (req, res) => {
    try {
      const authorId = parseInt(req.params.id);
      const userExists = await storage.getUser(authorId);
      
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const games = await storage.getGamesByAuthor(authorId);
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user's games" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
