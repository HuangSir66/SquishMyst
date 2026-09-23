import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Flame, RefreshCw, ShoppingBag, Award, Zap, Heart } from 'lucide-react';
import { playSquishSound, playPopSound, playCelebrationChime, isSoundEnabled, toggleSound } from '../utils/sound';
import { DumplingGraphic } from './DumplingGraphic';
import { DUMPLING_PRODUCTS } from '../data/dumplings';
import { DumplingProduct } from '../types';
import confetti from 'canvas-confetti';

interface SquishLabProps {
  onAddToCart: (product: DumplingProduct) => void;
}

export const SquishLab: React.FC<SquishLabProps> = ({ onAddToCart }) => {
  const [selectedId, setSelectedId] = useState(DUMPLING_PRODUCTS[0]?.id || 'mystery-dumpling-squishy');
  const [compression, setCompression] = useState(0); // 0 to 100%
  const [isCompressing, setIsCompressing] = useState(false);
  const [stressRelievedScore, setStressRelievedScore] = useState(250);
  const [squishStreak, setSquishStreak] = useState(0);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [expression, setExpression] = useState<'happy' | 'squished' | 'wink' | 'sleepy' | 'shocked'>('happy');

  const activeProduct = DUMPLING_PRODUCTS.find((p) => p.id === selectedId) || DUMPLING_PRODUCTS[0];

  const holdTimerRef = useRef<number | null>(null);

  const handleStartPress = (e: React.MouseEvent | React.TouchEvent) => {
    setIsCompressing(true);
    setExpression('squished');
    playSquishSound(0.8 + compression * 0.01);

    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    holdTimerRef.current = window.setInterval(() => {
      setCompression((prev) => {
        const next = Math.min(prev + 12, 100);
        if (next % 24 === 0) {
          playSquishSound(1.0 + next * 0.005);
        }
        return next;
      });
    }, 45);
  };

  const handleEndPress = () => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setIsCompressing(false);
    playPopSound();

    // Reward stress relief points
    const pointsGained = Math.round((compression / 100) * 45) + 5;
    setStressRelievedScore((prev) => prev + pointsGained);
    setSquishStreak((prev) => {
      const next = prev + 1;
      if (next % 10 === 0) {
        playCelebrationChime();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
      return next;
    });

    // Animate slow rise return back to 0
    const duration = activeProduct.slowRiseSeconds * 1000;
    const stepInterval = 30;
    const stepDecrement = (compression / (duration / stepInterval));

    const riseInterval = window.setInterval(() => {
      setCompression((prev) => {
        const next = prev - stepDecrement;
        if (next <= 0) {
          clearInterval(riseInterval);
          setExpression('happy');
          return 0;
        }
        return next;
      });
    }, stepInterval);
  };

  const scaleX = 1 + (compression / 100) * 0.5;
  const scaleY = 1 - (compression / 100) * 0.55;

  return (
    <section id="squish-lab" className="py-16 sm:py-20 bg-[#F5EFE6] border-y border-[#E2D6C3] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE7B8]/40 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFD5CC]/30 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FAF7F2] text-[#8C410F] px-4 py-1.5 rounded-full border border-[#D8C7B0] text-xs font-extrabold uppercase tracking-wider mb-3 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-[#E25C40] fill-current" />
            <span>Interactive ASMR Squeeze Lab</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2D2A26] tracking-tight">
            Experience the Slow-Rise Sensation
          </h2>
          <p className="text-base text-[#6E6457] mt-2">
            Select different dim sum recipes and test our sensory memory TPR formula in real-time. 
            Press & hold to compress, let go to watch the therapeutic slow rise!
          </p>
        </div>

        {/* Main Squish Lab Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Recipe & Flavor Carousel Selector */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-display font-bold text-lg text-[#2D2A26] flex items-center justify-between">
              <span>Choose Dumpling Specimen</span>
              <span className="text-xs text-[#8C8276] font-normal">6 Handcrafted Recipes</span>
            </h3>

            <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
              {DUMPLING_PRODUCTS.slice(0, 6).map((p) => {
                const isSelected = p.id === selectedId;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      playPopSound();
                      setSelectedId(p.id);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#E25C40] shadow-md scale-101 ring-2 ring-[#FFD5CC]'
                        : 'bg-white/70 hover:bg-white border-[#E5D8C5] hover:border-[#D5C4AC]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] flex items-center justify-center shrink-0 border border-[#EAE2D5] overflow-hidden">
                      <DumplingGraphic type={p.svgArtType} className="w-10 h-10" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#2D2A26] truncate">{p.name}</span>
                        <span className="text-xs font-black text-[#E25C40]">${p.price}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#7A7165]">
                        <span>Rise: <strong>{p.slowRiseSeconds}s</strong></span>
                        <span>•</span>
                        <span>Squish: <strong>{p.squishScore}/10</strong></span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: Live Interactive Squishing Arena */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E0D2BE] shadow-xl relative text-center">
              
              {/* Top status bar in card */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F0E6D8] text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#2D2A26]">
                  <Flame className="w-4 h-4 text-[#E25C40] fill-current" />
                  <span>Squish Streak: <strong>{squishStreak}</strong></span>
                </div>
                <div className="flex items-center gap-1 text-[#8C5E12] bg-[#FFF8E7] px-2.5 py-1 rounded-full border border-[#F5E0A3] font-bold">
                  <Award className="w-3.5 h-3.5 text-[#EAB308]" />
                  <span>{stressRelievedScore} Stress Points Melted</span>
                </div>
              </div>

              {/* Expression selector pills */}
              <div className="flex items-center justify-center gap-2 my-3">
                <span className="text-[11px] text-[#8C8276] font-medium">Expression:</span>
                {(['happy', 'wink', 'sleepy', 'shocked'] as const).map((expr) => (
                  <button
                    key={expr}
                    onClick={() => {
                      playPopSound();
                      setExpression(expr);
                    }}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize transition-colors ${
                      expression === expr
                        ? 'bg-[#2D2A26] text-white'
                        : 'bg-[#FAF7F2] text-[#736B60] hover:text-[#2D2A26]'
                    }`}
                  >
                    {expr}
                  </button>
                ))}
              </div>

              {/* THE SQUISHABLE INTERACTIVE STAGE */}
              <div
                id="squish-lab-interactive-stage"
                onMouseDown={handleStartPress}
                onMouseUp={handleEndPress}
                onMouseLeave={handleEndPress}
                onTouchStart={handleStartPress}
                onTouchEnd={handleEndPress}
                className="relative my-4 w-64 h-60 mx-auto flex items-end justify-center cursor-grab active:cursor-grabbing select-none group"
                title="Press and hold down to squeeze!"
              >
                {/* Steamer lid background steam */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none opacity-60">
                  <div className="w-4 h-4 rounded-full bg-[#EAE2D5] animate-steam-1" />
                  <div className="w-6 h-6 rounded-full bg-[#EAE2D5] animate-steam-2" />
                </div>

                {/* Squeezed graphic */}
                <DumplingGraphic
                  type={activeProduct.svgArtType}
                  className="w-52 h-48"
                  squishScaleX={scaleX}
                  squishScaleY={scaleY}
                  isSquishing={isCompressing}
                  showSteamer={true}
                  expression={isCompressing ? 'squished' : expression}
                />
              </div>

              {/* Real-time Compression Meter Bar */}
              <div className="space-y-1.5 px-4">
                <div className="flex justify-between text-xs font-bold text-[#4A443D]">
                  <span>Compression Force</span>
                  <span className="text-[#E25C40]">{Math.round(compression)}% Max Squish</span>
                </div>
                <div className="w-full h-3.5 bg-[#F0E6D8] rounded-full overflow-hidden p-0.5 border border-[#E2D6C3]">
                  <div
                    className="h-full bg-gradient-to-r from-[#FCD87D] via-[#FF8C66] to-[#E25C40] rounded-full transition-all duration-75"
                    style={{ width: `${compression}%` }}
                  />
                </div>
              </div>

              {/* Interactive prompt button */}
              <div className="mt-5">
                <button
                  onMouseDown={handleStartPress}
                  onMouseUp={handleEndPress}
                  onTouchStart={handleStartPress}
                  onTouchEnd={handleEndPress}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#E25C40] hover:bg-[#CF492D] active:scale-98 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#FFE27A]" />
                  <span>{isCompressing ? 'HOLDING COMPRESSION...' : 'PRESS & HOLD TO SQUISH'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right: Real-time Sensory Specs & Add to Steamer */}
          <div className="lg:col-span-3 space-y-4">
            
            <div className="bg-white rounded-3xl p-5 border-2 border-[#E5D8C5] shadow-sm space-y-4">
              <h4 className="font-display font-bold text-base text-[#2D2A26] pb-2 border-b border-[#F0E6D8]">
                Sensory Spec Sheet
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-[#736B60] mb-1">
                    <span>Slow-Rise Rebound</span>
                    <strong className="text-[#2D2A26]">{activeProduct.slowRiseSeconds} seconds</strong>
                  </div>
                  <div className="w-full h-2 bg-[#F2ECE1] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#10B981] rounded-full"
                      style={{ width: `${(activeProduct.slowRiseSeconds / 7) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#736B60] mb-1">
                    <span>Squish Elasticity</span>
                    <strong className="text-[#2D2A26]">{activeProduct.squishScore} / 10</strong>
                  </div>
                  <div className="w-full h-2 bg-[#F2ECE1] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#E25C40] rounded-full"
                      style={{ width: `${(activeProduct.squishScore / 10) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F2ECE1] space-y-1.5">
                  <p className="text-[#736B60]">
                    Aroma: <strong className="text-[#2D2A26]">{activeProduct.aroma}</strong>
                  </p>
                  <p className="text-[#736B60]">
                    Formula: <strong className="text-[#2D2A26]">Non-Toxic Washable TPR</strong>
                  </p>
                  <p className="text-[#736B60]">
                    Steamer Basket: <strong className="text-[#10B981]">Included in Box</strong>
                  </p>
                </div>
              </div>

              {/* Direct Add to Cart Button */}
              <button
                id="squish-lab-add-cart-btn"
                onClick={() => {
                  playCelebrationChime();
                  onAddToCart(activeProduct);
                  confetti({
                    particleCount: 40,
                    spread: 50,
                    origin: { y: 0.8 },
                  });
                }}
                className="w-full py-3 bg-[#2D2A26] hover:bg-[#443F39] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 hover:scale-102 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#FFE27A]" />
                <span>Adopt {activeProduct.name.split(' ')[1] || 'Dumpling'} (${activeProduct.price})</span>
              </button>
            </div>

            {/* Guarantee Callout */}
            <div className="bg-[#FFF8E7] rounded-2xl p-3.5 border border-[#F5D890] text-[11px] text-[#7A4E0B] flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <span>
                <strong>100% Squish Guarantee:</strong> If your dumpling doesn't slow-rise smoothly for at least 4 seconds, we will replace it for free!
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
