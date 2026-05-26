import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
import { getMediaHubEngine } from '../lib/media-hub-engine';

export const mediaHubRouter = router({
  ingestLiveStream: protectedProcedure
    .input(z.object({ source: z.enum(['youtube', 'twitch', 'tiktok', 'instagram', 'twitter', 'custom']), sourceId: z.string(), title: z.string(), description: z.string(), streamerName: z.string(), viewers: z.number(), tags: z.array(z.string()).optional() }))
    .mutation(async ({ input }) => {
      const engine = getMediaHubEngine();
      return engine.ingestLiveStream(input.source, input.sourceId, input.title, input.description, input.streamerName, input.viewers, input.tags);
    }),

  extractContent: protectedProcedure
    .input(z.object({ streamId: z.string(), title: z.string(), description: z.string(), duration: z.number(), thumbnail: z.string(), keyPoints: z.array(z.string()).optional() }))
    .mutation(async ({ input }) => {
      const engine = getMediaHubEngine();
      return engine.extractContent(input.streamId, input.title, input.description, input.duration, input.thumbnail, input.keyPoints);
    }),

  generateTranscription: protectedProcedure
    .input(z.object({ contentId: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getMediaHubEngine();
      return engine.generateTranscription(input.contentId);
    }),

  generateSummary: protectedProcedure
    .input(z.object({ contentId: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getMediaHubEngine();
      return engine.generateSummary(input.contentId);
    }),

  autoPost: protectedProcedure
    .input(z.object({ contentId: z.string(), targets: z.array(z.enum(['social', 'feed', 'marketplace', 'community'])), platforms: z.array(z.string()).optional(), scheduledTime: z.date().optional() }))
    .mutation(async ({ input }) => {
      const engine = getMediaHubEngine();
      return engine.autoPost(input.contentId, input.targets, input.platforms, input.scheduledTime);
    }),

  detectTrending: protectedProcedure
    .input(z.object({ contentId: z.string(), trend: z.string(), peakViewers: z.number() }))
    .mutation(async ({ input }) => {
      const engine = getMediaHubEngine();
      return engine.detectTrending(input.contentId, input.trend, input.peakViewers);
    }),

  trackInfluencer: protectedProcedure
    .input(z.object({ name: z.string(), source: z.enum(['youtube', 'twitch', 'tiktok', 'instagram', 'twitter', 'custom']), sourceId: z.string(), followers: z.number(), engagementRate: z.number(), category: z.string(), averageViewers: z.number() }))
    .mutation(async ({ input }) => {
      const engine = getMediaHubEngine();
      return engine.trackInfluencer(input.name, input.source, input.sourceId, input.followers, input.engagementRate, input.category, input.averageViewers);
    }),

  generateRecommendation: protectedProcedure
    .input(z.object({ contentId: z.string(), reason: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const engine = getMediaHubEngine();
      return engine.generateRecommendation(ctx.user.id, input.contentId, input.reason);
    }),

  optimizeMonetization: protectedProcedure
    .input(z.object({ contentId: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getMediaHubEngine();
      return engine.optimizeMonetization(input.contentId);
    }),

  getLiveStreams: protectedProcedure
    .input(z.object({ limit: z.number().optional() }))
    .query(async ({ input }) => {
      const engine = getMediaHubEngine();
      return engine.getLiveStreams(input.limit);
    }),

  getTrendingContent: protectedProcedure
    .input(z.object({ limit: z.number().optional() }))
    .query(async ({ input }) => {
      const engine = getMediaHubEngine();
      return engine.getTrendingContent(input.limit);
    }),

  getTopInfluencers: protectedProcedure
    .input(z.object({ limit: z.number().optional() }))
    .query(async ({ input }) => {
      const engine = getMediaHubEngine();
      return engine.getTopInfluencers(input.limit);
    }),

  getMetrics: protectedProcedure.query(async () => {
    const engine = getMediaHubEngine();
    return engine.getMetrics();
  }),
});
