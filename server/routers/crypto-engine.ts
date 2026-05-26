import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
import {
  getCryptoEngine,
  type CoinSymbol,
  type TransactionType,
  COIN_CONFIGS,
} from '../lib/crypto-engine';

const coinSchema = z.enum([
  'SKY4444',
  'BTC',
  'USDT',
  'TRUMP',
  'XMR',
  'DOGE',
  'SHADOW',
] as const);

const transactionTypeSchema = z.enum([
  'send',
  'receive',
  'stake',
  'unstake',
  'swap',
  'burn',
  'mint',
  'tip',
  'escrow',
] as const);

/**
 * Crypto Engine Router
 * Exposes multi-coin operations with simulation/live-mode separation
 */
export const cryptoEngineRouter = router({
  // ─── Mode Management ─────────────────────────────────────────────────────
  getMode: protectedProcedure.query(async () => {
    const engine = getCryptoEngine();
    return { mode: engine.getMode() };
  }),

  setMode: protectedProcedure
    .input(z.object({ mode: z.enum(['simulation', 'live']) }))
    .mutation(async ({ input }) => {
      const engine = getCryptoEngine();
      engine.setMode(input.mode);
      return { mode: engine.getMode() };
    }),

  // ─── Coin Registry ──────────────────────────────────────────────────────
  getSupportedCoins: protectedProcedure.query(async () => {
    const engine = getCryptoEngine();
    return { coins: engine.getSupportedCoins() };
  }),

  getCoinConfig: protectedProcedure
    .input(z.object({ coin: coinSchema }))
    .query(async ({ input }) => {
      const engine = getCryptoEngine();
      const config = engine.getCoinConfig(input.coin);
      return { config };
    }),

  // ─── Balances & Simulation ──────────────────────────────────────────────
  initializeSimulationBalances: protectedProcedure
    .input(
      z.object({
        balances: z.record(coinSchema, z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const engine = getCryptoEngine();
      engine.initializeSimulationBalances(ctx.user.id, input.balances || {});
      return { success: true };
    }),

  getSimulationBalance: protectedProcedure
    .input(z.object({ coin: coinSchema }))
    .query(async ({ ctx, input }) => {
      const engine = getCryptoEngine();
      const balance = engine.getSimulationBalance(ctx.user.id, input.coin);
      return { coin: input.coin, balance };
    }),

  // ─── Transactions ───────────────────────────────────────────────────────
  executeTransaction: protectedProcedure
    .input(
      z.object({
        coin: coinSchema,
        type: transactionTypeSchema,
        amount: z.string(),
        toAddress: z.string(),
        memo: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const engine = getCryptoEngine();
      const tx = await engine.executeTransaction(
        ctx.user.id,
        input.coin,
        input.type,
        input.amount,
        input.toAddress,
        input.memo
      );
      return tx;
    }),

  // ─── Staking ────────────────────────────────────────────────────────────
  getStakingPositions: protectedProcedure.query(async ({ ctx }) => {
    const engine = getCryptoEngine();
    const positions = await engine.getStakingPositions(ctx.user.id);
    return { positions };
  }),

  stake: protectedProcedure
    .input(
      z.object({
        coin: coinSchema,
        amount: z.string(),
        lockPeriodDays: z.number().min(1).max(365),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const engine = getCryptoEngine();
      const position = await engine.stake(
        ctx.user.id,
        input.coin,
        input.amount,
        input.lockPeriodDays
      );
      return position;
    }),

  // ─── Swaps ──────────────────────────────────────────────────────────────
  getSwapQuote: protectedProcedure
    .input(
      z.object({
        fromCoin: coinSchema,
        toCoin: coinSchema,
        fromAmount: z.string(),
      })
    )
    .query(async ({ input }) => {
      const engine = getCryptoEngine();
      const quote = await engine.getSwapQuote(
        input.fromCoin,
        input.toCoin,
        input.fromAmount
      );
      return quote;
    }),

  executeSwap: protectedProcedure
    .input(
      z.object({
        fromCoin: coinSchema,
        toCoin: coinSchema,
        fromAmount: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const engine = getCryptoEngine();
      const tx = await engine.executeSwap(
        ctx.user.id,
        input.fromCoin,
        input.toCoin,
        input.fromAmount
      );
      return tx;
    }),

  // ─── Burn & Mint ────────────────────────────────────────────────────────
  burnCoins: protectedProcedure
    .input(
      z.object({
        coin: coinSchema,
        amount: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const engine = getCryptoEngine();
      const tx = await engine.burnCoins(ctx.user.id, input.coin, input.amount);
      return tx;
    }),

  mintCoins: protectedProcedure
    .input(
      z.object({
        coin: coinSchema,
        amount: z.string(),
        recipientAddress: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: Add admin check
      const engine = getCryptoEngine();
      const tx = await engine.mintCoins(
        input.coin,
        input.amount,
        input.recipientAddress
      );
      return tx;
    }),
});
