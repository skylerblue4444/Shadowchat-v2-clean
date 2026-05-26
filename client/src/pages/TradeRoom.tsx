/**
 * Trade Room - Live Trading Chat with Crypto Tips
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 */

import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  type: 'chat' | 'signal' | 'tip' | 'alert' | 'hope_ai';
  coinMention?: string;
  timestamp: string;
}

interface Room {
  id: string;
  activeUsers: number;
}

export default function TradeRoom() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeRoom, setActiveRoom] = useState('general');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [tipAmount, setTipAmount] = useState(10);
  const [showTipModal, setShowTipModal] = useState(false);
  const [tipTarget, setTipTarget] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchRooms();
    joinRoom(activeRoom);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchRooms = async () => {
    try {
      const res = await fetch('/api/features/trade-room/rooms');
      const data = await res.json();
      setRooms(data.rooms || []);
    } catch (e) { console.error(e); }
  };

  const joinRoom = async (roomId: string) => {
    try {
      const res = await fetch('/api/features/trade-room/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, userId: 'current-user' }),
      });
      const data = await res.json();
      setMessages(data.messages || []);
      setActiveRoom(roomId);
    } catch (e) { console.error(e); }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      const coinMention = input.match(/\$(SKY4444|SHADOW|BTC|DOGE|TRUMP|XMR|USDT)/i)?.[1];
      const type = input.startsWith('!signal') ? 'signal' : input.startsWith('!alert') ? 'alert' : 'chat';

      const res = await fetch('/api/features/trade-room/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: activeRoom,
          userId: 'current-user',
          username: 'You',
          content: input,
          type,
          coinMention,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, data.message]);
        setInput('');
      }
    } catch (e) { console.error(e); }
  };

  const sendTip = async () => {
    try {
      await fetch('/api/features/social/tip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromUserId: 'current-user',
          toUserId: tipTarget,
          coinSymbol: 'SKY4444',
          amount: tipAmount,
          platform: 'internal',
          message: `Tip from trade room`,
        }),
      });
      setShowTipModal(false);
      setMessages(prev => [...prev, {
        id: `tip_${Date.now()}`,
        userId: 'current-user',
        username: 'You',
        content: `💰 Tipped ${tipTarget} ${tipAmount} SKY4444`,
        type: 'tip',
        timestamp: new Date().toISOString(),
      }]);
    } catch (e) { console.error(e); }
  };

  const getMessageStyle = (type: string) => {
    switch (type) {
      case 'signal': return 'bg-green-900/30 border-l-4 border-green-500';
      case 'tip': return 'bg-yellow-900/30 border-l-4 border-yellow-500';
      case 'alert': return 'bg-red-900/30 border-l-4 border-red-500';
      case 'hope_ai': return 'bg-purple-900/30 border-l-4 border-purple-500';
      default: return 'bg-gray-800/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white flex">
      {/* Sidebar - Rooms */}
      <div className="w-64 bg-gray-900/80 border-r border-gray-700 p-4">
        <h2 className="text-lg font-bold mb-4">📡 Trade Rooms</h2>
        <div className="space-y-2">
          {rooms.map(room => (
            <button
              key={room.id}
              onClick={() => joinRoom(room.id)}
              className={`w-full text-left px-3 py-2 rounded-lg flex justify-between items-center ${activeRoom === room.id ? 'bg-indigo-600' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              <span className="capitalize text-sm">{room.id.replace('-', ' ')}</span>
              <span className="text-xs text-gray-400">{room.activeUsers} 👤</span>
            </button>
          ))}
        </div>

        <div className="mt-6 p-3 bg-gray-800/50 rounded-lg">
          <h3 className="text-xs font-bold text-gray-400 mb-2">Quick Commands:</h3>
          <div className="space-y-1 text-xs text-gray-500">
            <p>!signal [message] - Share signal</p>
            <p>!alert [message] - Post alert</p>
            <p>$COIN - Mention a coin</p>
            <p>@user tip - Tip a trader</p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Room Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold capitalize">{activeRoom.replace('-', ' ')}</h1>
            <p className="text-xs text-gray-400">{rooms.find(r => r.id === activeRoom)?.activeUsers || 0} traders online</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-green-700 hover:bg-green-600 rounded text-sm">📈 Signals</button>
            <button className="px-3 py-1 bg-yellow-700 hover:bg-yellow-600 rounded text-sm">💰 Tip</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(msg => (
            <div key={msg.id} className={`p-3 rounded-lg ${getMessageStyle(msg.type)}`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-blue-400">{msg.username}</span>
                  {msg.type === 'signal' && <span className="text-xs bg-green-600 px-1 rounded">SIGNAL</span>}
                  {msg.type === 'tip' && <span className="text-xs bg-yellow-600 px-1 rounded">TIP</span>}
                  {msg.type === 'alert' && <span className="text-xs bg-red-600 px-1 rounded">ALERT</span>}
                  {msg.coinMention && <span className="text-xs bg-blue-600 px-1 rounded">${msg.coinMention}</span>}
                </div>
                <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="text-sm mt-1 text-gray-200">{msg.content}</p>
              <button
                onClick={() => { setTipTarget(msg.userId); setShowTipModal(true); }}
                className="text-xs text-yellow-500 hover:text-yellow-400 mt-1"
              >
                💰 Tip
              </button>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message... (use $COIN to mention, !signal for signals)"
              className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
            <button onClick={sendMessage} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-bold">Send</button>
          </div>
        </div>
      </div>

      {/* Tip Modal */}
      {showTipModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-80">
            <h3 className="text-lg font-bold mb-4">💰 Send Crypto Tip</h3>
            <p className="text-sm text-gray-400 mb-3">To: {tipTarget}</p>
            <div className="flex gap-2 mb-4">
              {[5, 10, 25, 50, 100].map(amt => (
                <button key={amt} onClick={() => setTipAmount(amt)} className={`px-3 py-1 rounded ${tipAmount === amt ? 'bg-yellow-600' : 'bg-gray-700'}`}>{amt}</button>
              ))}
            </div>
            <p className="text-sm text-gray-400 mb-4">{tipAmount} SKY4444</p>
            <div className="flex gap-2">
              <button onClick={sendTip} className="flex-1 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-bold">Send Tip</button>
              <button onClick={() => setShowTipModal(false)} className="flex-1 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
