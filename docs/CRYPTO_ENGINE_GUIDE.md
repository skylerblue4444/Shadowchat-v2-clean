# Crypto Engine Guide

## Overview

The **Crypto Engine** is a production-grade multi-coin orchestration system supporting 7+ cryptocurrencies with **simulation and live-mode separation**. It enables safe testing and gradual rollout of crypto features.

## Supported Coins

| Coin | Symbol | Network | Staking | Swap | Min Amount | Max Amount |
|------|--------|---------|---------|------|-----------|-----------|
| SkyCoin444 | SKY4444 | Ethereum | ✅ | ✅ | 0.001 | 1M |
| Bitcoin | BTC | Bitcoin | ❌ | ✅ | 0.00001 | 21M |
| Tether | USDT | Ethereum | ✅ | ✅ | 1 | 1B |
| Trump Token | TRUMP | Ethereum | ❌ | ✅ | 1 | 1B |
| Monero | XMR | Monero | ❌ | ✅ | 0.0001 | 18M |
| Dogecoin | DOGE | Dogecoin | ❌ | ✅ | 1 | 1B |
| Shadow | SHADOW | Ethereum | ✅ | ✅ | 0.1 | 1B |

## Architecture

### Core Components

```
CryptoEngine (server/lib/crypto-engine.ts)
├── Coin Registry (COIN_CONFIGS)
├── Transaction Executor (simulation/live)
├── Staking Manager
├── Swap Engine
├── Burn/Mint Operations
└── Balance Management
```

### Modes

#### Simulation Mode (Default)

- **Purpose**: Safe testing, development, demos
- **Balances**: In-memory, ephemeral
- **Transactions**: Always succeed (no real blockchain)
- **Cost**: Free
- **Use Case**: Feature development, user onboarding

#### Live Mode

- **Purpose**: Real blockchain interactions
- **Balances**: On-chain, persistent
- **Transactions**: Require real gas/fees
- **Cost**: Real cryptocurrency
- **Use Case**: Production deployments, real users

## API Reference

### Mode Management

```typescript
// Get current mode
const { mode } = await trpc.cryptoEngine.getMode.query();

// Switch mode
await trpc.cryptoEngine.setMode.mutate({ mode: 'simulation' });
```

### Coin Registry

```typescript
// Get all supported coins
const { coins } = await trpc.cryptoEngine.getSupportedCoins.query();

// Get coin configuration
const { config } = await trpc.cryptoEngine.getCoinConfig.query({ 
  coin: 'SKY4444' 
});
```

### Simulation Balances

```typescript
// Initialize simulation balances for a user
await trpc.cryptoEngine.initializeSimulationBalances.mutate({
  balances: {
    SKY4444: '1000',
    BTC: '0.5',
    USDT: '5000'
  }
});

// Get simulation balance
const { balance } = await trpc.cryptoEngine.getSimulationBalance.query({
  coin: 'SKY4444'
});
```

### Transactions

```typescript
// Execute a transaction
const tx = await trpc.cryptoEngine.executeTransaction.mutate({
  coin: 'SKY4444',
  type: 'send',
  amount: '100',
  toAddress: '0x...',
  memo: 'Payment for services'
});

// Response:
// {
//   id: 'tx-123...',
//   userId: 42,
//   coin: 'SKY4444',
//   type: 'send',
//   amount: '100',
//   status: 'confirmed',
//   createdAt: '2026-05-21T...'
// }
```

### Staking

```typescript
// Get staking positions
const { positions } = await trpc.cryptoEngine.getStakingPositions.query();

// Stake coins
const position = await trpc.cryptoEngine.stake.mutate({
  coin: 'SKY4444',
  amount: '500',
  lockPeriodDays: 90
});

// Response:
// {
//   id: 'stake-123...',
//   coin: 'SKY4444',
//   amount: '500',
//   apy: 12.5,
//   lockPeriodDays: 90,
//   stakedAt: '2026-05-21T...',
//   rewards: '0'
// }
```

### Swaps

```typescript
// Get swap quote
const quote = await trpc.cryptoEngine.getSwapQuote.query({
  fromCoin: 'SKY4444',
  toCoin: 'USDT',
  fromAmount: '100'
});

// Response:
// {
//   fromCoin: 'SKY4444',
//   toCoin: 'USDT',
//   fromAmount: '100',
//   toAmount: '250',
//   rate: 2.5,
//   slippage: 0.5,
//   fee: '0.625',
//   estimatedTime: 30
// }

// Execute swap
const tx = await trpc.cryptoEngine.executeSwap.mutate({
  fromCoin: 'SKY4444',
  toCoin: 'USDT',
  fromAmount: '100'
});
```

