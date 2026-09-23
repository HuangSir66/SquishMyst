import React, { useState } from 'react';
import { X, Gift, Sparkles, RefreshCw, ShoppingBag, Trophy, Star } from 'lucide-react';
import { MYSTERY_POOL, DUMPLING_PRODUCTS } from '../data/dumplings';
import { DumplingGraphic } from './DumplingGraphic';
import { playSteamerOpenSound, playCelebrationChime, playPopSound, playSquishSound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { DumplingProduct } from '../types';

interface MysteryBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: DumplingProduct) => void;
}

export const MysteryBoxModal: React.FC<MysteryBoxModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [stage, setStage] = useState<'closed' | 'shaking' | 'revealed'>('closed');
  const [revealedItem, setRevealedItem] = useState(MYSTERY_POOL[0]);

  if (!isOpen) return null;

  const handleShake = () => {
    setStage('shaking');
    playSteamerOpenSound();
    setTimeout(() => {
      setStage('closed');
    }, 600);
  };

  const handleOpen = () => {
    playSteamerOpenSound();
    // Pick weighted random item from pool
    const rand = Math.random() * 100;
    let chosen = MYSTERY_POOL[3]; // default common
    if (rand < 4) {
      chosen = MYSTERY_POOL[0]; // 4% secret legendary
    } else if (rand < 16) {
      chosen = MYSTERY_POOL[1]; // 12% super rare
    } else if (rand < 44) {
      chosen = MYSTERY_POOL[2]; // 28% rare
    } else {
      chosen = MYSTERY_POOL[3]; // 56% common
    }

    setRevealedItem(chosen);
    setStage('revealed');

    setTimeout(() => {
      playCelebrationChime();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });
    }, 200);
  };

  const handleReset = () => {
    playPopSound();
    setStage('closed');
  };

  const mysteryProduct = DUMPLING_PRODUCTS.find((p) => p.id === 'mystery-blind-box') || DUMPLING_PRODUCTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border-4 border-[#C89B65] shadow-2xl overflow-hidden p-6 sm:p-8 text-center">
        
        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#736B60] hover:text-black bg-white rounded-full border border-[#E0D2BE] shadow-xs cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-[#F3E8FF] text-[#9333EA] px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#E9D5FF]">
            <Gift className="w-3.5 h-3.5" />
            <span>Dim Sum Blind Box Simulator (Series 3)</span>
          </div>
          <h3 className="font-display font-extrabold text-2xl text-[#2D2A26]">
            {stage === 'revealed' ? '🎉 You Unboxed a Dumpling!' : 'Crack Open The Sealed Steamer'}
          </h3>
          <p className="text-xs text-[#736B60] mt-1">
            {stage === 'revealed'
              ? 'Check out your collectible dumpling rarity card below!'
              : 'Shake the box to test its weight, then pop the bamboo lid to reveal your secret bun!'}
          </p>
        </div>

        {/* Interactive Box Area */}
        <div className="relative my-6 py-8 px-4 bg-white rounded-3xl border-2 border-[#E8DAC6] shadow-inner flex flex-col items-center justify-center min-h-[260px]">
          
          {stage === 'revealed' ? (
            // Revealed Dumpling & Collector Card
            <div className="space-y-4 animate-jiggle flex flex-col items-center">
              
              {/* Rarity Tag */}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white shadow-sm"
                style={{ backgroundColor: revealedItem.rarityColor }}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>{revealedItem.rarity} ({revealedItem.chance} Pull Rate)</span>
              </div>

              {/* Graphic */}
              <div className="relative">
                <DumplingGraphic
                  type={revealedItem.svgType}
                  className="w-36 h-36"
                  showSteamer={true}
                  expression="wink"
                />
              </div>

              <div>
                <h4 className="font-display font-extrabold text-xl text-[#2D2A26]">
                  {revealedItem.name}
                </h4>
                <p className="text-xs font-semibold text-[#8C5E12] mt-0.5">
                  Aroma: {revealedItem.flavor}
                </p>
                <p className="text-xs text-[#736B60] max-w-xs mx-auto mt-2 leading-relaxed">
                  {revealedItem.description}
                </p>
              </div>

            </div>
          ) : (
            // Closed Mystery Bamboo Box
            <div className={`space-y-4 flex flex-col items-center ${stage === 'shaking' ? 'animate-bounce' : 'animate-float'}`}>
              
              {/* Mystery Steamer Box Graphic */}
              <div className="relative w-36 h-36 flex items-center justify-center bg-[#FFE8B8] rounded-full border-4 border-[#C89B65] shadow-lg">
                <span className="font-display font-black text-5xl text-[#9C6AD6] opacity-80 animate-pulse">
                  ?
                </span>
                <div className="absolute -bottom-2 w-44 h-8 bg-[#C89B65] rounded-full border-2 border-[#8C5E32] opacity-90 shadow-md" />
              </div>

              <div className="text-xs text-[#8C8276] font-medium">
                Sealed with Official Red Dim Sum Wax Seal 🥟
              </div>

            </div>
          )}

        </div>

        {/* Action Controls */}
        <div className="space-y-3">
          {stage === 'revealed' ? (
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleReset}
                className="flex-1 py-3 px-4 bg-[#FAF7F2] hover:bg-[#F0E8DC] text-[#2D2A26] rounded-2xl border border-[#D8C9B5] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Open Another Box</span>
              </button>

              <button
                onClick={() => {
                  playCelebrationChime();
                  onAddToCart(mysteryProduct);
                  onClose();
                }}
                className="flex-1 py-3 px-4 bg-[#E25C40] hover:bg-[#CF492D] text-white rounded-2xl font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy Blind Box ($15.99)</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleShake}
                className="flex-1 py-3.5 px-4 bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#7A5012] border-2 border-[#E5D2B8] rounded-2xl font-extrabold text-xs transition-all cursor-pointer"
              >
                👋 Shake Steamer Box
              </button>

              <button
                onClick={handleOpen}
                className="flex-1 py-3.5 px-4 bg-[#9333EA] hover:bg-[#7E22CE] text-white rounded-2xl font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 hover:scale-102 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#FFE27A]" />
                <span>Crack Open Lid!</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
