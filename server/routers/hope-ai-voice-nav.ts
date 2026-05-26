/**
 * Hope AI Voice Navigation Router v2.0
 * Full-platform voice navigation, parseVoice, executeCommand, actionCatalog
 * Powers the HopeAIGlobalVoiceDock component
 */
import { router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// ─── Full Route Catalog ──────────────────────────────────────────────────────
const ROUTE_CATALOG = [
  // Core
  { id: "dashboard", label: "Dashboard", path: "/dashboard", keywords: ["home", "main", "dashboard", "overview"], beginnerTip: "Your main hub — see portfolio, market, and activity at a glance.", category: "core" },
  { id: "wallet", label: "Wallet", path: "/dashboard/wallet", keywords: ["wallet", "balance", "funds", "money", "pay"], beginnerTip: "View your crypto and fiat balances, send and receive funds.", category: "finance" },
  { id: "portfolio", label: "Portfolio", path: "/dashboard/portfolio", keywords: ["portfolio", "holdings", "assets", "investments"], beginnerTip: "Track all your investments and asset performance.", category: "finance" },
  { id: "market", label: "Market Data", path: "/dashboard/market", keywords: ["market", "prices", "charts", "data", "stocks", "crypto"], beginnerTip: "Live market prices for crypto, stocks, forex, and commodities.", category: "trading" },
  { id: "trading", label: "Trading Terminal", path: "/dashboard/trading/spot", keywords: ["trade", "trading", "buy", "sell", "spot", "terminal"], beginnerTip: "Professional spot trading terminal with real-time order book.", category: "trading" },
  { id: "futures", label: "Futures Trading", path: "/dashboard/futures", keywords: ["futures", "leverage", "derivatives", "contracts"], beginnerTip: "Trade futures contracts with leverage.", category: "trading" },
  { id: "defi", label: "DeFi Dashboard", path: "/dashboard/defi", keywords: ["defi", "decentralized", "yield", "liquidity", "protocol"], beginnerTip: "Access DeFi protocols, yield farming, and liquidity pools.", category: "defi" },
  { id: "staking", label: "Staking", path: "/dashboard/staking", keywords: ["stake", "staking", "earn", "rewards", "validator"], beginnerTip: "Stake your tokens to earn passive rewards.", category: "defi" },
  { id: "mining", label: "Mining Dashboard", path: "/dashboard/mining", keywords: ["mine", "mining", "hash", "compute", "gpu"], beginnerTip: "Monitor your mining rigs and earnings.", category: "defi" },
  { id: "nft", label: "NFT Marketplace", path: "/dashboard/nft", keywords: ["nft", "collectibles", "art", "mint", "token"], beginnerTip: "Buy, sell, and mint NFTs.", category: "nft" },
  { id: "nft-creator", label: "NFT Creator", path: "/dashboard/nft-creator", keywords: ["create nft", "mint nft", "nft studio"], beginnerTip: "Create and mint your own NFTs.", category: "nft" },
  { id: "ai", label: "AI Tools Hub", path: "/dashboard/ai", keywords: ["ai tools", "artificial intelligence", "tools hub"], beginnerTip: "Access all AI-powered tools in one place.", category: "ai" },
  { id: "hope-ai", label: "Hope AI", path: "/dashboard/hope-ai", keywords: ["hope", "hope ai", "companion", "assistant"], beginnerTip: "Chat with Hope, your personal AI companion.", category: "ai" },
  { id: "ai-chat", label: "AI Chat", path: "/dashboard/ai-chat", keywords: ["chat", "ai chat", "gpt", "conversation"], beginnerTip: "Have a conversation with AI.", category: "ai" },
  { id: "ai-trading-bot", label: "AI Trading Bot", path: "/dashboard/ai-trading-bot", keywords: ["trading bot", "auto trade", "bot", "algorithm"], beginnerTip: "Set up automated trading strategies.", category: "ai" },
  { id: "ai-wealth", label: "AI Wealth Manager", path: "/dashboard/ai-wealth", keywords: ["wealth", "financial planning", "advisor", "ai wealth"], beginnerTip: "AI-powered wealth management and financial planning.", category: "ai" },
  { id: "social", label: "Social Feed", path: "/dashboard/social-feed", keywords: ["social", "feed", "posts", "community"], beginnerTip: "See what the community is posting.", category: "social" },
  { id: "messages", label: "Messages", path: "/dashboard/messages", keywords: ["message", "chat", "dm", "inbox", "talk"], beginnerTip: "Direct messages with other users.", category: "social" },
  { id: "leaderboard", label: "Leaderboard", path: "/dashboard/leaderboard", keywords: ["leaderboard", "ranking", "top", "best"], beginnerTip: "See the top traders and earners.", category: "social" },
  { id: "casino", label: "Casino", path: "/dashboard/casino", keywords: ["casino", "gamble", "slots", "games", "play"], beginnerTip: "Play casino games.", category: "entertainment" },
  { id: "game-center", label: "Game Center", path: "/dashboard/game-center", keywords: ["games", "game center", "gaming", "play"], beginnerTip: "Access all games and gaming features.", category: "entertainment" },
  { id: "live", label: "Live Stream", path: "/dashboard/live", keywords: ["live", "stream", "broadcast", "watch"], beginnerTip: "Watch or start a live stream.", category: "entertainment" },
  { id: "music", label: "Music Player", path: "/dashboard/music", keywords: ["music", "audio", "playlist", "songs"], beginnerTip: "Listen to music.", category: "entertainment" },
  { id: "marketplace", label: "Marketplace", path: "/dashboard/marketplace", keywords: ["marketplace", "shop", "buy", "sell", "store"], beginnerTip: "Buy and sell in the marketplace.", category: "commerce" },
  { id: "ico", label: "ICO Hub", path: "/dashboard/ico", keywords: ["ico", "launch", "token sale", "initial offering"], beginnerTip: "Participate in or launch token sales.", category: "finance" },
  { id: "charity", label: "Charity Hub", path: "/dashboard/charity", keywords: ["charity", "donate", "give", "nonprofit"], beginnerTip: "Donate to charities and causes.", category: "social" },
  { id: "dao", label: "DAO Governance", path: "/dashboard/dao", keywords: ["dao", "governance", "vote", "proposal"], beginnerTip: "Participate in decentralized governance.", category: "defi" },
  { id: "tax", label: "Tax Center", path: "/dashboard/tax", keywords: ["tax", "taxes", "report", "irs", "filing"], beginnerTip: "Generate tax reports for your crypto activity.", category: "finance" },
  { id: "settings", label: "Settings", path: "/dashboard/settings", keywords: ["settings", "preferences", "account", "profile", "config"], beginnerTip: "Manage your account settings.", category: "core" },
  { id: "notifications", label: "Notifications", path: "/dashboard/notifications", keywords: ["notifications", "alerts", "updates"], beginnerTip: "View your notifications and alerts.", category: "core" },
  { id: "analytics", label: "Analytics", path: "/dashboard/analytics", keywords: ["analytics", "stats", "statistics", "performance", "metrics"], beginnerTip: "Detailed analytics and performance metrics.", category: "finance" },
  { id: "referrals", label: "Referrals", path: "/dashboard/referrals", keywords: ["referral", "invite", "refer", "earn"], beginnerTip: "Invite friends and earn rewards.", category: "finance" },
  { id: "p2p", label: "P2P Exchange", path: "/dashboard/p2p", keywords: ["p2p", "peer to peer", "exchange", "otc"], beginnerTip: "Trade directly with other users.", category: "trading" },
  { id: "copy-trading", label: "Copy Trading", path: "/dashboard/copy-trading", keywords: ["copy trade", "follow trader", "mirror trade"], beginnerTip: "Copy the trades of top performers.", category: "trading" },
  { id: "token-swap", label: "Token Swap", path: "/dashboard/token-swap", keywords: ["swap", "exchange tokens", "convert", "dex"], beginnerTip: "Swap tokens instantly.", category: "defi" },
  { id: "price-alerts", label: "Price Alerts", path: "/dashboard/price-alerts", keywords: ["price alert", "alert", "notify price", "set alert"], beginnerTip: "Set price alerts for any asset.", category: "trading" },
  { id: "sovereign-engineer", label: "Sovereign Engineer", path: "/dashboard/sovereign-engineer", keywords: ["engineer", "sovereign", "developer", "code", "build"], beginnerTip: "Advanced developer and engineering tools.", category: "ai" },
  { id: "billion-dollar", label: "Billion Dollar Dashboard", path: "/dashboard/billion-dollar", keywords: ["billion", "luxury", "premium", "elite"], beginnerTip: "Premium dashboard for elite users.", category: "core" },
  { id: "trade-room", label: "Trade Room", path: "/dashboard/trade-room", keywords: ["trade room", "trading room", "war room"], beginnerTip: "Advanced trading war room.", category: "trading" },
  { id: "metaverse", label: "Metaverse Hub", path: "/dashboard/metaverse", keywords: ["metaverse", "virtual", "3d", "vr", "ar"], beginnerTip: "Enter the metaverse.", category: "entertainment" },
  { id: "events", label: "Events", path: "/dashboard/events", keywords: ["events", "calendar", "upcoming", "conference"], beginnerTip: "Upcoming events and conferences.", category: "social" },
  { id: "launchpad", label: "Launchpad", path: "/dashboard/launchpad", keywords: ["launchpad", "launch", "new project", "startup"], beginnerTip: "Launch your project or token.", category: "finance" },
  { id: "cold-vault", label: "Cold Vault", path: "/dashboard/cold-vault", keywords: ["cold vault", "cold storage", "hardware wallet", "secure"], beginnerTip: "Secure cold storage for your assets.", category: "finance" },
  { id: "api-vault", label: "API Vault", path: "/dashboard/api-vault", keywords: ["api", "api keys", "integrations", "developer"], beginnerTip: "Manage your API keys and integrations.", category: "core" },
  { id: "dating", label: "Dating Hub", path: "/dashboard/dating/sovereign", keywords: ["dating", "match", "meet", "connect"], beginnerTip: "Meet and connect with others.", category: "social" },
  { id: "shadow-intel", label: "Shadow Intelligence", path: "/dashboard/shadow-intelligence", keywords: ["shadow", "intelligence", "intel", "surveillance"], beginnerTip: "Advanced intelligence and monitoring tools.", category: "ai" },
  { id: "day-trade", label: "Day Trade AI Partner", path: "/dashboard/day-trade-partner", keywords: ["day trade", "day trading", "intraday", "scalp"], beginnerTip: "AI-powered day trading assistant.", category: "trading" },
];

// ─── Intent Parsing with GPT ──────────────────────────────────────────────────
async function parseVoiceWithAI(transcript: string): Promise<{
  intent: string;
  path?: string;
  symbol?: string;
  side?: "buy" | "sell";
  amount?: string;
  topic?: string;
  requiresConfirmation: boolean;
  spokenResponse: string;
  displayCards?: Array<{ title: string; body: string; action?: string; path?: string }>;
}> {
  const routeList = ROUTE_CATALOG.map(r => `${r.id}: "${r.label}" → ${r.path} (keywords: ${r.keywords.join(", ")})`).join("\n");

  const systemPrompt = `You are Hope AI, a voice navigation assistant for a financial super-app. 
Parse the user's voice command and return a JSON response.

Available routes:
${routeList}

Return JSON with these fields:
- intent: one of "navigate", "trade_prepare", "market_scan", "portfolio_summary", "explain", "beginner_mode", "unknown"
- path: the route path if navigating (e.g. "/dashboard/wallet")
- symbol: crypto/stock symbol if mentioned (e.g. "BTC", "ETH", "AAPL")
- side: "buy" or "sell" if trade intent
- amount: dollar or token amount if mentioned
- topic: topic to explain if explain intent
- requiresConfirmation: true only for trades, payments, or destructive actions
- spokenResponse: a friendly, concise spoken response (max 2 sentences)
- displayCards: optional array of {title, body, action?, path?} cards to show

Be conversational and helpful. If unsure, navigate to the closest matching page.`;

  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: transcript },
        ],
        response_format: { type: "json_object" },
        max_tokens: 500,
        temperature: 0.3,
      });
      const raw = completion.choices[0]?.message?.content ?? "{}";
      return JSON.parse(raw);
    } catch (e) {
      // Fall through to rule-based
    }
  }

  // Rule-based fallback
  const lower = transcript.toLowerCase();
  
  // Check for navigation intent
  for (const route of ROUTE_CATALOG) {
    for (const kw of route.keywords) {
      if (lower.includes(kw)) {
        return {
          intent: "navigate",
          path: route.path,
          requiresConfirmation: false,
          spokenResponse: `Opening ${route.label} now.`,
        };
      }
    }
  }

  // Trade intent
  const tradeMatch = lower.match(/(buy|sell)\s+([a-z0-9]+)/i);
  if (tradeMatch) {
    return {
      intent: "trade_prepare",
      side: tradeMatch[1].toLowerCase() as "buy" | "sell",
      symbol: tradeMatch[2].toUpperCase(),
      requiresConfirmation: true,
      spokenResponse: `I'll prepare a ${tradeMatch[1]} order for ${tradeMatch[2].toUpperCase()}. Please confirm.`,
    };
  }

  // Market scan
  const scanMatch = lower.match(/scan|price|check|how is\s+([a-z0-9]+)/i);
  if (scanMatch) {
    return {
      intent: "market_scan",
      symbol: scanMatch[1]?.toUpperCase() ?? "BTC",
      requiresConfirmation: false,
      spokenResponse: `Scanning market data now.`,
    };
  }

  return {
    intent: "unknown",
    requiresConfirmation: false,
    spokenResponse: "I didn't quite catch that. Try saying 'open wallet', 'scan Bitcoin', or 'go to trading'.",
  };
}

