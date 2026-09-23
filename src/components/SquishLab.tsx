import React, { useState, useRef } from 'react';
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

  const handleStartPress = () => {
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
    const duration = (activeProduct.slowRiseSeconds || 4.5) * 1000;
    const stepInterval = 30;
    const stepDecrement = compression / (duration / stepInterval);

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

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundOn(next);
  };

  // Calculate dynamic scale factors for compression effect
  const scaleX = 1 + (compression / 100) * 0.45;
  const scaleY = Math.max(1 - (compression / 100) * 0.55, 0.25);

  return (
    <section id="squish-lab" className="py-20 bg-[#FAF3E8] border-b border-[#E8DAC6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FFF3EE] px-4 py-1.5 rounded-full border border-[#FFD5CC] text-[#E25C40] font-bold text-xs mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive ASMR Simulator</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2D2A26]">
            The Sensory Squish Lab
          </h2>
          <p className="text-sm sm:text-base text-[#6E6457] mt-2">
            Select different squishy specimens (Capybara, Shiba, Croissant, Cat Paw, Bao) and test our memory TPR formula in real-time. 
            Press & hold to compress, let go to watch the therapeutic slow rise!
          </p>
        </div>

        {/* Main Squish Lab Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Recipe & Specimen Carousel Selector */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-display font-bold text-lg text-[#2D2A26] flex items-center justify-between">
              <span>Choose Squishy Specimen</span>
              <span className="text-xs text-[#8C8276] font-normal">Multi-Series Lab</span>
            </h3>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {DUMPLING_PRODUCTS.filter((p) => !p.isChaseExclusive && p.salesMode !== 'chase_exclusive' && p.category !== 'accessories').map((p) => {
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
                        <span className="text-xs font-black text-[#E25C40]">${p.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#7A7165]">
                        <span>Rise: <strong>{p.slowRiseSeconds}s</strong></span>
                        <span>•</span>
                        <span>Aroma: <strong>{p.aroma.split('&')[0]}</strong></span>
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
                  <span>Streak: <strong className="text-[#E25C40]">{squishStreak}</strong></span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleSound}
                    className="p-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#6E6457] transition-colors cursor-pointer"
                    title={soundOn ? 'Mute ASMR Audio' : 'Unmute ASMR Audio'}
                  >
                    {soundOn ? <Volume2 className="w-4 h-4 text-[#E25C40]" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                  <span className="bg-[#EBF7EE] text-[#2E7D32] px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-current" />
                    <span>{stressRelievedScore} Stress Released</span>
                  </span>
                </div>
              </div>

              {/* Compression Meter Gauge */}
              <div className="mt-4 mb-2">
                <div className="flex justify-between text-xs font-bold text-[#7A7165] mb-1">
                  <span>Compression Pressure</span>
                  <span className="text-[#E25C40]">{Math.round(compression)}%</span>
                </div>
                <div className="w-full h-3 bg-[#FAF3E8] rounded-full overflow-hidden border border-[#E5D8C5] p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#FACC15] via-[#FB923C] to-[#E25C40] rounded-full transition-all duration-75"
                    style={{ width: `${compression}%` }}
                  />
                </div>
              </div>

              {/* Interactive Squeezing Canvas Element */}
              <div
                onMouseDown={handleStartPress}
                onMouseUp={handleEndPress}
                onMouseLeave={() => isCompressing && handleEndPress()}
                onTouchStart={handleStartPress}
                onTouchEnd={handleEndPress}
                className="my-6 py-6 flex items-center justify-center cursor-grab active:cursor-grabbing select-none relative group"
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className={`w-60 h-60 rounded-full bg-[#FAF3E8] transition-transform duration-300 ${
                      isCompressing ? 'scale-110 bg-[#FFEFEA]' : 'scale-90 opacity-60'
                    }`}
                  />
                </div>

                <DumplingGraphic
                  type={activeProduct.svgArtType}
                  className="w-56 h-56 transition-transform"
                  squishScaleX={scaleX}
                  squishScaleY={scaleY}
                  isSquishing={isCompressing}
                  expression={expression}
                  showSteamer={activeProduct.includesSteamer}
                />
              </div>

              {/* Instruction Hint */}
              <div className="text-center">
                <p className="text-xs font-bold text-[#8C8276] uppercase tracking-wider animate-pulse">
                  {isCompressing ? '✨ SQUEEZING HARD... FEEL THE ASMR RESISTANCE' : '👇 PRESS & HOLD SQUISHY TO SQUEEZE'}
                </p>
              </div>

            </div>

          </div>

          {/* Right: Specimen Stats & Direct Add Card */}
          <div className="lg:col-span-3 space-y-4">
            
            <div className="bg-white rounded-3xl p-6 border-2 border-[#E0D2BE] shadow-sm space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase text-[#E25C40] bg-[#FFF0ED] px-2.5 py-1 rounded-full">
                  Selected Specimen
                </span>
                <h4 className="font-display font-black text-xl text-[#2D2A26] mt-2">
                  {activeProduct.name}
                </h4>
                <p className="text-xs text-[#7A7165] mt-1 line-clamp-2">
                  {activeProduct.subtitle}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="space-y-2.5 pt-2 border-t border-[#F0E6D8] text-xs">
                <div className="flex justify-between">
                  <span className="text-[#8C8276]">Tactile Rebound:</span>
                  <span className="font-bold text-[#2D2A26]">{activeProduct.slowRiseSeconds}s Ultra-Slow</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C8276]">Aroma Scent:</span>
                  <span className="font-bold text-[#2D2A26] truncate max-w-[130px]">{activeProduct.aroma}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C8276]">Material:</span>
                  <span className="font-bold text-[#2D2A26]">{activeProduct.material.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C8276]">Squish Score:</span>
                  <span className="font-bold text-[#E25C40]">⭐ {activeProduct.squishScore}/10</span>
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="pt-3 border-t border-[#F0E6D8]">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs text-[#8C8276] font-bold">Price</span>
                  <span className="font-display font-black text-2xl text-[#2D2A26]">
                    ${activeProduct.price.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    playPopSound();
                    onAddToCart(activeProduct);
                  }}
                  className="w-full py-3 bg-[#E25C40] hover:bg-[#C94A30] text-white font-black text-xs rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Adopt This Squishy</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
