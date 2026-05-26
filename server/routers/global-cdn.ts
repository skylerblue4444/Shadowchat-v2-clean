import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
import { getGlobalCDNEngine } from '../lib/global-cdn-engine';

export const globalCDNRouter = router({
  cacheAsset: protectedProcedure
    .input(z.object({ path: z.string(), contentType: z.string(), size: z.number(), ttl: z.number().optional(), strategy: z.enum(['aggressive', 'balanced', 'conservative']).optional() }))
    .mutation(async ({ input }) => {
      const engine = getGlobalCDNEngine();
      return engine.cacheAsset(input.path, input.contentType, input.size, input.ttl, input.strategy);
    }),

  recordCacheHit: protectedProcedure
    .input(z.object({ assetId: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getGlobalCDNEngine();
      return engine.recordCacheHit(input.assetId);
    }),

  recordCacheMiss: protectedProcedure
    .input(z.object({ assetId: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getGlobalCDNEngine();
      return engine.recordCacheMiss(input.assetId);
    }),

  optimizeEdgeAsset: protectedProcedure
    .input(z.object({ assetPath: z.string(), optimization: z.string(), compressionRatio: z.number() }))
    .mutation(async ({ input }) => {
      const engine = getGlobalCDNEngine();
      return engine.optimizeEdgeAsset(input.assetPath, input.optimization, input.compressionRatio);
    }),

  createGeographicRoute: protectedProcedure
    .input(z.object({ region: z.string(), primaryNode: z.string(), fallbackNodes: z.array(z.string()).optional() }))
    .mutation(async ({ input }) => {
      const engine = getGlobalCDNEngine();
      return engine.createGeographicRoute(input.region, input.primaryNode, input.fallbackNodes);
    }),

  recordPerformanceMetrics: protectedProcedure
    .input(z.object({ averageLatency: z.number(), p95Latency: z.number(), p99Latency: z.number(), cacheHitRate: z.number(), bandwidthUsed: z.number(), requestsPerSecond: z.number(), errorRate: z.number() }))
    .mutation(async ({ input }) => {
      const engine = getGlobalCDNEngine();
      return engine.recordPerformanceMetrics(input.averageLatency, input.p95Latency, input.p99Latency, input.cacheHitRate, input.bandwidthUsed, input.requestsPerSecond, input.errorRate);
    }),

  handleFailover: protectedProcedure
    .input(z.object({ failedNode: z.string(), backupNode: z.string(), reason: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getGlobalCDNEngine();
      return engine.handleFailover(input.failedNode, input.backupNode, input.reason);
    }),

  getCDNHealth: protectedProcedure.query(async () => {
    const engine = getGlobalCDNEngine();
    return engine.getCDNHealth();
  }),

  getCacheEfficiency: protectedProcedure.query(async () => {
    const engine = getGlobalCDNEngine();
    return engine.getCacheEfficiency();
  }),

  getGlobalDistribution: protectedProcedure.query(async () => {
    const engine = getGlobalCDNEngine();
    return engine.getGlobalDistribution();
  }),

  invalidateCache: protectedProcedure
    .input(z.object({ pattern: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getGlobalCDNEngine();
      return engine.invalidateCache(input.pattern);
    }),
});