// ─── Router ──────────────────────────────────────────────────────────────────
export const hopeAiVoiceNavRouter = router({
  /**
   * Parse a voice transcript into a structured command
   */
  parseVoice: protectedProcedure
    .input(z.object({ transcript: z.string().min(1).max(1000) }))
    .mutation(async ({ input }) => {
      const parsed = await parseVoiceWithAI(input.transcript);
      return {
        intent: parsed.intent as
          | "navigate"
          | "trade_prepare"
          | "tip_prepare"
          | "market_scan"
          | "portfolio_summary"
          | "payment_prepare"
          | "explain"
          | "beginner_mode"
          | "hands_free_mode"
          | "workflow_guide"
          | "mission_plan"
          | "command_chain"
          | "proactive_suggest"
          | "unknown",
        payload: {
          raw: input.transcript,
          path: parsed.path,
          symbol: parsed.symbol,
          side: parsed.side,
          amount: parsed.amount,
          topic: parsed.topic,
          confidence: 0.9,
          safetyLevel: (parsed.requiresConfirmation ? "confirm" : "safe") as "safe" | "confirm" | "blocked",
        },
        requiresConfirmation: parsed.requiresConfirmation,
        spokenResponse: parsed.spokenResponse,
        displayCards: parsed.displayCards ?? [],
      };
    }),

  /**
   * Execute a parsed command (navigate, trade, explain, etc.)
   */
  executeCommand: protectedProcedure
    .input(
      z.object({
        intent: z.string(),
        payload: z.object({
          raw: z.string(),
          path: z.string().optional(),
          symbol: z.string().optional(),
          side: z.enum(["buy", "sell"]).optional(),
          amount: z.string().optional(),
          topic: z.string().optional(),
          confidence: z.number().optional(),
          safetyLevel: z.enum(["safe", "confirm", "blocked"]).optional(),
        }),
        confirmed: z.boolean().default(false),
        displayCards: z.array(z.object({
          title: z.string(),
          body: z.string(),
          action: z.string().optional(),
          path: z.string().optional(),
        })).default([]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { intent, payload } = input;

      if (intent === "navigate" && payload.path) {
        const route = ROUTE_CATALOG.find(r => r.path === payload.path);
        return {
          success: true,
          path: payload.path,
          spokenResponse: route
            ? `Navigating to ${route.label}. ${route.beginnerTip}`
            : `Navigating now.`,
        };
      }

      if (intent === "trade_prepare") {
        if (!input.confirmed) {
          return {
            success: false,
            requiresConfirmation: true,
            spokenResponse: `Ready to ${payload.side ?? "trade"} ${payload.symbol ?? "asset"}. Say confirm to proceed.`,
          };
        }
        return {
          success: true,
          path: "/dashboard/trading/spot",
          spokenResponse: `Trade prepared. Opening the spot trading terminal for ${payload.symbol ?? "your asset"}.`,
        };
      }

      if (intent === "market_scan") {
        return {
          success: true,
          path: "/dashboard/market",
          spokenResponse: `Opening market data${payload.symbol ? ` for ${payload.symbol}` : ""}. Live prices loading now.`,
        };
      }

      if (intent === "portfolio_summary") {
        return {
          success: true,
          path: "/dashboard/portfolio",
          spokenResponse: "Opening your portfolio. Here's a summary of your holdings.",
        };
      }

      if (intent === "explain") {
        let explanation = "Let me explain that for you.";
        if (payload.topic) {
          const topicMap: Record<string, string> = {
            defi: "DeFi stands for Decentralized Finance — financial services without banks, using smart contracts on blockchains.",
            nft: "NFTs are Non-Fungible Tokens — unique digital assets verified on a blockchain.",
            staking: "Staking means locking your crypto to support a network and earn rewards, like earning interest.",
            trading: "Trading means buying and selling assets to profit from price movements.",
            wallet: "A wallet stores your crypto keys — it doesn't hold coins, it holds your access to them.",
          };
          const key = Object.keys(topicMap).find(k => payload.topic!.toLowerCase().includes(k));
          if (key) explanation = topicMap[key];
        }
        return {
          success: true,
          spokenResponse: explanation,
        };
      }

      if (intent === "beginner_mode") {
        return {
          success: true,
          path: "/dashboard/hope-ai",
          spokenResponse: "Beginner mode activated! I'll guide you step by step. Let's start with your dashboard overview.",
        };
      }

      // Default: try to navigate
      if (payload.path) {
        return {
          success: true,
          path: payload.path,
          spokenResponse: "Navigating now.",
        };
      }

      return {
        success: false,
        spokenResponse: "I couldn't complete that action. Try saying 'open wallet' or 'go to trading'.",
      };
    }),

  /**
   * Get the full action catalog for the voice dock quick-access grid
   */
  actionCatalog: protectedProcedure.query(async () => {
    return ROUTE_CATALOG.map(r => ({
      id: r.id,
      label: r.label,
      path: r.path,
      category: r.category,
      beginnerTip: r.beginnerTip,
      keywords: r.keywords,
    }));
  }),

  /**
   * Get voice navigation suggestions based on current page
   */
  getContextualSuggestions: protectedProcedure
    .input(z.object({ currentPath: z.string() }))
    .query(async ({ input }) => {
      const current = ROUTE_CATALOG.find(r => r.path === input.currentPath);
      const suggestions = ROUTE_CATALOG
        .filter(r => r.category === current?.category && r.path !== input.currentPath)
        .slice(0, 4)
        .map(r => ({
          label: r.label,
          path: r.path,
          voiceCommand: `Open ${r.label}`,
        }));

      return {
        currentPage: current?.label ?? "Dashboard",
        suggestions,
        quickCommands: [
          "Open wallet",
          "Show market prices",
          "Go to trading",
          "Scan Bitcoin",
          "Open portfolio",
          "Hope beginner mode",
        ],
      };
    }),
});
