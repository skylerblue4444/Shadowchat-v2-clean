# Quick Reference Guide

## Starting the App

```bash
npm install
npm run dev
```

## Using the Project Context Loader

```bash
npm run context:index    # Generate context index
npm run context:search   # Search codebase
npm run context:files    # List all files
```

## Key API Endpoints

### Crypto Operations
```
POST   /api/cryptoEngine.getBalance
POST   /api/cryptoEngine.sendTransaction
POST   /api/cryptoEngine.stakeCoins
POST   /api/cryptoEngine.executeSwap
```

### Social Features
```
POST   /api/social.createPost
POST   /api/social.likePost
POST   /api/social.followUser
POST   /api/social.sendDirectMessage
```

### Marketplace
```
POST   /api/marketplace.createListing
POST   /api/marketplace.createOrder
POST   /api/marketplace.leaveReview
```

### Gamification
```
POST   /api/gamification.createQuest
POST   /api/gamification.solvePuzzle
POST   /api/gamification.checkBadgeUnlock
GET    /api/gamification.getLeaderboard
```

### AI & Intelligence
```
POST   /api/devAi.generateBackendCode
POST   /api/hopeAiRag.queryWithContext
POST   /api/hopeAiRag.getFinancialInsights
```

### Governance
```
POST   /api/sovereignPolicy.createPolicy
POST   /api/sovereignPolicy.createReceipt
POST   /api/sovereignPolicy.logAuditEvent
```

### Autonomous Agents
```
POST   /api/freeWillAgents.createAgent
POST   /api/freeWillAgents.proposeDecision
POST   /api/freeWillAgents.approveDecision
```

## Environment Variables

```env
# AI Manus
OPENAI_API_KEY=sk_...
GROK_API_KEY=xai_...

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...

# Database
DATABASE_URL=postgresql://...

# App
NODE_ENV=production
PORT=3000
```

## Development Commands

```bash
# TypeScript validation
npm run type-check

# Database migrations
npm run db:migrate

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

## File Structure

```
/server
  /lib                    # Core engines
    crypto-engine.ts
    gamification-engine.ts
    social-engine.ts
    marketplace-engine.ts
    sovereign-policy-engine.ts
    free-will-agent-fabric.ts
  /routers               # tRPC routers
    gamification.ts
    social.ts
    marketplace.ts
    dev-ai-interface.ts
    sovereign-policy.ts
    free-will-agents.ts
    hope-ai-rag.ts
  /hope-ai              # AI integration
    llm-brain.service.ts
  /scripts              # Utilities
    project-context.mjs
    sync_google_info.py
```

## Common Tasks

### Adding a New Feature
1. Create engine in `/server/lib/`
2. Create router in `/server/routers/`
3. Add to `routers.ts`
4. Test with tRPC client

### Deploying
1. Run `npm run build`
2. Push to GitHub
3. Deploy to hosting platform
4. Run migrations

### Monitoring
- Check audit logs: `sovereignPolicy.getUserAuditLogs()`
- Monitor agent performance: `freeWillAgents.getAgent()`
- Review compliance: `sovereignPolicy.generateComplianceReport()`

---

*For detailed documentation, see `/docs` directory*
