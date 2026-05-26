import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
import { getFreeWillAgentFabric } from '../lib/free-will-agent-fabric';

/**
 * Free Will Agents Router - Autonomous agents with user-defined constraints
 */
export const freeWillAgentsRouter = router({
  // ─── Agent Management ───────────────────────────────────────────────────
  createAgent: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        role: z.enum(['trader', 'portfolio_manager', 'social_curator', 'marketplace_assistant', 'custom']),
        description: z.string().max(500),
        guardrails: z.array(z.string()).default([]),
        preferences: z.record(z.any()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const fabric = getFreeWillAgentFabric();
      const agent = fabric.createAgent(
        ctx.user.id,
        input.name,
        input.role,
        input.description,
        input.guardrails,
        input.preferences
      );
      return agent;
    }),

  getUserAgents: protectedProcedure.query(async ({ ctx }) => {
    const fabric = getFreeWillAgentFabric();
    return fabric.getUserAgents(ctx.user.id);
  }),

  getAgent: protectedProcedure
    .input(z.object({ agentId: z.string() }))
    .query(async ({ input }) => {
      const fabric = getFreeWillAgentFabric();
      return fabric.getAgent(input.agentId);
    }),

  activateAgent: protectedProcedure
    .input(z.object({ agentId: z.string() }))
    .mutation(async ({ input }) => {
      const fabric = getFreeWillAgentFabric();
      return fabric.activateAgent(input.agentId);
    }),

  pauseAgent: protectedProcedure
    .input(z.object({ agentId: z.string() }))
    .mutation(async ({ input }) => {
      const fabric = getFreeWillAgentFabric();
      return fabric.pauseAgent(input.agentId);
    }),

  // ─── Decisions ──────────────────────────────────────────────────────────
  proposeDecision: protectedProcedure
    .input(
      z.object({
        agentId: z.string(),
        type: z.enum(['trade', 'purchase', 'stake', 'tip', 'social_action', 'custom']),
        action: z.string(),
        parameters: z.record(z.any()),
        reasoning: z.string(),
        confidence: z.number().min(0).max(1),
        expectedOutcome: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const fabric = getFreeWillAgentFabric();
      const decision = fabric.proposeDecision(
        input.agentId,
        ctx.user.id,
        input.type,
        input.action,
        input.parameters,
        input.reasoning,
        input.confidence,
        input.expectedOutcome
      );
      return decision;
    }),

  approveDecision: protectedProcedure
    .input(z.object({ decisionId: z.string(), agentId: z.string(), reason: z.string().optional() }))
    .mutation(async ({ input }) => {
      const fabric = getFreeWillAgentFabric();
      return fabric.approveDecision(input.decisionId, input.agentId, input.reason);
    }),

  executeDecision: protectedProcedure
    .input(
      z.object({
        decisionId: z.string(),
        agentId: z.string(),
        result: z.any(),
        error: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const fabric = getFreeWillAgentFabric();
      return fabric.executeDecision(input.decisionId, input.agentId, input.result, input.error);
    }),

  getAgentDecisions: protectedProcedure
    .input(z.object({ agentId: z.string(), limit: z.number().min(1).max(500).default(50) }))
    .query(async ({ input }) => {
      const fabric = getFreeWillAgentFabric();
      return fabric.getAgentDecisions(input.agentId, input.limit);
    }),

  // ─── Learning ───────────────────────────────────────────────────────────
  recordLearning: protectedProcedure
    .input(
      z.object({
        agentId: z.string(),
        pattern: z.string(),
        effectiveness: z.number().min(0).max(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const fabric = getFreeWillAgentFabric();
      return fabric.recordLearning(input.agentId, ctx.user.id, input.pattern, input.effectiveness);
    }),

  getAgentLearnings: protectedProcedure
    .input(z.object({ agentId: z.string() }))
    .query(async ({ input }) => {
      const fabric = getFreeWillAgentFabric();
      return fabric.getAgentLearnings(input.agentId);
    }),

  getAgentRecommendations: protectedProcedure
    .input(z.object({ agentId: z.string() }))
    .query(async ({ input }) => {
      const fabric = getFreeWillAgentFabric();
      return fabric.getAgentRecommendations(input.agentId);
    }),

  // ─── Strategies ─────────────────────────────────────────────────────────
  createStrategy: protectedProcedure
    .input(
      z.object({
        agentId: z.string(),
        name: z.string().min(1).max(100),
        description: z.string().max(500),
        rules: z.array(
          z.object({
            condition: z.string(),
            action: z.string(),
            priority: z.number().min(1).max(100),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const fabric = getFreeWillAgentFabric();
      return fabric.createStrategy(input.agentId, input.name, input.description, input.rules);
    }),

  getAgentStrategies: protectedProcedure
    .input(z.object({ agentId: z.string() }))
    .query(async ({ input }) => {
      const fabric = getFreeWillAgentFabric();
      return fabric.getAgentStrategies(input.agentId);
    }),
});
