import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
import { getSovereignPolicyEngine } from '../lib/sovereign-policy-engine';

/**
 * Sovereign Policy Router - User-defined policies, receipts, audit logs, guardrails
 */
export const sovereignPolicyRouter = router({
  // ─── Policies ───────────────────────────────────────────────────────────
  createPolicy: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        description: z.string().max(500),
        type: z.enum(['transaction', 'spending', 'automation', 'privacy', 'compliance', 'custom']),
        conditions: z.array(
          z.object({
            field: z.string(),
            operator: z.enum(['equals', 'greater_than', 'less_than', 'contains', 'matches']),
            value: z.any(),
          })
        ),
        actions: z.array(
          z.object({
            type: z.enum(['allow', 'deny', 'require_approval', 'log', 'alert', 'execute']),
            payload: z.any().optional(),
          })
        ),
        expiresAt: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const engine = getSovereignPolicyEngine();
      const policy = engine.createPolicy(
        ctx.user.id,
        input.name,
        input.description,
        input.type,
        input.conditions,
        input.actions,
        input.expiresAt
      );
      return policy;
    }),

  getUserPolicies: protectedProcedure.query(async ({ ctx }) => {
    const engine = getSovereignPolicyEngine();
    return engine.getUserPolicies(ctx.user.id);
  }),

  evaluatePolicies: protectedProcedure
    .input(
      z.object({
        type: z.string(),
        amount: z.string().optional(),
        coin: z.string().optional(),
        recipient: z.string().optional(),
        metadata: z.record(z.any()).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const engine = getSovereignPolicyEngine();
      const result = engine.evaluatePolicies(ctx.user.id, input);
      return result;
    }),

  // ─── Receipts ───────────────────────────────────────────────────────────
  createReceipt: protectedProcedure
    .input(
      z.object({
        transactionId: z.string(),
        type: z.enum(['transaction', 'purchase', 'stake', 'swap', 'tip']),
        amount: z.string(),
        coin: z.string(),
        description: z.string(),
        metadata: z.record(z.any()).optional(),
        policyApplied: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const engine = getSovereignPolicyEngine();
      const receipt = engine.createReceipt(
        ctx.user.id,
        input.transactionId,
        input.type,
        input.amount,
        input.coin,
        input.description,
        input.metadata,
        input.policyApplied
      );
      return receipt;
    }),

  getUserReceipts: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(500).default(100) }))
    .query(async ({ ctx, input }) => {
      const engine = getSovereignPolicyEngine();
      return engine.getUserReceipts(ctx.user.id, input.limit);
    }),

  // ─── Audit Logs ─────────────────────────────────────────────────────────
  logAuditEvent: protectedProcedure
    .input(
      z.object({
        action: z.string(),
        resource: z.string(),
        resourceId: z.string(),
        status: z.enum(['success', 'failure']).default('success'),
        changes: z.object({ before: z.any(), after: z.any() }).optional(),
        reason: z.string().optional(),
        ipAddress: z.string().optional(),
        userAgent: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const engine = getSovereignPolicyEngine();
      const log = engine.logAuditEvent(
        ctx.user.id,
        input.action,
        input.resource,
        input.resourceId,
        input.status,
        input.changes,
        input.reason,
        input.ipAddress,
        input.userAgent
      );
      return log;
    }),

  getUserAuditLogs: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(500).default(100) }))
    .query(async ({ ctx, input }) => {
      const engine = getSovereignPolicyEngine();
      return engine.getUserAuditLogs(ctx.user.id, input.limit);
    }),

  exportAuditTrail: protectedProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
      })
    )
    .query(async ({ ctx, input }) => {
      const engine = getSovereignPolicyEngine();
      return engine.exportAuditTrail(ctx.user.id, input.startDate, input.endDate);
    }),

  // ─── Guardrails ─────────────────────────────────────────────────────────
  createGuardrail: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        type: z.enum(['spending_limit', 'transaction_limit', 'rate_limit', 'whitelist', 'blacklist', 'custom']),
        threshold: z.string(),
        period: z.enum(['daily', 'weekly', 'monthly', 'yearly', 'unlimited']).default('daily'),
        action: z.enum(['block', 'warn', 'approve', 'log']).default('warn'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const engine = getSovereignPolicyEngine();
      const guardrail = engine.createGuardrail(
        ctx.user.id,
        input.name,
        input.type,
        input.threshold,
        input.period,
        input.action
      );
      return guardrail;
    }),

  getUserGuardrails: protectedProcedure.query(async ({ ctx }) => {
    const engine = getSovereignPolicyEngine();
    return engine.getUserGuardrails(ctx.user.id);
  }),

  checkGuardrailViolations: protectedProcedure
    .input(
      z.object({
        amount: z.string(),
        type: z.enum(['spending', 'transaction', 'rate']),
      })
    )
    .query(async ({ ctx, input }) => {
      const engine = getSovereignPolicyEngine();
      return engine.checkGuardrailViolations(ctx.user.id, input.amount, input.type);
    }),

  // ─── Compliance ──────────────────────────────────────────────────────────
  generateComplianceReport: protectedProcedure.query(async ({ ctx }) => {
    const engine = getSovereignPolicyEngine();
    return engine.generateComplianceReport(ctx.user.id);
  }),
});
