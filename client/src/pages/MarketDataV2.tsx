/**
 * Enhanced Market Data Hub v2.0
 * Full-featured market explorer: Crypto, Stocks, Forex, Commodities
 * Real-time pricing, charts, trending assets, watchlist
 */
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ComposedChart,
} from "recharts";
import {
  TrendingUp, TrendingDown, Search, Star, BarChart2,
  RefreshCw, ChevronUp, ChevronDown, ArrowUpRight, ArrowDownRight,
  Zap, Globe, Wallet, Flame, Eye, EyeOff, Download, Share2,
  Filter, Settings, Bell, Clock, Volume2, DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

// ─── Component ─────────────────────────────────────────────────────────────────
export default function MarketDataV2() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [activeCategory, setActiveCategory] = useState<"all" | "crypto" | "stocks" | "forex" | "commodities">("crypto");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"rank" | "price" | "change24h" | "marketCap">("rank");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [chartInterval, setChartInterval] = useState<"1h" | "4h" | "1d" | "1w">("1d");
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // ─── tRPC Queries ───────────────────────────────────────────────────────────
  const marketData = trpc.marketData.getAll.useQuery({
    category: activeCategory,
    search: searchQuery,
    sortBy,
    sortDir,
    limit: 50,
  });

  const globalStats = trpc.marketData.getGlobalStats.useQuery();
  const trending = trpc.marketData.getTrending.useQuery();
  const watchlist = trpc.marketData.getWatchlist.useQuery();
  const selectedAssetData = selectedAsset
    ? trpc.marketData.getAsset.useQuery({ symbol: selectedAsset })
    : null;
  const candles = selectedAsset
    ? trpc.marketData.getCandles.useQuery({ symbol: selectedAsset, interval: chartInterval, limit: 90 })
    : null;

  // ─── Computed ───────────────────────────────────────────────────────────────
  const categories = [
    { id: "all", label: "All Markets", icon: Globe },
    { id: "crypto", label: "Crypto", icon: Zap },
    { id: "stocks", label: "Stocks", icon: BarChart2 },
    { id: "forex", label: "Forex", icon: DollarSign },
    { id: "commodities", label: "Commodities", icon: Flame },
  ] as const;

  const displayItems = useMemo(() => {
    if (showWatchlist && watchlist.data) {
      return watchlist.data.items;
    }
    return marketData.data?.items ?? [];
  }, [marketData.data, watchlist.data, showWatchlist]);

  const stats = globalStats.data;

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(symbol)) next.delete(symbol);
      else next.add(symbol);
      return next;
    });
  };

  const handleRefresh = () => {
    marketData.refetch();
    globalStats.refetch();
    trending.refetch();
    watchlist.refetch();
    toast.success("Market data refreshed!");
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">Market Hub</h1>
            <p className="text-slate-400">Real-time prices across crypto, stocks, forex, and commodities</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="gap-2 border-white/10 hover:border-cyan-400/50 hover:bg-cyan-400/10"
            >
              <RefreshCw className={`h-4 w-4 ${marketData.isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              onClick={() => setShowWatchlist(!showWatchlist)}
              variant={showWatchlist ? "default" : "outline"}
              size="sm"
              className="gap-2"
            >
              <Star className="h-4 w-4" />
              Watchlist
            </Button>
          </div>
        </div>

        {/* Global Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 p-4 backdrop-blur"
            >
              <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Crypto Market Cap</div>
              <div className="text-2xl font-black text-white mb-1">${(stats.crypto.totalMarketCap / 1e12).toFixed(2)}T</div>
              <div className="flex items-center gap-1 text-sm text-cyan-400">
                <TrendingUp className="h-4 w-4" />
                BTC Dominance: {stats.crypto.btcDominance.toFixed(1)}%
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-4 backdrop-blur"
            >
              <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">S&P 500</div>
              <div className="text-2xl font-black text-white mb-1">{stats.stocks.sp500.toFixed(0)}</div>
              <div className={`flex items-center gap-1 text-sm ${stats.stocks.sp500Change > 0 ? "text-emerald-400" : "text-red-400"}`}>
                {stats.stocks.sp500Change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {Math.abs(stats.stocks.sp500Change).toFixed(2)}%
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-4 backdrop-blur"
            >
              <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Gold Price</div>
              <div className="text-2xl font-black text-white mb-1">${stats.commodities.goldPrice.toFixed(0)}/oz</div>
              <div className={`flex items-center gap-1 text-sm ${stats.commodities.goldChange > 0 ? "text-emerald-400" : "text-red-400"}`}>
                {stats.commodities.goldChange > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {Math.abs(stats.commodities.goldChange).toFixed(2)}%
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 p-4 backdrop-blur"
            >
              <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">EUR/USD</div>
              <div className="text-2xl font-black text-white mb-1">{stats.forex.dxyIndex.toFixed(4)}</div>
              <div className={`flex items-center gap-1 text-sm ${stats.forex.dxyChange > 0 ? "text-emerald-400" : "text-red-400"}`}>
                {stats.forex.dxyChange > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {Math.abs(stats.forex.dxyChange).toFixed(2)}%
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all ${
                    activeCategory === cat.id
                      ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white shadow-lg shadow-cyan-500/30"
                      : "border border-white/10 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.label}
                </motion.button>
              );
            })}
          </div>

          {/* Search & Sort */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search assets..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-4 py-2 rounded-xl bg-slate-900/50 border border-white/10 text-white text-sm"
            >
              <option value="rank">Rank</option>
              <option value="price">Price</option>
              <option value="change24h">24h Change</option>
              <option value="marketCap">Market Cap</option>
            </select>
            <Button
              onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
              variant="outline"
              size="sm"
              className="border-white/10"
            >
              {sortDir === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>

          {/* Asset List */}
          <div className="space-y-2">
            <AnimatePresence>
              {displayItems.map((item: any, idx: number) => (
                <motion.div
                  key={item.symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.02 }}
                  onClick={() => setSelectedAsset(item.symbol)}
                  className={`group rounded-xl border transition-all cursor-pointer p-4 ${
                    selectedAsset === item.symbol
                      ? "border-cyan-400/50 bg-cyan-400/10"
                      : "border-white/10 bg-white/[0.02] hover:border-cyan-400/30 hover:bg-cyan-400/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <button
                        onClick={e => { e.stopPropagation(); toggleFavorite(item.symbol); }}
                        className="text-slate-400 hover:text-amber-400 transition-colors"
                      >
                        <Star className={`h-5 w-5 ${favorites.has(item.symbol) ? "fill-amber-400 text-amber-400" : ""}`} />
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-400">#{item.rank}</span>
                          <span className="font-bold text-white">{item.symbol}</span>
                          <span className="text-sm text-slate-500">{item.name}</span>
                        </div>
                        {item.sector && <div className="text-xs text-slate-500 mt-1">{item.sector}</div>}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <div className="font-bold text-white">
                          {item.price > 1 ? `$${item.price.toFixed(2)}` : `$${item.price.toFixed(6)}`}
                        </div>
                        <div className={`text-sm font-semibold flex items-center justify-end gap-1 ${
                          item.change24h > 0 ? "text-emerald-400" : "text-red-400"
                        }`}>
                          {item.change24h > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {Math.abs(item.change24h).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar: Asset Details & Chart */}
        <div className="space-y-6">
          {selectedAsset && selectedAssetData?.data && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl overflow-hidden"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-black text-white">{selectedAssetData.data.symbol}</h2>
                    <p className="text-sm text-slate-400">{selectedAssetData.data.name}</p>
                  </div>
                  <button
                    onClick={() => setSelectedAsset(null)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-4xl font-black text-white">
                        ${selectedAssetData.data.price.toFixed(selectedAssetData.data.price > 100 ? 2 : 6)}
                      </div>
                      <div className={`text-lg font-bold flex items-center gap-2 mt-2 ${
                        selectedAssetData.data.change24h > 0 ? "text-emerald-400" : "text-red-400"
                      }`}>
                        {selectedAssetData.data.change24h > 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                        {Math.abs(selectedAssetData.data.change24h).toFixed(2)}% (24h)
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg bg-white/[0.04] p-3">
                      <div className="text-slate-500 mb-1">High 24h</div>
                      <div className="font-bold text-white">${selectedAssetData.data.high24h?.toFixed(2)}</div>
                    </div>
                    <div className="rounded-lg bg-white/[0.04] p-3">
                      <div className="text-slate-500 mb-1">Low 24h</div>
                      <div className="font-bold text-white">${selectedAssetData.data.low24h?.toFixed(2)}</div>
                    </div>
                  </div>

                  {selectedAssetData.data.description && (
                    <p className="text-xs text-slate-400 leading-relaxed">{selectedAssetData.data.description}</p>
                  )}
                </div>
              </div>

              {/* Chart Interval Selector */}
              <div className="flex gap-2 mb-4">
                {(["1h", "4h", "1d", "1w"] as const).map(interval => (
                  <button
                    key={interval}
                    onClick={() => setChartInterval(interval)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      chartInterval === interval
                        ? "bg-cyan-400 text-slate-950"
                        : "bg-white/[0.04] text-slate-400 hover:bg-white/[0.08]"
                    }`}
                  >
                    {interval}
                  </button>
                ))}
              </div>

              {/* Sparkline Chart */}
              {selectedAssetData.data.sparkline && (
                <div className="h-32 -mx-6 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedAssetData.data.sparkline.map((p, i) => ({ value: p }))}>
                      <defs>
                        <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="#06b6d4" fill="url(#sparklineGradient)" isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="flex gap-2">
                <Button className="flex-1 gap-2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white hover:opacity-90">
                  <TrendingUp className="h-4 w-4" />
                  Trade
                </Button>
                <Button variant="outline" size="sm" className="border-white/10">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Trending */}
          {trending.data && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur"
            >
              <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-400" />
                Trending
              </h3>
              <div className="space-y-2">
                {trending.data.trending.slice(0, 5).map((item: any) => (
                  <button
                    key={item.symbol}
                    onClick={() => setSelectedAsset(item.symbol)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.05] transition-all text-sm"
                  >
                    <span className="font-semibold text-white">{item.symbol}</span>
                    <span className={item.change24h > 0 ? "text-emerald-400" : "text-red-400"}>
                      {item.change24h > 0 ? "+" : ""}{item.change24h.toFixed(2)}%
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
