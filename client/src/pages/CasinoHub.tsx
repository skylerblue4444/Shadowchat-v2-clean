/**
 * Casino Hub - Blackjack, Roulette, Slots, Crash, Charity Gambling
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 */

import React, { useState } from 'react';

type GameTab = 'blackjack' | 'roulette' | 'slots' | 'crash' | 'coinflip';

interface BlackjackState {
  gameId: string | null;
  playerCards: Array<{ rank: string; suit: string }>;
  dealerCards: Array<{ rank: string; suit: string }>;
  playerValue: number;
  dealerValue: number;
  status: string;
  result: string | null;
  payout: number;
}

export default function CasinoHub() {
  const [activeGame, setActiveGame] = useState<GameTab>('blackjack');
  const [bet, setBet] = useState(10);
  const [coin, setCoin] = useState('SKY4444');
  const [balance] = useState({ SKY4444: 10000, SHADOW: 10000, DOGE: 100 });
  const [blackjack, setBlackjack] = useState<BlackjackState>({
    gameId: null, playerCards: [], dealerCards: [], playerValue: 0, dealerValue: 0, status: 'idle', result: null, payout: 0,
  });
  const [rouletteResult, setRouletteResult] = useState<{ number: number; color: string } | null>(null);
  const [slotReels, setSlotReels] = useState<string[][]>([]);
  const [slotPayout, setSlotPayout] = useState(0);
  const [crashMultiplier, setCrashMultiplier] = useState(1.0);
  const [crashStatus, setCrashStatus] = useState<'waiting' | 'running' | 'crashed'>('waiting');
  const [totalWon, setTotalWon] = useState(0);
  const [totalLost, setTotalLost] = useState(0);

  const startBlackjack = async () => {
    try {
      const res = await fetch('/api/features/casino/blackjack/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'current-user', bet, coinSymbol: coin }),
      });
      const data = await res.json();
      if (data.success) {
        setBlackjack({
          gameId: data.game.id,
          playerCards: data.game.playerHand.cards,
          dealerCards: [data.game.dealerHand.cards[0], { rank: '?', suit: 'hidden' }],
          playerValue: data.game.playerHand.value,
          dealerValue: data.game.dealerHand.cards[0].value,
          status: data.game.status,
          result: data.game.result,
          payout: data.game.payout,
        });
      }
    } catch (e) { console.error(e); }
  };

  const blackjackHit = async () => {
    if (!blackjack.gameId) return;
    try {
      const res = await fetch('/api/features/casino/blackjack/hit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId: blackjack.gameId }),
      });
      const data = await res.json();
      if (data.success) {
        setBlackjack(prev => ({
          ...prev,
          playerCards: data.game.playerHand.cards,
          playerValue: data.game.playerHand.value,
          status: data.game.status,
          result: data.game.result,
          payout: data.game.payout,
        }));
        if (data.game.result === 'lose') setTotalLost(prev => prev + bet);
      }
    } catch (e) { console.error(e); }
  };

  const blackjackStand = async () => {
    if (!blackjack.gameId) return;
    try {
      const res = await fetch('/api/features/casino/blackjack/stand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId: blackjack.gameId }),
      });
      const data = await res.json();
      if (data.success) {
        setBlackjack(prev => ({
          ...prev,
          dealerCards: data.game.dealerHand.cards,
          dealerValue: data.game.dealerHand.value,
          status: data.game.status,
          result: data.game.result,
          payout: data.game.payout,
        }));
        if (data.game.result === 'win' || data.game.result === 'blackjack') {
          setTotalWon(prev => prev + data.game.payout);
        } else if (data.game.result === 'lose') {
          setTotalLost(prev => prev + bet);
        }
      }
    } catch (e) { console.error(e); }
  };

  const spinRoulette = async () => {
    try {
      const res = await fetch('/api/features/casino/roulette/spin', { method: 'POST' });
      const data = await res.json();
      if (data.success) setRouletteResult(data.result);
    } catch (e) { console.error(e); }
  };

  const spinSlots = async () => {
    try {
      const res = await fetch('/api/features/casino/slots/spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'current-user', bet, coinSymbol: coin }),
      });
      const data = await res.json();
      if (data.success) {
        setSlotReels(data.result.reels);
        setSlotPayout(data.result.payout);
        if (data.result.payout > 0) setTotalWon(prev => prev + data.result.payout);
        else setTotalLost(prev => prev + bet);
      }
    } catch (e) { console.error(e); }
  };

  const startCrash = () => {
    setCrashStatus('running');
    setCrashMultiplier(1.0);
    const interval = setInterval(() => {
      setCrashMultiplier(prev => {
        const next = prev + 0.01 + Math.random() * 0.05;
        // Random crash
        if (Math.random() < 0.02) {
          clearInterval(interval);
          setCrashStatus('crashed');
          setTotalLost(prev2 => prev2 + bet);
          return prev;
        }
        return parseFloat(next.toFixed(2));
      });
    }, 100);
  };

  const cashOutCrash = () => {
    if (crashStatus === 'running') {
      setCrashStatus('waiting');
      const winnings = bet * crashMultiplier;
      setTotalWon(prev => prev + winnings);
    }
  };

  const renderCard = (card: { rank: string; suit: string }) => {
    const suitEmoji = card.suit === 'hearts' ? '♥️' : card.suit === 'diamonds' ? '♦️' : card.suit === 'clubs' ? '♣️' : card.suit === 'spades' ? '♠️' : '🂠';
    const color = ['hearts', 'diamonds'].includes(card.suit) ? 'text-red-500' : 'text-white';
    return (
      <div className={`w-14 h-20 bg-white rounded-lg flex flex-col items-center justify-center border-2 border-gray-300 ${color}`}>
        <span className="text-lg font-bold">{card.rank}</span>
        <span className="text-xl">{suitEmoji}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-gray-900 to-purple-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">🎰 Casino Hub</h1>
        <div className="flex items-center gap-4">
          <span className="text-green-400">Won: {totalWon.toFixed(2)}</span>
          <span className="text-red-400">Lost: {totalLost.toFixed(2)}</span>
          <span className="text-yellow-400">Balance: {balance[coin as keyof typeof balance]} {coin}</span>
        </div>
      </div>

      {/* Charity Banner */}
      <div className="bg-purple-900/50 border border-purple-600 rounded-lg p-3 mb-6 text-center">
        <p className="text-sm text-purple-300">❤️ 1% of all house edge goes to charity. Play responsibly, win generously.</p>
      </div>

      {/* Bet Controls */}
      <div className="flex items-center gap-4 mb-6 bg-gray-800/50 rounded-xl p-4">
        <div>
          <label className="text-xs text-gray-400">Bet Amount:</label>
          <div className="flex gap-2 mt-1">
            {[1, 5, 10, 25, 50, 100, 500].map(b => (
              <button key={b} onClick={() => setBet(b)} className={`px-3 py-1 rounded text-sm ${bet === b ? 'bg-yellow-600' : 'bg-gray-700 hover:bg-gray-600'}`}>{b}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400">Coin:</label>
          <div className="flex gap-2 mt-1">
            {['SKY4444', 'SHADOW', 'DOGE'].map(c => (
              <button key={c} onClick={() => setCoin(c)} className={`px-3 py-1 rounded text-sm ${coin === c ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Game Tabs */}
      <div className="flex gap-2 mb-6">
        {(['blackjack', 'roulette', 'slots', 'crash', 'coinflip'] as GameTab[]).map(game => (
          <button key={game} onClick={() => setActiveGame(game)} className={`px-4 py-2 rounded-lg font-bold capitalize ${activeGame === game ? 'bg-yellow-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
            {game === 'blackjack' ? '🃏' : game === 'roulette' ? '🎡' : game === 'slots' ? '🎰' : game === 'crash' ? '🚀' : '🪙'} {game}
          </button>
        ))}
      </div>

      {/* Game Area */}
      <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 min-h-[400px]">
        {activeGame === 'blackjack' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">🃏 Blackjack</h2>
            {blackjack.status === 'idle' ? (
              <button onClick={startBlackjack} className="px-8 py-4 bg-green-600 hover:bg-green-500 rounded-xl text-xl font-bold">Deal ({bet} {coin})</button>
            ) : (
              <div>
                <div className="mb-6">
                  <p className="text-gray-400 mb-2">Dealer ({blackjack.dealerValue})</p>
                  <div className="flex gap-2 justify-center">{blackjack.dealerCards.map((c, i) => <div key={i}>{renderCard(c)}</div>)}</div>
                </div>
                <div className="mb-6">
                  <p className="text-gray-400 mb-2">You ({blackjack.playerValue})</p>
                  <div className="flex gap-2 justify-center">{blackjack.playerCards.map((c, i) => <div key={i}>{renderCard(c)}</div>)}</div>
                </div>
                {blackjack.status === 'playing' && (
                  <div className="flex gap-4 justify-center">
                    <button onClick={blackjackHit} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold">Hit</button>
                    <button onClick={blackjackStand} className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-bold">Stand</button>
                  </div>
                )}
                {blackjack.result && (
                  <div className={`mt-4 text-2xl font-bold ${blackjack.result === 'win' || blackjack.result === 'blackjack' ? 'text-green-400' : blackjack.result === 'lose' ? 'text-red-400' : 'text-yellow-400'}`}>
                    {blackjack.result === 'blackjack' ? '🎉 BLACKJACK!' : blackjack.result === 'win' ? '✅ YOU WIN!' : blackjack.result === 'push' ? '🤝 PUSH' : '❌ BUST'}
                    {blackjack.payout > 0 && <p className="text-lg">+{blackjack.payout} {coin}</p>}
                    <button onClick={() => setBlackjack(prev => ({ ...prev, status: 'idle', gameId: null, result: null, playerCards: [], dealerCards: [] }))} className="mt-4 px-6 py-2 bg-gray-600 rounded-lg text-sm">New Hand</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeGame === 'roulette' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">🎡 Roulette</h2>
            <button onClick={spinRoulette} className="px-8 py-4 bg-green-600 hover:bg-green-500 rounded-xl text-xl font-bold mb-6">Spin ({bet} {coin})</button>
            {rouletteResult && (
              <div className={`text-6xl font-bold mt-4 ${rouletteResult.color === 'red' ? 'text-red-500' : rouletteResult.color === 'black' ? 'text-white' : 'text-green-500'}`}>
                {rouletteResult.number}
                <p className="text-lg capitalize mt-2">{rouletteResult.color}</p>
              </div>
            )}
          </div>
        )}

        {activeGame === 'slots' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">🎰 Mega Slots</h2>
            <button onClick={spinSlots} className="px-8 py-4 bg-yellow-600 hover:bg-yellow-500 rounded-xl text-xl font-bold mb-6">Spin ({bet} {coin})</button>
            {slotReels.length > 0 && (
              <div>
                <div className="flex justify-center gap-4 mb-4">
                  {slotReels.map((reel, i) => (
                    <div key={i} className="bg-gray-900 rounded-lg p-4 text-4xl space-y-2">
                      {reel.map((symbol, j) => <div key={j} className={j === 1 ? 'bg-yellow-900/30 rounded p-1' : ''}>{symbol}</div>)}
                    </div>
                  ))}
                </div>
                {slotPayout > 0 ? (
                  <p className="text-2xl text-green-400 font-bold">🎉 WIN: +{slotPayout} {coin}!</p>
                ) : (
                  <p className="text-lg text-gray-400">No win. Try again!</p>
                )}
              </div>
            )}
          </div>
        )}

        {activeGame === 'crash' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">🚀 Crash</h2>
            {crashStatus === 'waiting' && (
              <button onClick={startCrash} className="px-8 py-4 bg-green-600 hover:bg-green-500 rounded-xl text-xl font-bold">Start ({bet} {coin})</button>
            )}
            {crashStatus === 'running' && (
              <div>
                <div className="text-7xl font-bold text-green-400 animate-pulse mb-6">{crashMultiplier}x</div>
                <button onClick={cashOutCrash} className="px-8 py-4 bg-yellow-600 hover:bg-yellow-500 rounded-xl text-xl font-bold animate-bounce">CASH OUT ({(bet * crashMultiplier).toFixed(2)} {coin})</button>
              </div>
            )}
            {crashStatus === 'crashed' && (
              <div>
                <div className="text-7xl font-bold text-red-500 mb-4">💥 CRASHED</div>
                <p className="text-xl text-red-400">at {crashMultiplier}x</p>
                <button onClick={() => setCrashStatus('waiting')} className="mt-4 px-6 py-2 bg-gray-600 rounded-lg">Play Again</button>
              </div>
            )}
          </div>
        )}

        {activeGame === 'coinflip' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">🪙 Coin Flip</h2>
            <div className="flex gap-4 justify-center">
              <button onClick={() => { Math.random() > 0.49 ? setTotalWon(prev => prev + bet) : setTotalLost(prev => prev + bet); }} className="px-8 py-4 bg-yellow-600 hover:bg-yellow-500 rounded-xl text-xl font-bold">Heads ({bet} {coin})</button>
              <button onClick={() => { Math.random() > 0.49 ? setTotalWon(prev => prev + bet) : setTotalLost(prev => prev + bet); }} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-xl font-bold">Tails ({bet} {coin})</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
