# AI Manus Hybrid Brain Integration

## Overview

The Hope AI engine has been upgraded with a **maximum-powered hybrid LLM brain** combining **Grok (xAI)** and **GPT-4o (OpenAI)** for unhinged mode, strategic reasoning, and code generation.

This integration enables:

- **Unhinged Mode**: Creative, bold, high-agency reasoning with Grok as primary
- **Strategic Reasoning**: Deep analysis and planning with fallback to GPT-4o
- **Code Generation**: Production-grade TypeScript generation in unhinged mode
- **Voice Command Processing**: AI-powered interpretation of voice inputs
- **Automatic Fallback**: Seamless failover between Grok and GPT-4o

## Architecture

### Core Service: `server/hope-ai/llm-brain.service.ts`

The `llm-brain.service.ts` module provides:

| Function | Purpose | Primary Model |
|----------|---------|---------------|
| `callUnhingedBrain()` | Main LLM call with mode selection | Grok (configurable) |
| `generateCodeInUnhingedMode()` | Production TypeScript generation | Grok |
| `reasonStrategically()` | Deep strategic analysis | Grok → GPT-4o |
| `processVoiceCommandWithAI()` | Voice-to-action interpretation | Grok |
| `getAvailableModels()` | Check configured LLM availability | N/A |

### Router Integration: `server/routers/hope-ai.ts`

The Hope AI router exposes these new tRPC procedures:

```typescript
// Call the unhinged brain directly
trpc.hopeAi.callUnhingedBrain.mutate({
  prompt: "Design a sovereign payment system...",
  mode: "unhinged",
  useGrokPrimary: true
})

// Generate production code
trpc.hopeAi.generateCodeUnhinged.mutate({
  task: "Create a multi-coin wallet service",
  context: "TypeScript, Drizzle ORM, tRPC"
})

// Strategic reasoning
trpc.hopeAi.reasonStrategically.mutate({
  challenge: "How to scale the marketplace to 1M users?",
  constraints: "Limited infrastructure budget"
})

// Process voice commands
trpc.hopeAi.processVoiceCommand.mutate({
  voiceText: "Send 100 SkyCoin to Alice",
  userContext: "User has 500 SKY4444 balance"
})

// Check AI model status
trpc.hopeAi.getAIModelsStatus.query()
```

## Environment Configuration

### Required Variables

Add these to your `.env` file:

```env
# Grok (xAI) - Primary for Unhinged Mode
XAI_API_KEY=your_xai_api_key_here
GROK_API_KEY=your_grok_api_key_here

# OpenAI - Strong fallback / structured tasks
OPENAI_API_KEY=your_openai_api_key_here
```

### Optional Behavior

- If only `OPENAI_API_KEY` is set: Falls back to GPT-4o for all tasks
- If only `XAI_API_KEY` is set: Uses Grok exclusively
- If both are set: Grok is primary, OpenAI is fallback (recommended)

## Usage Examples

### 1. Unhinged Mode Reasoning

```typescript
const response = await trpc.hopeAi.callUnhingedBrain.mutate({
  prompt: "What's the most innovative way to build a decentralized social network?",
  mode: "unhinged",
  temperature: 0.95,
  maxTokens: 4000,
  useGrokPrimary: true
});

console.log(response.content);
// Returns bold, creative, high-agency reasoning from Grok
```

### 2. Production Code Generation

```typescript
const { code } = await trpc.hopeAi.generateCodeUnhinged.mutate({
  task: "Create a Drizzle ORM schema for a multi-asset wallet",
  context: "Support SKY4444, BTC, USDT, TRUMP with transaction history"
});

// Returns production-ready TypeScript code
```

### 3. Strategic Planning

```typescript
const { reasoning } = await trpc.hopeAi.reasonStrategically.mutate({
  challenge: "Design a sustainable token economy for the platform",
  constraints: "Must maintain 1:1 USD peg for stablecoin portion"
});

// Returns deep strategic analysis
```

### 4. Voice Command Interpretation

```typescript
const result = await trpc.hopeAi.processVoiceCommand.mutate({
  voiceText: "Buy 50 SkyCoin at market price",
  userContext: "User has $500 USD balance, KYC verified"
});

// Returns:
// {
//   interpretation: "User wants to purchase SkyCoin444 tokens",
//   action: "execute_market_buy",
//   parameters: { amount: 50, coin: "SKY4444", orderType: "market" }
// }
```

## Modes & Temperature Settings

### Unhinged Mode (temperature: 0.9)

- **Use case**: Creative solutions, bold architecture, high-agency reasoning
- **Primary model**: Grok
- **Characteristics**: Creative, direct, ambitious, less constrained

### Creative Mode (temperature: 0.85)

- **Use case**: Content generation, marketing copy, innovative ideas
- **Primary model**: Grok
- **Characteristics**: Balanced creativity with some structure

### Structured Mode (temperature: 0.7)

- **Use case**: Planning, analysis, decision-making
- **Primary model**: Grok → GPT-4o
- **Characteristics**: Logical, organized, step-by-step reasoning

### Code Mode (temperature: 0.6)

- **Use case**: Production code generation
- **Primary model**: Grok
- **Characteristics**: Clean, modular, well-commented, performant

## Error Handling & Fallback

The service implements automatic fallback:

1. **Primary attempt**: Uses configured primary model (Grok by default)
2. **If error**: Automatically retries with fallback model (GPT-4o)
3. **If both fail**: Throws `TRPCError` with descriptive message

```typescript
try {
  const result = await trpc.hopeAi.callUnhingedBrain.mutate({
    prompt: "...",
    useGrokPrimary: true
  });
} catch (error) {
  // Error includes fallback attempt details
  console.error(error.message);
}
```

## Performance Considerations

| Metric | Grok | GPT-4o |
|--------|------|--------|
| Speed | ~2-5s | ~1-3s |
| Creativity | ★★★★★ | ★★★★☆ |
| Code Quality | ★★★★★ | ★★★★★ |
| Cost | Competitive | Higher |
| Reasoning | ★★★★★ | ★★★★☆ |

## Future Enhancements

1. **Streaming Support**: WebSocket-based streaming for long-form responses
2. **Tool Calling**: Enable the brain to call backend services directly
3. **Self-Critique**: Multi-step generation + critique loop
4. **Reasoning Traces**: Store and audit AI decision-making
5. **Fine-tuning**: Custom models trained on platform-specific data
6. **Multi-turn Conversations**: Maintain context across multiple exchanges

## Security & Guardrails

- **Financial Actions**: All real transactions require explicit user confirmation
- **API Keys**: Stored in environment variables, never logged
- **Rate Limiting**: Implement per-user rate limits on LLM calls
- **Audit Logging**: All AI-generated actions are logged for compliance
- **Prompt Injection**: Input validation and sanitization applied

## Troubleshooting

### "No LLM client configured"

**Solution**: Ensure `XAI_API_KEY` or `OPENAI_API_KEY` is set in `.env`

### Slow responses

**Solution**: Check network latency to API endpoints, consider using GPT-4o for faster responses

### Inconsistent results

**Solution**: Adjust `temperature` parameter (lower = more consistent, higher = more creative)

### High costs

**Solution**: Use Grok for creative tasks (lower cost), GPT-4o for critical code generation

## References

- [Grok API Documentation](https://docs.x.ai/api)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Hope AI Architecture](./ARCHITECTURE_AUDIT_AND_UPGRADE_PLAN.md)
