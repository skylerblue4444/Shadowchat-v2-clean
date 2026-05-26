import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
import { getAdvancedDataIntelligence } from '../lib/advanced-data-intelligence';

export const dataIntelligenceRouter = router({
  recordDataPoint: protectedProcedure
    .input(z.object({ source: z.enum(['user_activity', 'transaction', 'market', 'social', 'external_api']), value: z.number(), metadata: z.record(z.any()).optional() }))
    .mutation(async ({ input }) => {
      const engine = getAdvancedDataIntelligence();
      return engine.recordDataPoint(input.source, input.value, input.metadata);
    }),

  generatePrediction: protectedProcedure
    .input(z.object({ type: z.enum(['revenue', 'churn', 'growth', 'demand', 'price']), prediction: z.number(), confidence: z.number(), timeframe: z.string(), factors: z.array(z.string()).optional() }))
    .mutation(async ({ input }) => {
      const engine = getAdvancedDataIntelligence();
      return engine.generatePrediction(input.type, input.prediction, input.confidence, input.timeframe, input.factors);
    }),

  detectAnomaly: protectedProcedure
    .input(z.object({ type: z.enum(['spike', 'drop', 'pattern_break', 'outlier']), severity: z.enum(['low', 'medium', 'high']), description: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getAdvancedDataIntelligence();
      return engine.detectAnomaly(input.type, input.severity, input.description);
    }),

  resolveAnomaly: protectedProcedure
    .input(z.object({ anomalyId: z.string(), rootCause: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getAdvancedDataIntelligence();
      return engine.resolveAnomaly(input.anomalyId, input.rootCause);
    }),

  trackTrend: protectedProcedure
    .input(z.object({ name: z.string(), category: z.string(), momentum: z.number(), velocity: z.number(), relatedTopics: z.array(z.string()).optional() }))
    .mutation(async ({ input }) => {
      const engine = getAdvancedDataIntelligence();
      return engine.trackTrend(input.name, input.category, input.momentum, input.velocity, input.relatedTopics);
    }),

  analyzeUserBehavior: protectedProcedure
    .input(z.object({ userId: z.number(), sessionCount: z.number(), averageSessionDuration: z.number(), engagementScore: z.number(), churnRisk: z.number(), lifetimeValue: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getAdvancedDataIntelligence();
      return engine.analyzeUserBehavior(input.userId, input.sessionCount, input.averageSessionDuration, input.engagementScore, input.churnRisk, input.lifetimeValue);
    }),

  generateMarketIntelligence: protectedProcedure
    .input(z.object({ market: z.string(), trend: z.string(), sentiment: z.enum(['bullish', 'neutral', 'bearish']), volume: z.number(), volatility: z.number(), opportunities: z.array(z.string()).optional(), risks: z.array(z.string()).optional() }))
    .mutation(async ({ input }) => {
      const engine = getAdvancedDataIntelligence();
      return engine.generateMarketIntelligence(input.market, input.trend, input.sentiment, input.volume, input.volatility, input.opportunities, input.risks);
    }),

  analyzeSentiment: protectedProcedure
    .input(z.object({ source: z.string(), text: z.string(), topics: z.array(z.string()).optional() }))
    .mutation(async ({ input }) => {
      const engine = getAdvancedDataIntelligence();
      return engine.analyzeSentiment(input.source, input.text, input.topics);
    }),

  generateRecommendation: protectedProcedure
    .input(z.object({ type: z.string(), item: z.string(), score: z.number(), reason: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const engine = getAdvancedDataIntelligence();
      return engine.generateRecommendation(ctx.user.id, input.type, input.item, input.score, input.reason);
    }),

  recordRecommendationClick: protectedProcedure
    .input(z.object({ recId: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getAdvancedDataIntelligence();
      return engine.recordRecommendationClick(input.recId);
    }),

  getDataWarehouseMetrics: protectedProcedure.query(async () => {
    const engine = getAdvancedDataIntelligence();
    return engine.getDataWarehouseMetrics();
  }),

  getIntelligenceSummary: protectedProcedure.query(async () => {
    const engine = getAdvancedDataIntelligence();
    return engine.getIntelligenceSummary();
  }),

  getUserInsights: protectedProcedure.query(async ({ ctx }) => {
    const engine = getAdvancedDataIntelligence();
    return engine.getUserInsights(ctx.user.id);
  }),
});
