import React, { useState } from 'react';
import { ShoppingBag, DollarSign, Star, Truck, Shield, Zap, Heart, CheckCircle, Package } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const PRODUCTS = [
  { id: 1, name: 'SKY444 Hardware Wallet', price: '0.05 ETH', usd: '$142', category: 'Hardware', rating: 4.9, reviews: 847, stock: 24, img: '🔐', badge: 'BESTSELLER' },
  { id: 2, name: 'Sovereign Hoodie (Black)', price: '0.01 ETH', usd: '$28', category: 'Apparel', rating: 4.8, reviews: 312, stock: 89, img: '👕', badge: 'NEW' },
  { id: 3, name: 'SKY444 Sticker Pack (50)', price: '0.002 ETH', usd: '$5.60', category: 'Merch', rating: 4.7, reviews: 1204, stock: 500, img: '🎨', badge: 'HOT' },
  { id: 4, name: 'Crypto Cold Storage Kit', price: '0.03 ETH', usd: '$85', category: 'Hardware', rating: 5.0, reviews: 203, stock: 12, img: '🗄️', badge: 'LIMITED' },
  { id: 5, name: 'Engineer Mode T-Shirt', price: '0.008 ETH', usd: '$22', category: 'Apparel', rating: 4.9, reviews: 427, stock: 67, img: '👔', badge: 'POPULAR' },
  { id: 6, name: 'SKY444 Mug', price: '0.004 ETH', usd: '$11', category: 'Merch', rating: 4.6, reviews: 892, stock: 200, img: '☕', badge: '' },
];

export default function SovereignMerchStore() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [filter, setFilter] = useState('All');

  const addToCart = (id: number) => setCart(prev => [...prev, id]);
  const toggleWishlist = (id: number) => setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const filtered = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><ShoppingBag className="h-6 w-6 text-pink-500" /> MERCH_STORE</h1>
          <p className="text-slate-500 text-xs mt-1">Official SKY444 merchandise · Pay with crypto · Wave 20</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingBag className="h-6 w-6 text-slate-400" />
            {cart.length > 0 && <div className="absolute -top-1 -right-1 h-4 w-4 bg-pink-600 rounded-full flex items-center justify-center text-[9px] font-black">{cart.length}</div>}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {['All', 'Hardware', 'Apparel', 'Merch'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs font-bold border transition-all ${filter === f ? 'border-pink-600 text-pink-400 bg-pink-950/30' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}>{f}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {filtered.map(product => (
          <div key={product.id} className="bg-slate-900 border border-slate-800 hover:border-pink-700 p-3 transition-all">
            <div className="relative">
              <div className="aspect-square bg-slate-800 flex items-center justify-center text-4xl mb-3 border border-slate-700">{product.img}</div>
              <button onClick={() => toggleWishlist(product.id)} className="absolute top-1 right-1 p-1">
                <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-pink-500 text-pink-500' : 'text-slate-600'}`} />
              </button>
              {product.badge && <div className={`absolute top-1 left-1 text-[8px] font-black px-1.5 py-0.5 ${product.badge === 'BESTSELLER' ? 'bg-amber-600' : product.badge === 'LIMITED' ? 'bg-red-600' : product.badge === 'NEW' ? 'bg-blue-600' : 'bg-pink-600'} text-white`}>{product.badge}</div>}
            </div>
            <div className="text-xs font-bold mb-1 leading-tight">{product.name}</div>
            <div className="flex items-center gap-1 text-[9px] text-yellow-400 mb-1"><Star className="h-2.5 w-2.5 fill-yellow-400" />{product.rating} ({product.reviews})</div>
            <div className="text-xs font-black text-pink-400 mb-1">{product.price}</div>
            <div className="text-[9px] text-slate-500 mb-2">{product.usd} · {product.stock} left</div>
            <button onClick={() => addToCart(product.id)} className="w-full bg-pink-600 hover:bg-pink-700 text-white text-[10px] font-bold py-1.5 transition-all">ADD TO CART</button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-slate-900 border border-pink-700 p-4 shadow-2xl">
          <div className="text-xs font-bold mb-2">{cart.length} item{cart.length > 1 ? 's' : ''} in cart</div>
          <button className="w-full bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold py-2 transition-all">CHECKOUT WITH CRYPTO</button>
        </div>
      )}
    </div>
  );
}
