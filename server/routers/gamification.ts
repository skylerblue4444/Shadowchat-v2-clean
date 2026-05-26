import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
import { getGamificationEngine, type QuestType, type PuzzleType } from '../lib/gamification-engine';

/**
 * Gamification Router - Quests, Puzzles, Badges, Points, Leaderboards
 */
export const gamificationRouter = router({
  // ─── Points & Stats ─────────────────────────────────────────────────────
  getUserStats: protectedProcedure.query(async ({ ctx }) => {
    const engine = getGamificationEngine();
    const stats = engine.getUserStats(ctx.user.id);
    return stats || { userId: ctx.user.id, totalPoints: 0, level: 1, badges: [], questsCompleted: 0, puzzlesSolved: 0, streakDays: 0, lastActivityAt: new Date() };
  }),

  awardPoints: protectedProcedure
    .input(z.object({ activity: z.string(), multiplier: z.number().default(1) }))
    .mutation(async ({ ctx, input }) => {
      const engine = getGamificationEngine();
      const points = engine.awardPoints(ctx.user.id, input.activity as any, input.multiplier);
      return { pointsAwarded: points, stats: engine.getUserStats(ctx.user.id) };
    }),

  // ─── Badges ─────────────────────────────────────────────────────────────
  getUserBadges: protectedProcedure.query(async ({ ctx }) => {
    const engine = getGamificationEngine();
    return { badges: engine.getUserBadges(ctx.user.id) };
  }),

  checkBadgeUnlock: protectedProcedure.query(async ({ ctx }) => {
    const engine = getGamificationEngine();
    const newBadges = engine.checkBadgeUnlock(ctx.user.id);
    return { newBadges, allBadges: engine.getUserBadges(ctx.user.id) };
  }),

  // ─── Quests ─────────────────────────────────────────────────────────────
  getUserQuests: protectedProcedure.query(async ({ ctx }) => {
    const engine = getGamificationEngine();
    return { quests: engine.getUserQuests(ctx.user.id) };
  }),

  createQuest: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        type: z.enum(['social', 'commerce', 'crypto', 'puzzle', 'challenge', 'achievement']),
        reward: z.object({
          points: z.number(),
          coins: z.array(z.object({ coin: z.string(), amount: z.string() })).default([]),
          badges: z.array(z.string()).optional(),
        }),
        requirements: z.object({
          action: z.string(),
          count: z.number(),
          timeWindowDays: z.number().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const engine = getGamificationEngine();
      const quest = engine.createQuest(ctx.user.id, input);
      return quest;
    }),

  completeQuest: protectedProcedure
    .input(z.object({ questId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const engine = getGamificationEngine();
      const result = engine.completeQuest(ctx.user.id, input.questId);
      return result;
    }),

  // ─── Puzzles ────────────────────────────────────────────────────────────
  solvePuzzle: protectedProcedure
    .input(
      z.object({
        puzzleId: z.string(),
        type: z.enum(['youtube', 'riddle', 'code', 'logic', 'memory', 'trivia']),
        title: z.string(),
        description: z.string(),
        difficulty: z.enum(['1', '2', '3', '4', '5']),
        reward: z.object({
          points: z.number(),
          coins: z.array(z.object({ coin: z.string(), amount: z.string() })).default([]),
        }),
        solution: z.string().optional(),
        hints: z.array(z.string()).default([]),
        userSolution: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const engine = getGamificationEngine();
      const puzzle = {
        id: input.puzzleId,
        type: input.type as PuzzleType,
        title: input.title,
        description: input.description,
        difficulty: parseInt(input.difficulty) as 1 | 2 | 3 | 4 | 5,
        reward: input.reward,
        solution: input.solution,
        hints: input.hints,
        attempts: 1,
        createdAt: new Date(),
      };

      const solved = engine.solvePuzzle(ctx.user.id, puzzle, input.userSolution);
      return { solved, stats: engine.getUserStats(ctx.user.id) };
    }),

  // ─── Leaderboard ────────────────────────────────────────────────────────
  getLeaderboard: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(1000).default(100) }))
    .query(async ({ input }) => {
      const engine = getGamificationEngine();
      return { leaderboard: engine.getLeaderboard(input.limit) };
    }),

  // ─── Login Streak ────────────────────────────────────────────────────────
  updateLoginStreak: protectedProcedure.mutation(async ({ ctx }) => {
    const engine = getGamificationEngine();
    const streak = engine.updateLoginStreak(ctx.user.id);
    return { streak, stats: engine.getUserStats(ctx.user.id) };
  }),
});
