/**
 * Hope AI Voice Command Center - Full Voice-Driven Interface
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Voice-to-command with Miss Ann avatar, outfit changes, unhinged mode,
 * day trade signals, and trade room integration
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface VoiceState {
  isListening: boolean;
  transcript: string;
  lastCommand: string;
  lastResponse: string;
  isUnhinged: boolean;
  currentOutfit: string;
  currentVoice: string;
  dayTradeMode: boolean;
}

interface Signal {
  coin: string;
  action: string;
  confidence: number;
  reason: string;
  entryPrice: number;
  targetPrice: number;
}

export default function HopeAIVoiceCenter() {
  const [state, setState] = useState<VoiceState>({
    isListening: false,
    transcript: '',
    lastCommand: '',
    lastResponse: 'Say something to get started! Try "Hey Hope, open my wallet"',
    isUnhinged: false,
    currentOutfit: 'professional',
    currentVoice: 'professional',
    dayTradeMode: false,
  });

  const [signals, setSignals] = useState<Signal[]>([]);
  const [commandHistory, setCommandHistory] = useState<Array<{ command: string; response: string; time: string }>>([]);
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setState(prev => ({ ...prev, transcript }));

        // Check if final result
        const lastResult = event.results[event.results.length - 1];
        if (lastResult.isFinal) {
          handleVoiceCommand(transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setState(prev => ({ ...prev, isListening: false }));
      };
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (state.isListening) {
      recognitionRef.current?.stop();
      setState(prev => ({ ...prev, isListening: false }));
    } else {
      recognitionRef.current?.start();
      setState(prev => ({ ...prev, isListening: true, transcript: '' }));
    }
  }, [state.isListening]);

  const handleVoiceCommand = async (transcript: string) => {
    try {
      const response = await fetch('/api/features/hope-ai/voice-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript,
          userId: 'current-user',
          isUnhinged: state.isUnhinged,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setState(prev => ({
          ...prev,
          lastCommand: transcript,
          lastResponse: data.response.text,
        }));

        // Add to history
        setCommandHistory(prev => [{
          command: transcript,
          response: data.response.text,
          time: new Date().toLocaleTimeString(),
        }, ...prev].slice(0, 20));

        // Speak response
        if (data.response.shouldSpeak) {
          speakResponse(data.response.text);
        }

        // Navigate if needed
        if (data.response.navigateTo || data.action.route) {
          window.location.href = data.response.navigateTo || data.action.route;
        }

        // Handle state changes
        if (data.action.stateChanges) {
          if (data.action.stateChanges.unhingedMode !== undefined) {
            setState(prev => ({ ...prev, isUnhinged: data.action.stateChanges.unhingedMode }));
          }
          if (data.action.stateChanges.dayTradeMode !== undefined) {
            setState(prev => ({ ...prev, dayTradeMode: data.action.stateChanges.dayTradeMode }));
          }
          if (data.action.stateChanges.outfit) {
            setState(prev => ({ ...prev, currentOutfit: data.action.stateChanges.outfit }));
          }
        }
      }
    } catch (error) {
      console.error('Voice command error:', error);
    }
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = state.isUnhinged ? 1.3 : 1.0;
      utterance.pitch = state.isUnhinged ? 1.2 : 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const fetchSignals = async () => {
    try {
      const response = await fetch('/api/features/trading/signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coins: ['SKY4444', 'BTC', 'DOGE', 'TRUMP', 'SHADOW', 'XMR'] }),
      });
      const data = await response.json();
      setSignals(data.signals || []);
    } catch (error) {
      console.error('Signal fetch error:', error);
    }
  };

  useEffect(() => {
    if (state.dayTradeMode) {
      fetchSignals();
      const interval = setInterval(fetchSignals, 30000);
      return () => clearInterval(interval);
    }
  }, [state.dayTradeMode]);

  return (
    <div className={`min-h-screen ${state.isUnhinged ? 'bg-gradient-to-br from-red-900 via-purple-900 to-black' : 'bg-gradient-to-br from-gray-900 via-blue-900 to-black'} text-white p-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          {state.isUnhinged ? '🔥 HOPE AI - UNHINGED MODE 🔥' : '✨ Hope AI Command Center'}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setState(prev => ({ ...prev, isUnhinged: !prev.isUnhinged }))}
            className={`px-4 py-2 rounded-lg font-bold ${state.isUnhinged ? 'bg-red-600 animate-pulse' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            {state.isUnhinged ? '🔥 UNHINGED' : '😇 Normal'}
          </button>
          <button
            onClick={() => setState(prev => ({ ...prev, dayTradeMode: !prev.dayTradeMode }))}
            className={`px-4 py-2 rounded-lg font-bold ${state.dayTradeMode ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            {state.dayTradeMode ? '📈 DAY TRADE ON' : '📊 Day Trade'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Section */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <div className="text-center">
            <div className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-br ${state.isUnhinged ? 'from-red-500 to-purple-600 animate-pulse' : 'from-blue-500 to-purple-600'} flex items-center justify-center text-6xl mb-4`}>
              {state.currentOutfit === 'hacker' ? '👩‍💻' :
               state.currentOutfit === 'queen' ? '👸' :
               state.currentOutfit === 'ninja' ? '🥷' :
               state.currentOutfit === 'pirate' ? '🏴‍☠️' :
               state.currentOutfit === 'unhinged' ? '🤪' : '👩‍💼'}
            </div>
            <h2 className="text-xl font-bold">Miss Ann</h2>
            <p className="text-gray-400 text-sm">Outfit: {state.currentOutfit}</p>
            <p className="text-gray-400 text-sm">Voice: {state.currentVoice}</p>
          </div>

          {/* Outfit Selector */}
          <div className="mt-4">
            <h3 className="text-sm font-bold text-gray-400 mb-2">Quick Outfits:</h3>
            <div className="grid grid-cols-5 gap-2">
              {['professional', 'hacker', 'queen', 'ninja', 'unhinged'].map(outfit => (
                <button
                  key={outfit}
                  onClick={() => setState(prev => ({ ...prev, currentOutfit: outfit }))}
                  className={`p-2 rounded text-xs ${state.currentOutfit === outfit ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                  {outfit.slice(0, 4)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Voice Command Section */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <div className="text-center mb-6">
            <button
              onClick={toggleListening}
              className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all ${
                state.isListening
                  ? 'bg-red-600 animate-pulse scale-110 shadow-lg shadow-red-500/50'
                  : 'bg-blue-600 hover:bg-blue-500 hover:scale-105'
              }`}
            >
              {state.isListening ? '🎙️' : '🎤'}
            </button>
            <p className="mt-3 text-sm text-gray-400">
              {state.isListening ? 'Listening... speak now' : 'Tap to start voice command'}
            </p>
          </div>

          {/* Current Transcript */}
          {state.transcript && (
            <div className="bg-gray-900/50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-300 italic">"{state.transcript}"</p>
            </div>
          )}

          {/* Last Response */}
          <div className={`rounded-lg p-4 ${state.isUnhinged ? 'bg-red-900/30 border border-red-700' : 'bg-blue-900/30 border border-blue-700'}`}>
            <p className="text-sm font-bold text-gray-400 mb-1">Hope says:</p>
            <p className="text-white">{state.lastResponse}</p>
          </div>

          {/* Quick Commands */}
          <div className="mt-4">
            <h3 className="text-sm font-bold text-gray-400 mb-2">Quick Commands:</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Open wallet', 'Check prices', 'Start mining', 'Open casino',
                'Day trade mode', 'Trade room', 'Tip 100 SKY', 'Show feed',
              ].map(cmd => (
                <button
                  key={cmd}
                  onClick={() => handleVoiceCommand(cmd)}
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-xs text-left"
                >
                  🗣️ {cmd}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Command History / Signals */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          {state.dayTradeMode ? (
            <>
              <h3 className="text-lg font-bold mb-4 text-green-400">📈 Live Trading Signals</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {signals.map((signal, i) => (
                  <div key={i} className={`p-3 rounded-lg border ${
                    signal.action.includes('BUY') || signal.action === 'LONG'
                      ? 'bg-green-900/30 border-green-700'
                      : signal.action.includes('SELL') || signal.action === 'SHORT'
                      ? 'bg-red-900/30 border-red-700'
                      : 'bg-yellow-900/30 border-yellow-700'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{signal.coin}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        signal.action.includes('BUY') || signal.action === 'LONG' ? 'bg-green-600' : 'bg-red-600'
                      }`}>{signal.action}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{signal.reason}</p>
                    <div className="flex justify-between text-xs mt-2">
                      <span>Entry: ${signal.entryPrice?.toFixed(4)}</span>
                      <span>Target: ${signal.targetPrice?.toFixed(4)}</span>
                      <span className="text-yellow-400">{signal.confidence}%</span>
                    </div>
                  </div>
                ))}
                {signals.length === 0 && (
                  <p className="text-gray-500 text-center">Loading signals...</p>
                )}
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold mb-4">📜 Command History</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {commandHistory.map((item, i) => (
                  <div key={i} className="p-3 bg-gray-900/50 rounded-lg">
                    <div className="flex justify-between">
                      <p className="text-xs text-blue-400">You: {item.command}</p>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                    <p className="text-xs text-green-400 mt-1">Hope: {item.response}</p>
                  </div>
                ))}
                {commandHistory.length === 0 && (
                  <p className="text-gray-500 text-center text-sm">No commands yet. Start talking!</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Bar - Available Commands */}
      <div className="mt-6 bg-gray-800/30 rounded-xl p-4 border border-gray-700">
        <h3 className="text-sm font-bold text-gray-400 mb-2">Available Voice Commands:</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'Navigate: "Go to [page]"',
            'Trade: "Buy/Sell [coin]"',
            'Tip: "Tip @user [amount] [coin]"',
            'Reddit: "Tip reddit u/name"',
            'Mine: "Start mining [coin]"',
            'Stake: "Stake [amount] [coin]"',
            'Swap: "Swap [coin] to [coin]"',
            'Casino: "Play blackjack"',
            'Call: "Call @user"',
            'Outfit: "Change outfit to [name]"',
            'Mode: "Unhinged mode"',
            'Help: "What can you do?"',
          ].map(cmd => (
            <span key={cmd} className="text-xs bg-gray-700/50 px-2 py-1 rounded text-gray-300">{cmd}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