### Burn & Mint

```typescript
// Burn coins (reduce supply)
const burnTx = await trpc.cryptoEngine.burnCoins.mutate({
  coin: 'SKY4444',
  amount: '50'
});

// Mint coins (admin only)
const mintTx = await trpc.cryptoEngine.mintCoins.mutate({
  coin: 'SKY4444',
  amount: '1000',
  recipientAddress: '0x...'
});
```

## Usage Patterns

### Pattern 1: Safe Feature Development

```typescript
// 1. Start in simulation mode
await trpc.cryptoEngine.setMode.mutate({ mode: 'simulation' });

// 2. Initialize test balances
await trpc.cryptoEngine.initializeSimulationBalances.mutate({
  balances: { SKY4444: '10000', USDT: '50000' }
});

// 3. Test transactions without risk
const tx = await trpc.cryptoEngine.executeTransaction.mutate({
  coin: 'SKY4444',
  type: 'send',
  amount: '100',
  toAddress: 'test-address'
});

// 4. Verify behavior
console.log(tx.status); // 'confirmed'
```

### Pattern 2: Gradual Live Rollout

```typescript
// 1. Run simulation tests first
// ... (as above)

// 2. Switch to live mode
await trpc.cryptoEngine.setMode.mutate({ mode: 'live' });

// 3. Execute real transaction
const liveTx = await trpc.cryptoEngine.executeTransaction.mutate({
  coin: 'SKY4444',
  type: 'send',
  amount: '10', // Start small
  toAddress: 'real-address'
});

// 4. Monitor on-chain
console.log(liveTx.txHash); // Can track on blockchain explorer
```

### Pattern 3: Multi-Coin Portfolio

```typescript
// Initialize diverse portfolio
await trpc.cryptoEngine.initializeSimulationBalances.mutate({
  balances: {
    SKY4444: '1000',
    BTC: '0.1',
    USDT: '5000',
    XMR: '10',
    DOGE: '1000'
  }
});

// Rebalance via swaps
await trpc.cryptoEngine.executeSwap.mutate({
  fromCoin: 'DOGE',
  toCoin: 'SKY4444',
  fromAmount: '500'
});
```

## Environment Configuration

```env
# Ethereum-based coins
SKYCOIN4444_CONTRACT_ADDRESS=0x...
TRUMP_CONTRACT_ADDRESS=0x...
USDT_CONTRACT_ADDRESS=0xdAC17F958D2ee523a2206206994597C13D831ec7
SHADOW_CONTRACT_ADDRESS=0x...

# Bitcoin
BTC_RPC_URL=https://blockstream.info/api

# Monero
MONERO_RPC_URL=http://localhost:18081

# Dogecoin
DOGE_RPC_URL=https://dogechain.info/api/v1
```

## Security Considerations

1. **Simulation Mode**: No real funds at risk
2. **Live Mode**: 
   - Require explicit user confirmation
   - Implement rate limiting
   - Use hardware wallet integration
   - Audit all transactions
   - Monitor for suspicious activity

3. **Private Keys**: Never logged or exposed
4. **API Keys**: Stored in environment variables only
5. **Transaction Signing**: Client-side when possible

## Future Enhancements

1. **Hardware Wallet Support**: Ledger, Trezor integration
2. **Advanced Swap Routing**: Multi-hop swaps for better rates
3. **Yield Farming**: Automated yield optimization
4. **Cross-Chain Bridges**: Seamless multi-chain transfers
5. **Smart Contracts**: Custom contract interactions
6. **Portfolio Analytics**: Real-time P&L tracking
7. **Tax Reporting**: Automated tax document generation

## Troubleshooting

### "Unknown coin: XYZ"

**Solution**: Check `COIN_CONFIGS` in `crypto-engine.ts`, ensure coin is registered

### "Insufficient balance in simulation"

**Solution**: Call `initializeSimulationBalances` with adequate starting balances

### "Amount out of range"

**Solution**: Check min/max transaction amounts for the coin in `COIN_CONFIGS`

### Live transaction stuck

**Solution**: Check network status, increase gas price, or contact support

## References

- [Crypto Engine Implementation](../server/lib/crypto-engine.ts)
- [Crypto Engine Router](../server/routers/crypto-engine.ts)
- [Multi-Coin Service](../server/lib/multi-coin.ts)
