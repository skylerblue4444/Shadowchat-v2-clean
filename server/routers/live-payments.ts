import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
import { getLiveCryptoPaymentsEngine } from '../lib/live-crypto-payments';

/**
 * Live Payments Router - Real-time crypto transactions with kill switches
 */
export const livePaymentsRouter = router({
  // ─── Create & Execute Payments ─────────────────────────────────────────
  createPayment: protectedProcedure
    .input(
      z.object({
        type: z.enum(['send', 'receive', 'swap', 'stake', 'unstake', 'tip']),
        fromAddress: z.string(),
        toAddress: z.string(),
        amount: z.string(),
        coin: z.string(),
        privacyMode: z.enum(['public', 'mixed', 'private', 'tor', 'vpn']).default('public'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const engine = getLiveCryptoPaymentsEngine();
      const result = engine.createPayment(
        ctx.user.id,
        input.type,
        input.fromAddress,
        input.toAddress,
        input.amount,
        input.coin,
        input.privacyMode
      );

      if ('error' in result) {
        return { success: false, error: result.error };
      }

      return { success: true, payment: result };
    }),

  confirmPayment: protectedProcedure
    .input(z.object({ paymentId: z.string(), txHash: z.string(), confirmations: z.number().default(1) }))
    .mutation(async ({ input }) => {
      const engine = getLiveCryptoPaymentsEngine();
      const payment = engine.confirmPayment(input.paymentId, input.txHash, input.confirmations);
      return { success: !!payment, payment };
    }),

  cancelPayment: protectedProcedure
    .input(z.object({ paymentId: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getLiveCryptoPaymentsEngine();
      const payment = engine.cancelPayment(input.paymentId);
      return { success: !!payment, payment };
    }),

  getPaymentStatus: protectedProcedure
    .input(z.object({ paymentId: z.string() }))
    .query(async ({ input }) => {
      const engine = getLiveCryptoPaymentsEngine();
      return engine.getPaymentStatus(input.paymentId);
    }),

  getPaymentHistory: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(500).default(50) }))
    .query(async ({ ctx, input }) => {
      const engine = getLiveCryptoPaymentsEngine();
      return engine.getPaymentHistory(ctx.user.id, input.limit);
    }),

  // ─── Kill Switches ─────────────────────────────────────────────────────
  createKillSwitch: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.enum(['global', 'user', 'coin', 'amount']),
        field: z.string(),
        operator: z.enum(['equals', 'greater_than', 'less_than']),
        value: z.any(),
        action: z.enum(['block', 'pause', 'alert', 'escalate']).default('block'),
      })
    )
    .mutation(async ({ input }) => {
      const engine = getLiveCryptoPaymentsEngine();
      const killSwitch = engine.createKillSwitch(
        input.name,
        input.type,
        { field: input.field, operator: input.operator, value: input.value },
        input.action
      );
      return killSwitch;
    }),

  triggerGlobalKillSwitch: protectedProcedure.mutation(async () => {
    const engine = getLiveCryptoPaymentsEngine();
    engine.triggerGlobalKillSwitch();
    return { status: 'GLOBAL KILL SWITCH ACTIVATED - All payments halted' };
  }),

  disableGlobalKillSwitch: protectedProcedure.mutation(async () => {
    const engine = getLiveCryptoPaymentsEngine();
    engine.disableGlobalKillSwitch();
    return { status: 'Global kill switch disabled - Payments resumed' };
  }),

  getKillSwitchStatus: protectedProcedure.query(async () => {
    const engine = getLiveCryptoPaymentsEngine();
    return engine.getKillSwitchStatus();
  }),

  // ─── Privacy & Anti-Surveillance ───────────────────────────────────────
  getPrivacyRoutes: protectedProcedure.query(async () => {
    const engine = getLiveCryptoPaymentsEngine();
    return engine.getPrivacyRoutes();
  }),

  registerPrivacyRoute: protectedProcedure
    .input(
      z.object({
        type: z.enum(['tor', 'vpn', 'mixed']),
        endpoint: z.string().url(),
        latency: z.number(),
        reliability: z.number().min(0).max(1),
      })
    )
    .mutation(async ({ input }) => {
      const engine = getLiveCryptoPaymentsEngine();
      return engine.registerPrivacyRoute(input.type, input.endpoint, input.latency, input.reliability);
    }),

  getObfuscationDetails: protectedProcedure
    .input(z.object({ paymentId: z.string() }))
    .query(async ({ input }) => {
      const engine = getLiveCryptoPaymentsEngine();
      return engine.getObfuscationDetails(input.paymentId);
    }),

  // ─── Real-time Metrics ─────────────────────────────────────────────────
  getMetrics: protectedProcedure.query(async () => {
    const engine = getLiveCryptoPaymentsEngine();
    return engine.getMetrics();
  }),
});
