import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
import { getEnterpriseSecuritySuite } from '../lib/enterprise-security';

export const enterpriseSecurityRouter = router({
  detectThreat: protectedProcedure
    .input(z.object({ threatType: z.string(), severity: z.enum(['low', 'medium', 'high', 'critical']), sourceIP: z.string(), targetResource: z.string(), description: z.string() }))
    .mutation(async ({ input }) => {
      const suite = getEnterpriseSecuritySuite();
      return suite.detectThreat(input.threatType, input.severity, input.sourceIP, input.targetResource, input.description);
    }),

  createEncryptionKey: protectedProcedure
    .input(z.object({ type: z.enum(['AES-256', 'RSA-4096', 'ChaCha20']).optional() }))
    .mutation(async ({ input }) => {
      const suite = getEnterpriseSecuritySuite();
      return suite.createEncryptionKey(input.type);
    }),

  rotateEncryptionKey: protectedProcedure
    .input(z.object({ keyId: z.string() }))
    .mutation(async ({ input }) => {
      const suite = getEnterpriseSecuritySuite();
      return suite.rotateEncryptionKey(input.keyId);
    }),

  generateAPIKey: protectedProcedure
    .input(z.object({ name: z.string(), permissions: z.array(z.string()).optional(), rateLimit: z.number().optional(), expiresAt: z.date().optional() }))
    .mutation(async ({ ctx, input }) => {
      const suite = getEnterpriseSecuritySuite();
      return suite.generateAPIKey(ctx.user.id, input.name, input.permissions, input.rateLimit, input.expiresAt);
    }),

  revokeAPIKey: protectedProcedure
    .input(z.object({ keyId: z.string() }))
    .mutation(async ({ input }) => {
      const suite = getEnterpriseSecuritySuite();
      return suite.revokeAPIKey(input.keyId);
    }),

  logAuditEvent: protectedProcedure
    .input(z.object({ action: z.string(), resource: z.string(), changes: z.record(z.any()), ipAddress: z.string(), userAgent: z.string(), status: z.enum(['success', 'failure']).optional() }))
    .mutation(async ({ ctx, input }) => {
      const suite = getEnterpriseSecuritySuite();
      return suite.logAuditEvent(ctx.user.id, input.action, input.resource, input.changes, input.ipAddress, input.userAgent, input.status);
    }),

  generateComplianceReport: protectedProcedure
    .input(z.object({ standard: z.enum(['SOC2', 'ISO27001', 'GDPR', 'HIPAA', 'PCI-DSS']) }))
    .mutation(async ({ input }) => {
      const suite = getEnterpriseSecuritySuite();
      return suite.generateComplianceReport(input.standard);
    }),

  respondToIncident: protectedProcedure
    .input(z.object({ incidentId: z.string(), severity: z.enum(['low', 'medium', 'high', 'critical']), actionsExecuted: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      const suite = getEnterpriseSecuritySuite();
      return suite.respondToIncident(input.incidentId, input.severity, input.actionsExecuted);
    }),

  detectDDoSAttack: protectedProcedure
    .input(z.object({ attackType: z.string(), requestsPerSecond: z.number(), blockedRequests: z.number() }))
    .mutation(async ({ input }) => {
      const suite = getEnterpriseSecuritySuite();
      return suite.detectDDoSAttack(input.attackType, input.requestsPerSecond, input.blockedRequests);
    }),

  calculateSecurityScore: protectedProcedure.query(async ({ ctx }) => {
    const suite = getEnterpriseSecuritySuite();
    return suite.calculateSecurityScore(ctx.user.id);
  }),

  getSecurityMetrics: protectedProcedure.query(async () => {
    const suite = getEnterpriseSecuritySuite();
    return suite.getSecurityMetrics();
  }),
});
