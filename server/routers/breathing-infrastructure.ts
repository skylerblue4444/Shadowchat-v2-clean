import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
import { getBreathingInfrastructure } from '../lib/breathing-infrastructure';

export const breathingInfrastructureRouter = router({
  recordHealth: protectedProcedure
    .input(z.object({ cpuUsage: z.number(), memoryUsage: z.number(), diskUsage: z.number(), responseTime: z.number(), errorRate: z.number() }))
    .mutation(async ({ input }) => {
      const engine = getBreathingInfrastructure();
      return engine.recordHealth(input.cpuUsage, input.memoryUsage, input.diskUsage, input.responseTime, input.errorRate);
    }),

  detectAnomaly: protectedProcedure
    .input(z.object({ type: z.string(), severity: z.enum(['low', 'medium', 'high', 'critical']), description: z.string() }))
    .mutation(async ({ input }) => {
      const engine = getBreathingInfrastructure();
      return engine.detectAnomaly(input.type, input.severity, input.description);
    }),

  proposeOptimization: protectedProcedure
    .input(z.object({ type: z.enum(['performance', 'memory', 'database', 'cache', 'security']), targetComponent: z.string(), improvementPercentage: z.number() }))
    .mutation(async ({ input }) => {
      const engine = getBreathingInfrastructure();
      return engine.proposeOptimization(input.type, input.targetComponent, input.improvementPercentage);
    }),

  createFeatureFlag: protectedProcedure
    .input(z.object({ name: z.string(), description: z.string(), rolloutPercentage: z.number().optional(), abTestVariants: z.array(z.object({ variant: z.string(), percentage: z.number() })).optional() }))
    .mutation(async ({ input }) => {
      const engine = getBreathingInfrastructure();
      return engine.createFeatureFlag(input.name, input.description, input.rolloutPercentage, input.abTestVariants);
    }),

  updateFeatureFlagRollout: protectedProcedure
    .input(z.object({ flagId: z.string(), percentage: z.number() }))
    .mutation(async ({ input }) => {
      const engine = getBreathingInfrastructure();
      return engine.updateFeatureFlagRollout(input.flagId, input.percentage);
    }),

  recordCodeOptimization: protectedProcedure
    .input(z.object({ file: z.string(), optimization: z.string(), performanceGain: z.number() }))
    .mutation(async ({ input }) => {
      const engine = getBreathingInfrastructure();
      return engine.recordCodeOptimization(input.file, input.optimization, input.performanceGain);
    }),

  applySecurityPatch: protectedProcedure
    .input(z.object({ vulnerability: z.string(), severity: z.enum(['low', 'medium', 'high', 'critical']) }))
    .mutation(async ({ input }) => {
      const engine = getBreathingInfrastructure();
      return engine.applySecurityPatch(input.vulnerability, input.severity);
    }),

  getEvolutionMetrics: protectedProcedure.query(async () => {
    const engine = getBreathingInfrastructure();
    return engine.getEvolutionMetrics();
  }),

  getSystemStatus: protectedProcedure.query(async () => {
    const engine = getBreathingInfrastructure();
    return engine.getSystemStatus();
  }),
});
