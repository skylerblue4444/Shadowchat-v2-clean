import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
import { getProfitStreamsEngine } from '../lib/profit-streams-engine';

export const profitStreamsRouter = router({
  recordTransactionFee: protectedProcedure
    .input(z.object({ transactionId: z.string(), amount: z.string(), percentage: z.number(), type: z.enum(['crypto', 'payment', 'marketplace']) }))
    .mutation(async ({ ctx, input }) => {
      const engine = getProfitStreamsEngine();
      return engine.recordTransactionFee(input.transactionId, ctx.user.id, input.amount, input.percentage, input.type);
    }),

  createSubscription: protectedProcedure
    .input(z.object({ tier: z.enum(['free', 'pro', 'enterprise', 'platinum']), monthlyPrice: z.string(), features: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const engine = getProfitStreamsEngine();
      return engine.createSubscription(ctx.user.id, input.tier, input.monthlyPrice, input.features);
    }),

  recordAdPlacement: protectedProcedure
    .input(z.object({ adId: z.string(), placementType: z.enum(['feed', 'sidebar', 'modal', 'banner', 'native']), impressions: z.number(), clicks: z.number(), revenue: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getProfitStreamsEngine();
      return engine.recordAdPlacement(input.adId, input.placementType, input.impressions, input.clicks, input.revenue);
    }),

  createDataProduct: protectedProcedure
    .input(z.object({ name: z.string(), description: z.string(), dataType: z.enum(['market_trends', 'user_insights', 'behavioral_analytics', 'sentiment_analysis']), monthlyPrice: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getProfitStreamsEngine();
      return engine.createDataProduct(input.name, input.description, input.dataType, input.monthlyPrice);
    }),

  recordCreatorRevenue: protectedProcedure
    .input(z.object({ creatorId: z.number(), source: z.enum(['tips', 'subscriptions', 'content_sales', 'sponsorships']), amount: z.string(), platformFee: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getProfitStreamsEngine();
      return engine.recordCreatorRevenue(input.creatorId, input.source, input.amount, input.platformFee);
    }),

  createEnterpriseAPI: protectedProcedure
    .input(z.object({ clientId: z.string(), tier: z.enum(['starter', 'growth', 'enterprise']), monthlyPrice: z.string(), rateLimit: z.number(), features: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      const engine = getProfitStreamsEngine();
      return engine.createEnterpriseAPI(input.clientId, input.tier, input.monthlyPrice, input.rateLimit, input.features);
    }),

  recordMarketplaceCommission: protectedProcedure
    .input(z.object({ orderId: z.string(), sellerId: z.number(), buyerId: z.number(), orderAmount: z.string(), commissionPercentage: z.number() }))
    .mutation(async ({ input }) => {
      const engine = getProfitStreamsEngine();
      return engine.recordMarketplaceCommission(input.orderId, input.sellerId, input.buyerId, input.orderAmount, input.commissionPercentage);
    }),

  createStakingReward: protectedProcedure
    .input(z.object({ coin: z.string(), stakedAmount: z.string(), rewardRate: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const engine = getProfitStreamsEngine();
      return engine.createStakingReward(ctx.user.id, input.coin, input.stakedAmount, input.rewardRate);
    }),

  recordAffiliateCommission: protectedProcedure
    .input(z.object({ affiliateId: z.number(), referrerId: z.number(), referralType: z.enum(['user', 'subscription', 'transaction']), commissionPercentage: z.number(), commissionAmount: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getProfitStreamsEngine();
      return engine.recordAffiliateCommission(input.affiliateId, input.referrerId, input.referralType, input.commissionPercentage, input.commissionAmount);
    }),

  createWhiteLabelDeployment: protectedProcedure
    .input(z.object({ clientId: z.string(), domain: z.string(), branding: z.record(z.any()), monthlyPrice: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getProfitStreamsEngine();
      return engine.createWhiteLabelDeployment(input.clientId, input.domain, input.branding, input.monthlyPrice);
    }),

  recordAIServiceUsage: protectedProcedure
    .input(z.object({ service: z.enum(['code_generation', 'analysis', 'strategy', 'research']), tokensUsed: z.number(), costPerToken: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const engine = getProfitStreamsEngine();
      return engine.recordAIServiceUsage(ctx.user.id, input.service, input.tokensUsed, input.costPerToken);
    }),

  getMetrics: protectedProcedure.query(async () => {
    const engine = getProfitStreamsEngine();
    return engine.getMetrics();
  }),
});
