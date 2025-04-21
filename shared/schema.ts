import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
});

export const gameElements = pgTable("game_elements", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // terrain, item, character
  name: text("name").notNull(),
  icon: text("icon"), // icon class or image reference
  properties: jsonb("properties"), // Specific properties for this element
});

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  authorId: integer("author_id").references(() => users.id),
  type: text("type").notNull(), // platformer, puzzle, adventure, racing, etc.
  difficulty: text("difficulty"), // easy, medium, hard, expert
  gridData: jsonb("grid_data").notNull(), // The actual game layout data
  thumbnailUrl: text("thumbnail_url"),
  playCount: integer("play_count").default(0),
  rating: integer("rating").default(0), // Average rating (1-5)
  ratingCount: integer("rating_count").default(0), // Number of ratings
  createdAt: timestamp("created_at").defaultNow(),
  isPublished: boolean("is_published").default(false),
});

export const gameRatings = pgTable("game_ratings", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id").references(() => games.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  avatarUrl: true,
});

export const insertGameElementSchema = createInsertSchema(gameElements);

export const insertGameSchema = createInsertSchema(games).omit({
  id: true,
  playCount: true,
  rating: true,
  ratingCount: true,
  createdAt: true,
});

export const insertGameRatingSchema = createInsertSchema(gameRatings).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertGameElement = z.infer<typeof insertGameElementSchema>;
export type GameElement = typeof gameElements.$inferSelect;

export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof games.$inferSelect;

export type InsertGameRating = z.infer<typeof insertGameRatingSchema>;
export type GameRating = typeof gameRatings.$inferSelect;
